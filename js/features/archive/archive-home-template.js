import Utils from '../../core/utils.js';

export const ArchiveHomeTemplate = {
    renderSetButton(setConfig = {}, isCurrent = false) {
        const safeId = Utils.escapeHtml(Utils.normalizeString(setConfig?.id));
        const safeLabel = Utils.escapeHtml(
            Utils.normalizeString(
                setConfig?.shortName
                || setConfig?.name
                || setConfig?.id
                || 'Set'
            )
        );

        return `
            <button
                type="button"
                class="${isCurrent ? 'btn' : 'btn-outline'}"
                data-action="archive-load-set"
                data-set="${safeId}"
            >
                ${safeLabel}
            </button>
        `;
    },

    renderCategoryButton({ label = '', value = '', setKey = '' } = {}) {
        const safeLabel = Utils.escapeHtml(label);
        const safeValue = Utils.escapeHtml(value);
        const safeSetKey = Utils.escapeHtml(setKey);

        return `
            <button
                type="button"
                class="btn-outline"
                data-action="archive-open-category"
                data-category-filter="${safeValue}"
                data-set="${safeSetKey}"
            >
                ${safeLabel}
            </button>
        `;
    },

    render({
        activeSetKey = '',
        enabledSets = [],
        activeSetName = '',
        totalLoadedCards = 0
    } = {}) {
        const safeActiveSetName = Utils.escapeHtml(activeSetName || 'Aventuria');
        const safeTotalLoadedCards = Number(totalLoadedCards || 0);

        const setButtons = Utils.normalizeArray(enabledSets)
            .map(setConfig => this.renderSetButton(
                setConfig,
                Utils.normalizeString(setConfig?.id) === Utils.normalizeString(activeSetKey)
            ))
            .join('');

        const categoryButtons = [
            { label: 'Schergen', value: 'schergen', setKey: activeSetKey },
            { label: 'Anführer', value: 'anfuehrer', setKey: activeSetKey },
            { label: 'Abenteuerkarten', value: 'abenteuerkarten', setKey: activeSetKey },
            { label: 'Spezialkarten', value: 'spezial', setKey: activeSetKey }
        ]
            .map(category => this.renderCategoryButton(category))
            .join('');

        return `
            <div class="archive-home">
                <section class="archive-home__hero">
                    <h3 class="archive-home__title">Willkommen im Kartenarchiv</h3>
                    <p class="archive-home__lead">
                        Wähle zuerst einen Bereich, bevor Karten geladen und durchsucht werden.
                    </p>

                    <div class="archive-home__meta">
                        <div class="archive-home__meta-box">
                            <div class="archive-home__meta-label">Aktives Set</div>
                            <div class="archive-home__meta-value">${safeActiveSetName}</div>
                        </div>

                        <div class="archive-home__meta-box">
                            <div class="archive-home__meta-label">Bereits geladen</div>
                            <div class="archive-home__meta-value">${safeTotalLoadedCards}</div>
                        </div>
                    </div>
                </section>

                <section class="archive-home__section">
                    <div class="archive-home__section-head">
                        <h4 class="archive-home__section-title">Schnellzugriff</h4>
                        <p class="archive-home__section-text">
                            Starte direkt mit einer Kategorie im aktuell gewählten Set.
                        </p>
                    </div>

                    <div class="archive-home__actions">
                        ${categoryButtons}
                    </div>
                </section>

                <section class="archive-home__section">
                    <div class="archive-home__section-head">
                        <h4 class="archive-home__section-title">Karten-Sets</h4>
                        <p class="archive-home__section-text">
                            Öffne ein Set und stöbere dann im Archiv weiter.
                        </p>
                    </div>

                    <div class="archive-home__actions">
                        ${setButtons}
                    </div>
                </section>

                <section class="archive-home__section archive-home__section--hint">
                    <div class="archive-home__section-head">
                        <h4 class="archive-home__section-title">Hinweis</h4>
                    </div>

                    <p class="archive-home__hint">
                        Die Suche oben wird aktiv, sobald du ein Karten-Set oder eine Kategorie geöffnet hast.
                    </p>
                </section>
            </div>
        `;
    }
};

export default ArchiveHomeTemplate;
