import Utils from '../../core/utils.js';
import RenderCommon from '../../render/common.js';
import ArchiveCardMeta from './archive-card-meta.js';
import { parseArchiveActionTitle } from './archive-action-format.js';

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
                    Keine Kartenabbildung für diese Vorschau vorhanden.
                </div>
            </div>
        `;
    },

    renderStats(card = {}) {
        const stats = ArchiveCardMeta.getStats(card);

        return `
            <section class="archive-preview-card__section">
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
            </section>
        `;
    },

    renderActions(card = {}) {
        const rows = ArchiveCardMeta.getActionRows(card);

        if (!rows.length) {
            return `
                <section class="archive-preview-card__section">
                    <div class="archive-preview-card__section-title">Aktionen</div>
                    <div class="archive-browser-empty">
                        Für diese Karte sind keine Aktionsdaten hinterlegt.
                    </div>
                </section>
            `;
        }

        return `
            <section class="archive-preview-card__section">
                <div class="archive-preview-card__section-title">Aktionen</div>

                <div class="archive-preview-card__rules">
                    ${rows.map(row => {
                        const parsed = parseArchiveActionTitle(row.title);

                        return `
                            <article class="archive-preview-card__rule">
                                <div class="archive-preview-card__rule-top">
                                    ${row.range ? `<span class="archive-card__action-range">${Utils.escapeHtml(row.range)}</span>` : ''}
                                    ${parsed.typeLabel ? `<span class="archive-preview-card__rule-type">${Utils.escapeHtml(parsed.typeLabel)}</span>` : ''}
                                </div>

                                <h5 class="archive-preview-card__rule-title">
                                    ${Utils.escapeHtml(parsed.titleLabel || row.title || 'Ohne Titel')}
                                </h5>

                                ${row.text ? `
                                    <p class="archive-preview-card__rule-text">
                                        ${Utils.escapeHtml(row.text)}
                                    </p>
                                ` : ''}
                            </article>
                        `;
                    }).join('')}
                </div>
            </section>
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
                        Wähle in der mittleren Liste eine Karte aus, um hier die Vorschau zu sehen.
                    </p>
                </div>

                <div class="archive-browser-empty">
                    Rechts erscheint die große Kartenansicht mit Werten und Aktionen.
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
                        Große, ruhige Vorschau der aktuell markierten Karte.
                    </p>
                </div>

                <div class="archive-preview-card">
                    ${this.renderImage(card)}

                    <div class="archive-preview-card__head">
                        <h4 class="archive-preview-card__title">${Utils.escapeHtml(name)}</h4>

                        <div class="archive-preview-card__meta">
                            <span class="archive-badge archive-badge--type">${Utils.escapeHtml(typeLabel)}</span>
                            <span class="archive-badge archive-badge--set">${Utils.escapeHtml(sourceLabel)}</span>
                        </div>
                    </div>

                    ${this.renderStats(card)}
                    ${this.renderActions(card)}

                    <div class="archive-preview-card__footer">
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
