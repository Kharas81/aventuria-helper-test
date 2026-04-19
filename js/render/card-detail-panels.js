import Utils from '../core/utils.js';
import RenderCommon from './common.js';
import { renderSearchChips } from './card-detail-search.js';
import { renderMetaRows } from './card-detail-meta.js';
import { renderStats } from './card-detail-stats.js';

export function buildOverviewPanel(card) {
    const sourceName = Utils.normalizeString(
        card?.source?.book
        || card?.set?.name
        || card?.set?.shortName
    );

    const searchableKeywords = Array.from(new Set([
        ...RenderCommon.normalizeArray(card?.keywords),
        ...RenderCommon.normalizeArray(card?.search_aliases)
    ]));

    const metaHtml = renderMetaRows([
        { label: 'Kategorie', value: card.card_category },
        { label: 'Typ', value: card.type },
        {
            label: 'Tags',
            value: renderSearchChips(card.tags),
            isHtml: true
        },
        {
            label: 'Keywords',
            value: renderSearchChips(searchableKeywords),
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
}

export function buildValuesPanel(card) {
    return `
        <section class="card-detail__panel">
            <h3 class="card-detail__panel-title">Werte</h3>
            ${renderStats(card.stats)}
        </section>
    `;
}

export function buildExplorePanel(card) {
    const suggestedQueries = Array.from(new Set([
        ...RenderCommon.normalizeArray(card?.tags).filter(tag => {
            const normalized = Utils.normalizeString(tag).toLowerCase();
            return normalized && ![
                'schergen',
                'schergenkarte',
                card?.type?.toLowerCase()
            ].includes(normalized);
        }),
        ...RenderCommon.normalizeArray(card?.keywords).slice(0, 3)
    ])).filter(Boolean);

    if (!suggestedQueries.length) {
        return '';
    }

    return `
        <section class="card-detail__panel">
            <h3 class="card-detail__panel-title">Ähnliche Karten finden</h3>
            ${renderSearchChips(suggestedQueries)}
        </section>
    `;
}

export function buildImagePanel(card, imageId = 'card-detail-image') {
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
}

export default {
    buildOverviewPanel,
    buildValuesPanel,
    buildExplorePanel,
    buildImagePanel
};
