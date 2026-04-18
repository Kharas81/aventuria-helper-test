import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ApiFetch from '../../core/api-fetch.js';
import ApiCardLookup from '../../core/api-card-lookup.js';

export const ArchiveLoader = {
    normalizeSetKey(setKey = '') {
        return Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );
    },

    getSuggestedSetKey(currentSet = '') {
        const activeSet = ApiCardLookup.getActiveSetKey?.();
        if (activeSet && CONFIG.hasSet?.(activeSet)) {
            return activeSet;
        }

        return this.normalizeSetKey(currentSet);
    },

    async getMasterEntries(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const masterIndex = await ApiFetch.getMasterIndex(resolvedSetKey);

        return Utils.normalizeArray(masterIndex?.cards);
    },

    async loadEntryDetail(entry, setKey = '') {
        if (entry?.detail_path) {
            const detail = await ApiCardLookup.getCatalogCard(entry.detail_path);
            if (detail) {
                return detail;
            }
        }

        if (entry?.id) {
            return await ApiCardLookup.findCardById(entry.id, setKey);
        }

        return null;
    },

    buildLocalPath(...parts) {
        return parts
            .map(part => Utils.normalizeString(part).replace(/^\/+|\/+$/g, ''))
            .filter(Boolean)
            .join('/');
    },

    cacheCatalogCard(cacheKey = '', card = null) {
        if (!card?.id || !window.ApiCache?.catalogCards) {
            return;
        }

        window.ApiCache.catalogCards[cacheKey || card.id] = card;
    },

    normalizeCatalogCardType(rawType = '', fallbackType = 'unknown') {
        const normalized = Utils.normalizeString(rawType).toLowerCase();

        if (normalized.includes('schergen')) {
            return 'minion';
        }

        return normalized || fallbackType;
    },

    normalizeCatalogCardCategory(rawType = '', fallbackCategory = 'unknown') {
        const normalized = Utils.normalizeString(rawType).toLowerCase();

        if (normalized.includes('schergen')) {
            return 'schergenkarte';
        }

        return normalized || fallbackCategory;
    },

    buildSearchText(name = '', rawCard = {}) {
        const specialRules = Utils.normalizeArray(rawCard?.specialRules);
        const keywords = Utils.normalizeArray(rawCard?.keywords);

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
            rawCard?.set,
            rawCard?.setSymbol,
            rawCard?.cardType,
            ...keywords,
            ...specialRules,
            ...actionTexts
        ]
            .map(value => Utils.normalizeString(value))
            .filter(Boolean)
            .join(' ');
    },

    normalizeLocalCatalogCard(rawCard = {}, meta = {}) {
        const fileStem = Utils.normalizeString(meta.fileStem);
        const name = Utils.normalizeString(rawCard?.cardName || rawCard?.name || fileStem);
        const id = Utils.normalizeString(rawCard?.id || fileStem);

        if (!id || !name) {
            return null;
        }

        const imageFile = Utils.normalizeString(rawCard?.image);
        const imagePath = imageFile
            ? this.buildLocalPath(meta.imageDir, imageFile)
            : '';

        const keywords = Utils.normalizeArray(rawCard?.keywords)
            .map(value => Utils.normalizeString(value))
            .filter(Boolean);

        const specialRules = Utils.normalizeArray(rawCard?.specialRules)
            .map(value => Utils.normalizeString(value))
            .filter(Boolean);

        const actionTable = Utils.normalizeArray(rawCard?.actionTable)
            .map(row => ({
                roll: Utils.normalizeString(row?.range || row?.roll),
                title: Utils.normalizeString(row?.title),
                description: Utils.normalizeString(row?.text || row?.description)
            }))
            .filter(row => row.roll || row.title || row.description);

        const stats = Utils.normalizeObject(rawCard?.stats);

        const tags = Array.from(new Set([
            'schergen',
            this.normalizeCatalogCardCategory(
                rawCard?.cardType || rawCard?.card_category,
                meta.defaultCardCategory || 'schergenkarte'
            ),
            ...keywords.map(value => value.toLowerCase())
        ].map(value => Utils.normalizeString(value)).filter(Boolean)));

        return {
            id,
            name,
            type: this.normalizeCatalogCardType(
                rawCard?.cardType || rawCard?.type,
                meta.defaultType || 'minion'
            ),
            status: 'playable',
            card_category: this.normalizeCatalogCardCategory(
                rawCard?.cardType || rawCard?.card_category,
                meta.defaultCardCategory || 'schergenkarte'
            ),

            set: {
                id: CONFIG.defaultSet || 'base_game',
                name: Utils.normalizeString(rawCard?.set)
                    || CONFIG.getSetDisplayName?.(CONFIG.defaultSet),
                shortName: Utils.normalizeString(rawCard?.setSymbol)
                    || Utils.normalizeString(rawCard?.set)
                    || CONFIG.getSetShortName?.(CONFIG.defaultSet)
            },

            subtypes: [],
            adventure_refs: [],
            tags,
            custom_tags: [],
            keywords,

            images: {
                front: imagePath,
                back: null,
                alt: []
            },

            image: imagePath,

            stats: {
                gp: stats?.gefahrenpunkte ?? null,
                lp: stats?.lebenspunkte ?? null,
                armor: stats?.ruestung ?? null,
                evasion: stats?.ausweichen ?? null,
                actions: stats?.aktionen ?? null,
                start_value: null,
                cost: null
            },

            rules: {
                passive: specialRules.join('\n\n'),
                success: '',
                fail: '',
                draw_effect: '',
                flavor: '',
                timed_effects: [],
                milestones: [],
                action_table: actionTable
            },

            source: {
                book: Utils.normalizeString(rawCard?.set) || 'Katalog',
                page: '',
                note: `Lokaler Katalog: ${Utils.normalizeString(meta.filePath)}`,
                file_path: Utils.normalizeString(meta.filePath),
                image_path: Utils.normalizeString(imagePath),
                illustration: Utils.normalizeString(rawCard?.illustration),
                source_images: Utils.normalizeArray(rawCard?.sourceImages),
                reference_images: Utils.normalizeArray(rawCard?.referenceImages),
                original_source: Utils.normalizeString(rawCard?.source)
            },

            notes: rawCard?.usedDuplicateForVerification
                ? 'Dublettenbild zur Verifikation verwendet.'
                : '',

            search_text: this.buildSearchText(name, rawCard)
        };
    },

    async fetchLocalCatalogCards(catalogKey = 'schergen') {
        const catalogConfig = CONFIG.getCatalogConfig?.(catalogKey);

        if (!catalogConfig?.enabled) {
            return [];
        }

        const indexData = await ApiFetch.getCatalogIndex(catalogKey);
        const fileNames = Utils.normalizeArray(indexData?.cards);

        const loadedCards = [];

        for (const fileName of fileNames) {
            const filePath = this.buildLocalPath(catalogConfig.dataDir, fileName);

            try {
                const rawCard = await ApiFetch.fetchJson(filePath);

                const normalizedCard = this.normalizeLocalCatalogCard(rawCard, {
                    catalogKey,
                    filePath,
                    fileName,
                    fileStem: Utils.normalizeString(fileName).replace(/\.json$/i, ''),
                    imageDir: catalogConfig.imageDir,
                    defaultType: catalogConfig.defaultType,
                    defaultCardCategory: catalogConfig.defaultCardCategory
                });

                if (normalizedCard) {
                    this.cacheCatalogCard(`local:${filePath}`, normalizedCard);
                    loadedCards.push(normalizedCard);
                }
            } catch (error) {
                console.warn(
                    'Lokale Katalogkarte konnte nicht geladen werden:',
                    filePath || fileName || 'unbekannt',
                    error
                );
            }
        }

        return loadedCards;
    },

    mergeCardsById(cards = []) {
        const map = new Map();

        for (const card of Utils.normalizeArray(cards)) {
            const id = Utils.normalizeString(card?.id);
            if (!id) {
                continue;
            }

            map.set(id, card);
        }

        return Array.from(map.values());
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
    },

    async fetchCardsForSet(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const entries = await this.getMasterEntries(resolvedSetKey);
        const loadedCards = [];

        for (const entry of entries) {
            try {
                const card = await this.loadEntryDetail(entry, resolvedSetKey);
                if (card) {
                    loadedCards.push(card);
                }
            } catch (error) {
                console.warn(
                    'Archivkarte konnte nicht geladen werden:',
                    entry?.id || entry?.detail_path || 'unbekannt',
                    error
                );
            }
        }

        const localSchergenCards = await this.fetchLocalCatalogCards('schergen');

        return this.sortCards(
            this.mergeCardsById([
                ...loadedCards,
                ...localSchergenCards
            ])
        );
    }
};

export default ArchiveLoader;
