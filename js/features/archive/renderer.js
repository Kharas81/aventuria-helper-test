import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import Assets from '../../core/assets.js';
import ArchiveFilter from './filter.js';

export const ArchiveRenderer = {
    getGrid() {
        return Utils.byId('archive-grid');
    },

    getToolbarContainer() {
        return Utils.byId('archive-set-buttons');
    },

    getSearchInput() {
        return Utils.byId('archive-search');
    },

    setSearchValue(value = '') {
        const searchInput = this.getSearchInput();
        if (searchInput) {
            searchInput.value = Utils.normalizeString(value);
        }
    },

    showLoading() {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = '<div class="ui-empty-state">Archiv wird geladen ...</div>';
    },

    showError(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = `<div class="ui-empty-state">${Utils.escapeHtml(message || 'Fehler beim Laden des Archivs.')}</div>`;
    },

    showEmpty(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = `<div class="ui-empty-state">${Utils.escapeHtml(message || 'Keine Karten gefunden.')}</div>`;
    },

    renderButton({ text = '', variant = 'outline', action = '', actionValue = '', attrName = '' } = {}) {
        const safeText = Utils.escapeHtml(text);
        const safeVariant = variant === 'solid' ? 'btn' : 'btn-outline';
        const safeAction = Utils.escapeHtml(action);
        const safeAttrName = Utils.escapeHtml(attrName);
        const safeActionValue = Utils.escapeHtml(actionValue);

        const extraAttr = safeAttrName && safeActionValue
            ? `${safeAttrName}="${safeActionValue}"`
            : '';

        return `
            <button
                type="button"
                class="${safeVariant}"
                data-action="${safeAction}"
                ${extraAttr}
            >
                ${safeText}
            </button>
        `;
    },

    renderToolbar({
        activeSetKey = '',
        activeSourceFilter = ArchiveFilter.ALL_SOURCE_FILTER,
        availableSources = [],
        currentQuery = '',
        filteredCount = 0,
        totalCount = 0
    } = {}) {
        const container = this.getToolbarContainer();
        if (!container || !CONFIG.getEnabledSets) return;

        const enabledSets = CONFIG.getEnabledSets();

        const setButtonsHtml = enabledSets.map(setConfig => {
            const isActive = activeSetKey === setConfig.id;

            return this.renderButton({
                text: setConfig.shortName || setConfig.name || setConfig.id,
                variant: isActive ? 'solid' : 'outline',
                action: 'archive-load-set',
                actionValue: setConfig.id,
                attrName: 'data-set'
            });
        }).join('');

        const sourceButtons = [
            {
                label: 'Alle Quellen',
                value: ArchiveFilter.ALL_SOURCE_FILTER
            },
            ...Utils.normalizeArray(availableSources).map(sourceName => ({
                label: sourceName,
                value: sourceName
            }))
        ];

        const sourceButtonsHtml = sourceButtons.map(source => {
            const isActive = Utils.normalizeString(activeSourceFilter) === Utils.normalizeString(source.value);

            return this.renderButton({
                text: source.label,
                variant: isActive ? 'solid' : 'outline',
                action: 'archive-filter-source',
                actionValue: source.value,
                attrName: 'data-source-filter'
            });
        }).join('');

        const summaryParts = [`${filteredCount} von ${totalCount} Karten`];

        if (Utils.normalizeString(currentQuery)) {
            summaryParts.push(`Suche: „${Utils.normalizeString(currentQuery)}“`);
        }

        if (
            Utils.normalizeString(activeSourceFilter)
            && activeSourceFilter !== ArchiveFilter.ALL_SOURCE_FILTER
        ) {
            summaryParts.push(`Quelle: ${Utils.normalizeString(activeSourceFilter)}`);
        }

        container.innerHTML = `
            <div class="archive-controls">
                <div class="archive-controls__block">
                    <div class="archive-controls__label">Set</div>
                    <div class="archive-controls__row">
                        ${setButtonsHtml}
                    </div>
                </div>

                <div class="archive-controls__block">
                    <div class="archive-controls__label">Quelle</div>
                    <div class="archive-controls__row">
                        ${sourceButtonsHtml}
                    </div>
                </div>

                <p class="archive-result-summary">${Utils.escapeHtml(summaryParts.join(' • '))}</p>
            </div>
        `;
    },

    resolveCardImage(card) {
        return Utils.resolveImagePath(
            card?.images?.front,
            card?.image,
            Assets.getSharedCardPlaceholderPath?.(),
            Assets.getImageFallbackPath?.()
        );
    },

    resolveCardSourceLabel(card = {}) {
        return Utils.normalizeString(
            card?.set?.shortName
            || card?.set?.name
            || ArchiveFilter.getCardSourceName(card)
        );
    },

    resolveCardLayout(card = {}) {
        const layout = Utils.normalizeString(card?.layout || 'portrait').toLowerCase();
        return layout === 'landscape' ? 'landscape' : 'portrait';
    },

    buildEmptyMessage(options = {}) {
        const query = Utils.normalizeString(options?.query);
        const sourceFilter = Utils.normalizeString(options?.sourceFilter);

        if (query && sourceFilter && sourceFilter !== ArchiveFilter.ALL_SOURCE_FILTER) {
            return `Keine Karten gefunden für „${query}“ in „${sourceFilter}“.`;
        }

        if (query) {
            return `Keine Karten gefunden für „${query}“.`;
        }

        if (sourceFilter && sourceFilter !== ArchiveFilter.ALL_SOURCE_FILTER) {
            return `Keine Karten gefunden für die Quelle „${sourceFilter}“.`;
        }

        return 'Keine Karten gefunden.';
    },

    renderCard(card = {}) {
        const imageSrc = this.resolveCardImage(card);
        const layout = this.resolveCardLayout(card);
        const sourceLabel = this.resolveCardSourceLabel(card);

        const safeId = Utils.escapeHtml(Utils.normalizeString(card?.id));
        const safeName = Utils.escapeHtml(Utils.normalizeString(card?.name || 'Unbekannte Karte'));
        const safeSourceLabel = Utils.escapeHtml(sourceLabel);
        const safeImageSrc = Utils.escapeHtml(imageSrc);
        const safeAlt = Utils.escapeHtml(Utils.normalizeString(card?.name || 'Karte'));

        const landscapeClass = layout === 'landscape' ? ' archive-card--landscape' : '';

        return `
            <button
                type="button"
                class="archive-card${landscapeClass}"
                data-action="open-card-detail"
                data-card-id="${safeId}"
                data-card-label="${safeName}"
                title="${safeName}"
            >
                <div class="archive-card__media">
                    <img
                        class="archive-card__image"
                        src="${safeImageSrc}"
                        alt="${safeAlt}"
                        loading="lazy"
                    >
                </div>

                <div class="archive-card__body">
                    ${safeSourceLabel ? `<div class="archive-card__source">${safeSourceLabel}</div>` : ''}
                    <div class="archive-card__title">${safeName}</div>
                </div>
            </button>
        `;
    },

    renderGrid(cards = [], options = {}) {
        const grid = this.getGrid();
        if (!grid) return;

        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            this.showEmpty(this.buildEmptyMessage(options));
            return;
        }

        grid.innerHTML = safeCards.map(card => this.renderCard(card)).join('');

        grid.querySelectorAll('.archive-card__image').forEach(img => {
            Utils.attachImageFallback(img);
        });
    }
};

export default ArchiveRenderer;
