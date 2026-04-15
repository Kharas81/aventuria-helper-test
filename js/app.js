window.App = {
    isApplyingSavedState: false,

    async init() {
        // State initialisieren
        const savedState = window.StorageManager?.loadState?.() || window.State.getDefaultState();
        window.State.replaceState(savedState);

        // UI aufbauen
        await window.AppBootstrap?.populateAdventurePicker();
        
        // Events binden
        window.AppBootstrap?.bindEvents();
        
        // Gespeicherten Zustand laden
        await window.AppBootstrap?.restoreSavedState();

        console.log('App initialisiert (Modulare Architektur).');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.App?.init) {
        window.App.init();
    }
});
