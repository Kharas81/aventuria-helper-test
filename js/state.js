window.State = {
    data: null,

    getDefaultState() {
        return {
            version: 3,
            selectedAdventure: '',
            heroCount: 2,
            difficulty: 'normal',
            combatPhase: 0,
            heroStats: {
                1: { lp: 40, fate: 0 },
                2: { lp: 40, fate: 0 }
            },
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

    clone(value) {
        return JSON.parse(JSON.stringify(value));
    },

    normalizeHeroStats(heroStats, heroCount = 2) {
        const result = {};
        const safeCount = Math.min(Math.max(Number(heroCount) || 2, 1), 4);

        for (let i = 1; i <= 4; i += 1) {
            const current = heroStats?.[i] ?? heroStats?.[String(i)] ?? {};
            result[i] = {
                lp: Number.isFinite(Number(current.lp)) ? Number(current.lp) : 40,
                fate: Number.isFinite(Number(current.fate)) ? Number(current.fate) : 0
            };
        }

        for (let i = safeCount + 1; i <= 4; i += 1) {
            if (!result[i]) {
                result[i] = { lp: 40, fate: 0 };
            }
        }

        return result;
    },

    mergeState(state) {
        const defaults = this.getDefaultState();
        const incoming = Utils.isObject(state) ? state : {};

        const merged = {
            ...defaults,
            ...incoming,
            sections: {
                ...defaults.sections,
                ...(Utils.isObject(incoming.sections) ? incoming.sections : {})
            },
            combatState: {
                ...defaults.combatState,
                ...(Utils.isObject(incoming.combatState) ? incoming.combatState : {})
            }
        };

        merged.heroCount = Math.min(Math.max(Number(merged.heroCount) || 2, 1), 4);
        merged.heroStats = this.normalizeHeroStats(incoming.heroStats, merged.heroCount);
        merged.checklist = Utils.isObject(incoming.checklist) ? incoming.checklist : {};

        return merged;
    },

    init(initialState = null) {
        this.data = this.mergeState(initialState);
    },

    reset() {
        this.data = this.getDefaultState();
    },

    getState() {
        if (!this.data) {
            this.reset();
        }
        return this.data;
    },

    replaceState(nextState) {
        this.data = this.mergeState(nextState);
    },

    setSelectedAdventure(adventureId) {
        this.getState().selectedAdventure = Utils.normalizeString(adventureId);
    },

    setHeroCount(heroCount) {
        const state = this.getState();
        state.heroCount = Math.min(Math.max(Number(heroCount) || 2, 1), 4);
        state.heroStats = this.normalizeHeroStats(state.heroStats, state.heroCount);
    },

    setDifficulty(difficulty) {
        this.getState().difficulty = Utils.normalizeString(difficulty || 'normal') || 'normal';
    },

    setCombatPhase(phase) {
        this.getState().combatPhase = Number.isFinite(Number(phase)) ? Number(phase) : 0;
    },

    setSectionOpen(sectionKey, isOpen) {
        this.getState().sections[sectionKey] = Boolean(isOpen);
    },

    setCombatField(field, value) {
        this.getState().combatState[field] = value;
    },

    setHeroStat(heroIndex, statKey, value) {
        const state = this.getState();
        const index = Number(heroIndex);

        if (!state.heroStats[index]) {
            state.heroStats[index] = { lp: 40, fate: 0 };
        }

        state.heroStats[index][statKey] = Number.isFinite(Number(value))
            ? Number(value)
            : 0;
    },

    setChecklistItem(cardId, checked) {
        const key = Utils.normalizeString(cardId);
        if (!key) return;
        this.getState().checklist[key] = Boolean(checked);
    },

    replaceChecklist(checklist) {
        this.getState().checklist = Utils.isObject(checklist) ? checklist : {};
    }
};

window.State.init();
