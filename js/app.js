window.App = {
    isApplyingSavedState: false,
    isInitialized: false,

    async init() {
        if (this.isInitialized) {
            return;
        }

        this.isInitialized = true;

        try {
            const savedState = window.StorageManager?.loadState?.()
                || window.State.getDefaultState();

            window.State.replaceState(savedState);

            await window.AppBootstrap?.populateAdventurePicker();
            window.AppBootstrap?.bindEvents();
            await window.AppBootstrap?.restoreSavedState();

            console.log('App initialisiert (Modulare Architektur).');
        } catch (error) {
            this.isInitialized = false;
            console.error('Fehler bei App.init():', error);
            window.UI?.setStatus?.('⚠️ App konnte nicht initialisiert werden.');
            throw error;
        }
    }
};

if (!window.__AVENTURIA_SKIP_AUTO_INIT__) {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.App?.init) {
            window.App.init();
        }
    });
}
