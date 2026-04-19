import Utils from '../../../core/utils.js';

export function renderInstructionBox(rulebook, block = {}) {
    const title = rulebook.stripCitationMarkers(block?.title || 'Spielanweisung');
    const action = rulebook.stripCitationMarkers(block?.action || '');

    const resultsHtml = Utils.normalizeArray(block?.results).map(result => {
        const outcome = rulebook.stripCitationMarkers(result?.outcome || '');
        const resultText = rulebook.stripCitationMarkers(result?.text || '');

        return `
            <li>
                <strong>${Utils.escapeHtml(outcome)}:</strong>
                ${Utils.escapeHtml(resultText)}
            </li>
        `;
    }).join('');

    return `
        <div class="instruction-box">
            <div class="box-header">${Utils.escapeHtml(title)}</div>
            <div class="box-content">
                <p class="box-action">${Utils.escapeHtml(action)}</p>
                ${resultsHtml ? `<ul class="box-results">${resultsHtml}</ul>` : ''}
            </div>
        </div>
    `;
}

export default renderInstructionBox;
