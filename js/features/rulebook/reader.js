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
            const contentHtml = String(rulebook.stripCitationMarkers(data?.content ?? '') ?? '').trim()
                || '<p>Kein Inhalt vorhanden.</p>';
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
    }
};

export default RulebookReader;
