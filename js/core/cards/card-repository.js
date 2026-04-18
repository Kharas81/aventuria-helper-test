import CONFIG from '../config.js';
import Utils from '../utils.js';
import ApiFetch from '../api-fetch.js';
import ApiNormalizers from '../api-normalizers.js';

import CardSetResolver from './card-set-resolver.js';
import CardCache from './card-cache.js';

const FALLBACK_SET_KEY = 'base_game';

export const CardRepository = {
    buildCardPayload(adventureId, cards = [], adventureName = '', meta = {}) {
        return {
            adventure_id: Utils.normalizeString(adventureId),
            adventure_name: Utils.normalizeString(adventureName),
            cards: Utils.normalizeArray(cards),
            meta: {
                sourceMode: Utils.normalizeString(meta?.sourceMode || ''),
                setKey: Utils.normalizeString(meta?.setKey || ''),
                legacyFallbackUsed: Boolean(meta?.legacyFallbackUsed),
                reason: Utils.normalizeString(meta?.reason || '')
            }
        };
    },

    buildEmptyPayload(adventureId, setKey = '', reason = '') {
        return this.buildCardPayload(adventureId, [], '', {
            sourceMode: 'empty',
            setKey,
            legacyFallbackUsed: false,
            reason
        });
    },

    buildMigratedPayload(adventureId, cards = [], setKey = '') {
        return this.buildCardPayload(adventureId, cards, '', {
            sourceMode: 'master_index',
            setKey,
            legacyFallbackUsed: false,
            reason: 'master_index'
        });
    },

    buildLegacyPayload(adventureId, payload, setKey = '') {
        const safePayload = payload && typeof payload === 'object'
            ? payload
            : ApiNormalizers.normalizeCardPayload({ cards: [] }, adventureId);

        return {
            ...safePayload,
            meta: {
                sourceMode: 'legacy',
                setKey: Utils.normalizeString(setKey),
                legacyFallbackUsed: true,
                reason: 'legacy_fallback'
            }
        };
    },

    getLegacyCardsPath(adventureId, setKey = '') {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || FALLBACK_SET_KEY
        );

        if (CONFIG?.getLegacyAdventureCardsPath) {
            return CONFIG.getLegacyAdventureCardsPath(
                normalizedAdventureId,
                normalizedSetKey
            );
        }

        return `data/cards/${normalizedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;
    },

    canUseLegacyAdventureCards() {
        return CONFIG.isLegacyAdventureCardsEnabled?.() ?? true;
    },

    shouldWarnOnLegacyFallback() {
        return CONFIG.shouldWarnOnLegacyAdventureCardsFallback?.() ?? true;
    },

    warnLegacyFallback(adventureId, setKey = '') {
        if (!this.shouldWarnOnLegacyFallback()) {
            return;
        }

        const normalizedAdventureId = Utils.normalizeString(adventureId) || 'unbekannt';
        const normalizedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet || FALLBACK_SET_KEY);

        console.warn(
            `ℹ️ Legacy-Kartenfallback aktiv für Abenteuer "${normalizedAdventureId}" im Set "${normalizedSetKey}".`
        );
    },

    async getCatalogCard(detailPath = '') {
        const normalizedPath = Utils.normalizeString(detailPath);
        if (!normalizedPath) {
            return null;
        }

        const cachedCard = CardCache.getCatalogCard(normalizedPath);
        if (cachedCard) {
            return cachedCard;
        }

        const rawData = await ApiFetch.fetchJson(normalizedPath);
        const normalizedCard = ApiNormalizers.normalizeCatalogCard(rawData);

        return CardCache.setCatalogCard(normalizedPath, normalizedCard);
    },

    getMigratedMasterCards(masterIndex, adventureId) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);

        return Utils.normalizeArray(masterIndex?.cards).filter(card =>
            Array.isArray(card?.adventure_refs)
            && card.adventure_refs.includes(normalizedAdventureId)
            && typeof card?.detail_path === 'string'
            && card.detail_path.trim().length > 0
        );
    },

    async loadMigratedMasterCards(masterCards = []) {
        const loadedCards = [];

        for (const entry of Utils.normalizeArray(masterCards)) {
            try {
                const detail = await this.getCatalogCard(entry?.detail_path);
                if (detail) {
                    loadedCards.push(detail);
                }
            } catch (error) {
                console.warn(
                    `⚠️ Katalogkarte konnte nicht geladen werden: ${entry?.id || entry?.detail_path || 'unbekannt'}`,
                    error
                );
            }
        }

        return loadedCards;
    },

    async loadLegacyCards(adventureId, setKey = '') {
        const legacyPath = this.getLegacyCardsPath(adventureId, setKey);
        const rawData = await ApiFetch.fetchJson(legacyPath);

        return ApiNormalizers.normalizeCardPayload(
            rawData,
            Utils.normalizeString(adventureId)
        );
    },

    cacheCardPayload(cacheKey = '', payload = null) {
        return CardCache.setCardPayload(cacheKey, payload);
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return this.buildEmptyPayload('', '', 'missing_adventure_id');
        }

        const resolvedSetKey = CardSetResolver.resolveAdventureSetKey(
            normalizedAdventureId,
            setKey || CONFIG.defaultSet || FALLBACK_SET_KEY
        );

        const cacheKey = CardCache.getCardPayloadCacheKey(
            normalizedAdventureId,
            resolvedSetKey
        );

        const cachedPayload = CardCache.getCardPayload(cacheKey);
        if (cachedPayload) {
            return cachedPayload;
        }

        const masterIndex = await ApiFetch.getMasterIndex(resolvedSetKey);
        const migratedMasterCards = this.getMigratedMasterCards(
            masterIndex,
            normalizedAdventureId
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = await this.loadMigratedMasterCards(migratedMasterCards);
            const payload = this.buildMigratedPayload(
                normalizedAdventureId,
                loadedCards,
                resolvedSetKey
            );

            return this.cacheCardPayload(cacheKey, payload);
        }

        if (!this.canUseLegacyAdventureCards()) {
            const disabledPayload = this.buildEmptyPayload(
                normalizedAdventureId,
                resolvedSetKey,
                'legacy_disabled'
            );

            return this.cacheCardPayload(cacheKey, disabledPayload);
        }

        try {
            this.warnLegacyFallback(normalizedAdventureId, resolvedSetKey);

            const legacyPayload = await this.loadLegacyCards(
                normalizedAdventureId,
                resolvedSetKey
            );

            const normalizedLegacyPayload = this.buildLegacyPayload(
                normalizedAdventureId,
                legacyPayload,
                resolvedSetKey
            );

            return this.cacheCardPayload(cacheKey, normalizedLegacyPayload);
        } catch (error) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, error);

            const fallbackPayload = this.buildEmptyPayload(
                normalizedAdventureId,
                resolvedSetKey,
                'no_cards_found'
            );

            return this.cacheCardPayload(cacheKey, fallbackPayload);
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    async findCardInMasterIndexes(targetId, setKey = '') {
        const setsToSearch = CardSetResolver.getEnabledSetIds(setKey);

        for (const currentSetKey of setsToSearch) {
            const master = await ApiFetch.getMasterIndex(currentSetKey);
            const entry = Utils.normalizeArray(master?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (!entry?.detail_path) {
                continue;
            }

            try {
                return await this.getCatalogCard(entry.detail_path);
            } catch (error) {
                console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, error);
            }
        }

        return null;
    },

    findCardInLoadedPayloads(targetId) {
        return CardCache.getLoadedPayloadCards()
            .find(card => Utils.normalizeString(card?.id) === targetId) || null;
    },

    async findCardById(id, setKey = '') {
        const targetId = Utils.normalizeString(id);
        if (!targetId) {
            return null;
        }

        const cachedCatalogCard = CardCache.getCachedCatalogCardById(targetId);
        if (cachedCatalogCard) {
            return cachedCatalogCard;
        }

        const masterCard = await this.findCardInMasterIndexes(targetId, setKey);
        if (masterCard) {
            return masterCard;
        }

        return this.findCardInLoadedPayloads(targetId);
    }
};

export default CardRepository;
