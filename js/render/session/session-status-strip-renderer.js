import Utils from '../../core/utils.js';

export const SessionStatusStripRenderer = {
    buildCard({ icon = '✦', label = '', value = '', isStatus = false } = {}) {
        return `
            <div class="session-status-card">
                <span class="session-status-card__icon" aria-hidden="true">
                    ${Utils.escapeHtml(icon)}
                </span>

                <span class="session-status-card__label">
                    ${Utils.escapeHtml(label)}
                </span>

                <span class="session-status-card__value ${isStatus ? 'session-status-card__value--status' : ''}">
                    ${Utils.escapeHtml(value)}
                </span>
            </div>
        `;
    },

    render(container, data = {}) {
        if (!container) {
            return;
        }

        const cards = [
            {
                icon: '✦',
                label: 'Aktives Abenteuer',
                value: Utils.normalizeString(data.adventureLabel || 'Kein Abenteuer gewählt')
            },
            {
                icon: '⚔',
                label: 'Helden',
                value: Utils.normalizeString(data.heroCountLabel || '2 Helden')
            },
            {
                icon: '⚖',
                label: 'Schwierigkeit',
                value: Utils.normalizeString(data.difficultyLabel || 'Normal')
            },
            {
                icon: '✧',
                label: 'Status',
                value: Utils.normalizeString(data.statusLabel || 'Bereit.'),
                isStatus: true
            }
        ];

        container.className = 'session-status-strip';
        container.innerHTML = `
            <div class="session-status-strip__grid">
                ${cards.map(card => this.buildCard(card)).join('')}
            </div>
        `;
    }
};

export default SessionStatusStripRenderer;
