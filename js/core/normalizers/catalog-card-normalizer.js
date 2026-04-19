import Utils from '../utils.js';
import NormalizerHelpers from './normalizer-helpers.js';

export const CatalogCardNormalizer = {
    normalizeCatalogCard(card) {
        const raw = card && typeof card === 'object' ? card : {};
        const setMeta = NormalizerHelpers.buildSetMeta(raw?.set);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id),
            name: Utils.normalizeString(raw.name || raw.id),
            type: Utils.normalizeString(raw.type || 'unknown'),
            status: Utils.normalizeString(raw.status || 'raw'),
            card_category: Utils.normalizeString(raw.card_category || 'unknown'),

            set: setMeta,

            subtypes: Utils.normalizeArray(raw.subtypes),
            adventure_refs: Utils.normalizeArray(raw.adventure_refs),
            tags: Utils.normalizeArray(raw.tags),
            custom_tags: Utils.normalizeArray(raw.custom_tags),
            keywords: Utils.normalizeArray(raw.keywords),

            images: {
                front: Utils.normalizeString(raw?.images?.front || raw?.image),
                back: raw?.images?.back ?? null,
                alt: Utils.normalizeArray(raw?.images?.alt)
            },

            stats: Utils.normalizeObject(raw.stats),
            rules: Utils.normalizeObject(raw.rules),
            source: Utils.normalizeObject(raw.source),
            notes: Utils.normalizeString(raw.notes),
            search_text: Utils.normalizeString(raw.search_text)
        };
    }
};

export default CatalogCardNormalizer;
