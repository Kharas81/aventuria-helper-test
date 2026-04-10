/**
 * js/validator.js - Findet fehlende Module
 */
const SystemCheck = {
    requirements: {
        modules: [
            { name: 'CONFIG', obj: 'CONFIG' },
            { name: 'API', obj: 'API' },
            { name: 'Renderer', obj: 'Renderer' },
            { name: 'UI', obj: 'UI' },
            { name: 'Combat', obj: 'Combat' },
            { name: 'Archive', obj: 'Archive' },
            { name: 'Narrative', obj: 'Narrative' }
        ]
    },

    run(manual = false) {
        console.log("🛡️ Aventuria System-Check...");
        let errors = [];

        this.requirements.modules.forEach(mod => {
            if (typeof window[mod.obj] === 'undefined') {
                errors.push(`❌ JS-Modul fehlt: ${mod.name}.js`);
            }
        });

        if (errors.length > 0) {
            alert("ACHTUNG: System-Fehler gefunden!\n\n" + errors.join("\n") + "\n\nPrüfe, ob alle Dateien im /js Ordner liegen.");
        } else if (manual) {
            alert("✅ System-Check erfolgreich: Alle Module geladen.");
        }
    }
};

// Automatischer Check kurz nach dem Start
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => SystemCheck.run(), 1000); 
});
