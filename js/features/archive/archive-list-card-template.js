import Utils from '../../core/utils.js';
import ArchiveCardMeta from './archive-card-meta.js';
import { parseArchiveActionTitle } from './archive-action-format.js';

export const ArchiveListCardTemplate = {
    renderStat(label = '', value = '') {
        const safeLabel = Utils.escapeHtml(label);
        const safeValue = Utils.escapeHtml(value);

        return `
            <div class="archive-card__stat">
                <div class="archive-card__stat-label">${safeLabel}</div>
                <div class="archive-card__stat-value">${safeValue}</div>
            </div>
        `;
    },

    renderTags(tags = []) {
        const safeTags = Utils.normalizeArray(tags).slice(0, 3);

        if (!safeTags.length) {
            return '';
        }

        return `
            <div class="archive-card__tags">
                ${safeTags.map(tag => `<span class="archive-tag">${Utils.escapeHtml(tag)}</span>`).join('')}
            </div>
        `;
    },

    renderActions(actionRows = []) {
        const previewRows = Utils.normalizeArray(actionRows).slice(0, 2);

        if (!previewRows.length) {
            return '';
        }

        return `
            <div class="archive-card__actions-preview">
                <div class="archive-card__actions-title">Aktionen</div>

                <ul class="archive-card__actions-list">
                    ${previewRows.map(row => {
                        const parsed = parseArchiveActionTitle(row.title);

                        return `
                            <li class="archive-card__action-item">
                                ${row.range ? `<span class="archive-card__action-range">${Utils.escapeHtml(row.range)}</span>` : ''}

                                <div class="archive-card__action-main">
                                    ${parsed.typeLabel ? `<span class="archive-card__action-type">${Utils.escapeHtml(parsed.typeLabel)}</span>` : ''}
                                    <span class="archive-card__action-name">${Utils.escapeHtml(parsed.titleLabel || row.title)}</span>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        `;
    },

    renderCard(card = {}, options = {}) {
        const cardId = Utils.escapeHtml(ArchiveCardMeta.getCardId(card));
        const name = Utils.escapeHtml(ArchiveCardMeta.getDisplayName(card));
        const typeLabel = Utils.escapeHtml(ArchiveCardMeta.getTypeLabel(card));
        const sourceLabel = Utils.escapeHtml(ArchiveCardMeta.getSourceLabel(card));

        const stats = ArchiveCardMeta.getStats(card);
        const tags = ArchiveCardMeta.getTags(card);
        const actionRows = ArchiveCardMeta.getActionPreviewRows(card, 2);
        const selectedCardId = Utils.normalizeString(options?.selectedCardId);
        const isSelected = Utils.normalizeString(ArchiveCardMeta.getCardId(card)) === selectedCardId;

        const statsHtml = [
            this.renderStat('GP', stats.gp),
            this.renderStat('Leben', stats.leben),
            this.renderStat('Rüstung', stats.ruestung),
            this.renderStat('Aktionen', stats.aktionen)
        ].join('');

        return `
            <article class="archive-card ${isSelected ? 'archive-card--selected' : ''}" data-card-id="${cardId}">
                <div class="archive-card__header">
                    <h3 class="archive-card__title" title="${name}">${name}</h3>

                    <div class="archive-card__badges">
                        <span class="archive-badge archive-badge--type">${typeLabel}</span>
                        <span class="archive-badge archive-badge--set">${sourceLabel}</span>
                    </div>
                </div>

                <div class="archive-card__body">
                    <div class="archive-card__stats">
                        ${statsHtml}
                    </div>

                    ${this.renderTags(tags)}
                    ${this.renderActions(actionRows)}
                </div>

                <div class="archive-card__footer">
                    <div class="archive-card__footer-left">
                        <button
                            type="button"
                            class="btn-outline"
                            data-action="archive-select-card"
                            data-card-id="${cardId}"
                        >
                            ${isSelected ? 'Ausgewählt' : 'Vorschau'}
                        </button>
                    </div>

                    <button
                        type="button"
                        class="archive-card__details-btn"
                        data-action="open-card-detail"
                        data-card-id="${cardId}"
                        data-card-label="${name}"
                        title="${name}"
                    >
                        Details öffnen
                    </button>
                </div>
            </article>
        `;
    }
};

export default ArchiveListCardTemplate;
