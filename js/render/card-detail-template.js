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

    return `
        <div class="card-detail${isLandscape ? ' card-detail--landscape' : ''}">
            <header class="card-detail__header">
                <h2 class="card-detail__title" id="${titleId}">${Utils.escapeHtml(card.name)}</h2>
                ${CardDetailFormatters.renderHeaderBadges(card)}
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
