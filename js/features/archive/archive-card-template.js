import Utils from '../../core/utils.js';
import Assets from '../../core/assets.js';
import ArchiveFilter from './filter.js';

export const ArchiveCardTemplate = {
    resolveCardImage(card = {}) {
        return Utils.resolveImagePath(
            card?.images?.front,
            card?.image,
            Assets.getSharedCardPlaceholderPath?.(),
            Assets.getImageFallbackPath?.()
        );
    },

    resolveCardSourceLabel(card = {}) {
        return Utils.normalizeString(
            card?.set?.shortName
            || card?.set?.name
            || ArchiveFilter.getCardSourceName(card)
        );
    },

    resolveCardLayout(card = {}) {
        const layout = Utils.normalizeString(card?.layout || 'portrait').toLowerCase();
        return layout === 'landscape' ? 'landscape' : 'portrait';
    },

    renderCard(card = {}) {
        const imageSrc = this.resolveCardImage(card);
        const layout = this.resolveCardLayout(card);
        const sourceLabel = this.resolveCardSourceLabel(card);

        const safeId = Utils.escapeHtml(Utils.normalizeString(card?.id));
        const safeName = Utils.escapeHtml(Utils.normalizeString(card?.name || 'Unbekannte Karte'));
        const safeSourceLabel = Utils.escapeHtml(sourceLabel);
        const safeImageSrc = Utils.escapeHtml(imageSrc);
        const safeAlt = Utils.escapeHtml(Utils.normalizeString(card?.name || 'Karte'));

        const landscapeClass = layout === 'landscape' ? ' archive-card--landscape' : '';

        return `
            <button
                type="button"
                class="archive-card${landscapeClass}"
                data-action="open-card-detail"
                data-card-id="${safeId}"
                data-card-label="${safeName}"
                title="${safeName}"
            >
                <div class="archive-card__media">
                    <img
                        class="archive-card__image"
                        src="${safeImageSrc}"
                        alt="${safeAlt}"
                        loading="lazy"
                    >
                </div>

                <div class="archive-card__body">
                    ${safeSourceLabel ? `<div class="archive-card__source">${safeSourceLabel}</div>` : ''}
                    <div class="archive-card__title">${safeName}</div>
                </div>
            </button>
        `;
    }
};

export default ArchiveCardTemplate;
