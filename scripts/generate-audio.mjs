#!/usr/bin/env node
// Génère la version audio (MP3) des articles du blog avec Azure Speech.
//
//   node scripts/generate-audio.mjs              génère les articles nouveaux ou modifiés
//   node scripts/generate-audio.mjs --dry-run    liste ce qui serait généré, sans appeler Azure
//   node scripts/generate-audio.mjs --text lumo  affiche le texte exact que la voix lira
//   node scripts/generate-audio.mjs --only lumo  limite aux articles dont le nom contient « lumo »
//   node scripts/generate-audio.mjs --force      régénère même si l'article n'a pas changé
//   node scripts/generate-audio.mjs --images     crée seulement les images d'épisode manquantes (sans Azure)
//   node scripts/generate-audio.mjs --voices     liste les voix françaises disponibles
//   node scripts/generate-audio.mjs --sample     génère un court extrait par voix pour comparer
//
// Variables d'environnement :
//   AZURE_SPEECH_KEY     clé de la ressource Speech (obligatoire pour générer)
//   AZURE_SPEECH_REGION  région de la ressource (défaut : francecentral)
//   AZURE_SPEECH_VOICE   voix (défaut : VOICE ci-dessous)
//
// Les MP3 sont écrits dans audio/blog/ et décrits dans _data/audio.json, que le
// gabarit _layouts/blog.html lit pour afficher le lecteur. Les deux se commitent.
// Pour le flux podcast, la photo de chaque article est aussi recadrée en carré
// (audio/blog/<slug>.jpg) avec l'outil sips de macOS.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, '_posts');
const AUDIO_DIR = join(ROOT, 'audio', 'blog');
const MANIFEST = join(ROOT, '_data', 'audio.json');

const REGION = process.env.AZURE_SPEECH_REGION || 'francecentral';
const VOICE = process.env.AZURE_SPEECH_VOICE || 'fr-FR-RemyMultilingualNeural';
const KEY = process.env.AZURE_SPEECH_KEY;
// 48 kHz mono à 96 kbit/s (MPEG-1) : environ 0,72 Mo par minute. C'est le minimum exigé par
// Spotify pour un podcast ; le 24 kHz / 48 kbit/s, deux fois plus léger, n'y est pas accepté.
const FORMAT = 'audio-48khz-96kbitrate-mono-mp3';
// Une requête Azure rend au plus 10 minutes d'audio : on découpe bien en dessous.
const MAX_CHUNK_CHARS = 2500;
// L'offre gratuite accepte 20 requêtes par minute.
const DELAY_MS = Number(process.env.AZURE_SPEECH_DELAY_MS || 3500);
// À incrémenter quand les règles de préparation du texte changent, pour tout régénérer.
const PREP_VERSION = 1;
// Côté des images d'épisode carrées (Apple demande entre 1400 et 3000 px).
const IMAGE_SIZE = 1400;

const SAMPLE_VOICES = [
  'fr-FR-RemyMultilingualNeural',
  'fr-FR-LucienMultilingualNeural',
  'fr-FR-HenriNeural',
  'fr-FR-VivienneMultilingualNeural',
  'fr-FR-DeniseNeural',
];

// ---------------------------------------------------------------------------
// Préparation du texte : du Markdown de l'article au texte lu par la voix
// ---------------------------------------------------------------------------

// Marqueurs internes entourant un sigle à épeler (convertis en SSML à la fin).
const SPELL_OPEN = '';
const SPELL_CLOSE = '';

// Sigles que la voix lirait comme un mot : on les fait épeler.
const SPELLED = ['CAP', 'VAT', 'VMC', 'DCL', 'IPN', 'IRL', 'IRVE', 'TPC', 'GTL', 'OSB', 'PWA', 'CPF', 'DTU', 'NF'];
// Mots écrits en capitales qui se prononcent comme des mots.
const AS_WORDS = { MAP: 'map', CREATE: 'Create', POLO: 'Polo', README: 'read me' };

// Unités écrites après un nombre. L'ordre compte : les plus longues d'abord.
const UNITS = [
  ['mm²', 'millimètres carrés'], ['mm2', 'millimètres carrés'],
  ['m²', 'mètres carrés'], ['m2', 'mètres carrés'],
  ['kVA', 'kilovoltampères'], ['kWh', 'kilowattheures'], ['kW', 'kilowatts'],
  ['mA', 'milliampères'], ['MΩ', 'mégohms'], ['kΩ', 'kilohms'], ['Ω', 'ohms'],
  ['mm', 'millimètres'], ['cm', 'centimètres'], ['km', 'kilomètres'], ['kg', 'kilogrammes'],
  ['°C', 'degrés'], ['°', 'degrés'],
  ['€/h', 'euros de l\'heure'],
  ['W', 'watts'], ['V', 'volts'], ['A', 'ampères'], ['m', 'mètres'], ['h', 'heures'],
];

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

function normalize(text) {
  let t = text;

  // Mise en forme Markdown et HTML résiduel
  t = t.replace(/\{[{%][\s\S]*?[%}]\}/g, '');              // Liquid
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, '');               // images
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');            // liens : on garde le texte
  t = t.replace(/<[^>]+>/g, '');                            // balises HTML
  t = t.replace(/(\*\*|__)(.*?)\1/g, '$2');                 // gras
  t = t.replace(/(?<![\w*])[*_]([^*_\n]+)[*_](?![\w*])/g, '$1'); // italique
  t = t.replace(/`([^`]*)`/g, '$1');                        // code en ligne
  t = t.replace(/[\p{Extended_Pictographic}️‍]/gu, ''); // émojis

  // Espaces insécables : on raisonne ensuite sur des espaces simples
  t = t.replace(/[   ]/g, ' ');

  // Milliers : « 5 500 000 » devient « 5500000 » pour être lu comme un seul nombre
  t = t.replace(/(?<![\d,.])\d{1,3}(?: \d{3})+(?![\d])/g, (m) => m.replace(/ /g, ''));

  // Expressions figées
  t = t.replace(/\bNF ?C ?15-100\b/g, `${SPELL_OPEN}NFC${SPELL_CLOSE} quinze cent`);
  t = t.replace(/\b24 ?h ?\/ ?24\b/g, '24 heures sur 24');
  t = t.replace(/\b7 ?j ?\/ ?7\b/g, '7 jours sur 7');
  t = t.replace(/\bHT\b/g, 'hors taxes');
  t = t.replace(/\bTTC\b/g, 'toutes taxes comprises');

  // Unités après un nombre (jamais dans une référence comme « R2V » ou « H07V-U »)
  for (const [unit, spoken] of UNITS) {
    const re = new RegExp(`(?<![A-Za-z\\d-])(\\d[\\d,.]*) ?${escapeRegex(unit)}(?![\\wÀ-ÿ²])`, 'g');
    t = t.replace(re, `$1 ${spoken}`);
  }

  // Formules et symboles
  t = t.replace(/ = /g, ' égale ');
  t = t.replace(/ ?× ?/g, ' fois ');
  t = t.replace(/ ?≈ ?/g, ', soit environ ');
  t = t.replace(/(?<=(?:^|[ (])(?:\d[\d,.]*|[A-Z])) \/ (?=\d|[A-Z]\b)/g, ' divisé par ');
  t = t.replace(/ \/ /g, ', ');
  t = t.replace(/(?<=[\p{L}\d])\/(?=[\p{L}\d])/gu, ' ');     // « été/hiver », « 80/20 »
  t = t.replace(/(?<=\w)_(?=\w)/g, ' ');                    // noms de variables
  t = t.replace(/(?<=\w)\+(?=\d)/g, ' plus ');              // « R+1 »
  t = t.replace(/ ?→ ?/g, ', ');
  t = t.replace(/ ?— ?/g, ', ');
  t = t.replace(/ ?& ?/g, ' et ');
  t = t.replace(/\(\s*\)/g, '');                            // parenthèses vidées de leur émoji

  // Sigles
  for (const [word, spoken] of Object.entries(AS_WORDS)) {
    t = t.replace(new RegExp(`\\b${word}\\b`, 'g'), spoken);
  }
  t = t.replace(new RegExp(`(?<![${SPELL_OPEN}\\w])(${SPELLED.join('|')})(?![\\w${SPELL_CLOSE}])`, 'g'),
    `${SPELL_OPEN}$1${SPELL_CLOSE}`);

  return t.replace(/[ \t]+/g, ' ').replace(/ ([,.])/g, '$1').trim();
}

// Découpe un article en blocs { type: 'title' | 'heading' | 'text', text }.
function prepare(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const [, front, rawBody] = match;
  const field = (name) => {
    const m = front.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'));
    return m ? m[1].trim().replace(/^(["'])(.*)\1$/, '$2') : '';
  };
  if (field('published') === 'false') return null;

  let body = rawBody;
  // Le pied d'article (liens LinkedIn, contact) suit le dernier filet « --- » : on ne le lit pas.
  const rule = body.lastIndexOf('\n---\n');
  if (rule !== -1) body = body.slice(0, rule);
  // Les photos et leurs légendes n'ont pas de sens à l'oreille.
  body = body.replace(/<figure[\s\S]*?<\/figure>/g, '');
  body = body.replace(/^!\[[^\]]*\]\([^)]*\)[ \t]*\n\*[^\n]*\*[ \t]*$/gm, '');
  body = body.replace(/^!\[[^\]]*\]\([^)]*\)[ \t]*$/gm, '');

  const blocks = [{ type: 'title', text: endSentence(normalize(field('title'))) }];
  for (const raw of body.split(/\n\s*\n/)) {
    const chunk = raw.trim();
    if (!chunk) continue;
    const heading = chunk.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      blocks.push({ type: 'heading', text: endSentence(normalize(heading[1])) });
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s/.test(chunk)) {
      // Liste : chaque élément devient une phrase.
      const items = chunk.split(/\n(?=\s*(?:[-*]|\d+\.)\s)/)
        .map((item) => normalize(item.replace(/^\s*(?:[-*]|\d+\.)\s+/, '').replace(/\n/g, ' ')))
        .filter(Boolean)
        .map((item) => endSentence(item.replace(/\s*;$/, '')));
      if (items.length) blocks.push({ type: 'text', text: items.join(' ') });
      continue;
    }
    const text = normalize(chunk.replace(/\n/g, ' '));
    if (text) blocks.push({ type: 'text', text });
  }
  return { title: field('title'), image: field('image'), blocks };
}

function endSentence(text) {
  return /[.!?…:]$/.test(text) ? text : `${text}.`;
}

// ---------------------------------------------------------------------------
// SSML et découpage en requêtes
// ---------------------------------------------------------------------------

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function blockToSsml(block) {
  const text = escapeXml(block.text)
    .replaceAll(SPELL_OPEN, '<say-as interpret-as="characters">')
    .replaceAll(SPELL_CLOSE, '</say-as>');
  const pause = block.type === 'text' ? '' : '<break time="600ms"/>';
  return `<p>${text}</p>${pause}`;
}

// Un paragraphe plus long que la limite est recoupé à la phrase.
function splitLong(block) {
  if (block.text.length <= MAX_CHUNK_CHARS) return [block];
  const parts = [];
  let current = '';
  for (const sentence of block.text.split(/(?<=[.!?…])\s+/)) {
    if (current && current.length + sentence.length + 1 > MAX_CHUNK_CHARS) {
      parts.push({ type: block.type, text: current });
      current = '';
    }
    current = current ? `${current} ${sentence}` : sentence;
  }
  if (current) parts.push({ type: block.type, text: current });
  return parts;
}

function toChunks(blocks) {
  const chunks = [];
  let current = [];
  let size = 0;
  for (const block of blocks.flatMap(splitLong)) {
    if (current.length && size + block.text.length > MAX_CHUNK_CHARS) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(block);
    size += block.text.length;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

function chunkToSsml(chunk, voice) {
  let inner = chunk.map(blockToSsml).join('');
  // Les voix multilingues devinent la langue : on leur impose le français.
  if (/Multilingual/.test(voice)) inner = `<lang xml:lang="fr-FR">${inner}</lang>`;
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fr-FR"><voice name="${voice}">${inner}</voice></speak>`;
}

// ---------------------------------------------------------------------------
// MP3 : assemblage des morceaux sans outil externe
// ---------------------------------------------------------------------------

const BITRATES = {
  mpeg1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  mpeg2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
};
const SAMPLE_RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };

function parseFrameHeader(buf, i) {
  if (i + 4 > buf.length || buf[i] !== 0xff || (buf[i + 1] & 0xe0) !== 0xe0) return null;
  const version = (buf[i + 1] >> 3) & 3;
  const layer = (buf[i + 1] >> 1) & 3;
  if (version === 1 || layer !== 1) return null; // couche III uniquement
  const bitrateIndex = (buf[i + 2] >> 4) & 0xf;
  const sampleRateIndex = (buf[i + 2] >> 2) & 3;
  if (bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) return null;
  const mpeg1 = version === 3;
  const bitrate = (mpeg1 ? BITRATES.mpeg1 : BITRATES.mpeg2)[bitrateIndex] * 1000;
  const sampleRate = SAMPLE_RATES[version][sampleRateIndex];
  const samples = mpeg1 ? 1152 : 576;
  const padding = (buf[i + 2] >> 1) & 1;
  return { length: Math.floor((samples / 8) * bitrate / sampleRate) + padding, samples, sampleRate, bitrate };
}

// Renvoie les trames audio d'un MP3, sans étiquettes ID3 ni trame d'en-tête Xing/Info :
// des morceaux nettoyés ainsi peuvent être mis bout à bout en un seul fichier valide.
export function extractFrames(buf) {
  let i = 0;
  if (buf.length > 10 && buf.toString('latin1', 0, 3) === 'ID3') {
    i = 10 + (((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f));
  }
  const frames = [];
  let seconds = 0;
  let bytes = 0;
  let first = true;
  while (i + 4 <= buf.length) {
    const header = parseFrameHeader(buf, i);
    const end = header ? i + header.length : 0;
    // Une trame n'est retenue que si la suivante (ou la fin du fichier) la confirme.
    const confirmed = header && end <= buf.length && (end + 4 > buf.length || parseFrameHeader(buf, end));
    if (!confirmed) {
      i += 1;
      continue;
    }
    const frame = buf.subarray(i, end);
    const isInfoFrame = first && /Xing|Info|VBRI/.test(frame.toString('latin1', 4, Math.min(frame.length, 64)));
    first = false;
    if (!isInfoFrame) {
      frames.push(frame);
      seconds += header.samples / header.sampleRate;
      bytes += frame.length;
    }
    i = end;
  }
  return { frames, seconds, bytes };
}

// ---------------------------------------------------------------------------
// Azure Speech
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let lastRequest = 0;

async function synthesize(ssml) {
  for (let attempt = 1; ; attempt += 1) {
    const wait = lastRequest + DELAY_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();
    const response = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': FORMAT,
        'User-Agent': 'lartisan20-audio',
      },
      body: ssml,
    });
    if (response.ok) {
      const audio = Buffer.from(await response.arrayBuffer());
      const { frames, seconds, bytes } = extractFrames(audio);
      if (!frames.length || bytes < audio.length * 0.95) {
        throw new Error(`Réponse audio inattendue (${bytes} octets MP3 reconnus sur ${audio.length}).`);
      }
      return { frames, seconds };
    }
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt >= 5) {
      const detail = (await response.text()).slice(0, 300);
      throw new Error(`Azure Speech a répondu ${response.status} ${response.statusText}. ${detail}`);
    }
    const retryAfter = Number(response.headers.get('retry-after')) || 10 * attempt;
    console.log(`    Azure demande d'attendre (${response.status}), nouvel essai dans ${retryAfter} s`);
    await sleep(retryAfter * 1000);
  }
}

function requireKey() {
  if (KEY) return;
  console.error('Variable AZURE_SPEECH_KEY absente : exportez la clé de votre ressource Speech avant de générer.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Images d'épisode : la photo de l'article recadrée en carré, pour Spotify et Apple
// ---------------------------------------------------------------------------

function sipsAvailable() {
  try {
    execFileSync('sips', ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// La photo déclarée dans le front matter, ou sa variante .webp/.jpg/.png si l'extension diffère.
function findImageSource(imagePath) {
  if (!imagePath) return null;
  const base = join(ROOT, imagePath.replace(/^\//, ''));
  const candidates = [base, ...['.webp', '.jpg', '.jpeg', '.png'].map((ext) => base.replace(/\.[a-z]+$/i, ext))];
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function makeEpisodeImage(post) {
  const source = findImageSource(post.image);
  if (!source) return null;
  const info = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', source], { encoding: 'utf8' });
  const width = Number(info.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(info.match(/pixelHeight:\s*(\d+)/)?.[1]);
  if (!width || !height) return null;
  const side = String(Math.min(width, height));
  const dest = join(AUDIO_DIR, `${post.slug}.jpg`);
  // Recadrage centré au carré, puis mise à l'échelle.
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', '-c', side, side, source, '--out', dest], { stdio: 'ignore' });
  execFileSync('sips', ['-z', String(IMAGE_SIZE), String(IMAGE_SIZE), dest], { stdio: 'ignore' });
  return `/audio/blog/${post.slug}.jpg`;
}

const hasEpisodeImage = (post, manifest) =>
  Boolean(manifest[post.slug]?.image) && existsSync(join(ROOT, manifest[post.slug].image.slice(1)));

// Crée l'image carrée de chaque article qui a un audio mais pas encore d'image.
function makeMissingImages(posts, manifest, force) {
  const missing = posts.filter((post) => manifest[post.slug] && (force || !hasEpisodeImage(post, manifest)));
  if (!missing.length) return;
  if (!sipsAvailable()) {
    console.log("sips introuvable (outil macOS) : pas d'images d'épisode générées.");
    return;
  }
  for (const post of missing) {
    const image = makeEpisodeImage(post);
    if (!image) {
      console.log(`  ${post.slug}  pas de photo d'article trouvée, pas d'image d'épisode`);
      continue;
    }
    manifest[post.slug].image = image;
    writeManifest(manifest);
    console.log(`  ${post.slug}  image d'épisode créée`);
  }
}

// ---------------------------------------------------------------------------
// Commandes
// ---------------------------------------------------------------------------

function loadPosts(only) {
  return readdirSync(POSTS_DIR)
    .filter((file) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(file))
    .filter((file) => !only || file.includes(only))
    .sort()
    .reverse() // les articles récents d'abord : ce sont ceux qu'on voit en haut du blog
    .map((file) => {
      const post = prepare(readFileSync(join(POSTS_DIR, file), 'utf8'));
      if (!post) return null;
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      const chunks = toChunks(post.blocks);
      const spoken = post.blocks.map((block) => block.text).join('\n');
      const hash = createHash('sha256')
        .update(JSON.stringify([PREP_VERSION, VOICE, FORMAT, post.blocks]))
        .digest('hex')
        .slice(0, 16);
      return { file, slug, chunks, hash, chars: spoken.length, ...post };
    })
    .filter(Boolean);
}

const readManifest = () => (existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {});

function writeManifest(manifest) {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
}

const isCurrent = (post, manifest) =>
  manifest[post.slug]?.hash === post.hash && existsSync(join(AUDIO_DIR, `${post.slug}.mp3`));

const readable = (text) => text.replaceAll(SPELL_OPEN, '[').replaceAll(SPELL_CLOSE, ']');

async function generate({ only, force, dryRun }) {
  const posts = loadPosts(only);
  const manifest = readManifest();
  const todo = posts.filter((post) => force || !isCurrent(post, manifest));
  const chars = todo.reduce((sum, post) => sum + post.chars, 0);

  console.log(`${posts.length} article(s) publié(s), ${todo.length} à générer (${chars.toLocaleString('fr-FR')} caractères, voix ${VOICE}).`);
  for (const post of todo) console.log(`  ${post.slug}  ${post.chars} caractères, ${post.chunks.length} requête(s)`);

  // Audio d'articles supprimés ou dépubliés
  const slugs = new Set(loadPosts().map((post) => post.slug));
  const orphans = only ? [] : Object.keys(manifest).filter((slug) => !slugs.has(slug));
  for (const slug of orphans) console.log(`  ${slug}  article absent ou dépublié, audio à supprimer`);

  const missingImages = posts.filter((post) => manifest[post.slug] && !hasEpisodeImage(post, manifest)).length;
  if (missingImages) console.log(`${missingImages} image(s) d'épisode à créer.`);

  if (dryRun || (!todo.length && !orphans.length && !missingImages)) return;
  if (todo.length) requireKey();
  mkdirSync(AUDIO_DIR, { recursive: true });

  for (const slug of orphans) {
    rmSync(join(AUDIO_DIR, `${slug}.mp3`), { force: true });
    rmSync(join(AUDIO_DIR, `${slug}.jpg`), { force: true });
    delete manifest[slug];
    writeManifest(manifest);
  }

  for (const [index, post] of todo.entries()) {
    console.log(`[${index + 1}/${todo.length}] ${post.slug}`);
    const frames = [];
    let seconds = 0;
    for (const chunk of post.chunks) {
      const part = await synthesize(chunkToSsml(chunk, VOICE));
      frames.push(...part.frames);
      seconds += part.seconds;
    }
    const mp3 = Buffer.concat(frames);
    writeFileSync(join(AUDIO_DIR, `${post.slug}.mp3`), mp3);
    manifest[post.slug] = {
      src: `/audio/blog/${post.slug}.mp3`,
      duration: Math.round(seconds),
      bytes: mp3.length,
      voice: VOICE,
      hash: post.hash,
    };
    // Écrit après chaque article : une interruption ne fait rien perdre.
    writeManifest(manifest);
    console.log(`    ${Math.floor(seconds / 60)} min ${Math.round(seconds % 60)} s, ${(mp3.length / 1e6).toFixed(1)} Mo`);
  }

  makeMissingImages(posts, manifest, false);
}

function images({ only, force }) {
  const posts = loadPosts(only);
  const manifest = readManifest();
  mkdirSync(AUDIO_DIR, { recursive: true });
  makeMissingImages(posts, manifest, force);
  console.log(`${posts.filter((post) => hasEpisodeImage(post, manifest)).length} article(s) avec image d'épisode.`);
}

function showText(only) {
  const posts = loadPosts(only);
  if (!posts.length) return console.error(`Aucun article publié ne contient « ${only} » dans son nom.`);
  for (const post of posts) {
    console.log(`\n===== ${post.file} (${post.chars} caractères) =====\n`);
    for (const block of post.blocks) console.log(`${block.type === 'text' ? '' : '# '}${readable(block.text)}\n`);
  }
}

async function listVoices() {
  requireKey();
  const response = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`, {
    headers: { 'Ocp-Apim-Subscription-Key': KEY },
  });
  if (!response.ok) throw new Error(`Azure Speech a répondu ${response.status} ${response.statusText}.`);
  for (const voice of (await response.json()).filter((v) => v.Locale === 'fr-FR')) {
    console.log(`${voice.ShortName.padEnd(40)} ${voice.Gender.padEnd(8)} ${voice.VoiceType}`);
  }
}

async function sample(voices) {
  requireKey();
  const [post] = loadPosts().slice(-1);
  const excerpt = post.blocks.slice(0, 3);
  const dir = join(tmpdir(), 'lartisan20-voix');
  mkdirSync(dir, { recursive: true });
  console.log(`Extrait de « ${post.title} », ${excerpt.reduce((n, b) => n + b.text.length, 0)} caractères par voix.`);
  for (const voice of voices) {
    try {
      const { frames } = await synthesize(chunkToSsml(excerpt, voice));
      const path = join(dir, `${voice}.mp3`);
      writeFileSync(path, Buffer.concat(frames));
      console.log(`  ${path}`);
    } catch (error) {
      console.log(`  ${voice} : ${error.message}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const flag = (name) => args.includes(name);
  const value = (name) => {
    const next = args[args.indexOf(name) + 1];
    return args.includes(name) && next && !next.startsWith('--') ? next : undefined;
  };
  if (flag('--text')) return showText(value('--text'));
  if (flag('--voices')) return listVoices();
  if (flag('--images')) return images({ only: value('--only'), force: flag('--force') });
  if (flag('--sample')) return sample(value('--sample')?.split(',') ?? SAMPLE_VOICES);
  return generate({ only: value('--only'), force: flag('--force'), dryRun: flag('--dry-run') });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
