import Utils from '../../core/utils.js';

export const RulebookUIDom = {
    getModal() {
        return Utils.byId('rulebook-modal');
    },

    getReaderTab() {
        return Utils.byId('reader-tab');
    },

    getCodexTab() {
        return Utils.byId('codex-tab');
    },

    getManualContent() {
        return Utils.byId('manual-content');
    },

    getPageIndicator() {
        return Utils.byId('manual-page-indicator');
    },

    getManualPageList() {
        return Utils.byId('manual-page-list');
    },

    getCodexResults() {
        return Utils.byId('codex-results');
    },

    getCodexSearch() {
        return Utils.byId('codex-search');
    },

    getManualSetLabel() {
        return Utils.byId('manual-set-label');
    },

    getManualTitle() {
        return Utils.byId('manual-title');
    }
};

export default RulebookUIDom;
