import Utils from '../core/utils.js';

export function renderStats(stats = {}) {
    const entries = [
        ['GP', stats?.gp],
        ['LP', stats?.lp],
        ['Rüstung', stats?.armor],
        ['Ausweichen', stats?.evasion],
        ['Aktionen', stats?.actions],
        ['Startwert', stats?.start_value],
        ['Kosten', stats?.cost]
    ].filter(([, value]) => value !== null && value !== undefined && value !== '');

    if (!entries.length) {
        return '<p class="card-detail__empty">Keine Werte vorhanden.</p>';
    }

    return `
        <div class="card-detail__stats">
            ${entries.map(([label, value]) => `
                <div class="card-detail__stat">
                    <span class="card-detail__stat-label">${Utils.escapeHtml(label)}</span>
                    <span class="card-detail__stat-value">${Utils.escapeHtml(String(value))}</span>
                </div>
            `).join('')}
        </div>
    `;
}

export default {
    renderStats
};
