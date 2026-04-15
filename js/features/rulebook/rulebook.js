import Utils from '../../core/utils.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import ApiCardLookup from '../../core/api-card-lookup.js';

import RulebookIndexLoader from './index-loader.js';
import RulebookReader from './reader.js';
import RulebookCodex from './codex.js';
import RulebookUI from './ui.js';

export const Rulebook = {
    rulesData: [],
    rulesDataBuilt: false,
    isBuildingRulesData: false,
    currentPage: null,
    currentSet: '',
    manualIndex: null,

    indexLoader: RulebookIndexLoader,
    reader: RulebookReader,
    codex: RulebookCodex,
    ui: RulebookUI,

    stripCitationMarkers(text) {
        return String(text ?? '').replace(/\s*\[cite:\s*[\d\- ,]+\]/gi, '').trim();
    },

    resolveSetKey(preferredSetKey = '') {
        const normalizedPreferred = Utils.normalizeString(preferredSetKey);
        if (normalizedPreferred && window.CONFIG?.hasSet?.(normalizedPreferred)) {
            return normalizedPreferred;
        }

        const activeSet = ApiCardLookup.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    async ensureSet(setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);

        if (this.currentSet === resolvedSetKey && this.manualIndex) {
            this.ui.updateSetLabel(this.currentSet);
            return;
        }

        this.currentSet = resolvedSetKey;
        this.rulesData = [];
        this.rulesDataBuilt = false;
        this.isBuildingRulesData = false;
        this.manualIndex = await this.indexLoader.load(resolvedSetKey);

        this.ui.updateSetLabel(this.currentSet);
        this.ui.renderPageList(this.manualIndex, page => this.jumpToPage(page));
        this.ui.clearCodexResults();
        this.ui.resetCodexSearch();

        const firstAvailablePage = Utils.normalizeArray(this.manualIndex?.pages)[0]?.page ?? null;
        const hasCurrentPage = Utils.normalizeArray(this.manualIndex?.pages)
            .some(entry => entry.page === Number(this.currentPage));

        if (!hasCurrentPage) {
            this.currentPage = firstAvailablePage;
        }

        Events.emit(
            Constants.events?.rulebookIndexLoaded || 'rulebook:indexLoaded',
            {
                source: 'rulebook',
                setKey: this.currentSet,
                pageCount: Utils.normalizeArray(this.manualIndex?.pages).length
            }
        );

        Events.emit(
            Constants.events?.setChanged || 'set:changed',
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
            await this.codex.buildRulesData(this);
            this.rulesDataBuilt = true;
        } finally {
            this.isBuildingRulesData = false;
        }
    },

    async open() {
        const modal = this.ui.getModal();
        if (!modal) {
            return;
        }

        this.ui.showModal();

        await this.ensureSet();
        await this.showTab('reader');

        const pageToLoad = this.currentPage ?? this.reader.getFirstPage(this);
        if (pageToLoad !== null && pageToLoad !== undefined) {
            await this.reader.loadPage(this, pageToLoad);
            return;
        }

        const container = this.ui.getManualContent();
        if (container) {
            container.innerHTML = '<div class="reader-text">Kein Regelbuch-Index gefunden.</div>';
        }
    },

    close() {
        this.ui.closeModal();
    },

    async showTab(tabName) {
        await this.ui.showTab(tabName, this);
    },

    async loadPage(pageNumber) {
        await this.reader.loadPage(this, pageNumber);
    },

    nextPage() {
        const nextPage = this.reader.getNextPage(this, this.currentPage);
        if (nextPage !== null) {
            this.reader.loadPage(this, nextPage);
        }
    },

    prevPage() {
        const prevPage = this.reader.getPrevPage(this, this.currentPage);
        if (prevPage !== null) {
            this.reader.loadPage(this, prevPage);
        }
    },

    jumpToPage(pageNumber) {
        const page = Number(pageNumber);
        if (!this.reader.getPageEntry(this, page)) {
            return;
        }

        this.showTab('reader');
        this.reader.loadPage(this, page);
    },

    filterRules(term = '') {
        this.codex.filterRules(this, term);
    },

    async init() {
        this.ui.bind(this);
        await this.ensureSet();
    }
};

export default Rulebook;
