window.ArchiveRenderer = {
    getSetButtonsContainer() {
        return Utils.byId('archive-set-buttons');
    },

    getGridContainer() {
        return Utils.byId('archive-grid');
    },

    renderSetButtons(currentSet) {
        const container = this.getSetButtonsContainer();
        if (!container) return;

        const sets = window.CONFIG?.getEnabledSets?.() || [];
        if (!sets.length) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = sets.map(setConfig => `
            <button
                class="btn-outline${setConfig.id === currentSet ? ' active' : ''}"
                type="button"
                data-action="archive-load-set"
                data-set="${Utils.escapeHtml(setConfig.id)}"
            >
                ${Utils.escapeHtml(setConfig.shortName || setConfig.name)}
            </button>
        `).join('');
    },

    showLoading() {
        const grid = this.getGridContainer();
        if (grid) {
            grid.innerHTML = '<p class="placeholder-text">Archiv wird geladen ...</p>';
        }
    },

    showError() {
        const grid = this.getGridContainer();
        if (grid) {
            grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Archivs.</p>';
        }
    },

    showEmpty() {
        const grid = this.getGridContainer();
        if (grid) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
        }
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

    renderGrid(filteredCards) {
        const grid = this.getGridContainer();
        if (!grid) return;

        if (!filteredCards.length) {
            this.showEmpty();
            return;
        }

        grid.innerHTML = filteredCards.map(card => {
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

        // Klick-Listener auf die gerenderten Karten binden
        grid.querySelectorAll('.archive-card').forEach(cardEl => {
            cardEl.addEventListener('click', async () => {
                const cardId = cardEl.dataset.cardId;
                if (!cardId) return;

                await window.API?.openCardDetailById?.(cardId);
            });
        });
    }
};
