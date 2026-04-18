import Utils from '../core/utils.js';
import UIPreview from './preview.js';
import CoreRuntime from '../core/runtime.js';

export const UIModals = {
    closeAll() {
        Utils.qsa('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        UIPreview.close();
        CoreRuntime.getRenderCardDetail()?.closeCardDetail?.();
    }
};

export default UIModals;
