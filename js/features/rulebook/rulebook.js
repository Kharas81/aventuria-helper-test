import RulebookIndexLoader from './index-loader.js';
import RulebookReader from './reader.js';
import RulebookCodex from './codex.js';
import RulebookUI from './rulebook-ui.js';

import RulebookSetManager from './rulebook-set-manager.js';
import RulebookRulesData from './rulebook-rules-data.js';
import RulebookNavigation from './rulebook-navigation.js';

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
        return RulebookSetManager.stripCitationMarkers(text);
    },

    resolveSetKey(preferredSetKey = '') {
        return RulebookSetManager.resolveSetKey(preferredSetKey);
    },

    async ensureSet(setKey = '') {
        return RulebookSetManager.ensureSet(this, setKey);
    },

    async ensureRulesData() {
        return RulebookRulesData.ensureRulesData(this);
    },

    async open() {
        return RulebookNavigation.open(this);
    },

    close() {
        return RulebookNavigation.close(this);
    },

    async showTab(tabName) {
        return RulebookNavigation.showTab(this, tabName);
    },

    async loadPage(pageNumber) {
        return RulebookNavigation.loadPage(this, pageNumber);
    },

    nextPage() {
        return RulebookNavigation.nextPage(this);
    },

    prevPage() {
        return RulebookNavigation.prevPage(this);
    },

    jumpToPage(pageNumber) {
        return RulebookNavigation.jumpToPage(this, pageNumber);
    },

    filterRules(term = '') {
        return RulebookNavigation.filterRules(this, term);
    },

    async init() {
        return RulebookNavigation.init(this);
    }
};

export default Rulebook;
