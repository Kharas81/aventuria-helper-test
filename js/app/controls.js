import Utils from '../core/utils.js';
import State from '../core/state.js';
import ApiFetch from '../core/api-fetch.js';
import AppAdventureFlow from './adventure-flow.js';
import AppPersistence from './persistence.js';

export const AppControls = {
    getElements() {
        return {
            picker: Utils.byId('adventurePicker'),
            heroCount: Utils.byId('heroCount'),
            difficulty: Utils.byId('difficulty'),
            saveBtn: Utils.byId('saveStateBtn'),
            clearBtn: Utils.byId('clearStateBtn')
        };
    },

    async populateAdventurePicker() {
        const { picker } = this.getElements();
        if (!picker) return;

        const previouslySelected = State.getState()?.selectedAdventure || '';

        picker.innerHTML = '';
        picker.appendChild(new Option('Bitte wählen ...', ''));

        try {
            const adventures = await ApiFetch.getAvailableAdventures();
            const enabledSets = window.CONFIG?.getEnabledSets?.() || [];
            const showSetPrefix = enabledSets.length > 1;

            Utils.normalizeArray(adventures).forEach(adventure => {
                const label = showSetPrefix
                    ? `${adventure?.set?.shortName || adventure?.set?.name || 'Set'} · ${adventure.name}`
                    : adventure.name;

                picker.appendChild(new Option(label, adventure.id));
            });

            const optionExists = Array.from(picker.options).some(
                option => option.value === previouslySelected
            );

            if (previouslySelected && !optionExists) {
                picker.appendChild(
                    new Option(`${previouslySelected} (alt/extern)`, previouslySelected)
                );
            }

            picker.value = previouslySelected || '';
        } catch (error) {
            console.error('Fehler beim Aufbau der Abenteuerliste:', error);
            window.UI?.setStatus?.('⚠️ Abenteuerliste konnte nicht geladen werden.');
        }
    },

    bindAdventurePicker() {
        const { picker } = this.getElements();
        if (!picker || picker.dataset.boundChange === 'true') return;

        picker.addEventListener('change', () => {
            State.setSelectedAdventure(picker.value);
            AppAdventureFlow.handleUpdate();
        });

        picker.dataset.boundChange = 'true';
    },

    bindHeroCount() {
        const { heroCount } = this.getElements();
        if (!heroCount || heroCount.dataset.boundChange === 'true') return;

        heroCount.addEventListener('change', () => {
            State.setHeroCount(heroCount.value);
            window.Combat?.updateDashboard?.();

            if (!window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }
        });

        heroCount.dataset.boundChange = 'true';
    },

    bindDifficulty() {
        const { difficulty } = this.getElements();
        if (!difficulty || difficulty.dataset.boundChange === 'true') return;

        difficulty.addEventListener('change', () => {
            State.setDifficulty(difficulty.value);
            window.Combat?.updateEpResult?.();

            if (!window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }
        });

        difficulty.dataset.boundChange = 'true';
    },

    bindSaveButton() {
        const { saveBtn } = this.getElements();
        if (!saveBtn || saveBtn.dataset.boundClick === 'true') return;

        saveBtn.addEventListener('click', () => {
            AppPersistence.saveCurrentState();
        });

        saveBtn.dataset.boundClick = 'true';
    },

    bindClearButton() {
        const { clearBtn } = this.getElements();
        if (!clearBtn || clearBtn.dataset.boundClick === 'true') return;

        clearBtn.addEventListener('click', async () => {
            await AppPersistence.clearSavedState();
        });

        clearBtn.dataset.boundClick = 'true';
    },

    bindEvents() {
        this.bindAdventurePicker();
        this.bindHeroCount();
        this.bindDifficulty();
        this.bindSaveButton();
        this.bindClearButton();
    }
};

export default AppControls;
