/**
 * js/validator.js - Master-Check für Module und Datenintegrität
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
        console.log("🛡️ Aventuria System-Check läuft...");
        let errors = [];

        // 1. Modul-Check
        this.requirements.forEach(req => {
            if (typeof window[req.name] === 'undefined') {
                errors.push(`❌ Modul fehlt: ${req.id}`);
            }
        });

        // 2. Daten-Check (Stichprobe Abenteuer)
        const picker = document.getElementById('adventurePicker');
        if (picker && manual) {
            const options = Array.from(picker.querySelectorAll('option')).filter(o => o.value);
            console.log(`Prüfe ${options.length} Abenteuer-Dateien...`);
            for (let opt of options) {
                const res = await fetch(`data/adventures/${opt.value}.json`, { method: 'HEAD' });
                if (!res.ok) errors.push(`⚠️ Datei fehlt: data/adventures/${opt.value}.json`);
            }
        }

        if (errors.length > 0) {
            console.error("Fehler gefunden:", errors);
            alert("SYSTEM-FEHLER:\n\n" + errors.join("\n"));
        } else if (manual) {
            alert("✅ Alle Module und Abenteuer-Dateien sind bereit!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.SystemCheck.run(), 1000));
