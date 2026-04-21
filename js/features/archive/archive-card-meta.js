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

    const asString = String(value).trim();
    return asString || fallback;
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
        return Utils.normalizeString(
            card?.set?.shortName
            || card?.set?.name
            || ArchiveFilter.getCardSourceName(card)
            || 'Unbekanntes Set'
        );
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
            gp: toDisplayValue(stats?.gp ?? stats?.gefahrenpunkte),
            leben: toDisplayValue(stats?.lp ?? stats?.lebenspunkte),
            ausweichen: toDisplayValue(stats?.evasion ?? stats?.ausweichen),
            ruestung: toDisplayValue(stats?.armor ?? stats?.ruestung),
            aktionen: toDisplayValue(stats?.actions ?? stats?.aktionen)
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
            card?.rules?.action_table
            || card?.actionTable
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

                const title = Utils.normalizeString(row?.title || row?.name);
                const range = Utils.normalizeString(row?.roll || row?.range);
                const text = Utils.normalizeString(
                    row?.description
                    || row?.text
                );

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

    getActionPreviewRows(card = {}, limit = 4) {
        return this.getActionRows(card)
            .slice(0, limit)
            .map(row => ({
                range: Utils.normalizeString(row?.range),
                title: Utils.normalizeString(row?.title || 'Ohne Titel')
            }))
            .filter(row => row.range || row.title);
    }
};

export default ArchiveCardMeta;
