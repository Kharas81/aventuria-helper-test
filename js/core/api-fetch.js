import CONFIG from './config.js';
import Utils from './utils.js';
import ApiNormalizers from './api-normalizers.js';
import ApiCache from './api-cache.js';

export const ApiFetch = {
    async fetchJson(path) {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`${path} → HTTP ${res.status}`);
        }
        return await res.json();
    },

    async loadJSON(path) {
        try {
            return await this.fetchJson(path);
        } catch (err) {
            console.error('Fehler beim Laden:', path, err);
            return null;
        }
    },

    async getAdventureIndex(setKey = null) {
        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);

        if (ApiCache?.adventureLists?.[resolvedSetKey]) {
            return ApiCache.adventureLists[resolvedSetKey];
        }

        const path = CONFIG.getAdventureIndexPath
            ? CONFIG.getAdventureIndexPath(resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/index.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            const fallback = [];
            if (ApiCache?.adventureLists) {
                ApiCache.adventureLists[resolvedSetKey] = fallback;
            }
            return fallback;
        }

        const entries = Utils.normalizeArray(rawData?.adventures)
            .map(entry => ApiNormalizers.normalizeAdventureIndexEntry(entry, resolvedSetKey))
            .filter(Boolean);

        if (ApiCache?.adventureLists) {
            ApiCache.adventureLists[resolvedSetKey] = entries;
        }

        return entries;
    },

    async getAvailableAdventures() {
        const enabledSets = CONFIG.getEnabledSets?.()
            || [{ id: CONFIG.defaultSet }];

        const allEntries = [];

        for (const setConfig of enabledSets) {
            const entries = await this.getAdventureIndex(setConfig.id);
            allEntries.push(...entries);
        }

        return allEntries
            .filter(entry => !entry.hidden)
            .filter(entry => entry.status !== 'deprecated_alias')
            .sort((a, b) => {
                if (a.order !== b.order) {
                    return a.order - b.order;
                }
                if (a.set.id !== b.set.id) {
                    return a.set.name.localeCompare(b.set.name, 'de');
                }
                return a.name.localeCompare(b.name, 'de');
            });
    },

    async getAdventure(id, setKey = null, visitedIds = new Set()) {
        const adventureId = Utils.normalizeString(id);
        if (!adventureId) return null;

        if (visitedIds.has(adventureId)) {
            throw new Error(`Zirkuläre Alias-Weiterleitung bei Abenteuer "${adventureId}".`);
        }

        if (ApiCache?.adventures?.[adventureId]) {
            return ApiCache.adventures[adventureId];
        }

        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);
        const path = CONFIG.getAdventurePath
            ? CONFIG.getAdventurePath(adventureId, resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/${adventureId}.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            console.error('Abenteuer-Datei fehlt:', path);
            return null;
        }

        const status = Utils.normalizeString(rawData?.status);

        if (status === 'deprecated_alias') {
            const redirectAdventureId = ApiNormalizers.extractAdventureIdFromRedirect(rawData?.redirect_to);

            if (!redirectAdventureId) {
                throw new Error(`Alias-Abenteuer "${adventureId}" hat kein gültiges redirect_to.`);
            }

            visitedIds.add(adventureId);

            const redirectedAdventure = await this.getAdventure(
                redirectAdventureId,
                resolvedSetKey,
                visitedIds
            );

            if (redirectedAdventure && ApiCache?.adventures) {
                ApiCache.adventures[adventureId] = redirectedAdventure;
            }

            return redirectedAdventure;
        }

        const normalized = ApiNormalizers.normalizeAdventure(rawData, adventureId, resolvedSetKey);

        if (ApiCache?.adventures) {
            ApiCache.adventures[adventureId] = normalized;
        }

        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);

        if (ApiCache?.masterIndexes?.[resolvedSetKey]) {
            return ApiCache.masterIndexes[resolvedSetKey];
        }

        const path = CONFIG.getMasterIndexPath
            ? CONFIG.getMasterIndexPath(resolvedSetKey)
            : `data/cards/${resolvedSetKey}/master_${resolvedSetKey}.json`;

        try {
            const rawData = await this.fetchJson(path);
            const normalized = {
                set: rawData?.set || {
                    id: resolvedSetKey,
                    name: CONFIG.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: Utils.normalizeArray(rawData?.cards)
            };

            if (ApiCache?.masterIndexes) {
                ApiCache.masterIndexes[resolvedSetKey] = normalized;
            }

            return normalized;
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);

            const fallback = {
                set: {
                    id: resolvedSetKey,
                    name: CONFIG.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: 1,
                cards: []
            };

            if (ApiCache?.masterIndexes) {
                ApiCache.masterIndexes[resolvedSetKey] = fallback;
            }

            return fallback;
        }
    },

    async getCatalogIndex(catalogKey = '') {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        const path = CONFIG.getCatalogIndexPath?.(resolvedCatalogKey);

        if (!path) {
            return { catalog_key: resolvedCatalogKey, cards: [] };
        }

        ApiCache.catalogIndexes ??= {};
        if (ApiCache.catalogIndexes[resolvedCatalogKey]) {
            return ApiCache.catalogIndexes[resolvedCatalogKey];
        }

        const rawData = await this.loadJSON(path);

        const normalized = {
            catalog_key: resolvedCatalogKey,
            cards: Utils.normalizeArray(rawData?.cards)
                .map(fileName => Utils.normalizeString(fileName))
                .filter(Boolean)
        };

        ApiCache.catalogIndexes[resolvedCatalogKey] = normalized;

        return normalized;
    }
};

export default ApiFetch;
