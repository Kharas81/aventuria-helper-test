import Utils from '../../core/utils.js';
import SetupProbeRenderer from './setup-probe-renderer.js';

export const SetupStoryRenderer = {
    normalizeChecks(checks) {
        return Utils.normalizeArray(checks);
    },

    renderChecks(checks = []) {
        const safeChecks = this.normalizeChecks(checks);

        if (!safeChecks.length) {
            return `
                <div class="setup-group__empty">
                    Für dieses Abenteuer sind keine interaktiven Proben hinterlegt.
                </div>
            `;
        }

        return `
            <div class="adventure-story__checks-list">
                ${safeChecks.map((check, index) => SetupProbeRenderer.renderProbe(check, index)).join('')}
            </div>
        `;
    },

    render(container, adventure = {}) {
        if (!container) {
            return;
        }

        const intro = Utils.normalizeString(adventure?.narrative?.intro || '');
        const checks = this.normalizeChecks(adventure?.narrative?.checks);

        if (!intro && !checks.length) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = `
            <div class="adventure-story">
                <div class="adventure-story__header">
                    <div class="adventure-story__eyebrow">Erzählung & Entscheidungen</div>
                    <h3 class="adventure-story__title">Die Geschichte</h3>
                    <p class="adventure-story__lead">
                        Lies zuerst den Erzählteil und nutze danach die hervorgehobenen Probe-Karten für die Spielentscheidung.
                    </p>
                </div>

                <div class="adventure-story__body">
                    <div class="adventure-story__text-panel">
                        <div class="adventure-story__text">
                            ${Utils.escapeHtml(intro || 'Keine Geschichte vorhanden.')}
                        </div>
                    </div>

                    <div class="adventure-story__checks-panel">
                        <h4 class="adventure-story__checks-title">Interaktive Proben</h4>
                        ${this.renderChecks(checks)}
                    </div>
                </div>
            </div>
        `;
    }
};

export default SetupStoryRenderer;
