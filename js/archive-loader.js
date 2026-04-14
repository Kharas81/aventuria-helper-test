window.ArchiveLoader = {
    getSuggestedSetKey(currentSet) {
        const activeSet = window.API?.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return currentSet || window.CONFIG?.defaultSet || 'base_game';
    },

    async fetchCardsForSet(setKey) {
        const master = await window.API?.getMasterIndex?.(setKey);
        const entries = Utils.normalizeArray(master?.cards);

        const loadedCards = [];

        for (const entry of entries) {
            try {
                if (entry?.detail_path) {
                    const detail = await window.API.getCatalogCard(entry.detail_path);
                    if (detail) {
                        loadedCards.push(detail);
                        continue;
                    }
                }

                if (entry?.id) {
                    const fallbackCard = await window.API.findCardById(entry.id, setKey);
                    if (fallbackCard) {
                        loadedCards.push(fallbackCard);
                    }
                }
            } catch (error) {
                console.warn('Archivkarte konnte nicht geladen werden:', entry?.id, error);
            }
        }

        return loadedCards;
    }
};
