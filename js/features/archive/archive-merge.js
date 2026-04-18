import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';

export const ArchiveMerge = {
    inferSourceScope(card = {}) {
        const explicitScope = Utils.normalizeString(card?.source_scope);
        if (explicitScope) {
            return explicitScope;
        }

        const adventureRefs = Utils.normalizeArray(card?.adventure_refs);
        if (adventureRefs.length > 0) {
            return 'adventure_specific';
        }

        if (Utils.normalizeString(card?.set?.id)) {
            return 'set_catalog';
        }

        return 'unknown';
    },

    getPriority(card = {}) {
        const scope = this.inferSourceScope(card);
        return CONFIG.getArchiveMergePriority?.(scope) ?? 0;
    },

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
    },

    annotateCard(card = {}, options = {}) {
        const sourceScope = Utils.normalizeString(
            options?.sourceScope || card?.source_scope || this.inferSourceScope(card)
        ) || 'unknown';

        const sourceKey = Utils.normalizeString(
            options?.sourceKey || card?.source_key || ''
        );

        return {
            ...card,
            source_scope: sourceScope,
            source_key: sourceKey,
            archive_priority: CONFIG.getArchiveMergePriority?.(sourceScope) ?? 0
        };
    },

    choosePreferred(existingCard = {}, candidateCard = {}) {
        const existingPriority = Number(existingCard?.archive_priority ?? this.getPriority(existingCard));
        const candidatePriority = Number(candidateCard?.archive_priority ?? this.getPriority(candidateCard));

        if (candidatePriority > existingPriority) {
            return candidateCard;
        }

        if (candidatePriority < existingPriority) {
            return existingCard;
        }

        const existingHasImage = this.hasUsableImage(existingCard);
        const candidateHasImage = this.hasUsableImage(candidateCard);

        if (candidateHasImage && !existingHasImage) {
            return candidateCard;
        }

        if (existingHasImage && !candidateHasImage) {
            return existingCard;
        }

        const existingScore = this.getCompletenessScore(existingCard);
        const candidateScore = this.getCompletenessScore(candidateCard);

        if (candidateScore > existingScore) {
            return candidateCard;
        }

        return existingCard;
    },

    mergeCards(cards = []) {
        const merged = new Map();

        for (const rawCard of Utils.normalizeArray(cards)) {
            const card = this.annotateCard(rawCard);
            const id = Utils.normalizeString(card?.id);

            if (!id) {
                continue;
            }

            if (!merged.has(id)) {
                merged.set(id, card);
                continue;
            }

            const existingCard = merged.get(id);
            merged.set(id, this.choosePreferred(existingCard, card));
        }

        return Array.from(merged.values());
    },

    sortCards(cards = []) {
        return [...Utils.normalizeArray(cards)].sort((a, b) => {
            const categoryA = Utils.normalizeString(a?.card_category || a?.type);
            const categoryB = Utils.normalizeString(b?.card_category || b?.type);

            if (categoryA !== categoryB) {
                return categoryA.localeCompare(categoryB, 'de');
            }

            const nameA = Utils.normalizeString(a?.name || a?.id);
            const nameB = Utils.normalizeString(b?.name || b?.id);

            return nameA.localeCompare(nameB, 'de');
        });
    }
};

export default ArchiveMerge;
