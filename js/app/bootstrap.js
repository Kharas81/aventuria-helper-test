import AppControls from './controls.js';
import AppPersistence from './persistence.js';

export const AppBootstrap = {
    async populateAdventurePicker() {
        await AppControls.populateAdventurePicker();
    },

    bindEvents() {
        AppControls.bindEvents();
        AppPersistence.bindAutoSave();
    },

    async restoreSavedState() {
        await AppPersistence.restoreSavedState();
    },

    async initializeUi() {
        await this.populateAdventurePicker();
        this.bindEvents();
        await this.restoreSavedState();
    }
};

export default AppBootstrap;
