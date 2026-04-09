/**
 * app.js - Hauptsteuerung für den Aventuria Setup-Guide, Archiv & Hover-System
 */

let currentPhase = 0;
let currentAdventureCards = []; // Speichert Kartendaten des geladenen Abenteuers für den Hover-Effekt

// --- 1. ARCHIV & MODAL STEUERUNG ---

window.openArchive = () => {
    document.getElementById('archive-modal').style.display = 'flex';
};

window.closeArchive = () => {
    document.getElementById('archive-modal').style.display = 'none';
    hidePreview(); // Sicherstellen, dass Tooltips verschwinden
};

/**
 * Lädt die Master-Datei einer Box ins Archiv-Grid
 */
window.loadArchiveSet = async function(setKey) {
    const grid = document.getElementById('archive-grid');
    grid.innerHTML = "<p>Lade Karten-Datenbank...</p>";

    try {
        // Lädt die Master-Datei (z.B. master_base_game.json)
        const response = await fetch(`data/cards/base_game/master_${setKey}.json`);
        
        if (!response.ok) {
            throw new Error(`Datei master_${setKey}.json wurde nicht gefunden.`);
        }
        
        const data = await response.json();
        
        if (!data.cards || data.cards.length === 0) {
            grid.innerHTML = "<p>Keine Karten in dieser Box gefunden.</p>";
            return;
        }

        // Karten im Grid anzeigen
        grid.innerHTML = data.cards.map(card => `
            <div class="archive-card" 
                 onmouseover="showPreview(event, '${card.image}')" 
                 onmousemove="movePreview(event)" 
                 onmouseout="hidePreview()">
                <img src="${card.image}" alt="${card.name}">
                <p>${card.name}</p>
            </div>
        `).join('');

    } catch (e) {
        console.error("Archiv-Fehler:", e);
        grid.innerHTML = `<p style="color:#5c1e1e; padding: 20px;">
            <strong>Fehler beim Laden:</strong><br>${e.message}<br>
            <small>Stelle sicher, dass die Datei 'data/cards/base_game/master_${setKey}.json' existiert.</small>
        </p>`;
    }
};

/**
 * Filtert die Karten im Archiv nach Namen
 */
window.filterArchive = function(query) {
    const cards = document.querySelectorAll('.archive-card');
    const q = query.toLowerCase();
    cards.forEach(card => {
        const name = card.querySelector('p').innerText.toLowerCase();
        card.style.display = name.includes(q) ? 'block' : 'none';
    });
};

// --- 2. HOVER VORSCHAU LOGIK (Tooltips) ---

window.showPreview = function(event, imgPath) {
    const tooltip = document.getElementById('card-tooltip');
    if (!imgPath) return;
    
    tooltip.innerHTML = `<img src="${imgPath}" alt="Vorschau">`;
    tooltip.style.display = 'block';
    movePreview(event);
};

window.movePreview = function(event) {
    const tooltip = document.getElementById('card-tooltip');
    if (tooltip.style.display === 'block') {
        // Positioniert den Tooltip leicht versetzt zur Maus
        tooltip.style.left = (event.clientX + 15) + 'px';
        tooltip.style.top = (event.clientY - 150) + 'px';
    }
};

window.hidePreview = function() {
    const tooltip = document.getElementById('card-tooltip');
    if (tooltip) tooltip.style.display = 'none';
};

// --- 3. ALLGEMEINE UI FUNKTIONEN ---

window.toggleSection = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('show');
};

window.changeStat = function(id, delta) {
    const el = document.getElementById(id);
    if (el) {
        let val = parseInt(el.innerText) || 0;
        el.innerText = Math.max(0, val + delta);
    }
};

// --- 4. KAMPF-HILFEN LOGIK ---

window.nextPhase = function() {
    const steps = document.querySelectorAll('.step');
    steps.forEach(s => s.classList.remove('active'));
    currentPhase = (currentPhase % 5) + 1;
    const activeStep = document.getElementById(`phase${currentPhase}`);
    if (activeStep) activeStep.classList.add('active');
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

// --- 5. SETUP & DATEN-LOGIK ---

/**
 * Hauptfunktion: Lädt Abenteuerdaten und verknüpft sie mit der Kartendatenbank
 */
async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker || !picker.value) return;

    try {
        // A. Abenteuer-Setup (Texte/Checklisten) laden
        const response = await fetch(`data/adventures/${picker.value}.json`);
        if (!response.ok) throw new Error("Abenteuer-Datei nicht gefunden");
        const adventureData = await response.json();
        
        // B. Zugehörige grafische Karten laden (für den Hover-Effekt)
        const adventureId = picker.value.split('/').pop();
        try {
            // Versucht die JSON im Karten-Ordner zu finden
            const cardRes = await fetch(`data/cards/base_game/${adventureId}.json`);
            if (cardRes.ok) {
                const cardJson = await cardRes.json();
                currentAdventureCards = cardJson.cards;
            } else {
                currentAdventureCards = [];
            }
        } catch(e) { 
            currentAdventureCards = []; 
        }

        // C. UI Rendern
        renderSetup(adventureData);
        
        // Narrative Texte (falls vorhanden)
        if (typeof window.renderStory === 'function') {
            window.renderStory(adventureData);
        }

        document.getElementById('setup-display').classList.remove('hidden');
        updateHeroDashboard(); 
    } catch (e) {
        console.error("Setup-Fehler:", e);
    }
}

/**
 * Baut die Checklisten zusammen und fügt Hover-Events hinzu
 */
function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    // Hilfsfunktion für Checklisten mit Hover-Erkennung
    const createChecklist = (items) => (items || []).map(item => {
        // Prüfen, ob der Text in der Liste (z.B. "Glücks-Idol") einer Karte in der DB entspricht
        const matchingCard = currentAdventureCards.find(c => item.toLowerCase().includes(c.name.toLowerCase()));
        
        let hoverAttr = "";
        if (matchingCard) {
            hoverAttr = `class="has-preview" 
                         onmouseover="showPreview(event, '${matchingCard.image}')" 
                         onmousemove="movePreview(event)" 
                         onmouseout="hidePreview()"`;
        }
        
        return `<li><label class="checklist-item">
            <input type="checkbox"> <span ${hoverAttr}>${item}</span>
        </label></li>`;
    }).join('');

    // Listen befüllen
    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);
    
    // Gefahrenwert
    const totalGP = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `
        Gefahrenwert: <strong>${totalGP} GP</strong> 
        <button class="info-btn" onclick="jumpToPage(12)">i</button>
    `;
    
    // Spezialkarten & Siegbedingungen
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
 * Erstellt das Helden-Dashboard für LP-Tracking
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

// --- 6. INITIALISIERUNG ---

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
