import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import ApiCardLookup from '../../core/api-card-lookup.js';

export const RulebookSetManager = {
    stripCitationMarkers(text) {
        return String(text ?? '').replace(/\s*\[cite:\s*[\d\- ,]+\]/gi, '').trim();
    },

    resolveSetKey(preferredSetKey = '') {
        const normalizedPreferred = Utils.normalizeString(preferredSetKey);
        if (normalizedPreferred && CONFIG.hasSet?.(normalizedPreferred)) {
            return normalizedPreferred;
        }

        const activeSet = ApiCardLookup.getActiveSetKey?.();
        if (activeSet && CONFIG.hasSet?.(activeSet)) {
            return activeSet;
        }

        return CONFIG.defaultSet || 'base_game';
    },

    async ensureSet(rulebook, setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);

        if (rulebook.currentSet === resolvedSetKey && rulebook.manualIndex) {
            rulebook.ui.updateSetLabel(rulebook.currentSet);
            return;
        }

        rulebook.currentSet = resolvedSetKey;
        rulebook.rulesData = [];
        rulebook.rulesDataBuilt = false;
        rulebook.isBuildingRulesData = false;
        rulebook.manualIndex = await rulebook.indexLoader.load(resolvedSetKey);

        rulebook.ui.updateSetLabel(rulebook.currentSet);
        rulebook.ui.renderPageList(rulebook.manualIndex, page => rulebook.jumpToPage(page));
        rulebook.ui.clearCodexResults();
        rulebook.ui.resetCodexSearch();

        const firstAvailablePage = Utils.normalizeArray(rulebook.manualIndex?.pages)[0]?.page ?? null;
        const hasCurrentPage = Utils.normalizeArray(rulebook.manualIndex?.pages)
            .some(entry => entry.page === Number(rulebook.currentPage));

        if (!hasCurrentPage) {
            rulebook.currentPage = firstAvailablePage;
        }

        Events.emit(
            Constants.events?.rulebookIndexLoaded || 'rulebook:indexLoaded',
            {
                source: 'rulebook',
                setKey: rulebook.currentSet,
                pageCount: Utils.normalizeArray(rulebook.manualIndex?.pages).length
            }
        );

        Events.emit(
            Constants.events?.setChanged || 'set:changed',
            {
                source: 'rulebook',
                setKey: rulebook.currentSet
            }
        );
    }
};

export default RulebookSetManager;
