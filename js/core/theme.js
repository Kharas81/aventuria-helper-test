import CONFIG from './config.js';
import Constants from './constants.js';
import Events from './events.js';

export const Theme = {
    currentSet: '',
    appliedVarKeys: new Set(),
    isBound: false,

    normalizeSetKey(setKey = '') {
        return CONFIG.normalizeSetKey(setKey);
    },

    getRoot() {
        return document.documentElement;
    },

    getBody() {
        return document.body;
    },

    getThemeConfig(setKey = '') {
        return CONFIG.getSetTheme(setKey) || { cssVars: {}, meta: {} };
    },

    clearAppliedCssVars() {
        const root = this.getRoot();
        if (!root) return;

        this.appliedVarKeys.forEach(key => {
            root.style.removeProperty(key);
        });

        this.appliedVarKeys.clear();
    },

    applyCssVars(cssVars = {}) {
        const root = this.getRoot();
        if (!root) return;

        Object.entries(cssVars).forEach(([key, value]) => {
            if (!key || value === null || value === undefined || value === '') {
                return;
            }

            root.style.setProperty(key, String(value));
            this.appliedVarKeys.add(key);
        });
    },

    applyBodyClass(bodyClass = '') {
        const body = this.getBody();
        if (!body) return;

        Array.from(body.classList)
            .filter(className => className.startsWith('theme-'))
            .forEach(className => body.classList.remove(className));

        if (bodyClass) {
            body.classList.add(bodyClass);
        }
    },

    applySetTheme(setKey = '', options = {}) {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const theme = this.getThemeConfig(resolvedSetKey);
        const cssVars = theme?.cssVars || {};
        const meta = theme?.meta || {};

        this.clearAppliedCssVars();
        this.applyCssVars(cssVars);
        this.applyBodyClass(meta.bodyClass || '');

        const root = this.getRoot();
        if (root) {
            root.dataset.activeSet = resolvedSetKey;
            root.dataset.activeTheme = String(meta.themeName || resolvedSetKey);
        }

        this.currentSet = resolvedSetKey;

        if (!options.silent) {
            console.log(`Theme aktiv: ${resolvedSetKey}`);
        }
    },

    resolveInitialSet() {
        const activeAdventureSet = window.ApiCardLookup?.getActiveSetKey?.();
        if (activeAdventureSet && CONFIG.hasSet(activeAdventureSet)) {
            return activeAdventureSet;
        }

        const archiveSet = window.Archive?.currentSet;
        if (archiveSet && CONFIG.hasSet(archiveSet)) {
            return archiveSet;
        }

        return CONFIG.defaultSet;
    },

    bindEvents() {
        if (this.isBound) {
            return;
        }

        const archiveEvent = Constants.events.archiveSetChanged;
        const rulebookEvent = Constants.events.rulebookIndexLoaded;
        const setChangedEvent = Constants.events.setChanged;

        Events.on(archiveEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        Events.on(rulebookEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        Events.on(setChangedEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        this.isBound = true;
    },

    init() {
        this.bindEvents();
        this.applySetTheme(this.resolveInitialSet(), { silent: true });
    }
};

export default Theme;
