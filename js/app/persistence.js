import State from '../core/state.js';
import AppStateSync from './state-sync.js';
import AppAdventureFlow from './adventure-flow.js';
import AppRuntime from './runtime.js';

export const AppPersistence = {
    autoSaveBound: false,

    bindAutoSave() {
        if (this.autoSaveBound) {
            return;
        }

        AppRuntime.getStorageManager()?.bindAutoSave?.();
        this.autoSaveBound = true;
    },

    saveCurrentState() {
        const storageManager = AppRuntime.getStorageManager();

        if (!storageManager) {
            AppRuntime.setStatus('⚠️ Speichern nicht verfügbar.');
            return;
        }

        storageManager.persist();
        AppRuntime.setStatus('💾 Spielstand gespeichert.');
    },

    async clearSavedState() {
        AppRuntime.getStorageManager()?.clearState?.();

        State.reset();
        AppStateSync.resetUIToDefaults();
        AppRuntime.clearDiagnostics();
        AppRuntime.setStatus('🗑️ Spielstand gelöscht.');
    },

    async restoreSavedState() {
        const state = State.getState();
        if (!state) return;

        AppRuntime.setApplyingSavedState(true);

        try {
            AppStateSync.applyStateToControls();

            if (state.selectedAdventure) {
                await AppAdventureFlow.handleUpdate({ skipPersist: true });
            } else {
                AppStateSync.resetUIToDefaults();
                AppRuntime.clearDiagnostics();
            }
        } finally {
            AppRuntime.setApplyingSavedState(false);
        }
    }
};

export default AppPersistence;
