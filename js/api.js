window.API = {
    cache: {
        adventures: {},
        cards: []
    },

    async loadJSON(path) {
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error("Fehler beim Laden:", path, err);
            return null;
        }
    },

    // -----------------------------
    // 🧭 ADVENTURES (FIXED PATH!)
    // -----------------------------
    async getAdventure(id) {
        if (!id) return null;

        if (this.cache.adventures[id]) {
            return this.cache.adventures[id];
        }

        const path = `data/adventures/base_game/${id}.json`;
        const data = await this.loadJSON(path);

        if (!data) {
            console.error("Abenteuer-Datei fehlt:", path);
            return null;
        }

        this.cache.adventures[id] = data;
        return data;
    },

    // -----------------------------
    // 🧩 MASTER CARD INDEX
    // -----------------------------
    async getMasterIndex(setKey = "base_game") {
        if (this.cache.cards.length) {
            return this.cache.cards;
        }

        const path = `data/cards/${setKey}/catalog/`;
        const files = [
            "zs_leute.json",
            "kg_risiko_gewinn.json",
            "lg_leute_idol.json",
            "ha_das_spiel_spielen.json"
        ];

        const results = await Promise.all(
            files.map(file => this.loadJSON(path + file))
        );

        this.cache.cards = results.filter(Boolean);
        return this.cache.cards;
    },

    // -----------------------------
    // 🔎 FIND CARD
    // -----------------------------
    findCardById(id) {
        return this.cache.cards.find(c => c.id === id) || null;
    },

    // -----------------------------
    // 🔍 CARD DETAIL MODAL
    // -----------------------------
    openCardDetailById(id) {
        const card = this.findCardById(id);
        if (!card) return;

        if (window.Renderer) {
            window.Renderer.openCardDetail(card);
        }
    }
};
