import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import ArchiveLoader from './loader.js';
import ArchiveFilter from './filter.js';
import ArchiveRenderer from './renderer.js';
import ArchiveState from './archive-state.js';

export const ArchiveController = {
    getModal() {
        return Utils.byId('archive-modal');
    },

    applyFilters() {
        ArchiveState.filteredCards = ArchiveFilter.filterCards(ArchiveState.allCards, {
            searchTerm: ArchiveState.currentSearchTerm,
            sourceFilter: ArchiveState.currentSourceFilter,
            categoryFilter: ArchiveState.currentCategoryFilter
        });

        this.render();
    },

    async open(options = {}) {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';

        const desiredSet = Utils.normalizeString(
            options?.setKey
            || ArchiveLoader.getSuggestedSetKey(ArchiveState.currentSet)
            || ArchiveState.getResolvedCurrentSet()
        );

        const hasExplicitQuery = Object.prototype.hasOwnProperty.call(options, 'query');
        const hasExplicitSource = Object.prototype.hasOwnProperty.call(options, 'sourceFilter');
        const hasExplicitCategory = Object.prototype.hasOwnProperty.call(options, 'categoryFilter');

        if (desiredSet !== ArchiveState.currentSet || !ArchiveState.allCards.length) {
            await this.loadSet(desiredSet, {
                query: hasExplicitQuery ? Utils.normalizeString(options.query) : ArchiveState.currentSearchTerm,
                sourceFilter: hasExplicitSource
                    ? ArchiveState.normalizeSourceFilter(options.sourceFilter)
                    : ArchiveFilter.ALL_SOURCE_FILTER,
                categoryFilter: hasExplicitCategory
                    ? ArchiveState.normalizeCategoryFilter(options.categoryFilter)
                    : ArchiveFilter.ALL_CATEGORY_FILTER
            });
            return;
        }

        if (hasExplicitQuery) {
            ArchiveState.currentSearchTerm = Utils.normalizeString(options.query);
        }

        if (hasExplicitSource) {
            ArchiveState.currentSourceFilter = ArchiveState.normalizeSourceFilter(options.sourceFilter);
        }

        if (hasExplicitCategory) {
            ArchiveState.currentCategoryFilter = ArchiveState.normalizeCategoryFilter(options.categoryFilter);
        }

        ArchiveRenderer.setSearchValue(ArchiveState.currentSearchTerm);
        this.applyFilters();
    },

    close() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'none';
    },

    async loadSet(setKey = '', options = {}) {
        const resolvedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );

        if (!resolvedSetKey) {
            return;
        }

        const previousSet = ArchiveState.currentSet;
        const hasExplicitQuery = Object.prototype.hasOwnProperty.call(options, 'query');
        const hasExplicitSource = Object.prototype.hasOwnProperty.call(options, 'sourceFilter');
        const hasExplicitCategory = Object.prototype.hasOwnProperty.call(options, 'categoryFilter');

        ArchiveState.currentSet = resolvedSetKey;
        ArchiveState.isLoading = true;

        ArchiveRenderer.renderToolbar({
            activeSetKey: ArchiveState.currentSet,
            activeSourceFilter: ArchiveState.currentSourceFilter,
            activeCategoryFilter: ArchiveState.currentCategoryFilter,
            availableSources: [],
            availableCategories: [],
            currentQuery: ArchiveState.currentSearchTerm,
            filteredCount: 0,
            totalCount: 0
        });

        ArchiveRenderer.showLoading();

        try {
            const loadedCards = await ArchiveLoader.fetchCardsForSet(ArchiveState.currentSet);

            ArchiveState.allCards = Utils.normalizeArray(loadedCards);
            ArchiveState.isLoading = false;

            if (hasExplicitQuery) {
                ArchiveState.currentSearchTerm = Utils.normalizeString(options.query);
            }

            if (hasExplicitSource) {
                ArchiveState.currentSourceFilter = ArchiveState.normalizeSourceFilter(options.sourceFilter);
            } else if (resolvedSetKey !== previousSet) {
                ArchiveState.currentSourceFilter = ArchiveFilter.ALL_SOURCE_FILTER;
            }

            if (hasExplicitCategory) {
                ArchiveState.currentCategoryFilter = ArchiveState.normalizeCategoryFilter(options.categoryFilter);
            } else if (resolvedSetKey !== previousSet) {
                ArchiveState.currentCategoryFilter = ArchiveFilter.ALL_CATEGORY_FILTER;
            }

            ArchiveRenderer.setSearchValue(ArchiveState.currentSearchTerm);
            this.applyFilters();

            Events.emit(
                Constants.events?.archiveSetChanged || 'archive:setChanged',
                {
                    source: 'archive',
                    setKey: ArchiveState.currentSet,
                    cardCount: ArchiveState.allCards.length
                }
            );

            Events.emit(
                Constants.events?.setChanged || 'set:changed',
                {
                    source: 'archive',
                    setKey: ArchiveState.currentSet,
                    cardCount: ArchiveState.allCards.length
                }
            );
        } catch (error) {
            ArchiveState.isLoading = false;
            console.error('Fehler beim Laden des Archivs:', error);
            ArchiveRenderer.showError(error?.message || 'Fehler beim Laden des Archivs.');
        }
    },

    handleSearch(searchTerm = '') {
        ArchiveState.currentSearchTerm = Utils.normalizeString(searchTerm);
        this.applyFilters();
    },

    setSourceFilter(sourceFilter = '') {
        ArchiveState.currentSourceFilter = ArchiveState.normalizeSourceFilter(sourceFilter);
        this.applyFilters();
    },

    setCategoryFilter(categoryFilter = '') {
        ArchiveState.currentCategoryFilter = ArchiveState.normalizeCategoryFilter(categoryFilter);
        this.applyFilters();
    },

    render() {
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
            categoryFilter: ArchiveState.currentCategoryFilter
        });
    }
};

export default ArchiveController;
