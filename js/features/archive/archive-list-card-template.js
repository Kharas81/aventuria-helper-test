import Utils from '../../core/utils.js';
import ArchiveCardMeta from './archive-card-meta.js';

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
        if (!tags.length) {
            return '';
        }

        return `
            <div class="archive-card__tags">
                ${tags.map(tag => `<span class="archive-tag">${Utils.escapeHtml(tag)}</span>`).join('')}
            </div>
        `;
    },

    renderActions(actionRows = []) {
        if (!actionRows.length) {
            return '';
        }

        return `
            <div class="archive-card__actions-preview">
                <div class="archive-card__actions-title">Aktionen:</div>
                <ul class="archive-card__actions-list">
                    ${actionRows.map(row => `
                        <li class="archive-card__action-item">
                            ${row.range ? `<span class="archive-card__action-range">${Utils.escapeHtml(row.range)}</span>` : ''}
                            <span class="archive-card__action-name">${Utils.escapeHtml(row.title)}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    },

    renderCard(card = {}) {
        const cardId = Utils.escapeHtml(ArchiveCardMeta.getCardId(card));
        const name = Utils.escapeHtml(ArchiveCardMeta.getDisplayName(card));
        const typeLabel = Utils.escapeHtml(ArchiveCardMeta.getTypeLabel(card));
        const sourceLabel = Utils.escapeHtml(ArchiveCardMeta.getSourceLabel(card));

        const stats = ArchiveCardMeta.getStats(card);
        const tags = ArchiveCardMeta.getTags(card);
        const actionRows = ArchiveCardMeta.getActionPreviewRows(card, 4);

        const statsHtml = [
            this.renderStat('GP', stats.gp),
            this.renderStat('Leben', stats.leben),
            this.renderStat('Rüstung', stats.ruestung),
            this.renderStat('Aktionen', stats.aktionen)
        ].join('');

        return `
            <article class="archive-card" data-card-id="${cardId}">
                <div class="archive-card__header">
                    <h3 class="archive-card__title" title="${name}">${name}</h3>

                    <div class="archive-card__badges">
                        <span class="archive-badge archive-badge--type">${typeLabel}</span>
                        <span class="archive-badge archive-badge--set">${sourceLabel}</span>
                    </div>
                </div>

                <div class="archive-card__subtitle">${typeLabel}</div>

                <div class="archive-card__body">
                    <div class="archive-card__stats">
                        ${statsHtml}
                    </div>

                    ${this.renderTags(tags)}
                    ${this.renderActions(actionRows)}
                </div>

                <div class="archive-card__footer">
                    <button
                        type="button"
                        class="archive-card__details-btn"
                        data-action="open-card-detail"
                        data-card-id="${cardId}"
                        data-card-label="${name}"
                        title="${name}"
                    >
                        Details ansehen
                    </button>
                </div>
            </article>
        `;
    }
};

export default ArchiveListCardTemplate;
