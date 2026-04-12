/**
 * js/app.js - Hauptsteuerung der App
 */
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
                if (window.Combat) window.Combat.updateDashboard();
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

        if (window.Combat) {
            window.Combat.updateDashboard();
        }

        if (window.StorageManager) {
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
        if (title) title.innerText = '';
        if (blueCards) blueCards.innerHTML = '';
        if (minions) minions.innerHTML = '';
        if (special) special.innerHTML = '<h3>Spezialkarten</h3><ul></ul>';
        if (dangerValue) dangerValue.innerHTML = '';
        if (remainingTime) remainingTime.value = '0';
        if (epResult) epResult.innerText = '2 EP';
        if (targetResult) targetResult.innerText = '--';

        document.querySelectorAll('.hidden-section').forEach(section => {
            section.classList.remove('show');
        });

        if (window.Combat) {
            window.Combat.resetPhase();
            window.Combat.updateDashboard();
        }
    },

    async restoreSavedState() {
        if (!window.StorageManager) return;

        const state = window.StorageManager.loadState();
        if (!state) return;

        const picker = document.getElementById('adventurePicker');
        const heroCount = document.getElementById('heroCount');
        const difficulty = document.getElementById('difficulty');

        this.isApplyingSavedState = true;

        if (heroCount) heroCount.value = String(state.heroCount ?? 2);
        if (difficulty) difficulty.value = state.difficulty || 'normal';

        if (window.Combat) {
            window.Combat.updateDashboard();
        }

        if (picker && state.selectedAdventure) {
            picker.value = state.selectedAdventure;
            await this.handleUpdate(state);
            this.setStatus('📂 Spielstand geladen.');
        } else {
            if (window.StorageManager) {
                window.StorageManager.applyUIState(state.sections);
                window.StorageManager.applyHeroStats(state.heroStats);
            }
        }

        this.isApplyingSavedState = false;
    },

    async handleUpdate(savedState = null) {
        const picker = document.getElementById('adventurePicker');
        const status = document.getElementById('loading-status');

        if (!picker || !picker.value) return;

        if (status) status.innerText = '⌛ Lade Daten...';

        try {
            if (!window.API) {
                throw new Error('API-Modul ist noch nicht bereit. Bitte Seite neu laden.');
            }

            const advData = await window.API.getAdventure(picker.value);

            if (!advData) {
                if (status) status.innerText = '❌ Fehler: Abenteuer-Datei fehlt.';
                return;
            }

            const cardData = await window.API.getCards(advData.id);

            if (window.Renderer) {
                window.Renderer.renderSetup(advData, cardData.cards);
            }

            if (window.Narrative) {
                window.Narrative.renderStory(advData);
            }

            document.getElementById('setup-display')?.classList.remove('hidden');

            if (window.Combat) {
                window.Combat.resetPhase();
                window.Combat.updateDashboard();
            }

            const stateToApply = savedState || (window.StorageManager ? window.StorageManager.loadState() : null);

            if (stateToApply) {
                if (window.Combat && Number.isInteger(stateToApply.combatPhase) && stateToApply.combatPhase > 0) {
                    window.Combat.currentPhase = 0;
                    for (let i = 0; i < stateToApply.combatPhase; i++) {
                        window.Combat.nextPhase();
                    }
                }

                if (window.StorageManager) {
                    window.StorageManager.applyHeroStats(stateToApply.heroStats);
                    window.StorageManager.applyChecklistState(stateToApply.checklist);
                    window.StorageManager.applyUIState(stateToApply.sections);
                }
            }

            if (!savedState && window.StorageManager && !this.isApplyingSavedState) {
                window.StorageManager.persist();
            }

            if (status) status.innerText = '✅ Abenteuer geladen.';
        } catch (err) {
            console.error('Ladevorgang abgebrochen:', err);
            if (status) status.innerText = `💥 Fehler: ${err.message}`;
            alert('Das Abenteuer konnte nicht geladen werden.');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.App.init();
});
