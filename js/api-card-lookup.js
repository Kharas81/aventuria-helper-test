window.ApiCardLookup = {
    getAdventureSetKey(adventureId, fallbackSetKey = '') {
        const adventure = window.ApiCache.adventures[Utils.normalizeString(adventureId)];
        const setId = Utils.normalizeString(adventure?.set?.id);
        return setId || fallbackSetKey || window.CONFIG?.defaultSet || 'base_game';
    },

    getActiveSetKey() {
        const selectedAdventure = window.State?.getState?.()?.selectedAdventure || '';
        if (selectedAdventure) {
            return this.getAdventureSetKey(selectedAdventure, window.CONFIG?.defaultSet || 'base_game');
        }
        return window.CONFIG?.defaultSet || 'base_game';
    },

    async getCatalogCard(detailPath) {
        const normalizedPath = Utils.normalizeString(detailPath);
        if (!normalizedPath) return null;

        if (window.ApiCache.catalogCards[normalizedPath]) {
            return window.ApiCache.catalogCards[normalizedPath];
        }

        const rawData = await window.ApiFetch.fetchJson(normalizedPath);
        const normalized = window.ApiNormalizers.normalizeCatalogCard(rawData);

        window.ApiCache.catalogCards[normalizedPath] = normalized;
        return normalized;
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return window.ApiNormalizers.normalizeCardPayload({ cards: [] }, '');
        }

        const cacheKey = `${setKey || 'auto'}::${normalizedAdventureId}`;
        if (window.ApiCache.cardPayloads[cacheKey]) {
            return window.ApiCache.cardPayloads[cacheKey];
        }

        const config = window.CONFIG || null;
        const resolvedSetKey = this.getAdventureSetKey(
            normalizedAdventureId,
            setKey || config?.defaultSet || 'base_game'
        );

        const master = await window.ApiFetch.getMasterIndex(resolvedSetKey);

        const migratedMasterCards = Utils.normalizeArray(master.cards).filter(card =>
            Array.isArray(card?.adventure_refs) &&
            card.adventure_refs.includes(normalizedAdventureId) &&
            typeof card?.detail_path === 'string' &&
            card.detail_path.trim().length > 0
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = [];

            for (const entry of migratedMasterCards) {
                try {
                    const detail = await this.getCatalogCard(entry.detail_path);
                    if (detail) {
                        loadedCards.push(detail);
                    }
                } catch (err) {
                    console.warn(`⚠️ Katalogkarte konnte nicht geladen werden: ${entry?.id}`, err);
                }
            }

            const payload = {
                adventure_id: normalizedAdventureId,
                adventure_name: '',
                cards: loadedCards
            };

            window.ApiCache.cardPayloads[cacheKey] = payload;
            return payload;
        }

        const legacyPath = config?.getLegacyAdventureCardsPath
            ? config.getLegacyAdventureCardsPath(normalizedAdventureId, resolvedSetKey)
            : `data/cards/${resolvedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;

        try {
            const rawData = await window.ApiFetch.fetchJson(legacyPath);
            const payload = window.ApiNormalizers.normalizeCardPayload(rawData, normalizedAdventureId);

            window.ApiCache.cardPayloads[cacheKey] = payload;
            return payload;
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, err);

            const fallback = window.ApiNormalizers.normalizeCardPayload({ cards: [] }, normalizedAdventureId);
            window.ApiCache.cardPayloads[cacheKey] = fallback;
            return fallback;
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    async findCardById(id, setKey = null) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        const cachedCatalogCard = Object.values(window.ApiCache.catalogCards).find(card => card?.id === targetId);
        if (cachedCatalogCard) return cachedCatalogCard;

        const config = window.CONFIG || null;
        const setsToSearch = setKey
            ? [Utils.normalizeString(setKey)]
            : config?.getEnabledSets?.().map(setConfig => setConfig.id) || [config?.defaultSet || 'base_game'];

        for (const currentSetKey of setsToSearch) {
            const master = await window.ApiFetch.getMasterIndex(currentSetKey);
            const entry = Utils.normalizeArray(master.cards).find(card => Utils.normalizeString(card?.id) === targetId);

            if (entry?.detail_path) {
                try {
                    return await this.getCatalogCard(entry.detail_path);
                } catch (err) {
                    console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
                }
            }
        }

        for (const payload of Object.values(window.ApiCache.cardPayloads)) {
            const found = Utils.normalizeArray(payload?.cards).find(card => Utils.normalizeString(card?.id) === targetId);
            if (found) return found;
        }

        return null;
    },

    async openCardDetailById(id) {
        const card = await this.findCardById(id);
        if (!card) return;

        if (window.Renderer && typeof window.Renderer.openCardDetail === 'function') {
            window.Renderer.openCardDetail(card);
        }
    }
};
