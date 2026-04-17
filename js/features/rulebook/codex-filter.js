import Utils from '../../core/utils.js';
import RulebookCodexActions from './codex-actions.js';

export const RulebookCodexFilter = {
    getExcerpt(text, maxLength = 220) {
        const normalized = Utils.normalizeString(text);
        if (normalized.length <= maxLength) return normalized;
        return `${normalized.slice(0, maxLength).trim()} …`;
    },

    filterRules(rulebook, term = '') {
        const results = rulebook.ui.getCodexResults();
        if (!results) return;

        const normalizedTerm = Utils.normalizeString(term).toLowerCase();
        if (!normalizedTerm) {
            results.innerHTML = '';
            return;
        }

        const matches = Utils.normalizeArray(rulebook.rulesData).filter(entry => {
            const title = Utils.normalizeString(entry?.title).toLowerCase();
            const text = Utils.normalizeString(entry?.text).toLowerCase();
            return title.includes(normalizedTerm) || text.includes(normalizedTerm);
        });

        if (matches.length === 0) {
            results.innerHTML = '<p class="placeholder-text">Keine Treffer gefunden.</p>';
            return;
        }

        results.innerHTML = matches.map(entry => `
            <div class="rule-entry">
                <h4>${Utils.escapeHtml(entry.title)} <span class="ui-badge ui-badge--info">S. ${entry.page}</span></h4>
                <p>${Utils.escapeHtml(this.getExcerpt(entry.text))}</p>
                <button
                    type="button"
                    class="btn-outline btn-sm"
                    data-rulebook-page="${entry.page}"
                >
                    Zur Seite springen
                </button>
            </div>
        `).join('');

        RulebookCodexActions.bindPageJumpActions(results, rulebook);
    }
};

export default RulebookCodexFilter;
