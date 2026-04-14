window.App = {
    isApplyingSavedState: false,

    async init() {
        const savedState = window.StorageManager?.loadState?.() || window.State.getDefaultState();
        window.State.replaceState(savedState);

        await this.populateAdventurePicker();

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const saveBtn = Utils.byId('saveStateBtn');
        const clearBtn = Utils.byId('clearStateBtn');

        if (picker) {
            picker.addEventListener('change', () => {
                window.State.setSelectedAdventure(picker.value);
                this.handleUpdate();
            });
        }

        if (heroCount) {
            heroCount.addEventListener('change', () => {
                window.State.setHeroCount(heroCount.value);

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
                window.State.setDifficulty(difficulty.value);

                if (window.Combat?.updateEpResult) {
                    window.Combat.updateEpResult();
                }

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

                window.State.reset();
                this.resetUIToDefaults();
                window.Diagnostics?.clear?.();
                window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
            });
        }

        if (window.StorageManager?.bindAutoSave) {
            window.StorageManager.bindAutoSave();
        }

        await this.restoreSavedState();

        console.log('App initialisiert.');
    },

    async populateAdventurePicker() {
        const picker = Utils.byId('adventurePicker');
        if (!picker) return;

        const previouslySelected = window.State?.getState?.()?.selectedAdventure || '';

        picker.innerHTML = '';
        picker.appendChild(new Option('Bitte wählen ...', ''));

        try {
            const adventures = await window.API?.getAvailableAdventures?.();
            const enabledSets = window.CONFIG?.getEnabledSets?.() || [];
            const showSetPrefix = enabledSets.length > 1;

            (adventures || []).forEach(adventure => {
                const label = showSetPrefix
                    ? `${adventure.set.shortName} · ${adventure.name}`
                    : adventure.name;

                picker.appendChild(new Option(label, adventure.id));
            });

            if (previouslySelected && !Array.from(picker.options).some(option => option.value === previouslySelected)) {
                picker.appendChild(new Option(`${previouslySelected} (alt/extern)`, previouslySelected));
            }

            picker.value = previouslySelected || '';
        } catch (error) {
            console.error('Fehler beim Aufbau der Abenteuerliste:', error);
            window.UI?.setStatus?.('⚠️ Abenteuerliste konnte nicht geladen werden.');
        }
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

    applyStateToControls() {
        const state = window.State.getState();

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');

        if (picker) {
            picker.value = state.selectedAdventure || '';
        }

        if (heroCount) {
            heroCount.value = String(state.heroCount ?? 2);
        }

        if (difficulty) {
            difficulty.value = state.difficulty || 'normal';
        }
    },

    resetUIToDefaults() {
        this.applyStateToControls();

        const setupDisplay = Utils.byId('setup-display');
        const storyArea = Utils.byId('story-area');
        const title = Utils.byId('title');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.byId('special');
        const dangerValue = Utils.byId('danger-value');

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

        this.clearVictoryDefeat();

        if (window.Combat) {
            window.Combat.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;

            if (window.Combat.updatePhaseTracker) {
                window.Combat.updatePhaseTracker();
            }

            if (window.Combat.updateDashboard) {
                window.Combat.updateDashboard(window.State.getState().heroStats);
            }

            if (window.Combat.renderCombatState) {
                window.Combat.renderCombatState();
            }

            if (window.Combat.updateEpResult) {
                window.Combat.updateEpResult();
            }
        }

        if (window.StorageManager?.applyUIState) {
            window.StorageManager.applyUIState(window.State.getState().sections);
        }
    },

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;

        const requestedAdventureId = window.State.getState().selectedAdventure || '';

        if (!requestedAdventureId) {
            this.resetUIToDefaults();
            window.Diagnostics?.clear?.();
            window.UI?.setStatus?.('Bereit.');
            return;
        }

        window.UI?.setStatus?.('⏳ Abenteuer wird geladen...');

        try {
            const advData = await window.API?.getAdventure?.(requestedAdventureId);

            if (!advData) {
                throw new Error('Abenteuer-Datei fehlt.');
            }

            if (advData.id && advData.id !== requestedAdventureId) {
                window.State.setSelectedAdventure(advData.id);

                const picker = Utils.byId('adventurePicker');
                if (picker) {
                    picker.value = advData.id;
                }
            }

            const cardData = await window.API?.getCards?.(advData.id, advData?.set?.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];
            const masterIndex = await window.API?.getMasterIndex?.(advData?.set?.id);

            if (window.Renderer?.renderSetup) {
                window.Renderer.renderSetup(advData, allCards);
            }

            this.renderStory(advData);
            this.setVictoryDefeat(advData);

            if (window.Combat?.initializeForAdventure) {
                window.Combat.initializeForAdventure(advData, allCards);
            } else {
                if (window.Combat?.updateDashboard) {
                    window.Combat.updateDashboard(window.State.getState().heroStats);
                }
                if (window.Combat?.updatePhaseTracker) {
                    window.Combat.updatePhaseTracker();
                }
            }

            if (window.StorageManager?.applyChecklistState) {
                window.StorageManager.applyChecklistState(window.State.getState().checklist);
            }

            if (window.StorageManager?.applyUIState) {
                window.StorageManager.applyUIState(window.State.getState().sections);
            }

            if (window.StorageManager?.applyCombatState) {
                window.StorageManager.applyCombatState(window.State.getState().combatState);
            }

            if (window.Diagnostics?.runAdventureDiagnostics) {
                window.Diagnostics.runAdventureDiagnostics(advData, allCards, masterIndex, {
                    setKey: advData?.set?.id || 'base_game'
                });
            }

            if (!skipPersist && !this.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }

            window.UI?.setStatus?.(`✅ Abenteuer geladen: ${advData.name}`);
        } catch (error) {
            console.error(error);

            window.Diagnostics?.clear?.();
            window.Diagnostics?.addMessage?.(
                'error',
                'Ladefehler',
                error?.message || 'Unbekannter Fehler beim Laden des Abenteuers.'
            );

            window.UI?.setStatus?.(`❌ Fehler: ${error.message}`);
        }
    },

    async restoreSavedState() {
        const state = window.State.getState();
        if (!state) return;

        this.isApplyingSavedState = true;

        try {
            this.applyStateToControls();

            if (state.selectedAdventure) {
                await this.handleUpdate({ skipPersist: true });
            } else {
                this.resetUIToDefaults();
                window.Diagnostics?.clear?.();
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

                if (window.Combat.updateDashboard) {
                    window.Combat.updateDashboard(state.heroStats);
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
