import Utils from '../core/utils.js';
import ApiCardLookup from '../core/api-card-lookup.js';
import CoreRuntime from '../core/runtime.js';
import {
    normalizeArchiveQuery,
    openArchiveWithSearch
} from './actions-archive.js';

export function getCardDetailActions() {
    return {
        'open-card-detail': async trigger => {
            const preferArchiveSearch = String(
                trigger?.dataset?.preferArchiveSearch || ''
            ).toLowerCase() === 'true';

            const fallbackQuery = normalizeArchiveQuery(
                trigger?.dataset?.archiveQuery
                || trigger?.dataset?.cardQuery
                || trigger?.dataset?.cardLabel
                || ''
            );

            const archiveSource = Utils.normalizeString(trigger?.dataset?.archiveSource);
            const archiveCategory = Utils.normalizeString(trigger?.dataset?.archiveCategory);
            const archiveSet = Utils.normalizeString(trigger?.dataset?.archiveSet);
            const cardId = Utils.normalizeString(trigger?.dataset?.cardId);

            if (preferArchiveSearch && fallbackQuery) {
                openArchiveWithSearch({
                    query: fallbackQuery,
                    sourceFilter: archiveSource,
                    categoryFilter: archiveCategory,
                    setKey: archiveSet
                });
                return;
            }

            if (cardId) {
                const openedCard = await ApiCardLookup.openCardDetailById(cardId);
                if (openedCard) {
                    return;
                }
            }

            if (fallbackQuery) {
                openArchiveWithSearch({
                    query: fallbackQuery,
                    sourceFilter: archiveSource,
                    categoryFilter: archiveCategory,
                    setKey: archiveSet
                });
            }
        },

        'close-card-detail': () => {
            CoreRuntime.getRenderCardDetail()?.closeCardDetail?.();
        }
    };
}

export default {
    getCardDetailActions
};
