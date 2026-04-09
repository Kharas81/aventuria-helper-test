/**
 * app.js - Hauptsteuerung für den Aventuria Setup-Guide
 */

let currentPhase = 0;

// --- ALLGEMEINE UI FUNKTIONEN ---

window.toggleSection = function(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('show');
    }
};

window.changeStat = function(id, delta) {
    const el = document.getElementById(id);
    if (el) {
        let val = parseInt(el.innerText) || 0;
        el.innerText = Math.max(0, val + delta);
    }
};

// --- KAMPF-LOGIK ---

window.nextPhase = function() {
    const steps = document.querySelectorAll('.step');
    if (steps.length === 0) return;

    steps.forEach(s => s.classList.remove('active'));
    currentPhase = (currentPhase % 5) + 1;

    const activeStep = document.getElementById(`phase${currentPhase}`);
    if (activeStep) {
        activeStep.classList.add('active');
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
    if (res) res.innerText = `${time + 2} EP`;
};

// --- SETUP & DATEN-LOGIK ---

async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker || !picker.value) return;

    try {
        const response = await fetch(`data/adventures/${picker.value}.json`);
        if (!response.ok) throw new Error("Abenteuer-Datei nicht gefunden");
        const data = await response.json();
        
        renderSetup(data);
        
        // Narrative Story laden
        if (typeof window.renderStory === 'function') {
            window.renderStory(data);
        }

        // --- NEU: Grafische Karten laden ---
        const adventureId = picker.value.split('/').pop(); 
        loadAdventureCards(adventureId);

        document.getElementById('setup-display').classList.remove('hidden');
        updateHeroDashboard(); 
    } catch (e) {
        console.error("Setup-Fehler:", e);
    }
}

/**
 * Lädt die spezifischen Karten eines Abenteuers (Glücks-Idol, Zeitskala etc.)
 */
async function loadAdventureCards(adventureId) {
    const section = document.getElementById('adventure-cards-section');
    const grid = document.getElementById('cards-grid');
    if (!grid || !section) return;

    try {
        const response = await fetch(`data/cards/base_game/${adventureId}.json`);
        if (!response.ok) {
            section.classList.add('hidden'); // Verstecken, wenn keine Datei existiert
            return;
        }
        
        const data = await response.json();
        grid.innerHTML = ""; // Container leeren
        section.classList.remove('hidden');

        data.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'game-card';

            let tableHtml = "";
            // Tabelle für Glücks-Idol
            if (card.action_table) {
                tableHtml = `<table class="card-table">` + 
                    card.action_table.map(row => `<tr><td><b>${row.roll}</b></td><td><b>${row.title || ""}</b><br>${row.description}</td></tr>`).join('') + 
                    `</table>`;
            }
            // Tabelle für Zeitskala
            if (card.milestones) {
                tableHtml = `<table class="card-table">` + 
                    Object.entries(card.milestones).map(([key, val]) => `<tr><td><b>${key}</b></td><td>${val}</td></tr>`).join('') + 
                    `</table>`;
            }

            cardEl.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
                <div class="game-card-info">
                    <span>${card.sub_name}</span>
                    <h4>${card.name}</h4>
                    <p style="font-size: 0.8em; line-height:1.3;">${card.passive_rules || ""}</p>
                    ${tableHtml}
                </div>
            `;
            grid.appendChild(cardEl);
        });
    } catch (e) {
        console.warn("Keine spezialisierten Kartendaten für:", adventureId);
        section.classList.add('hidden');
    }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    const createChecklist = (items) => (items || []).map(item => 
        `<li><label class="checklist-item"><input type="checkbox"> <span>${item}</span></label></li>`).join('');

    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    
    const totalGP = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `
        Gefahrenwert: <strong>${totalGP} GP</strong> 
        <button class="info-btn" onclick="jumpToPage(12)">i</button>
    `;
    
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);
    
    const specialContainer = document.getElementById('special');
    specialContainer.innerHTML = `
        <h3>Spezialkarten</h3>
        <ul>${createChecklist(data.setup.special_decks)}</ul>
        <hr>
        <p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p>
        <p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>
    `;
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

document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('adventurePicker');
    const heroInput = document.getElementById('heroCount');

    if (picker) picker.addEventListener('change', refreshSetup);
    if (heroInput) {
        heroInput.addEventListener('change', () => {
            updateHeroDashboard();
            if (picker && picker.value) refreshSetup();
        });
    }
    updateHeroDashboard();
});
