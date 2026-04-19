import Utils from '../../core/utils.js';
import ArchiveCardTemplate from './archive-card-template.js';
import ArchiveEmptyStateRenderer from './archive-empty-state-renderer.js';

export const ArchiveGridRenderer = {
    renderGrid(grid, cards = [], options = {}) {
        if (!grid) return;

        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            ArchiveEmptyStateRenderer.showEmpty(
                grid,
                ArchiveEmptyStateRenderer.buildEmptyMessage(options)
            );
            return;
        }

        grid.innerHTML = safeCards.map(card => ArchiveCardTemplate.renderCard(card)).join('');

        grid.querySelectorAll('.archive-card__image').forEach(img => {
            Utils.attachImageFallback(img);
        });
    }
};

export default ArchiveGridRenderer;
