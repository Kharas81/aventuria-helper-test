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
            masterIndex: 'data/cards/base_game/master_base_game.json'
        }

        /*
        Beispiel für weitere Boxen:
        ,
        irgend_eine_box: {
            id: 'irgend_eine_box',
            name: 'Aventuria Irgendeine Box',
            shortName: 'Irgendeine Box',
            enabled: true,
            adventurePath: 'data/adventures/irgend_eine_box',
            adventureIndex: 'data/adventures/irgend_eine_box/index.json',
            cardRoot: 'data/cards/irgend_eine_box',
            catalogRoot: 'data/cards/irgend_eine_box/catalog',
            manualRoot: 'data/manual/irgend_eine_box',
            masterIndex: 'data/cards/irgend_eine_box/master_irgend_eine_box.json'
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
    }
};
