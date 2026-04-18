import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import ApiFetch from '../../core/api-fetch.js';
import ApiCardLookup from '../../core/api-card-lookup.js';
import CatalogRepository from './catalog-repository.js';
import ArchiveMerge from './archive-merge.js';

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

    annotateMasterCard(card = {}, setKey = '') {
        const hasAdventureRefs = Utils.normalizeArray(card?.adventure_refs).length > 0;

        return ArchiveMerge.annotateCard(card, {
            sourceScope: hasAdventureRefs ? 'adventure_specific' : 'set_catalog',
            sourceKey: this.normalizeSetKey(setKey)
        });
    },

    annotateSupplementalCard(card = {}, catalogKey = '') {
        return ArchiveMerge.annotateCard(card, {
            sourceScope: 'central_catalog',
            sourceKey: Utils.normalizeString(catalogKey)
        });
    },

    async fetchMasterCards(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const entries = await this.getMasterEntries(resolvedSetKey);
        const loadedCards = [];

        for (const entry of entries) {
            try {
                const card = await this.loadEntryDetail(entry, resolvedSetKey);
                if (card) {
                    loadedCards.push(this.annotateMasterCard(card, resolvedSetKey));
                }
            } catch (error) {
                console.warn(
                    'Archivkarte konnte nicht geladen werden:',
                    entry?.id || entry?.detail_path || 'unbekannt',
                    error
                );
            }
        }

        return loadedCards;
    },

    async fetchSupplementalCards(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const catalogKeys = CONFIG.getSupplementalCatalogKeysForSet?.(resolvedSetKey) || [];

        if (!catalogKeys.length) {
            return [];
        }

        const results = await Promise.all(
            catalogKeys.map(async catalogKey => {
                const cards = await CatalogRepository.getCards(catalogKey);

                return Utils.normalizeArray(cards)
                    .map(card => this.annotateSupplementalCard(card, catalogKey));
            })
        );

        return results.flat();
    },

    async fetchCardsForSet(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);

        const [masterCards, supplementalCards] = await Promise.all([
            this.fetchMasterCards(resolvedSetKey),
            this.fetchSupplementalCards(resolvedSetKey)
        ]);

        const mergedCards = ArchiveMerge.mergeCards([
            ...masterCards,
            ...supplementalCards
        ]);

        return ArchiveMerge.sortCards(mergedCards);
    }
};

export default ArchiveLoader;
