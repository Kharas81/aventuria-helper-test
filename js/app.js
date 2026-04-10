/**
 * js/app.js - Hauptsteuerung
 */
window.App = {
    async init() {
        const picker = document.getElementById('adventurePicker');
        const count = document.getElementById('heroCount');
        
        if (picker) picker.addEventListener('change', () => this.handleUpdate());
        if (count) count.addEventListener('change', () => this.handleUpdate());
        
        window.Combat.updateDashboard();
        console.log("App initialisiert.");
    },

    async handleUpdate() {
        const picker = document.getElementById('adventurePicker');
        const status = document.getElementById('loading-status');
        if (!picker || !picker.value) return;

        status.innerText = "⌛ Lade Daten...";
        const id = picker.value.split('/').pop();

        try {
            // Prüfung ob API existiert bevor Aufruf
            if (!window.API) throw new Error("API-Modul nicht geladen.");

            const [advData, cardData] = await Promise.all([
                window.API.getAdventure(picker.value),
                window.API.getCards(id)
            ]);

            if (!advData) {
                status.innerText = "❌ Fehler: Abenteuer-Datei nicht gefunden.";
                return;
            }

            window.Renderer.renderSetup(advData, cardData.cards);
            window.Narrative.renderStory(advData);
            
            document.getElementById('setup-display').classList.remove('hidden');
            window.Combat.updateDashboard();
            status.innerText = "✅ Geladen.";

        } catch (err) {
            console.error("Update fehlgeschlagen:", err);
            status.innerText = `💥 Kritischer Fehler: ${err.message}`;
            alert("Fehler beim Laden des Abenteuers. Details in der Konsole.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => window.App.init());
