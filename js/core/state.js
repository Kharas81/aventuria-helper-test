const DEFAULT_STATE = {
    selectedAdventure: '',
    heroCount: 2,
    difficulty: 'normal',

    remainingTime: 0,
    currentPhase: 0,
    epResult: '2 EP',
    targetResult: '--',

    heroStats: [],

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
            heroStats: Array.isArray(safeNextState.heroStats)
                ? safeNextState.heroStats
                : defaults.heroStats
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

    setRemainingTime(value = 0) {
        const numeric = Number(value);
        this.state.remainingTime = Number.isFinite(numeric) ? numeric : 0;
    },

    setCurrentPhase(value = 0) {
        const numeric = Number(value);
        this.state.currentPhase = Number.isFinite(numeric) ? numeric : 0;
    },

    setEpResult(value = '2 EP') {
        this.state.epResult = String(value ?? '2 EP');
    },

    setTargetResult(value = '--') {
        this.state.targetResult = String(value ?? '--');
    },

    setHeroStats(value = []) {
        this.state.heroStats = Array.isArray(value) ? value : [];
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
            heroStats: Array.isArray(partialState.heroStats)
                ? partialState.heroStats
                : this.state.heroStats
        };

        return this.state;
    }
};

export default State;
