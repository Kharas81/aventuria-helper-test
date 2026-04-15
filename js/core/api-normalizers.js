import CONFIG from './config.js';
import Utils from './utils.js';

export const ApiNormalizers = {
    extractAdventureIdFromRedirect(redirectValue = '') {
        const normalized = Utils.normalizeString(redirectValue);
        if (!normalized) return '';

        const withoutQuery = normalized.split('?')[0].split('#')[0];
        const lastSegment = withoutQuery.split('/').pop() || '';
        return Utils.normalizeString(lastSegment.replace(/\.json$/i, ''));
    },

    normalizeAdventureIndexEntry(entry, fallbackSetKey = '') {
        if (!entry || typeof entry !== 'object') {
            return null;
        }

        const resolvedSetKey = CONFIG.normalizeSetKey(
            entry?.set?.id || fallbackSetKey || CONFIG.defaultSet
        );
        const setConfig = CONFIG.getSet(resolvedSetKey);

        const id = Utils.normalizeString(entry.id);
        if (!id) {
            return null;
        }

        return {
            id,
            name: Utils.normalizeString(entry.name) || id,
            status: Utils.normalizeString(entry.status) || 'raw',
            hidden: Boolean(entry.hidden),
            order: Number(entry.order ?? 9999),
            set: {
                id: setConfig.id,
                name: setConfig.name,
                shortName: setConfig.shortName || setConfig.name
            }
        };
    },

    normalizeAdventure(data, fallbackId = '', setKey = '') {
        const raw = data && typeof data === 'object' ? data : {};
        const resolvedSetKey = CONFIG.normalizeSetKey(
            raw?.set?.id || setKey || CONFIG.defaultSet
        );
        const setConfig = CONFIG.getSet(resolvedSetKey);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id || fallbackId),
            name: Utils.normalizeString(raw.name || fallbackId),
            status: Utils.normalizeString(raw.status || 'raw'),
            danger_calc: Number(raw?.danger_calc ?? 0),
            narrative: Utils.normalizeObject(raw.narrative),
            setup: Utils.normalizeObject(raw.setup),
            source: Utils.normalizeObject(raw.source),
            notes: Utils.normalizeString(raw.notes),
            set: {
                ...(Utils.normalizeObject(raw.set)),
                id: setConfig.id,
                name: Utils.normalizeString(raw?.set?.name) || setConfig.name,
                shortName: Utils.normalizeString(raw?.set?.shortName) || setConfig.shortName || setConfig.name
            }
        };
    },

    normalizeCatalogCard(card) {
        const raw = card && typeof card === 'object' ? card : {};
        const setId = Utils.normalizeString(raw?.set?.id || raw?.set || CONFIG.defaultSet);
        const setConfig = CONFIG.getSet(setId);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id),
            name: Utils.normalizeString(raw.name || raw.id),
            type: Utils.normalizeString(raw.type || 'unknown'),
            status: Utils.normalizeString(raw.status || 'raw'),
            card_category: Utils.normalizeString(raw.card_category || 'unknown'),

            set: {
                ...(Utils.normalizeObject(raw.set)),
                id: setConfig.id,
                name: Utils.normalizeString(raw?.set?.name) || setConfig.name,
                shortName: Utils.normalizeString(raw?.set?.shortName) || setConfig.shortName || setConfig.name
            },

            subtypes: Utils.normalizeArray(raw.subtypes),
            adventure_refs: Utils.normalizeArray(raw.adventure_refs),
            tags: Utils.normalizeArray(raw.tags),
            custom_tags: Utils.normalizeArray(raw.custom_tags),
            keywords: Utils.normalizeArray(raw.keywords),

            images: {
                front: Utils.normalizeString(raw?.images?.front || raw?.image),
                back: raw?.images?.back ?? null,
                alt: Utils.normalizeArray(raw?.images?.alt)
            },

            stats: Utils.normalizeObject(raw.stats),
            rules: Utils.normalizeObject(raw.rules),
            source: Utils.normalizeObject(raw.source),
            notes: Utils.normalizeString(raw.notes),
            search_text: Utils.normalizeString(raw.search_text)
        };
    },

    normalizeLegacyCard(card, fallbackAdventureId = '') {
        const raw = card && typeof card === 'object' ? card : {};

        return {
            ...raw,
            id: Utils.normalizeString(raw.id),
            name: Utils.normalizeString(raw.name || raw.id),
            type: Utils.normalizeString(raw.type || 'unknown'),
            status: Utils.normalizeString(raw.status || 'raw'),
            adventure_id: Utils.normalizeString(raw.adventure_id || fallbackAdventureId),
            set: Utils.normalizeString(raw.set || CONFIG.defaultSet),
            tags: Utils.normalizeArray(raw.tags),
            keywords: Utils.normalizeArray(raw.keywords),
            pool_refs: Utils.normalizeArray(raw.pool_refs),
            stats: Utils.normalizeObject(raw.stats),
            rules: Utils.normalizeObject(raw.rules),
            source: Utils.normalizeObject(raw.source),
            note: Utils.normalizeString(raw.note),
            image: Utils.normalizeString(raw.image),
            thumb: raw.thumb ?? null
        };
    },

    normalizeCardPayload(rawData, adventureId = '') {
        const raw = rawData && typeof rawData === 'object' ? rawData : {};

        return {
            adventure_id: Utils.normalizeString(raw.adventure_id || adventureId),
            adventure_name: Utils.normalizeString(raw.adventure_name),
            cards: Utils.normalizeArray(raw.cards).map(card =>
                this.normalizeLegacyCard(card, adventureId)
            )
        };
    }
};

export default ApiNormalizers;
