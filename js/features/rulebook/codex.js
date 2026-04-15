import Utils from '../../core/utils.js';

export const RulebookCodex = {
    htmlToPlainText(html) {
        const temp = document.createElement('div');
        temp.innerHTML = String(html ?? '');
        return String(temp.textContent ?? temp.innerText ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    getExcerpt(text, maxLength = 220) {
        const normalized = Utils.normalizeString(text);
        if (normalized.length <= maxLength) {
            return normalized;
        }

        return `${normalized.slice(0, maxLength).trim()} …`;
    },

    async buildRulesData(rulebook) {
        const indexData = rulebook.manualIndex
            || await rulebook.indexLoader.load(rulebook.currentSet);
        const pages = Utils.normalizeArray(indexData?.pages);
        const rules = [];

        for (const entry of pages) {
            try {
                const response = await fetch(entry.path);
                if (!response.ok) {
                    continue;
                }

                const data = await response.json();
                const title = rulebook.stripCitationMarkers(data?.title ?? entry.title ?? `Seite ${entry.page}`)
                    || `Seite ${entry.page}`;
                const text = this.htmlToPlainText(
                    rulebook.stripCitationMarkers(data?.content ?? '') ?? ''
                );

                rules.push({
                    page: entry.page,
                    title,
                    text
                });
            } catch (error) {
                console.warn(`Kodex-Seite ${entry.page} konnte nicht geladen werden.`, error);
            }
        }

        rulebook.rulesData = rules;
    },

    bindPageJumpActions(scope, rulebook) {
        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.bound === 'true') {
                return;
            }

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) {
                    rulebook.jumpToPage(page);
                }
            });

            button.dataset.bound = 'true';
        });
    },

    filterRules(rulebook, term = '') {
        const results = rulebook.ui.getCodexResults();
        if (!results) {
            return;
        }

        const normalizedTerm = Utils.normalizeString(term).toLowerCase();

        if (!normalizedTerm) {
            results.innerHTML = '';
            return;
        }

        const filtered = Utils.normalizeArray(rulebook.rulesData).filter(rule => {
            const page = String(rule?.page ?? '');
            const title = String(rule?.title ?? '').toLowerCase();
            const text = String(rule?.text ?? '').toLowerCase();

            return title.includes(normalizedTerm)
                || text.includes(normalizedTerm)
                || page.includes(normalizedTerm);
        });

        results.innerHTML = filtered.length
            ? filtered.map(rule => `
                <div class="rule-entry">
                    <h4>${Utils.escapeHtml(rule.title)}</h4>
                    <p><strong>Seite:</strong> ${Utils.escapeHtml(rule.page)}</p>
                    <p>${Utils.escapeHtml(this.getExcerpt(rule.text))}</p>
                    <button type="button" class="btn-outline" data-rulebook-page="${Utils.escapeHtml(rule.page)}">
                        Zur Seite
                    </button>
                </div>
            `).join('')
            : '<p>Kein Treffer im Kodex.</p>';

        this.bindPageJumpActions(results, rulebook);
    }
};

export default RulebookCodex;
