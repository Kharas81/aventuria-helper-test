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

function buildSearchHaystack(card = {}, sourceName = '', categoryLabel = '') {
    const parts = [
        card?.id,
        card?.name,
        card?.type,
        card?.card_category,
        categoryLabel,
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

function buildScore(card = {}, terms = [], sourceName = '', categoryLabel = '') {
    if (!terms.length) {
        return 0;
    }

    const fullQuery = terms.join(' ');
    const name = normalizeForSearch(card?.name);
    const tags = normalizeArrayValues(card?.tags);
    const keywords = normalizeArrayValues(card?.keywords);
    const aliases = normalizeArrayValues(card?.search_aliases);
    const haystack = buildSearchHaystack(card, sourceName, categoryLabel);

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
    ALL_CATEGORY_FILTER: '__all__',

    CATEGORY_ORDER: ['schergen', 'anfuehrer', 'abenteuerkarten', 'spezial'],

    CATEGORY_LABELS: {
        schergen: 'Schergen',
        anfuehrer: 'Anführer',
        abenteuerkarten: 'Abenteuerkarten',
        spezial: 'Spezialkarten'
    },

    normalizeForSearch,

    getCardSourceName(card = {}) {
        return Utils.normalizeString(
            card?.set?.name
            || card?.set?.shortName
            || card?.source?.set_name
            || card?.source?.book
        );
    },

    getCardCategoryKey(card = {}) {
        const type = Utils.normalizeString(card?.type).toLowerCase();
        const category = Utils.normalizeString(card?.card_category).toLowerCase();
        const tags = normalizeArrayValues(card?.tags);

        if (
            type === 'minion'
            || category === 'schergenkarte'
            || tags.includes('scherge')
            || tags.includes('schergen')
        ) {
            return 'schergen';
        }

        if (
            type === 'leader'
            || tags.includes('anfuehrer')
            || tags.includes('anführer')
        ) {
            return 'anfuehrer';
        }

        if (
            ['special', 'event', 'story'].includes(type)
            || tags.includes('spezial')
            || tags.includes('ereigniskarte')
        ) {
            return 'spezial';
        }

        return 'abenteuerkarten';
    },

    getCategoryLabel(categoryKey = '') {
        const normalized = Utils.normalizeString(categoryKey).toLowerCase();
        return this.CATEGORY_LABELS[normalized] || 'Kategorie';
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

    getAvailableCategories(cards = []) {
        const found = new Set();

        Utils.normalizeArray(cards).forEach(card => {
            found.add(this.getCardCategoryKey(card));
        });

        return this.CATEGORY_ORDER.filter(key => found.has(key));
    },

    filterCards(cards = [], criteria = '') {
        const options = typeof criteria === 'string'
            ? {
                searchTerm: criteria,
                sourceFilter: this.ALL_SOURCE_FILTER,
                categoryFilter: this.ALL_CATEGORY_FILTER
            }
            : (criteria || {});

        const safeCards = Utils.normalizeArray(cards);
        const searchTerm = Utils.normalizeString(options.searchTerm);
        const normalizedSourceFilter = Utils.normalizeString(options.sourceFilter || this.ALL_SOURCE_FILTER);
        const normalizedCategoryFilter = Utils.normalizeString(options.categoryFilter || this.ALL_CATEGORY_FILTER);

        const terms = normalizeForSearch(searchTerm)
            .split(/\s+/)
            .map(term => term.trim())
            .filter(Boolean);

        const filteredCards = safeCards.filter(card => {
            const sourceName = this.getCardSourceName(card);
            const normalizedSourceName = normalizeForSearch(sourceName);

            const categoryKey = this.getCardCategoryKey(card);
            const normalizedCategoryKey = Utils.normalizeString(categoryKey).toLowerCase();

            const matchesSource = !normalizedSourceFilter
                || normalizedSourceFilter === this.ALL_SOURCE_FILTER
                || normalizedSourceName === normalizeForSearch(normalizedSourceFilter);

            if (!matchesSource) {
                return false;
            }

            const matchesCategory = !normalizedCategoryFilter
                || normalizedCategoryFilter === this.ALL_CATEGORY_FILTER
                || normalizedCategoryKey === Utils.normalizeString(normalizedCategoryFilter).toLowerCase();

            if (!matchesCategory) {
                return false;
            }

            if (!terms.length) {
                return true;
            }

            const categoryLabel = this.getCategoryLabel(categoryKey);
            const haystack = buildSearchHaystack(card, sourceName, categoryLabel);

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

            const categoryLabelA = this.getCategoryLabel(this.getCardCategoryKey(a));
            const categoryLabelB = this.getCategoryLabel(this.getCardCategoryKey(b));

            const scoreDiff = buildScore(b, terms, sourceNameB, categoryLabelB)
                - buildScore(a, terms, sourceNameA, categoryLabelA);

            if (scoreDiff !== 0) {
                return scoreDiff;
            }

            return String(a?.name || '').localeCompare(String(b?.name || ''), 'de');
        });
    }
};

export default ArchiveFilter;
