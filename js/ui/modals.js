import Utils from '../core/utils.js';
import UIPreview from './preview.js';

export const UIModals = {
    closeAll() {
        Utils.qsa('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        UIPreview.close();

        if (window.RenderCardDetail?.closeCardDetail) {
            window.RenderCardDetail.closeCardDetail();
        }
    }
};

export default UIModals;
