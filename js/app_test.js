// --- DATENBANK FÜR DIE SUCHE (Mockup) ---
const cardDatabase = [
    { name: "Räuber", set: "Grundbox", loc: "Box 1, Fach A" },
    { name: "Skelett", set: "Schiff der Verlorenen", loc: "Box 2, Fach B" },
    { name: "Greifbart", set: "Grundbox", loc: "Anführer-Stapel" },
    { name: "Heiltrank", set: "Grundbox", loc: "Ausrüstung" }
];

const bossRules = {
    "wildenstein_akt_1": "Greifbart erhält +1 Schaden für jeden Helden mit weniger als 10 LP.",
    "silvanas_befreiung": "Wenn ein Pirat flieht, ziehe sofort eine neue Schergenkarte."
};

// --- FUNKTIONEN ---

window.searchCards = function() {
    const query = document.getElementById('cardSearch').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    if (query.length < 2) { resultsDiv.classList.add('hidden'); return; }

    const filtered = cardDatabase.filter(c => c.name.toLowerCase().includes(query) || c.set.toLowerCase().includes(query));
    resultsDiv.innerHTML = filtered.map(c => `
        <div class="search-item">
            <strong>${c.name}</strong> <span class="origin-badge">${c.set}</span>
            <br><small>Ort: ${c.loc}</small>
        </div>
    `).join('');
    resultsDiv.classList.remove('hidden');
};

window.saveLog = function() {
    const data = {
        adventure: document.getElementById('adventurePicker').value,
        heroes: document.getElementById('heroCount').value,
        date: new Date().toLocaleDateString()
    };
    localStorage.setItem('aventuria_save', JSON.stringify(data));
    document.getElementById('logStatus').innerText = "Gespeichert: " + data.date;
};

window.loadLog = function() {
    const saved = localStorage.getItem('aventuria_save');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('adventurePicker').value = data.adventure;
        document.getElementById('heroCount').value = data.heroes;
        document.getElementById('logStatus').innerText = "Geladen: " + data.date;
        refreshSetup();
    }
};

window.validateDeck = function() {
    const count = document.getElementById('deckCount').value;
    const feedback = document.getElementById('deckFeedback');
    if (count == 30) { feedback.innerText = "✅ Deck legal"; feedback.style.color = "green"; }
    else { feedback.innerText = `❌ ${count}/30 Karten`; feedback.style.color = "red"; }
};

window.playMusic = function(type) {
    const audio = document.getElementById('bgAudio');
    // Beispiel-Links (Platzhalter)
    audio.src = type === 'forest' ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' : '';
    audio.play();
};

window.stopMusic = function() { document.getElementById('bgAudio').pause(); };

window.toggleSection = function(id) { document.getElementById(id).classList.toggle('show'); };

// --- SETUP LOGIK ---

async function refreshSetup() {
    const picker = document.getElementById('adventurePicker');
    if (!picker.value) return;

    try {
        const response = await fetch(`data/adventures/${picker.value}.json`);
        const data = await response.json();
        
        // Setup anzeigen
        document.getElementById('title').innerText = data.name;
        document.getElementById('setup-display').classList.remove('hidden');

        // Boss KI Regeln laden
        const bossBox = document.getElementById('boss-ai');
        const slug = picker.value.split('/').pop();
        if (bossRules[slug]) {
            document.getElementById('boss-text').innerText = bossRules[slug];
            bossBox.classList.remove('hidden');
        } else {
            bossBox.classList.add('hidden');
        }

        // Belohnungen (Wegweiser)
        const rewardDiv = document.getElementById('reward-display');
        rewardDiv.innerHTML = (data.rewards || ["Keine Belohnung gelistet"]).map(r => `
            <div class="reward-card">🎁 ${r.name || r}</div>
        `).join('');

    } catch (e) { console.error(e); }
}

document.getElementById('adventurePicker').addEventListener('change', refreshSetup);