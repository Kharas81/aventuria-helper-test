export const AppRuntime = {
    getGlobal(name) {
        return window?.[name] ?? null;
    },

    getApp() {
        return this.getGlobal('App');
    },

    getUI() {
        return this.getGlobal('UI');
    },

    getStorageManager() {
        return this.getGlobal('StorageManager');
    },

    getDiagnostics() {
        return this.getGlobal('Diagnostics');
    },

    getCombat() {
        return this.getGlobal('Combat');
    },

    getRenderSetup() {
        return this.getGlobal('RenderSetup');
    },

    getNarrative() {
        return this.getGlobal('Narrative');
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

export default AppRuntime;
