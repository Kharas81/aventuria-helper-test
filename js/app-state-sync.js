window.AppStateSync = {
    applyStateToControls() {
        const state = window.State.getState();

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');

        if (picker) {
            picker.value = state.selectedAdventure || '';
        }

        if (heroCount) {
            heroCount.value = String(state.heroCount ?? 2);
        }

        if (difficulty) {
            difficulty.value = state.difficulty || 'normal';
        }
    },

    clearVictoryDefeat() {
        const victoryEl = Utils.byId('victory-text');
        const defeatEl = Utils.byId('defeat-text');

        if (victoryEl) victoryEl.innerHTML = '<strong>Sieg:</strong> —';
        if (defeatEl) defeatEl.innerHTML = '<strong>Niederlage:</strong> —';
    },

    setVictoryDefeat(adventure) {
        const victoryEl = Utils.byId('victory-text');
        const defeatEl = Utils.byId('defeat-text');

        const victory = String(adventure?.setup?.victory ?? '—').trim() || '—';
        const defeat = String(adventure?.setup?.defeat ?? '—').trim() || '—';

        if (victoryEl) {
            victoryEl.innerHTML = `<strong>Sieg:</strong> ${Utils.escapeHtml(victory)}`;
        }
        if (defeatEl) {
            defeatEl.innerHTML = `<strong>Niederlage:</strong> ${Utils.escapeHtml(defeat)}`;
        }
    },

    resetUIToDefaults() {
        this.applyStateToControls();

        const setupDisplay = Utils.byId('setup-display');
        const storyArea = Utils.byId('story-area');
        const title = Utils.byId('title');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.byId('special');
        const dangerValue = Utils.byId('danger-value');

        if (setupDisplay) setupDisplay.classList.add('hidden');
        if (storyArea) storyArea.innerHTML = '';
        if (title) title.innerText = 'Abenteuer';
        if (blueCards) blueCards.innerHTML = '';
        if (minions) minions.innerHTML = '';
        if (special) {
            const ul = special.querySelector('ul');
            if (ul) ul.innerHTML = '';
            special.classList.add('hidden');
        }
        if (dangerValue) dangerValue.innerHTML = '';

        this.clearVictoryDefeat();

        if (window.Combat) {
            window.Combat.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;
            window.Combat.updatePhaseTracker?.();
            window.Combat.updateDashboard?.(window.State.getState().heroStats);
            window.Combat.renderCombatState?.();
            window.Combat.updateEpResult?.();
        }

        if (window.StorageManager?.applyUIState) {
            window.StorageManager.applyUIState(window.State.getState().sections);
        }
    },

    applySavedSubsystems(state) {
        if (window.StorageManager?.applyHeroStats) {
            window.StorageManager.applyHeroStats(state.heroStats);
        }
        if (window.StorageManager?.applyChecklistState) {
            window.StorageManager.applyChecklistState(state.checklist);
        }
        if (window.StorageManager?.applyUIState) {
            window.StorageManager.applyUIState(state.sections);
        }
        if (window.StorageManager?.applyCombatState) {
            window.StorageManager.applyCombatState(state.combatState);
        }

        if (window.Combat) {
            window.Combat.currentPhase = Number(state.combatPhase ?? 0) || 0;
            window.Combat.updatePhaseTracker?.();
            window.Combat.updateDashboard?.(state.heroStats);
        }
    }
};
