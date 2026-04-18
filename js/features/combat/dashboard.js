import Utils from '../../core/utils.js';
import State from '../../core/state.js';
import CombatRuntime from './runtime.js';

export const CombatDashboard = {
    getDefaultHeroLp() {
        return 40;
    },

    getDefaultHeroFate() {
        return 0;
    },

    getHeroDashboard() {
        return Utils.byId('heroDashboard');
    },

    getHeroCount() {
        return State.getState().heroCount;
    },

    getCurrentHeroStats() {
        return State.getState().heroStats || {};
    },

    buildHeroStatRow(icon, value, valueKey, minusAction, plusAction, extraClass = '') {
        const rowClass = extraClass ? `stat ${extraClass}` : 'stat';

        return `
            <div class="${rowClass}">
                <span aria-hidden="true">${icon}</span>
                <span data-stat="${valueKey}">${Utils.escapeHtml(value)}</span>
                <button type="button" data-action="${minusAction}" aria-label="${valueKey} verringern">-</button>
                <button type="button" data-action="${plusAction}" aria-label="${valueKey} erhöhen">+</button>
            </div>
        `;
    },

    buildHeroCard(heroIndex, heroState = {}) {
        const lp = Number.isFinite(Number(heroState.lp))
            ? Number(heroState.lp)
            : this.getDefaultHeroLp();

        const fate = Number.isFinite(Number(heroState.fate))
            ? Number(heroState.fate)
            : this.getDefaultHeroFate();

        return `
            <div class="hero-card" data-hero-index="${heroIndex}">
                <h4>Held ${heroIndex}</h4>

                ${this.buildHeroStatRow('💗', lp, 'lp', 'lp-minus', 'lp-plus')}
                ${this.buildHeroStatRow('🍀', fate, 'fate', 'fate-minus', 'fate-plus', 'stat--spaced')}
            </div>
        `;
    },

    updateDashboard(savedHeroStats = null) {
        const container = this.getHeroDashboard();
        if (!container) return;

        const heroCount = this.getHeroCount();
        const stats = savedHeroStats && typeof savedHeroStats === 'object'
            ? savedHeroStats
            : this.getCurrentHeroStats();

        container.innerHTML = Array.from({ length: heroCount }, (_, i) => {
            const heroIndex = i + 1;
            return this.buildHeroCard(heroIndex, stats[heroIndex] || {});
        }).join('');

        this.bindDashboardButtons();
    },

    applyHeroAction(heroIndex, action, current) {
        if (action === 'lp-minus') {
            State.setHeroStat(heroIndex, 'lp', Math.max(0, Number(current.lp) - 1));
        }

        if (action === 'lp-plus') {
            State.setHeroStat(heroIndex, 'lp', Number(current.lp) + 1);
        }

        if (action === 'fate-minus') {
            State.setHeroStat(heroIndex, 'fate', Math.max(0, Number(current.fate) - 1));
        }

        if (action === 'fate-plus') {
            State.setHeroStat(heroIndex, 'fate', Number(current.fate) + 1);
        }
    },

    bindDashboardButtons() {
        const container = this.getHeroDashboard();
        if (!container || container.dataset.boundCombatDashboard === 'true') return;

        container.addEventListener('click', event => {
            const button = event.target.closest('button[data-action]');
            if (!button) return;

            const heroCard = button.closest('.hero-card');
            if (!heroCard) return;

            const heroIndex = Number(heroCard.dataset.heroIndex);
            const action = button.dataset.action;
            const heroStats = this.getCurrentHeroStats();
            const current = heroStats[heroIndex] || {
                lp: this.getDefaultHeroLp(),
                fate: this.getDefaultHeroFate()
            };

            this.applyHeroAction(heroIndex, action, current);
            this.updateDashboard();
            CombatRuntime.persistIfAllowed();
        });

        container.dataset.boundCombatDashboard = 'true';
    },

    applyIntermission() {
        const heroCount = this.getHeroCount();
        const stats = this.getCurrentHeroStats();

        for (let i = 1; i <= heroCount; i += 1) {
            const current = stats[i] || {
                lp: this.getDefaultHeroLp(),
                fate: this.getDefaultHeroFate()
            };

            State.setHeroStat(i, 'lp', Math.max(0, Number(current.lp) + 3));
            State.setHeroStat(i, 'fate', Math.max(0, Number(current.fate) + 1));
        }

        this.updateDashboard();
        CombatRuntime.persistIfAllowed();
    }
};

export default CombatDashboard;
