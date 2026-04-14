window.API = {
    cache: {
        adventures: {},
        masterIndexes: {},
        catalogCards: {},
        cardPayloads: {}
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    getConfig() {
        return window.CONFIG || null;
    },

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

    normalizeAdventure(rawData, fallbackId = '') {
        const setup = rawData?.setup ?? {};
        const narrative = rawData?.narrative ?? {};

        return {
            id: this.normalizeString(rawData?.id || fallbackId),
            name: this.normalizeString(rawData?.name || fallbackId),
            status: this.normalizeString(rawData?.status || ''),
            set: rawData?.set ?? { id: 'base_game', name: 'Aventuria Grundbox' },
            danger_calc: Number(rawData?.danger_calc ?? 0),
            narrative: {
                intro: this.normalizeString(narrative?.intro),
                checks: this.normalizeArray(narrative?.checks)
            },
            setup: {
                card_refs: setup?.card_refs ?? {},
                blue_cards: this.normalizeArray(setup?.blue_cards),
                minion_cards: this.normalizeArray(setup?.minion_cards),
                special_cards: this.normalizeArray(setup?.special_cards),
                victory: this.normalizeString(setup?.victory),
                defeat: this.normalizeString(setup?.defeat)
            },
            source: rawData?.source ?? {},
            notes: this.normalizeString(rawData?.notes ?? rawData?.note ?? '')
        };
    },

    normalizeCatalogCard(rawData) {
        if (!rawData || typeof rawData !== 'object') return null;

        return {
            id: this.normalizeString(rawData.id),
            name: this.normalizeString(rawData.name),
            set: rawData.set ?? { id: 'base_game', name: 'Aventuria Grundbox' },
            card_category: this.normalizeString(rawData.card_category),
            type: this.normalizeString(rawData.type),
            subtypes: this.normalizeArray(rawData.subtypes),
            status: this.normalizeString(rawData.status),
            adventure_refs: this.normalizeArray(rawData.adventure_refs).map(ref => {
                if (typeof ref === 'string') return this.normalizeString(ref);
                return ref?.id ? this.normalizeString(ref.id) : ref;
            }),
            images: rawData.images ?? { front: '', back: null, alt: [] },
            image: this.normalizeString(rawData?.images?.front || rawData?.image || ''),
            tags: this.normalizeArray(rawData.tags),
            custom_tags: this.normalizeArray(rawData.custom_tags),
            keywords: this.normalizeArray(rawData.keywords),
            search_text: this.normalizeString(rawData.search_text),
            stats: rawData.stats ?? {},
            rules: rawData.rules ?? {},
            source: rawData.source ?? {},
            note: this.normalizeString(rawData.note ?? rawData.notes ?? ''),
            notes: this.normalizeString(rawData.notes ?? rawData.note ?? '')
        };
    },

    normalizeCardPayload(rawData, adventureId = '') {
        return {
            adventure_id: this.normalizeString(rawData?.adventure_id || adventureId),
            adventure_name: this.normalizeString(rawData?.adventure_name || ''),
            cards: this.normalizeArray(rawData?.cards)
                .map(card => this.normalizeCatalogCard(card))
                .filter(Boolean)
        };
    },

    getAdventureSetKey(adventureId, fallbackSetKey = 'base_game') {
        const adventure = this.cache.adventures[this.normalizeString(adventureId)];
        const setId = this.normalizeString(adventure?.set?.id);
        return setId || fallbackSetKey || this.getConfig()?.defaultSet || 'base_game';
    },

    async getAdventure(id, setKey = null) {
        const adventureId = this.normalizeString(id);
        if (!adventureId) return null;

        if (this.cache.adventures[adventureId]) {
            return this.cache.adventures[adventureId];
        }

        const config = this.getConfig();
        const resolvedSetKey = this.normalizeString(setKey || config?.defaultSet || 'base_game');
        const path = config?.getAdventurePath
            ? config.getAdventurePath(adventureId, resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/${adventureId}.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            console.error('Abenteuer-Datei fehlt:', path);
            return null;
        }

        const normalized = this.normalizeAdventure(rawData, adventureId);
        this.cache.adventures[adventureId] = normalized;
        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const config = this.getConfig();
        const resolvedSetKey = this.normalizeString(setKey || config?.defaultSet || 'base_game');

        if (this.cache.masterIndexes[resolvedSetKey]) {
            return this.cache.masterIndexes[resolvedSetKey];
        }

        const path = config?.getMasterIndexPath
            ? config.getMasterIndexPath(resolvedSetKey)
            : `data/cards/${resolvedSetKey}/master_${resolvedSetKey}.json`;

        try {
            const rawData = await this.fetchJson(path);
            const normalized = {
                set: rawData?.set || { id: resolvedSetKey, name: resolvedSetKey },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: this.normalizeArray(rawData?.cards)
            };

            this.cache.masterIndexes[resolvedSetKey] = normalized;
            return normalized;
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);

            const fallback = {
                set: { id: resolvedSetKey, name: resolvedSetKey },
                catalog_version: 1,
                cards: []
            };

            this.cache.masterIndexes[resolvedSetKey] = fallback;
            return fallback;
        }
    },

    async getCatalogCard(detailPath) {
        const normalizedPath = this.normalizeString(detailPath);
        if (!normalizedPath) return null;

        if (this.cache.catalogCards[normalizedPath]) {
            return this.cache.catalogCards[normalizedPath];
        }

        const rawData = await this.fetchJson(normalizedPath);
        const normalized = this.normalizeCatalogCard(rawData);

        this.cache.catalogCards[normalizedPath] = normalized;
        return normalized;
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = this.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return this.normalizeCardPayload({ cards: [] }, '');
        }

        if (this.cache.cardPayloads[normalizedAdventureId]) {
            return this.cache.cardPayloads[normalizedAdventureId];
        }

        const config = this.getConfig();
        const resolvedSetKey = this.getAdventureSetKey(normalizedAdventureId, setKey || config?.defaultSet || 'base_game');
        const master = await this.getMasterIndex(resolvedSetKey);

        const migratedMasterCards = this.normalizeArray(master.cards).filter(card =>
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

            this.cache.cardPayloads[normalizedAdventureId] = payload;
            return payload;
        }

        const legacyPath = config?.getLegacyAdventureCardsPath
            ? config.getLegacyAdventureCardsPath(normalizedAdventureId, resolvedSetKey)
            : `data/cards/${resolvedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;

        try {
            const rawData = await this.fetchJson(legacyPath);
            const payload = this.normalizeCardPayload(rawData, normalizedAdventureId);

            this.cache.cardPayloads[normalizedAdventureId] = payload;
            return payload;
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, err);

            const fallback = this.normalizeCardPayload({ cards: [] }, normalizedAdventureId);
            this.cache.cardPayloads[normalizedAdventureId] = fallback;
            return fallback;
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    async findCardById(id, setKey = null) {
        const targetId = this.normalizeString(id);
        if (!targetId) return null;

        const cachedCatalogCard = Object.values(this.cache.catalogCards).find(card => card?.id === targetId);
        if (cachedCatalogCard) return cachedCatalogCard;

        const config = this.getConfig();
        const resolvedSetKey = this.normalizeString(setKey || config?.defaultSet || 'base_game');
        const master = await this.getMasterIndex(resolvedSetKey);
        const entry = this.normalizeArray(master.cards).find(card => this.normalizeString(card?.id) === targetId);

        if (entry?.detail_path) {
            try {
                return await this.getCatalogCard(entry.detail_path);
            } catch (err) {
                console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
            }
        }

        for (const payload of Object.values(this.cache.cardPayloads)) {
            const found = this.normalizeArray(payload?.cards).find(card => this.normalizeString(card?.id) === targetId);
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
