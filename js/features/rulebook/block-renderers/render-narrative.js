import Utils from '../../../core/utils.js';

export function renderNarrative(rulebook, block = {}) {
    const text = rulebook.stripCitationMarkers(block?.text || '');

    return `<p class="narrative-text">${Utils.escapeHtml(text)}</p>`;
}

export default renderNarrative;
