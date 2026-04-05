/**
 * app.js - Hauptsteuerung für den Aventuria Setup-Guide
 */

let currentPhase = 0;

// --- ALLGEMEINE UI FUNKTIONEN ---

/**
 * Schaltet Sektionen ein/aus (z.B. Kampf-Hilfen)
 */
window.toggleSection = function(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('show');
    }
};

/**
 * Ändert Werte im Helden-Dashboard (LP)
 */
window.changeStat = function(id, delta) {
    const el = document.getElementById(id);
    if (el) {
        let val = parseInt(el.innerText) || 0;
        el.innerText = Math.max(0, val + delta);
    }
};

// --- KAMPF-LOGIK (Basierend auf der Anleitung) ---

/**
 * Wechselt durch die 5 Phasen einer Kampfrunde [cite: 524-528, 1071-1077]
 */
window.nextPhase = function() {
    const steps = document.querySelectorAll('.step');
    if (steps.length === 0) return;

    steps.forEach(s => s.classList.remove('active'));

    // Zähler 1-5 [cite: 1072-1076]
    currentPhase = (currentPhase % 5) + 1;

    const activeStep = document.getElementById(`phase${currentPhase}`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
};

/**
 * Ermittelt ein zufälliges Ziel unter den Helden [cite: 591-593]
 */
window.randomTarget = function() {
    const count = parseInt(document.getElementById('heroCount').value) || 2;
    const target = Math.floor(Math.random() * count) + 1;
    const res = document.getElementById('targetResult');
    if (res) res.innerText = `🎯 Ziel: Held ${target}`;
};

/**
 * Berechnet Erholungspunkte (EP) in der Atempause [cite: 645-646]
 */
window.calcRecovery = function() {
    const time = parseInt(document.getElementById('timeLeft').value) || 0;
    const res = document.getElementById('recoveryResult');
    if (res) res.innerText = `${time + 2} EP`;
};

// --- SETUP & DATEN-LOGIK ---

/**
 * Lädt Abenteuer-Daten und triggert das UI-Update
 */
async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker || !picker.value) return;

    try {
        const response = await fetch(`data/adventures/${picker.value}.json`);
        if (!response.ok) throw new Error("Datei nicht gefunden");
        const data = await response.json();
        
        renderSetup(data);
        
        // Narrative Story (Vorlesetexte) laden
        if (typeof window.renderStory === 'function') {
            window.renderStory(data);
        }

        document.getElementById('setup-display').classList.remove('hidden');
        updateHeroDashboard(); 
    } catch (e) {
        console.error("Setup-Fehler:", e);
    }
}

/**
 * Rendert die Kartenlisten und berechnet den GP-Wert [cite: 466, 479]
 */
function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    const createChecklist = (items) => (items || []).map(item => 
        `<li><label class="checklist-item"><input type="checkbox"> <span>${item}</span></label></li>`).join('');

    // Abenteuerkarten (Blau) [cite: 188-191]
    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    
    // GP Berechnung & Info-Button zur Anleitung (Seite 12) [cite: 465-468, 479]
    const totalGP = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `
        Gefahrenwert: <strong>${totalGP} GP</strong> 
        <button class="info-btn" onclick="jumpToPage(12)">i</button>
    `;
    
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);
    
    // Spezialkarten (Grün) [cite: 225-227]
    const specialContainer = document.getElementById('special');
    specialContainer.innerHTML = `
        <h3>Spezialkarten</h3>
        <ul>${createChecklist(data.setup.special_decks)}</ul>
        <hr>
        <p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p>
        <p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>
    `;
}

/**
 * Erstellt LP-Tracker für das Helden-Dashboard
 */
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

// Initialisierung
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