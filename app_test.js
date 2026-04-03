let currentPhase = 0;

document.getElementById('adventurePicker').addEventListener('change', refreshSetup);
document.getElementById('heroCount').addEventListener('change', updateHeroDashboard);

async function refreshSetup() {
    const path = document.getElementById('adventurePicker').value;
    if (!path) return;
    try {
        const response = await fetch(`data/adventures/${path}.json`);
        const data = await response.json();
        renderSetup(data);
        updateHeroDashboard();
        document.getElementById('setup-display').classList.remove('hidden');
    } catch (e) { console.error(e); }
}

function renderSetup(data) {
    const heroCount = parseInt(document.getElementById('heroCount').value);
    document.getElementById('title').innerText = data.name;
    document.getElementById('danger-value').innerHTML = `Ziel-GP: <strong>${heroCount * data.danger_calc}</strong>`;
    
    // Checklisten befüllen (Funktion wie gehabt)
    const fill = (id, items) => {
        document.querySelector(`#${id} ul`).innerHTML = items.map(i => `<li><input type="checkbox"> ${i}</li>`).join('');
    };
    fill('blue-cards', data.setup.blue_cards);
    fill('minions', data.setup.minion_keywords);
}

// --- NEUE FUNKTIONEN ---

// 1. Phasen-Steuerung 
function nextPhase() {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    currentPhase = (currentPhase % 5) + 1;
    document.getElementById(`phase${currentPhase}`).classList.add('active');
}

// 2. Helden-Dashboard (LP & Schicksal) 
function updateHeroDashboard() {
    const count = parseInt(document.getElementById('heroCount').value);
    const container = document.getElementById('heroDashboard');
    container.innerHTML = "";
    for(let i=1; i<=count; i++) {
        container.innerHTML += `
            <div class="hero-card">
                <h4>Held ${i}</h4>
                <div class="stat">LP: <span id="lp${i}">40</span> 
                    <button onclick="changeStat('lp${i}', -1)">-</button>
                    <button onclick="changeStat('lp${i}', 1)">+</button>
                </div>
                <div class="stat">SchiP: <span id="sp${i}">0</span> 
                    <button onclick="changeStat('sp${i}', -1)">-</button>
                    <button onclick="changeStat('sp${i}', 1)">+</button>
                </div>
            </div>`;
    }
}

function changeStat(id, delta) {
    const el = document.getElementById(id);
    el.innerText = Math.max(0, parseInt(el.innerText) + delta);
}

// 3. Zufall Target 
function randomTarget() {
    const count = parseInt(document.getElementById('heroCount').value);
    const target = Math.floor(Math.random() * count) + 1;
    document.getElementById('targetResult').innerText = `Ziel: Held ${target}`;
}

// 4. Atempause 
function calcRecovery() {
    const time = parseInt(document.getElementById('timeLeft').value);
    const ep = time + 2;
    document.getElementById('recoveryResult').innerText = `Erholungspunkte: ${ep}`;
}