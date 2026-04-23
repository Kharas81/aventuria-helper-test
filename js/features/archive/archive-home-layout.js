import Utils from '../../core/utils.js';

export const ArchiveHomeLayout = {
    getCategoryDefinitions(activeSetName = '', activeSetKey = '') {
        const safeSetName = Utils.normalizeString(activeSetName || 'dem aktuellen Set');
        const safeSetKey = Utils.normalizeString(activeSetKey);

        return [
            {
                title: 'Schergen',
                description: `Alle Schergen im Set „${safeSetName}“ schnell durchsuchen.`,
                categoryFilter: 'schergen',
                setKey: safeSetKey,
                iconPath: 'assets/ui/icons/minions.svg',
                iconAlt: ''
            },
            {
                title: 'Anführer',
                description: `Stärkere Gegner und Bosskarten im Set „${safeSetName}“ anzeigen.`,
                categoryFilter: 'anfuehrer',
                setKey: safeSetKey,
                iconPath: 'assets/ui/icons/danger.svg',
                iconAlt: ''
            },
            {
                title: 'Abenteuerkarten',
                description: 'Storykarten, Zeitskalen und Abenteuerkarten gesammelt öffnen.',
                categoryFilter: 'abenteuerkarten',
                setKey: safeSetKey,
                iconPath: 'assets/ui/icons/blue-cards.svg',
                iconAlt: ''
            },
            {
                title: 'Spezialkarten',
                description: 'Besondere Karten, Effekte und seltene Sonderelemente ansehen.',
                categoryFilter: 'spezial',
                setKey: safeSetKey,
                iconPath: 'assets/ui/icons/special.svg',
                iconAlt: ''
            }
        ];
    },

    renderMetaCard(label = '', value = '') {
        return `
            <div class="archive-home-meta-card">
                <span class="archive-home-meta-card__label">${Utils.escapeHtml(label)}</span>
                <span class="archive-home-meta-card__value">${Utils.escapeHtml(value)}</span>
            </div>
        `;
    },

    renderIcon(iconPath = '', iconAlt = '') {
        const safePath = Utils.escapeHtml(iconPath);
        const safeAlt = Utils.escapeHtml(iconAlt);

        return `
            <img
                src="${safePath}"
                alt="${safeAlt}"
                aria-hidden="${safeAlt ? 'false' : 'true'}"
                style="width: 22px; height: 22px;"
            >
        `;
    },

    renderCategoryCard({
        title = '',
        description = '',
        categoryFilter = '',
        setKey = '',
        iconPath = '',
        iconAlt = ''
    } = {}) {
        return `
            <button
                type="button"
                class="archive-home-card archive-home-card--category"
                data-action="archive-open-category"
                data-category-filter="${Utils.escapeHtml(categoryFilter)}"
                data-set="${Utils.escapeHtml(setKey)}"
            >
                <div class="archive-home-card__top">
                    <span class="archive-home-card__icon" aria-hidden="true">
                        ${this.renderIcon(iconPath, iconAlt)}
                    </span>
                    <span class="archive-home-card__eyebrow">Schnellzugriff</span>
                    <span class="archive-home-card__title">${Utils.escapeHtml(title)}</span>
                    <span class="archive-home-card__text">${Utils.escapeHtml(description)}</span>
                </div>

                <span class="archive-home-card__cta">Bereich öffnen</span>
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
                <div class="archive-home-card__top">
                    <span class="archive-home-card__icon" aria-hidden="true">
                        ${this.renderIcon('assets/ui/icons/archive.svg', '')}
                    </span>
                    <span class="archive-home-card__eyebrow">
                        ${isActive ? 'Aktives Set' : 'Karten-Set'}
                    </span>
                    <span class="archive-home-card__title">${Utils.escapeHtml(setShortName)}</span>
                    <span class="archive-home-card__text">${Utils.escapeHtml(setName)}</span>
                </div>

                <span class="archive-home-card__cta">Archiv laden</span>
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

        const loadedInfo = Number(totalLoadedCards || 0) > 0
            ? `${Number(totalLoadedCards || 0)} Karten geladen`
            : 'Noch kein Set geladen';

        const categoryCards = this.getCategoryDefinitions(safeActiveSetName, safeActiveSetKey)
            .map(category => this.renderCategoryCard(category))
            .join('');

        const setCards = safeSets.length
            ? safeSets.map(setConfig => this.renderSetCard(setConfig, safeActiveSetKey)).join('')
            : `
                <div class="archive-home-empty">
                    Keine Karten-Sets für das Archiv gefunden.
                </div>
            `;

        return `
            <div class="archive-home-shell">
                <section class="archive-home-hero">
                    <div class="archive-home-hero__layout">
                        <div class="archive-home-hero__copy">
                            <div class="archive-home-hero__eyebrow">Kartenarchiv</div>

                            <h3 class="archive-home-hero__title">Willkommen im Kartenarchiv</h3>

                            <p class="archive-home-hero__lead">
                                Starte nicht direkt in einer leeren Listenansicht.
                                Wähle zuerst einen Bereich oder ein Set und gehe dann gezielt in die eigentliche Kartenansicht.
                            </p>
                        </div>

                        <div class="archive-home-hero__meta">
                            ${this.renderMetaCard('Aktuelles Set', safeActiveSetName)}
                            ${this.renderMetaCard('Archivstatus', loadedInfo)}
                        </div>
                    </div>
                </section>

                <section class="archive-home-section">
                    <div class="archive-home-section__head">
                        <h4 class="archive-home-section__title">Schnellzugriff</h4>
                        <p class="archive-home-section__text">
                            Öffne direkt die wichtigsten Bereiche des aktuell gewählten Sets.
                        </p>
                    </div>

                    <div class="archive-home-grid">
                        ${categoryCards}
                    </div>
                </section>

                <section class="archive-home-section">
                    <div class="archive-home-section__head">
                        <h4 class="archive-home-section__title">Karten-Sets</h4>
                        <p class="archive-home-section__text">
                            Wähle ein Set, um dessen Kartenarchiv zu laden und danach in die Browser-Ansicht zu wechseln.
                        </p>
                    </div>

                    <div class="archive-home-grid">
                        ${setCards}
                    </div>
                </section>

                <section class="archive-home-section">
                    <div class="archive-home-section__head">
                        <h4 class="archive-home-section__title">Hinweis</h4>
                    </div>

                    <div class="archive-home-note">
                        Die Suche oben bleibt absichtlich erst sinnvoll, nachdem du ein Set oder einen Bereich geöffnet hast.
                        So startet das Archiv mit einem besseren Ersteindruck und nicht mit einer halbfertigen Leerliste.
                    </div>
                </section>
            </div>
        `;
    }
};

export default ArchiveHomeLayout;
