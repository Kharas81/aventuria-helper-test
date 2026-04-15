import Utils from '../core/utils.js';
import Constants from '../core/constants.js';

export const UIStatus = {
    getElement() {
        return Utils.byId('loading-status');
    },

    set(message) {
        const status = this.getElement();
        if (status) {
            status.innerText = String(message ?? Constants.ui?.defaultStatusText ?? 'Bereit.');
        }
    },

    reset() {
        this.set(Constants.ui?.defaultStatusText ?? 'Bereit.');
    }
};

export default UIStatus;
