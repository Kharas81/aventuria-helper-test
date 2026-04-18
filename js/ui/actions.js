import Utils from '../core/utils.js';
import Constants from '../core/constants.js';
import State from '../core/state.js';
import ApiCardLookup from '../core/api-card-lookup.js';
import UIModals from './modals.js';

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

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    getActionMap() {
        return {
            'open-archive': () => {
                window.Archive?.open?.();
            },

            'close-archive': () => {
                window.Archive?.close?.();
            },

            'open-rulebook': () => {
                window.Rulebook?.open?.();
            },

            'close-rulebook': () => {
                window.Rulebook?.close?.();
            },

            'toggle-section': trigger => {
                this.toggleSection(trigger?.dataset?.target || '');
            },

            'combat-prev-phase': () => {
                window.Combat?.prevPhase?.();
            },

            'combat-next-phase': () => {
                window.Combat?.nextPhase?.();
            },

            'combat-roll-target': () => {
                window.Combat?.rollTarget?.();
            },

            'combat-update-ep': () => {
                window.Combat?.updateEpResult?.();
            },

            'combat-apply-intermission': () => {
                window.Combat?.applyIntermission?.();
            },

            'rulebook-tab': trigger => {
                window.Rulebook?.showTab?.(trigger?.dataset?.tab);
            },

            'rulebook-prev-page': () => {
                window.Rulebook?.prevPage?.();
            },

            'rulebook-next-page': () => {
                window.Rulebook?.nextPage?.();
            },

            'archive-load-set': trigger => {
                window.Archive?.loadSet?.(trigger?.dataset?.set);
            },

            'open-card-detail': trigger => {
                if (trigger?.dataset?.cardId) {
                    ApiCardLookup.openCardDetailById(trigger.dataset.cardId);
                }
            },

            'close-card-detail': () => {
                window.RenderCardDetail?.closeCardDetail?.();
            },

            'toggle-diagnostics-details': () => {
                window.Diagnostics?.toggleDetails?.();
            },

            'clear-diagnostics': () => {
                window.Diagnostics?.clear?.();
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
