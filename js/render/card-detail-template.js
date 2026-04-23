import Utils from '../core/utils.js';
import CardDetailFormatters from './card-detail-formatters.js';
import {
    buildOverviewPanel,
    buildValuesPanel,
    buildExplorePanel,
    buildImagePanel
} from './card-detail-panels.js';
import { buildRulesSections } from './card-detail-rules.js';

export function buildDetailMarkup(card, options = {}) {
    const titleId = Utils.normalizeString(options.titleId || 'card-detail-title');
    const imageId = Utils.normalizeString(options.imageId || 'card-detail-image');
    const isLandscape = Utils.normalizeString(card?.layout).toLowerCase() === 'landscape';

    const sourceLabel = Utils.normalizeString(
        card?.set?.name
        || card?.set?.shortName
        || card?.source?.book
        || 'Karte'
    );

    const typeLabel = Utils.normalizeString(
        card?.card_category
        || card?.type
        || 'Detailansicht'
    );

    const leadText = CardDetailFormatters.formatRuleText(
        Utils.normalizeString(card?.notes)
        || 'Hier siehst du Bild, Werte, Übersicht und Regeltexte der ausgewählten Karte in einer gemeinsamen Detailansicht.'
    );

    return `
        <div class="card-detail${isLandscape ? ' card-detail--landscape' : ''}">
            <header class="card-detail__header">
                <div class="card-detail__title-row">
                    <div class="card-detail__title-copy">
                        <span class="card-detail__eyebrow">${Utils.escapeHtml(sourceLabel)}</span>
                        <h2 class="card-detail__title" id="${titleId}">${Utils.escapeHtml(card.name)}</h2>
                        <p class="card-detail__lead">${leadText}</p>
                    </div>

                    <div class="card-detail__header-badges">
                        ${CardDetailFormatters.renderHeaderBadges(card)}
                        ${typeLabel ? `<span class="archive-badge archive-badge--type">${Utils.escapeHtml(typeLabel)}</span>` : ''}
                    </div>
                </div>
            </header>

            <section class="card-detail__top">
                ${buildImagePanel(card, imageId)}

                <div class="card-detail__info">
                    ${buildOverviewPanel(card)}
                    ${buildValuesPanel(card)}
                    ${buildExplorePanel(card)}
                </div>
            </section>

            <section class="card-detail__sections">
                ${buildRulesSections(card)}
            </section>
        </div>
    `;
}

export default {
    buildDetailMarkup
};
