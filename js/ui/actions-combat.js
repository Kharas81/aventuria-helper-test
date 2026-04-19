import CoreRuntime from '../core/runtime.js';

export function getCombatActions() {
    return {
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
        }
    };
}

export default {
    getCombatActions
};
