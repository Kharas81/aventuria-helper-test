import Utils from '../../../core/utils.js';

export function renderHeader(rulebook, block = {}) {
    const text = rulebook.stripCitationMarkers(block?.text || '');
    const rawLevel = Number(block?.level || 3);
    const level = Math.min(6, Math.max(1, rawLevel));

    return `<h${level}>${Utils.escapeHtml(text)}</h${level}>`;
}

export default renderHeader;
