window.Renderer = {
    // --- FASSADE: Alle Aufrufe werden an die zuständigen Module weitergereicht ---

    renderSetup(adventure, allCards) {
        window.RenderSetup?.renderSetup(adventure, allCards);
    },

    openCardDetail(card) {
        window.RenderCardDetail?.openCardDetail(card);
    },

    closeCardDetail() {
        window.RenderCardDetail?.closeCardDetail();
    },

    ensureCardDetailModal() {
        return window.RenderCardDetail?.ensureCardDetailModal();
    }
};
