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
            adventurePath: 'data/adventures/base_game',
            cardRoot: 'data/cards/base_game',
            catalogRoot: 'data/cards/base_game/catalog',
            manualRoot: 'data/manual/base_game',
            masterIndex: 'data/cards/base_game/master_base_game.json'
        }
    },

    getSet(setKey = 'base_game') {
        const normalizedKey = String(setKey || this.defaultSet).trim() || this.defaultSet;
        return this.sets[normalizedKey] || this.sets[this.defaultSet];
    },

    getAdventurePath(adventureId, setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.adventurePath}/${id}.json`;
    },

    getLegacyAdventureCardsPath(adventureId, setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.cardRoot}/${id}/${id}.json`;
    },

    getMasterIndexPath(setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        return setConfig.masterIndex;
    },

    getCatalogRoot(setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        return setConfig.catalogRoot;
    },

    getManualPagePath(pageNumber, setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        const page = String(pageNumber).padStart(2, '0');
        return `${setConfig.manualRoot}/page_${page}.json`;
    }
};
