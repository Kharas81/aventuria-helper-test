window.API = {
    // --- ZUGRIFF AUF CACHE (für Abwärtskompatibilität, falls jemand API.cache direkt aufruft) ---
    get cache() { return window.ApiCache; },

    // --- HILFSMETHODEN (Fassade zu Utils) ---
    normalizeString(value) { return Utils.normalizeString(value); },
    normalizeArray(value)  { return Utils.normalizeArray(value); },
    getConfig()            { return window.CONFIG || null; },

    // --- NORMALISIERUNG (Delegation) ---
    extractAdventureIdFromRedirect(v)    { return window.ApiNormalizers.extractAdventureIdFromRedirect(v); },
    normalizeAdventure(d, f, s)          { return window.ApiNormalizers.normalizeAdventure(d, f, s); },
    normalizeAdventureIndexEntry(e, f)   { return window.ApiNormalizers.normalizeAdventureIndexEntry(e, f); },
    normalizeCatalogCard(c)              { return window.ApiNormalizers.normalizeCatalogCard(c); },
    normalizeCardPayload(r, a)           { return window.ApiNormalizers.normalizeCardPayload(r, a); },

    // --- FETCHING (Delegation) ---
    async fetchJson(path)                { return await window.ApiFetch.fetchJson(path); },
    async loadJSON(path)                 { return await window.ApiFetch.loadJSON(path); },
    async getAdventureIndex(setKey)      { return await window.ApiFetch.getAdventureIndex(setKey); },
    async getAvailableAdventures()       { return await window.ApiFetch.getAvailableAdventures(); },
    async getAdventure(id, set, vis)     { return await window.ApiFetch.getAdventure(id, set, vis); },
    async getMasterIndex(setKey)         { return await window.ApiFetch.getMasterIndex(setKey); },

    // --- CARD LOOKUPS (Delegation) ---
    getAdventureSetKey(id, fallback)     { return window.ApiCardLookup.getAdventureSetKey(id, fallback); },
    getActiveSetKey()                    { return window.ApiCardLookup.getActiveSetKey(); },
    async getCatalogCard(path)           { return await window.ApiCardLookup.getCatalogCard(path); },
    async getCards(advId, setKey)        { return await window.ApiCardLookup.getCards(advId, setKey); },
    async preloadCardsForAdventure(i, s) { return await window.ApiCardLookup.preloadCardsForAdventure(i, s); },
    async findCardById(id, setKey)       { return await window.ApiCardLookup.findCardById(id, setKey); },
    async openCardDetailById(id)         { return await window.ApiCardLookup.openCardDetailById(id); }
};
