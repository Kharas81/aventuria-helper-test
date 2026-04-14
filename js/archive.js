window.Archive = {
    currentSet: 'base_game',
    allCards: [],
    filteredCards: [],

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    async open() {
        const modal = document.getElementById('archive-modal');
        if (!modal) return;

        modal.style.display = 'flex';

        if (!this.allCards.length) {
            await this.loadSet(this.currentSet);
        } else {
            this.render();
        }
    },

    close() {
        const modal = document.getElementById('archive-modal');
        if (!modal) return;

        modal.style.display = 'none';
    },

    async loadSet(setKey = 'base_game') {
        this.currentSet = String(setKey || 'base_game').trim() || 'base_game';

        const grid = document.getElementById('archive-grid');
        if (grid) {
            grid.innerHTML = '<p class="placeholder-text">Archiv wird geladen ...</p>';
        }

        try {
            const master = await window.API?.getMasterIndex?.(this.currentSet);
            const entries = this.normalizeArray(master?.cards);

            const loadedCards = [];

            for (const entry of entries) {
                try {
                    if (entry?.detail_path) {
                        const detail = await window.API.getCatalogCard(entry.detail_path);
                        if (detail) {
                            loadedCards.push(detail);
                            continue;
                        }
                    }

                    if (entry?.id) {
                        const fallbackCard = await window.API.findCardById(entry.id, this.currentSet);
                        if (fallbackCard) {
                            loadedCards.push(fallbackCard);
                        }
                    }
                } catch (error) {
                    console.warn('Archivkarte konnte nicht geladen werden:', entry?.id, error);
                }
            }

            this.allCards = loadedCards;
            this.filteredCards = [...loadedCards];
            this.render();

            const searchInput = document.getElementById('archive-search');
            if (searchInput) {
                searchInput.value = '';
            }
        } catch (error) {
            console.error('Fehler beim Laden des Archivs:', error);

            if (grid) {
                grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Archivs.</p>';
            }
        }
    },

    handleSearch(searchTerm = '') {
        const term = String(searchTerm ?? '').trim().toLowerCase();

        if (!term) {
            this.filteredCards = [...this.allCards];
            this.render();
            return;
        }

        this.filteredCards = this.allCards.filter(card => {
            const name = String(card?.name ?? '').toLowerCase();
            const type = String(card?.type ?? '').toLowerCase();
            const category = String(card?.card_category ?? '').toLowerCase();
            const status = String(card?.status ?? '').toLowerCase();
            const searchText = String(card?.search_text ?? '').toLowerCase();
            const tags = this.normalizeArray(card?.tags).join(' ').toLowerCase();
            const customTags = this.normalizeArray(card?.custom_tags).join(' ').toLowerCase();
            const keywords = this.normalizeArray(card?.keywords).join(' ').toLowerCase();
            const notes = String(card?.note ?? card?.notes ?? '').toLowerCase();

            return (
                name.includes(term) ||
                type.includes(term) ||
                category.includes(term) ||
                status.includes(term) ||
                searchText.includes(term) ||
                tags.includes(term) ||
                customTags.includes(term) ||
                keywords.includes(term) ||
                notes.includes(term)
            );
        });

        this.render();
    },

    getImageForCard(card) {
        return (
            card?.images?.front ||
            card?.image ||
            'assets/images/placeholder.jpg'
        );
    },

    render() {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        if (!this.filteredCards.length) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
            return;
        }

        grid.innerHTML = this.filteredCards.map(card => {
            const image = this.getImageForCard(card);
            const id = this.escapeHtml(card?.id ?? '');
            const name = this.escapeHtml(card?.name ?? 'Unbenannte Karte');
            const type = this.escapeHtml(card?.type ?? 'karte');
            const status = this.escapeHtml(card?.status ?? '');

            return `
                <div class="archive-card" data-card-id="${id}">
                    <img
                        src="${this.escapeHtml(image)}"
                        alt="${name}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='assets/images/placeholder.jpg';"
                    >
                    <p>${name}</p>
                    <small>${type}${status ? ` • ${status}` : ''}</small>
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.archive-card').forEach(cardEl => {
            cardEl.addEventListener('click', async () => {
                const cardId = cardEl.dataset.cardId;
                if (!cardId) return;

                await window.API?.openCardDetailById?.(cardId);
            });
        });
    },

    init() {
        const searchInput = document.getElementById('archive-search');
        const modal = document.getElementById('archive-modal');

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
