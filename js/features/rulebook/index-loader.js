import CONFIG from '../../core/config.js';
import Utils from '../../core/utils.js';

export const RulebookIndexLoader = {
    cacheBySet: {},

    normalizePageEntry(entry, setKey = '') {
        const page = Number(entry?.page ?? entry?.p);
        if (!Number.isFinite(page) || page <= 0) {
            return null;
        }

        const resolvedSetKey = CONFIG.normalizeSetKey(setKey);
        const fallbackPath = CONFIG.getManualPagePath(page, resolvedSetKey);

        return {
            page,
            title: Utils.normalizeString(entry?.title || `Seite ${page}`) || `Seite ${page}`,
            path: Utils.normalizeString(entry?.path || fallbackPath) || fallbackPath
        };
    },

    normalizeIndex(rawData, setKey = '') {
        const resolvedSetKey = CONFIG.normalizeSetKey(setKey);
        const setConfig = CONFIG.getSet(resolvedSetKey);

        const pages = Utils.normalizeArray(rawData?.pages)
            .map(entry => this.normalizePageEntry(entry, resolvedSetKey))
            .filter(Boolean)
            .sort((a, b) => a.page - b.page);

        return {
            set: {
                id: Utils.normalizeString(rawData?.set?.id || setConfig.id) || resolvedSetKey,
                name: Utils.normalizeString(rawData?.set?.name || setConfig.name) || resolvedSetKey,
                shortName: Utils.normalizeString(rawData?.set?.shortName || setConfig.shortName || setConfig.name) || resolvedSetKey
            },
            pages
        };
    },

    async load(setKey = '') {
        const resolvedSetKey = CONFIG.normalizeSetKey(setKey);

        if (this.cacheBySet[resolvedSetKey]) {
            return this.cacheBySet[resolvedSetKey];
        }

        const path = CONFIG.getManualIndexPath(resolvedSetKey);
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Manual-Index konnte nicht geladen werden (${response.status}): ${path}`);
        }

        const rawData = await response.json();
        const normalized = this.normalizeIndex(rawData, resolvedSetKey);

        this.cacheBySet[resolvedSetKey] = normalized;
        return normalized;
    },

    getPages(indexData) {
        return Utils.normalizeArray(indexData?.pages);
    },

    getPageEntry(indexData, pageNumber) {
        const page = Number(pageNumber);
        return this.getPages(indexData).find(entry => entry.page === page) || null;
    }
};

export default RulebookIndexLoader;
