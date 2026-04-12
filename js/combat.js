window.Combat = {
    currentPhase: 0,

    resetPhase() {
        this.currentPhase = 0;
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
    },

    nextPhase() {
        const steps = document.querySelectorAll('.step');
        steps.forEach(s => s.classList.remove('active'));

        this.currentPhase = (this.currentPhase % 5) + 1;

        const el = document.getElementById(`phase${this.currentPhase}`);
        if (el) el.classList.add('active');
    },

    randomTarget() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const res = document.getElementById('targetResult');

        if (res) {
            if (count < 1) {
                res.innerText = "🎯 Kein gültiges Ziel vorhanden";
                return;
            }

            res.innerText = `🎯 Ziel: Held ${Math.floor(Math.random() * count) + 1}`;
        }
    },

    updateDashboard() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const container = document.getElementById('heroDashboard');
        if (!container) return;

        container.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            container.innerHTML += `
                <div class="hero-card">
                    <h4>Held ${i}</h4>
                    <div class="stat">
                        ❤️ <span id="lp${i}">40</span>
                        <button type="button" onclick="window.Combat.changeStat('lp${i}', -1)">-</button>
                        <button type="button" onclick="window.Combat.changeStat('lp${i}', 1)">+</button>
                    </div>
                </div>
            `;
        }
    },

    changeStat(id, delta) {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = Math.max(0, (parseInt(el.innerText, 10) || 0) + delta);
        }
    },

    calculateIntermission() {
        const time = parseInt(document.getElementById('remainingTime')?.value, 10) || 0;
        const ep = time + 2;
        const res = document.getElementById('ep-result');

        if (res) res.innerText = `${ep} EP`;
    }
};
