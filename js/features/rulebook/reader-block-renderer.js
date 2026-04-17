import Utils from '../../core/utils.js';

export const RulebookReaderBlockRenderer = {
    renderTocBlock(rulebook, block) {
        const title = rulebook.stripCitationMarkers(block.title || block.header || 'Inhaltsverzeichnis');
        const items = Utils.normalizeArray(block.items);

        const itemsHtml = items.map(item => {
            if (typeof item === 'string') {
                return `<li>${Utils.escapeHtml(rulebook.stripCitationMarkers(item))}</li>`;
            }

            const label = rulebook.stripCitationMarkers(item?.label || item?.text || '');
            const page = Number(item?.page);

            if (page > 0) {
                return `
                    <li>
                        <button
                            type="button"
                            class="btn-outline btn-sm"
                            data-rulebook-page="${page}"
                        >
                            ${Utils.escapeHtml(label || `Seite ${page}`)}
                        </button>
                    </li>
                `;
            }

            return `<li>${Utils.escapeHtml(label)}</li>`;
        }).join('');

        return `
            <div class="toc-box">
                <h3>${Utils.escapeHtml(title)}</h3>
                <ul class="toc-list">
                    ${itemsHtml}
                </ul>
            </div>
        `;
    },

    renderTableBlock(rulebook, block) {
        const headers = Utils.normalizeArray(block.headers).map(header =>
            rulebook.stripCitationMarkers(header)
        );
        const rows = Utils.normalizeArray(block.rows);

        if (headers.length === 0 && rows.length === 0) {
            return '';
        }

        const theadHtml = headers.length > 0
            ? `
                <thead>
                    <tr>
                        ${headers.map(header => `<th>${Utils.escapeHtml(header)}</th>`).join('')}
                    </tr>
                </thead>
            `
            : '';

        const tbodyHtml = rows.map(row => {
            const cells = Utils.normalizeArray(row).map(cell =>
                `<td>${Utils.escapeHtml(rulebook.stripCitationMarkers(cell))}</td>`
            ).join('');

            return `<tr>${cells}</tr>`;
        }).join('');

        return `
            <div class="manual-table-wrap">
                <table class="manual-table">
                    ${theadHtml}
                    <tbody>
                        ${tbodyHtml}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderContentBlocks(rulebook, content) {
        if (!content) return '<p>Kein Inhalt vorhanden.</p>';

        // Abwärtskompatibilität für alte HTML-Strings
        if (typeof content === 'string') {
            return rulebook.stripCitationMarkers(content);
        }

        const blocks = Utils.normalizeArray(content);

        return blocks.map(block => {
            const text = rulebook.stripCitationMarkers(block.text || '');

            switch (block.type) {
                case 'location':
                    return `<span class="location-info">${Utils.escapeHtml(text)}</span>`;

                case 'header': {
                    const rawLevel = Number(block.level || 3);
                    const level = Math.min(6, Math.max(1, rawLevel));
                    return `<h${level}>${Utils.escapeHtml(text)}</h${level}>`;
                }

                case 'paragraph':
                    return `<p>${Utils.escapeHtml(text)}</p>`;

                case 'narrative':
                    return `<p class="narrative-text">${Utils.escapeHtml(text)}</p>`;

                case 'instruction_box': {
                    const title = rulebook.stripCitationMarkers(block.title || 'Spielanweisung');
                    const action = rulebook.stripCitationMarkers(block.action || '');
                    const resultsHtml = Utils.normalizeArray(block.results).map(result => {
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

                case 'rule_block': {
                    const header = rulebook.stripCitationMarkers(block.header || '');
                    return `
                        <div class="rule-block">
                            ${header ? `<strong>${Utils.escapeHtml(header)}:</strong> ` : ''}
                            ${Utils.escapeHtml(text)}
                        </div>
                    `;
                }

                case 'map_index': {
                    const elements = Utils.normalizeArray(block.elements)
                        .map(entry => rulebook.stripCitationMarkers(entry))
                        .join(', ');
                    return `<div class="map-index"><small>Orte: ${Utils.escapeHtml(elements)}</small></div>`;
                }

                case 'warning_box': {
                    const header = rulebook.stripCitationMarkers(block.header || 'Wichtig');
                    return `
                        <div class="warning-box">
                            <strong>${Utils.escapeHtml(header)}:</strong>
                            ${Utils.escapeHtml(text)}
                        </div>
                    `;
                }

                case 'toc':
                    return this.renderTocBlock(rulebook, block);

                case 'table':
                    return this.renderTableBlock(rulebook, block);

                default:
                    return text ? `<p>${Utils.escapeHtml(text)}</p>` : '';
            }
        }).join('');
    }
};

export default RulebookReaderBlockRenderer;
