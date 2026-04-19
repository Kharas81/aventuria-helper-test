import ArchiveToolbarRenderer from './archive-toolbar-renderer.js';
import ArchiveGridRenderer from './archive-grid-renderer.js';
import ArchiveEmptyStateRenderer from './archive-empty-state-renderer.js';
import ArchiveModal from '../../templates/archive-modal.js';

export const ArchiveRenderer = {
    getGrid() {
        ArchiveModal.ensure();
        return ArchiveModal.getGrid();
    },

    getToolbarContainer() {
        ArchiveModal.ensure();
        return ArchiveModal.getToolbarContainer();
    },

    getSearchInput() {
        ArchiveModal.ensure();
        return ArchiveModal.getSearchInput();
    },

    setSearchValue(value = '') {
        const searchInput = this.getSearchInput();
        if (searchInput) {
            searchInput.value = String(value ?? '').trim();
        }
    },

    showLoading() {
        ArchiveEmptyStateRenderer.showLoading(this.getGrid());
    },

    showError(message = '') {
        ArchiveEmptyStateRenderer.showError(this.getGrid(), message);
    },

    showEmpty(message = '') {
        ArchiveEmptyStateRenderer.showEmpty(this.getGrid(), message);
    },

    renderToolbar(options = {}) {
        ArchiveToolbarRenderer.renderToolbar(this.getToolbarContainer(), options);
    },

    renderGrid(cards = [], options = {}) {
        ArchiveGridRenderer.renderGrid(this.getGrid(), cards, options);
    }
};

export default ArchiveRenderer;
