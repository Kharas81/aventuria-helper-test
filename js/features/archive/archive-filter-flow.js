import Utils from '../../core/utils.js';
import ArchiveState from './archive-state.js';
import ArchiveFilter from './filter.js';
import ArchiveSelectionFlow from './archive-selection-flow.js';

export const ArchiveFilterFlow = {
    applyFilters() {
        ArchiveState.filteredCards = ArchiveFilter.filterCards(ArchiveState.allCards, {
            searchTerm: ArchiveState.currentSearchTerm,
            sourceFilter: ArchiveState.currentSourceFilter,
            categoryFilter: ArchiveState.currentCategoryFilter
        });

        ArchiveSelectionFlow.syncSelectedCard();
    },

    handleSearch(searchTerm = '') {
        if (ArchiveState.isHomeView) {
            return false;
        }

        ArchiveState.currentSearchTerm = Utils.normalizeString(searchTerm);
        this.applyFilters();
        return true;
    },

    setSourceFilter(sourceFilter = '') {
        if (ArchiveState.isHomeView) {
            return false;
        }

        ArchiveState.currentSourceFilter = ArchiveState.normalizeSourceFilter(sourceFilter);
        this.applyFilters();
        return true;
    },

    setCategoryFilter(categoryFilter = '') {
        if (ArchiveState.isHomeView) {
            return false;
        }

        ArchiveState.currentCategoryFilter = ArchiveState.normalizeCategoryFilter(categoryFilter);
        this.applyFilters();
        return true;
    }
};

export default ArchiveFilterFlow;
