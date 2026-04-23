import Utils from '../../core/utils.js';

export const SetupProbeRenderer = {
    renderProbe(check = {}, index = 0) {
        return `
            <div class="adventure-probe-card probe-item" data-check-index="${index}">
                <div class="adventure-probe-card__skill">
                    ${Utils.escapeHtml(check?.skill || 'Probe')}
                </div>

                <div class="adventure-probe-card__text">
                    ${Utils.escapeHtml(check?.text || '')}
                </div>

                <div class="adventure-probe-card__buttons probe-buttons">
                    <button type="button" class="btn-sm success" data-check-result="success">
                        Erfolg
                    </button>

                    <button type="button" class="btn-sm fail" data-check-result="fail">
                        Misserfolg
                    </button>
                </div>

                <div class="check-result" aria-live="polite"></div>
            </div>
        `;
    }
};

export default SetupProbeRenderer;
