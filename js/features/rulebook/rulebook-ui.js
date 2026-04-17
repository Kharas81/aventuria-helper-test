import RulebookUIDom from './rulebook-ui-dom.js';
import RulebookUIRender from './rulebook-ui-render.js';
import RulebookUITabs from './rulebook-ui-tabs.js';
import RulebookUIBindings from './rulebook-ui-bindings.js';

export const RulebookUI = {
    getModal() {
        return RulebookUIDom.getModal();
    },

    getReaderTab() {
        return RulebookUIDom.getReaderTab();
    },

    getCodexTab() {
        return RulebookUIDom.getCodexTab();
    },

    getManualContent() {
        return RulebookUIDom.getManualContent();
    },

    getPageIndicator() {
        return RulebookUIDom.getPageIndicator();
    },

    getManualPageList() {
        return RulebookUIDom.getManualPageList();
    },

    getCodexResults() {
        return RulebookUIDom.getCodexResults();
    },

    getCodexSearch() {
        return RulebookUIDom.getCodexSearch();
    },

    getManualSetLabel() {
        return RulebookUIDom.getManualSetLabel();
    },

    getManualTitle() {
        return RulebookUIDom.getManualTitle();
    },

    updateSetLabel(setKey = '') {
        return RulebookUIRender.updateSetLabel(setKey);
    },

    renderPageList(indexData, onJump) {
        return RulebookUIRender.renderPageList(indexData, onJump);
    },

    clearCodexResults() {
        return RulebookUIRender.clearCodexResults();
    },

    resetCodexSearch() {
        return RulebookUIRender.resetCodexSearch();
    },

    showModal() {
        return RulebookUITabs.showModal();
    },

    closeModal() {
        return RulebookUITabs.closeModal();
    },

    async showTab(tabName, rulebook) {
        return RulebookUITabs.showTab(tabName, rulebook);
    },

    bind(rulebook) {
        return RulebookUIBindings.bind(rulebook);
    }
};

export default RulebookUI;
