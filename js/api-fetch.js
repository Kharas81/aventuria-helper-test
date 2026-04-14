window.ApiFetch = {
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
        const config = window.CONFIG || null;
        const resolvedSetKey = Utils.normalizeString(setKey || config?.defaultSet || 'base_game');

        if (window.ApiCache.adventureLists[resolvedSetKey]) {
            return window.ApiCache.adventureLists[resolvedSetKey];
        }

        const path = config?.getAdventureIndexPath
            ? config.getAdventureIndexPath(resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/index.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            const fallback = [];
            window.ApiCache.adventureLists[resolvedSetKey] = fallback;
            return fallback;
        }

        const entries = Utils.normalizeArray(rawData?.adventures)
            .map(entry => window.ApiNormalizers.normalizeAdventureIndexEntry(entry, resolvedSetKey))
            .filter(Boolean);

        window.ApiCache.adventureLists[resolvedSetKey] = entries;
        return entries;
    },

    async getAvailableAdventures() {
        const config = window.CONFIG || null;
        const enabledSets = config?.getEnabledSets?.() || [{ id: config?.defaultSet || 'base_game' }];

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
            throw new Error(`Alias-Schleife erkannt bei Abenteuer "${adventureId}".`);
        }

        if (window.ApiCache.adventures[adventureId]) {
            return window.ApiCache.adventures[adventureId];
        }

        const config = window.CONFIG || null;
        const resolvedSetKey = Utils.normalizeString(setKey || config?.defaultSet || 'base_game');
        const path = config?.getAdventurePath
            ? config.getAdventurePath(adventureId, resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/${adventureId}.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            console.error('Abenteuer-Datei fehlt:', path);
            return null;
        }

        const status = Utils.normalizeString(rawData?.status);

        if (status === 'deprecated_alias') {
            const redirectAdventureId = window.ApiNormalizers.extractAdventureIdFromRedirect(rawData?.redirect_to);

            if (!redirectAdventureId) {
                throw new Error(`Alias-Abenteuer "${adventureId}" hat kein gültiges redirect_to.`);
            }

            visitedIds.add(adventureId);

            const redirectedAdventure = await this.getAdventure(
                redirectAdventureId,
                resolvedSetKey,
                visitedIds
            );

            if (redirectedAdventure) {
                window.ApiCache.adventures[adventureId] = redirectedAdventure;
            }

            return redirectedAdventure;
        }

        const normalized = window.ApiNormalizers.normalizeAdventure(rawData, adventureId, resolvedSetKey);
        window.ApiCache.adventures[adventureId] = normalized;
        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const config = window.CONFIG || null;
        const resolvedSetKey = Utils.normalizeString(setKey || config?.defaultSet || 'base_game');

        if (window.ApiCache.masterIndexes[resolvedSetKey]) {
            return window.ApiCache.masterIndexes[resolvedSetKey];
        }

        const path = config?.getMasterIndexPath
            ? config.getMasterIndexPath(resolvedSetKey)
            : `data/cards/${resolvedSetKey}/master_${resolvedSetKey}.json`;

        try {
            const rawData = await this.fetchJson(path);
            const normalized = {
                set: rawData?.set || {
                    id: resolvedSetKey,
                    name: config?.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: Utils.normalizeArray(rawData?.cards)
            };

            window.ApiCache.masterIndexes[resolvedSetKey] = normalized;
            return normalized;
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);

            const fallback = {
                set: {
                    id: resolvedSetKey,
                    name: config?.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: 1,
                cards: []
            };

            window.ApiCache.masterIndexes[resolvedSetKey] = fallback;
            return fallback;
        }
    }
};
