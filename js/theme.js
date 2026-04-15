window.Theme = {
    currentSet: '',
    appliedVarKeys: new Set(),
    isBound: false,

    normalizeSetKey(setKey = '') {
        return window.CONFIG?.normalizeSetKey?.(setKey) || String(setKey || '').trim() || 'base_game';
    },

    getRoot() {
        return document.documentElement;
    },

    getBody() {
        return document.body;
    },

    getThemeConfig(setKey = '') {
        return window.CONFIG?.getSetTheme?.(setKey) || { cssVars: {}, meta: {} };
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
        if (activeAdventureSet && window.CONFIG?.hasSet?.(activeAdventureSet)) {
            return activeAdventureSet;
        }

        const archiveSet = window.Archive?.currentSet;
        if (archiveSet && window.CONFIG?.hasSet?.(archiveSet)) {
            return archiveSet;
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    bindEvents() {
        if (this.isBound) {
            return;
        }

        const archiveEvent = window.Constants?.events?.archiveSetChanged || 'archive:setChanged';
        const rulebookEvent = window.Constants?.events?.rulebookIndexLoaded || 'rulebook:indexLoaded';
        const setChangedEvent = window.Constants?.events?.setChanged || 'set:changed';

        window.Events?.on?.(archiveEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        window.Events?.on?.(rulebookEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        window.Events?.on?.(setChangedEvent, payload => {
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

document.addEventListener('DOMContentLoaded', () => {
    window.Theme?.init?.();
});
