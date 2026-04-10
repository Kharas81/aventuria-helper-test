/**
 * js/validator.js - Prüft Module und Abenteuerpfade
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
            if (typeof window[req.name] === 'undefined') errors.push(`❌ Modul fehlt: ${req.id}`);
        });

        const picker = document.getElementById('adventurePicker');
        if (picker && manual) {
            const options = Array.from(picker.querySelectorAll('option')).filter(o => o.value);
            for (let opt of options) {
                const res = await fetch(`data/adventures/${opt.value}.json`, { method: 'HEAD' });
                if (!res.ok) errors.push(`⚠️ Datei nicht gefunden: data/adventures/${opt.value}.json`);
            }
        }

        if (errors.length > 0) {
            console.error("System-Check Fehler:", errors);
            if(manual) alert("Fehler gefunden:\n" + errors.join("\n"));
        } else if (manual) {
            alert("✅ Alle Module und Abenteuer-Dateien sind erreichbar!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.SystemCheck.run(), 1000));
