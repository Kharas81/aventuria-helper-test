window.AppBootstrap = {
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

    bindEvents() {
        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const saveBtn = Utils.byId('saveStateBtn');
        const clearBtn = Utils.byId('clearStateBtn');

        if (picker) {
            picker.addEventListener('change', () => {
                window.State.setSelectedAdventure(picker.value);
                window.AppAdventureFlow?.handleUpdate();
            });
        }

        if (heroCount) {
            heroCount.addEventListener('change', () => {
                window.State.setHeroCount(heroCount.value);
                window.Combat?.updateDashboard?.();
                if (!window.App?.isApplyingSavedState && window.StorageManager) {
                    window.StorageManager.persist();
                }
            });
        }

        if (difficulty) {
            difficulty.addEventListener('change', () => {
                window.State.setDifficulty(difficulty.value);
                window.Combat?.updateEpResult?.();
                if (!window.App?.isApplyingSavedState && window.StorageManager) {
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
                window.AppStateSync?.resetUIToDefaults();
                window.Diagnostics?.clear?.();
                window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
            });
        }

        window.StorageManager?.bindAutoSave?.();
    },

    async restoreSavedState() {
        const state = window.State.getState();
        if (!state) return;

        window.App.isApplyingSavedState = true;

        try {
            window.AppStateSync?.applyStateToControls();

            if (state.selectedAdventure) {
                await window.AppAdventureFlow?.handleUpdate({ skipPersist: true });
            } else {
                window.AppStateSync?.resetUIToDefaults();
                window.Diagnostics?.clear?.();
            }

            window.AppStateSync?.applySavedSubsystems(state);
        } finally {
            window.App.isApplyingSavedState = false;
        }
    }
};
