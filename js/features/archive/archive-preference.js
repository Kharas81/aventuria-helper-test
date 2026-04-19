import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ArchiveScoring from './archive-scoring.js';

export const ArchivePreference = {
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

        const existingHasImage = ArchiveScoring.hasUsableImage(existingCard);
        const candidateHasImage = ArchiveScoring.hasUsableImage(candidateCard);

        if (candidateHasImage && !existingHasImage) {
            return candidateCard;
        }

        if (existingHasImage && !candidateHasImage) {
            return existingCard;
        }

        const existingScore = ArchiveScoring.getCompletenessScore(existingCard);
        const candidateScore = ArchiveScoring.getCompletenessScore(candidateCard);

        if (candidateScore > existingScore) {
            return candidateCard;
        }

        return existingCard;
    }
};

export default ArchivePreference;
