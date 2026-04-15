const DEFAULT_STATE = {
    selectedAdventure: '',
    heroCount: 2,
    difficulty: 'normal',

    heroStats: {},

    combatPhase: 0,
    combatState: {
        remainingTime: 0,
        epResult: '2 EP',
        targetResult: '--'
    },

    checklist: {},

    combatToolsOpen: true,
    intermissionOpen: true
};

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export const State = {
    state: clone(DEFAULT_STATE),

    getDefaultState() {
        return clone(DEFAULT_STATE);
    },

    normalizeHeroStats(heroStats) {
        if (!isPlainObject(heroStats)) {
            return {};
        }

        const normalized = {};
        Object.entries(heroStats).forEach(([key, value]) => {
            const index = Number(key);
            if (!Number.isFinite(index) || index <= 0) return;

            const safeValue = isPlainObject(value) ? value : {};
            normalized[index] = {
                lp: Number.isFinite(Number(safeValue.lp)) ? Number(safeValue.lp) : 40,
                fate: Number.isFinite(Number(safeValue.fate)) ? Number(safeValue.fate) : 0
            };
        });

        return normalized;
    },

    normalizeChecklist(checklist) {
        if (!isPlainObject(checklist)) {
            return {};
        }

        const normalized = {};
        Object.entries(checklist).forEach(([key, value]) => {
            const safeKey = String(key ?? '').trim();
            if (!safeKey) return;
            normalized[safeKey] = Boolean(value);
        });

        return normalized;
    },

    mergeState(nextState = {}) {
        const defaults = this.getDefaultState();
        const safeNextState = isPlainObject(nextState) ? nextState : {};

        return {
            ...defaults,
            ...safeNextState,
            heroStats: this.normalizeHeroStats(safeNextState.heroStats),
            combatState: {
                ...defaults.combatState,
                ...(isPlainObject(safeNextState.combatState) ? safeNextState.combatState : {})
            },
            checklist: this.normalizeChecklist(safeNextState.checklist)
        };
    },

    getState() {
        return this.state;
    },

    replaceState(nextState = {}) {
        this.state = this.mergeState(nextState);
        return this.state;
    },

    reset() {
        this.state = this.getDefaultState();
        return this.state;
    },

    setSelectedAdventure(value = '') {
        this.state.selectedAdventure = String(value ?? '').trim();
    },

    setHeroCount(value = 2) {
        const numeric = Number(value);
        this.state.heroCount = Number.isFinite(numeric)
            ? Math.min(Math.max(numeric, 1), 4)
            : 2;
    },

    setDifficulty(value = 'normal') {
        this.state.difficulty = String(value ?? 'normal').trim() || 'normal';
    },

    setHeroStats(value = {}) {
        this.state.heroStats = this.normalizeHeroStats(value);
    },

    setHeroStat(heroIndex, field, value) {
        const index = Number(heroIndex);
        const key = String(field ?? '').trim();

        if (!Number.isFinite(index) || index <= 0 || !key) {
            return;
        }

        const existing = isPlainObject(this.state.heroStats[index])
            ? this.state.heroStats[index]
            : { lp: 40, fate: 0 };

        this.state.heroStats[index] = {
            ...existing,
            [key]: Number.isFinite(Number(value)) ? Number(value) : 0
        };
    },

    setCombatPhase(value = 0) {
        const numeric = Number(value);
        this.state.combatPhase = Number.isFinite(numeric) ? numeric : 0;
    },

    setCombatField(field, value) {
        const key = String(field ?? '').trim();
        if (!key) return;

        if (!isPlainObject(this.state.combatState)) {
            this.state.combatState = {};
        }

        this.state.combatState[key] = value;
    },

    setChecklistItem(cardId, checked) {
        const key = String(cardId ?? '').trim();
        if (!key) return;

        this.state.checklist[key] = Boolean(checked);
    },

    replaceChecklist(checklist) {
        this.state.checklist = this.normalizeChecklist(checklist);
    },

    setSectionOpen(key, isOpen) {
        if (!key) return;
        this.state[key] = Boolean(isOpen);
    },

    patch(partialState = {}) {
        if (!isPlainObject(partialState)) {
            return this.state;
        }

        this.state = {
            ...this.state,
            ...partialState,
            heroStats: isPlainObject(partialState.heroStats)
                ? this.normalizeHeroStats(partialState.heroStats)
                : this.state.heroStats,
            combatState: isPlainObject(partialState.combatState)
                ? {
                    ...this.state.combatState,
                    ...partialState.combatState
                }
                : this.state.combatState,
            checklist: isPlainObject(partialState.checklist)
                ? this.normalizeChecklist(partialState.checklist)
                : this.state.checklist
        };

        return this.state;
    }
};

export default State;
