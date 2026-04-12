/**
 * js/api.js - Lädt Abenteuer- und Kartendaten
 */
window.API = {

    /**
     * Mapping für Karten-Dateien:
     * Falls Abenteuer-ID ≠ Karten-Ordnername
     */
    cardMap: {
        leute_nicht_spielen: "leute_die_nicht_spielen"
        // Hier kannst du später weitere Abweichungen ergänzen
    },

    /**
     * Lädt ein Abenteuer
     */
    async getAdventure(path) {
        try {
            const res = await fetch(`data/adventures/${path}.json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            return await res.json();
        } catch (err) {
            console.error("Fehler beim Laden des Abenteuers:", err);
            return null;
        }
    },

    /**
     * Lädt Karten für ein Abenteuer
     */
    async getCards(id) {
        try {
            // Mapping anwenden
            const realId = this.cardMap[id] || id;

            const res = await fetch(`data/cards/base_game/${realId}/${realId}.json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            return await res.json();
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${id}" → Fallback leer`, err);

            // Fallback → verhindert UI-Crashes
            return { cards: [] };
        }
    }
};
