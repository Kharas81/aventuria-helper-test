window.ArchiveRenderer = {
    getGrid() {
        return Utils.byId('archive-grid');
    },

    getSetButtonsContainer() {
        return Utils.byId('archive-set-buttons');
    },

    getSearchInput() {
        return Utils.byId('archive-search');
    },

    showLoading() {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = '<p class="placeholder-text">Archiv wird geladen ...</p>';
    },

    showError(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        const safeMessage = Utils.escapeHtml(
            message || 'Fehler beim Laden des Archivs.'
        );

        grid.innerHTML = `<p class="placeholder-text">${safeMessage}</p>`;
    },

    showEmpty(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        const safeMessage = Utils.escapeHtml(
            message || 'Keine Karten gefunden.'
        );

        grid.innerHTML = `<p class="placeholder-text">${safeMessage}</p>`;
    },

    resetSearch() {
        const searchInput = this.getSearchInput();
        if (searchInput) {
            searchInput.value = '';
        }
    },

    renderSetButtons(activeSetKey = '') {
        const container = this.getSetButtonsContainer();
        if (!container || !window.CONFIG?.getEnabledSets) return;

        const enabledSets = window.CONFIG.getEnabledSets();
        container.innerHTML = '';

        enabledSets.forEach(setConfig => {
            const isActive = activeSetKey === setConfig.id;

            container.insertAdjacentHTML(
                'beforeend',
                `
                <button
                    type="button"
                    class="${isActive ? 'btn' : 'btn-outline'}"
                    data-action="archive-load-set"
                    data-set="${Utils.escapeHtml(setConfig.id)}"
                >
                    ${Utils.escapeHtml(setConfig.shortName || setConfig.name || setConfig.id)}
                </button>
                `
            );
        });
    },

    resolveCardImage(card) {
        return Utils.resolveImagePath(
            card?.images?.front,
            card?.image,
            window.Assets?.getSharedCardPlaceholderPath?.(),
            window.Assets?.getImageFallbackPath?.()
        );
    },

    renderGrid(cards = []) {
        const grid = this.getGrid();
        if (!grid) return;

        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            this.showEmpty();
            return;
        }

        grid.innerHTML = safeCards.map(card => {
            const image = this.resolveCardImage(card);
            const name = Utils.escapeHtml(card?.name || 'Unbekannte Karte');
            const id = Utils.escapeHtml(card?.id || '');

            return `
                <button
                    type="button"
                    class="archive-card"
                    data-action="open-card-detail"
                    data-card-id="${id}"
                    title="${name}"
                >
                    <img src="${Utils.escapeHtml(image)}" alt="${name}" loading="lazy">
                    <p>${name}</p>
                </button>
            `;
        }).join('');

        grid.querySelectorAll('.archive-card img').forEach(img => {
            Utils.attachImageFallback(img);
        });
    }
};
