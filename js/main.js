import registerGlobals from './bootstrap/register-globals.js';
import { boot } from './bootstrap/boot.js';

import CONFIG from './core/config.js';
import Constants from './core/constants.js';
import Events from './core/events.js';
import Assets from './core/assets.js';
import Utils from './core/utils.js';
import State from './core/state.js';
import Theme from './core/theme.js';
import Validator from './core/validator.js';
import StorageManager from './core/storage.js';
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

import CombatDashboard from './features/combat/dashboard.js';
import CombatTracker from './features/combat/tracker.js';
import Combat from './features/combat/combat.js';

import Narrative from './features/narrative/narrative.js';

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
import RulebookUI from './features/rulebook/rulebook-ui.js';
import Rulebook from './features/rulebook/rulebook.js';

import AppStateSync from './app/state-sync.js';
import AppAdventureFlow from './app/adventure-flow.js';
import AppControls from './app/controls.js';
import AppPersistence from './app/persistence.js';
import AppBootstrap from './app/bootstrap.js';
import App from './app/app.js';

window.__AVENTURIA_SKIP_AUTO_INIT__ = true;

registerGlobals({
    CONFIG,
    Constants,
    Events,
    Assets,
    Utils,
    State,
    Theme,
    Validator,
    StorageManager,
    ApiCache,
    ApiNormalizers,
    ApiFetch,
    ApiCardLookup,

    UIStatus,
    UIPreview,
    UIModals,
    UIActions,
    UI,
    UIComponents,

    RenderCommon,
    RenderSetup,
    RenderCardDetail,

    CombatDashboard,
    CombatTracker,
    Combat,

    Narrative,

    ArchiveLoader,
    ArchiveFilter,
    ArchiveRenderer,
    Archive,

    DiagnosticsRunner,
    DiagnosticsRenderer,
    Diagnostics,

    RulebookIndexLoader,
    RulebookReader,
    RulebookCodex,
    RulebookUI,
    Rulebook,

    AppStateSync,
    AppAdventureFlow,
    AppControls,
    AppPersistence,
    AppBootstrap,
    App
});

void boot({
    Theme,
    UI,
    Combat,
    Archive,
    Diagnostics,
    Rulebook,
    App,
    scriptLoadOrder: []
});
