import RulebookModal from '../../templates/rulebook-modal.js';

export const RulebookUIDom = {
    getModal() {
        return RulebookModal.ensure();
    },

    getReaderTab() {
        RulebookModal.ensure();
        return RulebookModal.getReaderTab();
    },

    getCodexTab() {
        RulebookModal.ensure();
        return RulebookModal.getCodexTab();
    },

    getManualContent() {
        RulebookModal.ensure();
        return RulebookModal.getManualContent();
    },

    getPageIndicator() {
        RulebookModal.ensure();
        return RulebookModal.getPageIndicator();
    },

    getManualPageList() {
        RulebookModal.ensure();
        return RulebookModal.getManualPageList();
    },

    getCodexResults() {
        RulebookModal.ensure();
        return RulebookModal.getCodexResults();
    },

    getCodexSearch() {
        RulebookModal.ensure();
        return RulebookModal.getCodexSearch();
    },

    getManualSetLabel() {
        RulebookModal.ensure();
        return RulebookModal.getManualSetLabel();
    },

    getManualTitle() {
        RulebookModal.ensure();
        return RulebookModal.getManualTitle();
    }
};

export default RulebookUIDom;
