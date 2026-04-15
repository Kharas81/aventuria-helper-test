import Utils from '../../core/utils.js';

export const Narrative = {
    normalizeChecks(checks) {
        return Utils.normalizeArray(checks);
    },

    renderStory(data) {
        const container = Utils.byId('story-area');

        if (!container || !data || !data.narrative) {
            if (container) {
                container.innerHTML = '';
            }
            return;
        }

        const intro = Utils.escapeHtml(data.narrative.intro ?? '');
        const checks = this.normalizeChecks(data.narrative.checks);

        container.innerHTML = `
            <div class="card-list">
                <h3>📖 Die Geschichte</h3>
                <p class="story-text">${intro}</p>

                <div class="probes-area">
                    <h4>Interaktive Proben:</h4>

                    ${checks.length
                        ? checks.map((check, index) => `
                            <div class="probe-item" data-check-index="${index}">
                                <p>
                                    <strong>${Utils.escapeHtml(check?.skill ?? 'Probe')}:</strong>
                                    ${Utils.escapeHtml(check?.text ?? '')}
                                </p>

                                <div class="probe-buttons">
                                    <button type="button" class="btn-sm success" data-check-result="success">
                                        Erfolg
                                    </button>
                                    <button type="button" class="btn-sm fail" data-check-result="fail">
                                        Misserfolg
                                    </button>
                                </div>

                                <div class="check-result" aria-live="polite"></div>
                            </div>
                        `).join('')
                        : '<p>Keine Proben vorhanden.</p>'
                    }
                </div>
            </div>
        `;

        this.bindCheckButtons(checks);
    },

    showCheckResult(button, type, resultText) {
        const probeItem = button.closest('.probe-item');
        if (!probeItem) return;

        const resultBox = probeItem.querySelector('.check-result');
        if (!resultBox) return;

        resultBox.classList.remove('success', 'fail', 'show');

        resultBox.innerHTML = `
            <strong>${type === 'success' ? 'Erfolg:' : 'Misserfolg:'}</strong>
            ${Utils.escapeHtml(resultText)}
        `;

        resultBox.classList.add(type === 'success' ? 'success' : 'fail');
        resultBox.classList.add('show');
    },

    bindCheckButtons(checks) {
        document.querySelectorAll('.probe-item').forEach(item => {
            const index = parseInt(item.dataset.checkIndex, 10);
            const check = checks[index];

            if (!check || !check.results) return;

            item.querySelectorAll('[data-check-result]').forEach(button => {
                if (button.dataset.boundNarrative === 'true') {
                    return;
                }

                button.addEventListener('click', () => {
                    const type = button.dataset.checkResult;
                    const resultText = check.results?.[type] ?? 'Kein Ergebnis vorhanden.';

                    this.showCheckResult(button, type, resultText);

                    if (window.StorageManager?.persist) {
                        window.StorageManager.persist();
                    }
                });

                button.dataset.boundNarrative = 'true';
            });
        });
    }
};

export default Narrative;
