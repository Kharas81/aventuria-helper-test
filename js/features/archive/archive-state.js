import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ArchiveFilter from './filter.js';

export const ArchiveState = {
    currentSet: CONFIG.defaultSet || 'base_game',
    currentSearchTerm: '',
    currentSourceFilter: ArchiveFilter.ALL_SOURCE_FILTER,
    currentCategoryFilter: ArchiveFilter.ALL_CATEGORY_FILTER,
    allCards: [],
    filteredCards: [],
    isLoading: false,

    getResolvedCurrentSet() {
        return Utils.normalizeString(
            this.currentSet || CONFIG.defaultSet || 'base_game'
        );
    },

    normalizeSourceFilter(sourceFilter = '') {
        const normalized = Utils.normalizeString(sourceFilter);
        return normalized || ArchiveFilter.ALL_SOURCE_FILTER;
    },

    normalizeCategoryFilter(categoryFilter = '') {
        const normalized = Utils.normalizeString(categoryFilter).toLowerCase();
        return normalized || ArchiveFilter.ALL_CATEGORY_FILTER;
    }
};

export default ArchiveState;
