import CONFIG from './core/config.js';
import Constants from './core/constants.js';
import Events from './core/events.js';
import Assets from './core/assets.js';
import Utils from './core/utils.js';
import State from './core/state.js';
import Theme from './core/theme.js';
import Validator from './core/validator.js';
import ApiCache from './core/api-cache.js';
import ApiNormalizers from './core/api-normalizers.js';
import ApiFetch from './core/api-fetch.js';
import ApiCardLookup from './core/api-card-lookup.js';

import UIStatus from './ui/status.js';
import UIPreview from './ui/preview.js';
import UIModals from './ui/modals.js';
import UIActions from './ui/actions.js';
import UI from './ui/ui.js';
import UIComponents from './ui/components.js';

import RenderCommon from './render/common.js';
import RenderSetup from './render/setup.js';
import RenderCardDetail from './render/card-detail.js';

import ArchiveLoader from './features/archive/loader.js';
import ArchiveFilter from './features/archive/filter.js';
import ArchiveRenderer from './features/archive/renderer.js';
import Archive from './features/archive/archive.js';

import DiagnosticsRunner from './features/diagnostics/runner.js';
import DiagnosticsRenderer from './features/diagnostics/renderer.js';
import Diagnostics from './features/diagnostics/diagnostics.js';

import RulebookIndexLoader from './features/rulebook/index-loader.js';
import RulebookReader from './features/rulebook/reader.js';
import RulebookCodex from './features/rulebook/codex.js';
import RulebookUI from './features/rulebook/ui.js';
import Rulebook from './features/rulebook/rulebook.js';

import AppStateSync from './app/state-sync.js';
import AppAdventureFlow from './app/adventure-flow.js';
import AppControls from './app/controls.js';
import AppPersistence from './app/persistence.js';
import AppBootstrap from './app/bootstrap.js';
import App from './app/app.js';

window.__AVENTURIA_SKIP_AUTO_INIT__ = true;

window.CONFIG = CONFIG;
window.Constants = Constants;
window.Events = Events;
window.Assets = Assets;
window.Utils = Utils;
window.State = State;
window.Theme = Theme;
window.Validator = Validator;
window.ApiCache = ApiCache;
window.ApiNormalizers = ApiNormalizers;
window.ApiFetch = ApiFetch;
window.ApiCardLookup = ApiCardLookup;

window.UIStatus = UIStatus;
window.UIPreview = UIPreview;
window.UIModals = UIModals;
window.UIActions = UIActions;
window.UI = UI;
window.UIComponents = UIComponents;

window.RenderCommon = RenderCommon;
window.RenderSetup = RenderSetup;
window.RenderCardDetail = RenderCardDetail;

window.ArchiveLoader = ArchiveLoader;
window.ArchiveFilter = ArchiveFilter;
window.ArchiveRenderer = ArchiveRenderer;
window.Archive = Archive;

window.DiagnosticsRunner = DiagnosticsRunner;
window.DiagnosticsRenderer = DiagnosticsRenderer;
window.Diagnostics = Diagnostics;

window.RulebookIndexLoader = RulebookIndexLoader;
window.RulebookReader = RulebookReader;
window.RulebookCodex = RulebookCodex;
window.RulebookUI = RulebookUI;
window.Rulebook = Rulebook;

window.AppStateSync = AppStateSync;
window.AppAdventureFlow = AppAdventureFlow;
window.AppControls = AppControls;
window.AppPersistence = AppPersistence;
window.AppBootstrap = AppBootstrap;
window.App = App;

const SCRIPT_LOAD_ORDER = [
    'js/narrative.js',
    'js/combat.js',
    'js/storage.js'
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

        Theme.init();
        UI.init();
        Archive.init();
        Diagnostics.init();
        await Rulebook.init();

        if (!App?.init) {
            throw new Error('App.init wurde nicht gefunden.');
        }

        setStatus('Initialisiere Anwendung ...');
        await App.init();

        setStatus('Bereit.');
        console.log('Aventuria über js/main.js gestartet.');
    } catch (error) {
        console.error('Bootstrap-Fehler in js/main.js:', error);
        setStatus('⚠️ Start fehlgeschlagen. Details siehe Konsole.');
    }
}

void boot();
