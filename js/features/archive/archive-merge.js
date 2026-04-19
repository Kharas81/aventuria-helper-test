import Utils from '../../core/utils.js';
import ArchiveScoring from './archive-scoring.js';
import ArchivePreference from './archive-preference.js';
import ArchiveSort from './archive-sort.js';

export const ArchiveMerge = {
    inferSourceScope(card = {}) {
        return ArchivePreference.inferSourceScope(card);
    },

    getPriority(card = {}) {
        return ArchivePreference.getPriority(card);
    },

    hasUsableImage(card = {}) {
        return ArchiveScoring.hasUsableImage(card);
    },

    getCompletenessScore(card = {}) {
        return ArchiveScoring.getCompletenessScore(card);
    },

    annotateCard(card = {}, options = {}) {
        return ArchivePreference.annotateCard(card, options);
    },

    choosePreferred(existingCard = {}, candidateCard = {}) {
        return ArchivePreference.choosePreferred(existingCard, candidateCard);
    },

    mergeCards(cards = []) {
        const merged = new Map();

        for (const rawCard of Utils.normalizeArray(cards)) {
            const card = this.annotateCard(rawCard);
            const id = Utils.normalizeString(card?.id);

            if (!id) {
                continue;
            }

            if (!merged.has(id)) {
                merged.set(id, card);
                continue;
            }

            const existingCard = merged.get(id);
            merged.set(id, this.choosePreferred(existingCard, card));
        }

        return Array.from(merged.values());
    },

    sortCards(cards = []) {
        return ArchiveSort.sortCards(cards);
    }
};

export default ArchiveMerge;
