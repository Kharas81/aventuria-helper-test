/**
 * js/storage.js - Persistenz für UI- und Spielzustand
 */
window.StorageManager = {
    STORAGE_KEY: 'aventuria_app_state_v1',

    getDefaultState() {
        return {
            version: 1,
            currentAdventurePath: '',
            currentAdventureId: '',
            heroCount: 2,
            difficulty: 'normal',
            remainingTime: 0,
            combatPhase: 0,
            heroStats: {},
            checkedItems: {},
            archive: {
                search: '',
                type: '',
                status: ''
            }
        };
    },

    load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) return this.getDefaultState();

            const parsed = JSON.parse(raw);
            return {
                ...this.getDefaultState(),
                ...parsed,
                archive: {
                    ...this.getDefaultState().archive,
                    ...(parsed.archive || {})
                }
            };
        } catch (error) {
            console.warn('Speicherstand konnte nicht gelesen werden.', error);
            return this.getDefaultState();
        }
    },

    save(nextState) {
        try {
            const current = this.load();
            const merged = {
                ...current,
                ...nextState,
                archive: {
                    ...current.archive,
                    ...(nextState.archive || {})
                }
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(merged));
            return merged;
        } catch (error) {
            console.warn('Speicherstand konnte nicht gespeichert werden.', error);
            return null;
        }
    },

    clear() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.warn('Speicherstand konnte nicht gelöscht werden.', error);
        }
    },

    saveCheckedItems(adventureId) {
        if (!adventureId) return;

        const checked = {};
        document.querySelectorAll('[data-check-id]').forEach(input => {
            checked[input.dataset.checkId] = !!input.checked;
        });

        const state = this.load();
        const checkedItems = {
            ...(state.checkedItems || {}),
            [adventureId]: checked
        };

        this.save({ checkedItems });
    },

    restoreCheckedItems(adventureId) {
        if (!adventureId) return;

        const state = this.load();
        const checked = state.checkedItems?.[adventureId] || {};

        document.querySelectorAll('[data-check-id]').forEach(input => {
            input.checked = !!checked[input.dataset.checkId];
        });
    },

    saveHeroStats(heroStats) {
        this.save({ heroStats });
    },

    restoreHeroStats() {
        return this.load().heroStats || {};
    }
};
