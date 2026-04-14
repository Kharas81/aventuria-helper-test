window.Combat = {
    currentPhase: 0,
    phaseLabels: [
        '1. Heldenphase',
        '2. Schergenphase',
        '3. Anführerphase',
        '4. Zeitphase'
    ],
    currentAdventure: null,
    currentCards: [],

    getHeroCount() {
        return window.State.getState().heroCount;
    },

    getDifficulty() {
        return window.State.getState().difficulty;
    },

    getDefaultHeroLp() {
        return 40;
    },

    getDefaultHeroFate() {
        return 0;
    },

    getHeroDashboard() {
        return Utils.byId('heroDashboard');
    },

    getRemainingTimeInput() {
        return Utils.byId('remainingTime');
    },

    getEpResultEl() {
        return Utils.byId('ep-result');
    },

    getTargetResultEl() {
        return Utils.byId('targetResult');
    },

    getPhaseSteps() {
        return Utils.qsa('#phaseTracker .step');
    },

    getCurrentHeroStats() {
        return window.State.getState().heroStats || {};
    },

    getCurrentCombatState() {
        return window.State.getState().combatState || {};
    },

    initializeForAdventure(adventure, cards = []) {
        this.currentAdventure = adventure ?? null;
        this.currentCards = Array.isArray(cards) ? cards : [];
        this.currentPhase = 0;
        window.State.setCombatPhase(0);

        const currentCombatState = this.getCurrentCombatState();
        const startValue = this.getTimelineStartValue();
        const remainingTime = Number(currentCombatState.remainingTime);

        if (!Number.isFinite(remainingTime) || remainingTime <= 0) {
            window.State.setCombatField('remainingTime', startValue);
        }

        window.State.setCombatField('targetResult', '--');

        this.updateDashboard();
        this.updatePhaseTracker();
        this.renderCombatState();
        this.updateEpResult();
    },

    getTimelineStartValue() {
        const timelineCard = (this.currentCards || []).find(card => String(card?.type ?? '') === 'timeline');
        const cardStartValue = Number(timelineCard?.stats?.start_value);

        if (Number.isFinite(cardStartValue) && cardStartValue >= 0) {
            return cardStartValue;
        }

        const adventureStartValue = Number(this.currentAdventure?.setup?.start_value);
        if (Number.isFinite(adventureStartValue) && adventureStartValue >= 0) {
            return adventureStartValue;
        }

        return 6;
    },

    buildHeroCard(heroIndex, heroState = {}) {
        const lp = Number.isFinite(Number(heroState.lp))
            ? Number(heroState.lp)
            : this.getDefaultHeroLp();

        const fate = Number.isFinite(Number(heroState.fate))
            ? Number(heroState.fate)
            : this.getDefaultHeroFate();

        return `
            <div class="hero-card" data-hero-index="${heroIndex}">
                <h4>Held ${heroIndex}</h4>

                <div class="stat">
                    <span aria-hidden="true">💗</span>
                    <span data-stat="lp">${Utils.escapeHtml(lp)}</span>
                    <button type="button" data-action="lp-minus" aria-label="Lebenspunkte verringern">-</button>
                    <button type="button" data-action="lp-plus" aria-label="Lebenspunkte erhöhen">+</button>
                </div>

                <div class="stat" style="margin-top: 8px;">
                    <span aria-hidden="true">🍀</span>
                    <span data-stat="fate">${Utils.escapeHtml(fate)}</span>
                    <button type="button" data-action="fate-minus" aria-label="Schicksalspunkte verringern">-</button>
                    <button type="button" data-action="fate-plus" aria-label="Schicksalspunkte erhöhen">+</button>
                </div>
            </div>
        `;
    },

    updateDashboard(savedHeroStats = null) {
        const container = this.getHeroDashboard();
        if (!container) return;

        const heroCount = this.getHeroCount();
        const stats = savedHeroStats && typeof savedHeroStats === 'object'
            ? savedHeroStats
            : this.getCurrentHeroStats();

        container.innerHTML = Array.from({ length: heroCount }, (_, i) => {
            const heroIndex = i + 1;
            return this.buildHeroCard(heroIndex, stats[heroIndex] || {});
        }).join('');

        this.bindDashboardButtons();
    },

    bindDashboardButtons() {
        const container = this.getHeroDashboard();
        if (!container || container.dataset.boundCombatDashboard === 'true') return;

        container.addEventListener('click', event => {
            const button = event.target.closest('button[data-action]');
            if (!button) return;

            const heroCard = button.closest('.hero-card');
            if (!heroCard) return;

            const heroIndex = Number(heroCard.dataset.heroIndex);
            const action = button.dataset.action;
            const heroStats = this.getCurrentHeroStats();
            const current = heroStats[heroIndex] || { lp: 40, fate: 0 };

            if (action === 'lp-minus') {
                window.State.setHeroStat(heroIndex, 'lp', Math.max(0, Number(current.lp) - 1));
            }

            if (action === 'lp-plus') {
                window.State.setHeroStat(heroIndex, 'lp', Number(current.lp) + 1);
            }

            if (action === 'fate-minus') {
                window.State.setHeroStat(heroIndex, 'fate', Math.max(0, Number(current.fate) - 1));
            }

            if (action === 'fate-plus') {
                window.State.setHeroStat(heroIndex, 'fate', Number(current.fate) + 1);
            }

            this.updateDashboard();

            if (window.StorageManager?.persist) {
                window.StorageManager.persist();
            }
        });

        container.dataset.boundCombatDashboard = 'true';
    },

    updatePhaseTracker() {
        this.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;

        const steps = this.getPhaseSteps();
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentPhase);
        });
    },

    prevPhase() {
        this.currentPhase = (this.currentPhase - 1 + this.phaseLabels.length) % this.phaseLabels.length;
        window.State.setCombatPhase(this.currentPhase);
        this.updatePhaseTracker();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    nextPhase() {
        const wasTimePhase = this.currentPhase === this.phaseLabels.length - 1;

        this.currentPhase = (this.currentPhase + 1) % this.phaseLabels.length;
        window.State.setCombatPhase(this.currentPhase);
        this.updatePhaseTracker();

        if (wasTimePhase) {
            this.advanceTimeMarker();
        }

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    advanceTimeMarker() {
        const combatState = this.getCurrentCombatState();
        const current = Number(combatState.remainingTime);
        const next = Number.isFinite(current) ? Math.max(0, current - 1) : 0;

        window.State.setCombatField('remainingTime', next);
        this.renderCombatState();
        this.updateEpResult();
    },

    rollTarget() {
        const heroCount = this.getHeroCount();
        const result = Math.max(1, Math.ceil(Math.random() * heroCount));

        window.State.setCombatField('targetResult', `Held ${result}`);
        this.renderCombatState();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    resetTargetResult() {
        window.State.setCombatField('targetResult', '--');
        this.renderCombatState();
    },

    updateEpResult() {
        const difficulty = this.getDifficulty();
        const remainingTime = Number(this.getCurrentCombatState().remainingTime ?? 0);

        let ep = 2;

        if (difficulty === 'easy') ep += 1;
        if (difficulty === 'hard') ep -= 1;

        if (remainingTime >= 5) ep += 1;
        if (remainingTime <= 1) ep -= 1;

        ep = Math.max(0, ep);

        window.State.setCombatField('epResult', `${ep} EP`);
        this.renderCombatState();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    renderCombatState() {
        const state = this.getCurrentCombatState();

        const remainingTime = this.getRemainingTimeInput();
        const epResult = this.getEpResultEl();
        const targetResult = this.getTargetResultEl();

        if (remainingTime) {
            remainingTime.value = Number.isFinite(Number(state.remainingTime))
                ? Number(state.remainingTime)
                : 0;
        }

        if (epResult) {
            epResult.textContent = String(state.epResult ?? '2 EP');
        }

        if (targetResult) {
            targetResult.textContent = String(state.targetResult ?? '--');
        }
    },

    applyIntermission() {
        const heroCount = this.getHeroCount();
        const stats = this.getCurrentHeroStats();

        for (let i = 1; i <= heroCount; i += 1) {
            const current = stats[i] || { lp: 40, fate: 0 };
            window.State.setHeroStat(i, 'lp', Math.max(0, Number(current.lp) + 3));
            window.State.setHeroStat(i, 'fate', Math.max(0, Number(current.fate) + 1));
        }

        this.updateDashboard();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    bindGlobalCombatInputs() {
        const remainingTime = this.getRemainingTimeInput();

        if (remainingTime && !remainingTime.dataset.boundCombat) {
            remainingTime.addEventListener('input', () => {
                window.State.setCombatField('remainingTime', Number(remainingTime.value) || 0);
                this.updateEpResult();
            });
            remainingTime.dataset.boundCombat = 'true';
        }
    },

    init() {
        this.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;
        this.bindGlobalCombatInputs();
        this.updatePhaseTracker();
        this.updateDashboard();
        this.renderCombatState();
        this.updateEpResult();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Combat?.init) {
        window.Combat.init();
    }
});
