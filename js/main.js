import CONFIG from './core/config.js';
import Constants from './core/constants.js';
import Events from './core/events.js';
import Assets from './core/assets.js';
import Utils from './core/utils.js';

window.__AVENTURIA_SKIP_AUTO_INIT__ = true;

/**
 * Übergangs-Bridge:
 * Die bestehenden klassischen Dateien arbeiten noch mit window.*.
 * Deshalb hängen wir die ersten echten ES-Module vorübergehend dort an.
 */
window.CONFIG = CONFIG;
window.Constants = Constants;
window.Events = Events;
window.Assets = Assets;
window.Utils = Utils;

const SCRIPT_LOAD_ORDER = [
    'js/state.js',

    'js/api-cache.js',
    'js/api-normalizers.js',
    'js/api-fetch.js',
    'js/api-card-lookup.js',
    'js/api.js',

    'js/ui-preview.js',
    'js/ui-modals.js',
    'js/ui-status.js',
    'js/ui-actions.js',
    'js/ui.js',

    'js/render-common.js',
    'js/render-setup.js',
    'js/render-card-detail.js',

    'js/narrative.js',
    'js/combat.js',
    'js/storage.js',

    'js/archive-loader.js',
    'js/archive-filter.js',
    'js/archive-renderer.js',
    'js/archive.js',

    'js/rulebook-index-loader.js',
    'js/rulebook-reader.js',
    'js/rulebook-codex.js',
    'js/rulebook-ui.js',
    'js/rulebook.js',

    'js/validator.js',

    'js/diagnostics-renderer.js',
    'js/diagnostics-runner.js',
    'js/diagnostics.js',

    'js/theme.js',

    'js/app-state-sync.js',
    'js/app-adventure-flow.js',
    'js/app-controls.js',
    'js/app-persistence.js',
    'js/app-bootstrap.js',
    'js/app.js'
];

const loadedScripts = new Set();

function setStatus(message) {
    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = String(message ?? '');
    }
}

function loadClassicScript(src) {
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

async function ensureDomReady() {
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
    }
}

async function boot() {
    try {
        setStatus('Starte Aventuria ...');

        for (const src of SCRIPT_LOAD_ORDER) {
            setStatus(`Lade ${src} ...`);
            await loadClassicScript(src);
        }

        await ensureDomReady();

        if (!window.App?.init) {
            throw new Error('window.App.init wurde nicht gefunden.');
        }

        setStatus('Initialisiere Anwendung ...');
        await window.App.init();

        setStatus('Bereit.');
        console.log('Aventuria über js/main.js gestartet.');
    } catch (error) {
        console.error('Bootstrap-Fehler in js/main.js:', error);
        setStatus('⚠️ Start fehlgeschlagen. Details siehe Konsole.');
    }
}

void boot();
