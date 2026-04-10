window.API = {
    async getAdventure(id) {
        try {
            const r = await fetch(`data/adventures/${id}.json`);
            return r.ok ? await r.json() : null;
        } catch(e) { return null; }
    },
    async getCards(id) {
        try {
            const r = await fetch(`data/cards/base_game/${id}.json`);
            return r.ok ? await r.json() : { cards: [] };
        } catch(e) { return { cards: [] }; }
    }
};
