export const CONFIG = {
    defaultSet: 'base_game',

    paths: {
        dataRoot: 'data',
        adventuresRoot: 'data/adventures',
        cardsRoot: 'data/cards',
        manualRoot: 'data/manual'
    },

    github: {
        enabled: true,
        owner: 'Kharas81',
        repo: 'aventuria-helper',
        branch: 'main',

        catalogs: {
            schergen: {
                key: 'schergen',
                dataDir: 'data/cards/catalog/schergen',
                imageDir: 'assets/images/cards/schergen',
                defaultType: 'minion',
                defaultCardCategory: 'schergenkarte',
                enabled: true
            }
        }
    },

    sets: {
        base_game: {
            id: 'base_game',
            name: 'Aventuria Grundbox',
            shortName: 'Grundbox',
            enabled: true,
            adventurePath: 'data/adventures/base_game',
            adventureIndex: 'data/adventures/base_game/index.json',
            cardRoot: 'data/cards/base_game',
            catalogRoot: 'data/cards/base_game/catalog',
            manualRoot: 'data/manual/base_game',
            masterIndex: 'data/cards/base_game/master_base_game.json',

            theme: {
                cssVars: {
                    '--color-primary': '#5c1e1e',
                    '--color-primary-hover': '#7a2828',
                    '--color-secondary': '#8b4513',
                    '--color-secondary-soft': '#a0522d',
                    '--color-bg-body': '#dcd0ba',
                    '--color-bg-panel': '#f4e7d3',
                    '--color-bg-panel-alt': '#e6dec9',
                    '--color-text': '#2e241f',
                    '--color-info': '#2c5282',
                    '--color-success': '#276749',
                    '--color-danger': '#9b2c2c'
                },
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Klassisch Aventurisch'
                }
            }
        }
    },

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

    isGitHubEnabled() {
        const github = this.github || {};
        return Boolean(
            github.enabled
            && github.owner
            && github.repo
            && github.branch
        );
    },

    getGitHubApiBase() {
        const github = this.github || {};
        return `https://api.github.com/repos/${github.owner}/${github.repo}/`;
    },

    getGitHubRawBase() {
        const github = this.github || {};
        return `https://raw.githubusercontent.com/${github.owner}/${github.repo}/${github.branch}`;
    },

    getGitHubCatalogConfig(catalogKey = '') {
        const normalizedKey = String(catalogKey || '').trim();
        if (!normalizedKey) {
            return null;
        }

        return this.github?.catalogs?.[normalizedKey] || null;
    },

    getGitHubCatalogDataDir(catalogKey = '') {
        return this.getGitHubCatalogConfig(catalogKey)?.dataDir || '';
    },

    getGitHubCatalogImageDir(catalogKey = '') {
        return this.getGitHubCatalogConfig(catalogKey)?.imageDir || '';
    }
};

export default CONFIG;
