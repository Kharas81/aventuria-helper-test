import Utils from '../core/utils.js';

function normalizeVariant(variant = 'default') {
    return Utils.normalizeString(variant).toLowerCase() || 'default';
}

export const UIComponents = {
    renderBadge(text, variant = 'default') {
        const safeText = Utils.escapeHtml(text ?? '');
        const safeVariant = Utils.escapeHtml(normalizeVariant(variant));

        return `<span class="ui-badge ui-badge--${safeVariant}">${safeText}</span>`;
    },

    renderSection(title, content = '', options = {}) {
        const safeTitle = Utils.escapeHtml(title ?? '');
        const extraClass = Utils.escapeHtml(options.className ?? '');

        return `
            <section class="ui-section ${extraClass}">
                <div class="ui-section__header">
                    <h3 class="ui-section__title">${safeTitle}</h3>
                </div>
                <div class="ui-section__body">
                    ${content}
                </div>
            </section>
        `;
    },

    renderEmptyState(text = 'Keine Daten vorhanden.') {
        const safeText = Utils.escapeHtml(text);
        return `<div class="ui-empty-state">${safeText}</div>`;
    },

    renderMetaList(items = []) {
        const safeItems = Utils.normalizeArray(items).filter(item => {
            return item && item.label && item.value !== undefined && item.value !== null && item.value !== '';
        });

        if (!safeItems.length) {
            return '';
        }

        return `
            <dl class="ui-meta-list">
                ${safeItems.map(item => `
                    <div class="ui-meta-list__row">
                        <dt class="ui-meta-list__label">${Utils.escapeHtml(item.label)}</dt>
                        <dd class="ui-meta-list__value">${Utils.escapeHtml(String(item.value))}</dd>
                    </div>
                `).join('')}
            </dl>
        `;
    },

    renderImageCard({ src = '', alt = '', title = '', action = '', actionValue = '' } = {}) {
        const safeSrc = Utils.escapeHtml(Utils.resolveImagePath(src));
        const safeAlt = Utils.escapeHtml(alt || title || 'Bild');
        const safeTitle = Utils.escapeHtml(title || '');
        const safeAction = Utils.escapeHtml(action || '');
        const safeActionValue = Utils.escapeHtml(actionValue || '');

        const actionAttrs = safeAction
            ? `data-action="${safeAction}" ${safeActionValue ? `data-card-id="${safeActionValue}"` : ''}`
            : '';

        return `
            <button type="button" class="ui-image-card" ${actionAttrs} title="${safeTitle}">
                <img class="ui-image-card__image" src="${safeSrc}" alt="${safeAlt}" loading="lazy">
                <div class="ui-image-card__title">${safeTitle}</div>
            </button>
        `;
    },

    renderButton({ text = '', variant = 'outline', action = '', actionValue = '', className = '' } = {}) {
        const safeText = Utils.escapeHtml(text);
        const safeVariant = normalizeVariant(variant);
        const safeClassName = Utils.escapeHtml(className);
        const safeAction = Utils.escapeHtml(action);
        const safeActionValue = Utils.escapeHtml(actionValue);

        const buttonClass = safeVariant === 'solid' ? 'btn' : 'btn-outline';
        const actionAttrs = safeAction
            ? `data-action="${safeAction}" ${safeActionValue ? `data-set="${safeActionValue}"` : ''}`
            : '';

        return `
            <button type="button" class="${buttonClass} ${safeClassName}" ${actionAttrs}>
                ${safeText}
            </button>
        `;
    }
};

export default UIComponents;
