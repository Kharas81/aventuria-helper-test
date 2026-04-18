import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';

export const CatalogCardNormalizer = {
    normalizeType(rawType = '', fallbackType = 'unknown') {
        const normalized = Utils.normalizeString(rawType).toLowerCase();

        if (normalized.includes('schergen')) {
            return 'minion';
        }

        return normalized || fallbackType;
    },

    normalizeCategory(rawType = '', fallbackCategory = 'unknown') {
        const normalized = Utils.normalizeString(rawType).toLowerCase();

        if (normalized.includes('schergen')) {
            return 'schergenkarte';
        }

        return normalized || fallbackCategory;
    },

    normalizeKeywords(rawKeywords = []) {
        return Utils.normalizeArray(rawKeywords)
            .map(value => Utils.normalizeString(value))
            .filter(Boolean);
    },

    normalizeTags(rawTags = []) {
        return Utils.normalizeArray(rawTags)
            .map(value => Utils.normalizeString(value).toLowerCase())
            .filter(Boolean);
    },

    normalizeSearchAliases(rawAliases = []) {
        return Utils.normalizeArray(rawAliases)
            .map(value => Utils.normalizeString(value))
            .filter(Boolean);
    },

    normalizeSpecialRules(rawSpecialRules = []) {
        return Utils.normalizeArray(rawSpecialRules)
            .map(value => Utils.normalizeString(value))
            .filter(Boolean);
    },

    normalizeActionTable(rawActionTable = []) {
        return Utils.normalizeArray(rawActionTable)
            .map(row => ({
                roll: Utils.normalizeString(row?.range || row?.roll),
                title: Utils.normalizeString(row?.title),
                description: Utils.normalizeString(row?.text || row?.description)
            }))
            .filter(row => row.roll || row.title || row.description);
    },

    getRawSetName(rawCard = {}) {
        if (typeof rawCard?.set === 'object' && rawCard?.set !== null) {
            return Utils.normalizeString(rawCard?.set?.name);
        }

        return Utils.normalizeString(rawCard?.set);
    },

    getRawSetId(rawCard = {}) {
        if (typeof rawCard?.set === 'object' && rawCard?.set !== null) {
            return Utils.normalizeString(rawCard?.set?.id);
        }

        return Utils.normalizeString(rawCard?.setId);
    },

    getRawSetShortName(rawCard = {}) {
        if (typeof rawCard?.set === 'object' && rawCard?.set !== null) {
            return Utils.normalizeString(rawCard?.set?.shortName || rawCard?.set?.name);
        }

        return Utils.normalizeString(rawCard?.setShortName || rawCard?.setSymbol || rawCard?.set);
    },

    normalizeLayout(rawCard = {}) {
        const explicit = Utils.normalizeString(rawCard?.layout || rawCard?.orientation).toLowerCase();

        if (explicit === 'landscape' || explicit === 'portrait') {
            return explicit;
        }

        return 'portrait';
    },

    buildSearchText(name = '', rawCard = {}) {
        const setName = this.getRawSetName(rawCard);
        const setShortName = this.getRawSetShortName(rawCard);
        const specialRules = this.normalizeSpecialRules(rawCard?.specialRules);
        const keywords = this.normalizeKeywords(rawCard?.keywords);
        const tags = this.normalizeTags(rawCard?.tags);
        const aliases = this.normalizeSearchAliases(rawCard?.searchAliases);

        const actionTexts = Utils.normalizeArray(rawCard?.actionTable)
            .map(row => [
                row?.range,
                row?.title,
                row?.text,
                row?.description
            ].filter(Boolean).join(' '))
            .filter(Boolean);

        return [
            name,
            setName,
            setShortName,
            rawCard?.setSymbol,
            rawCard?.cardType,
            ...tags,
            ...keywords,
            ...aliases,
            ...specialRules,
            ...actionTexts
        ]
            .map(value => Utils.normalizeString(value))
            .filter(Boolean)
            .join(' ');
    },

    buildTags(rawCard = {}, fallbackCategory = 'unknown') {
        const keywords = this.normalizeKeywords(rawCard?.keywords);
        const explicitTags = this.normalizeTags(rawCard?.tags);

        return Array.from(new Set([
            'schergen',
            this.normalizeCategory(
                rawCard?.cardType || rawCard?.card_category,
                fallbackCategory
            ),
            ...explicitTags,
            ...keywords.map(value => value.toLowerCase())
        ].map(value => Utils.normalizeString(value).toLowerCase()).filter(Boolean)));
    },

    normalizeStats(rawStats = {}) {
        const stats = Utils.normalizeObject(rawStats);

        return {
            gp: stats?.gefahrenpunkte ?? null,
            lp: stats?.lebenspunkte ?? null,
            armor: stats?.ruestung ?? null,
            evasion: stats?.ausweichen ?? null,
            actions: stats?.aktionen ?? null,
            start_value: null,
            cost: null
        };
    },

    normalizeSetInfo(rawCard = {}) {
        const setName = this.getRawSetName(rawCard)
            || CONFIG.getSetDisplayName?.(CONFIG.defaultSet);

        const setId = this.getRawSetId(rawCard)
            || CONFIG.defaultSet
            || 'base_game';

        const shortName = this.getRawSetShortName(rawCard)
            || setName
            || CONFIG.getSetShortName?.(CONFIG.defaultSet);

        return {
            id: setId,
            name: setName,
            shortName
        };
    },

    normalizeSource(rawCard = {}, entry = {}, imagePath = '') {
        const setName = this.getRawSetName(rawCard);

        return {
            book: setName || 'Katalog',
            page: '',
            note: `Lokaler Katalog: ${Utils.normalizeString(entry?.filePath)}`,
            file_path: Utils.normalizeString(entry?.filePath),
            image_path: Utils.normalizeString(imagePath),
            illustration: Utils.normalizeString(rawCard?.illustration),
            source_images: Utils.normalizeArray(rawCard?.sourceImages),
            reference_images: Utils.normalizeArray(rawCard?.referenceImages),
            original_source: Utils.normalizeString(rawCard?.source),
            catalog_key: Utils.normalizeString(entry?.catalogKey),
            set_symbol: Utils.normalizeString(rawCard?.setSymbol),
            set_name: setName
        };
    },

    normalizeRules(rawCard = {}) {
        const specialRules = this.normalizeSpecialRules(rawCard?.specialRules);

        return {
            passive: specialRules.join('\n\n'),
            success: '',
            fail: '',
            draw_effect: '',
            flavor: '',
            timed_effects: [],
            milestones: [],
            action_table: this.normalizeActionTable(rawCard?.actionTable)
        };
    },

    normalize(rawCard = {}, entry = {}) {
        const fileStem = Utils.normalizeString(entry?.fileStem);
        const name = Utils.normalizeString(rawCard?.cardName || rawCard?.name || fileStem);
        const id = Utils.normalizeString(rawCard?.id || fileStem);

        if (!id || !name) {
            return null;
        }

        const imageFile = Utils.normalizeString(rawCard?.image);
        const imagePath = imageFile
            ? `${Utils.normalizeString(entry?.imageDir).replace(/\/+$/g, '')}/${imageFile}`
            : '';

        return {
            id,
            name,
            type: this.normalizeType(
                rawCard?.cardType || rawCard?.type,
                entry?.defaultType || 'unknown'
            ),
            status: 'playable',
            card_category: this.normalizeCategory(
                rawCard?.cardType || rawCard?.card_category,
                entry?.defaultCardCategory || 'unknown'
            ),

            set: this.normalizeSetInfo(rawCard),

            subtypes: [],
            adventure_refs: [],
            tags: this.buildTags(rawCard, entry?.defaultCardCategory || 'unknown'),
            custom_tags: [],
            keywords: this.normalizeKeywords(rawCard?.keywords),
            search_aliases: this.normalizeSearchAliases(rawCard?.searchAliases),

            images: {
                front: imagePath,
                back: null,
                alt: []
            },

            image: imagePath,
            layout: this.normalizeLayout(rawCard),
            stats: this.normalizeStats(rawCard?.stats),
            rules: this.normalizeRules(rawCard),
            source: this.normalizeSource(rawCard, entry, imagePath),

            source_scope: 'central_catalog',
            source_key: Utils.normalizeString(entry?.catalogKey),

            notes: rawCard?.usedDuplicateForVerification
                ? 'Dublettenbild zur Verifikation verwendet.'
                : '',

            search_text: this.buildSearchText(name, rawCard)
        };
    }
};

export default CatalogCardNormalizer;
