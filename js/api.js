/**
 * js/api.js - Lädt Abenteuer- und Kartendaten
 */
window.API = {
    adventureAliases: {
        silvana: 'silvanas_befreiung',
        wildenstein_1: 'wildenstein_akt_1',
        wildenstein_2: 'wildenstein_akt_2',
        wildenstein_3: 'wildenstein_akt_3'
    },

    cardMap: {
        leute_nicht_spielen: 'leute_die_nicht_spielen'
    },

    normalizeAdventureId(id) {
        return this.adventureAliases[id] || id;
    },

    async getAdventure(path) {
        try {
            const res = await fetch(`data/adventures/${path}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            if (!data.id) {
                const fallbackId = path.split('/').pop();
                data.id = fallbackId;
            }

            data.id = this.normalizeAdventureId(data.id);
            return data;
        } catch (err) {
            console.error('Fehler beim Laden des Abenteuers:', err);
            return null;
        }
    },

    async getCards(id) {
        try {
            const normalizedId = this.normalizeAdventureId(id);
            const realId = this.cardMap[normalizedId] || normalizedId;

            const res = await fetch(`data/cards/base_game/${realId}/${realId}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            return await res.json();
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${id}" → Fallback leer`, err);
            return { cards: [] };
        }
    }
};
