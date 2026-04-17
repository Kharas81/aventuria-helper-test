import Utils from '../../core/utils.js';

export const RulebookReader = {
    getPageEntries(rulebook) {
        return Utils.normalizeArray(rulebook?.manualIndex?.pages);
    },

    getPageEntry(rulebook, pageNumber) {
        const page = Number(pageNumber);
        return this.getPageEntries(rulebook).find(entry => entry.page === page) || null;
    },

    getFirstPage(rulebook) {
        return this.getPageEntries(rulebook)[0]?.page ?? null;
    },

    getNextPage(rulebook, currentPage) {
        const current = Number(currentPage);
        const entries = this.getPageEntries(rulebook);

        return entries.find(entry => entry.page > current)?.page
            ?? entries[entries.length - 1]?.page
            ?? null;
    },

    getPrevPage(rulebook, currentPage) {
        const current = Number(currentPage);
        const entries = [...this.getPageEntries(rulebook)].reverse();

        return entries.find(entry => entry.page < current)?.page
            ?? entries[entries.length - 1]?.page
            ?? null;
    },

    buildIndicatorText(rulebook, pageNumber) {
        const entries = this.getPageEntries(rulebook);
        const position = entries.findIndex(entry => entry.page === Number(pageNumber));
        const total = entries.length;

        if (total === 0) {
            return 'Seite 0 / 0';
        }

        if (position === -1) {
            return `Seite ${pageNumber}`;
        }

        return `Seite ${pageNumber} · ${position + 1} / ${total}`;
    },

    renderTocBlock(rulebook, block) {
        const title = rulebook.stripCitationMarkers(block.title || block.header || 'Inhaltsverzeichnis');
        const items = Utils.normalizeArray(block.items);

        const itemsHtml = items.map(item => {
            if (typeof item === 'string') {
                return `<li>${rulebook.stripCitationMarkers(item)}</li>`;
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
    },

    renderTableBlock(rulebook, block) {
        const headers = Utils.normalizeArray(block.headers).map(header =>
            rulebook.stripCitationMarkers(header)
        );
        const rows = Utils.normalizeArray(block.rows);

        if (headers.length === 0 && rows.length === 0) {
            return '';
        }

        const theadHtml = headers.length > 0
            ? `
                <thead>
                    <tr>
                        ${headers.map(header => `<th>${Utils.escapeHtml(header)}</th>`).join('')}
                    </tr>
                </thead>
            `
            : '';

        const tbodyHtml = rows.map(row => {
            const cells = Utils.normalizeArray(row).map(cell =>
                `<td>${Utils.escapeHtml(rulebook.stripCitationMarkers(cell))}</td>`
            ).join('');

            return `<tr>${cells}</tr>`;
        }).join('');

        return `
            <div class="manual-table-wrap">
                <table class="manual-table">
                    ${theadHtml}
                    <tbody>
                        ${tbodyHtml}
                    </tbody>
                </table>
            </div>
        `;
    },

    /**
     * Wandelt Inhalts-Blöcke in HTML um.
     * Unterstützt Abwärtskompatibilität für alte HTML-Strings.
     */
    renderContentBlocks(rulebook, content) {
        if (!content) return '<p>Kein Inhalt vorhanden.</p>';

        if (typeof content === 'string') {
            return rulebook.stripCitationMarkers(content);
        }

        const blocks = Utils.normalizeArray(content);

        return blocks.map(block => {
            const text = rulebook.stripCitationMarkers(block.text || '');

            switch (block.type) {
                case 'location':
                    return `<span class="location-info">${Utils.escapeHtml(text)}</span>`;

                case 'header': {
                    const rawLevel = Number(block.level || 3);
                    const level = Math.min(6, Math.max(1, rawLevel));
                    return `<h${level}>${Utils.escapeHtml(text)}</h${level}>`;
                }

                case 'paragraph':
                    return `<p>${Utils.escapeHtml(text)}</p>`;

                case 'narrative':
                    return `<p class="narrative-text">${Utils.escapeHtml(text)}</p>`;

                case 'instruction_box': {
                    const title = rulebook.stripCitationMarkers(block.title || 'Spielanweisung');
                    const action = rulebook.stripCitationMarkers(block.action || '');
                    const resultsHtml = Utils.normalizeArray(block.results).map(result => {
                        const outcome = rulebook.stripCitationMarkers(result?.outcome || '');
                        const resultText = rulebook.stripCitationMarkers(result?.text || '');

                        return `
                            <li>
                                <strong>${Utils.escapeHtml(outcome)}:</strong>
                                ${Utils.escapeHtml(resultText)}
                            </li>
                        `;
                    }).join('');

                    return `
                        <div class="instruction-box">
                            <div class="box-header">${Utils.escapeHtml(title)}</div>
                            <div class="box-content">
                                <p class="box-action">${Utils.escapeHtml(action)}</p>
                                ${resultsHtml ? `<ul class="box-results">${resultsHtml}</ul>` : ''}
                            </div>
                        </div>
                    `;
                }

                case 'rule_block': {
                    const header = rulebook.stripCitationMarkers(block.header || '');
                    return `
                        <div class="rule-block">
                            ${header ? `<strong>${Utils.escapeHtml(header)}:</strong> ` : ''}
                            ${Utils.escapeHtml(text)}
                        </div>
                    `;
                }

                case 'map_index': {
                    const elements = Utils.normalizeArray(block.elements)
                        .map(entry => rulebook.stripCitationMarkers(entry))
                        .join(', ');
                    return `<div class="map-index"><small>Orte: ${Utils.escapeHtml(elements)}</small></div>`;
                }

                case 'warning_box': {
                    const header = rulebook.stripCitationMarkers(block.header || 'Wichtig');
                    return `
                        <div class="warning-box">
                            <strong>${Utils.escapeHtml(header)}:</strong>
                            ${Utils.escapeHtml(text)}
                        </div>
                    `;
                }

                case 'toc':
                    return this.renderTocBlock(rulebook, block);

                case 'table':
                    return this.renderTableBlock(rulebook, block);

                default:
                    return text ? `<p>${Utils.escapeHtml(text)}</p>` : '';
            }
        }).join('');
    },

    async loadPage(rulebook, pageNumber) {
        const container = rulebook.ui.getManualContent();
        const indicator = rulebook.ui.getPageIndicator();
        const titleEl = rulebook.ui.getManualTitle();

        if (!container) {
            return;
        }

        const entry = this.getPageEntry(rulebook, pageNumber);
        if (!entry) {
            container.innerHTML = '<div class="reader-text">Diese Seite ist aktuell nicht verfügbar.</div>';
            if (indicator) {
                indicator.textContent = 'Seite nicht verfügbar';
            }
            return;
        }

        container.innerHTML = '<div class="reader-text">Seite wird geladen ...</div>';

        try {
            const response = await fetch(entry.path);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} beim Laden von ${entry.path}`);
            }

            const data = await response.json();
            const rawTitle = rulebook.stripCitationMarkers(data?.title ?? `Seite ${entry.page}`) || `Seite ${entry.page}`;

            const contentHtml = this.renderContentBlocks(rulebook, data?.content);

            const imagePath = Utils.normalizeString(data?.image);
            const hasImage = Utils.hasRealImage(imagePath);
            const resolvedImage = hasImage ? Utils.resolveImagePath(imagePath) : '';

            container.innerHTML = `
                <div class="reader-container">
                    <div class="reader-page">
                        ${hasImage ? `
                            <div class="img-wrapper">
                                <img
                                    id="rulebook-page-image"
                                    alt="${Utils.escapeHtml(rawTitle)}"
                                    class="manual-page-img"
                                    loading="lazy"
                                >
                            </div>
                        ` : ''}
                        <div class="reader-text">${contentHtml}</div>
                    </div>
                </div>
            `;

            if (hasImage) {
                const imageEl = container.querySelector('#rulebook-page-image');
                Utils.setSafeImageSource(imageEl, resolvedImage);
            }

            this.bindInlinePageActions(container, rulebook);

            if (indicator) {
                indicator.textContent = this.buildIndicatorText(rulebook, entry.page);
            }

            if (titleEl) {
                titleEl.textContent = rawTitle;
            }

            rulebook.currentPage = entry.page;
        } catch (error) {
            console.error('Fehler beim Laden der Regelbuch-Seite:', error);
            container.innerHTML = '<div class="reader-text">Fehler beim Laden der Seite.</div>';
        }
    },

    bindInlinePageActions(scope, rulebook) {
        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.boundRulebookPage === 'true') return;

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) {
                    rulebook.jumpToPage(page);
                }
            });

            button.dataset.boundRulebookPage = 'true';
        });
    }
};

export default RulebookReader;
