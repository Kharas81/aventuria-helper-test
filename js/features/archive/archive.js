import Utils from '../../core/utils.js';
import ArchiveState from './archive-state.js';
import ArchiveRenderer from './renderer.js';
import ArchiveController from './archive-controller.js';
import ArchiveBindings from './archive-bindings.js';

export const Archive = {
    get currentSet() {
        return ArchiveState.currentSet;
    },

    set currentSet(value) {
        ArchiveState.currentSet = Utils.normalizeString(value) || ArchiveState.currentSet;
    },

    get currentSearchTerm() {
        return ArchiveState.currentSearchTerm;
    },

    set currentSearchTerm(value) {
        ArchiveState.currentSearchTerm = Utils.normalizeString(value);
    },

    get currentSourceFilter() {
        return ArchiveState.currentSourceFilter;
    },

    set currentSourceFilter(value) {
        ArchiveState.currentSourceFilter = ArchiveState.normalizeSourceFilter(value);
    },

    get currentCategoryFilter() {
        return ArchiveState.currentCategoryFilter;
    },

    set currentCategoryFilter(value) {
        ArchiveState.currentCategoryFilter = ArchiveState.normalizeCategoryFilter(value);
    },

    get allCards() {
        return ArchiveState.allCards;
    },

    set allCards(value) {
        ArchiveState.allCards = Utils.normalizeArray(value);
    },

    get filteredCards() {
        return ArchiveState.filteredCards;
    },

    set filteredCards(value) {
        ArchiveState.filteredCards = Utils.normalizeArray(value);
    },

    get isLoading() {
        return ArchiveState.isLoading;
    },

    set isLoading(value) {
        ArchiveState.isLoading = Boolean(value);
    },

    getModal() {
        return ArchiveController.getModal();
    },

    getSearchInput() {
        return ArchiveRenderer.getSearchInput();
    },

    getResolvedCurrentSet() {
        return ArchiveState.getResolvedCurrentSet();
    },

    normalizeSourceFilter(sourceFilter = '') {
        return ArchiveState.normalizeSourceFilter(sourceFilter);
    },

    normalizeCategoryFilter(categoryFilter = '') {
        return ArchiveState.normalizeCategoryFilter(categoryFilter);
    },

    applyFilters() {
        return ArchiveController.applyFilters();
    },

    async open(options = {}) {
        return ArchiveController.open(options);
    },

    close() {
        return ArchiveController.close();
    },

    async loadSet(setKey = '', options = {}) {
        return ArchiveController.loadSet(setKey, options);
    },

    handleSearch(searchTerm = '') {
        return ArchiveController.handleSearch(searchTerm);
    },

    setSourceFilter(sourceFilter = '') {
        return ArchiveController.setSourceFilter(sourceFilter);
    },

    setCategoryFilter(categoryFilter = '') {
        return ArchiveController.setCategoryFilter(categoryFilter);
    },

    render() {
        return ArchiveController.render();
    },

    bindSearch() {
        return ArchiveBindings.bindSearch();
    },

    bindModalClose() {
        return ArchiveBindings.bindModalClose();
    },

    init() {
        ArchiveBindings.init();

        ArchiveRenderer.renderToolbar({
            activeSetKey: ArchiveState.currentSet,
            activeSourceFilter: ArchiveState.currentSourceFilter,
            activeCategoryFilter: ArchiveState.currentCategoryFilter,
            availableSources: [],
            availableCategories: [],
            currentQuery: '',
            filteredCount: 0,
            totalCount: 0
        });
    }
};

export default Archive;
