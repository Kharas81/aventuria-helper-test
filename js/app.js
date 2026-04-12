/**
 * js/app.js - Hauptsteuerung + State Restore
 */
window.App = {
    async init() {
        const picker = document.getElementById('adventurePicker');
        const heroCount = document.getElementById('heroCount');
        const difficulty = document.getElementById('difficulty');
        const remainingTime = document.getElementById('remainingTime');

        picker?.addEventListener('change', async () => {
            window.StorageManager?.save({
                currentAdventurePath: picker.value
            });
            await this.handleUpdate();
        });

        heroCount?.addEventListener('change', async () => {
            window.StorageManager?.save({
                heroCount: parseInt(heroCount.value, 10) || 2
            });
            await this.handleUpdate();
        });

        difficulty?.addEventListener('change', () => {
            window.StorageManager?.save({
                difficulty: difficulty.value
            });
        });

        remainingTime?.addEventListener('change', () => {
            window.Combat?.calculateIntermission();
        });

        this.restoreGlobalState();

        if (window.Combat) {
            window.Combat.updateDashboard();
            const state = window.StorageManager?.load();
            if (state) {
                window.Combat.setPhase(state.combatPhase || 0);
            }
        }

        if (picker?.value) {
            await this.handleUpdate(false);
        }

        console.log('App initialisiert.');
    },

    restoreGlobalState() {
        const state = window.StorageManager?.load();
        if (!state) return;

        const picker = document.getElementById('adventurePicker');
        const heroCount = document.getElementById('heroCount');
        const difficulty = document.getElementById('difficulty');
        const remainingTime = document.getElementById('remainingTime');

        if (picker && state.currentAdventurePath) {
            picker.value = state.currentAdventurePath;
        }

        if (heroCount) {
            heroCount.value = String(state.heroCount || 2);
        }

        if (difficulty) {
            difficulty.value = state.difficulty || 'normal';
        }

        if (remainingTime) {
            remainingTime.value = String(state.remainingTime || 0);
        }
    },

    async handleUpdate(persistAdventure = true) {
        const picker = document.getElementById('adventurePicker');
        const status = document.getElementById('loading-status');
        if (!picker || !picker.value) return;

        status.innerText = '⌛ Lade Daten...';

        try {
            const advData = await window.API.getAdventure(picker.value);

            if (!advData) {
                status.innerText = '❌ Fehler: Abenteuer-Datei fehlt.';
                return;
            }

            const cardData = await window.API.getCards(advData.id);

            if (window.Renderer) window.Renderer.renderSetup(advData, cardData.cards);
            if (window.Narrative) window.Narrative.renderStory(advData);

            document.getElementById('setup-display')?.classList.remove('hidden');

            if (window.Combat) {
                window.Combat.updateDashboard();

                const state = window.StorageManager?.load();
                if (state) {
                    window.Combat.setPhase(state.combatPhase || 0);
                }

                window.Combat.calculateIntermission();
            }

            if (persistAdventure) {
                window.StorageManager?.save({
                    currentAdventurePath: picker.value,
                    currentAdventureId: advData.id,
                    heroCount: parseInt(document.getElementById('heroCount')?.value, 10) || 2,
                    difficulty: document.getElementById('difficulty')?.value || 'normal',
                    remainingTime: parseInt(document.getElementById('remainingTime')?.value, 10) || 0
                });
            } else {
                window.StorageManager?.save({
                    currentAdventureId: advData.id
                });
            }

            status.innerText = '✅ Abenteuer geladen.';
        } catch (err) {
            console.error('Ladevorgang abgebrochen:', err);
            status.innerText = `💥 Fehler: ${err.message}`;
            alert('Das Abenteuer konnte nicht geladen werden.');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => window.App.init());
