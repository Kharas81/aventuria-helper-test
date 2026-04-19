import Utils from '../../../core/utils.js';

export function renderParagraph(rulebook, block = {}) {
    const rawText = typeof block === 'string'
        ? block
        : (block?.text || '');

    const text = rulebook.stripCitationMarkers(rawText);

    return `<p>${Utils.escapeHtml(text)}</p>`;
}

export default renderParagraph;
