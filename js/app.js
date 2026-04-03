document.getElementById('adventurePicker').addEventListener('change', refreshSetup);
document.getElementById('heroCount').addEventListener('change', refreshSetup);

async function refreshSetup() {
    const path = document.getElementById('adventurePicker').value;
    const display = document.getElementById('setup-display');
    if (!path) { if(display) display.classList.add('hidden'); return; }

    try {
        const response = await fetch(`data/adventures/${path}.json`);
        if (!response.ok) throw new Error(`Datei nicht gefunden: ${path}`);
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

    // Diese Funktion erstellt die Checkboxen
    const createChecklist = (items) => {
        return items.map(item => `
            <li>
                <label class="checklist-item">
                    <input type="checkbox"> 
                    <span>${item}</span>
                </label>
            </li>
        `).join('');
    };

    // Listen befüllen
    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    
    const dangerValue = heroCount * data.danger_calc;
    document.getElementById('danger-value').innerHTML = `Ziel-Gefahrenwert: <strong>${dangerValue} GP</strong>`;
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);

    const specialContainer = document.getElementById('special');
    let html = `<h3>Spezialkarten (Grün)</h3><ul>`;
    html += (data.setup.special_decks || []).map(d => `
        <li>
            <label class="checklist-item">
                <input type="checkbox"> <span>${d}</span>
            </label>
        </li>`).join('');
    html += `</ul><hr>`;
    html += `<p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p>`;
    html += `<p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>`;
    specialContainer.innerHTML = html;

    document.getElementById('setup-display').classList.remove('hidden');
}