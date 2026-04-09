const API = {
    async getAdventure(id) {
        const r = await fetch(`${CONFIG.paths.adventures}${id}.json`);
        return r.ok ? await r.json() : null;
    },
    async getCards(id) {
        const r = await fetch(`${CONFIG.paths.cardsBase}${id}.json`);
        return r.ok ? await r.json() : { cards: [] };
    }
};
