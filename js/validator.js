/**
 * js/validator.js - Prüft die Modul-Existenz robust
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

    run(manual = false) {
        let errors = [];
        this.requirements.forEach(req => {
            if (typeof window[req.name] === 'undefined') {
                errors.push(`❌ Modul fehlt: ${req.id}`);
            }
        });

        if (errors.length > 0) {
            console.error("System-Check fehlgeschlagen:", errors);
            if(manual) alert("Fehler gefunden:\n" + errors.join("\n"));
        } else {
            console.log("✅ Alle Aventuria-Module geladen.");
            if(manual) alert("✅ Alles bereit!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.SystemCheck.run(), 1500));
