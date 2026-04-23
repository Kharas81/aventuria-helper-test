const loadedScripts = new Set();

export function setBootStatus(message) {
    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = String(message ?? '');
    }
}

export function loadClassicScript(src) {
    return new Promise((resolve, reject) => {
        if (loadedScripts.has(src)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;

        script.onload = () => {
            loadedScripts.add(src);
            resolve();
        };

        script.onerror = () => {
            reject(new Error(`Script konnte nicht geladen werden: ${src}`));
        };

        document.head.appendChild(script);
    });
}

export async function ensureDomReady() {
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
    }
}

export async function boot({
    Theme,
    UI,
    SessionUI,
    Combat,
    Archive,
    Diagnostics,
    Rulebook,
    App,
    scriptLoadOrder = []
} = {}) {
    try {
        setBootStatus('Starte Aventuria ...');

        for (const src of scriptLoadOrder) {
            setBootStatus(`Lade ${src} ...`);
            await loadClassicScript(src);
        }

        await ensureDomReady();

        Theme?.init?.();
        UI?.init?.();
        SessionUI?.init?.();
        Combat?.init?.();
        Archive?.init?.();
        Diagnostics?.init?.();
        await Rulebook?.init?.();

        if (!App?.init) {
            throw new Error('App.init wurde nicht gefunden.');
        }

        setBootStatus('Initialisiere Anwendung ...');
        await App.init();

        setBootStatus('Bereit.');
        console.log('Aventuria über js/main.js gestartet.');
    } catch (error) {
        console.error('Bootstrap-Fehler in js/main.js:', error);
        setBootStatus('⚠️ Start fehlgeschlagen. Details siehe Konsole.');
    }
}

export default boot;
