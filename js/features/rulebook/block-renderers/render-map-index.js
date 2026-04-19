import Utils from '../../../core/utils.js';

export function renderMapIndex(rulebook, block = {}) {
    const elements = Utils.normalizeArray(block?.elements)
        .map(entry => rulebook.stripCitationMarkers(entry))
        .join(', ');

    return `<div class="map-index"><small>Orte: ${Utils.escapeHtml(elements)}</small></div>`;
}

export default renderMapIndex;
