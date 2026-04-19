import Utils from '../../core/utils.js';
import ArchiveFilter from './filter.js';

export const ArchiveEmptyStateRenderer = {
    showLoading(grid) {
        if (!grid) return;
        grid.innerHTML = '<div class="ui-empty-state">Archiv wird geladen ...</div>';
    },

    showError(grid, message = '') {
        if (!grid) return;

        grid.innerHTML = `
            <div class="ui-empty-state">
                ${Utils.escapeHtml(message || 'Fehler beim Laden des Archivs.')}
            </div>
        `;
    },

    showEmpty(grid, message = '') {
        if (!grid) return;

        grid.innerHTML = `
            <div class="ui-empty-state">
                ${Utils.escapeHtml(message || 'Keine Karten gefunden.')}
            </div>
        `;
    },

    buildEmptyMessage(options = {}) {
        const query = Utils.normalizeString(options?.query);
        const sourceFilter = Utils.normalizeString(options?.sourceFilter);
        const categoryFilter = Utils.normalizeString(options?.categoryFilter);

        if (query && sourceFilter && sourceFilter !== ArchiveFilter.ALL_SOURCE_FILTER) {
            return `Keine Karten gefunden für „${query}“ im Karten-Set „${sourceFilter}“.`;
        }

        if (query && categoryFilter && categoryFilter !== ArchiveFilter.ALL_CATEGORY_FILTER) {
            return `Keine Karten gefunden für „${query}“ in der Kategorie „${ArchiveFilter.getCategoryLabel(categoryFilter)}“.`;
        }

        if (query) {
            return `Keine Karten gefunden für „${query}“.`;
        }

        if (sourceFilter && sourceFilter !== ArchiveFilter.ALL_SOURCE_FILTER) {
            return `Keine Karten gefunden für das Karten-Set „${sourceFilter}“.`;
        }

        if (categoryFilter && categoryFilter !== ArchiveFilter.ALL_CATEGORY_FILTER) {
            return `Keine Karten gefunden für die Kategorie „${ArchiveFilter.getCategoryLabel(categoryFilter)}“.`;
        }

        return 'Keine Karten gefunden.';
    }
};

export default ArchiveEmptyStateRenderer;
