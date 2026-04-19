import Utils from '../../core/utils.js';

export const ArchiveScoring = {
    hasUsableImage(card = {}) {
        return Utils.hasRealImage(
            card?.images?.front,
            card?.image
        );
    },

    getCompletenessScore(card = {}) {
        let score = 0;

        if (Utils.normalizeString(card?.name)) score += 5;
        if (this.hasUsableImage(card)) score += 15;

        score += Utils.normalizeArray(card?.tags).length;
        score += Utils.normalizeArray(card?.keywords).length;
        score += Utils.normalizeArray(card?.subtypes).length * 2;
        score += Utils.normalizeArray(card?.adventure_refs).length * 2;
        score += Utils.normalizeArray(card?.rules?.action_table).length * 4;

        if (Utils.normalizeString(card?.rules?.passive)) score += 5;
        if (Utils.normalizeString(card?.rules?.success)) score += 3;
        if (Utils.normalizeString(card?.rules?.fail)) score += 3;
        if (Utils.normalizeString(card?.rules?.draw_effect)) score += 3;
        if (Utils.normalizeString(card?.rules?.flavor)) score += 2;
        if (Utils.normalizeString(card?.notes)) score += 1;

        const stats = card?.stats || {};
        [
            stats?.gp,
            stats?.lp,
            stats?.armor,
            stats?.evasion,
            stats?.actions,
            stats?.start_value,
            stats?.cost
        ].forEach(value => {
            if (value !== null && value !== undefined && value !== '') {
                score += 2;
            }
        });

        return score;
    }
};

export default ArchiveScoring;
