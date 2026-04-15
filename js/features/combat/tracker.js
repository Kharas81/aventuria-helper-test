import Utils from '../../core/utils.js';
import State from '../../core/state.js';

export const CombatTracker = {
    phaseLabels: [
        '1. Heldenphase',
        '2. Schergenphase',
        '3. Anführerphase',
        '4. Zeitphase'
    ],

    getPhaseSteps() {
        return Utils.qsa('#phaseTracker .step');
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

    getCurrentCombatState() {
        return State.getState().combatState || {};
    },

    getHeroCount() {
        return State.getState().heroCount;
    },

    getDifficulty() {
        return State.getState().difficulty;
    },

    updatePhaseTracker() {
        const currentPhase = Number(State.getState().combatPhase ?? 0) || 0;

        const steps = this.getPhaseSteps();
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentPhase);
        });
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

    prevPhase() {
        const currentPhase = Number(State.getState().combatPhase ?? 0) || 0;
        const nextPhase = (currentPhase - 1 + this.phaseLabels.length) % this.phaseLabels.length;

        State.setCombatPhase(nextPhase);
        this.updatePhaseTracker();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    nextPhase() {
        const currentPhase = Number(State.getState().combatPhase ?? 0) || 0;
        const wasTimePhase = currentPhase === this.phaseLabels.length - 1;
        const nextPhase = (currentPhase + 1) % this.phaseLabels.length;

        State.setCombatPhase(nextPhase);
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

        State.setCombatField('remainingTime', next);
        this.renderCombatState();
        this.updateEpResult();
    },

    rollTarget() {
        const heroCount = this.getHeroCount();
        const result = Math.max(1, Math.ceil(Math.random() * heroCount));

        State.setCombatField('targetResult', `Held ${result}`);
        this.renderCombatState();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    resetTargetResult() {
        State.setCombatField('targetResult', '--');
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

        State.setCombatField('epResult', `${ep} EP`);
        this.renderCombatState();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    bindGlobalCombatInputs() {
        const remainingTime = this.getRemainingTimeInput();

        if (remainingTime && !remainingTime.dataset.boundCombat) {
            remainingTime.addEventListener('input', () => {
                State.setCombatField('remainingTime', Number(remainingTime.value) || 0);
                this.updateEpResult();
            });
            remainingTime.dataset.boundCombat = 'true';
        }
    }
};

export default CombatTracker;
