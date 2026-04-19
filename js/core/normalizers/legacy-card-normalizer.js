import CONFIG from '../config.js';
import Utils from '../utils.js';
import NormalizerHelpers from './normalizer-helpers.js';

export const LegacyCardNormalizer = {
    normalizeLegacyCard(card, fallbackAdventureId = '') {
        const raw = card && typeof card === 'object' ? card : {};
        const resolvedSetKey = NormalizerHelpers.resolveSetKey(raw?.set, CONFIG.defaultSet);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id),
            name: Utils.normalizeString(raw.name || raw.id),
            type: Utils.normalizeString(raw.type || 'unknown'),
            status: Utils.normalizeString(raw.status || 'raw'),
            adventure_id: Utils.normalizeString(raw.adventure_id || fallbackAdventureId),
            set: resolvedSetKey,
            tags: Utils.normalizeArray(raw.tags),
            keywords: Utils.normalizeArray(raw.keywords),
            pool_refs: Utils.normalizeArray(raw.pool_refs),
            stats: Utils.normalizeObject(raw.stats),
            rules: Utils.normalizeObject(raw.rules),
            source: Utils.normalizeObject(raw.source),
            note: Utils.normalizeString(raw.note),
            image: Utils.normalizeString(raw.image),
            thumb: raw.thumb ?? null
        };
    }
};

export default LegacyCardNormalizer;
