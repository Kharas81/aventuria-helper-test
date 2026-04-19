import Utils from '../core/utils.js';

export function renderMetaRows(items = []) {
    const safeItems = items.filter(item => {
        if (!item) return false;

        return item?.isHtml
            ? Boolean(Utils.normalizeString(String(item.value)))
            : Boolean(Utils.normalizeString(item?.value));
    });

    if (!safeItems.length) {
        return '<p class="card-detail__empty">Keine Zusatzinfos vorhanden.</p>';
    }

    return `
        <dl class="card-detail__meta">
            ${safeItems.map(item => {
                const valueHtml = item?.isHtml
                    ? String(item.value)
                    : Utils.escapeHtml(String(item.value));

                return `
                    <div class="card-detail__meta-row">
                        <dt class="card-detail__meta-label">${Utils.escapeHtml(item.label)}</dt>
                        <dd class="card-detail__meta-value">${valueHtml}</dd>
                    </div>
                `;
            }).join('')}
        </dl>
    `;
}

export default {
    renderMetaRows
};
