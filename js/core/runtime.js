export const CoreRuntime = {
    getGlobal(name) {
        return window?.[name] ?? null;
    },

    getApp() {
        return this.getGlobal('App');
    },

    getUI() {
        return this.getGlobal('UI');
    },

    getArchive() {
        return this.getGlobal('Archive');
    },

    getRulebook() {
        return this.getGlobal('Rulebook');
    },

    getCombat() {
        return this.getGlobal('Combat');
    },

    getDiagnostics() {
        return this.getGlobal('Diagnostics');
    },

    getRenderCardDetail() {
        return this.getGlobal('RenderCardDetail');
    },

    getRenderSetup() {
        return this.getGlobal('RenderSetup');
    },

    getNarrative() {
        return this.getGlobal('Narrative');
    },

    getApiCardLookup() {
        return this.getGlobal('ApiCardLookup');
    },

    getStorageManager() {
        return this.getGlobal('StorageManager');
    },

    setStatus(message) {
        this.getUI()?.setStatus?.(message);
    },

    clearDiagnostics() {
        this.getDiagnostics()?.clear?.();
    },

    isApplyingSavedState() {
        return Boolean(this.getApp()?.isApplyingSavedState);
    },

    setApplyingSavedState(value) {
        const app = this.getApp();
        if (app) {
            app.isApplyingSavedState = Boolean(value);
        }
    },

    persistIfAllowed() {
        if (this.isApplyingSavedState()) {
            return;
        }

        this.getStorageManager()?.persist?.();
    }
};

export default CoreRuntime;
