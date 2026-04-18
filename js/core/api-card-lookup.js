import CardSetResolver from './cards/card-set-resolver.js';
import CardCache from './cards/card-cache.js';
import CardRepository from './cards/card-repository.js';
import CardDetailService from './cards/card-detail-service.js';

export const ApiCardLookup = {
    resolveAdventureSetKey(adventureId, fallbackSetKey = '') {
        return CardSetResolver.resolveAdventureSetKey(adventureId, fallbackSetKey);
    },

    getAdventureSetKey(adventureId, fallbackSetKey = '') {
        return CardSetResolver.getAdventureSetKey(adventureId, fallbackSetKey);
    },

    getActiveSetKey() {
        return CardSetResolver.getActiveSetKey();
    },

    getEnabledSetIds(setKey = '') {
        return CardSetResolver.getEnabledSetIds(setKey);
    },

    buildCardPayload(adventureId, cards = [], adventureName = '') {
        return CardRepository.buildCardPayload(adventureId, cards, adventureName);
    },

    getCardPayloadCacheKey(adventureId, setKey = '') {
        return CardCache.getCardPayloadCacheKey(adventureId, setKey);
    },

    getLegacyCardsPath(adventureId, setKey = '') {
        return CardRepository.getLegacyCardsPath(adventureId, setKey);
    },

    async getCatalogCard(detailPath = '') {
        return await CardRepository.getCatalogCard(detailPath);
    },

    getMigratedMasterCards(masterIndex, adventureId) {
        return CardRepository.getMigratedMasterCards(masterIndex, adventureId);
    },

    async loadMigratedMasterCards(masterCards = []) {
        return await CardRepository.loadMigratedMasterCards(masterCards);
    },

    async loadLegacyCards(adventureId, setKey = '') {
        return await CardRepository.loadLegacyCards(adventureId, setKey);
    },

    cacheCardPayload(cacheKey = '', payload = null) {
        return CardRepository.cacheCardPayload(cacheKey, payload);
    },

    async getCards(adventureId, setKey = null) {
        return await CardRepository.getCards(adventureId, setKey);
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await CardRepository.preloadCardsForAdventure(adventureId, setKey);
    },

    getCachedCatalogCardById(id = '') {
        return CardCache.getCachedCatalogCardById(id);
    },

    async findCardInMasterIndexes(targetId, setKey = '') {
        return await CardRepository.findCardInMasterIndexes(targetId, setKey);
    },

    findCardInLoadedPayloads(targetId) {
        return CardRepository.findCardInLoadedPayloads(targetId);
    },

    async findCardById(id, setKey = '') {
        return await CardRepository.findCardById(id, setKey);
    },

    async openCardDetailById(id, setKey = '') {
        return await CardDetailService.openCardDetailById(id, setKey);
    }
};

export default ApiCardLookup;
