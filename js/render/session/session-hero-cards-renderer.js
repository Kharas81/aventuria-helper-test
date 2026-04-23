import Utils from '../../core/utils.js';

export const SessionHeroCardsRenderer = {
    toRoman(value) {
        const map = {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV'
        };

        return map[Number(value)] || String(value);
    },

    buildStatRow({
        icon = '',
        label = '',
        value = 0,
        valueKey = '',
        minusAction = '',
        plusAction = ''
    } = {}) {
        return `
            <div class="stat session-hero-stat">
                <span class="session-hero-stat__icon" aria-hidden="true">
                    ${Utils.escapeHtml(icon)}
                </span>

                <div class="session-hero-stat__copy">
                    <span class="session-hero-stat__label">
                        ${Utils.escapeHtml(label)}
                    </span>
                    <span class="session-hero-stat__value" data-stat="${Utils.escapeHtml(valueKey)}">
                        ${Utils.escapeHtml(String(value))}
                    </span>
                </div>

                <div class="session-hero-stat__actions">
                    <button
                        type="button"
                        data-action="${Utils.escapeHtml(minusAction)}"
                        aria-label="${Utils.escapeHtml(label)} verringern"
                    >−</button>

                    <button
                        type="button"
                        data-action="${Utils.escapeHtml(plusAction)}"
                        aria-label="${Utils.escapeHtml(label)} erhöhen"
                    >+</button>
                </div>
            </div>
        `;
    },

    renderHeroCard({ heroIndex = 1, lp = 40, fate = 0 } = {}) {
        const safeIndex = Number(heroIndex) || 1;
        const watermark = this.toRoman(safeIndex);

        return `
            <div class="hero-card session-hero-card" data-hero-index="${safeIndex}">
                <div class="session-hero-card__watermark" aria-hidden="true">
                    ${Utils.escapeHtml(watermark)}
                </div>

                <span class="session-hero-card__eyebrow">Held</span>
                <h4>Held ${Utils.escapeHtml(String(safeIndex))}</h4>

                <div class="session-hero-card__stats">
                    ${this.buildStatRow({
                        icon: '✚',
                        label: 'Lebenspunkte',
                        value: lp,
                        valueKey: 'lp',
                        minusAction: 'lp-minus',
                        plusAction: 'lp-plus'
                    })}

                    ${this.buildStatRow({
                        icon: '✦',
                        label: 'Schicksalspunkte',
                        value: fate,
                        valueKey: 'fate',
                        minusAction: 'fate-minus',
                        plusAction: 'fate-plus'
                    })}
                </div>
            </div>
        `;
    }
};

export default SessionHeroCardsRenderer;
