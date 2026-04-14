window.StorageManager = {
    storageKey: 'aventuria_helper_state_v3',

    getDefaultState() {
        return window.State.getDefaultState();
    },

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) {
                return this.getDefaultState();
            }

            const parsed = JSON.parse(raw);
            return window.State.mergeState(parsed);
        } catch (error) {
            console.error('Fehler beim Laden des Spielstands:', error);
            return this.getDefaultState();
        }
    },

    saveState(state) {
        try {
            const normalized = window.State.mergeState(state);
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

        window.Combat.updateDashboard(heroStats || window.State.getState().heroStats);
    },

    applyChecklistState(checklist) {
        const state = Utils.isObject(checklist) ? checklist : {};
        const items = document.querySelectorAll('.checklist-item');

        items.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox) return;

            const cardId = item.dataset.cardId || `item_${index}`;
            checkbox.checked = Boolean(state[cardId]);
        });
    },

    applyUIState(sections) {
        const safeSections = {
            ...window.State.getDefaultState().sections,
            ...(Utils.isObject(sections) ? sections : {})
        };

        const combatTools = Utils.byId('combat-tools-section');
        const intermission = Utils.byId('intermission-section');

        if (combatTools) {
            combatTools.classList.toggle('show', Boolean(safeSections.combatToolsOpen));
        }

        if (intermission) {
            intermission.classList.toggle('show', Boolean(safeSections.intermissionOpen));
        }
    },

    applyCombatState(combatState) {
        const state = {
            ...window.State.getDefaultState().combatState,
            ...(Utils.isObject(combatState) ? combatState : {})
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
        this.saveState(window.State.getState());
    },

    bindAutoSave() {
        document.addEventListener('change', event => {
            const target = event.target;
            if (!target) return;

            if (target.matches('.checklist-item input[type="checkbox"]')) {
                const item = target.closest('.checklist-item');
                const cardId = item?.dataset?.cardId || '';
                window.State.setChecklistItem(cardId, Boolean(target.checked));
                this.persist();
                return;
            }

            if (target.matches('#remainingTime')) {
                window.State.setCombatField('remainingTime', Number(target.value) || 0);
                this.persist();
            }
        });

        window.addEventListener('beforeunload', () => {
            this.persist();
        });
    }
};
