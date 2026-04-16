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

    /**
     * Wandelt die neuen Inhalts-Blöcke in HTML um.
     * Unterstützt Abwärtskompatibilität für alte HTML-Strings.
     */
    renderContentBlocks(rulebook, content) {
        if (!content) return '<p>Kein Inhalt vorhanden.</p>';
        
        // Falls es noch ein alter String ist, direkt zurückgeben
        if (typeof content === 'string') {
            return rulebook.stripCitationMarkers(content);
        }

        const blocks = Utils.normalizeArray(content);
        return blocks.map(block => {
            const text = rulebook.stripCitationMarkers(block.text || '');
            
            switch (block.type) {
                case 'header':
                    const level = block.level || 3;
                    return `<h${level}>${text}</h${level}>`;
                
                case 'paragraph':
                case 'narrative':
                    const cssClass = block.type === 'narrative' ? 'class="narrative-text"' : '';
                    return `<p ${cssClass}>${text}</p>`;
                
                case 'instruction_box':
                    const title = rulebook.stripCitationMarkers(block.title || 'Spielanweisung');
                    const action = rulebook.stripCitationMarkers(block.action || '');
                    const resultsHtml = Utils.normalizeArray(block.results).map(res => 
                        `<li><strong>${rulebook.stripCitationMarkers(res.outcome)}:</strong> ${rulebook.stripCitationMarkers(res.text)}</li>`
                    ).join('');
                    
                    return `
                        <div class="instruction-box">
                            <div class="box-header">${title}</div>
                            <div class="box-content">
                                <p class="box-action">${action}</p>
                                ${resultsHtml ? `<ul class="box-results">${resultsHtml}</ul>` : ''}
                            </div>
                        </div>
                    `;

                case 'rule_block':
                    const ruleHeader = rulebook.stripCitationMarkers(block.header || '');
                    return `
                        <div class="rule-block">
                            ${ruleHeader ? `<h4>${ruleHeader}</h4>` : ''}
                            <p>${text}</p>
                        </div>
                    `;

                case 'map_index':
                    const elements = Utils.normalizeArray(block.elements).join(', ');
                    return `<div class="map-index"><small>Orte: ${elements}</small></div>`;

                default:
                    return text ? `<p>${text}</p>` : '';
            }
        }).join('');
    },

    async loadPage(rulebook, pageNumber) {
        const container = rulebook.ui.getManualContent();
        const indicator = rulebook.ui.getPageIndicator();
        const titleEl = rulebook.ui.getManualTitle();

        if (!container) return;

        const entry = this.getPageEntry(rulebook, pageNumber);
        if (!entry) {
            container.innerHTML = '<div class="reader-text">Diese Seite ist aktuell nicht verfügbar.</div>';
            if (indicator) indicator.textContent = 'Seite nicht verfügbar';
            return;
        }

        container.innerHTML = '<div class="reader-text">Seite wird geladen ...</div>';

        try {
            const response = await fetch(entry.path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const rawTitle = rulebook.stripCitationMarkers(data?.title ?? `Seite ${entry.page}`);
            
            // Neues Rendering-System nutzen
            const contentHtml = this.renderContentBlocks(rulebook, data?.content);
            
            const imagePath = Utils.normalizeString(data?.image);
            const hasImage = Utils.hasRealImage(imagePath);
            const resolvedImage = hasImage ? Utils.resolveImagePath(imagePath) : '';

            container.innerHTML = `
                <div class="reader-container">
                    <div class="reader-page">
                        ${hasImage ? `
                            <div class="img-wrapper">
                                <img id="rulebook-page-image" alt="${Utils.escapeHtml(rawTitle)}" class="manual-page-img" loading="lazy">
                            </div>
                        ` : ''}
                        <div class="reader-text">${contentHtml}</div>
                    </div>
                </div>
            `;

            if (hasImage) {
                Utils.setSafeImageSource(container.querySelector('#rulebook-page-image'), resolvedImage);
            }

            if (indicator) indicator.textContent = this.buildIndicatorText(rulebook, entry.page);
            if (titleEl) titleEl.textContent = rawTitle;
            rulebook.currentPage = entry.page;

        } catch (error) {
            console.error('Fehler:', error);
            container.innerHTML = '<div class="reader-text">Fehler beim Laden der Seite.</div>';
        }
    }
};

export default RulebookReader;
