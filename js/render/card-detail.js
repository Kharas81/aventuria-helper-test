import Utils from '../core/utils.js';
import RenderCommon from './common.js';

export const RenderCardDetail = {
    symbolMap: {
        '[NAHKAMPF]': 'Nahkampf',
        '[FERNKAMPF]': 'Fernkampf',
        '[TREFFERPUNKTE]': 'Trefferpunkte',
        '[LEBEN]': 'Leben',
        '[AKTIONEN]': 'Aktionen',
        '[UNSICHERES_SYMBOL_ROT_OVAL]': 'rotes Oval-Symbol'
    },

    normalizeCardDetail(card) {
        const normalized = RenderCommon.normalizeCard(card);

        return {
            ...normalized,
            card_category: Utils.normalizeString(card?.card_category),
            subtypes: RenderCommon.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: Utils.normalizeString(card?.rules?.passive),
                success: Utils.normalizeString(card?.rules?.success),
                fail: Utils.normalizeString(card?.rules?.fail),
                draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
                flavor: Utils.normalizeString(card?.rules?.flavor),
                timed_effects: RenderCommon.normalizeArray(card?.rules?.timed_effects),
                milestones: RenderCommon.normalizeArray(card?.rules?.milestones),
                action_table: RenderCommon.normalizeArray(card?.rules?.action_table)
            },
            stats: {
                gp: card?.stats?.gp ?? null,
                lp: card?.stats?.lp ?? null,
                armor: card?.stats?.armor ?? null,
                evasion: card?.stats?.evasion ?? null,
                actions: card?.stats?.actions ?? null,
                start_value: card?.stats?.start_value ?? null,
                cost: card?.stats?.cost ?? null
            }
        };
    },

    formatRuleText(text = '') {
        let formatted = Utils.escapeHtml(String(text ?? ''));

        Object.entries(this.symbolMap).forEach(([token, label]) => {
            const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            formatted = formatted.replace(
                new RegExp(escapedToken, 'g'),
                `<span class="card-detail__symbol">${Utils.escapeHtml(label)}</span>`
            );
        });

        return formatted;
    },

    getStatusBadgeVariant(status = '') {
        const normalized = Utils.normalizeString(status).toLowerCase();

        if (normalized === 'playable') return 'success';
        if (normalized.includes('placeholder')) return 'warning';
        if (normalized === 'missing') return 'danger';
        return 'default';
    },

    renderBadge(text = '', variant = 'default') {
        const safeText = Utils.normalizeString(text);
        if (!safeText) return '';

        return `<span class="ui-badge ui-badge--${variant}">${Utils.escapeHtml(safeText)}</span>`;
    },

    renderHeaderBadges(card) {
        const badges = [
            this.renderBadge(card?.card_category || '', 'info'),
            this.renderBadge(card?.type || '', 'default'),
            this.renderBadge(card?.status || '', this.getStatusBadgeVariant(card?.status))
        ].filter(Boolean);

        return badges.length
            ? `<div class="card-detail__badges">${badges.join('')}</div>`
            : '';
    },

    renderMetaRows(items = []) {
        const safeItems = items.filter(item => Utils.normalizeString(item?.value));

        if (!safeItems.length) {
            return '<p class="card-detail__empty">Keine Zusatzinfos vorhanden.</p>';
        }

        return `
            <dl class="card-detail__meta">
                ${safeItems.map(item => `
                    <div class="card-detail__meta-row">
                        <dt class="card-detail__meta-label">${Utils.escapeHtml(item.label)}</dt>
                        <dd class="card-detail__meta-value">${Utils.escapeHtml(String(item.value))}</dd>
                    </div>
                `).join('')}
            </dl>
        `;
    },

    renderStats(stats = {}) {
        const entries = [
            ['GP', stats?.gp],
            ['LP', stats?.lp],
            ['Rüstung', stats?.armor],
            ['Ausweichen', stats?.evasion],
            ['Aktionen', stats?.actions],
            ['Startwert', stats?.start_value],
            ['Kosten', stats?.cost]
        ].filter(([, value]) => value !== null && value !== undefined && value !== '');

        if (!entries.length) {
            return '<p class="card-detail__empty">Keine Werte vorhanden.</p>';
        }

        return `
            <div class="card-detail__stats">
                ${entries.map(([label, value]) => `
                    <div class="card-detail__stat">
                        <span class="card-detail__stat-label">${Utils.escapeHtml(label)}</span>
                        <span class="card-detail__stat-value">${Utils.escapeHtml(String(value))}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderTextBlock(title = '', text = '') {
        const safeText = Utils.normalizeString(text);
        if (!safeText) return '';

        return `
            <section class="card-detail__text-block">
                <h3>${Utils.escapeHtml(title)}</h3>
                <p>${this.formatRuleText(safeText)}</p>
            </section>
        `;
    },

    renderRuleList(title, items, valueKey = 'text') {
        const safeItems = RenderCommon.normalizeArray(items).filter(Boolean);
        if (!safeItems.length) return '';

        return `
            <section class="card-detail__text-block">
                <h3>${Utils.escapeHtml(title)}</h3>
                <div class="card-detail__sections">
                    ${safeItems.map(item => {
                        if (typeof item === 'string') {
                            return `<p>${this.formatRuleText(item)}</p>`;
                        }

                        const value = Utils.normalizeString(item?.[valueKey] ?? '');
                        const prefix = item?.value !== undefined && item?.value !== null
                            ? `${Utils.escapeHtml(String(item.value))}: `
                            : item?.roll
                                ? `${Utils.escapeHtml(String(item.roll))}: `
                                : item?.title
                                    ? `${Utils.escapeHtml(String(item.title))}: `
                                    : '';

                        return `<p>${prefix}${this.formatRuleText(value)}</p>`;
                    }).join('')}
                </div>
            </section>
        `;
    },

    renderActionBlocks(actionTable) {
        const rows = RenderCommon.normalizeArray(actionTable).filter(Boolean);
        if (!rows.length) return '';

        return `
            <section class="card-detail__text-block">
                <h3>Aktionen</h3>
                <div class="card-detail__actions">
                    ${rows.map(row => `
                        <article class="card-detail__action">
                            <div class="card-detail__action-top">
                                ${row?.roll ? `<span class="card-detail__roll">${Utils.escapeHtml(String(row.roll))}</span>` : ''}
                                ${row?.title ? `<span class="card-detail__action-title">${this.formatRuleText(String(row.title))}</span>` : ''}
                            </div>
                            ${row?.description
                                ? `<p class="card-detail__action-text">${this.formatRuleText(String(row.description))}</p>`
                                : '<p class="card-detail__empty">Keine Beschreibung vorhanden.</p>'
                            }
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    ensureCardDetailModal() {
        let modal = Utils.byId('card-detail-modal');

        if (modal) {
            return modal;
        }

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="modal-backdrop" id="card-detail-modal">
                <div class="modal-content">
                    <span class="close-modal" data-action="close-card-detail">&times;</span>
                    <div class="tab-content" id="card-detail-content"></div>
                </div>
            </div>
        `;

        modal = wrapper.firstElementChild;
        document.body.appendChild(modal);

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.closeCardDetail();
            }
        });

        return modal;
    },

    closeCardDetail() {
        const modal = Utils.byId('card-detail-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    openCardDetail(card) {
        const normalized = this.normalizeCardDetail(card);
        const modal = this.ensureCardDetailModal();
        const content = Utils.byId('card-detail-content');

        if (!modal || !content) return;

        const sourceName = Utils.normalizeString(
            normalized?.source?.book
            || normalized?.set?.name
            || normalized?.set?.shortName
        );

        const metaHtml = this.renderMetaRows([
            { label: 'Kategorie', value: normalized.card_category },
            { label: 'Typ', value: normalized.type },
            { label: 'Tags', value: normalized.tags?.length ? normalized.tags.join(', ') : '' },
            { label: 'Keywords', value: normalized.keywords?.length ? normalized.keywords.join(', ') : '' },
            { label: 'Quelle', value: sourceName },
            { label: 'Illustration', value: normalized?.source?.illustration || '' }
        ]);

        const imageHtml = normalized.hasRealImage
            ? `
                <div class="card-detail__image-panel">
                    <div class="card-detail__image-wrap">
                        <img
                            id="card-detail-image"
                            class="card-detail__image"
                            alt="${Utils.escapeHtml(normalized.name)}"
                        >
                    </div>
                </div>
            `
            : `
                <div class="card-detail__image-panel">
                    <p class="card-detail__empty">Kein Kartenbild vorhanden.</p>
                </div>
            `;

        const notesHtml = Utils.normalizeString(normalized.notes)
            ? `
                <section class="card-detail__text-block">
                    <h3>Hinweis</h3>
                    <p class="card-detail__notes">${this.formatRuleText(normalized.notes)}</p>
                </section>
            `
            : '';

        content.innerHTML = `
            <div class="card-detail">
                <header class="card-detail__header">
                    <h2 class="card-detail__title">${Utils.escapeHtml(normalized.name)}</h2>
                    ${this.renderHeaderBadges(normalized)}
                </header>

                <section class="card-detail__top">
                    ${imageHtml}

                    <div class="card-detail__info">
                        <section class="card-detail__panel">
                            <h3 class="card-detail__panel-title">Übersicht</h3>
                            ${metaHtml}
                        </section>

                        <section class="card-detail__panel">
                            <h3 class="card-detail__panel-title">Werte</h3>
                            ${this.renderStats(normalized.stats)}
                        </section>
                    </div>
                </section>

                <section class="card-detail__sections">
                    ${this.renderTextBlock('Passiv', normalized.rules.passive)}
                    ${this.renderTextBlock('Erfolg', normalized.rules.success)}
                    ${this.renderTextBlock('Misserfolg', normalized.rules.fail)}
                    ${this.renderTextBlock('Zieheffekt', normalized.rules.draw_effect)}
                    ${this.renderRuleList('Zeiteffekte', normalized.rules.timed_effects)}
                    ${this.renderRuleList('Meilensteine', normalized.rules.milestones)}
                    ${this.renderActionBlocks(normalized.rules.action_table)}
                    ${this.renderTextBlock('Flavour', normalized.rules.flavor)}
                    ${notesHtml}
                </section>
            </div>
        `;

        if (normalized.hasRealImage) {
            const image = Utils.byId('card-detail-image');
            Utils.setSafeImageSource(image, normalized.imageSrc);
        }

        modal.style.display = 'flex';
    }
};

export default RenderCardDetail;
