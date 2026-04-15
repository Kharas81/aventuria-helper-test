import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ApiFetch from '../../core/api-fetch.js';
import ApiCardLookup from '../../core/api-card-lookup.js';

export const ArchiveLoader = {
    normalizeSetKey(setKey = '') {
        return Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );
    },

    getSuggestedSetKey(currentSet = '') {
        const activeSet = ApiCardLookup.getActiveSetKey?.();
        if (activeSet && CONFIG.hasSet?.(activeSet)) {
            return activeSet;
        }

        return this.normalizeSetKey(currentSet);
    },

    async getMasterEntries(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const masterIndex = await ApiFetch.getMasterIndex(resolvedSetKey);

        return Utils.normalizeArray(masterIndex?.cards);
    },

    async loadEntryDetail(entry, setKey = '') {
        if (entry?.detail_path) {
            const detail = await ApiCardLookup.getCatalogCard(entry.detail_path);
            if (detail) {
                return detail;
            }
        }

        if (entry?.id) {
            return await ApiCardLookup.findCardById(entry.id, setKey);
        }

        return null;
    },

    sortCards(cards = []) {
        return [...Utils.normalizeArray(cards)].sort((a, b) => {
            const categoryA = Utils.normalizeString(a?.card_category || a?.type);
            const categoryB = Utils.normalizeString(b?.card_category || b?.type);

            if (categoryA !== categoryB) {
                return categoryA.localeCompare(categoryB, 'de');
            }

            const nameA = Utils.normalizeString(a?.name || a?.id);
            const nameB = Utils.normalizeString(b?.name || b?.id);

            return nameA.localeCompare(nameB, 'de');
        });
    },

    async fetchCardsForSet(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const entries = await this.getMasterEntries(resolvedSetKey);
        const loadedCards = [];

        for (const entry of entries) {
            try {
                const card = await this.loadEntryDetail(entry, resolvedSetKey);
                if (card) {
                    loadedCards.push(card);
                }
            } catch (error) {
                console.warn(
                    'Archivkarte konnte nicht geladen werden:',
                    entry?.id || entry?.detail_path || 'unbekannt',
                    error
                );
            }
        }

        return this.sortCards(loadedCards);
    }
};

export default ArchiveLoader;
