document.getElementById('adventurePicker').addEventListener('change', refreshSetup);
document.getElementById('heroCount').addEventListener('change', refreshSetup);

async function refreshSetup() {
    const path = document.getElementById('adventurePicker').value;
    const display = document.getElementById('setup-display');
    
    if (!path) {
        display.classList.add('hidden');
        return;
    }

    try {
        // Wir nutzen einen relativen Pfad ohne führenden Slash
        const response = await fetch(`data/adventures/${path}.json`);
        
        if (!response.ok) {
            throw new Error(`Datei nicht gefunden: data/adventures/${path}.json (Status: ${response.status})`);
        }
        
        const data = await response.json();
        renderSetup(data);
    } catch (error) {
        console.error("Fehler:", error);
        document.getElementById('title').innerText = "Fehler beim Laden";
        document.getElementById('blue-cards').innerHTML = `<p style="color:red">${error.message}</p>`;
        display.classList.remove('hidden');
    }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value) || 2;
    document.getElementById('title').innerText = data.name;

    // Blaue Karten [cite: 191]
    const blueList = document.querySelector('#blue-cards ul');
    blueList.innerHTML = data.setup.blue_cards.map(c => `<li>${c}</li>`).join('');

    // Monster & GP Berechnung [cite: 466, 479]
    const dangerValue = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = 
        `Ziel-Gefahrenwert: <strong>${dangerValue} GP</strong>`;
    
    const minionList = document.querySelector('#minions ul');
    minionList.innerHTML = data.setup.minion_keywords.map(k => `<li>Schlagwort: <strong>${k}</strong></li>`).join('');

    // Spezial/Sieg/Niederlage [cite: 622]
    const specialList = document.querySelector('#special ul');
    let html = (data.setup.special_decks || []).map(d => `<li>${d}</li>`).join('');
    html += `<hr><li><strong>Sieg:</strong> ${data.setup.victory}</li>`;
    html += `<li><strong>Niederlage:</strong> ${data.setup.defeat}</li>`;
    specialList.innerHTML = html;

    document.getElementById('setup-display').classList.remove('hidden');
}