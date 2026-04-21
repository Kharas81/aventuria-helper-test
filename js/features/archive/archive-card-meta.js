import Utils from '../../core/utils.js';
import ArchiveFilter from './filter.js';

const TYPE_LABELS = {
    minion: 'Schergenkarte',
    schergenkarte: 'Schergenkarte',

    leader: 'Anführerkarte',
    anfuehrerkarte: 'Anführerkarte',
    anführerkarte: 'Anführerkarte',

    abenteuerkarte: 'Abenteuerkarte',

    special: 'Spezialkarte',
    event: 'Spezialkarte',
    story: 'Spezialkarte',
    spezialkarte: 'Spezialkarte'
};

const CATEGORY_TO_TYPE_LABEL = {
    schergen: 'Schergenkarte',
    anfuehrer: 'Anführerkarte',
    abenteuerkarten: 'Abenteuerkarte',
    spezial: 'Spezialkarte'
};

function toDisplayValue(value, fallback = '-') {
    if (value === null || value === undefined) {
        return fallback;
    }

    const normalized = Utils.normalizeString(value);
    return normalized || fallback;
}

function uniqueStrings(values = []) {
    const seen = new Set();
    const result = [];

    Utils.normalizeArray(values).forEach(value => {
        const normalized = Utils.normalizeString(value);
        if (!normalized) {
            return;
        }

        const key = normalized.toLowerCase();
        if (seen.has(key)) {
            return;
        }

        seen.add(key);
        result.push(normalized);
    });

    return result;
}

export const ArchiveCardMeta = {
    getCardId(card = {}) {
        return Utils.normalizeString(card?.id);
    },

    getDisplayName(card = {}) {
        return Utils.normalizeString(
            card?.name
            || card?.cardName
            || card?.title
            || card?.id
            || 'Unbekannte Karte'
        );
    },

    getSourceLabel(card = {}) {
        return Utils.normalizeString(ArchiveFilter.getCardSourceName(card) || 'Unbekanntes Set');
    },

    getTypeLabel(card = {}) {
        const rawType = Utils.normalizeString(
            card?.card_category
            || card?.cardType
            || card?.type
        ).toLowerCase();

        if (TYPE_LABELS[rawType]) {
            return TYPE_LABELS[rawType];
        }

        const categoryKey = ArchiveFilter.getCardCategoryKey(card);
        return CATEGORY_TO_TYPE_LABEL[categoryKey] || 'Karte';
    },

    getStats(card = {}) {
        const stats = card?.stats || {};

        return {
            gp: toDisplayValue(stats?.gefahrenpunkte),
            leben: toDisplayValue(stats?.lebenspunkte),
            ausweichen: toDisplayValue(stats?.ausweichen),
            ruestung: toDisplayValue(stats?.ruestung),
            aktionen: toDisplayValue(stats?.aktionen)
        };
    },

    getTags(card = {}) {
        return uniqueStrings([
            ...Utils.normalizeArray(card?.tags),
            ...Utils.normalizeArray(card?.custom_tags)
        ]);
    },

    getActionRows(card = {}) {
        const sourceRows = Utils.normalizeArray(
            card?.actionTable
            || card?.action_table
            || card?.actions
        );

        return sourceRows
            .map(row => {
                if (typeof row === 'string') {
                    const text = Utils.normalizeString(row);
                    if (!text) {
                        return null;
                    }

                    return {
                        range: '',
                        title: text,
                        text: ''
                    };
                }

                const title = Utils.normalizeString(row?.title || row?.name || 'Ohne Titel');
                const range = Utils.normalizeString(row?.range);
                const text = Utils.normalizeString(row?.text || row?.description);

                if (!title && !text) {
                    return null;
                }

                return {
                    range,
                    title: title || 'Ohne Titel',
                    text
                };
            })
            .filter(Boolean);
    },

    getActionTitles(card = {}, limit = 4) {
        return this.getActionRows(card)
            .map(row => Utils.normalizeString(row?.title))
            .filter(Boolean)
            .slice(0, limit);
    }
};

export default ArchiveCardMeta;
