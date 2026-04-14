window.Archive = {
    currentSet: 'base_game',
    allCards: [],
    filteredCards: [],

    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    getSetButtonsContainer() {
        return Utils.byId('archive-set-buttons');
    },

    getSuggestedSetKey() {
        const activeSet = window.API?.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return this.currentSet || window.CONFIG?.defaultSet || 'base_game';
    },

    renderSetButtons() {
        const container = this.getSetButtonsContainer();
        if (!container) return;

        const sets = window.CONFIG?.getEnabledSets?.() || [];
        if (!sets.length) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = sets.map(setConfig => `
            <button
                class="btn-outline${setConfig.id === this.currentSet ? ' active' : ''}"
                type="button"
                data-action="archive-load-set"
                data-set="${Utils.escapeHtml(setConfig.id)}"
            >
                ${Utils.escapeHtml(setConfig.shortName || setConfig.name)}
            </button>
        `).join('');
    },

    async open() {
        const modal = Utils.byId('archive-modal');
        if (!modal) return;

        modal.style.display = 'flex';

        const nextSet = this.getSuggestedSetKey();
        if (nextSet !== this.currentSet || !this.allCards.length) {
            await this.loadSet(nextSet);
        } else {
            this.renderSetButtons();
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
        this.renderSetButtons();

        const grid = Utils.byId('archive-grid');
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

            const searchInput = Utils.byId('archive-search');
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
        return Utils.resolveImagePath(
            card?.images?.front,
            card?.image
        );
    },

    bindArchiveImageFallbacks(scope = document) {
        Utils.qsa('img[data-archive-image="true"]', scope).forEach(img => {
            Utils.attachImageFallback(img);
        });
    },

    render() {
        const grid = Utils.byId('archive-grid');
        if (!grid) return;

        this.renderSetButtons();

        if (!this.filteredCards.length) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
            return;
        }

        grid.innerHTML = this.filteredCards.map(card => {
            const image = this.getImageForCard(card);
            const id = Utils.escapeHtml(card?.id ?? '');
            const name = Utils.escapeHtml(card?.name ?? 'Unbenannte Karte');
            const type = Utils.escapeHtml(card?.type ?? 'karte');
            const status = Utils.escapeHtml(card?.status ?? '');

            return `
                <div class="archive-card" data-card-id="${id}">
                    <img
                        src="${Utils.escapeHtml(image)}"
                        alt="${name}"
                        loading="lazy"
                        data-archive-image="true"
                    >
                    <p>${name}</p>
                    <small>${type}${status ? ` • ${status}` : ''}</small>
                </div>
            `;
        }).join('');

        this.bindArchiveImageFallbacks(grid);

        grid.querySelectorAll('.archive-card').forEach(cardEl => {
            cardEl.addEventListener('click', async () => {
                const cardId = cardEl.dataset.cardId;
                if (!cardId) return;

                await window.API?.openCardDetailById?.(cardId);
            });
        });
    },

    init() {
        const searchInput = Utils.byId('archive-search');
        const modal = Utils.byId('archive-modal');

        this.renderSetButtons();

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
