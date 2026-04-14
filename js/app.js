window.App = {
    isApplyingSavedState: false,

    async init() {
        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const saveBtn = Utils.byId('saveStateBtn');
        const clearBtn = Utils.byId('clearStateBtn');

        if (picker) {
            picker.addEventListener('change', () => this.handleUpdate());
        }

        if (heroCount) {
            heroCount.addEventListener('change', () => {
                if (window.Combat?.updateDashboard) {
                    window.Combat.updateDashboard();
                }

                if (!this.isApplyingSavedState && window.StorageManager) {
                    window.StorageManager.persist();
                }
            });
        }

        if (difficulty) {
            difficulty.addEventListener('change', () => {
                if (!this.isApplyingSavedState && window.StorageManager) {
                    window.StorageManager.persist();
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (window.StorageManager) {
                    window.StorageManager.persist();
                    window.UI?.setStatus?.('💾 Spielstand gespeichert.');
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', async () => {
                if (window.StorageManager) {
                    window.StorageManager.clearState();
                }

                this.resetUIToDefaults();
                window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
            });
        }

        if (window.Combat?.updateDashboard) {
            window.Combat.updateDashboard();
        }

        if (window.StorageManager?.bindAutoSave) {
            window.StorageManager.bindAutoSave();
        }

        await this.restoreSavedState();

        console.log('App initialisiert.');
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

    clearVictoryDefeat() {
        const victoryEl = Utils.byId('victory-text');
        const defeatEl = Utils.byId('defeat-text');

        if (victoryEl) {
            victoryEl.innerHTML = '<strong>Sieg:</strong> —';
        }

        if (defeatEl) {
            defeatEl.innerHTML = '<strong>Niederlage:</strong> —';
        }
    },

    renderStory(adventure) {
        if (window.Narrative?.renderStory) {
            window.Narrative.renderStory(adventure);
            return;
        }

        const container = Utils.byId('story-area');
        if (container) {
            container.innerHTML = '';
        }
    },

    resetUIToDefaults() {
        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const setupDisplay = Utils.byId('setup-display');
        const storyArea = Utils.byId('story-area');
        const title = Utils.byId('title');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.byId('special');
        const dangerValue = Utils.byId('danger-value');
        const remainingTime = Utils.byId('remainingTime');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');

        if (picker) picker.value = '';
        if (heroCount) heroCount.value = '2';
        if (difficulty) difficulty.value = 'normal';

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
        if (remainingTime) remainingTime.value = 0;
        if (epResult) epResult.textContent = '2 EP';
        if (targetResult) targetResult.textContent = '--';

        this.clearVictoryDefeat();

        if (window.Combat) {
            window.Combat.currentPhase = 0;
            if (window.Combat.updatePhaseTracker) {
                window.Combat.updatePhaseTracker();
            }
            if (window.Combat.updateDashboard) {
                window.Combat.updateDashboard();
            }
        }
    },

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;

        const picker = Utils.byId('adventurePicker');
        const adventureId = picker?.value || '';

        if (!adventureId) {
            this.resetUIToDefaults();
            window.UI?.setStatus?.('Bereit.');
            return;
        }

        window.UI?.setStatus?.('⏳ Abenteuer wird geladen...');

        try {
            const advData = await window.API?.getAdventure?.(adventureId);

            if (!advData) {
                throw new Error('Abenteuer-Datei fehlt.');
            }

            const cardData = await window.API?.getCards?.(advData.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];

            if (window.Renderer?.renderSetup) {
                window.Renderer.renderSetup(advData, allCards);
            }

            this.renderStory(advData);
            this.setVictoryDefeat(advData);

            if (window.Combat?.initializeForAdventure) {
                window.Combat.initializeForAdventure(advData, allCards);
            } else {
                if (window.Combat?.updateDashboard) {
                    window.Combat.updateDashboard();
                }
                if (window.Combat?.updatePhaseTracker) {
                    window.Combat.updatePhaseTracker();
                }
            }

            if (!skipPersist && !this.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }

            window.UI?.setStatus?.(`✅ Abenteuer geladen: ${advData.name}`);
        } catch (error) {
            console.error(error);
            window.UI?.setStatus?.(`❌ Fehler: ${error.message}`);
        }
    },

    async restoreSavedState() {
        if (!window.StorageManager) {
            return;
        }

        const state = window.StorageManager.loadState();
        if (!state) return;

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');

        this.isApplyingSavedState = true;

        try {
            if (heroCount) {
                heroCount.value = String(state.heroCount ?? 2);
            }

            if (difficulty) {
                difficulty.value = state.difficulty || 'normal';
            }

            if (picker && state.selectedAdventure) {
                picker.value = state.selectedAdventure;
                await this.handleUpdate({ skipPersist: true });
            } else {
                this.resetUIToDefaults();
            }

            if (window.StorageManager.applyHeroStats) {
                window.StorageManager.applyHeroStats(state.heroStats);
            }

            if (window.StorageManager.applyChecklistState) {
                window.StorageManager.applyChecklistState(state.checklist);
            }

            if (window.StorageManager.applyUIState) {
                window.StorageManager.applyUIState(state.sections);
            }

            if (window.StorageManager.applyCombatState) {
                window.StorageManager.applyCombatState(state.combatState);
            }

            if (window.Combat) {
                window.Combat.currentPhase = Number(state.combatPhase ?? 0) || 0;

                if (window.Combat.updatePhaseTracker) {
                    window.Combat.updatePhaseTracker();
                }
            }
        } finally {
            this.isApplyingSavedState = false;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.App?.init) {
        window.App.init();
    }
});
