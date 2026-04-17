export const RulebookNavigation = {
    async open(rulebook) {
        const modal = rulebook.ui.getModal();
        if (!modal) {
            return;
        }

        rulebook.ui.showModal();

        await rulebook.ensureSet();
        await rulebook.showTab('reader');

        const pageToLoad = rulebook.currentPage ?? rulebook.reader.getFirstPage(rulebook);
        if (pageToLoad !== null && pageToLoad !== undefined) {
            await rulebook.reader.loadPage(rulebook, pageToLoad);
            return;
        }

        const container = rulebook.ui.getManualContent();
        if (container) {
            container.innerHTML = '<div class="reader-text">Kein Regelbuch-Index gefunden.</div>';
        }
    },

    close(rulebook) {
        rulebook.ui.closeModal();
    },

    async showTab(rulebook, tabName) {
        await rulebook.ui.showTab(tabName, rulebook);
    },

    async loadPage(rulebook, pageNumber) {
        await rulebook.reader.loadPage(rulebook, pageNumber);
    },

    nextPage(rulebook) {
        const nextPage = rulebook.reader.getNextPage(rulebook, rulebook.currentPage);
        if (nextPage !== null) {
            rulebook.reader.loadPage(rulebook, nextPage);
        }
    },

    prevPage(rulebook) {
        const prevPage = rulebook.reader.getPrevPage(rulebook, rulebook.currentPage);
        if (prevPage !== null) {
            rulebook.reader.loadPage(rulebook, prevPage);
        }
    },

    jumpToPage(rulebook, pageNumber) {
        const page = Number(pageNumber);
        if (!rulebook.reader.getPageEntry(rulebook, page)) {
            return;
        }

        rulebook.showTab('reader');
        rulebook.reader.loadPage(rulebook, page);
    },

    filterRules(rulebook, term = '') {
        rulebook.codex.filterRules(rulebook, term);
    },

    async init(rulebook) {
        rulebook.ui.bind(rulebook);
        await rulebook.ensureSet();
    }
};

export default RulebookNavigation;
