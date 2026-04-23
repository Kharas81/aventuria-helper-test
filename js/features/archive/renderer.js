import ArchiveEmptyStateRenderer from './archive-empty-state-renderer.js';
import ArchiveHomeLayout from './archive-home-layout.js';
import ArchiveBrowserLayout from './archive-browser-layout.js';
import ArchiveModal from '../../templates/archive-modal.js';

export const ArchiveRenderer = {
    latestBrowserOptions: null,

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

    prepareSurface(surfaceClassName = 'archive-surface') {
        const grid = this.getGrid();
        if (!grid) {
            return null;
        }

        grid.className = surfaceClassName;
        return grid;
    },

    showLoading() {
        this.setSearchEnabled(true, 'Karten suchen ...');

        const grid = this.prepareSurface('archive-surface');
        if (!grid) {
            return;
        }

        ArchiveEmptyStateRenderer.showLoading(grid);
    },

    showError(message = '') {
        this.setSearchEnabled(true, 'Karten suchen ...');

        const grid = this.prepareSurface('archive-surface');
        if (!grid) {
            return;
        }

        ArchiveEmptyStateRenderer.showError(grid, message);
    },

    showEmpty(message = '') {
        this.setSearchEnabled(true, 'Karten suchen ...');

        const grid = this.prepareSurface('archive-surface');
        if (!grid) {
            return;
        }

        ArchiveEmptyStateRenderer.showEmpty(grid, message);
    },

    renderHome(options = {}) {
        this.latestBrowserOptions = null;
        this.clearToolbar();
        this.setSearchValue('');
        this.setSearchEnabled(false, 'Wähle zuerst einen Bereich ...');

        const grid = this.prepareSurface('archive-surface archive-surface--home');
        if (!grid) {
            return;
        }

        grid.innerHTML = ArchiveHomeLayout.render(options);
    },

    renderToolbar(options = {}) {
        this.latestBrowserOptions = options;
        this.clearToolbar();
        this.setSearchEnabled(true, 'Karten suchen ...');
    },

    renderGrid(cards = [], options = {}) {
        const grid = this.prepareSurface('archive-surface archive-surface--browser');
        if (!grid) {
            return;
        }

        ArchiveBrowserLayout.render(grid, {
            sidebarOptions: this.latestBrowserOptions || {},
            cards,
            listOptions: options,
            selectedCard: options?.selectedCard || null
        });
    }
};

export default ArchiveRenderer;
