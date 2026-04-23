import Utils from '../../core/utils.js';
import RenderCommon from '../../render/common.js';
import ArchiveCardMeta from './archive-card-meta.js';

export const ArchivePreviewRenderer = {
    renderImage(card = {}) {
        const normalized = RenderCommon.normalizeCard(card);

        if (normalized?.hasRealImage && normalized?.imageSrc) {
            return `
                <div class="archive-preview-card__image-wrap">
                    <img
                        class="archive-preview-card__image"
                        src="${Utils.escapeHtml(normalized.imageSrc)}"
                        alt="${Utils.escapeHtml(ArchiveCardMeta.getDisplayName(card))}"
                    >
                </div>
            `;
        }

        return `
            <div class="archive-preview-card__image-wrap">
                <div class="archive-preview-card__placeholder">
                    Keine Kartenabbildung für die Vorschau vorhanden.
                </div>
            </div>
        `;
    },

    renderActions(card = {}) {
        const rows = ArchiveCardMeta.getActionRows(card);

        if (!rows.length) {
            return `
                <div class="archive-preview-card__section">
                    <div class="archive-preview-card__section-title">Aktionen</div>
                    <div class="archive-browser-empty">
                        Für diese Karte sind keine Aktionsdaten hinterlegt.
                    </div>
                </div>
            `;
        }

        return `
            <div class="archive-preview-card__section">
                <div class="archive-preview-card__section-title">Aktionen</div>

                <ul class="archive-preview-card__actions">
                    ${rows.map(row => `
                        <li class="archive-preview-card__action">
                            <div class="archive-preview-card__action-head">
                                ${row.range ? `<span class="archive-card__action-range">${Utils.escapeHtml(row.range)}</span>` : ''}
                                <span class="archive-preview-card__action-title">
                                    ${Utils.escapeHtml(row.title || 'Ohne Titel')}
                                </span>
                            </div>

                            ${row.text ? `
                                <div class="archive-preview-card__action-text">
                                    ${Utils.escapeHtml(row.text)}
                                </div>
                            ` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    },

    renderStats(card = {}) {
        const stats = ArchiveCardMeta.getStats(card);

        return `
            <div class="archive-preview-card__section">
                <div class="archive-preview-card__section-title">Werte</div>

                <div class="archive-card__stats">
                    <div class="archive-card__stat">
                        <div class="archive-card__stat-label">GP</div>
                        <div class="archive-card__stat-value">${Utils.escapeHtml(stats.gp)}</div>
                    </div>

                    <div class="archive-card__stat">
                        <div class="archive-card__stat-label">Leben</div>
                        <div class="archive-card__stat-value">${Utils.escapeHtml(stats.leben)}</div>
                    </div>

                    <div class="archive-card__stat">
                        <div class="archive-card__stat-label">Rüstung</div>
                        <div class="archive-card__stat-value">${Utils.escapeHtml(stats.ruestung)}</div>
                    </div>

                    <div class="archive-card__stat">
                        <div class="archive-card__stat-label">Aktionen</div>
                        <div class="archive-card__stat-value">${Utils.escapeHtml(stats.aktionen)}</div>
                    </div>
                </div>
            </div>
        `;
    },

    renderTags(card = {}) {
        const tags = ArchiveCardMeta.getTags(card);

        if (!tags.length) {
            return '';
        }

        return `
            <div class="archive-preview-card__section">
                <div class="archive-preview-card__section-title">Schlagworte</div>

                <div class="archive-card__tags">
                    ${tags.map(tag => `<span class="archive-tag">${Utils.escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
        `;
    },

    renderEmpty(container) {
        if (!container) {
            return;
        }

        container.innerHTML = `
            <div class="archive-preview-shell">
                <div class="archive-browser-head">
                    <div class="archive-browser-head__eyebrow">Vorschau</div>
                    <h4 class="archive-browser-head__title">Keine Karte gewählt</h4>
                    <p class="archive-browser-head__text">
                        Wähle links oder in der Kartenliste eine Karte aus, um hier eine Vorschau zu sehen.
                    </p>
                </div>

                <div class="archive-browser-empty">
                    Die rechte Spalte bleibt jetzt nicht mehr leer —
                    sie zeigt eine echte Vorschau, sobald du eine Karte auswählst.
                </div>
            </div>
        `;
    },

    render(container, card = null) {
        if (!container) {
            return;
        }

        if (!card || typeof card !== 'object') {
            this.renderEmpty(container);
            return;
        }

        const cardId = ArchiveCardMeta.getCardId(card);
        const name = ArchiveCardMeta.getDisplayName(card);
        const typeLabel = ArchiveCardMeta.getTypeLabel(card);
        const sourceLabel = ArchiveCardMeta.getSourceLabel(card);

        container.innerHTML = `
            <div class="archive-preview-shell">
                <div class="archive-browser-head">
                    <div class="archive-browser-head__eyebrow">Vorschau</div>
                    <h4 class="archive-browser-head__title">Kartendetails auf einen Blick</h4>
                    <p class="archive-browser-head__text">
                        Sichtbare Sofortvorschau für die aktuell markierte Karte.
                    </p>
                </div>

                <div class="archive-preview-card">
                    <h4 class="archive-preview-card__title">${Utils.escapeHtml(name)}</h4>

                    <div class="archive-preview-card__meta">
                        <span class="archive-badge archive-badge--type">${Utils.escapeHtml(typeLabel)}</span>
                        <span class="archive-badge archive-badge--set">${Utils.escapeHtml(sourceLabel)}</span>
                    </div>

                    ${this.renderImage(card)}
                    ${this.renderStats(card)}
                    ${this.renderTags(card)}
                    ${this.renderActions(card)}

                    <div class="archive-preview-card__section">
                        <button
                            type="button"
                            class="btn"
                            data-action="open-card-detail"
                            data-card-id="${Utils.escapeHtml(cardId)}"
                            data-card-label="${Utils.escapeHtml(name)}"
                            title="${Utils.escapeHtml(name)}"
                        >
                            Details öffnen
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

export default ArchivePreviewRenderer;
