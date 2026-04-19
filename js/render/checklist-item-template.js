import Utils from '../core/utils.js';
import RenderCommon from './common.js';

export const ChecklistItemTemplate = {
    buildChecklistItem(card) {
        const normalized = RenderCommon.normalizeCard(card);

        const label = card?.label
            ? Utils.normalizeString(card.label)
            : RenderCommon.getCardLabel(normalized);

        const explicitArchiveQuery = Utils.normalizeString(card?.archiveQuery);
        const referenceQuery = explicitArchiveQuery || RenderCommon.normalizeReferenceQuery(label);

        const archiveSource = Utils.normalizeString(card?.archiveSource);
        const archiveSet = Utils.normalizeString(card?.archiveSet);
        const preferArchiveSearch = Boolean(card?.preferArchiveSearch);

        const safeLabel = Utils.escapeHtml(label);
        const imageSrc = RenderCommon.getCardImage(normalized);
        const cardId = Utils.escapeHtml(normalized.id || '');
        const safeReferenceQuery = Utils.escapeHtml(referenceQuery);
        const safeArchiveSource = Utils.escapeHtml(archiveSource);
        const safeArchiveSet = Utils.escapeHtml(archiveSet);

        const hasPreview = normalized.hasRealImage;
        const isMissing = normalized.status === 'missing';
        const isPlaceholder = normalized.status === 'placeholder';

        const previewAttr = hasPreview
            ? ` data-image="${Utils.escapeHtml(imageSrc)}" data-card-id="${cardId || safeReferenceQuery}" class="has-preview"`
            : '';

        const infoButton = `
            <button
                class="info-btn"
                type="button"
                title="Kartendetails oder passende Karten anzeigen"
                data-action="open-card-detail"
                data-card-id="${cardId}"
                data-card-label="${safeLabel}"
                data-card-query="${safeReferenceQuery}"
                data-archive-query="${safeReferenceQuery}"
                data-archive-source="${safeArchiveSource}"
                data-archive-set="${safeArchiveSet}"
                data-prefer-archive-search="${preferArchiveSearch ? 'true' : 'false'}"
                ${(!cardId && !safeReferenceQuery) ? 'disabled' : ''}
            >i</button>
        `;

        const suffix = isMissing
            ? ' ⚠️'
            : isPlaceholder
                ? ' 🛈'
                : '';

        return `
            <li
                class="checklist-item"
                data-card-id="${cardId}"
                data-card-label="${safeLabel}"
                data-card-query="${safeReferenceQuery}"
                data-archive-source="${safeArchiveSource}"
                data-archive-set="${safeArchiveSet}"
                data-prefer-archive-search="${preferArchiveSearch ? 'true' : 'false'}"
            >
                <input type="checkbox">
                <span${previewAttr}>${safeLabel}${suffix}</span>
                ${infoButton}
            </li>
        `;
    }
};

export default ChecklistItemTemplate;
