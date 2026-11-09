// Lecteur audio des articles : pilote les éléments [data-audio-player] rendus par _includes/audio-player.html.
(() => {
    const SPEEDS = [1, 1.25, 1.5, 2];
    const format = (seconds) => {
        const total = Math.max(0, Math.round(seconds || 0));
        return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
    };
    let active = null;

    document.querySelectorAll('[data-audio-player]').forEach((root) => {
        const audio = root.querySelector('audio');
        const toggle = root.querySelector('[data-toggle]');
        if (!audio || !toggle) return;
        const seek = root.querySelector('[data-seek]');
        const current = root.querySelector('[data-current]');
        const total = root.querySelector('[data-total]');
        const speedButton = root.querySelector('[data-speed]');
        let duration = Number(root.dataset.duration) || 0;
        let scrubbing = false;

        audio.removeAttribute('controls');
        root.classList.add('is-ready');

        const render = () => {
            if (scrubbing) return;
            const ratio = duration ? Math.min(audio.currentTime / duration, 1) : 0;
            root.style.setProperty('--progress', `${ratio * 100}%`);
            if (current) current.textContent = format(audio.currentTime);
            if (seek) seek.value = Math.round(audio.currentTime);
        };

        const announce = () => {
            if (!('mediaSession' in navigator)) return;
            try {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: root.dataset.title || document.title,
                    artist: "L'artisan 2.0",
                    album: "Podcast de l'artisan 2.0",
                    artwork: root.dataset.artwork ? [{ src: root.dataset.artwork }] : [],
                });
            } catch (error) {
                // Métadonnées facultatives : la lecture fonctionne sans.
            }
        };

        audio.addEventListener('loadedmetadata', () => {
            if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
            duration = audio.duration;
            if (seek) seek.max = Math.round(duration);
            if (total) total.textContent = format(duration);
        });
        audio.addEventListener('timeupdate', render);
        audio.addEventListener('play', () => {
            if (active && active !== audio) active.pause();
            active = audio;
            root.classList.add('is-playing', 'is-started');
            toggle.setAttribute('aria-label', 'Mettre en pause');
            announce();
        });
        audio.addEventListener('pause', () => {
            root.classList.remove('is-playing');
            toggle.setAttribute('aria-label', 'Reprendre la lecture');
        });
        audio.addEventListener('ended', () => {
            root.classList.remove('is-playing', 'is-started');
            audio.currentTime = 0;
            render();
            toggle.setAttribute('aria-label', "Écouter l'article");
        });

        toggle.addEventListener('click', () => {
            if (audio.paused) audio.play().catch(() => {});
            else audio.pause();
        });

        if (seek) {
            seek.addEventListener('input', () => {
                scrubbing = true;
                const value = Number(seek.value);
                if (current) current.textContent = format(value);
                root.style.setProperty('--progress', `${duration ? (value / duration) * 100 : 0}%`);
            });
            seek.addEventListener('change', () => {
                scrubbing = false;
                const target = Number(seek.value);
                if (audio.readyState >= 1) {
                    audio.currentTime = target;
                } else {
                    audio.addEventListener('loadedmetadata', () => { audio.currentTime = target; }, { once: true });
                    audio.load();
                }
            });
        }

        if (speedButton) {
            let index = 0;
            speedButton.addEventListener('click', () => {
                index = (index + 1) % SPEEDS.length;
                audio.playbackRate = SPEEDS[index];
                speedButton.textContent = `${String(SPEEDS[index]).replace('.', ',')}×`;
            });
        }
    });
})();
