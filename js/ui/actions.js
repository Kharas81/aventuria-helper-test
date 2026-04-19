import UIModals from './modals.js';
import {
    getSectionStateKey,
    toggleSection,
    getLayoutActions
} from './actions-layout.js';
import {
    normalizeArchiveQuery,
    openArchiveWithSearch,
    getArchiveActions
} from './actions-archive.js';
import { getRulebookActions } from './actions-rulebook.js';
import { getCombatActions } from './actions-combat.js';
import { getCardDetailActions } from './actions-card-detail.js';
import { getDiagnosticsActions } from './actions-diagnostics.js';

export const UIActions = {
    getSectionStateKey,
    toggleSection,
    normalizeArchiveQuery,
    openArchiveWithSearch,

    getActionMap() {
        return {
            ...getArchiveActions(),
            ...getRulebookActions(),
            ...getCombatActions(),
            ...getCardDetailActions(),
            ...getDiagnosticsActions(),
            ...getLayoutActions()
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
