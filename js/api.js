window.API = {
    normalizeString(value) {
        return String(value ?? '').trim();
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    slugify(value) {
        return this.normalizeString(value)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
    },

    async fetchJson(path) {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`${path} → HTTP ${res.status}`);
        }
        return await res.json();
    },

    normalizeAdventure(rawData, fallbackPath) {
        return {
            id: this.normalizeString(rawData?.id || fallbackPath.split('/').pop()),
            name: this.normalizeString(rawData?.name),
            danger_calc: Number(rawData?.danger_calc ?? 0),
            narrative: {
                intro: this.normalizeString(rawData?.narrative?.intro),
                checks: this.normalizeArray(rawData?.narrative?.checks)
            },
            setup: {
                blue_cards: this.normalizeArray(rawData?.setup?.blue_cards),
                minion_cards: this.normalizeArray(rawData?.setup?.minion_cards),
                special_cards: this.normalizeArray(rawData?.setup?.special_cards),
                victory: this.normalizeString(rawData?.setup?.victory),
                defeat: this.normalizeString(rawData?.setup?.defeat)
            }
        };
    },

    normalizeLegacyCard(card) {
        return {
            id: this.normalizeString(card?.id),
            name: this.normalizeString(card?.name),
            type: this.normalizeString(card?.type || 'unknown'),
            card_category: this.normalizeString(card?.card_category || card?.type || 'unknown'),
            status: this.normalizeString(card?.status || 'raw'),
            adventure_id: this.normalizeString(card?.adventure_id),
            adventure_refs: this.normalizeArray(card?.adventure_refs),
            set: card?.set || { id: 'base_game', name: 'Aventuria Grundbox' },
            sub_name: card?.sub_name ?? null,
            difficulty: card?.difficulty ?? null,
            image: this.normalizeString(card?.image),
            images: card?.images || {
                front: this.normalizeString(card?.image),
                back: null,
                alt: []
            },
            tags: this.normalizeArray(card?.tags),
            custom_tags: this.normalizeArray(card?.custom_tags),
            keywords: this.normalizeArray(card?.keywords),
            search_text: this.normalizeString(card?.search_text),
            stats: card?.stats || {
                gp: null,
                lp: null,
                armor: null,
                evasion: null,
                actions: null,
                start_value: null,
                cost: null
            },
            rules: card?.rules || {
                passive: '',
                success: '',
                fail: '',
                timed_effects: [],
                milestones: [],
                action_table: [],
                draw_effect: '',
                flavor: ''
            },
            source: card?.source || {
                book: '',
                page: null,
                note: ''
            },
            note: this.normalizeString(card?.note || card?.notes)
        };
    },

    normalizeCatalogCard(card) {
        return {
            id: this.normalizeString(card?.id),
            name: this.normalizeString(card?.name),
            type: this.normalizeString(card?.type || 'unknown'),
            card_category: this.normalizeString(card?.card_category || card?.type || 'unknown'),
            status: this.normalizeString(card?.status || 'raw'),
            adventure_id: '',
            adventure_refs: this.normalizeArray(card?.adventure_refs).map(ref => {
                if (typeof ref === 'string') return ref;
                if (ref && typeof ref === 'object') return this.normalizeString(ref.id || ref.name);
                return '';
            }).filter(Boolean),
            set: card?.set || { id: 'base_game', name: 'Aventuria Grundbox' },
            sub_name: null,
            difficulty: null,
            image: this.normalizeString(card?.images?.front),
            images: {
                front: this.normalizeString(card?.images?.front),
                back: card?.images?.back ?? null,
                alt: this.normalizeArray(card?.images?.alt)
            },
            tags: this.normalizeArray(card?.tags),
            custom_tags: this.normalizeArray(card?.custom_tags),
            keywords: this.normalizeArray(card?.keywords),
            search_text: this.normalizeString(card?.search_text),
            stats: card?.stats || {
                gp: null,
                lp: null,
                armor: null,
                evasion: null,
                actions: null,
                start_value: null,
                cost: null
            },
            rules: card?.rules || {
                passive: '',
                success: '',
                fail: '',
                timed_effects: [],
                milestones: [],
                action_table: [],
                draw_effect: '',
                flavor: ''
            },
            source: card?.source || {
                book: '',
                page: null,
                note: ''
            },
            note: this.normalizeString(card?.note || card?.notes)
        };
    },

    normalizeCardPayload(rawPayload, fallbackAdventureId) {
        const cards = this.normalizeArray(rawPayload?.cards).map(card => this.normalizeLegacyCard(card));

        return {
            adventure_id: this.normalizeString(rawPayload?.adventure_id || fallbackAdventureId),
            adventure_name: this.normalizeString(rawPayload?.adventure_name),
            cards
        };
    },

    async getAdventure(path) {
        try {
            const rawData = await this.fetchJson(`data/adventures/${path}.json`);
            return this.normalizeAdventure(rawData, path);
        } catch (err) {
            console.error('Fehler beim Laden des Abenteuers:', err);
            return null;
        }
    },

    async getMasterIndex(setKey = 'base_game') {
        try {
            const rawData = await this.fetchJson(`data/cards/base_game/master_${setKey}.json`);
            return {
                set: rawData?.set || { id: setKey, name: setKey },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: this.normalizeArray(rawData?.cards)
            };
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);
            return {
                set: { id: setKey, name: setKey },
                catalog_version: 1,
                cards: []
            };
        }
    },

    async getCatalogCard(detailPath) {
        const rawData = await this.fetchJson(detailPath);
        return this.normalizeCatalogCard(rawData);
    },

    async getCards(adventureId) {
        const master = await this.getMasterIndex('base_game');

        const migratedMasterCards = master.cards.filter(card =>
            Array.isArray(card.adventure_refs) &&
            card.adventure_refs.includes(adventureId) &&
            typeof card.detail_path === 'string' &&
            card.detail_path.trim().length > 0
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = [];

            for (const entry of migratedMasterCards) {
                try {
                    const detail = await this.getCatalogCard(entry.detail_path);
                    loadedCards.push(detail);
                } catch (err) {
                    console.warn(`⚠️ Katalogkarte konnte nicht geladen werden: ${entry.id}`, err);
                }
            }

            return {
                adventure_id: adventureId,
                adventure_name: '',
                cards: loadedCards
            };
        }

        try {
            const rawData = await this.fetchJson(`data/cards/base_game/${adventureId}/${adventureId}.json`);
            return this.normalizeCardPayload(rawData, adventureId);
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${adventureId}"`, err);
            return this.normalizeCardPayload({ cards: [] }, adventureId);
        }
    }
};
