window.Diagnostics = {
    state: {
        visible: false,
        detailsOpen: false,
        summary: {
            errorCount: 0,
            warningCount: 0,
            infoCount: 0
        },
        sections: []
    },

    isBound: false,

    createEmptyState() {
        return {
            visible: false,
            detailsOpen: false,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };
    },

    render() {
        window.DiagnosticsRenderer?.render?.(this.state);
    },

    setState(nextState) {
        const safeState = nextState && typeof nextState === 'object'
            ? nextState
            : this.createEmptyState();

        this.state = {
            ...this.createEmptyState(),
            ...safeState,
            summary: {
                ...this.createEmptyState().summary,
                ...(safeState.summary && typeof safeState.summary === 'object' ? safeState.summary : {})
            },
            sections: Array.isArray(safeState.sections) ? safeState.sections : []
        };

        this.render();
    },

    clear() {
        this.setState(this.createEmptyState());
    },

    recalculateSummary() {
        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        this.state.sections.forEach(section => {
            errorCount += Array.isArray(section.errors) ? section.errors.length : 0;
            warningCount += Array.isArray(section.warnings) ? section.warnings.length : 0;
            infoCount += Array.isArray(section.info) ? section.info.length : 0;
        });

        this.state.summary = {
            errorCount,
            warningCount,
            infoCount
        };

        this.state.visible = errorCount > 0 || warningCount > 0 || infoCount > 0;
    },

    addSection(title, result, options = {}) {
        const safeResult = result && typeof result === 'object'
            ? result
            : { ok: true, errors: [], warnings: [], info: [] };

        this.state.sections.push({
            title: String(title ?? 'Diagnose'),
            ok: Boolean(safeResult.ok),
            errors: Array.isArray(safeResult.errors) ? safeResult.errors : [],
            warnings: Array.isArray(safeResult.warnings) ? safeResult.warnings : [],
            info: Array.isArray(safeResult.info) ? safeResult.info : [],
            meta: options.meta && typeof options.meta === 'object' ? options.meta : {}
        });

        this.recalculateSummary();
        this.render();
    },

    addMessage(type, title, message) {
        this.addSection(title, {
            ok: type !== 'error',
            errors: type === 'error' ? [message] : [],
            warnings: type === 'warning' ? [message] : [],
            info: type === 'info' ? [message] : []
        });
    },

    applyValidationReport(payload = {}) {
        const report = payload?.report && typeof payload.report === 'object'
            ? payload.report
            : this.createEmptyState();

        this.setState({
            ...this.createEmptyState(),
            ...report,
            detailsOpen: false
        });
    },

    requestAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        window.Events?.emit?.(
            window.Constants?.events?.diagnosticsRequested || 'diagnostics:requested',
            { adventure, cards, masterIndex, context }
        );
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        this.requestAdventureDiagnostics(adventure, cards, masterIndex, context);
    },

    toggleDetails() {
        this.state.detailsOpen = !this.state.detailsOpen;
        this.render();
    },

    bindEvents() {
        if (this.isBound) {
            return;
        }

        window.Events?.on?.(
            window.Constants?.events?.diagnosticsRequested || 'diagnostics:requested',
            payload => {
                window.DiagnosticsRunner?.runAdventureDiagnostics?.(
                    payload?.adventure,
                    payload?.cards,
                    payload?.masterIndex,
                    payload?.context || {}
                );
            }
        );

        window.Events?.on?.(
            window.Constants?.events?.validationFinished || 'validation:finished',
            payload => {
                this.applyValidationReport(payload);
            }
        );

        this.isBound = true;
    },

    init() {
        this.bindEvents();
        this.render();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Diagnostics?.init) {
        window.Diagnostics.init();
    }
});
