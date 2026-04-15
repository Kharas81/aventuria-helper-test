window.AppAdventureFlow = {
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

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;
        const requestedAdventureId = window.State.getState().selectedAdventure || '';

        if (!requestedAdventureId) {
            window.AppStateSync?.resetUIToDefaults();
            window.Diagnostics?.clear?.();
            window.UI?.setStatus?.(window.Constants?.ui?.defaultStatusText ?? 'Bereit.');
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
                if (picker) picker.value = advData.id;
            }

            const cardData = await window.API?.getCards?.(advData.id, advData?.set?.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];
            const masterIndex = await window.API?.getMasterIndex?.(advData?.set?.id);

            window.RenderSetup?.renderSetup?.(advData, allCards);
            this.renderStory(advData);
            window.AppStateSync?.setVictoryDefeat(advData);

            if (window.Combat?.initializeForAdventure) {
                window.Combat.initializeForAdventure(advData, allCards);
            } else {
                window.Combat?.updateDashboard?.(window.State.getState().heroStats);
                window.Combat?.updatePhaseTracker?.();
            }

            window.AppStateSync?.applySavedSubsystems(window.State.getState());

            window.Diagnostics?.requestAdventureDiagnostics?.(advData, allCards, masterIndex, {
                setKey: advData?.set?.id || 'base_game'
            });

            window.Events?.emit?.(
                window.Constants?.events?.setChanged || 'set:changed',
                {
                    source: 'adventure',
                    setKey: advData?.set?.id || 'base_game',
                    adventureId: advData?.id || ''
                }
            );

            if (!skipPersist && !window.App?.isApplyingSavedState && window.StorageManager) {
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
    }
};
