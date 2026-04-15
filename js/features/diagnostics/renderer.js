import Utils from '../../core/utils.js';
import UIComponents from '../../ui/components.js';

function getSummaryVariant(summary = {}) {
    if ((summary.errorCount ?? 0) > 0) return 'danger';
    if ((summary.warningCount ?? 0) > 0) return 'warning';
    return 'success';
}

export const DiagnosticsRenderer = {
    getElements() {
        return {
            section: Utils.byId('diagnostics-section'),
            summary: Utils.byId('diagnostics-summary'),
            details: Utils.byId('diagnostics-details')
        };
    },

    renderSummary(state) {
        const { summary } = state;

        const badges = [
            UIComponents.renderBadge(`${summary.errorCount ?? 0} Fehler`, 'danger'),
            UIComponents.renderBadge(`${summary.warningCount ?? 0} Warnungen`, 'warning'),
            UIComponents.renderBadge(`${summary.infoCount ?? 0} Hinweise`, 'info')
        ].join(' ');

        return UIComponents.renderSection(
            'Diagnose',
            `
                <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; align-items:center;">
                    <div>
                        ${UIComponents.renderBadge('Status', getSummaryVariant(summary))}
                        <span style="margin-left:8px;">Prüfergebnisse für aktuelle Daten</span>
                    </div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        ${badges}
                        ${UIComponents.renderButton({
                            text: state.detailsOpen ? 'Details verbergen' : 'Details anzeigen',
                            variant: 'outline',
                            action: 'toggle-diagnostics-details'
                        })}
                        ${UIComponents.renderButton({
                            text: 'Leeren',
                            variant: 'outline',
                            action: 'clear-diagnostics'
                        })}
                    </div>
                </div>
            `
        );
    },

    renderSectionBlock(section) {
        const metaItems = Object.entries(section.meta || {}).map(([label, value]) => ({
            label,
            value
        }));

        const messages = [
            ...(section.errors || []).map(message => `<li>${Utils.escapeHtml(message)}</li>`),
            ...(section.warnings || []).map(message => `<li>${Utils.escapeHtml(message)}</li>`),
            ...(section.info || []).map(message => `<li>${Utils.escapeHtml(message)}</li>`)
        ].join('');

        const statusVariant = section.ok ? 'success' : 'danger';

        return UIComponents.renderSection(
            section.title || 'Diagnoseblock',
            `
                <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; align-items:center; margin-bottom:10px;">
                    <div>${UIComponents.renderBadge(section.ok ? 'OK' : 'Prüfen', statusVariant)}</div>
                </div>
                ${UIComponents.renderMetaList(metaItems)}
                ${messages ? `<ul style="margin-top:12px; padding-left:18px;">${messages}</ul>` : UIComponents.renderEmptyState('Keine Meldungen in diesem Abschnitt.')}
            `
        );
    },

    render(state) {
        const { section, summary, details } = this.getElements();

        if (!section || !summary || !details) {
            return;
        }

        section.classList.toggle('hidden', !state.visible);

        if (!state.visible) {
            summary.innerHTML = '';
            details.innerHTML = '';
            details.classList.add('hidden');
            return;
        }

        summary.innerHTML = this.renderSummary(state);

        if (state.detailsOpen) {
            details.classList.remove('hidden');
            details.innerHTML = (state.sections || [])
                .map(sectionState => this.renderSectionBlock(sectionState))
                .join('');
        } else {
            details.classList.add('hidden');
            details.innerHTML = '';
        }
    }
};

export default DiagnosticsRenderer;
