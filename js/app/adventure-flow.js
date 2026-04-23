import Utils from '../core/utils.js';
import State from '../core/state.js';
import Constants from '../core/constants.js';
import Events from '../core/events.js';
import ApiFetch from '../core/api-fetch.js';
import ApiCardLookup from '../core/api-card-lookup.js';
import AppStateSync from './state-sync.js';
import AppRuntime from './runtime.js';
import SessionUI from '../render/session/session-ui.js';

export const AppAdventureFlow = {
    renderStory(adventure) {
        const narrative = AppRuntime.getNarrative();

        if (narrative?.renderStory) {
            narrative.renderStory(adventure);
            return;
        }

        const container = Utils.byId('story-area');
        if (container) {
            container.innerHTML = '';
        }
    },

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;
        const requestedAdventureId = State.getState().selectedAdventure || '';

        if (!requestedAdventureId) {
            AppStateSync.resetUIToDefaults();
            AppRuntime.clearDiagnostics();
            AppRuntime.setStatus(Constants.ui?.defaultStatusText ?? 'Bereit.');
            SessionUI.syncStatusStrip();
            return;
        }

        AppRuntime.setStatus('⏳ Abenteuer wird geladen...');

        try {
            const advData = await ApiFetch.getAdventure(requestedAdventureId);

            if (!advData) {
                throw new Error('Abenteuer-Datei fehlt.');
            }

            if (advData.id && advData.id !== requestedAdventureId) {
                State.setSelectedAdventure(advData.id);
                const picker = Utils.byId('adventurePicker');
                if (picker) {
                    picker.value = advData.id;
                }
            }

            const cardData = await ApiCardLookup.getCards(advData.id, advData?.set?.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];
            const masterIndex = await ApiFetch.getMasterIndex(advData?.set?.id);

            AppRuntime.getRenderSetup()?.renderSetup?.(advData, allCards);
            this.renderStory(advData);
            AppStateSync.setVictoryDefeat(advData);

            const combat = AppRuntime.getCombat();

            if (combat?.initializeForAdventure) {
                combat.initializeForAdventure(advData, allCards);
            } else {
                combat?.updateDashboard?.(State.getState().heroStats);
                combat?.updatePhaseTracker?.();
            }

            AppStateSync.applySavedSubsystems(State.getState());

            AppRuntime.getDiagnostics()?.requestAdventureDiagnostics?.(advData, allCards, masterIndex, {
                setKey: advData?.set?.id || 'base_game'
            });

            Events.emit(Constants.events?.archiveSetChanged || 'archive:setChanged', {
                source: 'adventure',
                setKey: advData?.set?.id || 'base_game',
                adventureId: advData?.id || ''
            });

            Events.emit(Constants.events?.setChanged || 'set:changed', {
                source: 'adventure',
                setKey: advData?.set?.id || 'base_game',
                adventureId: advData?.id || ''
            });

            if (!skipPersist) {
                AppRuntime.persistIfAllowed();
            }

            AppRuntime.setStatus(`✅ Abenteuer geladen: ${advData.name}`);
            SessionUI.syncStatusStrip();
        } catch (error) {
            console.error(error);
            AppRuntime.clearDiagnostics();
            AppRuntime.getDiagnostics()?.addMessage?.(
                'error',
                'Ladefehler',
                error?.message || 'Unbekannter Fehler beim Laden des Abenteuers.'
            );
            AppRuntime.setStatus(`❌ Fehler: ${error.message}`);
            SessionUI.syncStatusStrip();
        }
    }
};

export default AppAdventureFlow;
