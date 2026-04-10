/**
 * js/api.js - Zentrale Schnittstelle für Daten-Abrufe
 */
window.API = {
    async getAdventure(id) {
        const path = `data/adventures/${id}.json`;
        try {
            const r = await fetch(path);
            if (!r.ok) throw new Error(`Server lieferte Status ${r.status}`);
            return await r.json();
        } catch(e) {
            console.error(`API-Fehler bei Abenteuer-Pfad: ${path}`, e);
            return null;
        }
    },
    async getCards(id) {
        const path = `data/cards/base_game/${id}.json`;
        try {
            const r = await fetch(path);
            if (!r.ok) return { cards: [] };
            return await r.json();
        } catch(e) { 
            return { cards: [] }; 
        }
    }
};
console.log("✅ API-Modul registriert.");
