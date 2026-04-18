import Utils from '../../core/utils.js';
import Validator from '../../core/validator.js';

export const DiagnosticsSetupChecks = {
    classifySetupReferences(adventure, cards) {
        const setup = Utils.normalizeObject(adventure?.setup);
        const resolvedIds = new Set(
            Utils.normalizeArray(cards)
                .map(card => Utils.normalizeString(card?.id))
                .filter(Boolean)
        );

        const groups = [
            ...Utils.normalizeArray(setup.blue_cards),
            ...Utils.normalizeArray(setup.minion_cards),
            ...Utils.normalizeArray(setup.special_cards)
        ];

        const result = {
            resolved: [],
            placeholders: [],
            missing: []
        };

        groups.forEach(entry => {
            const refId = Validator.getSetupEntryId(entry)
                || Utils.normalizeString(entry?.id || entry);
            const refLabel = Validator.getSetupEntryLabel(entry) || refId;

            if (!refId) {
                return;
            }

            if (Validator.isPlaceholderCardRef(refId)) {
                result.placeholders.push(refLabel);
                return;
            }

            if (resolvedIds.has(refId)) {
                result.resolved.push(refLabel);
                return;
            }

            result.missing.push(refLabel);
        });

        return result;
    },

    buildSetupSection(adventure, cards) {
        const setupRefs = this.classifySetupReferences(adventure, cards);

        return {
            result: {
                ok: setupRefs.missing.length === 0,
                errors: [],
                warnings: setupRefs.missing.map(entry => `Nicht im geladenen Kartenpool gefunden: ${entry}`),
                info: [
                    ...(setupRefs.placeholders.length
                        ? setupRefs.placeholders.map(entry => `Platzhalter/variable Referenz erkannt: ${entry}`)
                        : ['Keine Platzhalter-Referenzen erkannt.']),
                    ...(setupRefs.missing.length === 0
                        ? ['Keine echten fehlenden Setup-Karten erkannt.']
                        : [])
                ]
            },
            meta: {
                'Gelöste Referenzen': setupRefs.resolved.length,
                Platzhalter: setupRefs.placeholders.length,
                'Fehlende Referenzen': setupRefs.missing.length
            }
        };
    }
};

export default DiagnosticsSetupChecks;
