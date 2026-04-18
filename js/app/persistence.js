import State from '../core/state.js';
import AppStateSync from './state-sync.js';
import AppAdventureFlow from './adventure-flow.js';

export const AppPersistence = {
    autoSaveBound: false,

    bindAutoSave() {
        if (this.autoSaveBound) {
            return;
        }

        window.StorageManager?.bindAutoSave?.();
        this.autoSaveBound = true;
    },

    saveCurrentState() {
        if (!window.StorageManager) {
            window.UI?.setStatus?.('⚠️ Speichern nicht verfügbar.');
            return;
        }

        window.StorageManager.persist();
        window.UI?.setStatus?.('💾 Spielstand gespeichert.');
    },

    async clearSavedState() {
        if (window.StorageManager) {
            window.StorageManager.clearState();
        }

        State.reset();
        AppStateSync.resetUIToDefaults();
        window.Diagnostics?.clear?.();
        window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
    },

    async restoreSavedState() {
        const state = State.getState();
        if (!state) return;

        if (window.App) {
            window.App.isApplyingSavedState = true;
        }

        try {
            AppStateSync.applyStateToControls();

            if (state.selectedAdventure) {
                await AppAdventureFlow.handleUpdate({ skipPersist: true });
            } else {
                AppStateSync.resetUIToDefaults();
                window.Diagnostics?.clear?.();
            }
        } finally {
            if (window.App) {
                window.App.isApplyingSavedState = false;
            }
        }
    }
};

export default AppPersistence;
