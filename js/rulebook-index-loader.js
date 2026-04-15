window.RulebookIndexLoader = {
    cacheBySet: {},

    normalizePageEntry(entry, setKey = '') {
        const page = Number(entry?.page ?? entry?.p);
        if (!Number.isFinite(page) || page <= 0) {
            return null;
        }

        const normalizedSetKey = window.CONFIG?.normalizeSetKey?.(setKey) || setKey || 'base_game';
        const fallbackPath = window.CONFIG?.getManualPagePath?.(page, normalizedSetKey)
            || `data/manual/${normalizedSetKey}/page_${String(page).padStart(2, '0')}.json`;

        return {
            page,
            title: String(entry?.title ?? `Seite ${page}`).trim() || `Seite ${page}`,
            path: String(entry?.path ?? fallbackPath).trim() || fallbackPath
        };
    },

    normalizeIndex(rawData, setKey = '') {
        const normalizedSetKey = window.CONFIG?.normalizeSetKey?.(setKey) || setKey || 'base_game';
        const setConfig = window.CONFIG?.getSet?.(normalizedSetKey) || {};

        const pages = window.Utils.normalizeArray(rawData?.pages)
            .map(entry => this.normalizePageEntry(entry, normalizedSetKey))
            .filter(Boolean)
            .sort((a, b) => a.page - b.page);

        return {
            set: {
                id: String(rawData?.set?.id ?? setConfig.id ?? normalizedSetKey).trim() || normalizedSetKey,
                name: String(rawData?.set?.name ?? setConfig.name ?? normalizedSetKey).trim() || normalizedSetKey,
                shortName: String(rawData?.set?.shortName ?? setConfig.shortName ?? setConfig.name ?? normalizedSetKey).trim() || normalizedSetKey
            },
            pages
        };
    },

    async load(setKey = '') {
        const normalizedSetKey = window.CONFIG?.normalizeSetKey?.(setKey) || setKey || 'base_game';

        if (this.cacheBySet[normalizedSetKey]) {
            return this.cacheBySet[normalizedSetKey];
        }

        const path = window.CONFIG?.getManualIndexPath?.(normalizedSetKey)
            || `data/manual/${normalizedSetKey}/index.json`;

        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Manual-Index konnte nicht geladen werden (${response.status}): ${path}`);
        }

        const rawData = await response.json();
        const normalized = this.normalizeIndex(rawData, normalizedSetKey);

        this.cacheBySet[normalizedSetKey] = normalized;
        return normalized;
    },

    getPages(indexData) {
        return window.Utils.normalizeArray(indexData?.pages);
    },

    getPageEntry(indexData, pageNumber) {
        const page = Number(pageNumber);
        return this.getPages(indexData).find(entry => entry.page === page) || null;
    }
};
