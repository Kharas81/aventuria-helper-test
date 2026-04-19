import Utils from '../../../core/utils.js';

export function renderRuleBlock(rulebook, block = {}) {
    const header = rulebook.stripCitationMarkers(block?.header || '');
    const text = rulebook.stripCitationMarkers(block?.text || '');

    return `
        <div class="rule-block">
            ${header ? `<strong>${Utils.escapeHtml(header)}:</strong> ` : ''}
            ${Utils.escapeHtml(text)}
        </div>
    `;
}

export default renderRuleBlock;
