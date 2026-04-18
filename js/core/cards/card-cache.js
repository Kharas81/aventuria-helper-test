import CONFIG from '../config.js';
import Utils from '../utils.js';
import ApiCache from '../api-cache.js';

const FALLBACK_SET_KEY = 'base_game';

export const CardCache = {
    ensureBuckets() {
        ApiCache.cardPayloads ??= {};
        ApiCache.catalogCards ??= {};
    },

    getCardPayloadCacheKey(adventureId, setKey = '') {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || FALLBACK_SET_KEY
        );

        return `${normalizedSetKey}::${normalizedAdventureId}`;
    },

    getCardPayload(cacheKey = '') {
        this.ensureBuckets();
        return ApiCache.cardPayloads[cacheKey] || null;
    },

    setCardPayload(cacheKey = '', payload = null) {
        this.ensureBuckets();

        if (!cacheKey) {
            return payload;
        }

        ApiCache.cardPayloads[cacheKey] = payload;
        return payload;
    },

    getCatalogCard(detailPath = '') {
        this.ensureBuckets();
        const normalizedPath = Utils.normalizeString(detailPath);

        if (!normalizedPath) {
            return null;
        }

        return ApiCache.catalogCards[normalizedPath] || null;
    },

    setCatalogCard(detailPath = '', card = null) {
        this.ensureBuckets();
        const normalizedPath = Utils.normalizeString(detailPath);

        if (!normalizedPath) {
            return card;
        }

        ApiCache.catalogCards[normalizedPath] = card;
        return card;
    },

    getCachedCatalogCardById(id = '') {
        this.ensureBuckets();
        const targetId = Utils.normalizeString(id);

        if (!targetId) {
            return null;
        }

        return Object.values(ApiCache.catalogCards || {})
            .find(card => Utils.normalizeString(card?.id) === targetId) || null;
    },

    getLoadedPayloadCards() {
        this.ensureBuckets();

        return Object.values(ApiCache.cardPayloads || {})
            .flatMap(payload => Utils.normalizeArray(payload?.cards));
    }
};

export default CardCache;
