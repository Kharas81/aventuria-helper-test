import Utils from '../core/utils.js';
import RenderCommon from './common.js';
import CardDetailFormatters from './card-detail-formatters.js';

export const CardDetailSections = {
    normalizeCardDetail(card) {
        const normalized = RenderCommon.normalizeCard(card);

        return {
            ...normalized,
            layout: Utils.normalizeString(card?.layout || normalized?.layout || 'portrait').toLowerCase(),
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

    renderSearchChips(items = []) {
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
    },

    renderMetaRows(items = []) {
        const safeItems = items.filter(item => {
            if (!item) return false;
            return item?.isHtml
                ? Boolean(Utils.normalizeString(String(item.value)))
                : Boolean(Utils.normalizeString(item?.value));
        });

        if (!safeItems.length) {
            return '<p class="card-detail__empty">Keine Zusatzinfos vorhanden.</p>';
        }

        return `
            <dl class="card-detail__meta">
                ${safeItems.map(item => {
                    const valueHtml = item?.isHtml
                        ? String(item.value)
                        : Utils.escapeHtml(String(item.value));

                    return `
                        <div class="card-detail__meta-row">
                            <dt class="card-detail__meta-label">${Utils.escapeHtml(item.label)}</dt>
                            <dd class="card-detail__meta-value">${valueHtml}</dd>
                        </div>
                    `;
                }).join('')}
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
        if (!safeText) {
            return '';
        }

        return `
            <section class="card-detail__text-block">
                <h3>${Utils.escapeHtml(title)}</h3>
                <p>${CardDetailFormatters.formatRuleText(safeText)}</p>
            </section>
        `;
    },

    renderRuleList(title, items, valueKey = 'text') {
        const safeItems = RenderCommon.normalizeArray(items).filter(Boolean);
        if (!safeItems.length) {
            return '';
        }

        return `
            <section class="card-detail__text-block">
                <h3>${Utils.escapeHtml(title)}</h3>
                <div class="card-detail__sections">
                    ${safeItems.map(item => {
                        if (typeof item === 'string') {
                            return `<p>${CardDetailFormatters.formatRuleText(item)}</p>`;
                        }

                        const value = Utils.normalizeString(item?.[valueKey] ?? '');
                        const prefix = item?.value !== undefined && item?.value !== null
                            ? `${Utils.escapeHtml(String(item.value))}: `
                            : item?.roll
                                ? `${Utils.escapeHtml(String(item.roll))}: `
                                : item?.title
                                    ? `${Utils.escapeHtml(String(item.title))}: `
                                    : '';

                        return `<p>${prefix}${CardDetailFormatters.formatRuleText(value)}</p>`;
                    }).join('')}
                </div>
            </section>
        `;
    },

    renderActionBlocks(actionTable) {
        const rows = RenderCommon.normalizeArray(actionTable).filter(Boolean);
        if (!rows.length) {
            return '';
        }

        return `
            <section class="card-detail__text-block">
                <h3>Aktionen</h3>
                <div class="card-detail__actions">
                    ${rows.map(row => `
                        <article class="card-detail__action">
                            <div class="card-detail__action-top">
                                ${row?.roll ? `<span class="card-detail__roll">${Utils.escapeHtml(String(row.roll))}</span>` : ''}
                                ${row?.title ? `<span class="card-detail__action-title">${CardDetailFormatters.formatRuleText(String(row.title))}</span>` : ''}
                            </div>
                            ${row?.description
                                ? `<p class="card-detail__action-text">${CardDetailFormatters.formatRuleText(String(row.description))}</p>`
                                : '<p class="card-detail__empty">Keine Beschreibung vorhanden.</p>'
                            }
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    buildOverviewPanel(card) {
        const sourceName = Utils.normalizeString(
            card?.source?.book
            || card?.set?.name
            || card?.set?.shortName
        );

        const searchableKeywords = Array.from(new Set([
            ...RenderCommon.normalizeArray(card?.keywords),
            ...RenderCommon.normalizeArray(card?.search_aliases)
        ]));

        const metaHtml = this.renderMetaRows([
            { label: 'Kategorie', value: card.card_category },
            { label: 'Typ', value: card.type },
            {
                label: 'Tags',
                value: this.renderSearchChips(card.tags),
                isHtml: true
            },
            {
                label: 'Keywords',
                value: this.renderSearchChips(searchableKeywords),
                isHtml: true
            },
            { label: 'Quelle', value: sourceName },
            { label: 'Illustration', value: card?.source?.illustration || '' }
        ]);

        return `
            <section class="card-detail__panel">
                <h3 class="card-detail__panel-title">Übersicht</h3>
                ${metaHtml}
            </section>
        `;
    },

    buildValuesPanel(card) {
        return `
            <section class="card-detail__panel">
                <h3 class="card-detail__panel-title">Werte</h3>
                ${this.renderStats(card.stats)}
            </section>
        `;
    },

    buildExplorePanel(card) {
        const suggestedQueries = Array.from(new Set([
            ...RenderCommon.normalizeArray(card?.tags).filter(tag => {
                const normalized = Utils.normalizeString(tag).toLowerCase();
                return normalized && !['schergen', 'schergenkarte', card?.type?.toLowerCase()].includes(normalized);
            }),
            ...RenderCommon.normalizeArray(card?.keywords).slice(0, 3)
        ])).filter(Boolean);

        if (!suggestedQueries.length) {
            return '';
        }

        return `
            <section class="card-detail__panel">
                <h3 class="card-detail__panel-title">Ähnliche Karten finden</h3>
                ${this.renderSearchChips(suggestedQueries)}
            </section>
        `;
    },

    buildImagePanel(card, imageId = 'card-detail-image') {
        if (!card.hasRealImage) {
            return `
                <div class="card-detail__image-panel">
                    <p class="card-detail__empty">Kein Kartenbild vorhanden.</p>
                </div>
            `;
        }

        return `
            <div class="card-detail__image-panel">
                <div class="card-detail__image-wrap">
                    <img
                        id="${imageId}"
                        class="card-detail__image"
                        alt="${Utils.escapeHtml(card.name)}"
                    >
                </div>
            </div>
        `;
    },

    buildRulesSections(card) {
        const notesHtml = Utils.normalizeString(card.notes)
            ? `
                <section class="card-detail__text-block">
                    <h3>Hinweis</h3>
                    <p class="card-detail__notes">${CardDetailFormatters.formatRuleText(card.notes)}</p>
                </section>
            `
            : '';

        return [
            this.renderTextBlock('Passiv', card.rules.passive),
            this.renderTextBlock('Erfolg', card.rules.success),
            this.renderTextBlock('Misserfolg', card.rules.fail),
            this.renderTextBlock('Zieheffekt', card.rules.draw_effect),
            this.renderRuleList('Zeiteffekte', card.rules.timed_effects),
            this.renderRuleList('Meilensteine', card.rules.milestones),
            this.renderActionBlocks(card.rules.action_table),
            this.renderTextBlock('Flavour', card.rules.flavor),
            notesHtml
        ].filter(Boolean).join('');
    },

    buildDetailMarkup(card, options = {}) {
        const titleId = Utils.normalizeString(options.titleId || 'card-detail-title');
        const imageId = Utils.normalizeString(options.imageId || 'card-detail-image');
        const isLandscape = Utils.normalizeString(card?.layout).toLowerCase() === 'landscape';

        return `
            <div class="card-detail${isLandscape ? ' card-detail--landscape' : ''}">
                <header class="card-detail__header">
                    <h2 class="card-detail__title" id="${titleId}">${Utils.escapeHtml(card.name)}</h2>
                    ${CardDetailFormatters.renderHeaderBadges(card)}
                </header>

                <section class="card-detail__top">
                    ${this.buildImagePanel(card, imageId)}

                    <div class="card-detail__info">
                        ${this.buildOverviewPanel(card)}
                        ${this.buildValuesPanel(card)}
                        ${this.buildExplorePanel(card)}
                    </div>
                </section>

                <section class="card-detail__sections">
                    ${this.buildRulesSections(card)}
                </section>
            </div>
        `;
    }
};

export default CardDetailSections;
