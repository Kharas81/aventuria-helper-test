import Utils from '../../core/utils.js';
import ChecklistItemTemplate from '../checklist-item-template.js';
import CardPreviewBinder from '../card-preview-binder.js';
import SetupThemeMap from './setup-theme-map.js';

export const SetupGroupRenderer = {
    buildEmptyState() {
        return `
            <div class="setup-group__empty">
                Für diesen Bereich gibt es aktuell keine Einträge.
            </div>
        `;
    },

    renderItems(cards = []) {
        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            return this.buildEmptyState();
        }

        return `
            <ul class="setup-group__list">
                ${safeCards.map(card => ChecklistItemTemplate.buildChecklistItem(card)).join('')}
            </ul>
        `;
    },

    renderGroup(container, groupKey = '', cards = []) {
        if (!container) {
            return;
        }

        const theme = SetupThemeMap.getGroupTheme(groupKey);

        container.className = `setup-group ${theme.modifierClass}`;
        container.innerHTML = `
            <div class="setup-group__header">
                <div class="setup-group__icon" aria-hidden="true">${Utils.escapeHtml(theme.icon)}</div>

                <div class="setup-group__header-copy">
                    <span class="setup-group__eyebrow">${Utils.escapeHtml(theme.eyebrow)}</span>
                    <h3 class="setup-group__title">${Utils.escapeHtml(theme.title)}</h3>
                    <p class="setup-group__description">${Utils.escapeHtml(theme.description)}</p>
                </div>
            </div>

            ${this.renderItems(cards)}
        `;

        CardPreviewBinder.bindCardPreviews(container);
    }
};

export default SetupGroupRenderer;
