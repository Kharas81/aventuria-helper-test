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

    renderActions(actionTitles = []) {
        if (!actionTitles.length) {
            return '';
        }

        return `
            <div class="archive-card__actions-preview">
                <div class="archive-card__actions-title">Aktionen:</div>
                <ul class="archive-card__actions-list">
                    ${actionTitles.map(title => `<li class="archive-card__action-item">${Utils.escapeHtml(title)}</li>`).join('')}
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
        const actionTitles = ArchiveCardMeta.getActionTitles(card, 4);

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
                    ${this.renderActions(actionTitles)}
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
