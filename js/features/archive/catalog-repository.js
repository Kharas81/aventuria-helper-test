import Utils from '../../core/utils.js';
import CatalogIndexLoader from './catalog-index-loader.js';
import CatalogCardNormalizer from './catalog-card-normalizer.js';
import ApiFetch from '../../core/api-fetch.js';

export const CatalogRepository = {
    getCollectionCache(catalogKey = '') {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        if (!resolvedCatalogKey) {
            return null;
        }

        return window.ApiCache?.catalogCollections?.[resolvedCatalogKey] || null;
    },

    cacheCollection(catalogKey = '', cards = []) {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        if (!resolvedCatalogKey || !window.ApiCache) {
            return Utils.normalizeArray(cards);
        }

        window.ApiCache.catalogCollections ??= {};
        window.ApiCache.catalogCollections[resolvedCatalogKey] = Utils.normalizeArray(cards);

        return window.ApiCache.catalogCollections[resolvedCatalogKey];
    },

    cacheCard(entry = {}, card = null) {
        const filePath = Utils.normalizeString(entry?.filePath);
        if (!filePath || !card?.id || !window.ApiCache) {
            return;
        }

        window.ApiCache.catalogCards ??= {};
        window.ApiCache.catalogCards[`local:${filePath}`] = card;
    },

    async loadCard(entry = {}) {
        const filePath = Utils.normalizeString(entry?.filePath);
        if (!filePath) {
            return null;
        }

        const rawCard = await ApiFetch.fetchJson(filePath);
        const normalizedCard = CatalogCardNormalizer.normalize(rawCard, entry);

        if (normalizedCard) {
            this.cacheCard(entry, normalizedCard);
        }

        return normalizedCard;
    },

    async loadCardsFromEntries(entries = []) {
        const loadedCards = [];

        for (const entry of Utils.normalizeArray(entries)) {
            try {
                const card = await this.loadCard(entry);
                if (card) {
                    loadedCards.push(card);
                }
            } catch (error) {
                console.warn(
                    'Lokale Katalogkarte konnte nicht geladen werden:',
                    entry?.filePath || entry?.fileName || 'unbekannt',
                    error
                );
            }
        }

        return loadedCards;
    },

    mergeById(cards = []) {
        const map = new Map();

        for (const card of Utils.normalizeArray(cards)) {
            const id = Utils.normalizeString(card?.id);
            if (!id) continue;

            map.set(id, card);
        }

        return Array.from(map.values());
    },

    async getCards(catalogKey = '') {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        if (!resolvedCatalogKey) {
            return [];
        }

        const cached = this.getCollectionCache(resolvedCatalogKey);
        if (cached) {
            return cached;
        }

        const entries = await CatalogIndexLoader.getEntries(resolvedCatalogKey);
        const loadedCards = await this.loadCardsFromEntries(entries);
        const mergedCards = this.mergeById(loadedCards);

        return this.cacheCollection(resolvedCatalogKey, mergedCards);
    }
};

export default CatalogRepository;
