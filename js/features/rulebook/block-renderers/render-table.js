import Utils from '../../../core/utils.js';

export function renderTable(rulebook, block = {}) {
    const headers = Utils.normalizeArray(block?.headers).map(header =>
        rulebook.stripCitationMarkers(header)
    );
    const rows = Utils.normalizeArray(block?.rows);

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
}

export default renderTable;
