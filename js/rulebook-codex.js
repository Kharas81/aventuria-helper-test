window.RulebookCodex = {
    htmlToPlainText(html) {
        const temp = document.createElement('div');
        temp.innerHTML = String(html ?? '');
        return String(temp.textContent ?? temp.innerText ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    getExcerpt(text, maxLength = 220) {
        const normalized = String(text ?? '').trim();
        if (normalized.length <= maxLength) {
            return normalized;
        }

        return `${normalized.slice(0, maxLength).trim()} …`;
    },

    async buildRulesData(setKey = '') {
        const indexData = window.Rulebook?.manualIndex
            || await window.RulebookIndexLoader?.load?.(setKey);
        const pages = window.Utils.normalizeArray(indexData?.pages);
        const rules = [];

        for (const entry of pages) {
            try {
                const response = await fetch(entry.path);
                if (!response.ok) {
                    continue;
                }

                const data = await response.json();
                const title = window.Rulebook?.stripCitationMarkers?.(data?.title ?? entry.title ?? `Seite ${entry.page}`)
                    || `Seite ${entry.page}`;
                const text = this.htmlToPlainText(
                    window.Rulebook?.stripCitationMarkers?.(data?.content ?? '') ?? ''
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

        window.Rulebook.rulesData = rules;
    },

    bindPageJumpActions(scope) {
        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.bound === 'true') {
                return;
            }

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) {
                    window.RulebookReader?.jumpToPage?.(page);
                }
            });

            button.dataset.bound = 'true';
        });
    },

    filterRules(term = '') {
        const results = window.RulebookUI?.getCodexResults?.();
        if (!results) {
            return;
        }

        const normalizedTerm = String(term ?? '').trim().toLowerCase();

        if (!normalizedTerm) {
            results.innerHTML = '';
            return;
        }

        const filtered = window.Utils.normalizeArray(window.Rulebook?.rulesData).filter(rule => {
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
                    <h4>${window.Utils.escapeHtml(rule.title)}</h4>
                    <p><strong>Seite:</strong> ${window.Utils.escapeHtml(rule.page)}</p>
                    <p>${window.Utils.escapeHtml(this.getExcerpt(rule.text))}</p>
                    <button type="button" class="btn-outline" data-rulebook-page="${window.Utils.escapeHtml(rule.page)}">
                        Zur Seite
                    </button>
                </div>
            `).join('')
            : '<p>Kein Treffer im Kodex.</p>';

        this.bindPageJumpActions(results);
    }
};
