import Utils from '../../core/utils.js';
import CoreRuntime from '../../core/runtime.js';
import SetupStoryRenderer from '../../render/setup/setup-story-renderer.js';

export const Narrative = {
    normalizeChecks(checks) {
        return Utils.normalizeArray(checks);
    },

    renderStory(data) {
        const container = Utils.byId('story-area');

        if (!container) {
            return;
        }

        SetupStoryRenderer.render(container, data);
        this.bindCheckButtons(this.normalizeChecks(data?.narrative?.checks));
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
                    CoreRuntime.persistIfAllowed();
                });

                button.dataset.boundNarrative = 'true';
            });
        });
    }
};

export default Narrative;
