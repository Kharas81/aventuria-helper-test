import Utils from '../../core/utils.js';

function buildSearchHaystack(card) {
    const parts = [
        card?.id,
        card?.name,
        card?.type,
        card?.card_category,
        ...(Utils.normalizeArray(card?.subtypes)),
        ...(Utils.normalizeArray(card?.tags)),
        ...(Utils.normalizeArray(card?.custom_tags)),
        ...(Utils.normalizeArray(card?.keywords)),
        card?.search_text,
        card?.source?.book,
        card?.source?.note,
        card?.notes
    ];

    return parts
        .map(value => Utils.normalizeString(value).toLowerCase())
        .filter(Boolean)
        .join(' ');
}

export const ArchiveFilter = {
    filterCards(cards = [], searchTerm = '') {
        const safeCards = Utils.normalizeArray(cards);
        const normalizedTerm = Utils.normalizeString(searchTerm).toLowerCase();

        if (!normalizedTerm) {
            return [...safeCards];
        }

        const terms = normalizedTerm
            .split(/\s+/)
            .map(term => term.trim())
            .filter(Boolean);

        return safeCards.filter(card => {
            const haystack = buildSearchHaystack(card);
            return terms.every(term => haystack.includes(term));
        });
    }
};

export default ArchiveFilter;
