import Utils from '../utils.js';
import NormalizerHelpers from './normalizer-helpers.js';

export const AdventureNormalizer = {
    normalizeAdventure(data, fallbackId = '', setKey = '') {
        const raw = data && typeof data === 'object' ? data : {};
        const setMeta = NormalizerHelpers.buildSetMeta(raw?.set, setKey);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id || fallbackId),
            name: Utils.normalizeString(raw.name || fallbackId),
            status: Utils.normalizeString(raw.status || 'raw'),
            danger_calc: Number(raw?.danger_calc ?? 0),
            narrative: Utils.normalizeObject(raw.narrative),
            setup: Utils.normalizeObject(raw.setup),
            source: Utils.normalizeObject(raw.source),
            notes: Utils.normalizeString(raw.notes),
            set: setMeta
        };
    }
};

export default AdventureNormalizer;
