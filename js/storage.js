window.StorageManager = {
    storageKey: 'aventuria_helper_state_v2',

    getDefaultState() {
        return {
            version: 2,
            selectedAdventure: '',
            heroCount: 2,
            difficulty: 'normal',
            combatPhase: 0,
            heroStats: {},
            checklist: {},
            sections: {
                combatToolsOpen: true,
                intermissionOpen: true
            },
            combatState: {
                remainingTime: 0,
                epResult: '2 EP',
                targetResult: '--'
            }
        };
    },

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return this.getDefaultState();

            const parsed = JSON.parse(raw);
            return this.mergeWithDefaults(parsed);
        } catch (error) {
            console.error('Fehler beim Laden des Spielstands:', error);
            return this.getDefaultState();
        }
    },

    saveState(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.mergeWithDefaults(state)));
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

    mergeWithDefaults(state) {
        const defaults = this.getDefaultState();
        const incoming = state && typeof state === 'object' ? state : {};

        return {
            ...defaults,
            ...incoming,
            sections: {
                ...defaults.sections,
                ...(incoming.sections || {})
            },
            combatState: {
                ...defaults.combatState,
                ...(incoming.combatState || {})
            },
            heroStats: incoming.heroStats && typeof incoming.heroStats === 'object'
                ? incoming.heroStats
                : {},
            checklist: incoming.checklist && typeof incoming.checklist === 'object'
                ? incoming.checklist
                : {}
        };
    },

    getNumericValue(value, fallback = 0) {
        const numeric = Number(value);
        return Number.isFinite(numeric) ? numeric : fallback;
    },

    collectHeroStats() {
        const heroCards = document.querySelectorAll('#heroDashboard .hero-card');
        const result = {};

        heroCards.forEach((card, index) => {
            const heroIndex = index + 1;
            const lpEl = card.querySelector('[data-stat="lp"]');
            const fateEl = card.querySelector('[data-stat="fate"]');

            result[heroIndex] = {
                lp: this.getNumericValue(lpEl?.textContent, 40),
                fate: this.getNumericValue(fateEl?.textContent, 0)
            };
        });

        return result;
    },

    applyHeroStats(heroStats) {
        if (!window.Combat || typeof window.Combat.updateDashboard !== 'function') {
            return;
        }

        window.Combat.updateDashboard(heroStats || {});
    },

    collectChecklistState() {
        const result = {};
        const items = document.querySelectorAll('.checklist-item');

        items.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const cardId = item.dataset.cardId || `item_${index}`;

            result[cardId] = Boolean(checkbox?.checked);
        });

        return result;
    },

    applyChecklistState(checklist) {
        const state = checklist && typeof checklist === 'object' ? checklist : {};
        const items = document.querySelectorAll('.checklist-item');

        items.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox) return;

            const cardId = item.dataset.cardId || `item_${index}`;
            checkbox.checked = Boolean(state[cardId]);
        });
    },

    collectUIState() {
        const combatTools = document.getElementById('combat-tools-section');
        const intermission = document.getElementById('intermission-section');

        return {
            combatToolsOpen: combatTools ? combatTools.classList.contains('show') : true,
            intermissionOpen: intermission ? intermission.classList.contains('show') : true
        };
    },

    applyUIState(sections) {
        const combatTools = document.getElementById('combat-tools-section');
        const intermission = document.getElementById('intermission-section');

        if (combatTools) {
            combatTools.classList.toggle('show', Boolean(sections?.combatToolsOpen));
        }

        if (intermission) {
            intermission.classList.toggle('show', Boolean(sections?.intermissionOpen));
        }
    },

    collectCombatState() {
        const remainingTime = document.getElementById('remainingTime');
        const epResult = document.getElementById('ep-result');
        const targetResult = document.getElementById('targetResult');

        return {
            remainingTime: this.getNumericValue(remainingTime?.value, 0),
            epResult: String(epResult?.textContent ?? '2 EP').trim() || '2 EP',
            targetResult: String(targetResult?.textContent ?? '--').trim() || '--'
        };
    },

    applyCombatState(combatState) {
        const state = {
            ...this.getDefaultState().combatState,
            ...(combatState || {})
        };

        const remainingTime = document.getElementById('remainingTime');
        const epResult = document.getElementById('ep-result');
        const targetResult = document.getElementById('targetResult');

        if (remainingTime) {
            remainingTime.value = this.getNumericValue(state.remainingTime, 0);
        }

        if (epResult) {
            epResult.textContent = String(state.epResult ?? '2 EP');
        }

        if (targetResult) {
            targetResult.textContent = String(state.targetResult ?? '--');
        }
    },

    collectFullState() {
        return {
            version: 2,
            selectedAdventure: document.getElementById('adventurePicker')?.value || '',
            heroCount: parseInt(document.getElementById('heroCount')?.value, 10) || 2,
            difficulty: document.getElementById('difficulty')?.value || 'normal',
            combatPhase: window.Combat?.currentPhase || 0,
            heroStats: this.collectHeroStats(),
            checklist: this.collectChecklistState(),
            sections: this.collectUIState(),
            combatState: this.collectCombatState()
        };
    },

    persist() {
        const state = this.collectFullState();
        this.saveState(state);
    },

    bindAutoSave() {
        document.addEventListener('change', (event) => {
            const target = event.target;
            if (!target) return;

            if (
                target.matches('#heroCount') ||
                target.matches('#difficulty') ||
                target.matches('#adventurePicker') ||
                target.matches('.checklist-item input[type="checkbox"]') ||
                target.matches('#remainingTime')
            ) {
                this.persist();
            }
        });

        document.addEventListener('click', (event) => {
            const target = event.target;
            if (!target) return;

            if (
                target.closest('.btn') ||
                target.closest('.btn-outline') ||
                target.closest('.info-btn') ||
                target.closest('.stat button')
            ) {
                setTimeout(() => this.persist(), 0);
            }
        });

        window.addEventListener('beforeunload', () => {
            this.persist();
        });
    }
};
