import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ArchiveFilter from './filter.js';
import ArchiveRenderer from './renderer.js';
import ArchiveState from './archive-state.js';
import ArchiveModal from '../../templates/archive-modal.js';

import ArchiveSelectionFlow from './archive-selection-flow.js';
import ArchiveFilterFlow from './archive-filter-flow.js';
import ArchiveOpenFlow from './archive-open-flow.js';

export const ArchiveController = {
    getModal() {
        return ArchiveModal.ensure();
    },

    getResolvedArchiveSets() {
        return ArchiveOpenFlow.getResolvedArchiveSets();
    },

    buildHomeViewModel() {
        return ArchiveOpenFlow.buildHomeViewModel();
    },

    renderHome() {
        ArchiveOpenFlow.renderHome();
    },

    getSelectedCard() {
        return ArchiveSelectionFlow.getSelectedCard();
    },

    syncSelectedCard() {
        ArchiveSelectionFlow.syncSelectedCard();
    },

    applyFilters() {
        ArchiveFilterFlow.applyFilters();
        this.render();
    },

    async open(options = {}) {
        return ArchiveOpenFlow.open(options, {
            openModal: () => ArchiveModal.open(),
            loadSet: (setKey, loadOptions) => this.loadSet(setKey, loadOptions),
            renderHome: () => this.renderHome()
        });
    },

    close() {
        ArchiveModal.close();
    },

    async openCategory(categoryFilter = '', options = {}) {
        return ArchiveOpenFlow.openCategory(categoryFilter, options, {
            loadSet: (setKey, loadOptions) => this.loadSet(setKey, loadOptions)
        });
    },

    async loadSet(setKey = '', options = {}) {
        return ArchiveOpenFlow.loadSet(setKey, options, {
            applyFiltersAndRender: () => this.applyFilters()
        });
    },

    handleSearch(searchTerm = '') {
        const didApply = ArchiveFilterFlow.handleSearch(searchTerm);
        if (didApply) {
            this.render();
        }
    },

    setSourceFilter(sourceFilter = '') {
        const didApply = ArchiveFilterFlow.setSourceFilter(sourceFilter);
        if (didApply) {
            this.render();
        }
    },

    setCategoryFilter(categoryFilter = '') {
        const didApply = ArchiveFilterFlow.setCategoryFilter(categoryFilter);
        if (didApply) {
            this.render();
        }
    },

    setSelectedCard(cardId = '') {
        if (ArchiveState.isHomeView) {
            return;
        }

        ArchiveState.selectedCardId = ArchiveState.normalizeSelectedCardId(cardId);
        this.render();
    },

    render() {
        if (ArchiveState.isHomeView) {
            this.renderHome();
            return;
        }

        ArchiveRenderer.renderToolbar({
            activeSetKey: ArchiveState.currentSet,
            activeSourceFilter: ArchiveState.currentSourceFilter,
            activeCategoryFilter: ArchiveState.currentCategoryFilter,
            availableSources: ArchiveFilter.getAvailableSources(ArchiveState.allCards),
            availableCategories: ArchiveFilter.getAvailableCategories(ArchiveState.allCards),
            currentQuery: ArchiveState.currentSearchTerm,
            filteredCount: ArchiveState.filteredCards.length,
            totalCount: ArchiveState.allCards.length
        });

        ArchiveRenderer.renderGrid(ArchiveState.filteredCards, {
            query: ArchiveState.currentSearchTerm,
            sourceFilter: ArchiveState.currentSourceFilter,
            categoryFilter: ArchiveState.currentCategoryFilter,
            selectedCardId: ArchiveState.selectedCardId,
            selectedCard: this.getSelectedCard()
        });
    }
};

export default ArchiveController;
