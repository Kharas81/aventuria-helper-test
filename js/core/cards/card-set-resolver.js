import CONFIG from '../config.js';
import Utils from '../utils.js';
import ApiCache from '../api-cache.js';
import State from '../state.js';

const FALLBACK_SET_KEY = 'base_game';

export const CardSetResolver = {
    normalizeSetKey(setKey = '') {
        return Utils.normalizeString(
            setKey || CONFIG.defaultSet || FALLBACK_SET_KEY
        );
    },

    resolveAdventureSetKey(adventureId, fallbackSetKey = '') {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedFallback = this.normalizeSetKey(fallbackSetKey);

        if (!normalizedAdventureId) {
            return normalizedFallback;
        }

        const adventure = ApiCache?.adventures?.[normalizedAdventureId];
        const setId = Utils.normalizeString(adventure?.set?.id);

        return setId || normalizedFallback;
    },

    getAdventureSetKey(adventureId, fallbackSetKey = '') {
        return this.resolveAdventureSetKey(adventureId, fallbackSetKey);
    },

    getEnabledSetIds(setKey = '') {
        const normalizedSetKey = Utils.normalizeString(setKey);

        if (normalizedSetKey) {
            return [normalizedSetKey];
        }

        const enabledSets = CONFIG.getEnabledSets?.() || [];
        if (enabledSets.length > 0) {
            return enabledSets
                .map(setConfig => Utils.normalizeString(setConfig?.id))
                .filter(Boolean);
        }

        return [this.normalizeSetKey()];
    },

    getActiveSetKey() {
        const selectedAdventure = State?.getState?.()?.selectedAdventure || '';

        if (selectedAdventure) {
            return this.resolveAdventureSetKey(
                selectedAdventure,
                CONFIG.defaultSet || FALLBACK_SET_KEY
            );
        }

        return this.normalizeSetKey();
    }
};

export default CardSetResolver;
