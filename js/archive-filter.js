window.ArchiveFilter = {
    filterCards(allCards, searchTerm) {
        const term = String(searchTerm ?? '').trim().toLowerCase();

        if (!term) {
            return [...allCards];
        }

        return allCards.filter(card => {
            const name = String(card?.name ?? '').toLowerCase();
            const type = String(card?.type ?? '').toLowerCase();
            const category = String(card?.card_category ?? '').toLowerCase();
            const status = String(card?.status ?? '').toLowerCase();
            const searchText = String(card?.search_text ?? '').toLowerCase();
            const tags = Utils.normalizeArray(card?.tags).join(' ').toLowerCase();
            const customTags = Utils.normalizeArray(card?.custom_tags).join(' ').toLowerCase();
            const keywords = Utils.normalizeArray(card?.keywords).join(' ').toLowerCase();
            const notes = String(card?.note ?? card?.notes ?? '').toLowerCase();

            return (
                name.includes(term) ||
                type.includes(term) ||
                category.includes(term) ||
                status.includes(term) ||
                searchText.includes(term) ||
                tags.includes(term) ||
                customTags.includes(term) ||
                keywords.includes(term) ||
                notes.includes(term)
            );
        });
    }
};
