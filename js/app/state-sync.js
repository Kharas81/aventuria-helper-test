import Utils from '../core/utils.js';
import State from '../core/state.js';

export const AppStateSync = {
    applyStateToControls() {
        const state = State.getState();

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const remainingTime = Utils.byId('remainingTime');

        if (picker) {
            picker.value = state.selectedAdventure || '';
        }

        if (heroCount) {
            heroCount.value = String(state.heroCount ?? 2);
        }

        if (difficulty) {
            difficulty.value = state.difficulty || 'normal';
        }

        if (remainingTime) {
            remainingTime.value = String(state.remainingTime ?? 0);
        }
    },

    resetUIToDefaults() {
        const title = Utils.byId('title');
        const storyArea = Utils.byId('story-area');
        const setupDisplay = Utils.byId('setup-display');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.qs('#special ul');
        const dangerValue = Utils.byId('danger-value');
        const heroDashboard = Utils.byId('heroDashboard');
        const phaseTracker = Utils.byId('phaseTracker');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');
        const remainingTime = Utils.byId('remainingTime');

        if (title) title.textContent = 'Abenteuer';
        if (storyArea) storyArea.innerHTML = '';
        if (setupDisplay) setupDisplay.classList.add('hidden');
        if (blueCards) blueCards.innerHTML = '';
        if (minions) minions.innerHTML = '';
        if (special) special.innerHTML = '';
        if (dangerValue) dangerValue.textContent = '';
        if (heroDashboard) heroDashboard.innerHTML = '';
        if (epResult) epResult.textContent = '2 EP';
        if (targetResult) targetResult.textContent = '--';
        if (remainingTime) remainingTime.value = '0';

        if (phaseTracker) {
            Utils.qsa('.step', phaseTracker).forEach((step, index) => {
                step.classList.toggle('active', index === 0);
            });
        }

        this.setVictoryDefeat(null);
        this.applySavedSubsystems(State.getState());
    },

    setVictoryDefeat(adventure) {
        const victoryText = Utils.byId('victory-text');
        const defeatText = Utils.byId('defeat-text');

        if (victoryText) {
            victoryText.innerHTML = `<strong>Sieg:</strong> ${adventure?.setup?.victory || '—'}`;
        }

        if (defeatText) {
            defeatText.innerHTML = `<strong>Niederlage:</strong> ${adventure?.setup?.defeat || '—'}`;
        }
    },

    applySavedSubsystems(state) {
        const safeState = state || State.getState();

        const combatSection = Utils.byId('combat-tools-section');
        const intermissionSection = Utils.byId('intermission-section');
        const remainingTime = Utils.byId('remainingTime');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');

        if (combatSection) {
            combatSection.classList.toggle('show', Boolean(safeState.combatToolsOpen));
        }

        if (intermissionSection) {
            intermissionSection.classList.toggle('show', Boolean(safeState.intermissionOpen));
        }

        if (remainingTime) {
            remainingTime.value = String(safeState.remainingTime ?? 0);
        }

        if (epResult) {
            epResult.textContent = safeState.epResult || '2 EP';
        }

        if (targetResult) {
            targetResult.textContent = safeState.targetResult || '--';
        }

        if (window.Combat?.updateDashboard) {
            window.Combat.updateDashboard(safeState.heroStats);
        }

        if (window.Combat?.updatePhaseTracker) {
            window.Combat.updatePhaseTracker(safeState.currentPhase ?? 0);
        }
    }
};

export default AppStateSync;
