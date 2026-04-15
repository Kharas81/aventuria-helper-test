window.RulebookReader = {
    getPageEntries() {
        return window.Utils.normalizeArray(window.Rulebook?.manualIndex?.pages);
    },

    getPageEntry(pageNumber) {
        const page = Number(pageNumber);
        return this.getPageEntries().find(entry => entry.page === page) || null;
    },

    getFirstPage() {
        return this.getPageEntries()[0]?.page ?? null;
    },

    getNextPage(currentPage) {
        const current = Number(currentPage);
        const entries = this.getPageEntries();

        return entries.find(entry => entry.page > current)?.page
            ?? entries[entries.length - 1]?.page
            ?? null;
    },

    getPrevPage(currentPage) {
        const current = Number(currentPage);
        const entries = [...this.getPageEntries()].reverse();

        return entries.find(entry => entry.page < current)?.page
            ?? entries[entries.length - 1]?.page
            ?? null;
    },

    buildIndicatorText(pageNumber) {
        const entries = this.getPageEntries();
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

    async loadPage(pageNumber) {
        const container = window.RulebookUI?.getManualContent?.();
        const indicator = window.RulebookUI?.getPageIndicator?.();
        const titleEl = window.RulebookUI?.getManualTitle?.();

        if (!container) {
            return;
        }

        const entry = this.getPageEntry(pageNumber);
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
            const rawTitle = window.Rulebook?.stripCitationMarkers?.(data?.title ?? `Seite ${entry.page}`)
                || `Seite ${entry.page}`;
            const contentHtml = String(window.Rulebook?.stripCitationMarkers?.(data?.content ?? '') ?? '').trim()
                || '<p>Kein Inhalt vorhanden.</p>';
            const imagePath = String(data?.image ?? '').trim();
            const hasImage = window.Utils?.hasRealImage?.(imagePath);
            const resolvedImage = hasImage
                ? window.Utils.resolveImagePath(imagePath)
                : '';

            container.innerHTML = `
                <div class="reader-container">
                    <div class="reader-page">
                        ${hasImage ? `
                            <div class="img-wrapper">
                                <img
                                    id="rulebook-page-image"
                                    alt="${window.Utils.escapeHtml(rawTitle)}"
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
                window.Utils?.setSafeImageSource?.(imageEl, resolvedImage);
            }

            if (indicator) {
                indicator.textContent = this.buildIndicatorText(entry.page);
            }

            if (titleEl) {
                titleEl.textContent = rawTitle;
            }

            window.Rulebook.currentPage = entry.page;
        } catch (error) {
            console.error('Fehler beim Laden der Regelbuch-Seite:', error);
            container.innerHTML = '<div class="reader-text">Fehler beim Laden der Seite.</div>';
        }
    },

    nextPage() {
        const nextPage = this.getNextPage(window.Rulebook?.currentPage);
        if (nextPage !== null) {
            return this.loadPage(nextPage);
        }
    },

    prevPage() {
        const prevPage = this.getPrevPage(window.Rulebook?.currentPage);
        if (prevPage !== null) {
            return this.loadPage(prevPage);
        }
    },

    jumpToPage(pageNumber) {
        const page = Number(pageNumber);
        if (!this.getPageEntry(page)) {
            console.warn(`Regelbuch-Seite ${page} ist aktuell nicht verfügbar.`);
            return;
        }

        window.Rulebook?.showTab?.('reader');
        return this.loadPage(page);
    }
};
