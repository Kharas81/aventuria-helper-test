window.Archive = {
    currentSet: 'base_game',
    allCards: [],
    filteredCards: [],

    async open() {
        const modal = Utils.byId('archive-modal');
        if (!modal) return;

        modal.style.display = 'flex';

        const nextSet = window.ArchiveLoader?.getSuggestedSetKey(this.currentSet);
        if (nextSet !== this.currentSet || !this.allCards.length) {
            await this.loadSet(nextSet);
        } else {
            this.render();
        }
    },

    close() {
        const modal = Utils.byId('archive-modal');
        if (!modal) return;

        modal.style.display = 'none';
    },

    async loadSet(setKey = 'base_game') {
        this.currentSet = String(setKey || window.CONFIG?.defaultSet || 'base_game').trim() || 'base_game';
        
        window.ArchiveRenderer?.renderSetButtons(this.currentSet);
        window.ArchiveRenderer?.showLoading();

        try {
            const loadedCards = await window.ArchiveLoader?.fetchCardsForSet(this.currentSet);
            
            this.allCards = loadedCards || [];
            this.filteredCards = [...this.allCards];
            
            this.render();

            const searchInput = Utils.byId('archive-search');
            if (searchInput) {
                searchInput.value = '';
            }
        } catch (error) {
            console.error('Fehler beim Laden des Archivs:', error);
            window.ArchiveRenderer?.showError();
        }
    },

    handleSearch(searchTerm = '') {
        this.filteredCards = window.ArchiveFilter?.filterCards(this.allCards, searchTerm) || [];
        this.render();
    },

    render() {
        window.ArchiveRenderer?.renderSetButtons(this.currentSet);
        window.ArchiveRenderer?.renderGrid(this.filteredCards);
    },

    init() {
        const searchInput = Utils.byId('archive-search');
        const modal = Utils.byId('archive-modal');

        window.ArchiveRenderer?.renderSetButtons(this.currentSet);

        if (searchInput && !searchInput.dataset.bound) {
            searchInput.addEventListener('input', event => {
                this.handleSearch(event.target.value);
            });
            searchInput.dataset.bound = 'true';
        }

        if (modal && !modal.dataset.bound) {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.close();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Archive?.init) {
        window.Archive.init();
    }
});
