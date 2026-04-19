import Utils from '../../../core/utils.js';

export function renderWarningBox(rulebook, block = {}) {
    const header = rulebook.stripCitationMarkers(block?.header || 'Wichtig');
    const text = rulebook.stripCitationMarkers(block?.text || '');

    return `
        <div class="warning-box">
            <strong>${Utils.escapeHtml(header)}:</strong>
            ${Utils.escapeHtml(text)}
        </div>
    `;
}

export default renderWarningBox;
