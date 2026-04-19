import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ArchiveFilter from './filter.js';

export const ArchiveToolbarRenderer = {
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

    renderToolbar(container, {
        activeSetKey = '',
        activeSourceFilter = ArchiveFilter.ALL_SOURCE_FILTER,
        activeCategoryFilter = ArchiveFilter.ALL_CATEGORY_FILTER,
        availableSources = [],
        availableCategories = [],
        currentQuery = '',
        filteredCount = 0,
        totalCount = 0
    } = {}) {
        if (!container || !CONFIG.getEnabledSets) return;

        const enabledSets = CONFIG.getEnabledSets();
        const showAreaBlock = enabledSets.length > 1;

        const areaButtonsHtml = enabledSets.map(setConfig => {
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
                label: 'Alle Karten-Sets',
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

        const categoryButtons = [
            {
                label: 'Alle Kategorien',
                value: ArchiveFilter.ALL_CATEGORY_FILTER
            },
            ...Utils.normalizeArray(availableCategories).map(categoryKey => ({
                label: ArchiveFilter.getCategoryLabel(categoryKey),
                value: categoryKey
            }))
        ];

        const categoryButtonsHtml = categoryButtons.map(category => {
            const isActive = Utils.normalizeString(activeCategoryFilter) === Utils.normalizeString(category.value);

            return this.renderButton({
                text: category.label,
                variant: isActive ? 'solid' : 'outline',
                action: 'archive-filter-category',
                actionValue: category.value,
                attrName: 'data-category-filter'
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
            summaryParts.push(`Karten-Set: ${Utils.normalizeString(activeSourceFilter)}`);
        }

        if (
            Utils.normalizeString(activeCategoryFilter)
            && activeCategoryFilter !== ArchiveFilter.ALL_CATEGORY_FILTER
        ) {
            summaryParts.push(`Kategorie: ${ArchiveFilter.getCategoryLabel(activeCategoryFilter)}`);
        }

        container.innerHTML = `
            <div class="archive-controls">
                ${showAreaBlock ? `
                    <div class="archive-controls__block">
                        <div class="archive-controls__label">Bereich</div>
                        <div class="archive-controls__row">
                            ${areaButtonsHtml}
                        </div>
                    </div>
                ` : ''}

                <div class="archive-controls__block">
                    <div class="archive-controls__label">Karten-Set</div>
                    <div class="archive-controls__row">
                        ${sourceButtonsHtml}
                    </div>
                </div>

                <div class="archive-controls__block">
                    <div class="archive-controls__label">Kategorie</div>
                    <div class="archive-controls__row">
                        ${categoryButtonsHtml}
                    </div>
                </div>

                <p class="archive-result-summary">${Utils.escapeHtml(summaryParts.join(' • '))}</p>
            </div>
        `;
    }
};

export default ArchiveToolbarRenderer;
