window.DiagnosticsRenderer = {
    getSectionEl() {
        return Utils.byId('diagnostics-section');
    },

    getSummaryEl() {
        return Utils.byId('diagnostics-summary');
    },

    getDetailsEl() {
        return Utils.byId('diagnostics-details');
    },

    getStatusText(summary) {
        const { errorCount, warningCount } = summary;

        if (errorCount > 0) {
            return '❌ Fehler gefunden';
        }

        if (warningCount > 0) {
            return '⚠ Warnungen vorhanden';
        }

        return '✅ Keine Probleme';
    },

    getStatusClassName(summary) {
        const { errorCount, warningCount } = summary;

        if (errorCount > 0) return 'error';
        if (warningCount > 0) return 'warning';
        return 'success';
    },

    renderSummary(state) {
        const summaryEl = this.getSummaryEl();
        if (!summaryEl) return;

        if (!state.visible) {
            summaryEl.innerHTML = '';
            return;
        }

        const { errorCount, warningCount, infoCount } = state.summary;
        const statusText = this.getStatusText(state.summary);
        const toggleLabel = state.detailsOpen ? 'Diagnose schließen' : 'Diagnose öffnen';

        summaryEl.innerHTML = `
            <div class="card-list diagnostics-summary-bar diagnostics-${Utils.escapeHtml(this.getStatusClassName(state.summary))}" style="padding:12px; margin:0;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
                    <div>
                        <div style="font-weight:bold; margin-bottom:6px;">${Utils.escapeHtml(statusText)}</div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap;">
                            <span><strong>Fehler:</strong> ${Utils.escapeHtml(errorCount)}</span>
                            <span><strong>Warnungen:</strong> ${Utils.escapeHtml(warningCount)}</span>
                            <span><strong>Infos:</strong> ${Utils.escapeHtml(infoCount)}</span>
                        </div>
                    </div>

                    <div class="button-group">
                        <button class="btn-outline" type="button" data-action="toggle-diagnostics-details">
                            ${Utils.escapeHtml(toggleLabel)}
                        </button>
                        <button class="btn-outline" type="button" data-action="clear-diagnostics">
                            Diagnose leeren
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderDetails(state) {
        const detailsEl = this.getDetailsEl();
        if (!detailsEl) return;

        detailsEl.classList.toggle('hidden', !state.detailsOpen);

        if (!state.visible || !state.detailsOpen) {
            detailsEl.innerHTML = '';
            return;
        }

        detailsEl.innerHTML = state.sections.map(section => {
            const badge = section.errors.length > 0
                ? '❌'
                : section.warnings.length > 0
                    ? '⚠️'
                    : '✅';

            const metaHtml = Object.keys(section.meta).length
                ? `
                    <div style="margin-top:8px; font-size:0.95em; opacity:0.9;">
                        ${Object.entries(section.meta).map(([key, value]) => `
                            <div><strong>${Utils.escapeHtml(key)}:</strong> ${Utils.escapeHtml(value)}</div>
                        `).join('')}
                    </div>
                `
                : '';

            const listBlock = (title, items) => {
                if (!items.length) return '';
                return `
                    <div style="margin-top:10px;">
                        <strong>${Utils.escapeHtml(title)}</strong>
                        <ul style="margin:8px 0 0 18px;">
                            ${items.map(item => `<li>${Utils.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            };

            return `
                <div class="card-list" style="margin-top:12px;">
                    <h3 style="margin-top:0;">${badge} ${Utils.escapeHtml(section.title)}</h3>
                    ${metaHtml}
                    ${listBlock('Fehler', section.errors)}
                    ${listBlock('Warnungen', section.warnings)}
                    ${listBlock('Infos', section.info)}
                </div>
            `;
        }).join('');
    },

    render(state) {
        const sectionEl = this.getSectionEl();
        if (!sectionEl) return;

        sectionEl.classList.toggle('hidden', !state.visible);

        this.renderSummary(state);
        this.renderDetails(state);
    }
};
