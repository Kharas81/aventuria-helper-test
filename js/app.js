/**
 * js/app.js - Hauptsteuerung der App
 */
window.App = {
    async init() {
        const picker = document.getElementById('adventurePicker');
        const count = document.getElementById('heroCount');
        
        if (picker) picker.addEventListener('change', () => this.handleUpdate());
        if (count) count.addEventListener('change', () => this.handleUpdate());
        
        if (window.Combat) window.Combat.updateDashboard();
        console.log("App initialisiert.");
    },

    async handleUpdate() {
        const picker = document.getElementById('adventurePicker');
        const status = document.getElementById('loading-status');
        if (!picker || !picker.value) return;

        status.innerText = "⌛ Lade Daten...";
        const id = picker.value.split('/').pop();

        try {
            // Prüfung ob API existiert
            if (!window.API) {
                throw new Error("API-Modul ist noch nicht bereit. Bitte Seite neu laden.");
            }

            const [advData, cardData] = await Promise.all([
                window.API.getAdventure(picker.value),
                window.API.getCards(id)
            ]);

            if (!advData) {
                status.innerText = "❌ Fehler: Abenteuer-Datei fehlt.";
                return;
            }

            if (window.Renderer) window.Renderer.renderSetup(advData, cardData.cards);
            if (window.Narrative) window.Narrative.renderStory(advData);
            
            document.getElementById('setup-display').classList.remove('hidden');
            if (window.Combat) window.Combat.updateDashboard();
            status.innerText = "✅ Abenteuer geladen.";

        } catch (err) {
            console.error("Ladevorgang abgebrochen:", err);
            status.innerText = `💥 Fehler: ${err.message}`;
            alert("Das Abenteuer konnte nicht geladen werden.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => window.App.init());
