window.Rulebook = {
    rulesData: [],
    rulesDataBuilt: false,
    isBuildingRulesData: false,
    currentPage: null,
    currentSet: '',
    manualIndex: null,

    stripCitationMarkers(text) {
        return String(text ?? '').replace(/\s*\[cite:\s*[\d\- ,]+\]/gi, '').trim();
    },

    resolveSetKey(preferredSetKey = '') {
        const normalizedPreferred = window.Utils.normalizeString(preferredSetKey);
        if (normalizedPreferred && window.CONFIG?.hasSet?.(normalizedPreferred)) {
            return normalizedPreferred;
        }

        const activeSet = window.ApiCardLookup?.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    async ensureSet(setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);

        if (this.currentSet === resolvedSetKey && this.manualIndex) {
            window.RulebookUI?.updateSetLabel?.(this.currentSet);
            return;
        }

        this.currentSet = resolvedSetKey;
        this.rulesData = [];
        this.rulesDataBuilt = false;
        this.isBuildingRulesData = false;
        this.manualIndex = await window.RulebookIndexLoader?.load?.(resolvedSetKey);

        window.RulebookUI?.updateSetLabel?.(this.currentSet);
        window.RulebookUI?.renderPageList?.(this.manualIndex);
        window.RulebookUI?.clearCodexResults?.();
        window.RulebookUI?.resetCodexSearch?.();

        const firstAvailablePage = window.Utils.normalizeArray(this.manualIndex?.pages)[0]?.page ?? null;
        const hasCurrentPage = window.Utils.normalizeArray(this.manualIndex?.pages)
            .some(entry => entry.page === Number(this.currentPage));

        if (!hasCurrentPage) {
            this.currentPage = firstAvailablePage;
        }

        window.Events?.emit?.(
            window.Constants?.events?.rulebookIndexLoaded || 'rulebook:indexLoaded',
            {
                source: 'rulebook',
                setKey: this.currentSet,
                pageCount: window.Utils.normalizeArray(this.manualIndex?.pages).length
            }
        );

        window.Events?.emit?.(
            window.Constants?.events?.setChanged || 'set:changed',
            {
                source: 'rulebook',
                setKey: this.currentSet
            }
        );
    },

    async ensureRulesData() {
        if (this.rulesDataBuilt || this.isBuildingRulesData) {
            return;
        }

        this.isBuildingRulesData = true;

        try {
            await window.RulebookCodex?.buildRulesData?.(this.currentSet);
            this.rulesDataBuilt = true;
        } finally {
            this.isBuildingRulesData = false;
        }
    },

    async open() {
        const modal = window.RulebookUI?.getModal?.();
        if (!modal) {
            return;
        }

        window.RulebookUI?.showModal?.();

        await this.ensureSet();
        await this.showTab('reader');

        const pageToLoad = this.currentPage ?? window.RulebookReader?.getFirstPage?.();
        if (pageToLoad !== null && pageToLoad !== undefined) {
            await window.RulebookReader?.loadPage?.(pageToLoad);
            return;
        }

        const container = window.RulebookUI?.getManualContent?.();
        if (container) {
            container.innerHTML = '<div class="reader-text">Kein Regelbuch-Index gefunden.</div>';
        }
    },

    close() {
        window.RulebookUI?.closeModal?.();
    },

    async showTab(tabName) {
        await window.RulebookUI?.showTab?.(tabName);
    },

    async loadPage(pageNumber) {
        await window.RulebookReader?.loadPage?.(pageNumber);
    },

    nextPage() {
        window.RulebookReader?.nextPage?.();
    },

    prevPage() {
        window.RulebookReader?.prevPage?.();
    },

    jumpToPage(pageNumber) {
        window.RulebookReader?.jumpToPage?.(pageNumber);
    },

    filterRules(term = '') {
        window.RulebookCodex?.filterRules?.(term);
    },

    async init() {
        window.RulebookUI?.bind?.();
        await this.ensureSet();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.Rulebook?.init?.();
    }, { once: true });
} else {
    window.Rulebook?.init?.();
}
