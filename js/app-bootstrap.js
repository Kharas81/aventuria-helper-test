window.AppBootstrap = {
    async populateAdventurePicker() {
        await window.AppControls?.populateAdventurePicker?.();
    },

    bindEvents() {
        window.AppControls?.bindEvents?.();
        window.AppPersistence?.bindAutoSave?.();
    },

    async restoreSavedState() {
        await window.AppPersistence?.restoreSavedState?.();
    },

    async initializeUi() {
        await this.populateAdventurePicker();
        this.bindEvents();
        await this.restoreSavedState();
    }
};
