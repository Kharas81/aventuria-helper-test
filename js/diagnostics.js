window.Diagnostics = {
    get state() {
        return window.DiagnosticsRunner?.state || {};
    },

    clear() {
        window.DiagnosticsRunner?.clear();
    },

    addMessage(type, title, message) {
        window.DiagnosticsRunner?.addMessage(type, title, message);
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context) {
        window.DiagnosticsRunner?.runAdventureDiagnostics(adventure, cards, masterIndex, context);
    },

    toggleDetails() {
        window.DiagnosticsRunner?.toggleDetails();
    },

    init() {
        window.DiagnosticsRunner?.init();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Diagnostics?.init) {
        window.Diagnostics.init();
    }
});
