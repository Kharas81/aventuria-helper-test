import Utils from '../../core/utils.js';
import RulebookReaderBlockRenderer from './reader-block-renderer.js';
import RulebookReaderNavigation from './reader-navigation.js';
import RulebookReaderActions from './reader-actions.js';

export const RulebookReaderPageLoader = {
    async loadPage(rulebook, pageNumber) {
        const container = rulebook.ui.getManualContent();
        const indicator = rulebook.ui.getPageIndicator();
        const titleEl = rulebook.ui.getManualTitle();

        if (!container) {
            return;
        }

        const entry = RulebookReaderNavigation.getPageEntry(rulebook, pageNumber);
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
            const contentHtml = RulebookReaderBlockRenderer.renderContentBlocks(rulebook, data?.content);

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

            RulebookReaderActions.bindInlinePageActions(container, rulebook);

            if (indicator) {
                indicator.textContent = RulebookReaderNavigation.buildIndicatorText(rulebook, entry.page);
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

export default RulebookReaderPageLoader;
