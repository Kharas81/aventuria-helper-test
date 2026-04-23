import Utils from '../../core/utils.js';

export function formatActionTypeLabel(rawType = '') {
    const normalized = Utils.normalizeString(rawType).toUpperCase();

    const knownLabels = {
        NAHKAMPF: 'Nahkampf',
        FERNKAMPF: 'Fernkampf',
        ZEIT: 'Zeit',
        PASSIV: 'Passiv'
    };

    if (knownLabels[normalized]) {
        return knownLabels[normalized];
    }

    if (!normalized) {
        return '';
    }

    return normalized.charAt(0) + normalized.slice(1).toLowerCase();
}

export function parseArchiveActionTitle(rawTitle = '') {
    const normalizedTitle = Utils.normalizeString(rawTitle);

    if (!normalizedTitle) {
        return {
            typeLabel: '',
            titleLabel: ''
        };
    }

    const match = normalizedTitle.match(/^\[([^\]]+)\]\s*-?\s*(.*)$/);

    if (!match) {
        return {
            typeLabel: '',
            titleLabel: normalizedTitle
        };
    }

    const typeLabel = formatActionTypeLabel(match[1]);
    const titleLabel = Utils.normalizeString(match[2]) || 'Aktion';

    return {
        typeLabel,
        titleLabel
    };
}

const ArchiveActionFormat = {
    formatActionTypeLabel,
    parseArchiveActionTitle
};

export default ArchiveActionFormat;
