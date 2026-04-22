import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
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

    buildRuntimeEntry(catalogKey = '', fileName = '') {
        const catalogConfig = CONFIG.getCatalogConfig?.(catalogKey);
        const safeFileName = Utils.normalizeString(fileName);

        if (!catalogConfig || !safeFileName) {
            return null;
        }

        return {
            catalogKey: Utils.normalizeString(catalogConfig.key),
            fileName: safeFileName,
            fileStem: safeFileName.replace(/\.json$/i, ''),
            filePath: `${Utils.normalizeString(catalogConfig.dataDir).replace(/\/+$/g, '')}/${safeFileName}`,
            imageDir: Utils.normalizeString(catalogConfig.imageDir),
            defaultType: Utils.normalizeString(catalogConfig.defaultType),
            defaultCardCategory: Utils.normalizeString(catalogConfig.defaultCardCategory)
        };
    },

    async loadRuntimeBundle(catalogKey = '') {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        const runtimePath = CONFIG.getRuntimeCatalogCardsPath?.(resolvedCatalogKey);

        if (!runtimePath) {
            return null;
        }

        const rawBundle = await ApiFetch.loadJSON(runtimePath);
        if (!rawBundle) {
            return null;
        }

        const cards = Utils.normalizeArray(rawBundle?.cards);
        if (!cards.length) {
            return [];
        }

        const loadedCards = [];

        for (const item of cards) {
            const fileName = Utils.normalizeString(item?.fileName);
            const rawCard = item?.rawCard && typeof item.rawCard === 'object'
                ? item.rawCard
                : null;

            if (!fileName || !rawCard) {
                continue;
            }

            const entry = this.buildRuntimeEntry(resolvedCatalogKey, fileName);
            if (!entry) {
                continue;
            }

            const normalizedCard = CatalogCardNormalizer.normalize(rawCard, entry);
            if (!normalizedCard) {
                continue;
            }

            this.cacheCard(entry, normalizedCard);
            loadedCards.push(normalizedCard);
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

        const runtimeCards = await this.loadRuntimeBundle(resolvedCatalogKey);
        if (Array.isArray(runtimeCards)) {
            const mergedRuntimeCards = this.mergeById(runtimeCards);
            return this.cacheCollection(resolvedCatalogKey, mergedRuntimeCards);
        }

        const entries = await CatalogIndexLoader.getEntries(resolvedCatalogKey);
        const loadedCards = await this.loadCardsFromEntries(entries);
        const mergedCards = this.mergeById(loadedCards);

        return this.cacheCollection(resolvedCatalogKey, mergedCards);
    }
};

export default CatalogRepository;
