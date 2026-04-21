import ArchiveToolbarRenderer from './archive-toolbar-renderer.js';
import ArchiveGridRenderer from './archive-grid-renderer.js';
import ArchiveEmptyStateRenderer from './archive-empty-state-renderer.js';
import ArchiveHomeRenderer from './archive-home-renderer.js';
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

    setSearchEnabled(isEnabled = true, placeholder = 'Karten suchen ...') {
        const searchInput = this.getSearchInput();
        if (!searchInput) {
            return;
        }

        searchInput.disabled = !isEnabled;
        searchInput.placeholder = placeholder;
    },

    clearToolbar() {
        const toolbar = this.getToolbarContainer();
        if (toolbar) {
            toolbar.innerHTML = '';
        }
    },

    showLoading() {
        this.setSearchEnabled(true, 'Karten suchen ...');
        ArchiveEmptyStateRenderer.showLoading(this.getGrid());
    },

    showError(message = '') {
        this.setSearchEnabled(true, 'Karten suchen ...');
        ArchiveEmptyStateRenderer.showError(this.getGrid(), message);
    },

    showEmpty(message = '') {
        this.setSearchEnabled(true, 'Karten suchen ...');
        ArchiveEmptyStateRenderer.showEmpty(this.getGrid(), message);
    },

    renderHome(options = {}) {
        this.clearToolbar();
        this.setSearchValue('');
        this.setSearchEnabled(false, 'Wähle zuerst einen Bereich ...');
        ArchiveHomeRenderer.renderHome(this.getGrid(), options);
    },

    renderToolbar(options = {}) {
        this.setSearchEnabled(true, 'Karten suchen ...');
        ArchiveToolbarRenderer.renderToolbar(this.getToolbarContainer(), options);
    },

    renderGrid(cards = [], options = {}) {
        ArchiveGridRenderer.renderGrid(this.getGrid(), cards, options);
    }
};

export default ArchiveRenderer;
