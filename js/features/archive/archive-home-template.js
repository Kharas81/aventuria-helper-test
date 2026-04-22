import Utils from '../../core/utils.js';

export const ArchiveHomeTemplate = {
    renderMetaBox(label = '', value = '') {
        return `
            <div class="archive-home__meta-box">
                <div class="archive-home__meta-label">${Utils.escapeHtml(label)}</div>
                <div class="archive-home__meta-value">${Utils.escapeHtml(value)}</div>
            </div>
        `;
    },

    renderCategoryCard({ title = '', description = '', categoryFilter = '', setKey = '' } = {}) {
        return `
            <button
                type="button"
                class="archive-home-card archive-home-card--category"
                data-action="archive-open-category"
                data-category-filter="${Utils.escapeHtml(categoryFilter)}"
                data-set="${Utils.escapeHtml(setKey)}"
            >
                <span class="archive-home-card__eyebrow">Kategorie</span>
                <span class="archive-home-card__title">${Utils.escapeHtml(title)}</span>
                <span class="archive-home-card__text">${Utils.escapeHtml(description)}</span>
            </button>
        `;
    },

    renderSetCard(setConfig = {}, activeSetKey = '') {
        const setId = Utils.normalizeString(setConfig?.id);
        const setName = Utils.normalizeString(setConfig?.name || setId || 'Set');
        const setShortName = Utils.normalizeString(setConfig?.shortName || setName);
        const isActive = setId === Utils.normalizeString(activeSetKey);

        return `
            <button
                type="button"
                class="archive-home-card archive-home-card--set ${isActive ? 'archive-home-card--active' : ''}"
                data-action="archive-load-set"
                data-set="${Utils.escapeHtml(setId)}"
            >
                <span class="archive-home-card__eyebrow">
                    ${isActive ? 'Aktuelles Set' : 'Karten-Set'}
                </span>
                <span class="archive-home-card__title">${Utils.escapeHtml(setShortName)}</span>
                <span class="archive-home-card__text">${Utils.escapeHtml(setName)}</span>
            </button>
        `;
    },

    render({
        activeSetKey = '',
        activeSetName = '',
        enabledSets = [],
        totalLoadedCards = 0
    } = {}) {
        const safeActiveSetKey = Utils.normalizeString(activeSetKey);
        const safeActiveSetName = Utils.normalizeString(activeSetName || 'Aventuria');
        const safeSets = Utils.normalizeArray(enabledSets);

        const categoryCards = [
            {
                title: 'Schergen',
                description: `Alle Schergen im Set „${safeActiveSetName}“ durchsuchen.`,
                categoryFilter: 'schergen',
                setKey: safeActiveSetKey
            },
            {
                title: 'Anführer',
                description: `Alle Anführer im Set „${safeActiveSetName}“ anzeigen.`,
                categoryFilter: 'anfuehrer',
                setKey: safeActiveSetKey
            },
            {
                title: 'Abenteuerkarten',
                description: `Zeitskalen, Storykarten und Abenteuerkarten öffnen.`,
                categoryFilter: 'abenteuerkarten',
                setKey: safeActiveSetKey
            },
            {
                title: 'Spezialkarten',
                description: `Spezialkarten und andere besondere Karten anzeigen.`,
                categoryFilter: 'spezial',
                setKey: safeActiveSetKey
            }
        ]
            .map(category => this.renderCategoryCard(category))
            .join('');

        const setCards = safeSets.length
            ? safeSets
                .map(setConfig => this.renderSetCard(setConfig, safeActiveSetKey))
                .join('')
            : `
                <div class="archive-home__empty">
                    Keine Karten-Sets für das Archiv gefunden.
                </div>
            `;

        const loadedInfo = Number(totalLoadedCards || 0) > 0
            ? `${Number(totalLoadedCards || 0)} Karten`
            : 'Noch nichts geladen';

        return `
            <div class="archive-home">
                <section class="archive-home__hero">
                    <div class="archive-home__hero-text">
                        <h3 class="archive-home__title">Willkommen im Kartenarchiv</h3>
                        <p class="archive-home__lead">
                            Wähle zuerst einen Bereich. Erst danach werden Karten geladen und die Suche wird aktiv.
                        </p>
                    </div>

                    <div class="archive-home__meta">
                        ${this.renderMetaBox('Aktuelles Set', safeActiveSetName)}
                        ${this.renderMetaBox('Letzter Stand', loadedInfo)}
                    </div>
                </section>

                <section class="archive-home__section">
                    <div class="archive-home__section-head">
                        <h4 class="archive-home__section-title">Schnellzugriff</h4>
                        <p class="archive-home__section-text">
                            Stöbere direkt nach Kategorien im aktuell gewählten Set.
                        </p>
                    </div>

                    <div class="archive-home__card-grid">
                        ${categoryCards}
                    </div>
                </section>

                <section class="archive-home__section">
                    <div class="archive-home__section-head">
                        <h4 class="archive-home__section-title">Karten-Sets</h4>
                        <p class="archive-home__section-text">
                            Wähle ein Set aus, um dessen Kartenarchiv zu laden.
                        </p>
                    </div>

                    <div class="archive-home__card-grid">
                        ${setCards}
                    </div>
                </section>

                <section class="archive-home__section archive-home__section--hint">
                    <div class="archive-home__section-head">
                        <h4 class="archive-home__section-title">Hinweis</h4>
                    </div>

                    <p class="archive-home__hint">
                        Die Suche oben ist absichtlich erst aktiv, nachdem du ein Set oder eine Kategorie geöffnet hast.
                    </p>
                </section>
            </div>
        `;
    }
};

export default ArchiveHomeTemplate;
