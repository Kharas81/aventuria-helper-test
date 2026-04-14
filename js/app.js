window.App = {
    isApplyingSavedState: false,

    async init() {
        const picker = document.getElementById('adventurePicker');
        const heroCount = document.getElementById('heroCount');
        const difficulty = document.getElementById('difficulty');
        const saveBtn = document.getElementById('saveStateBtn');
        const clearBtn = document.getElementById('clearStateBtn');

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
                    this.setStatus('💾 Spielstand gespeichert.');
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', async () => {
                if (window.StorageManager) {
                    window.StorageManager.clearState();
                }

                this.resetUIToDefaults();
                this.setStatus('🗑️ Spielstand gelöscht.');
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

    setStatus(message) {
        const status = document.getElementById('loading-status');
        if (status) {
            status.innerText = message;
        }
    },

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    setVictoryDefeat(adventure) {
        const victoryEl = document.getElementById('victory-text');
        const defeatEl = document.getElementById('defeat-text');

        const victory = String(adventure?.setup?.victory ?? '—').trim() || '—';
        const defeat = String(adventure?.setup?.defeat ?? '—').trim() || '—';

        if (victoryEl) {
            victoryEl.innerHTML = `<strong>Sieg:</strong> ${this.escapeHtml(victory)}`;
        }

        if (defeatEl) {
            defeatEl.innerHTML = `<strong>Niederlage:</strong> ${this.escapeHtml(defeat)}`;
        }
    },

    clearVictoryDefeat() {
        const victoryEl = document.getElementById('victory-text');
        const defeatEl = document.getElementById('defeat-text');

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

        const container = document.getElementById('story-area');
        if (container) {
            container.innerHTML = '';
        }
    },

    resetUIToDefaults() {
        const picker = document.getElementById('adventurePicker');
        const heroCount = document.getElementById('heroCount');
        const difficulty = document.getElementById('difficulty');
        const setupDisplay = document.getElementById('setup-display');
        const storyArea = document.getElementById('story-area');
        const title = document.getElementById('title');
        const blueCards = document.querySelector('#blue-cards ul');
        const minions = document.querySelector('#minions ul');
        const special = document.getElementById('special');
        const dangerValue = document.getElementById('danger-value');
        const remainingTime = document.getElementById('remainingTime');
        const epResult = document.getElementById('ep-result');
        const targetResult = document.getElementById('targetResult');

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
        const {
            skipPersist = false
        } = options;

        const picker = document.getElementById('adventurePicker');
        const adventureId = picker?.value || '';

        if (!adventureId) {
            this.resetUIToDefaults();
            this.setStatus('Bereit.');
            return;
        }

        this.setStatus('⏳ Abenteuer wird geladen...');

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

            this.setStatus(`✅ Abenteuer geladen: ${advData.name}`);
        } catch (error) {
            console.error(error);
            this.setStatus(`❌ Fehler: ${error.message}`);
        }
    },

    async restoreSavedState() {
        if (!window.StorageManager) {
            return;
        }

        const state = window.StorageManager.loadState();
        if (!state) return;

        const picker = document.getElementById('adventurePicker');
        const heroCount = document.getElementById('heroCount');
        const difficulty = document.getElementById('difficulty');

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
