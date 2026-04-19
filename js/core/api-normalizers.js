import AdventureIndexNormalizer from './normalizers/adventure-index-normalizer.js';
import AdventureNormalizer from './normalizers/adventure-normalizer.js';
import CatalogCardNormalizer from './normalizers/catalog-card-normalizer.js';
import LegacyCardNormalizer from './normalizers/legacy-card-normalizer.js';
import CardPayloadNormalizer from './normalizers/card-payload-normalizer.js';

export const ApiNormalizers = {
    extractAdventureIdFromRedirect(redirectValue = '') {
        return AdventureIndexNormalizer.extractAdventureIdFromRedirect(redirectValue);
    },

    normalizeAdventureIndexEntry(entry, fallbackSetKey = '') {
        return AdventureIndexNormalizer.normalizeAdventureIndexEntry(entry, fallbackSetKey);
    },

    normalizeAdventure(data, fallbackId = '', setKey = '') {
        return AdventureNormalizer.normalizeAdventure(data, fallbackId, setKey);
    },

    normalizeCatalogCard(card) {
        return CatalogCardNormalizer.normalizeCatalogCard(card);
    },

    normalizeLegacyCard(card, fallbackAdventureId = '') {
        return LegacyCardNormalizer.normalizeLegacyCard(card, fallbackAdventureId);
    },

    normalizeCardPayload(rawData, adventureId = '') {
        return CardPayloadNormalizer.normalizeCardPayload(rawData, adventureId);
    }
};

export default ApiNormalizers;
