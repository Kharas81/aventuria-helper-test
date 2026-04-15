export const ApiCache = {
    adventures: {},
    adventureLists: {},
    cardPayloads: {},
    catalogCards: {},
    masterIndexes: {},

    clear() {
        this.adventures = {};
        this.adventureLists = {};
        this.cardPayloads = {};
        this.catalogCards = {};
        this.masterIndexes = {};
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
    }
};

export default ApiCache;
