window.UI = {
    showPreview(event, imageSrc) {
        window.UIPreview?.show(event, imageSrc);
    },

    movePreview(event) {
        window.UIPreview?.move(event);
    },

    closePreview() {
        window.UIPreview?.close();
    },

    openPreview(imageSrc) {
        window.UIPreview?.open(imageSrc);
    },

    closeAllModals() {
        window.UIModals?.closeAll();
    },

    setStatus(message) {
        window.UIStatus?.set?.(message);
    },

    resetStatus() {
        window.UIStatus?.reset?.();
    },

    getSectionStateKey(sectionId) {
        return window.UIActions?.getSectionStateKey?.(sectionId) || null;
    },

    toggleSection(sectionId) {
        window.UIActions?.toggleSection?.(sectionId);
    },

    handleActionTrigger(trigger) {
        window.UIActions?.handleActionTrigger?.(trigger);
    },

    bindGlobalUiEvents() {
        window.UIActions?.bindGlobalUiEvents?.();
    },

    init() {
        window.UIActions?.init?.();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.UI?.init) {
        window.UI.init();
    }
});
