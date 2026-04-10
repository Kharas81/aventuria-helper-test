/**
 * js/api.js - Datenbeschaffung
 */
window.API = {
    async getAdventure(id) {
        const path = `data/adventures/${id}.json`;
        try {
            const r = await fetch(path);
            if (!r.ok) throw new Error(`Status ${r.status}`);
            return await r.json();
        } catch(e) {
            console.error(`Fehler beim Laden von ${path}:`, e);
            return null;
        }
    },
    async getCards(id) {
        const path = `data/cards/base_game/${id}.json`;
        try {
            const r = await fetch(path);
            if (!r.ok) return { cards: [] };
            return await r.json();
        } catch(e) { return { cards: [] }; }
    }
};
