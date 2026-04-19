import Utils from '../../core/utils.js';
import ArchiveRenderer from './renderer.js';
import ArchiveController from './archive-controller.js';

export const ArchiveBindings = {
    getModal() {
        return Utils.byId('archive-modal');
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

    bindModalClose() {
        const modal = this.getModal();
        if (!modal || modal.dataset.bound === 'true') {
            return;
        }

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                ArchiveController.close();
            }
        });

        modal.dataset.bound = 'true';
    },

    init() {
        this.bindSearch();
        this.bindModalClose();
    }
};

export default ArchiveBindings;
