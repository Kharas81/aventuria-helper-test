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

function canonicalizeTag(value = '') {
    return Utils.normalizeString(value)
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function countSpecialGermanChars(value = '') {
    const matches = Utils.normalizeString(value).match(/[äöüÄÖÜß]/g);
    return matches ? matches.length : 0;
}

function isPreferredTag(candidate = '', current = '') {
    const normalizedCandidate = Utils.normalizeString(candidate);
    const normalizedCurrent = Utils.normalizeString(current);

    const candidateSpecialCount = countSpecialGermanChars(normalizedCandidate);
    const currentSpecialCount = countSpecialGermanChars(normalizedCurrent);

    if (candidateSpecialCount !== currentSpecialCount) {
        return candidateSpecialCount > currentSpecialCount;
    }

    const candidateHasUppercase = /[A-ZÄÖÜ]/.test(normalizedCandidate);
    const currentHasUppercase = /[A-ZÄÖÜ]/.test(normalizedCurrent);

    if (candidateHasUppercase !== currentHasUppercase) {
        return candidateHasUppercase;
    }

    if (normalizedCandidate.length !== normalizedCurrent.length) {
        return normalizedCandidate.length < normalizedCurrent.length;
    }

    return normalizedCandidate.localeCompare(normalizedCurrent, 'de') < 0;
}

function uniqueStrings(values = []) {
    const map = new Map();

    Utils.normalizeArray(values).forEach(value => {
        const normalized = Utils.normalizeString(value);
        if (!normalized) {
            return;
        }

        const key = canonicalizeTag(normalized);
        const existing = map.get(key);

        if (!existing || isPreferredTag(normalized, existing)) {
            map.set(key, normalized);
        }
    });

    return Array.from(map.values());
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
