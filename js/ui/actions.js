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
                CoreRuntime.getArchive()?.loadSet?.(trigger?.dataset?.set);
            },

            'open-card-detail': trigger => {
                if (trigger?.dataset?.cardId) {
                    ApiCardLookup.openCardDetailById(trigger.dataset.cardId);
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
            handler(trigger);
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
