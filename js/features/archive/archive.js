import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import ArchiveLoader from './loader.js';
import ArchiveFilter from './filter.js';
import ArchiveRenderer from './renderer.js';

export const Archive = {
    currentSet: CONFIG.defaultSet || 'base_game',
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

    async open() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';

        const nextSet = ArchiveLoader.getSuggestedSetKey(this.currentSet)
            || this.getResolvedCurrentSet();

        if (nextSet !== this.currentSet || !this.allCards.length) {
            await this.loadSet(nextSet);
            return;
        }

        this.render();
    },

    close() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'none';
    },

    async loadSet(setKey = '') {
        const resolvedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );

        if (!resolvedSetKey) {
            return;
        }

        this.currentSet = resolvedSetKey;
        this.isLoading = true;

        ArchiveRenderer.renderSetButtons(this.currentSet);
        ArchiveRenderer.showLoading();

        try {
            const loadedCards = await ArchiveLoader.fetchCardsForSet(this.currentSet);

            this.allCards = Utils.normalizeArray(loadedCards);
            this.filteredCards = [...this.allCards];
            this.isLoading = false;

            ArchiveRenderer.resetSearch();
            this.render();

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
        this.filteredCards = ArchiveFilter.filterCards(this.allCards, searchTerm) || [];
        this.render();
    },

    render() {
        ArchiveRenderer.renderSetButtons(this.currentSet);
        ArchiveRenderer.renderGrid(this.filteredCards);
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
        ArchiveRenderer.renderSetButtons(this.currentSet);
    }
};

export default Archive;
