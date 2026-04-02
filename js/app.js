/**
 * js/app.js
 * Hauptlogik für das UI-Update und die Gefahrenberechnung
 */
const adventurePicker = document.getElementById('adventurePicker');
const heroInput = document.getElementById('heroCount');
const setupDisplay = document.getElementById('setup-display');

// Event-Listener für Änderungen
adventurePicker.addEventListener('change', refreshSetup);
heroInput.addEventListener('change', refreshSetup);

async function refreshSetup() {
    const path = adventurePicker.value;
    if (!path) {
        setupDisplay.classList.add('hidden');
        return;
    }

    const data = await fetchAdventureData(path);
    if (data) {
        renderSetup(data);
    }
}

function renderSetup(data) {
    const heroCount = parseInt(heroInput.value) || 2;
    
    // 1. Titel setzen
    document.getElementById('title').innerText = data.name;

    // 2. Blaue Abenteuerkarten [cite: 188, 189]
    const blueList = document.querySelector('#blue-cards ul');
    blueList.innerHTML = data.setup.blue_cards
        .map(card => `<li>${card}</li>`)
        .join('');

    // 3. Schergen & Gefahrenwert [cite: 465, 466]
    const dangerValue = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = 
        `Ziel-Gefahrenwert: <strong>${dangerValue} GP</strong> (Helden: ${heroCount} x ${data.danger_calc})`;
    
    const minionList = document.querySelector('#minions ul');
    minionList.innerHTML = data.setup.minion_keywords
        .map(kw => `<li>Schlagwort: <strong>${kw}</strong></li>`)
        .join('');
    
    if (data.setup.special_notes) {
        minionList.innerHTML += `<li class="highlight">${data.setup.special_notes}</li>`;
    }

    // 4. Spezialkarten (Grün) [cite: 226, 227]
    const specialList = document.querySelector('#special ul');
    let specialHtml = data.setup.special_decks
        .map(deck => `<li>${deck}</li>`)
        .join('');
    
    // Sieg- & Niederlage-Bedingungen ergänzen [cite: 622, 623]
    specialHtml += `<hr><li><strong>Sieg:</strong> ${data.setup.victory}</li>`;
    specialHtml += `<li><strong>Niederlage:</strong> ${data.setup.defeat}</li>`;
    
    specialList.innerHTML = specialHtml;

    // Anzeigen
    setupDisplay.classList.remove('hidden');
}