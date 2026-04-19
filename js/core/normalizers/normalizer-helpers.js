import CONFIG from '../config.js';
import Utils from '../utils.js';

export const NormalizerHelpers = {
    resolveSetKey(...candidates) {
        for (const candidate of candidates) {
            const rawValue = Utils.isObject(candidate)
                ? candidate?.id
                : candidate;

            const normalizedValue = Utils.normalizeString(rawValue);
            if (normalizedValue) {
                return CONFIG.normalizeSetKey(normalizedValue);
            }
        }

        return CONFIG.defaultSet;
    },

    getSetConfig(...candidates) {
        return CONFIG.getSet(this.resolveSetKey(...candidates));
    },

    buildSetMeta(setValue = {}, fallbackSetKey = '') {
        const rawSet = Utils.isObject(setValue) ? setValue : {};
        const setConfig = this.getSetConfig(setValue, fallbackSetKey, CONFIG.defaultSet);

        return {
            ...rawSet,
            id: setConfig.id,
            name: Utils.normalizeString(rawSet?.name) || setConfig.name,
            shortName: Utils.normalizeString(rawSet?.shortName) || setConfig.shortName || setConfig.name
        };
    }
};

export default NormalizerHelpers;
