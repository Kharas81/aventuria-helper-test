window.Combat = {
    currentPhase: 0,
    maxPhase: 5,

    persistState() {
        if (window.StorageManager) {
            window.StorageManager.persist();
        }
    },

    resetPhase() {
        this.currentPhase = 0;

        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });

        this.persistState();
    },

    setPhase(phaseNumber) {
        const numericPhase = parseInt(phaseNumber, 10) || 0;

        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });

        this.currentPhase = Math.max(0, Math.min(this.maxPhase, numericPhase));

        if (this.currentPhase > 0) {
            const el = document.getElementById(`phase${this.currentPhase}`);
            if (el) {
                el.classList.add('active');
            }
        }

        this.persistState();
    },

    nextPhase() {
        let next = this.currentPhase + 1;
        if (next > this.maxPhase) next = 1;
        this.setPhase(next);
    },

    randomTarget() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const resultEl = document.getElementById('targetResult');

        if (!resultEl) return;

        if (count < 1) {
            resultEl.innerText = '🎯 Kein gültiges Ziel vorhanden';
            this.persistState();
            return;
        }

        const target = Math.floor(Math.random() * count) + 1;
        resultEl.innerText = `🎯 Ziel: Held ${target}`;
        this.persistState();
    },

    getDefaultHeroStats(index) {
        return {
            lp: 40,
            fate: 0
        };
    },

    updateDashboard(savedHeroStats = null) {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const container = document.getElementById('heroDashboard');
        if (!container) return;

        const fallbackStats = window.StorageManager?.loadState()?.heroStats || {};
        const sourceStats = savedHeroStats || fallbackStats;

        container.innerHTML = '';

        for (let i = 1; i <= count; i++) {
            const lpId = `lp${i}`;
            const fateId = `fate${i}`;

            const lpValue = parseInt(sourceStats?.[lpId], 10);
            const fateValue = parseInt(sourceStats?.[fateId], 10);

            const lp = Number.isFinite(lpValue) ? lpValue : this.getDefaultHeroStats(i).lp;
            const fate = Number.isFinite(fateValue) ? fateValue : this.getDefaultHeroStats(i).fate;

            container.innerHTML += `
                <div class="hero-card">
                    <h4>Held ${i}</h4>

                    <div class="stat">
                        ❤️ <span id="${lpId}">${lp}</span>
                        <button type="button" onclick="window.Combat.changeStat('${lpId}', -1)">-</button>
                        <button type="button" onclick="window.Combat.changeStat('${lpId}', 1)">+</button>
                    </div>

                    <div class="stat">
                        🍀 <span id="${fateId}">${fate}</span>
                        <button type="button" onclick="window.Combat.changeStat('${fateId}', -1, 0)">-</button>
                        <button type="button" onclick="window.Combat.changeStat('${fateId}', 1, 0)">+</button>
                    </div>
                </div>
            `;
        }

        this.persistState();
    },

    changeStat(id, delta, minValue = 0) {
        const el = document.getElementById(id);
        if (!el) return;

        const current = parseInt(el.innerText, 10) || 0;
        const nextValue = Math.max(minValue, current + delta);

        el.innerText = String(nextValue);
        this.persistState();
    },

    calculateIntermission() {
        const time = parseInt(document.getElementById('remainingTime')?.value, 10) || 0;
        const ep = time + 2;
        const resultEl = document.getElementById('ep-result');

        if (resultEl) {
            resultEl.innerText = `${ep} EP`;
        }

        this.persistState();
    }
};
