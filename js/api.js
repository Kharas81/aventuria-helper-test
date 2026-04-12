/**
 * js/api.js - Lädt Abenteuer- und Kartendaten
 */
window.API = {
    async getAdventure(path) {
        try {
            const res = await fetch(`data/adventures/${path}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            if (!data.id) {
                data.id = path.split('/').pop();
            }

            return data;
        } catch (err) {
            console.error('Fehler beim Laden des Abenteuers:', err);
            return null;
        }
    },

    async getCards(id) {
        try {
            const res = await fetch(`data/cards/base_game/${id}/${id}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            return await res.json();
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${id}"`, err);
            return { cards: [] };
        }
    }
};
