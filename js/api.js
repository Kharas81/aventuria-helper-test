/**
 * js/api.js - Lädt Abenteuer- und Kartendaten
 */
window.API = {
    async fetchJson(path, fallback = null) {
        try {
            const res = await fetch(path);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.warn(`Fehler beim Laden von ${path}`, error);
            return fallback;
        }
    },

    normalizeCard(rawCard, adventureId = '') {
        const card = rawCard || {};

        return {
            id: card.id || '',
            name: card.name || 'Unbenannte Karte',
            type: card.type || 'unknown',
            status: card.status || 'raw',
            image: card.image || '',
            adventure_id: card.adventure_id || adventureId || '',
            set: card.set || 'base_game',
            tags: Array.isArray(card.tags) ? card.tags : [],
            stats: card.stats || {},
            rules: card.rules || {},
            note: card.note || '',
            sub_name: card.sub_name || ''
        };
    },

    async getAdventure(path) {
        const data = await this.fetchJson(`data/adventures/${path}.json`, null);
        if (!data) return null;

        if (!data.id) {
            data.id = path.split('/').pop();
        }

        data.setup = data.setup || {};
        data.setup.blue_cards = Array.isArray(data.setup.blue_cards) ? data.setup.blue_cards : [];
        data.setup.minion_cards = Array.isArray(data.setup.minion_cards) ? data.setup.minion_cards : [];
        data.setup.special_cards = Array.isArray(data.setup.special_cards) ? data.setup.special_cards : [];

        return data;
    },

    async getCards(adventureId) {
        const data = await this.fetchJson(
            `data/cards/base_game/${adventureId}/${adventureId}.json`,
            { cards: [] }
        );

        const cards = Array.isArray(data.cards)
            ? data.cards.map(card => this.normalizeCard(card, adventureId))
            : [];

        return {
            ...data,
            cards
        };
    },

    async getMasterSet(setKey = 'base_game') {
        const data = await this.fetchJson(
            `data/cards/base_game/master_${setKey}.json`,
            { cards: [] }
        );

        const cards = Array.isArray(data.cards)
            ? data.cards.map(card => this.normalizeCard(card))
            : [];

        return {
            ...data,
            cards
        };
    }
};
