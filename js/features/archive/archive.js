import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import ArchiveLoader from './loader.js';
import ArchiveFilter from './filter.js';
import ArchiveRenderer from './renderer.js';

export const Archive = {
    currentSet: CONFIG.defaultSet || 'base_game',
    currentSearchTerm: '',
    currentSourceFilter: ArchiveFilter.ALL_SOURCE_FILTER,
    currentCategoryFilter: ArchiveFilter.ALL_CATEGORY_FILTER,
    allCards: [],
    filteredCards: [],
    isLoading: false,

    getModal() {
        return Utils.byId('archive-modal');
    },

    getSearchInput() {
        return Utils.byId('archive-search');
    },

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
    },

    applyFilters() {
        this.filteredCards = ArchiveFilter.filterCards(this.allCards, {
            searchTerm: this.currentSearchTerm,
            sourceFilter: this.currentSourceFilter,
            categoryFilter: this.currentCategoryFilter
        });

        this.render();
    },

    async open(options = {}) {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';

        const desiredSet = Utils.normalizeString(
            options?.setKey
            || ArchiveLoader.getSuggestedSetKey(this.currentSet)
            || this.getResolvedCurrentSet()
        );

        const hasExplicitQuery = Object.prototype.hasOwnProperty.call(options, 'query');
        const hasExplicitSource = Object.prototype.hasOwnProperty.call(options, 'sourceFilter');
        const hasExplicitCategory = Object.prototype.hasOwnProperty.call(options, 'categoryFilter');

        if (desiredSet !== this.currentSet || !this.allCards.length) {
            await this.loadSet(desiredSet, {
                query: hasExplicitQuery ? Utils.normalizeString(options.query) : this.currentSearchTerm,
                sourceFilter: hasExplicitSource
                    ? this.normalizeSourceFilter(options.sourceFilter)
                    : ArchiveFilter.ALL_SOURCE_FILTER,
                categoryFilter: hasExplicitCategory
                    ? this.normalizeCategoryFilter(options.categoryFilter)
                    : ArchiveFilter.ALL_CATEGORY_FILTER
            });
            return;
        }

        if (hasExplicitQuery) {
            this.currentSearchTerm = Utils.normalizeString(options.query);
        }

        if (hasExplicitSource) {
            this.currentSourceFilter = this.normalizeSourceFilter(options.sourceFilter);
        }

        if (hasExplicitCategory) {
            this.currentCategoryFilter = this.normalizeCategoryFilter(options.categoryFilter);
        }

        ArchiveRenderer.setSearchValue(this.currentSearchTerm);
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

        const previousSet = this.currentSet;
        const hasExplicitQuery = Object.prototype.hasOwnProperty.call(options, 'query');
        const hasExplicitSource = Object.prototype.hasOwnProperty.call(options, 'sourceFilter');
        const hasExplicitCategory = Object.prototype.hasOwnProperty.call(options, 'categoryFilter');

        this.currentSet = resolvedSetKey;
        this.isLoading = true;

        ArchiveRenderer.renderToolbar({
            activeSetKey: this.currentSet,
            activeSourceFilter: this.currentSourceFilter,
            activeCategoryFilter: this.currentCategoryFilter,
            availableSources: [],
            availableCategories: [],
            currentQuery: this.currentSearchTerm,
            filteredCount: 0,
            totalCount: 0
        });

        ArchiveRenderer.showLoading();

        try {
            const loadedCards = await ArchiveLoader.fetchCardsForSet(this.currentSet);

            this.allCards = Utils.normalizeArray(loadedCards);
            this.isLoading = false;

            if (hasExplicitQuery) {
                this.currentSearchTerm = Utils.normalizeString(options.query);
            }

            if (hasExplicitSource) {
                this.currentSourceFilter = this.normalizeSourceFilter(options.sourceFilter);
            } else if (resolvedSetKey !== previousSet) {
                this.currentSourceFilter = ArchiveFilter.ALL_SOURCE_FILTER;
            }

            if (hasExplicitCategory) {
                this.currentCategoryFilter = this.normalizeCategoryFilter(options.categoryFilter);
            } else if (resolvedSetKey !== previousSet) {
                this.currentCategoryFilter = ArchiveFilter.ALL_CATEGORY_FILTER;
            }

            ArchiveRenderer.setSearchValue(this.currentSearchTerm);
            this.applyFilters();

            Events.emit(
                Constants.events?.archiveSetChanged || 'archive:setChanged',
                {
                    source: 'archive',
                    setKey: this.currentSet,
                    cardCount: this.allCards.length
                }
            );

            Events.emit(
                Constants.events?.setChanged || 'set:changed',
                {
                    source: 'archive',
                    setKey: this.currentSet,
                    cardCount: this.allCards.length
                }
            );
        } catch (error) {
            this.isLoading = false;
            console.error('Fehler beim Laden des Archivs:', error);
            ArchiveRenderer.showError(error?.message || 'Fehler beim Laden des Archivs.');
        }
    },

    handleSearch(searchTerm = '') {
        this.currentSearchTerm = Utils.normalizeString(searchTerm);
        this.applyFilters();
    },

    setSourceFilter(sourceFilter = '') {
        this.currentSourceFilter = this.normalizeSourceFilter(sourceFilter);
        this.applyFilters();
    },

    setCategoryFilter(categoryFilter = '') {
        this.currentCategoryFilter = this.normalizeCategoryFilter(categoryFilter);
        this.applyFilters();
    },

    render() {
        ArchiveRenderer.renderToolbar({
            activeSetKey: this.currentSet,
            activeSourceFilter: this.currentSourceFilter,
            activeCategoryFilter: this.currentCategoryFilter,
            availableSources: ArchiveFilter.getAvailableSources(this.allCards),
            availableCategories: ArchiveFilter.getAvailableCategories(this.allCards),
            currentQuery: this.currentSearchTerm,
            filteredCount: this.filteredCards.length,
            totalCount: this.allCards.length
        });

        ArchiveRenderer.renderGrid(this.filteredCards, {
            query: this.currentSearchTerm,
            sourceFilter: this.currentSourceFilter,
            categoryFilter: this.currentCategoryFilter
        });
    },

    bindSearch() {
        const searchInput = this.getSearchInput();
        if (!searchInput || searchInput.dataset.bound === 'true') {
            return;
        }

        searchInput.addEventListener('input', event => {
            this.handleSearch(event.target.value);
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
                this.close();
            }
        });

        modal.dataset.bound = 'true';
    },

    init() {
        this.bindSearch();
        this.bindModalClose();

        ArchiveRenderer.renderToolbar({
            activeSetKey: this.currentSet,
            activeSourceFilter: this.currentSourceFilter,
            activeCategoryFilter: this.currentCategoryFilter,
            availableSources: [],
            availableCategories: [],
            currentQuery: '',
            filteredCount: 0,
            totalCount: 0
        });
    }
};

export default Archive;
