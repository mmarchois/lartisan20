---
layout: blog
title: "Développeur / Électricien : pourquoi la transition est plus logique qu'on ne croit"
description: "Debug, architecture, tests unitaires… Le métier de développeur et celui d'électricien partagent bien plus qu'on ne l'imagine. Retour sur les parallèles qui rendent cette reconversion si naturelle."
keywords: "reconversion développeur électricien, debug électrique, test de continuité, test unitaire, schéma unifilaire, architecture logicielle, NF C 15-100, reconversion professionnelle"
category: "Reconversion"
date: 2026-03-30
published: true
excerpt: "Debug, architecture, tests… Depuis que j'alterne entre code et chantier, je suis frappé par un truc : la logique est la même. Les outils changent. Les réflexes restent."
image: /images/blog/developpeur-electricien.png
---

⚡️ / 💻 **Développeur et électricien, même combat ?**

Quand je dis que je me reconvertis de développeur à électricien, la réaction est souvent la même. Un petit silence. Un regard perplexe. "Ah… c'est un sacré changement, non ?"

En apparence, oui. On passe d'un écran à un chantier, d'un clavier à une pince à dénuder, d'un IDE à un multimètre. Mais depuis que j'alterne entre les deux mondes — 80% dev, 20% chantier — je suis frappé par un truc : **la logique est la même**. Les outils changent. Les réflexes restent.

## Penser en systèmes

En dev, avant d'écrire la moindre ligne de code, tu dessines. Tu poses ton schéma d'architecture. Tu découpes en modules, tu identifies les flux, les dépendances, les points de rupture. Tu prends du recul avant de plonger.

En électricité, c'est pareil. Le schéma unifilaire, c'est ton schéma d'archi. Le tableau, c'est ton point central — ton serveur, si tu veux. Les circuits, ce sont des modules indépendants, chacun avec sa protection, sa section, sa fonction. Et les boîtes de dérivation ? Ce sont tes routeurs. Elles redistribuent les flux vers les bons appareillages.

Quand j'arrive sur le chantier et que je dois réfléchir à un circuit, je fais exactement ce que je faisais en dev. Je prends du recul. Je dessine le système. Je découpe en blocs. Et ensuite seulement, je passe à "l'implémentation" — le passage de câbles, les raccordements.

C'est un réflexe de développeur. Et sur le terrain, il me sert tous les jours.

## Chercher un bug, chercher une panne

Si tu as déjà passé des heures à debugger un programme, tu vois exactement de quoi je parle.

Un bug, c'est un symptôme. L'appli plante, une valeur est fausse, un comportement est inattendu. Pour le trouver, tu remontes le fil. Tu isoles. Tu testes hypothèse par hypothèse. Tu élimines. Tu resserres.

Sur le chantier, c'est la même démarche. La semaine dernière, un circuit ne bipait pas au test de continuité. Pas de panique. Je remonte. Je vérifie la boîte de dérivation en amont. J'ouvre, je contrôle chaque raccordement. Un Wago mal enfoncé — le fil n'avait pas fait contact. Refait, retesté, bip. Problème réglé.

Le multimètre, c'est ton debugger. Le schéma de l'installation, c'est ta stack trace.

Et cette façon de ne pas paniquer face à un problème — isoler, éliminer, resserrer — c'est un truc que 15 ans de dev m'ont ancré. Sur le terrain, ça change tout. Surtout quand tu débutes et que tu pourrais vite te laisser submerger par un truc qui ne marche pas.

## Les tests : mon obsession dans les deux métiers

C'est peut-être le parallèle qui me parle le plus. Et c'est peut-être aussi celui où mon passé de dev influence le plus ma façon de bosser sur le terrain.

### Test de continuité = test unitaire

En dev, un test unitaire vérifie qu'un composant isolé fonctionne. Tu testes une fonction, un module — indépendamment du reste.

En électricité, le test de continuité c'est exactement ça. Tu prends un circuit, **hors tension**. Tu shuntes phase et neutre côté tableau avec un Wago. Et tu parcours chaque appareillage avec le multimètre en mode ohmmètre. Bip ? Ce "composant" est correctement câblé. Pas de bip ? Un fil mal serré, un raccordement oublié — c'est maintenant qu'il faut le trouver, pas une fois les plaques posées.

C'est un test isolé, sans courant, sans interaction avec le reste de l'installation. Un test unitaire, au sens propre.

### Mise en service = test fonctionnel

Ensuite vient la mise sous tension. On alimente le tableau, on enclenche les disjoncteurs, et on vérifie en conditions réelles. La lumière s'allume. Le va-et-vient bascule correctement des deux côtés. Le volet monte ET descend. Le différentiel déclenche quand il doit.

C'est le test end-to-end. On ne teste plus une brique isolée — on teste le système complet. Et comme en dev, c'est souvent là que tu découvres les vrais problèmes. Le circuit unitaire était bon, mais l'interaction entre circuits révèle un déséquilibre de phase ou un différentiel qui saute.

### Pourquoi j'y tiens autant

En dev, j'ai vu ce qui se passe quand on ne teste pas. Le bug en production un vendredi soir. Le truc "qui marchait en local" et qui explose en déploiement.

Alors en électricité, j'applique le même principe : **je teste tout, circuit par circuit, avant d'aller plus loin**. C'est un investissement en temps. Mais c'est ce qui permet de livrer sereinement. De dire "c'est bon" en étant sûr de ce qu'on avance — pas parce que "ça avait l'air ok".

Je débute dans ce métier. Je n'ai pas encore des années de chantier derrière moi. Mais cette rigueur-là, je l'ai déjà. Elle vient du dev. Et je la sens précieuse chaque semaine.

## Nommer les choses

En dev, on sait tous qu'un code bien nommé c'est un code maintenable. Des variables explicites, des fonctions qui disent ce qu'elles font. Quand tu reprends un projet six mois plus tard, la clarté du nommage fait toute la différence.

En électricité, c'est le repérage. Les étiquettes au tableau, en boîtes de dérivation, sur les câbles. J'en parlais dans [mon dernier article](/blog/2026/03/25/appareillages-derivation-continuite/) : **repérer plus que nécessaire**, c'est ma règle.

Un tableau bien repéré, c'est un `README` lisible. Une boîte de dérivation bien étiquetée, c'est du code commenté. Et un câble non identifié, c'est une variable nommée `x2_temp_final_v3` — bonne chance pour debugger ça dans cinq ans.

## La transition est plus aisée qu'on ne le croit

Ce qui relie ces deux métiers, c'est la même exigence. Concevoir avant de construire. Tester avant de livrer. Documenter pour ceux qui passeront après.

Est-ce que c'est facile pour autant ? Non. Il y a énormément à apprendre. Le geste technique ne s'improvise pas. La norme NF C 15-100 ne se devine pas. Et le terrain te rappelle régulièrement que tu es [encore en apprentissage](/blog/2026/01/19/reconversion-electricien-premiers-pas/).

Mais la manière de raisonner, d'aborder un problème, de structurer son travail… Tout ça, un développeur l'a déjà. Pas dans les mains — ça, ça vient avec le terrain. Mais dans la tête.

Et franchement, après [l'épisode du court-circuit](/blog/2026/02/02/etincelle-court-circuit-lecon-chantier/) où j'ai dû remonter le problème exactement comme un debug en prod — garder la tête froide, isoler, réagir étape par étape — je me suis dit : finalement, c'est pas si loin.

---

*Si vous êtes développeur et que vous avez déjà pensé à une reconversion manuelle — ne sous-estimez pas ce que votre parcours vous a appris. Les compétences transversales sont bien plus puissantes qu'on ne l'imagine.*

*Suivez l'aventure de ma reconversion sur [LinkedIn]({{ site.linkedin }}) et [Instagram]({{ site.instagram }}).*
