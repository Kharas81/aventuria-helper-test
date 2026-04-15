import Utils from '../../core/utils.js';
import UIComponents from '../../ui/components.js';

export const ArchiveRenderer = {
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

        grid.innerHTML = UIComponents.renderEmptyState('Archiv wird geladen ...');
    },

    showError(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = UIComponents.renderEmptyState(
            message || 'Fehler beim Laden des Archivs.'
        );
    },

    showEmpty(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = UIComponents.renderEmptyState(
            message || 'Keine Karten gefunden.'
        );
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

        container.innerHTML = enabledSets.map(setConfig => {
            const isActive = activeSetKey === setConfig.id;

            return UIComponents.renderButton({
                text: setConfig.shortName || setConfig.name || setConfig.id,
                variant: isActive ? 'solid' : 'outline',
                action: 'archive-load-set',
                actionValue: setConfig.id
            });
        }).join('');
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
            return UIComponents.renderImageCard({
                src: this.resolveCardImage(card),
                alt: card?.name || 'Karte',
                title: card?.name || 'Unbekannte Karte',
                action: 'open-card-detail',
                actionValue: card?.id || ''
            });
        }).join('');

        grid.querySelectorAll('.ui-image-card__image').forEach(img => {
            Utils.attachImageFallback(img);
        });
    }
};

export default ArchiveRenderer;
