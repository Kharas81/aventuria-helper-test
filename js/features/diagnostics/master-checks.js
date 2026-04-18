import Utils from '../../core/utils.js';

export const DiagnosticsMasterChecks = {
    buildMasterIndexSection(masterIndex, cards) {
        const masterCards = Utils.normalizeArray(masterIndex?.cards);
        const loadedCardIds = new Set(
            Utils.normalizeArray(cards)
                .map(card => Utils.normalizeString(card?.id))
                .filter(Boolean)
        );

        const missingInMaster = [];

        loadedCardIds.forEach(id => {
            const exists = masterCards.some(entry => Utils.normalizeString(entry?.id) === id);
            if (!exists) {
                missingInMaster.push(id);
            }
        });

        const result = {
            ok: missingInMaster.length === 0,
            errors: [],
            warnings: missingInMaster.map(id => `Geladene Karte fehlt im Master-Index: ${id}`),
            info: []
        };

        if (masterCards.length === 0) {
            result.warnings.push('Master-Index ist leer oder fehlt.');
        }

        if (missingInMaster.length === 0 && masterCards.length > 0) {
            result.info.push('Alle geladenen Karten sind im Master-Index verankert.');
        }

        return {
            result,
            meta: {
                'Master-Karten': masterCards.length,
                'Geladene Karten': loadedCardIds.size,
                'Fehlend im Master': missingInMaster.length
            }
        };
    }
};

export default DiagnosticsMasterChecks;
