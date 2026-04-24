import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ArchiveFilter from './filter.js';

export const ArchiveSidebarRenderer = {
  renderButton({
    text = '',
    variant = 'outline',
    action = '',
    actionValue = '',
    attrName = '',
    className = '',
  } = {}) {
    const safeText = Utils.escapeHtml(text);
    const safeVariant = variant === 'solid' ? 'btn' : 'btn-outline';
    const safeAction = Utils.escapeHtml(action);
    const safeAttrName = Utils.escapeHtml(attrName);
    const safeActionValue = Utils.escapeHtml(actionValue);
    const safeClassName = Utils.escapeHtml(className);
    const extraAttr =
      safeAttrName && safeActionValue ? `${safeAttrName}="${safeActionValue}"` : '';

    return `
      <button class="${safeVariant} ${safeClassName}" type="button" data-action="${safeAction}" ${extraAttr}>
        ${safeText}
      </button>
    `;
  },

  renderSetbar(
    container,
    {
      activeSetKey = '',
      activeSourceFilter = ArchiveFilter.ALL_SOURCE_FILTER,
      availableSources = [],
    } = {}
  ) {
    if (!container || !CONFIG.getEnabledSets) return;

    const enabledSets = CONFIG.getEnabledSets();

    const areaButtonsHtml = enabledSets
      .map(setConfig => {
        const isActive = activeSetKey === setConfig.id;

        return this.renderButton({
          text: setConfig.shortName || setConfig.name || setConfig.id,
          variant: isActive ? 'solid' : 'outline',
          action: 'archive-load-set',
          actionValue: setConfig.id,
          attrName: 'data-set',
          className: 'archive-setbar__chip',
        });
      })
      .join('');

    const sourceButtons = [
      { label: 'Alle Sets', value: ArchiveFilter.ALL_SOURCE_FILTER },
      ...Utils.normalizeArray(availableSources).map(sourceName => ({
        label: sourceName,
        value: sourceName,
      })),
    ];

    const sourceButtonsHtml = sourceButtons
      .map(source => {
        const isActive =
          Utils.normalizeString(activeSourceFilter) === Utils.normalizeString(source.value);

        return this.renderButton({
          text: source.label,
          variant: isActive ? 'solid' : 'outline',
          action: 'archive-filter-source',
          actionValue: source.value,
          attrName: 'data-source-filter',
          className: 'archive-setbar__chip',
        });
      })
      .join('');

    container.innerHTML = `
      <div class="archive-setbar">
        <div class="archive-setbar__section">
          <div class="archive-setbar__label">Bereich</div>
          <div class="archive-setbar__row">${areaButtonsHtml}</div>
        </div>

        <div class="archive-setbar__section archive-setbar__section--source">
          <div class="archive-setbar__label">Karten-Set</div>
          <div class="archive-setbar__row">${sourceButtonsHtml}</div>
        </div>
      </div>
    `;
  },

  render(
    container,
    {
      activeCategoryFilter = ArchiveFilter.ALL_CATEGORY_FILTER,
      currentQuery = '',
      filteredCount = 0,
      totalCount = 0,
      activeSourceFilter = ArchiveFilter.ALL_SOURCE_FILTER,
    } = {}
  ) {
    if (!container) return;

    const categoryButtons = [
      { label: 'Alle Kategorien', value: ArchiveFilter.ALL_CATEGORY_FILTER },
      ...Utils.normalizeArray(arguments[1]?.availableCategories).map(categoryKey => ({
        label: ArchiveFilter.getCategoryLabel(categoryKey),
        value: categoryKey,
      })),
    ];

    const categoryButtonsHtml = categoryButtons
      .map(category => {
        const isActive =
          Utils.normalizeString(activeCategoryFilter) === Utils.normalizeString(category.value);

        return this.renderButton({
          text: category.label,
          variant: isActive ? 'solid' : 'outline',
          action: 'archive-filter-category',
          actionValue: category.value,
          attrName: 'data-category-filter',
        });
      })
      .join('');

    const summaryParts = [`${filteredCount} von ${totalCount} Karten`];

    if (Utils.normalizeString(currentQuery)) {
      summaryParts.push(`Suche: „${Utils.normalizeString(currentQuery)}“`);
    }

    if (
      Utils.normalizeString(activeSourceFilter) &&
      activeSourceFilter !== ArchiveFilter.ALL_SOURCE_FILTER
    ) {
      summaryParts.push(`Karten-Set: ${Utils.normalizeString(activeSourceFilter)}`);
    }

    if (
      Utils.normalizeString(activeCategoryFilter) &&
      activeCategoryFilter !== ArchiveFilter.ALL_CATEGORY_FILTER
    ) {
      summaryParts.push(`Kategorie: ${ArchiveFilter.getCategoryLabel(activeCategoryFilter)}`);
    }

    container.innerHTML = `
      <div class="archive-browser-head">
        <div class="archive-browser-head__eyebrow">Archiv Browser</div>
        <h4 class="archive-browser-head__title">Filter</h4>
        <p class="archive-browser-head__text">
          Links nur noch die feinen Filter. Die vielen Boxen sind jetzt oben.
        </p>
      </div>

      <div class="archive-sidebar-block">
        <div class="archive-sidebar-block__label">Kategorie</div>
        <div class="archive-sidebar-block__row">
          ${categoryButtonsHtml}
        </div>
      </div>

      <div class="archive-sidebar-summary">
        <strong>Aktueller Stand:</strong><br>
        ${Utils.escapeHtml(summaryParts.join(' • '))}
      </div>
    `;
  },
};

export default ArchiveSidebarRenderer;
