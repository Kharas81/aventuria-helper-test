import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import ArchiveLoader from './loader.js';
import ArchiveFilter from './filter.js';
import ArchiveRenderer from './renderer.js';
import ArchiveState from './archive-state.js';

export const ArchiveOpenFlow = {
    getResolvedArchiveSets() {
        const archiveSets = CONFIG.getArchiveSets?.() || [];
        return archiveSets.length ? archiveSets : (CONFIG.getEnabledSets?.() || []);
    },

    buildHomeViewModel() {
        const availableArchiveSets = this.getResolvedArchiveSets();

        if (!availableArchiveSets.some(setConfig => setConfig.id === ArchiveState.currentSet)) {
            ArchiveState.currentSet = availableArchiveSets[0]?.id || CONFIG.defaultSet || 'base_game';
        }

        return {
            activeSetKey: ArchiveState.currentSet,
            activeSetName: CONFIG.getSetDisplayName?.(ArchiveState.currentSet),
            enabledSets: availableArchiveSets,
            totalLoadedCards: ArchiveState.allCards.length
        };
    },

    renderHome() {
        ArchiveState.isHomeView = true;
        ArchiveRenderer.renderHome(this.buildHomeViewModel());
    },

    async open(options = {}, deps = {}) {
        const modal = deps.openModal?.();
        if (!modal) {
            return;
        }

        const desiredSet = Utils.normalizeString(
            options?.setKey
            || ArchiveLoader.getSuggestedSetKey(ArchiveState.currentSet)
            || ArchiveState.getResolvedCurrentSet()
        );

        const hasExplicitQuery = Object.prototype.hasOwnProperty.call(options, 'query');
        const hasExplicitSource = Object.prototype.hasOwnProperty.call(options, 'sourceFilter');
        const hasExplicitCategory = Object.prototype.hasOwnProperty.call(options, 'categoryFilter');
        const hasExplicitSet = Object.prototype.hasOwnProperty.call(options, 'setKey');

        ArchiveState.currentSet = desiredSet || ArchiveState.currentSet;

        if (hasExplicitQuery || hasExplicitSource || hasExplicitCategory || hasExplicitSet) {
            await deps.loadSet?.(ArchiveState.currentSet, {
                query: hasExplicitQuery ? Utils.normalizeString(options.query) : '',
                sourceFilter: hasExplicitSource
                    ? ArchiveState.normalizeSourceFilter(options.sourceFilter)
                    : ArchiveFilter.ALL_SOURCE_FILTER,
                categoryFilter: hasExplicitCategory
                    ? ArchiveState.normalizeCategoryFilter(options.categoryFilter)
                    : ArchiveFilter.ALL_CATEGORY_FILTER
            });
            return;
        }

        deps.renderHome?.();
    },

    async openCategory(categoryFilter = '', options = {}, deps = {}) {
        const resolvedCategory = ArchiveState.normalizeCategoryFilter(categoryFilter);
        const resolvedSet = Utils.normalizeString(
            options?.setKey
            || ArchiveState.currentSet
            || CONFIG.defaultSet
            || 'base_game'
        );

        await deps.loadSet?.(resolvedSet, {
            query: '',
            sourceFilter: ArchiveFilter.ALL_SOURCE_FILTER,
            categoryFilter: resolvedCategory
        });
    },

    async loadSet(setKey = '', options = {}, deps = {}) {
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
        ArchiveState.isHomeView = false;

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
            } else {
                ArchiveState.currentSearchTerm = '';
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

            ArchiveState.selectedCardId = '';
            ArchiveRenderer.setSearchValue(ArchiveState.currentSearchTerm);

            deps.applyFiltersAndRender?.();

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
    }
};

export default ArchiveOpenFlow;
