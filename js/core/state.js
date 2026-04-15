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

    combatToolsOpen: true,
    intermissionOpen: true
};

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

export const State = {
    state: clone(DEFAULT_STATE),

    getDefaultState() {
        return clone(DEFAULT_STATE);
    },

    getState() {
        return this.state;
    },

    replaceState(nextState = {}) {
        const defaults = this.getDefaultState();
        const safeNextState = nextState && typeof nextState === 'object' ? nextState : {};

        this.state = {
            ...defaults,
            ...safeNextState,
            heroStats: safeNextState.heroStats && typeof safeNextState.heroStats === 'object' && !Array.isArray(safeNextState.heroStats)
                ? safeNextState.heroStats
                : defaults.heroStats,
            combatState: safeNextState.combatState && typeof safeNextState.combatState === 'object' && !Array.isArray(safeNextState.combatState)
                ? {
                    ...defaults.combatState,
                    ...safeNextState.combatState
                }
                : clone(defaults.combatState)
        };

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
        this.state.heroCount = Number.isFinite(numeric) ? numeric : 2;
    },

    setDifficulty(value = 'normal') {
        this.state.difficulty = String(value ?? 'normal').trim() || 'normal';
    },

    setHeroStats(value = {}) {
        this.state.heroStats = value && typeof value === 'object' && !Array.isArray(value)
            ? value
            : {};
    },

    setHeroStat(heroIndex, field, value) {
        const index = Number(heroIndex);
        const key = String(field ?? '').trim();

        if (!Number.isFinite(index) || index <= 0 || !key) {
            return;
        }

        const existing = this.state.heroStats[index] && typeof this.state.heroStats[index] === 'object'
            ? this.state.heroStats[index]
            : {};

        this.state.heroStats[index] = {
            ...existing,
            [key]: value
        };
    },

    setCombatPhase(value = 0) {
        const numeric = Number(value);
        this.state.combatPhase = Number.isFinite(numeric) ? numeric : 0;
    },

    setCombatField(field, value) {
        const key = String(field ?? '').trim();
        if (!key) return;

        if (!this.state.combatState || typeof this.state.combatState !== 'object' || Array.isArray(this.state.combatState)) {
            this.state.combatState = {};
        }

        this.state.combatState[key] = value;
    },

    setSectionOpen(key, isOpen) {
        if (!key) return;
        this.state[key] = Boolean(isOpen);
    },

    patch(partialState = {}) {
        if (!partialState || typeof partialState !== 'object') {
            return this.state;
        }

        this.state = {
            ...this.state,
            ...partialState,
            heroStats: partialState.heroStats && typeof partialState.heroStats === 'object' && !Array.isArray(partialState.heroStats)
                ? partialState.heroStats
                : this.state.heroStats,
            combatState: partialState.combatState && typeof partialState.combatState === 'object' && !Array.isArray(partialState.combatState)
                ? {
                    ...this.state.combatState,
                    ...partialState.combatState
                }
                : this.state.combatState
        };

        return this.state;
    }
};

export default State;
