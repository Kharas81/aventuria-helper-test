import Utils from '../core/utils.js';
import RenderCommon from './common.js';

export function renderSearchChips(items = []) {
    const safeItems = Array.from(new Set(
        RenderCommon.normalizeArray(items)
            .map(value => Utils.normalizeString(value))
            .filter(Boolean)
    ));

    if (!safeItems.length) {
        return '<p class="card-detail__empty">Keine Schlagwörter vorhanden.</p>';
    }

    return `
        <div class="card-detail__chip-group">
            ${safeItems.map(item => `
                <button
                    type="button"
                    class="card-detail__chip-button"
                    data-action="archive-search"
                    data-archive-query="${Utils.escapeHtml(item)}"
                    title="Ähnliche Karten suchen"
                >
                    ${Utils.escapeHtml(item)}
                </button>
            `).join('')}
        </div>
    `;
}

export default {
    renderSearchChips
};
