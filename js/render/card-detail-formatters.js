import Utils from '../core/utils.js';

export const CardDetailFormatters = {
    symbolMap: {
        '[NAHKAMPF]': 'Nahkampf',
        '[FERNKAMPF]': 'Fernkampf',
        '[TREFFERPUNKTE]': 'Trefferpunkte',
        '[LEBEN]': 'Leben',
        '[AKTIONEN]': 'Aktionen',
        '[UNSICHERES_SYMBOL_ROT_OVAL]': 'rotes Oval-Symbol'
    },

    formatRuleText(text = '') {
        let formatted = Utils.escapeHtml(String(text ?? ''));

        Object.entries(this.symbolMap).forEach(([token, label]) => {
            const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            formatted = formatted.replace(
                new RegExp(escapedToken, 'g'),
                `<span class="card-detail__symbol">${Utils.escapeHtml(label)}</span>`
            );
        });

        return formatted;
    },

    getStatusBadgeVariant(status = '') {
        const normalized = Utils.normalizeString(status).toLowerCase();

        if (normalized === 'playable') return 'success';
        if (normalized.includes('placeholder')) return 'warning';
        if (normalized === 'missing') return 'danger';
        return 'default';
    },

    renderBadge(text = '', variant = 'default') {
        const safeText = Utils.normalizeString(text);
        if (!safeText) {
            return '';
        }

        return `<span class="ui-badge ui-badge--${variant}">${Utils.escapeHtml(safeText)}</span>`;
    },

    renderHeaderBadges(card = {}) {
        const badges = [
            this.renderBadge(card?.card_category || '', 'info'),
            this.renderBadge(card?.type || '', 'default'),
            this.renderBadge(card?.status || '', this.getStatusBadgeVariant(card?.status))
        ].filter(Boolean);

        return badges.length
            ? `<div class="card-detail__badges">${badges.join('')}</div>`
            : '';
    }
};

export default CardDetailFormatters;
