import Utils from './utils.js';
import State from './state.js';

export const StorageManager = {
    storageKey: 'aventuria_helper_state_v3',
    autoSaveBound: false,

    getDefaultState() {
        return State.getDefaultState();
    },

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) {
                return this.getDefaultState();
            }

            const parsed = JSON.parse(raw);
            return State.mergeState(parsed);
        } catch (error) {
            console.error('Fehler beim Laden des Spielstands:', error);
            return this.getDefaultState();
        }
    },

    saveState(state) {
        try {
            const normalized = State.mergeState(state);
            localStorage.setItem(this.storageKey, JSON.stringify(normalized));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern des Spielstands:', error);
            return false;
        }
    },

    clearState() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error('Fehler beim Löschen des Spielstands:', error);
        }
    },

    applyHeroStats(heroStats) {
        if (!window.Combat || typeof window.Combat.updateDashboard !== 'function') {
            return;
        }

        window.Combat.updateDashboard(heroStats || State.getState().heroStats);
    },

    applyChecklistState(checklist) {
        const safeChecklist = checklist && typeof checklist === 'object' && !Array.isArray(checklist)
            ? checklist
            : {};

        const items = document.querySelectorAll('.checklist-item');

        items.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox) return;

            const cardId = item.dataset.cardId || `item_${index}`;
            checkbox.checked = Boolean(safeChecklist[cardId]);
        });
    },

    applyUIState(state) {
        const safeState = state && typeof state === 'object' ? state : {};

        const combatTools = Utils.byId('combat-tools-section');
        const intermission = Utils.byId('intermission-section');

        if (combatTools) {
            combatTools.classList.toggle('show', Boolean(safeState.combatToolsOpen));
        }

        if (intermission) {
            intermission.classList.toggle('show', Boolean(safeState.intermissionOpen));
        }
    },

    applyCombatState(combatState) {
        const state = {
            ...State.getDefaultState().combatState,
            ...(combatState && typeof combatState === 'object' && !Array.isArray(combatState)
                ? combatState
                : {})
        };

        const remainingTime = Utils.byId('remainingTime');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');

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

    persist() {
        this.saveState(State.getState());
    },

    bindAutoSave() {
        if (this.autoSaveBound) {
            return;
        }

        document.addEventListener('change', event => {
            const target = event.target;
            if (!target) return;

            const checklistItem = target.closest?.('.checklist-item');
            if (checklistItem && target.matches?.('input[type="checkbox"]')) {
                const cardId = checklistItem.dataset.cardId || '';
                State.setChecklistItem(cardId, target.checked);
            }

            this.persist();
        });

        this.autoSaveBound = true;
    }
};

export default StorageManager;
