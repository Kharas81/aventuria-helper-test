/**
 * js/validator.js - Überprüft die Integrität der App beim Start
 */
const SystemCheck = {
    requirements: {
        elements: ['story-area', 'setup-display', 'heroCount', 'adventurePicker', 'heroDashboard', 'rule-modal', 'archive-modal'],
        modules: ['UI', 'Combat', 'Renderer', 'Narrative', 'Archive', 'API', 'CONFIG']
    },

    run() {
        console.log("🛡️ Aventuria System-Check gestartet...");
        let errors = [];

        // 1. HTML-Struktur prüfen
        this.requirements.elements.forEach(id => {
            if (!document.getElementById(id)) errors.push(`❌ HTML-Element fehlt: #${id}`);
        });

        // 2. JavaScript-Module prüfen
        this.requirements.modules.forEach(mod => {
            if (typeof window[mod] === 'undefined') {
                errors.push(`❌ JS-Modul fehlt: ${mod}.js`);
            }
        });

        // 3. Feedback geben
        if (errors.length > 0) {
            console.error("System-Check fehlgeschlagen:", errors);
            alert("ACHTUNG: System-Fehler gefunden!\n\n" + errors.join("\n"));
        } else {
            console.log("✅ System-Check: Alles bereit.");
            if (arguments.length > 0) alert("✅ System-Check erfolgreich: Alle Komponenten vorhanden.");
        }
    }
};

// Automatischer Check beim Laden
document.addEventListener('DOMContentLoaded', () => setTimeout(() => SystemCheck.run(), 500));
