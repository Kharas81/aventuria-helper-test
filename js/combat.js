const Combat = {
    currentPhase: 0,
    nextPhase() {
        const steps = document.querySelectorAll('.step');
        steps.forEach(s => s.classList.remove('active'));
        this.currentPhase = (this.currentPhase % 5) + 1;
        document.getElementById(`phase${this.currentPhase}`).classList.add('active');
    },
    randomTarget() {
        const count = document.getElementById('heroCount').value;
        document.getElementById('targetResult').innerText = `🎯 Ziel: Held ${Math.floor(Math.random() * count) + 1}`;
    },
    updateDashboard() {
        const count = document.getElementById('heroCount').value;
        const container = document.getElementById('heroDashboard');
        container.innerHTML = "";
        for(let i=1; i<=count; i++) {
            container.innerHTML += `<div class="hero-card"><h4>Held ${i}</h4><div class="stat">LP: <span id="lp${i}">40</span> <button onclick="Combat.changeStat('lp${i}', -1)">-</button><button onclick="Combat.changeStat('lp${i}', 1)">+</button></div></div>`;
        }
    },
    changeStat(id, delta) {
        const el = document.getElementById(id);
        if (el) el.innerText = Math.max(0, (parseInt(el.innerText) || 0) + delta);
    }
};
