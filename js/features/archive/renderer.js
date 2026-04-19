import Utils from '../../core/utils.js';
import ArchiveToolbarRenderer from './archive-toolbar-renderer.js';
import ArchiveGridRenderer from './archive-grid-renderer.js';
import ArchiveEmptyStateRenderer from './archive-empty-state-renderer.js';

export const ArchiveRenderer = {
    getGrid() {
        return Utils.byId('archive-grid');
    },

    getToolbarContainer() {
        return Utils.byId('archive-set-buttons');
    },

    getSearchInput() {
        return Utils.byId('archive-search');
    },

    setSearchValue(value = '') {
        const searchInput = this.getSearchInput();
        if (searchInput) {
            searchInput.value = Utils.normalizeString(value);
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
