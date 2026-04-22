import CONFIG_PATHS from './config-paths.js';
import CONFIG_CARDS from './config-cards.js';
import CONFIG_CATALOGS from './config-catalogs.js';
import CONFIG_ARCHIVE from './config-archive.js';
import CONFIG_SETS from './config-sets.js';

export const CONFIG = {
    defaultSet: 'base_game',

    paths: CONFIG_PATHS,
    cards: CONFIG_CARDS,
    catalogs: CONFIG_CATALOGS,
    archive: CONFIG_ARCHIVE,
    sets: CONFIG_SETS,

    normalizeSetKey(setKey = '') {
        const normalized = String(setKey || '').trim();
        return normalized || this.defaultSet;
    },

    getSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return this.sets[normalizedKey] || this.sets[this.defaultSet];
    },

    getEnabledSets() {
        return Object.values(this.sets)
            .filter(setConfig => setConfig?.enabled !== false)
            .map(setConfig => ({
                id: String(setConfig.id ?? '').trim(),
                name: String(setConfig.name ?? setConfig.id ?? '').trim(),
                shortName: String(setConfig.shortName ?? setConfig.name ?? setConfig.id ?? '').trim()
            }))
            .filter(setConfig => setConfig.id);
    },

    getArchiveSets() {
        return Object.values(this.sets)
            .filter(setConfig => setConfig?.archiveEnabled !== false)
            .map(setConfig => ({
                id: String(setConfig.id ?? '').trim(),
                name: String(setConfig.name ?? setConfig.id ?? '').trim(),
                shortName: String(setConfig.shortName ?? setConfig.name ?? setConfig.id ?? '').trim()
            }))
            .filter(setConfig => setConfig.id);
    },

    hasSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return Boolean(this.sets[normalizedKey]);
    },

    getAdventurePath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.adventurePath}/${id}.json`;
    },

    getAdventureIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.adventureIndex;
    },

    getLegacyAdventureCardsPath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.cardRoot}/${id}/${id}.json`;
    },

    getLegacyAdventureCardsMode() {
        const mode = String(this.cards?.legacyAdventureCards?.mode || 'allow').trim().toLowerCase();
        return mode === 'off' ? 'off' : 'allow';
    },

    isLegacyAdventureCardsEnabled() {
        return this.getLegacyAdventureCardsMode() !== 'off';
    },

    shouldWarnOnLegacyAdventureCardsFallback() {
        return Boolean(this.cards?.legacyAdventureCards?.warnOnFallback);
    },

    getMasterIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.masterIndex;
    },

    getCatalogRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.catalogRoot;
    },

    getManualRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.manualRoot;
    },

    getManualIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return `${setConfig.manualRoot}/index.json`;
    },

    getManualPagePath(pageNumber, setKey = '') {
        const setConfig = this.getSet(setKey);
        const page = String(pageNumber).padStart(2, '0');
        return `${setConfig.manualRoot}/page_${page}.json`;
    },

    getSetDisplayName(setKey = '') {
        return this.getSet(setKey)?.name || this.getSet(this.defaultSet)?.name || 'Aventuria';
    },

    getSetShortName(setKey = '') {
        return this.getSet(setKey)?.shortName || this.getSet(setKey)?.name || 'Set';
    },

    getSetTheme(setKey = '') {
        return this.getSet(setKey)?.theme || { cssVars: {}, meta: {} };
    },

    getCatalogConfig(catalogKey = '') {
        const normalizedKey = String(catalogKey || '').trim();
        if (!normalizedKey) {
            return null;
        }

        return this.catalogs?.[normalizedKey] || null;
    },

    getCatalogIndexPath(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.indexFile || '';
    },

    getCatalogDataDir(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.dataDir || '';
    },

    getCatalogImageDir(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.imageDir || '';
    },

    getRuntimeCatalogCardsPath(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.runtimeBundle || '';
    },

    getSupplementalCatalogKeysForSet(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        return Array.isArray(this.archive?.supplementalCatalogsBySet?.[resolvedSetKey])
            ? [...this.archive.supplementalCatalogsBySet[resolvedSetKey]]
            : [];
    },

    getArchiveMergePriority(sourceScope = '') {
        const normalizedScope = String(sourceScope || '').trim();
        return Number(
            this.archive?.mergePriority?.[normalizedScope]
            ?? this.archive?.mergePriority?.unknown
            ?? 0
        );
    }
};

export default CONFIG;
