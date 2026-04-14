window.UIModals = {
    closeAll() {
        // Alle Modal-Backdrops ausblenden
        Utils.qsa('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        // Eventuelle Previews schließen
        if (window.UIPreview) {
            window.UIPreview.close();
        }

        // Falls die Karten-Detailansicht offen ist, sicherstellen dass sie resettet wird
        if (window.Renderer?.closeCardDetail) {
            window.Renderer.closeCardDetail();
        }
    }
};
