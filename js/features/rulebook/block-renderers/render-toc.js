import Utils from '../../../core/utils.js';

export function renderToc(rulebook, block = {}) {
    const title = rulebook.stripCitationMarkers(block?.title || block?.header || 'Inhaltsverzeichnis');
    const items = Utils.normalizeArray(block?.items);

    const itemsHtml = items.map(item => {
        if (typeof item === 'string') {
            return `<li>${Utils.escapeHtml(rulebook.stripCitationMarkers(item))}</li>`;
        }

        const label = rulebook.stripCitationMarkers(item?.label || item?.text || '');
        const page = Number(item?.page);

        if (page > 0) {
            return `
                <li>
                    <button
                        type="button"
                        class="btn-outline btn-sm"
                        data-rulebook-page="${page}"
                    >
                        ${Utils.escapeHtml(label || `Seite ${page}`)}
                    </button>
                </li>
            `;
        }

        return `<li>${Utils.escapeHtml(label)}</li>`;
    }).join('');

    return `
        <div class="toc-box">
            <h3>${Utils.escapeHtml(title)}</h3>
            <ul class="toc-list">
                ${itemsHtml}
            </ul>
        </div>
    `;
}

export default renderToc;
