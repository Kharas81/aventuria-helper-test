import ArchiveRenderer from './renderer.js';
import ArchiveController from './archive-controller.js';
import ArchiveModal from '../../templates/archive-modal.js';

export const ArchiveBindings = {
    getModal() {
        return ArchiveModal.ensure();
    },

    getCloseButton() {
        const modal = this.getModal();
        return modal?.querySelector('[data-action="close-archive"]') || null;
    },

    bindSearch() {
        const searchInput = ArchiveRenderer.getSearchInput();
        if (!searchInput || searchInput.dataset.bound === 'true') {
            return;
        }

        searchInput.addEventListener('input', event => {
            ArchiveController.handleSearch(event.target.value);
        });

        searchInput.dataset.bound = 'true';
    },

    bindBackdropClose() {
        const modal = this.getModal();
        if (!modal || modal.dataset.backdropBound === 'true') {
            return;
        }

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                ArchiveController.close();
            }
        });

        modal.dataset.backdropBound = 'true';
    },

    bindCloseButton() {
        const closeButton = this.getCloseButton();
        if (!closeButton || closeButton.dataset.bound === 'true') {
            return;
        }

        closeButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            ArchiveController.close();
        });

        closeButton.dataset.bound = 'true';
    },

    init() {
        this.bindSearch();
        this.bindBackdropClose();
        this.bindCloseButton();
    }
};

export default ArchiveBindings;
