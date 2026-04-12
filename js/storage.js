/**
 * js/storage.js
 * Persistenter Spielstand für Aventuria Setup-Guide
 */
window.StorageManager = {
    storageKey: 'aventuria_save_v1',

    getDefaultState() {
        return {
            version: 1,
            selectedAdventure: '',
            heroCount: 2,
            difficulty: 'normal',
            combatPhase: 0,
            heroStats: {},
            checklist: {},
            sections: {
                combatToolsOpen: false,
                intermissionOpen: false
            }
        };
    },

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return this.getDefaultState();

            const parsed = JSON.parse(raw);
            return {
                ...this.getDefaultState(),
                ...parsed,
                sections: {
                    ...this.getDefaultState().sections,
                    ...(parsed.sections || {})
                },
                heroStats: parsed.heroStats || {},
                checklist: parsed.checklist || {}
            };
        } catch (error) {
            console.warn('Spielstand konnte nicht geladen werden. Nutze Standardwerte.', error);
            return this.getDefaultState();
        }
    },

    saveState(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (error) {
            console.warn('Spielstand konnte nicht gespeichert werden.', error);
        }
    },

    clearState() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('Spielstand konnte nicht gelöscht werden.', error);
        }
    },

    collectHeroStats() {
        const result = {};
        document.querySelectorAll('[id^="lp"]').forEach(el => {
            const id = el.id;
            result[id] = parseInt(el.innerText, 10) || 0;
        });
        return result;
    },

    collectChecklistState() {
        const result = {};
        document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach((checkbox, index) => {
            result[`check_${index}`] = checkbox.checked;
        });
        return result;
    },

    applyChecklistState(checklistState) {
        const entries = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        entries.forEach((checkbox, index) => {
            checkbox.checked = Boolean(checklistState?.[`check_${index}`]);
        });
    },

    applyHeroStats(heroStats) {
        Object.entries(heroStats || {}).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) {
                el.innerText = String(value);
            }
        });
    },

    collectUIState() {
        return {
            combatToolsOpen: document.getElementById('combat-tools')?.classList.contains('show') || false,
            intermissionOpen: document.getElementById('intermission-display')?.classList.contains('show') || false
        };
    },

    applyUIState(sections) {
        const combatTools = document.getElementById('combat-tools');
        const intermission = document.getElementById('intermission-display');

        if (combatTools) {
            combatTools.classList.toggle('show', Boolean(sections?.combatToolsOpen));
        }

        if (intermission) {
            intermission.classList.toggle('show', Boolean(sections?.intermissionOpen));
        }
    },

    collectFullState() {
        return {
            version: 1,
            selectedAdventure: document.getElementById('adventurePicker')?.value || '',
            heroCount: parseInt(document.getElementById('heroCount')?.value, 10) || 2,
            difficulty: document.getElementById('difficulty')?.value || 'normal',
            combatPhase: window.Combat?.currentPhase || 0,
            heroStats: this.collectHeroStats(),
            checklist: this.collectChecklistState(),
            sections: this.collectUIState()
        };
    },

    persist() {
        const state = this.collectFullState();
        this.saveState(state);
    },

    bindAutoSave() {
        document.addEventListener('change', (event) => {
            const target = event.target;

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
