// Wir definieren die Variablen außerhalb, damit sie überall bekannt sind
let currentPhase = 0;

// Diese Funktionen hängen wir direkt an das "window" Objekt, 
// damit die "onclick"-Attribute im HTML sie garantiert finden.

window.toggleSection = function(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('show');
        console.log("Sektion getoggelt:", id);
    } else {
        console.error("Sektion nicht gefunden:", id);
    }
};

window.nextPhase = function() {
    // Alle Phasen-Schritte suchen
    const steps = document.querySelectorAll('.step');
    if (steps.length === 0) return;

    // Aktive Markierung bei allen entfernen
    steps.forEach(s => s.classList.remove('active'));

    // Zähler erhöhen (1 bis 5) [cite: 524-528]
    currentPhase = (currentPhase % 5) + 1;

    // Neue Phase markieren
    const activeStep = document.getElementById(`phase${currentPhase}`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
};

window.changeStat = function(id, delta) {
    const el = document.getElementById(id);
    if (el) {
        let val = parseInt(el.innerText) || 0;
        el.innerText = Math.max(0, val + delta);
    }
};

window.randomTarget = function() {
    const count = parseInt(document.getElementById('heroCount').value) || 2;
    const target = Math.floor(Math.random() * count) + 1;
    const res = document.getElementById('targetResult');
    if (res) res.innerText = `🎯 Ziel: Held ${target}`;
};

window.calcRecovery = function() {
    const time = parseInt(document.getElementById('timeLeft').value) || 0;
    const res = document.getElementById('recoveryResult');
    if (res) res.innerText = `${time + 2} EP`; // [cite: 645-646]
};

// --- SETUP LOGIK ---

async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker || !picker.value) return;

    try {
        const response = await fetch(`data/adventures/${picker.value}.json`);
        if (!response.ok) throw new Error("Datei nicht gefunden");
        const data = await response.json();
        
        renderSetup(data);
        document.getElementById('setup-display').classList.remove('hidden');
        updateHeroDashboard(); // Helden-Karten neu zeichnen
    } catch (e) {
        console.error(e);
    }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    const createChecklist = (items) => (items || []).map(item => 
        `<li><label class="checklist-item"><input type="checkbox"> <span>${item}</span></label></li>`).join('');

    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    document.getElementById('danger-value').innerHTML = `Gefahrenwert: <strong>${heroCount * data.danger_calc} GP</strong>`;
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);
    
    const specialContainer = document.getElementById('special');
    specialContainer.innerHTML = `<h3>Spezialkarten</h3><ul>` + createChecklist(data.setup.special_decks) + 
        `</ul><hr><p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p><p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>`;
}

function updateHeroDashboard() {
    const count = parseInt(document.getElementById('heroCount').value) || 2;
    const container = document.getElementById('heroDashboard');
    if (!container) return;

    container.innerHTML = "";
    for(let i=1; i<=count; i++) {
        container.innerHTML += `
            <div class="hero-card">
                <h4>Held ${i}</h4>
                <div class="stat">LP: <span id="lp${i}">40</span> 
                    <button onclick="changeStat('lp${i}', -1)">-</button>
                    <button onclick="changeStat('lp${i}', 1)">+</button>
                </div>
            </div>`;
    }
}

// Initialisierung beim Laden
document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('adventurePicker');
    if (picker) picker.addEventListener('change', refreshSetup);
    updateHeroDashboard();
});