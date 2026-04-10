/**
 * js/combat.js - Kampf-Tracker und Atempause-Logik
 */
const Combat = {
    currentPhase: 0,
    
    nextPhase() {
        const steps = document.querySelectorAll('.step');
        steps.forEach(s => s.classList.remove('active'));
        this.currentPhase = (this.currentPhase % 5) + 1;
        const activeStep = document.getElementById(`phase${this.currentPhase}`);
        if (activeStep) activeStep.classList.add('active');
    },

    randomTarget() {
        const count = document.getElementById('heroCount').value;
        const target = Math.floor(Math.random() * count) + 1;
        document.getElementById('targetResult').innerHTML = `🎯 Ziel: <strong>Held ${target}</strong>`;
    },

    updateDashboard() {
        const count = document.getElementById('heroCount').value;
        const container = document.getElementById('heroDashboard');
        container.innerHTML = "";
        for(let i=1; i<=count; i++) {
            container.innerHTML += `
                <div class="hero-card">
                    <h4>Held ${i}</h4>
                    <div class="stat">❤️ <span id="lp${i}">40</span> 
                        <div class="button-group">
                            <button onclick="Combat.changeStat('lp${i}', -1)">-</button>
                            <button onclick="Combat.changeStat('lp${i}', 1)">+</button>
                        </div>
                    </div>
                </div>`;
        }
    },

    changeStat(id, delta) {
        const el = document.getElementById(id);
        if (el) el.innerText = Math.max(0, (parseInt(el.innerText) || 0) + delta);
    },

    calculateIntermission() {
        const timeTokens = parseInt(document.getElementById('remainingTime').value) || 0;
        // Formel: EP = Zeitmarken + 2
        const ep = timeTokens + 2;
        document.getElementById('ep-result').innerText = `${ep} EP`;
    }
};
