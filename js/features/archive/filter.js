import Utils from '../../core/utils.js';

function normalizeForSearch(value = '') {
    return Utils.normalizeString(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function normalizeArrayValues(values = []) {
    return Utils.normalizeArray(values)
        .map(value => normalizeForSearch(value))
        .filter(Boolean);
}

function buildSearchHaystack(card = {}, sourceName = '') {
    const parts = [
        card?.id,
        card?.name,
        card?.type,
        card?.card_category,
        ...(Utils.normalizeArray(card?.subtypes)),
        ...(Utils.normalizeArray(card?.tags)),
        ...(Utils.normalizeArray(card?.custom_tags)),
        ...(Utils.normalizeArray(card?.keywords)),
        ...(Utils.normalizeArray(card?.search_aliases)),
        sourceName,
        card?.search_text,
        card?.source?.note,
        card?.notes
    ];

    return parts
        .map(value => normalizeForSearch(value))
        .filter(Boolean)
        .join(' ');
}

function buildScore(card = {}, terms = [], sourceName = '') {
    if (!terms.length) {
        return 0;
    }

    const fullQuery = terms.join(' ');
    const name = normalizeForSearch(card?.name);
    const tags = normalizeArrayValues(card?.tags);
    const keywords = normalizeArrayValues(card?.keywords);
    const aliases = normalizeArrayValues(card?.search_aliases);
    const haystack = buildSearchHaystack(card, sourceName);

    let score = 0;

    if (name === fullQuery) score += 400;
    if (tags.includes(fullQuery)) score += 260;
    if (keywords.includes(fullQuery)) score += 220;
    if (aliases.includes(fullQuery)) score += 200;

    if (terms.every(term => name.includes(term))) score += 160;
    if (terms.every(term => tags.some(tag => tag.includes(term)))) score += 140;
    if (terms.every(term => keywords.some(keyword => keyword.includes(term)))) score += 120;
    if (terms.every(term => aliases.some(alias => alias.includes(term)))) score += 100;

    score += terms.reduce((total, term) => {
        return total + (haystack.includes(term) ? 10 : 0);
    }, 0);

    return score;
}

export const ArchiveFilter = {
    ALL_SOURCE_FILTER: '__all__',

    normalizeForSearch,

    getCardSourceName(card = {}) {
        return Utils.normalizeString(
            card?.set?.name
            || card?.set?.shortName
            || card?.source?.set_name
            || card?.source?.book
        );
    },

    getAvailableSources(cards = []) {
        const uniqueNames = new Set();

        Utils.normalizeArray(cards).forEach(card => {
            const sourceName = this.getCardSourceName(card);
            if (sourceName) {
                uniqueNames.add(sourceName);
            }
        });

        return Array.from(uniqueNames).sort((a, b) => a.localeCompare(b, 'de'));
    },

    filterCards(cards = [], criteria = '') {
        const options = typeof criteria === 'string'
            ? { searchTerm: criteria, sourceFilter: this.ALL_SOURCE_FILTER }
            : (criteria || {});

        const safeCards = Utils.normalizeArray(cards);
        const searchTerm = Utils.normalizeString(options.searchTerm);
        const normalizedSourceFilter = Utils.normalizeString(options.sourceFilter || this.ALL_SOURCE_FILTER);

        const terms = normalizeForSearch(searchTerm)
            .split(/\s+/)
            .map(term => term.trim())
            .filter(Boolean);

        const filteredCards = safeCards.filter(card => {
            const sourceName = this.getCardSourceName(card);
            const normalizedSourceName = normalizeForSearch(sourceName);

            const matchesSource = !normalizedSourceFilter
                || normalizedSourceFilter === this.ALL_SOURCE_FILTER
                || normalizedSourceName === normalizeForSearch(normalizedSourceFilter);

            if (!matchesSource) {
                return false;
            }

            if (!terms.length) {
                return true;
            }

            const haystack = buildSearchHaystack(card, sourceName);
            return terms.every(term => haystack.includes(term));
        });

        if (!terms.length) {
            return filteredCards.sort((a, b) => {
                return String(a?.name || '').localeCompare(String(b?.name || ''), 'de');
            });
        }

        return filteredCards.sort((a, b) => {
            const sourceNameA = this.getCardSourceName(a);
            const sourceNameB = this.getCardSourceName(b);

            const scoreDiff = buildScore(b, terms, sourceNameB) - buildScore(a, terms, sourceNameA);
            if (scoreDiff !== 0) {
                return scoreDiff;
            }

            return String(a?.name || '').localeCompare(String(b?.name || ''), 'de');
        });
    }
};

export default ArchiveFilter;
