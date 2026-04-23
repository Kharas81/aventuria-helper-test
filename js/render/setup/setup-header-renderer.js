import Utils from '../../core/utils.js';

export const SetupHeaderRenderer = {
    renderTitle(adventure = {}) {
        return Utils.escapeHtml(
            Utils.normalizeString(adventure?.name || 'Abenteuer')
        );
    },

    renderLead(adventure = {}) {
        const difficultyText = Utils.normalizeString(adventure?.difficulty_text || '');
        const setName = Utils.normalizeString(
            adventure?.set?.shortName
            || adventure?.set?.name
            || ''
        );

        if (difficultyText && setName) {
            return `Bereite das Abenteuer "${Utils.escapeHtml(setName)}" vor und verschaffe dir einen klaren Überblick über Karten, Gegner und Sonderregeln.`;
        }

        if (setName) {
            return `Bereite das Abenteuer "${Utils.escapeHtml(setName)}" vor und verschaffe dir einen klaren Überblick über Karten, Gegner und Sonderregeln.`;
        }

        return 'Bereite das Abenteuer vor und verschaffe dir einen klaren Überblick über Karten, Gegner und Sonderregeln.';
    },

    renderDanger(adventure = {}) {
        const danger = Number(adventure?.danger_calc ?? 0);

        if (!Number.isFinite(danger) || danger <= 0) {
            return '';
        }

        return `
            <div class="adventure-danger">
                <span class="adventure-danger__icon" aria-hidden="true">!</span>
                <span class="adventure-danger__label">
                    Gefahrenstufe
                    <span class="adventure-danger__value">${Utils.escapeHtml(String(danger))}</span>
                </span>
            </div>
        `;
    },

    render(container, adventure = {}) {
        if (!container) {
            return;
        }

        container.innerHTML = `
            <div class="adventure-setup__header">
                <div class="adventure-setup__eyebrow">Abenteuer Setup</div>

                <div class="adventure-setup__title-row">
                    <div>
                        <h2 id="title" class="adventure-setup__title">
                            ${this.renderTitle(adventure)}
                        </h2>

                        <p class="adventure-setup__lead">
                            ${this.renderLead(adventure)}
                        </p>
                    </div>

                    ${this.renderDanger(adventure)}
                </div>

                <div id="danger-value" class="hidden" aria-hidden="true"></div>
            </div>
        `;
    }
};

export default SetupHeaderRenderer;
