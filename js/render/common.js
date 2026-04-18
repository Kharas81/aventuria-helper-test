import Utils from '../core/utils.js';
import CoreRuntime from '../core/runtime.js';

export const RenderCommon = {
    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeReferenceQuery(label = '') {
        return Utils.normalizeString(label)
            .replace(/\s*\([^)]*\)\s*$/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
    },

    normalizeCard(card) {
        const raw = card && typeof card === 'object' ? card : {};

        const imageFront = Utils.normalizeString(raw?.images?.front);
        const legacyImage = Utils.normalizeString(raw?.image);
        const resolvedImage = Utils.resolveImagePath(imageFront, legacyImage);

        const status = Utils.normalizeString(raw?.status || 'raw');
        const id = Utils.normalizeString(raw?.id);
        const name = Utils.normalizeString(raw?.name || id || 'Unbekannte Karte');
        const type = Utils.normalizeString(raw?.type || 'unknown');

        return {
            ...raw,
            id,
            name,
            type,
            status,
            imageSrc: resolvedImage,
            hasRealImage: Utils.hasRealImage(imageFront, legacyImage),
            tags: this.normalizeArray(raw?.tags),
            keywords: this.normalizeArray(raw?.keywords),
            search_aliases: this.normalizeArray(raw?.search_aliases),
            layout: Utils.normalizeString(raw?.layout || 'portrait').toLowerCase()
        };
    },

    getCardLabel(card) {
        const normalized = this.normalizeCard(card);

        if (normalized?.label) {
            return Utils.normalizeString(normalized.label);
        }

        return Utils.normalizeString(normalized.name || normalized.id || 'Unbekannte Karte');
    },

    getCardImage(card) {
        const normalized = this.normalizeCard(card);
        return normalized.imageSrc;
    },

    buildChecklistItem(card) {
        const normalized = this.normalizeCard(card);
        const label = card?.label
            ? Utils.normalizeString(card.label)
            : this.getCardLabel(normalized);

        const referenceQuery = this.normalizeReferenceQuery(label);

        const safeLabel = Utils.escapeHtml(label);
        const imageSrc = this.getCardImage(normalized);
        const cardId = Utils.escapeHtml(normalized.id || '');
        const safeReferenceQuery = Utils.escapeHtml(referenceQuery);
        const hasPreview = normalized.hasRealImage;
        const isMissing = normalized.status === 'missing';
        const isPlaceholder = normalized.status === 'placeholder';

        const previewAttr = hasPreview
            ? ` data-image="${Utils.escapeHtml(imageSrc)}" data-card-id="${cardId || safeReferenceQuery}" class="has-preview"`
            : '';

        const infoButton = `
            <button
                class="info-btn"
                type="button"
                title="Kartendetails oder passende Karten anzeigen"
                data-action="open-card-detail"
                data-card-id="${cardId}"
                data-card-label="${safeLabel}"
                data-card-query="${safeReferenceQuery}"
                ${(!cardId && !safeReferenceQuery) ? 'disabled' : ''}
            >i</button>
        `;

        const suffix = isMissing
            ? ' ⚠️'
            : isPlaceholder
                ? ' 🛈'
                : '';

        return `
            <li
                class="checklist-item"
                data-card-id="${cardId}"
                data-card-label="${safeLabel}"
                data-card-query="${safeReferenceQuery}"
            >
                <input type="checkbox">
                <span${previewAttr}>${safeLabel}${suffix}</span>
                ${infoButton}
            </li>
        `;
    },

    bindCardPreviews(scope = document) {
        const previewTargets = scope.querySelectorAll('.has-preview[data-image]');
        const ui = CoreRuntime.getUI();

        previewTargets.forEach(el => {
            if (el.dataset.previewBound === 'true') return;
            el.dataset.previewBound = 'true';

            el.addEventListener('mouseenter', event => {
                const imageSrc = el.dataset.image;
                ui?.showPreview?.(event, imageSrc);
            });

            el.addEventListener('mousemove', event => {
                ui?.movePreview?.(event);
            });

            el.addEventListener('mouseleave', () => {
                ui?.closePreview?.();
            });

            el.addEventListener('click', () => {
                const imageSrc = el.dataset.image;
                if (imageSrc) {
                    ui?.openPreview?.(imageSrc);
                }
            });
        });
    }
};

export default RenderCommon;
