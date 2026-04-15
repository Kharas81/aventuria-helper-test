window.API = {
    get cache() {
        return window.ApiCache;
    },

    normalizeString(value) {
        return Utils.normalizeString(value);
    },

    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    getConfig() {
        return window.CONFIG || null;
    },

    extractAdventureIdFromRedirect(value) {
        return window.ApiNormalizers.extractAdventureIdFromRedirect(value);
    },

    normalizeAdventure(data, fallbackId, setKey) {
        return window.ApiNormalizers.normalizeAdventure(data, fallbackId, setKey);
    },

    normalizeAdventureIndexEntry(entry, fallbackSetKey) {
        return window.ApiNormalizers.normalizeAdventureIndexEntry(entry, fallbackSetKey);
    },

    normalizeCatalogCard(card) {
        return window.ApiNormalizers.normalizeCatalogCard(card);
    },

    normalizeCardPayload(rawData, adventureId) {
        return window.ApiNormalizers.normalizeCardPayload(rawData, adventureId);
    },

    async fetchJson(path) {
        return await window.ApiFetch.fetchJson(path);
    },

    async loadJSON(path) {
        return await window.ApiFetch.loadJSON(path);
    },

    async getAdventureIndex(setKey) {
        return await window.ApiFetch.getAdventureIndex(setKey);
    },

    async getAvailableAdventures() {
        return await window.ApiFetch.getAvailableAdventures();
    },

    async getAdventure(id, setKey, visited) {
        return await window.ApiFetch.getAdventure(id, setKey, visited);
    },

    async getMasterIndex(setKey) {
        return await window.ApiFetch.getMasterIndex(setKey);
    },

    resolveAdventureSetKey(id, fallback) {
        return window.ApiCardLookup.resolveAdventureSetKey(id, fallback);
    },

    getAdventureSetKey(id, fallback) {
        return window.ApiCardLookup.getAdventureSetKey(id, fallback);
    },

    getActiveSetKey() {
        return window.ApiCardLookup.getActiveSetKey();
    },

    buildCardPayload(adventureId, cards, adventureName) {
        return window.ApiCardLookup.buildCardPayload(adventureId, cards, adventureName);
    },

    async getCatalogCard(path) {
        return await window.ApiCardLookup.getCatalogCard(path);
    },

    async getCards(adventureId, setKey) {
        return await window.ApiCardLookup.getCards(adventureId, setKey);
    },

    async preloadCardsForAdventure(adventureId, setKey) {
        return await window.ApiCardLookup.preloadCardsForAdventure(adventureId, setKey);
    },

    async findCardById(id, setKey) {
        return await window.ApiCardLookup.findCardById(id, setKey);
    },

    async openCardDetailById(id) {
        return await window.ApiCardLookup.openCardDetailById(id);
    }
};
