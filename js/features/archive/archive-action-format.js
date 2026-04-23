import Utils from '../../core/utils.js';

const ACTION_TOKEN_MAP = {
    TREFFERPUNKTE: {
        label: 'Trefferpunkte',
        variant: 'resource'
    },
    LEBEN: {
        label: 'Leben',
        variant: 'resource'
    },
    AKTIONEN: {
        label: 'Aktion',
        variant: 'resource'
    },
    AKTION: {
        label: 'Aktion',
        variant: 'resource'
    },
    AUSDAUERKARTE: {
        label: 'Ausdauerkarte',
        variant: 'resource'
    },
    AUSDAUERKARTEN: {
        label: 'Ausdauerkarten',
        variant: 'resource'
    },
    VERDERBEN: {
        label: 'Verderben',
        variant: 'status'
    },
    NAHKAMPF: {
        label: 'Nahkampf',
        variant: 'combat'
    },
    FERNKAMPF: {
        label: 'Fernkampf',
        variant: 'combat'
    },
    ZEIT: {
        label: 'Zeit',
        variant: 'generic'
    },
    PASSIV: {
        label: 'Passiv',
        variant: 'generic'
    }
};

function toTitleCase(rawValue = '') {
    const normalized = Utils.normalizeString(rawValue).toLowerCase();

    if (!normalized) {
        return '';
    }

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

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

export function formatArchiveActionText(rawText = '') {
    const normalizedText = Utils.normalizeString(rawText);

    if (!normalizedText) {
        return '';
    }

    const escapedText = Utils.escapeHtml(normalizedText);

    return escapedText.replace(/\[([^\]]+)\]/g, (_, rawToken) => {
        const normalizedToken = Utils.normalizeString(rawToken).toUpperCase();
        const tokenConfig = ACTION_TOKEN_MAP[normalizedToken];

        if (tokenConfig) {
            return `<span class="archive-inline-token archive-inline-token--${tokenConfig.variant}">${Utils.escapeHtml(tokenConfig.label)}</span>`;
        }

        return `<span class="archive-inline-token archive-inline-token--generic">${Utils.escapeHtml(toTitleCase(rawToken))}</span>`;
    });
}

const ArchiveActionFormat = {
    formatActionTypeLabel,
    parseArchiveActionTitle,
    formatArchiveActionText
};

export default ArchiveActionFormat;
