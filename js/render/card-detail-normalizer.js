import Utils from '../core/utils.js';
import RenderCommon from './common.js';

export function normalizeCardDetail(card) {
    const normalized = RenderCommon.normalizeCard(card);

    return {
        ...normalized,
        layout: Utils.normalizeString(
            card?.layout || normalized?.layout || 'portrait'
        ).toLowerCase(),
        card_category: Utils.normalizeString(card?.card_category),
        subtypes: RenderCommon.normalizeArray(card?.subtypes),
        source: card?.source ?? {},
        rules: {
            passive: Utils.normalizeString(card?.rules?.passive),
            success: Utils.normalizeString(card?.rules?.success),
            fail: Utils.normalizeString(card?.rules?.fail),
            draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
            flavor: Utils.normalizeString(card?.rules?.flavor),
            timed_effects: RenderCommon.normalizeArray(card?.rules?.timed_effects),
            milestones: RenderCommon.normalizeArray(card?.rules?.milestones),
            action_table: RenderCommon.normalizeArray(card?.rules?.action_table)
        },
        stats: {
            gp: card?.stats?.gp ?? null,
            lp: card?.stats?.lp ?? null,
            armor: card?.stats?.armor ?? null,
            evasion: card?.stats?.evasion ?? null,
            actions: card?.stats?.actions ?? null,
            start_value: card?.stats?.start_value ?? null,
            cost: card?.stats?.cost ?? null
        }
    };
}

export default {
    normalizeCardDetail
};
