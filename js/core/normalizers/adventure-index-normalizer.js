import Utils from '../utils.js';
import NormalizerHelpers from './normalizer-helpers.js';

export const AdventureIndexNormalizer = {
    extractAdventureIdFromRedirect(redirectValue = '') {
        const normalized = Utils.normalizeString(redirectValue);
        if (!normalized) return '';

        const withoutQuery = normalized.split('?')[0].split('#')[0];
        const lastSegment = withoutQuery.split('/').pop() || '';

        return Utils.normalizeString(lastSegment.replace(/\.json$/i, ''));
    },

    normalizeAdventureIndexEntry(entry, fallbackSetKey = '') {
        if (!entry || typeof entry !== 'object') {
            return null;
        }

        const id = Utils.normalizeString(entry.id);
        if (!id) {
            return null;
        }

        const setMeta = NormalizerHelpers.buildSetMeta(entry?.set, fallbackSetKey);

        return {
            id,
            name: Utils.normalizeString(entry.name) || id,
            status: Utils.normalizeString(entry.status) || 'raw',
            hidden: Boolean(entry.hidden),
            order: Number(entry.order ?? 9999),
            set: setMeta
        };
    }
};

export default AdventureIndexNormalizer;
