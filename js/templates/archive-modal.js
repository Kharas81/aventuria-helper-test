import Utils from '../core/utils.js';

const ARCHIVE_TEMPLATE_ID = 'archive-modal-template';
const ARCHIVE_MODAL_ID = 'archive-modal';
const ARCHIVE_SEARCH_ID = 'archive-search';
const ARCHIVE_SET_BUTTONS_ID = 'archive-set-buttons';
const ARCHIVE_GRID_ID = 'archive-grid';

export const ArchiveModal = {
    getTemplate() {
        return document.getElementById(ARCHIVE_TEMPLATE_ID);
    },

    getModal() {
        return Utils.byId(ARCHIVE_MODAL_ID);
    },

    getSearchInput() {
        return Utils.byId(ARCHIVE_SEARCH_ID);
    },

    getToolbarContainer() {
        return Utils.byId(ARCHIVE_SET_BUTTONS_ID);
    },

    getGrid() {
        return Utils.byId(ARCHIVE_GRID_ID);
    },

    ensure() {
        let modal = this.getModal();
        if (modal) {
            return modal;
        }

        const template = this.getTemplate();
        if (!template?.content) {
            console.warn(`Template "${ARCHIVE_TEMPLATE_ID}" wurde nicht gefunden.`);
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

export default ArchiveModal;
