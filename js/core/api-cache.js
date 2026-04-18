export const ApiCache = {
    adventures: {},
    adventureLists: {},
    cardPayloads: {},
    catalogCards: {},
    masterIndexes: {},
    catalogIndexes: {},
    catalogCollections: {},

    clear() {
        this.adventures = {};
        this.adventureLists = {};
        this.cardPayloads = {};
        this.catalogCards = {};
        this.masterIndexes = {};
        this.catalogIndexes = {};
        this.catalogCollections = {};
    },

    clearSet(setKey) {
        const key = String(setKey ?? '').trim();

        delete this.adventureLists[key];
        delete this.masterIndexes[key];

        Object.keys(this.cardPayloads).forEach(cacheKey => {
            if (cacheKey.startsWith(key + '::')) {
                delete this.cardPayloads[cacheKey];
            }
        });
    },

    clearCatalog(catalogKey) {
        const key = String(catalogKey ?? '').trim();
        if (!key) return;

        delete this.catalogIndexes[key];
        delete this.catalogCollections[key];

        Object.keys(this.catalogCards).forEach(cacheKey => {
            if (cacheKey.includes(`/catalog/${key}/`)) {
                delete this.catalogCards[cacheKey];
            }
        });
    }
};

export default ApiCache;
