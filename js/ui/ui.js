import UIPreview from './preview.js';
import UIModals from './modals.js';
import UIStatus from './status.js';
import UIActions from './actions.js';

export const UI = {
    showPreview(event, imageSrc) {
        UIPreview.show(event, imageSrc);
    },

    movePreview(event) {
        UIPreview.move(event);
    },

    closePreview() {
        UIPreview.close();
    },

    openPreview(imageSrc) {
        UIPreview.open(imageSrc);
    },

    closeAllModals() {
        UIModals.closeAll();
    },

    setStatus(message) {
        UIStatus.set(message);
    },

    resetStatus() {
        UIStatus.reset();
    },

    getSectionStateKey(sectionId) {
        return UIActions.getSectionStateKey(sectionId);
    },

    toggleSection(sectionId) {
        UIActions.toggleSection(sectionId);
    },

    handleActionTrigger(trigger) {
        UIActions.handleActionTrigger(trigger);
    },

    bindGlobalUiEvents() {
        UIActions.bindGlobalUiEvents();
    },

    init() {
        UIActions.init();
    }
};

export default UI;
