window.UIStatus = {
    getElement() {
        return Utils.byId('loading-status');
    },

    set(message) {
        const status = this.getElement();
        if (status) {
            status.innerText = String(message ?? window.Constants?.ui?.defaultStatusText ?? 'Bereit.');
        }
    },

    reset() {
        this.set(window.Constants?.ui?.defaultStatusText ?? 'Bereit.');
    }
};
