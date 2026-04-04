let rulesData = [];

// Lädt die Anleitung einmalig beim Start
async function initRulebook() {
    const resp = await fetch('data/manual.json');
    const data = await resp.json();
    // Wir kombinieren Regeln und Phasen für die Suche
    rulesData = [
        ...data.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
        ...Object.entries(data.rules).map(([key, val]) => ({ title: key, text: val }))
    ];
}

window.openRulebook = function() {
    document.getElementById('rule-modal').style.display = 'flex';
    renderRules(''); // Zeige am Anfang alles
};

window.closeRulebook = function() {
    document.getElementById('rule-modal').style.display = 'none';
};

window.filterRules = function(searchTerm) {
    renderRules(searchTerm.toLowerCase());
};

function renderRules(filter) {
    const container = document.getElementById('rules-results');
    const filtered = rulesData.filter(r => 
        r.title.toLowerCase().includes(filter) || 
        r.text.toLowerCase().includes(filter)
    );

    container.innerHTML = filtered.map(r => `
        <div class="rule-entry">
            <h4>${r.title}</h4>
            <p>${r.text}</p>
        </div>
    `).join('') || "<p>Keine passende Regel in den Schriftrollen gefunden...</p>";
}

// Initialisierung
document.addEventListener('DOMContentLoaded', initRulebook);