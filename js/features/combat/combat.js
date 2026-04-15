import State from '../../core/state.js';
import CombatDashboard from './dashboard.js';
import CombatTracker from './tracker.js';

export const Combat = {
    currentAdventure: null,
    currentCards: [],

    dashboard: CombatDashboard,
    tracker: CombatTracker,

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

    initializeForAdventure(adventure, cards = []) {
        this.currentAdventure = adventure ?? null;
        this.currentCards = Array.isArray(cards) ? cards : [];

        State.setCombatPhase(0);

        const currentCombatState = State.getState().combatState || {};
        const startValue = this.getTimelineStartValue();
        const remainingTime = Number(currentCombatState.remainingTime);

        if (!Number.isFinite(remainingTime) || remainingTime <= 0) {
            State.setCombatField('remainingTime', startValue);
        }

        State.setCombatField('targetResult', '--');

        this.updateDashboard();
        this.updatePhaseTracker();
        this.renderCombatState();
        this.updateEpResult();
    },

    updateDashboard(savedHeroStats = null) {
        this.dashboard.updateDashboard(savedHeroStats);
    },

    updatePhaseTracker() {
        this.tracker.updatePhaseTracker();
    },

    prevPhase() {
        this.tracker.prevPhase();
    },

    nextPhase() {
        this.tracker.nextPhase();
    },

    advanceTimeMarker() {
        this.tracker.advanceTimeMarker();
    },

    rollTarget() {
        this.tracker.rollTarget();
    },

    resetTargetResult() {
        this.tracker.resetTargetResult();
    },

    updateEpResult() {
        this.tracker.updateEpResult();
    },

    renderCombatState() {
        this.tracker.renderCombatState();
    },

    applyIntermission() {
        this.dashboard.applyIntermission();
    },

    bindGlobalCombatInputs() {
        this.tracker.bindGlobalCombatInputs();
    },

    init() {
        this.bindGlobalCombatInputs();
        this.updatePhaseTracker();
        this.updateDashboard();
        this.renderCombatState();
        this.updateEpResult();
    }
};

export default Combat;
