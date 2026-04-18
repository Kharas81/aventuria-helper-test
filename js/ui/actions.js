import Utils from '../core/utils.js';
import Constants from '../core/constants.js';
import State from '../core/state.js';
import ApiCardLookup from '../core/api-card-lookup.js';
import UIModals from './modals.js';
import CoreRuntime from '../core/runtime.js';

export const UIActions = {
    getSectionStateKey(sectionId) {
        const map = Constants.ui?.sectionStateMap ?? {};
        return map[sectionId] || null;
    },

    toggleSection(sectionId) {
        const section = Utils.byId(sectionId);
        if (!section) return;

        const isOpen = !section.classList.contains('show');
        section.classList.toggle('show', isOpen);

        const sectionKey = this.getSectionStateKey(sectionId);
        if (sectionKey) {
            State.setSectionOpen(sectionKey, isOpen);
        }

        CoreRuntime.persistIfAllowed();
    },

    normalizeArchiveQuery(value = '') {
        return Utils.normalizeString(value)
            .replace(/\s*\([^)]*\)\s*$/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
    },

    openArchiveWithSearch({ query = '', sourceFilter = '', setKey = '' } = {}) {
        const archive = CoreRuntime.getArchive();
        if (!archive?.open) {
            return;
        }

        const safeQuery = this.normalizeArchiveQuery(query);
        const safeSourceFilter = Utils.normalizeString(sourceFilter);
        const safeSetKey = Utils.normalizeString(setKey);

        CoreRuntime.getRenderCardDetail()?.closeCardDetail?.();

        archive.open({
            query: safeQuery,
            sourceFilter: safeSourceFilter,
            setKey: safeSetKey
        });
    },

    getActionMap() {
        return {
            'open-archive': () => {
                CoreRuntime.getArchive()?.open?.();
            },

            'close-archive': () => {
                CoreRuntime.getArchive()?.close?.();
            },

            'open-rulebook': () => {
                CoreRuntime.getRulebook()?.open?.();
            },

            'close-rulebook': () => {
                CoreRuntime.getRulebook()?.close?.();
            },

            'toggle-section': trigger => {
                this.toggleSection(trigger?.dataset?.target || '');
            },

            'combat-prev-phase': () => {
                CoreRuntime.getCombat()?.prevPhase?.();
            },

            'combat-next-phase': () => {
                CoreRuntime.getCombat()?.nextPhase?.();
            },

            'combat-roll-target': () => {
                CoreRuntime.getCombat()?.rollTarget?.();
            },

            'combat-update-ep': () => {
                CoreRuntime.getCombat()?.updateEpResult?.();
            },

            'combat-apply-intermission': () => {
                CoreRuntime.getCombat()?.applyIntermission?.();
            },

            'rulebook-tab': trigger => {
                CoreRuntime.getRulebook()?.showTab?.(trigger?.dataset?.tab);
            },

            'rulebook-prev-page': () => {
                CoreRuntime.getRulebook()?.prevPage?.();
            },

            'rulebook-next-page': () => {
                CoreRuntime.getRulebook()?.nextPage?.();
            },

            'archive-load-set': trigger => {
                CoreRuntime.getArchive()?.loadSet?.(trigger?.dataset?.set, {
                    sourceFilter: '__all__'
                });
            },

            'archive-filter-source': trigger => {
                CoreRuntime.getArchive()?.setSourceFilter?.(trigger?.dataset?.sourceFilter || '');
            },

            'archive-search': trigger => {
                this.openArchiveWithSearch({
                    query: trigger?.dataset?.archiveQuery || '',
                    sourceFilter: trigger?.dataset?.archiveSource || '',
                    setKey: trigger?.dataset?.archiveSet || ''
                });
            },

            'open-card-detail': async trigger => {
                const preferArchiveSearch = String(
                    trigger?.dataset?.preferArchiveSearch || ''
                ).toLowerCase() === 'true';

                const fallbackQuery = this.normalizeArchiveQuery(
                    trigger?.dataset?.archiveQuery
                    || trigger?.dataset?.cardQuery
                    || trigger?.dataset?.cardLabel
                    || ''
                );

                const archiveSource = Utils.normalizeString(trigger?.dataset?.archiveSource);
                const archiveSet = Utils.normalizeString(trigger?.dataset?.archiveSet);
                const cardId = Utils.normalizeString(trigger?.dataset?.cardId);

                if (preferArchiveSearch && fallbackQuery) {
                    this.openArchiveWithSearch({
                        query: fallbackQuery,
                        sourceFilter: archiveSource,
                        setKey: archiveSet
                    });
                    return;
                }

                if (cardId) {
                    const openedCard = await ApiCardLookup.openCardDetailById(cardId);
                    if (openedCard) {
                        return;
                    }
                }

                if (fallbackQuery) {
                    this.openArchiveWithSearch({
                        query: fallbackQuery,
                        sourceFilter: archiveSource,
                        setKey: archiveSet
                    });
                }
            },

            'close-card-detail': () => {
                CoreRuntime.getRenderCardDetail()?.closeCardDetail?.();
            },

            'toggle-diagnostics-details': () => {
                CoreRuntime.getDiagnostics()?.toggleDetails?.();
            },

            'clear-diagnostics': () => {
                CoreRuntime.getDiagnostics()?.clear?.();
            }
        };
    },

    handleActionTrigger(trigger) {
        const action = String(trigger?.dataset?.action ?? '').trim();
        if (!action) return;

        const handler = this.getActionMap()[action];
        if (typeof handler === 'function') {
            const result = handler(trigger);

            if (result && typeof result.then === 'function') {
                result.catch(error => {
                    console.error(`Fehler bei UI-Aktion "${action}":`, error);
                });
            }
        }
    },

    bindGlobalUiEvents() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                UIModals.closeAll();
            }
        });

        document.addEventListener('click', event => {
            const trigger = event.target.closest('[data-action]');
            if (!trigger) return;

            this.handleActionTrigger(trigger);
        });
    },

    init() {
        this.bindGlobalUiEvents();
    }
};

export default UIActions;
