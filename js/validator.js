/**
 * js/validator.js - Erweiterter System-Check
 */
window.SystemCheck = {
    requirements: [
        { name: 'CONFIG', id: 'config.js' },
        { name: 'API', id: 'api.js' },
        { name: 'Renderer', id: 'ui-renderer.js' },
        { name: 'UI', id: 'ui-helper.js' },
        { name: 'Combat', id: 'combat.js' },
        { name: 'Archive', id: 'archive.js' },
        { name: 'Narrative', id: 'narrative.js' },
        { name: 'App', id: 'app.js' }
    ],

    async run(manual = false) {
        let errors = [];
        this.requirements.forEach(req => {
            if (typeof window[req.name] === 'undefined' || window[req.name] === null) {
                errors.push(`❌ Modul nicht erkannt: ${req.id}`);
            }
        });

        if (errors.length > 0) {
            console.error("Integritätsprüfung fehlgeschlagen:", errors);
            if(manual) alert("Fehlende Komponenten:\n" + errors.join("\n"));
        } else {
            console.log("✅ System-Check: Alle Aventuria-Module sind einsatzbereit.");
            if(manual) alert("✅ Alles bereit! Viel Spaß in Aventurien.");
        }
    }
};

// Automatischer Check nach einer Sekunde
document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.SystemCheck.run(), 1000));
