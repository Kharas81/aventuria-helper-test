// Variable für den Rundenablauf
let currentPhase = 0;

// Warten, bis die Seite komplett geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log("Aventuria App gestartet...");
    
    const picker = document.getElementById('adventurePicker');
    const heroInp = document.getElementById('heroCount');

    if (picker) picker.addEventListener('change', refreshSetup);
    if (heroInp) heroInp.addEventListener('change', () => {
        updateHeroDashboard();
        refreshSetup(); // GP neu berechnen bei Heldenänderung
    });

    // Initiales Dashboard
    updateHeroDashboard();
});

async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    const path = picker.value;
    const display = document.getElementById('setup-display');
    
    if (!path) {
        if(display) display.classList.add('hidden');
        return;
    }

    console.log("Lade Abenteuer:", path);

    try {
        // Pfad prüfen: data/adventures/ + base_game/name + .json
        const response = await fetch(`data/adventures/${path}.json`);
        
        if (!response.ok) {
            throw new Error(`Datei nicht gefunden: data/adventures/${path}.json (Status: ${response.status})`);
        }
        
        const data = await response.json();
        renderSetup(data);
        if(display) display.classList.remove('hidden');
    } catch (error) {
        console.error("Setup Fehler:", error);
        alert("Fehler beim Laden: " + error.message);
    }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    // Funktion für Checkboxen
    const createChecklist = (items) => {
        if (!items || items.length === 0) return "<li>Keine Einträge</li>";
        return items.map(item => `
            <li>
                <label class="checklist-item">
                    <input type="checkbox"> <span>${item}</span>
                </label>
            </li>
        `).join('');
    };

    // Listen befüllen
    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    
    // GP Berechnung [cite: 465-468, 771, 887]
    const dangerValue = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `Ziel-Gefahrenwert: <strong>${dangerValue} GP</strong>`;
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);

    // Spezialkarten
    const specialContainer = document.getElementById('special');
    if (specialContainer) {
        let html = `<h3>Spezialkarten (Grün)</h3><ul>`;
        html += (data.setup.special_decks || []).map(d => `
            <li><label class="checklist-item"><input type="checkbox"> <span>${d}</span></label></li>
        `).join('');
        html += `</ul><hr>`;
        html += `<p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p>`;
        html += `<p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>`;
        specialContainer.innerHTML = html;
    }
}

// --- TEST FEATURES ---

// 1. Phasen-Steuerung 
function nextPhase() {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    currentPhase = (currentPhase % 5) + 1;
    const activeStep = document.getElementById(`phase${currentPhase}`);
    if(activeStep) activeStep.classList.add('active');
}

// 2. Helden-Dashboard (LP & Schicksal) [cite: 664]
function updateHeroDashboard() {
    const count = parseInt(document.getElementById('heroCount').value) || 2;
    const container = document.getElementById('heroDashboard');
    if(!container) return;
    
    container.innerHTML = "";
    for(let i=1; i<=count; i++) {
        container.innerHTML += `
            <div class="hero-card">
                <h4>Held ${i}</h4>
                <div class="stat">LP: <span id="lp${i}">40</span> 
                    <button onclick="changeStat('lp${i}', -1)">-</button>
                    <button onclick="changeStat('lp${i}', 1)">+</button>
                </div>
                <div class="stat">SchiP: <span id="sp${i}">2</span> 
                    <button onclick="changeStat('sp${i}', -1)">-</button>
                    <button onclick="changeStat('sp${i}', 1)">+</button>
                </div>
            </div>`;
    }
}

function changeStat(id, delta) {
    const el = document.getElementById(id);
    if(el) el.innerText = Math.max(0, parseInt(el.innerText) + delta);
}

// 3. Zufall Target [cite: 591-592]
function randomTarget() {
    const count = parseInt(document.getElementById('heroCount').value) || 2;
    const target = Math.floor(Math.random() * count) + 1;
    document.getElementById('targetResult').innerText = `🎯 Ziel: Held ${target}`;
}

// 4. Atempause [cite: 645-646]
function calcRecovery() {
    const time = parseInt(document.getElementById('timeLeft').value) || 0;
    const ep = time + 2;
    document.getElementById('recoveryResult').innerText = `Erholungspunkte: ${ep}`;
}