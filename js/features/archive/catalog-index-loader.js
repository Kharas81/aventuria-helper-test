import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ApiFetch from '../../core/api-fetch.js';

export const CatalogIndexLoader = {
    buildLocalPath(...parts) {
        return parts
            .map(part => Utils.normalizeString(part).replace(/^\/+|\/+$/g, ''))
            .filter(Boolean)
            .join('/');
    },

    getCatalogConfig(catalogKey = '') {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        if (!resolvedCatalogKey) {
            return null;
        }

        return CONFIG.getCatalogConfig?.(resolvedCatalogKey) || null;
    },

    async getIndex(catalogKey = '') {
        const resolvedCatalogKey = Utils.normalizeString(catalogKey);
        if (!resolvedCatalogKey) {
            return { catalog_key: '', cards: [] };
        }

        return await ApiFetch.getCatalogIndex(resolvedCatalogKey);
    },

    createEntry(fileName = '', catalogConfig = null) {
        const safeFileName = Utils.normalizeString(fileName);
        if (!safeFileName || !catalogConfig) {
            return null;
        }

        return {
            catalogKey: Utils.normalizeString(catalogConfig.key),
            fileName: safeFileName,
            fileStem: safeFileName.replace(/\.json$/i, ''),
            filePath: this.buildLocalPath(catalogConfig.dataDir, safeFileName),
            imageDir: Utils.normalizeString(catalogConfig.imageDir),
            defaultType: Utils.normalizeString(catalogConfig.defaultType),
            defaultCardCategory: Utils.normalizeString(catalogConfig.defaultCardCategory)
        };
    },

    async getEntries(catalogKey = '') {
        const catalogConfig = this.getCatalogConfig(catalogKey);

        if (!catalogConfig?.enabled) {
            return [];
        }

        const index = await this.getIndex(catalogKey);

        return Utils.normalizeArray(index?.cards)
            .map(fileName => this.createEntry(fileName, catalogConfig))
            .filter(Boolean);
    }
};

export default CatalogIndexLoader;
