import State from '../core/state.js';
import AppBootstrap from './bootstrap.js';

export const App = {
    isApplyingSavedState: false,
    isInitialized: false,

    async init() {
        if (this.isInitialized) {
            return;
        }

        this.isInitialized = true;

        try {
            const savedState = window.StorageManager?.loadState?.()
                || State.getDefaultState();

            State.replaceState(savedState);

            await AppBootstrap.initializeUi();

            console.log('App initialisiert (Modulare Architektur).');
        } catch (error) {
            this.isInitialized = false;
            console.error('Fehler bei App.init():', error);
            window.UI?.setStatus?.('⚠️ App konnte nicht initialisiert werden.');
            throw error;
        }
    }
};

export default App;
