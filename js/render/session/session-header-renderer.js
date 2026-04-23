import Utils from '../../core/utils.js';

export const SessionHeaderRenderer = {
    render(container, options = {}) {
        if (!container) {
            return;
        }

        const currentTitle = Utils.normalizeString(
            options.title
            || container.querySelector('h1')?.textContent
            || 'Aventuria Abenteuer-Helfer'
        );

        const currentStatus = Utils.normalizeString(
            options.status
            || container.querySelector('#loading-status')?.textContent
            || 'Bereit.'
        );

        container.className = 'app-header session-app-header';
        container.innerHTML = `
            <div class="session-app-header__inner">
                <div class="session-app-header__eyebrow">Aventuria</div>

                <h1 class="session-app-header__title">
                    ${Utils.escapeHtml(currentTitle)}
                </h1>

                <p class="session-app-header__subtitle">
                    Dein Begleiter für Abenteueraufbau, Kampfphasen, Atempause und Nachschlagen –
                    ruhig, übersichtlich und auf längere Wartbarkeit ausgelegt.
                </p>

                <p
                    id="loading-status"
                    class="session-app-header__status"
                    aria-live="polite"
                >
                    ${Utils.escapeHtml(currentStatus)}
                </p>
            </div>
        `;
    }
};

export default SessionHeaderRenderer;
