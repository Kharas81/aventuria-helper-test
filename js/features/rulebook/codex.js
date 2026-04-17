import Utils from '../../core/utils.js';

export const RulebookCodex = {
    htmlToPlainText(html) {
        const temp = document.createElement('div');
        temp.innerHTML = String(html ?? '');
        return String(temp.textContent ?? temp.innerText ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    collectBlockText(rulebook, block) {
        let combinedText = '';

        const push = value => {
            const normalized = rulebook.stripCitationMarkers(String(value ?? '')).trim();
            if (normalized) {
                combinedText += ` ${normalized}`;
            }
        };

        push(block?.text);
        push(block?.action);
        push(block?.title);
        push(block?.header);

        if (block?.results) {
            Utils.normalizeArray(block.results).forEach(result => {
                push(result?.outcome);
                push(result?.text);
            });
        }

        if (block?.elements) {
            Utils.normalizeArray(block.elements).forEach(push);
        }

        if (block?.items) {
            Utils.normalizeArray(block.items).forEach(item => {
                if (typeof item === 'string') {
                    push(item);
                    return;
                }

                push(item?.label);
                push(item?.text);
                if (item?.page) {
                    push(`Seite ${item.page}`);
                }
            });
        }

        if (block?.headers) {
            Utils.normalizeArray(block.headers).forEach(push);
        }

        if (block?.rows) {
            Utils.normalizeArray(block.rows).forEach(row => {
                Utils.normalizeArray(row).forEach(push);
            });
        }

        return combinedText.trim();
    },

    /**
     * Extrahiert den Text aus den Inhalts-Blöcken für die Suche.
     */
    extractPlainText(rulebook, content) {
        if (!content) return '';

        if (typeof content === 'string') {
            return this.htmlToPlainText(rulebook.stripCitationMarkers(content));
        }

        const blocks = Utils.normalizeArray(content);

        return blocks
            .map(block => this.collectBlockText(rulebook, block))
            .filter(Boolean)
            .join(' ');
    },

    getExcerpt(text, maxLength = 220) {
        const normalized = Utils.normalizeString(text);
        if (normalized.length <= maxLength) return normalized;
        return `${normalized.slice(0, maxLength).trim()} …`;
    },

    async buildRulesData(rulebook) {
        const indexData = rulebook.manualIndex || await rulebook.indexLoader.load(rulebook.currentSet);
        const pages = Utils.normalizeArray(indexData?.pages);
        const rules = [];

        for (const entry of pages) {
            try {
                const response = await fetch(entry.path);
                if (!response.ok) continue;

                const data = await response.json();
                const title = rulebook.stripCitationMarkers(data?.title ?? entry.title ?? `Seite ${entry.page}`);
                const text = this.extractPlainText(rulebook, data?.content);

                rules.push({
                    page: entry.page,
                    title,
                    text
                });
            } catch (error) {
                console.warn(`Kodex-Seite ${entry.page} Fehler`, error);
            }
        }

        rulebook.rulesData = rules;
    },

    bindPageJumpActions(scope, rulebook) {
        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.bound === 'true') return;

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) rulebook.jumpToPage(page);
            });

            button.dataset.bound = 'true';
        });
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

        this.bindPageJumpActions(results, rulebook);
    }
};

export default RulebookCodex;
