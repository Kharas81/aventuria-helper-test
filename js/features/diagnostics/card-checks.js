import Utils from '../../core/utils.js';
import Validator from '../../core/validator.js';

export const DiagnosticsCardChecks = {
    collectAssetWarnings(cards) {
        const warnings = [];
        const seenIds = new Set();

        Utils.normalizeArray(cards).forEach(card => {
            const id = Utils.normalizeString(card?.id || card?.name || '');

            if (id && seenIds.has(id)) {
                warnings.push(`Doppelte Karte im geladenen Satz: ${id}`);
            }

            if (id) {
                seenIds.add(id);
            }

            const image = Utils.normalizeString(card?.images?.front || card?.image || '');
            if (!image) {
                warnings.push(`Karte ohne Bildpfad: ${id || 'unbekannt'}`);
            }
        });

        return warnings;
    },

    buildCardsSection(cards) {
        const cardsArray = Utils.normalizeArray(cards);
        const sectionResult = {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };

        if (cardsArray.length === 0) {
            sectionResult.warnings.push('Es wurden keine Karten für das Abenteuer geladen.');
            return {
                result: sectionResult,
                meta: {
                    Karten: 0
                }
            };
        }

        cardsArray.forEach(card => {
            const result = Validator.validateCard(card);
            if (!result) {
                return;
            }

            if (Utils.normalizeArray(result.errors).length > 0) {
                sectionResult.ok = false;
                sectionResult.errors.push(
                    ...result.errors.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }

            if (Utils.normalizeArray(result.warnings).length > 0) {
                sectionResult.warnings.push(
                    ...result.warnings.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }

            if (Utils.normalizeArray(result.info).length > 0) {
                sectionResult.info.push(
                    ...result.info.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }
        });

        const assetWarnings = this.collectAssetWarnings(cardsArray);
        if (assetWarnings.length > 0) {
            sectionResult.warnings.push(...assetWarnings);
        }

        if (sectionResult.errors.length === 0 && sectionResult.warnings.length === 0) {
            sectionResult.info.push('Alle geladenen Karten bestehen die Grundprüfung.');
        }

        return {
            result: sectionResult,
            meta: {
                Karten: cardsArray.length,
                'Asset-Warnungen': assetWarnings.length
            }
        };
    }
};

export default DiagnosticsCardChecks;
