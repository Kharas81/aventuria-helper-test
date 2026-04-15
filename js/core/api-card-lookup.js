import CONFIG from './config.js';
import Utils from './utils.js';
import ApiFetch from './api-fetch.js';
import ApiNormalizers from './api-normalizers.js';

export const ApiCardLookup = {
    resolveAdventureSetKey(adventureId, fallbackSetKey = '') {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedFallback = Utils.normalizeString(
            fallbackSetKey || CONFIG.defaultSet || 'base_game'
        );

        if (!normalizedAdventureId) {
            return normalizedFallback;
        }

        const adventure = window.ApiCache?.adventures?.[normalizedAdventureId];
        const setId = Utils.normalizeString(adventure?.set?.id);

        return setId || normalizedFallback;
    },

    getAdventureSetKey(adventureId, fallbackSetKey = '') {
        return this.resolveAdventureSetKey(adventureId, fallbackSetKey);
    },

    getActiveSetKey() {
        const selectedAdventure = window.State?.getState?.()?.selectedAdventure || '';
        if (selectedAdventure) {
            return this.resolveAdventureSetKey(
                selectedAdventure,
                CONFIG.defaultSet || 'base_game'
            );
        }

        return CONFIG.defaultSet || 'base_game';
    },

    buildCardPayload(adventureId, cards = [], adventureName = '') {
        return {
            adventure_id: Utils.normalizeString(adventureId),
            adventure_name: Utils.normalizeString(adventureName),
            cards: Utils.normalizeArray(cards)
        };
    },

    getCardPayloadCacheKey(adventureId, setKey) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );

        return `${normalizedSetKey}::${normalizedAdventureId}`;
    },

    getLegacyCardsPath(adventureId, setKey) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );

        if (CONFIG?.getLegacyAdventureCardsPath) {
            return CONFIG.getLegacyAdventureCardsPath(
                normalizedAdventureId,
                normalizedSetKey
            );
        }

        return `data/cards/${normalizedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;
    },

    async getCatalogCard(detailPath) {
        const normalizedPath = Utils.normalizeString(detailPath);
        if (!normalizedPath) return null;

        if (window.ApiCache?.catalogCards?.[normalizedPath]) {
            return window.ApiCache.catalogCards[normalizedPath];
        }

        const rawData = await ApiFetch.fetchJson(normalizedPath);
        const normalized = ApiNormalizers.normalizeCatalogCard(rawData);

        if (window.ApiCache?.catalogCards) {
            window.ApiCache.catalogCards[normalizedPath] = normalized;
        }

        return normalized;
    },

    getMigratedMasterCards(masterIndex, adventureId) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);

        return Utils.normalizeArray(masterIndex?.cards).filter(card =>
            Array.isArray(card?.adventure_refs) &&
            card.adventure_refs.includes(normalizedAdventureId) &&
            typeof card?.detail_path === 'string' &&
            card.detail_path.trim().length > 0
        );
    },

    async loadMigratedMasterCards(masterCards) {
        const loadedCards = [];

        for (const entry of Utils.normalizeArray(masterCards)) {
            try {
                const detail = await this.getCatalogCard(entry?.detail_path);
                if (detail) {
                    loadedCards.push(detail);
                }
            } catch (err) {
                console.warn(
                    `⚠️ Katalogkarte konnte nicht geladen werden: ${entry?.id || entry?.detail_path || 'unbekannt'}`,
                    err
                );
            }
        }

        return loadedCards;
    },

    async loadLegacyCards(adventureId, setKey) {
        const legacyPath = this.getLegacyCardsPath(adventureId, setKey);
        const rawData = await ApiFetch.fetchJson(legacyPath);

        return ApiNormalizers.normalizeCardPayload(rawData, Utils.normalizeString(adventureId));
    },

    cacheCardPayload(cacheKey, payload) {
        if (window.ApiCache?.cardPayloads) {
            window.ApiCache.cardPayloads[cacheKey] = payload;
        }
        return payload;
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return ApiNormalizers.normalizeCardPayload({ cards: [] }, '');
        }

        const resolvedSetKey = this.resolveAdventureSetKey(
            normalizedAdventureId,
            setKey || CONFIG.defaultSet || 'base_game'
        );

        const cacheKey = this.getCardPayloadCacheKey(
            normalizedAdventureId,
            resolvedSetKey
        );

        if (window.ApiCache?.cardPayloads?.[cacheKey]) {
            return window.ApiCache.cardPayloads[cacheKey];
        }

        const masterIndex = await ApiFetch.getMasterIndex(resolvedSetKey);
        const migratedMasterCards = this.getMigratedMasterCards(
            masterIndex,
            normalizedAdventureId
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = await this.loadMigratedMasterCards(migratedMasterCards);
            const payload = this.buildCardPayload(normalizedAdventureId, loadedCards, '');

            return this.cacheCardPayload(cacheKey, payload);
        }

        try {
            const legacyPayload = await this.loadLegacyCards(
                normalizedAdventureId,
                resolvedSetKey
            );

            return this.cacheCardPayload(cacheKey, legacyPayload);
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, err);

            const fallbackPayload = ApiNormalizers.normalizeCardPayload(
                { cards: [] },
                normalizedAdventureId
            );

            return this.cacheCardPayload(cacheKey, fallbackPayload);
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    getCachedCatalogCardById(id) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        return Object.values(window.ApiCache?.catalogCards || {})
            .find(card => card?.id === targetId) || null;
    },

    getEnabledSetIds(setKey = null) {
        const normalizedSetKey = Utils.normalizeString(setKey);

        if (normalizedSetKey) {
            return [normalizedSetKey];
        }

        return CONFIG.getEnabledSets?.().map(setConfig => setConfig.id)
            || [CONFIG.defaultSet || 'base_game'];
    },

    async findCardInMasterIndexes(targetId, setKey = null) {
        const setsToSearch = this.getEnabledSetIds(setKey);

        for (const currentSetKey of setsToSearch) {
            const master = await ApiFetch.getMasterIndex(currentSetKey);
            const entry = Utils.normalizeArray(master?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (!entry?.detail_path) {
                continue;
            }

            try {
                return await this.getCatalogCard(entry.detail_path);
            } catch (err) {
                console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
            }
        }

        return null;
    },

    findCardInLoadedPayloads(targetId) {
        for (const payload of Object.values(window.ApiCache?.cardPayloads || {})) {
            const found = Utils.normalizeArray(payload?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (found) {
                return found;
            }
        }

        return null;
    },

    async findCardById(id, setKey = null) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        const cachedCatalogCard = this.getCachedCatalogCardById(targetId);
        if (cachedCatalogCard) {
            return cachedCatalogCard;
        }

        const masterCard = await this.findCardInMasterIndexes(targetId, setKey);
        if (masterCard) {
            return masterCard;
        }

        return this.findCardInLoadedPayloads(targetId);
    },

    async openCardDetailById(id) {
        const card = await this.findCardById(id);
        if (!card) return;

        if (window.RenderCardDetail?.openCardDetail) {
            window.RenderCardDetail.openCardDetail(card);
            return;
        }

        if (window.Renderer?.openCardDetail) {
            window.Renderer.openCardDetail(card);
        }
    }
};

export default ApiCardLookup;
