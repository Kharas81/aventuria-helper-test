import Utils from '../../core/utils.js';
import ArchiveListCardTemplate from './archive-list-card-template.js';
import ArchiveEmptyStateRenderer from './archive-empty-state-renderer.js';

export const ArchiveGridRenderer = {
    renderGrid(grid, cards = [], options = {}) {
        if (!grid) {
            return;
        }

        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            ArchiveEmptyStateRenderer.showEmpty(
                grid,
                ArchiveEmptyStateRenderer.buildEmptyMessage(options)
            );
            return;
        }

        grid.innerHTML = safeCards
            .map(card => ArchiveListCardTemplate.renderCard(card))
            .join('');
    }
};

export default ArchiveGridRenderer;
