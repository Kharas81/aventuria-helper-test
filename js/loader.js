/**
 * js/loader.js
 * Lädt Abenteuer-Daten basierend auf dem Pfad
 */
async function fetchAdventureData(path) {
    try {
        const response = await fetch(`data/adventures/${path}.json`);
        if (!response.ok) {
            throw new Error(`Abenteuer unter ${path} nicht gefunden.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ladefehler:", error);
        alert("Fehler beim Laden des Abenteuers. Prüfe die Konsole.");
        return null;
    }
}