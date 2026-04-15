window.UIModals = {
    closeAll() {
        Utils.qsa('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        if (window.UIPreview) {
            window.UIPreview.close();
        }

        if (window.RenderCardDetail?.closeCardDetail) {
            window.RenderCardDetail.closeCardDetail();
        }
    }
};
