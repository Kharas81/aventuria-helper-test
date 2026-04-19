import Utils from '../core/utils.js';

const RULEBOOK_TEMPLATE_ID = 'rulebook-modal-template';
const RULEBOOK_MODAL_ID = 'rulebook-modal';
const READER_TAB_ID = 'reader-tab';
const CODEX_TAB_ID = 'codex-tab';
const MANUAL_CONTENT_ID = 'manual-content';
const MANUAL_PAGE_INDICATOR_ID = 'manual-page-indicator';
const MANUAL_PAGE_LIST_ID = 'manual-page-list';
const CODEX_RESULTS_ID = 'codex-results';
const CODEX_SEARCH_ID = 'codex-search';
const MANUAL_SET_LABEL_ID = 'manual-set-label';
const MANUAL_TITLE_ID = 'manual-title';

export const RulebookModal = {
    getTemplate() {
        return document.getElementById(RULEBOOK_TEMPLATE_ID);
    },

    getModal() {
        return Utils.byId(RULEBOOK_MODAL_ID);
    },

    getReaderTab() {
        return Utils.byId(READER_TAB_ID);
    },

    getCodexTab() {
        return Utils.byId(CODEX_TAB_ID);
    },

    getManualContent() {
        return Utils.byId(MANUAL_CONTENT_ID);
    },

    getPageIndicator() {
        return Utils.byId(MANUAL_PAGE_INDICATOR_ID);
    },

    getManualPageList() {
        return Utils.byId(MANUAL_PAGE_LIST_ID);
    },

    getCodexResults() {
        return Utils.byId(CODEX_RESULTS_ID);
    },

    getCodexSearch() {
        return Utils.byId(CODEX_SEARCH_ID);
    },

    getManualSetLabel() {
        return Utils.byId(MANUAL_SET_LABEL_ID);
    },

    getManualTitle() {
        return Utils.byId(MANUAL_TITLE_ID);
    },

    ensure() {
        let modal = this.getModal();
        if (modal) {
            return modal;
        }

        const template = this.getTemplate();
        if (!template?.content) {
            console.warn(`Template "${RULEBOOK_TEMPLATE_ID}" wurde nicht gefunden.`);
            return null;
        }

        const fragment = template.content.cloneNode(true);
        document.body.appendChild(fragment);

        modal = this.getModal();
        return modal || null;
    },

    open() {
        const modal = this.ensure();
        if (modal) {
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
        }
        return modal;
    },

    close() {
        const modal = this.getModal();
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    }
};

export default RulebookModal;
