import Utils from '../../../core/utils.js';

export function renderLocation(rulebook, block = {}) {
    const text = rulebook.stripCitationMarkers(block?.text || '');

    return `<span class="location-info">${Utils.escapeHtml(text)}</span>`;
}

export default renderLocation;
