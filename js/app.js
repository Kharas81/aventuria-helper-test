/**
 * app.js - Hauptsteuerung für den Aventuria Setup-Guide & Archiv
 */

let currentPhase = 0;
let currentAdventureCards = []; // Speichert Kartendaten des aktuellen Abenteuers für den Hover

// --- ARCHIV & MODAL STEUERUNG ---

window.openArchive = () => document.getElementById('archive-modal').style.display = 'flex';
window.closeArchive = () => document.getElementById('archive-modal').style.display = 'none';

/**
 * Lädt alle Karten einer Box ins Archiv
 */
window.loadArchiveSet = async function(setKey) {
    const grid = document.getElementById('archive-grid');
    grid.innerHTML = "Lade Karten...";

    try {
        // Hier laden wir als Beispiel die 'leute_nicht_spielen.json'
        // In einem echten Master-System würde hier eine 'master_base_game.json' geladen
        const response = await fetch(`data/cards/base_game/leute_die_nicht_spielen.json`);
        const data = await response.json();

        grid.innerHTML = data.cards.map(card => `
            <div class="archive-card">
                <img src="${card.image}" alt="${card.name}">
                <p>${card.name}</p>
            </div>
        `).join('');
    } catch (e) {
        grid.innerHTML = "Fehler beim Laden der Kartendaten.";
    }
};

// --- HOVER VORSCHAU LOGIK ---

window.showPreview = function(event, imgPath) {
    const tooltip = document.getElementById('card-tooltip');
    if (!imgPath) return;
    tooltip.innerHTML = `<img src="${imgPath}">`;
    tooltip.style.display = 'block';
    movePreview(event);
};

window.movePreview = function(event) {
    const tooltip = document.getElementById('card-tooltip');
    tooltip.style.left = (event.clientX + 15) + 'px';
    tooltip.style.top = (event.clientY - 150) + 'px';
};

window.hidePreview = function() {
    document.getElementById('card-tooltip').style.display = 'none';
};

// --- SETUP LOGIK ---

async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker || !picker.value) return;

    try {
        // 1. Abenteuer-Setup (Texte) laden
        const response = await fetch(`data/adventures/${picker.value}.json`);
        const data = await response.json();
        
        // 2. Grafische Kartendaten (für Hover) laden
        const adventureId = picker.value.split('/').pop();
        try {
            const cardRes = await fetch(`data/cards/base_game/${adventureId}.json`);
            const cardData = await cardRes.json();
            currentAdventureCards = cardData.cards;
        } catch(e) { 
            currentAdventureCards = []; 
        }

        renderSetup(data);
        
        if (typeof window.renderStory === 'function') window.renderStory(data);
        document.getElementById('setup-display').classList.remove('hidden');
        updateHeroDashboard();
    } catch (e) { console.error("Setup-Fehler:", e); }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    // Erstellt Liste und prüft, ob eine Karte für den Hover existiert
    const createChecklist = (items) => (items || []).map(item => {
        // Suchen, ob der Text (z.B. "Glücks-Idol") in unseren Kartendaten vorkommt
        const matchingCard = currentAdventureCards.find(c => item.includes(c.name));
        const hoverAttr = matchingCard 
            ? `class="has-preview" onmouseover="showPreview(event, '${matchingCard.image}')" onmousemove="movePreview(event)" onmouseout="hidePreview()"` 
            : "";
        
        return `<li><label class="checklist-item"><input type="checkbox"> <span ${hoverAttr}>${item}</span></label></li>`;
    }).join('');

    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    
    const totalGP = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `Gefahrenwert: <strong>${totalGP} GP</strong> <button class="info-btn" onclick="jumpToPage(12)">i</button>`;
    
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

// --- STANDARD FUNKTIONEN (LP, PHASEN ETC) ---

window.changeStat = (id, delta) => {
    const el = document.getElementById(id);
    if (el) el.innerText = Math.max(0, (parseInt(el.innerText) || 0) + delta);
};

window.nextPhase = () => {
    const steps = document.querySelectorAll('.step');
    steps.forEach(s => s.classList.remove('active'));
    currentPhase = (currentPhase % 5) + 1;
    document.getElementById(`phase${currentPhase}`).classList.add('active');
};

window.randomTarget = () => {
    const count = document.getElementById('heroCount').value;
    document.getElementById('targetResult').innerText = `🎯 Ziel: Held ${Math.floor(Math.random() * count) + 1}`;
};

window.calcRecovery = () => {
    const time = parseInt(document.getElementById('timeLeft').value) || 0;
    document.getElementById('recoveryResult').innerText = `${time + 2} EP`;
};

function updateHeroDashboard() {
    const count = document.getElementById('heroCount').value;
    const container = document.getElementById('heroDashboard');
    container.innerHTML = "";
    for(let i=1; i<=count; i++) {
        container.innerHTML += `<div class="hero-card"><h4>Held ${i}</h4><div class="stat">LP: <span id="lp${i}">40</span> <button onclick="changeStat('lp${i}', -1)">-</button><button onclick="changeStat('lp${i}', 1)">+</button></div></div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adventurePicker').addEventListener('change', refreshSetup);
    document.getElementById('heroCount').addEventListener('change', () => {
        updateHeroDashboard();
        refreshSetup();
    });
    updateHeroDashboard();
});
