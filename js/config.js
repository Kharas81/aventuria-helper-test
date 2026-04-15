window.CONFIG = {
    defaultSet: 'base_game',

    paths: {
        dataRoot: 'data',
        adventuresRoot: 'data/adventures',
        cardsRoot: 'data/cards',
        manualRoot: 'data/manual'
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

        /*
        Beispiel für weitere Boxen:
        ,
        wildenstein_box: {
            id: 'wildenstein_box',
            name: 'Aventuria Wildenstein',
            shortName: 'Wildenstein',
            enabled: true,
            adventurePath: 'data/adventures/wildenstein_box',
            adventureIndex: 'data/adventures/wildenstein_box/index.json',
            cardRoot: 'data/cards/wildenstein_box',
            catalogRoot: 'data/cards/wildenstein_box/catalog',
            manualRoot: 'data/manual/wildenstein_box',
            masterIndex: 'data/cards/wildenstein_box/master_wildenstein_box.json',
            theme: {
                cssVars: {
                    '--color-primary': '#3f2a4d',
                    '--color-primary-hover': '#523664',
                    '--color-secondary': '#6d5a87',
                    '--color-bg-body': '#d7d0e2',
                    '--color-bg-panel': '#eee8f6',
                    '--color-bg-panel-alt': '#e2dced',
                    '--color-text': '#241d2d'
                },
                meta: {
                    bodyClass: 'theme-wildenstein',
                    themeName: 'Düster & Mystisch'
                }
            }
        }
        */
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
    }
};
