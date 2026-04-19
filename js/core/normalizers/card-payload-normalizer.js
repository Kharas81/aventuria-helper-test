import Utils from '../utils.js';
import LegacyCardNormalizer from './legacy-card-normalizer.js';

export const CardPayloadNormalizer = {
    normalizeCardPayload(rawData, adventureId = '') {
        const raw = rawData && typeof rawData === 'object' ? rawData : {};

        return {
            adventure_id: Utils.normalizeString(raw.adventure_id || adventureId),
            adventure_name: Utils.normalizeString(raw.adventure_name),
            cards: Utils.normalizeArray(raw.cards).map(card =>
                LegacyCardNormalizer.normalizeLegacyCard(card, adventureId)
            )
        };
    }
};

export default CardPayloadNormalizer;
