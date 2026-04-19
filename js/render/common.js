import Utils from '../core/utils.js';

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
    }
};

export default RenderCommon;
