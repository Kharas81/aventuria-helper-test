import Utils from '../../core/utils.js';
import ArchiveState from './archive-state.js';
import ArchiveCardMeta from './archive-card-meta.js';

export const ArchiveSelectionFlow = {
    getSelectedCard() {
        const selectedId = ArchiveState.normalizeSelectedCardId(ArchiveState.selectedCardId);
        if (!selectedId) {
            return null;
        }

        return ArchiveState.filteredCards.find(card => {
            return Utils.normalizeString(ArchiveCardMeta.getCardId(card)) === selectedId;
        }) || null;
    },

    syncSelectedCard() {
        const filteredCards = Utils.normalizeArray(ArchiveState.filteredCards);

        if (!filteredCards.length) {
            ArchiveState.selectedCardId = '';
            return;
        }

        const selectedId = ArchiveState.normalizeSelectedCardId(ArchiveState.selectedCardId);
        const hasSelectedCard = filteredCards.some(card => {
            return Utils.normalizeString(ArchiveCardMeta.getCardId(card)) === selectedId;
        });

        if (!hasSelectedCard) {
            ArchiveState.selectedCardId = Utils.normalizeString(
                ArchiveCardMeta.getCardId(filteredCards[0])
            );
        }
    }
};

export default ArchiveSelectionFlow;
