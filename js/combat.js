window.Combat = {
    currentPhase: 0,

    resetPhase() {
        this.currentPhase = 0;
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        this.persistState();
    },

    setPhase(phaseNumber) {
        const phase = Math.max(0, Math.min(5, parseInt(phaseNumber, 10) || 0));
        this.currentPhase = phase;

        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });

        if (phase > 0) {
            const el = document.getElementById(`phase${phase}`);
            if (el) el.classList.add('active');
        }

        this.persistState();
    },

    nextPhase() {
        const next = (this.currentPhase % 5) + 1;
        this.setPhase(next);
    },

    randomTarget() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const res = document.getElementById('targetResult');

        if (!res) return;

        if (count < 1) {
            res.innerText = '🎯 Kein gültiges Ziel vorhanden';
            return;
        }

        res.innerText = `🎯 Ziel: Held ${Math.floor(Math.random() * count) + 1}`;
    },

    getHeroStatsFromDom() {
        const stats = {};
        document.querySelectorAll('[data-hero-index]').forEach(card => {
            const index = card.dataset.heroIndex;
            const lpEl = card.querySelector('[data-stat="lp"]');
            if (!index || !lpEl) return;

            stats[`hero_${index}`] = {
                lp: parseInt(lpEl.innerText, 10) || 40
            };
        });

        return stats;
    },

    persistState() {
        if (!window.StorageManager) return;

        window.StorageManager.save({
            combatPhase: this.currentPhase,
            heroStats: this.getHeroStatsFromDom(),
            remainingTime: parseInt(document.getElementById('remainingTime')?.value, 10) || 0
        });
    },

    updateDashboard() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const container = document.getElementById('heroDashboard');
        if (!container) return;

        const savedStats = window.StorageManager?.restoreHeroStats() || {};
        container.innerHTML = '';

        for (let i = 1; i <= count; i++) {
            const stats = savedStats[`hero_${i}`] || { lp: 40 };

            container.innerHTML += `
                <div class="hero-card" data-hero-index="${i}">
                    <h4>Held ${i}</h4>
                    <div class="stat">
                        ❤️ <span data-stat="lp">${stats.lp}</span>
                        <button type="button" onclick="window.Combat.changeStat(${i}, 'lp', -1)">-</button>
                        <button type="button" onclick="window.Combat.changeStat(${i}, 'lp', 1)">+</button>
                    </div>
                </div>
            `;
        }

        this.persistState();
    },

    changeStat(heroIndex, statName, delta) {
        const card = document.querySelector(`[data-hero-index="${heroIndex}"]`);
        if (!card) return;

        const statEl = card.querySelector(`[data-stat="${statName}"]`);
        if (!statEl) return;

        const current = parseInt(statEl.innerText, 10) || 0;
        statEl.innerText = Math.max(0, current + delta);

        this.persistState();
    },

    calculateIntermission() {
        const time = parseInt(document.getElementById('remainingTime')?.value, 10) || 0;
        const ep = time + 2;
        const res = document.getElementById('ep-result');

        if (res) {
            res.innerText = `${ep} EP`;
        }

        this.persistState();
    }
};
