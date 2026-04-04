/**
 * app.js - Hauptlogik für den Aventuria Setup-Guide
 */

let currentPhase = 0;

// --- ALLGEMEINE UI FUNKTIONEN ---

/**
 * Schaltet die Sichtbarkeit von Sektionen um (z.B. Kampf-Hilfen)
 */
window.toggleSection = function(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('show');
    }
};

/**
 * Ändert einen numerischen Wert im Dashboard (z.B. Lebenspunkte)
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
 * Wechselt zur nächsten Kampfphase (1 bis 5) [cite: 524-528]
 */
window.nextPhase = function() {
    const steps = document.querySelectorAll('.step');
    if (steps.length === 0) return;

    // Aktive Markierung entfernen
    steps.forEach(s => s.classList.remove('active'));

    // Zähler erhöhen (Loop 1-5) 
    currentPhase = (currentPhase % 5) + 1;

    // Neue Phase markieren
    const activeStep = document.getElementById(`phase${currentPhase}`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
};

/**
 * Ermittelt ein zufälliges Ziel unter den Helden [cite: 237, 591-593]
 */
window.randomTarget = function() {
    const count = parseInt(document.getElementById('heroCount').value) || 2;
    const target = Math.floor(Math.random() * count) + 1;
    const res = document.getElementById('targetResult');
    if (res) res.innerText = `🎯 Ziel: Held ${target}`;
};

/**
 * Berechnet Erholungspunkte während der Atempause 
 * Formel: Verbleibende Zeitmarken + 2 EP
 */
window.calcRecovery = function() {
    const time = parseInt(document.getElementById('timeLeft').value) || 0;
    const res = document.getElementById('recoveryResult');
    if (res) res.innerText = `${time + 2} EP`;
};

// --- SETUP & DATEN-LOGIK ---

/**
 * Hauptfunktion zum Laden eines Abenteuers
 */
async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker || !picker.value) return;

    try {
        const response = await fetch(`data/adventures/${picker.value}.json`);
        if (!response.ok) throw new Error("Abenteuerdatei nicht gefunden");
        const data = await response.json();
        
        // UI Komponenten aktualisieren
        renderSetup(data);
        
        // Narrativ-Modus (Vorlesetexte) triggern
        if (typeof window.renderStory === 'function') {
            window.renderStory(data);
        }

        document.getElementById('setup-display').classList.remove('hidden');
        updateHeroDashboard(); 
    } catch (e) {
        console.error("Fehler beim Laden des Setups:", e);
    }
}

/**
 * Zeichnet die Kartenlisten und berechnet GP-Werte
 */
function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    // Hilfsfunktion für Checklisten
    const createChecklist = (items) => (items || []).map(item => 
        `<li><label class="checklist-item"><input type="checkbox"> <span>${item}</span></label></li>`).join('');

    // Abenteuerkarten (Blau) [cite: 188-191]
    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    
    // Schergendeck (GP Berechnung) [cite: 465-468, 771]
    const totalGP = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `Gefahrenwert: <strong>${totalGP} GP</strong>`;
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);
    
    // Spezialkarten (Grün) [cite: 225-227]
    const specialContainer = document.getElementById('special');
    specialContainer.innerHTML = `<h3>Spezialkarten</h3><ul>` + createChecklist(data.setup.special_decks) + 
        `</ul><hr><p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p><p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>`;
}

/**
 * Erstellt die LP-Tracker für die gewählte Heldenanzahl [cite: 149, 204]
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

// --- INITIALISIERUNG ---

document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('adventurePicker');
    const heroInput = document.getElementById('heroCount');

    if (picker) picker.addEventListener('change', refreshSetup);
    
    // Dashboard bei Änderung der Heldenanzahl sofort anpassen
    if (heroInput) {
        heroInput.addEventListener('change', () => {
            updateHeroDashboard();
            if (picker && picker.value) refreshSetup(); // GP neu berechnen
        });
    }

    // Erstmaliges Dashboard-Setup
    updateHeroDashboard();
});