window.Archive = {
    currentSet: window.CONFIG?.defaultSet || 'base_game',
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
            this.currentSet || window.CONFIG?.defaultSet || 'base_game'
        );
    },

    async open() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';

        const nextSet = window.ArchiveLoader?.getSuggestedSetKey?.(this.currentSet)
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
            setKey || window.CONFIG?.defaultSet || 'base_game'
        );

        if (!resolvedSetKey) {
            return;
        }

        this.currentSet = resolvedSetKey;
        this.isLoading = true;

        window.ArchiveRenderer?.renderSetButtons?.(this.currentSet);
        window.ArchiveRenderer?.showLoading?.();

        try {
            const loadedCards = await window.ArchiveLoader?.fetchCardsForSet?.(this.currentSet);

            this.allCards = Utils.normalizeArray(loadedCards);
            this.filteredCards = [...this.allCards];
            this.isLoading = false;

            window.ArchiveRenderer?.resetSearch?.();
            this.render();

            window.Events?.emit?.(
                window.Constants?.events?.archiveSetChanged || 'archive:setChanged',
                {
                    source: 'archive',
                    setKey: this.currentSet,
                    cardCount: this.allCards.length
                }
            );

            window.Events?.emit?.(
                window.Constants?.events?.setChanged || 'set:changed',
                {
                    source: 'archive',
                    setKey: this.currentSet,
                    cardCount: this.allCards.length
                }
            );
        } catch (error) {
            this.isLoading = false;
            console.error('Fehler beim Laden des Archivs:', error);
            window.ArchiveRenderer?.showError?.(error?.message || 'Fehler beim Laden des Archivs.');
        }
    },

    handleSearch(searchTerm = '') {
        this.filteredCards = window.ArchiveFilter?.filterCards?.(this.allCards, searchTerm) || [];
        this.render();
    },

    render() {
        window.ArchiveRenderer?.renderSetButtons?.(this.currentSet);
        window.ArchiveRenderer?.renderGrid?.(this.filteredCards);
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
        window.ArchiveRenderer?.renderSetButtons?.(this.currentSet);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Archive?.init) {
        window.Archive.init();
    }
});
