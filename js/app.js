let currentPhase = 0;

document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('adventurePicker');
    if (picker) picker.addEventListener('change', refreshSetup);
    updateHeroDashboard();
});

async function refreshSetup() {
    const path = document.getElementById('adventurePicker').value;
    if (!path) return;
    try {
        const response = await fetch(`data/adventures/${path}.json`);
        const data = await response.json();
        renderSetup(data);
        document.getElementById('setup-display').classList.remove('hidden');
    } catch (e) { alert("Abenteuer-Datei fehlt im Ordner!"); }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value);
    document.getElementById('title').innerText = data.name;

    const createChecklist = (items) => items.map(item => 
        `<li><label class="checklist-item"><input type="checkbox"> <span>${item}</span></label></li>`).join('');

    document.querySelector('#blue-cards ul').innerHTML = createChecklist(data.setup.blue_cards);
    document.getElementById('danger-value').innerHTML = `Gefahrenwert: <strong>${heroCount * data.danger_calc} GP</strong> [cite: 465-468]`;
    document.querySelector('#minions ul').innerHTML = createChecklist(data.setup.minion_keywords);
    
    const specialContainer = document.getElementById('special');
    specialContainer.innerHTML = `<h3>Spezialkarten</h3><ul>` + createChecklist(data.setup.special_decks) + 
        `</ul><hr><p><strong>Sieg:</strong> ${data.setup.victory}</p><p><strong>Niederlage:</strong> ${data.setup.defeat}</p>`;
}

function toggleSection(id) {
    document.getElementById(id).classList.toggle('show');
}

function nextPhase() {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    currentPhase = (currentPhase % 5) + 1;
    document.getElementById(`phase${currentPhase}`).classList.add('active'); // [cite: 524-528]
}

function updateHeroDashboard() {
    const count = parseInt(document.getElementById('heroCount').value);
    const container = document.getElementById('heroDashboard');
    container.innerHTML = "";
    for(let i=1; i<=count; i++) {
        container.innerHTML += `<div class="hero-card"><h4>Held ${i}</h4>LP: <span id="lp${i}">40</span> <button onclick="change('lp${i}',-1)">-</button><button onclick="change('lp${i}',1)">+</button></div>`;
    }
}

function change(id, v) { 
    const el = document.getElementById(id); 
    el.innerText = Math.max(0, parseInt(el.innerText) + v); 
}

function randomTarget() {
    const count = parseInt(document.getElementById('heroCount').value);
    const target = Math.floor(Math.random() * count) + 1;
    document.getElementById('targetResult').innerText = `Ziel: Held ${target} [cite: 591-592]`;
}

function calcRecovery() {
    const time = parseInt(document.getElementById('timeLeft').value) || 0;
    document.getElementById('recoveryResult').innerText = `${time + 2} EP`; // 
}