import CONFIG from './config.js';
import Utils from './utils.js';
import ApiNormalizers from './api-normalizers.js';

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

        if (window.ApiCache?.adventureLists?.[resolvedSetKey]) {
            return window.ApiCache.adventureLists[resolvedSetKey];
        }

        const path = CONFIG.getAdventureIndexPath
            ? CONFIG.getAdventureIndexPath(resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/index.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            const fallback = [];
            if (window.ApiCache?.adventureLists) {
                window.ApiCache.adventureLists[resolvedSetKey] = fallback;
            }
            return fallback;
        }

        const entries = Utils.normalizeArray(rawData?.adventures)
            .map(entry => ApiNormalizers.normalizeAdventureIndexEntry(entry, resolvedSetKey))
            .filter(Boolean);

        if (window.ApiCache?.adventureLists) {
            window.ApiCache.adventureLists[resolvedSetKey] = entries;
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

        if (window.ApiCache?.adventures?.[adventureId]) {
            return window.ApiCache.adventures[adventureId];
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

            if (redirectedAdventure && window.ApiCache?.adventures) {
                window.ApiCache.adventures[adventureId] = redirectedAdventure;
            }

            return redirectedAdventure;
        }

        const normalized = ApiNormalizers.normalizeAdventure(rawData, adventureId, resolvedSetKey);

        if (window.ApiCache?.adventures) {
            window.ApiCache.adventures[adventureId] = normalized;
        }

        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);

        if (window.ApiCache?.masterIndexes?.[resolvedSetKey]) {
            return window.ApiCache.masterIndexes[resolvedSetKey];
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

            if (window.ApiCache?.masterIndexes) {
                window.ApiCache.masterIndexes[resolvedSetKey] = normalized;
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

            if (window.ApiCache?.masterIndexes) {
                window.ApiCache.masterIndexes[resolvedSetKey] = fallback;
            }

            return fallback;
        }
    },

    buildGitHubContentsUrl(directoryPath = '') {
        const safePath = Utils.normalizeString(directoryPath).replace(/^\/+/, '');
        const apiBase = CONFIG.getGitHubApiBase?.();
        const branch = Utils.normalizeString(CONFIG.github?.branch);

        if (!apiBase || !safePath || !branch) {
            return '';
        }

        return `${apiBase}contents/${safePath}?ref=${encodeURIComponent(branch)}`;
    },

    async fetchGitHubDirectory(directoryPath = '') {
        const url = this.buildGitHubContentsUrl(directoryPath);

        if (!url) {
            return [];
        }

        const res = await fetch(url, {
            headers: {
                Accept: 'application/vnd.github+json'
            }
        });

        if (!res.ok) {
            throw new Error(
                `GitHub-Verzeichnis konnte nicht geladen werden: ${directoryPath} → HTTP ${res.status}`
            );
        }

        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },

    async getGitHubCatalogEntries(catalogKey = '') {
        if (!CONFIG.isGitHubEnabled?.()) {
            return [];
        }

        const catalogConfig = CONFIG.getGitHubCatalogConfig?.(catalogKey);
        if (!catalogConfig?.enabled || !catalogConfig?.dataDir) {
            return [];
        }

        return await this.fetchGitHubDirectory(catalogConfig.dataDir);
    }
};

export default ApiFetch;
