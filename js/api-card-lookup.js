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

    async getCatalogCard(path) {
        const normalizedPath = Utils.normalizeString(path);
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
        const resolvedSetKey = Utils.normalizeString(
            setKey || this.getAdventureSetKey(normalizedAdventureId, window.CONFIG?.defaultSet || 'base_game')
        );

        if (!normalizedAdventureId) {
            return window.ApiNormalizers.normalizeCardPayload({ cards: [] }, '');
        }

        const cacheKey = `${resolvedSetKey}::${normalizedAdventureId}`;
        if (window.ApiCache.cardPayloads[cacheKey]) {
            return window.ApiCache.cardPayloads[cacheKey];
        }

        const master = await window.ApiFetch.getMasterIndex(resolvedSetKey);
        const masterCards = Utils.normalizeArray(master?.cards);

        const matchingEntries = masterCards.filter(entry => {
            const refs = Utils.normalizeArray(entry?.adventure_refs);
            return refs.includes(normalizedAdventureId);
        });

        if (matchingEntries.length > 0) {
            const loadedCards = [];

            for (const entry of matchingEntries) {
                if (!entry?.detail_path) continue;

                try {
                    const detail = await this.getCatalogCard(entry.detail_path);
                    if (detail) {
                        loadedCards.push(detail);
                    }
                } catch (err) {
                    console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${entry.detail_path}`, err);
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

        const config = window.CONFIG || null;
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

        const cachedCatalogCard = Object.values(window.ApiCache.catalogCards)
            .find(card => card?.id === targetId);
        if (cachedCatalogCard) return cachedCatalogCard;

        const config = window.CONFIG || null;
        const setsToSearch = setKey
            ? [Utils.normalizeString(setKey)]
            : config?.getEnabledSets?.().map(setConfig => setConfig.id)
                || [config?.defaultSet || 'base_game'];

        for (const currentSetKey of setsToSearch) {
            const master = await window.ApiFetch.getMasterIndex(currentSetKey);
            const entry = Utils.normalizeArray(master?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (entry?.detail_path) {
                try {
                    return await this.getCatalogCard(entry.detail_path);
                } catch (err) {
                    console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
                }
            }
        }

        for (const payload of Object.values(window.ApiCache.cardPayloads)) {
            const found = Utils.normalizeArray(payload?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);
            if (found) return found;
        }

        return null;
    },

    async openCardDetailById(id) {
        const card = await this.findCardById(id);
        if (!card) return;

        if (window.RenderCardDetail?.openCardDetail) {
            window.RenderCardDetail.openCardDetail(card);
        }
    }
};
