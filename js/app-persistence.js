window.AppPersistence = {
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

        window.State.reset();
        window.AppStateSync?.resetUIToDefaults();
        window.Diagnostics?.clear?.();
        window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
    },

    async restoreSavedState() {
        const state = window.State?.getState?.();
        if (!state) return;

        window.App.isApplyingSavedState = true;

        try {
            window.AppStateSync?.applyStateToControls?.();

            if (state.selectedAdventure) {
                await window.AppAdventureFlow?.handleUpdate?.({ skipPersist: true });
            } else {
                window.AppStateSync?.resetUIToDefaults?.();
                window.Diagnostics?.clear?.();
            }

            window.AppStateSync?.applySavedSubsystems?.(state);
        } finally {
            window.App.isApplyingSavedState = false;
        }
    }
};
