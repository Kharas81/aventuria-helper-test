import Utils from '../core/utils.js';
import RenderCommon from './common.js';
import CardDetailFormatters from './card-detail-formatters.js';

export function renderTextBlock(title = '', text = '') {
    const safeText = Utils.normalizeString(text);
    if (!safeText) {
        return '';
    }

    return `
        <section class="card-detail__text-block">
            <span class="card-detail__rule-kicker">Regeltext</span>
            <h3>${Utils.escapeHtml(title)}</h3>
            <p>${CardDetailFormatters.formatRuleText(safeText)}</p>
        </section>
    `;
}

export function renderRuleList(title, items, valueKey = 'text') {
    const safeItems = RenderCommon.normalizeArray(items).filter(Boolean);
    if (!safeItems.length) {
        return '';
    }

    return `
        <section class="card-detail__text-block">
            <span class="card-detail__rule-kicker">Listenregel</span>
            <h3>${Utils.escapeHtml(title)}</h3>
            <div class="card-detail__rules-grid">
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
}

export function renderActionBlocks(actionTable) {
    const rows = RenderCommon.normalizeArray(actionTable).filter(Boolean);
    if (!rows.length) {
        return '';
    }

    return `
        <section class="card-detail__text-block">
            <span class="card-detail__rule-kicker">Aktionsübersicht</span>
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
}

export function buildRulesSections(card) {
    const notesHtml = Utils.normalizeString(card.notes)
        ? `
            <section class="card-detail__text-block">
                <span class="card-detail__rule-kicker">Hinweis</span>
                <h3>Zusatznotiz</h3>
                <p class="card-detail__notes">${CardDetailFormatters.formatRuleText(card.notes)}</p>
            </section>
        `
        : '';

    return [
        renderTextBlock('Passiv', card.rules.passive),
        renderTextBlock('Erfolg', card.rules.success),
        renderTextBlock('Misserfolg', card.rules.fail),
        renderTextBlock('Zieheffekt', card.rules.draw_effect),
        renderRuleList('Zeiteffekte', card.rules.timed_effects),
        renderRuleList('Meilensteine', card.rules.milestones),
        renderActionBlocks(card.rules.action_table),
        renderTextBlock('Flavour', card.rules.flavor),
        notesHtml
    ].filter(Boolean).join('');
}

export default {
    renderTextBlock,
    renderRuleList,
    renderActionBlocks,
    buildRulesSections
};
