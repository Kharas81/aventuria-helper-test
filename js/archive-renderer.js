window.ArchiveRenderer = {
    getGrid() {
        return Utils.byId('archive-grid');
    },

    getSetButtonsContainer() {
        return Utils.byId('archive-set-buttons');
    },

    showLoading() {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = '<p class="placeholder-text">Archiv wird geladen ...</p>';
    },

    showError() {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Archivs.</p>';
    },

    renderSetButtons(activeSetKey = 'base_game') {
        const container = this.getSetButtonsContainer();
        if (!container || !window.CONFIG?.getEnabledSets) return;

        const enabledSets = window.CONFIG.getEnabledSets();
        container.innerHTML = '';

        enabledSets.forEach(setConfig => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = activeSetKey === setConfig.id ? 'btn' : 'btn-outline';
            button.textContent = setConfig.shortName || setConfig.name || setConfig.id;

            button.addEventListener('click', async () => {
                if (window.Archive?.currentSet !== setConfig.id) {
                    await window.Archive.loadSet(setConfig.id);
                }
            });

            container.appendChild(button);
        });
    },

    renderGrid(cards = []) {
        const grid = this.getGrid();
        if (!grid) return;

        if (!Array.isArray(cards) || cards.length === 0) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
            return;
        }

        grid.innerHTML = cards.map(card => {
            const image =
                card?.images?.front ||
                card?.image ||
                'assets/images/cards/shared/card_placeholder.jpg';

            const name = Utils.escapeHtml(card?.name || 'Unbekannte Karte');
            const safeImage = Utils.escapeHtml(Utils.resolveImagePath(image) || image);

            return `
                <div class="archive-card" data-card-id="${Utils.escapeHtml(card?.id || '')}">
                    <img src="${safeImage}" alt="${name}" loading="lazy">
                    <p>${name}</p>
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.archive-card').forEach(cardEl => {
            cardEl.addEventListener('click', async () => {
                const cardId = cardEl.dataset.cardId;
                if (cardId) {
                    await window.API?.openCardDetailById?.(cardId);
                }
            });
        });
    }
};
