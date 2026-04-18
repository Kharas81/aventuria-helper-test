import CoreRuntime from '../core/runtime.js';

export const AppRuntime = {
    getGlobal(name) {
        return CoreRuntime.getGlobal(name);
    },

    getApp() {
        return CoreRuntime.getApp();
    },

    getUI() {
        return CoreRuntime.getUI();
    },

    getStorageManager() {
        return CoreRuntime.getStorageManager();
    },

    getDiagnostics() {
        return CoreRuntime.getDiagnostics();
    },

    getCombat() {
        return CoreRuntime.getCombat();
    },

    getRenderSetup() {
        return CoreRuntime.getRenderSetup();
    },

    getNarrative() {
        return CoreRuntime.getNarrative();
    },

    setStatus(message) {
        CoreRuntime.setStatus(message);
    },

    clearDiagnostics() {
        CoreRuntime.clearDiagnostics();
    },

    isApplyingSavedState() {
        return CoreRuntime.isApplyingSavedState();
    },

    setApplyingSavedState(value) {
        CoreRuntime.setApplyingSavedState(value);
    },

    persistIfAllowed() {
        CoreRuntime.persistIfAllowed();
    }
};

export default AppRuntime;
