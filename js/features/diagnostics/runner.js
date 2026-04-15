import Utils from '../../core/utils.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import Validator from '../../core/validator.js';

export const DiagnosticsRunner = {
    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeObject(value) {
        return value && typeof value === 'object' && !Array.isArray(value)
            ? value
            : {};
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    createEmptyReport() {
        return {
            visible: false,
            detailsOpen: false,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };
    },

    addSection(report, title, result, options = {}) {
        const safeReport = this.normalizeObject(report);
        const safeResult = this.normalizeObject(result);
        const safeMeta = this.normalizeObject(options.meta);

        if (!Array.isArray(safeReport.sections)) {
            safeReport.sections = [];
        }

        safeReport.sections.push({
            title: this.normalizeString(title) || 'Diagnose',
            ok: Boolean(safeResult.ok),
            errors: this.normalizeArray(safeResult.errors),
            warnings: this.normalizeArray(safeResult.warnings),
            info: this.normalizeArray(safeResult.info),
            meta: safeMeta
        });

        this.recalculateSummary(safeReport);
        return safeReport;
    },

    recalculateSummary(report) {
        const safeReport = this.normalizeObject(report);
        const sections = this.normalizeArray(safeReport.sections);

        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        sections.forEach(section => {
            errorCount += this.normalizeArray(section.errors).length;
            warningCount += this.normalizeArray(section.warnings).length;
            infoCount += this.normalizeArray(section.info).length;
        });

        safeReport.summary = {
            errorCount,
            warningCount,
            infoCount
        };

        safeReport.visible = errorCount > 0 || warningCount > 0 || infoCount > 0;
        return safeReport;
    },

    createSingleMessageReport(type, title, message) {
        const report = this.createEmptyReport();

        this.addSection(report, title, {
            ok: type !== 'error',
            errors: type === 'error' ? [message] : [],
            warnings: type === 'warning' ? [message] : [],
            info: type === 'info' ? [message] : []
        });

        return report;
    },

    collectAssetWarnings(cards) {
        const warnings = [];
        const seenIds = new Set();

        this.normalizeArray(cards).forEach(card => {
            const id = this.normalizeString(card?.id || card?.name || '');

            if (id && seenIds.has(id)) {
                warnings.push(`Doppelte Karte im geladenen Satz: ${id}`);
            }

            if (id) {
                seenIds.add(id);
            }

            const image = this.normalizeString(card?.images?.front || card?.image || '');
            if (!image) {
                warnings.push(`Karte ohne Bildpfad: ${id || 'unbekannt'}`);
            }
        });

        return warnings;
    },

    classifySetupReferences(adventure, cards) {
        const setup = this.normalizeObject(adventure?.setup);
        const resolvedIds = new Set(
            this.normalizeArray(cards)
                .map(card => this.normalizeString(card?.id))
                .filter(Boolean)
        );

        const groups = [
            ...this.normalizeArray(setup.blue_cards),
            ...this.normalizeArray(setup.minion_cards),
            ...this.normalizeArray(setup.special_cards)
        ];

        const result = {
            resolved: [],
            placeholders: [],
            missing: []
        };

        groups.forEach(entry => {
            const refId = Validator.getSetupEntryId(entry) || this.normalizeString(entry?.id || entry);
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

    buildAdventureSection(adventure) {
        return Validator.validateAdventure(adventure) || {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };
    },

    buildCardsSection(cards) {
        const cardsArray = this.normalizeArray(cards);
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
            if (!result) return;

            if (this.normalizeArray(result.errors).length > 0) {
                sectionResult.ok = false;
                sectionResult.errors.push(
                    ...result.errors.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }

            if (this.normalizeArray(result.warnings).length > 0) {
                sectionResult.warnings.push(
                    ...result.warnings.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }

            if (this.normalizeArray(result.info).length > 0) {
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
    },

    buildMasterIndexSection(masterIndex, cards) {
        const masterCards = this.normalizeArray(masterIndex?.cards);
        const loadedCardIds = new Set(
            this.normalizeArray(cards)
                .map(card => this.normalizeString(card?.id))
                .filter(Boolean)
        );

        const missingInMaster = [];
        loadedCardIds.forEach(id => {
            const exists = masterCards.some(entry => this.normalizeString(entry?.id) === id);
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
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        const report = this.createEmptyReport();
        const safeContext = this.normalizeObject(context);

        Events.emit(Constants.events?.validationStarted || 'validation:started', {
            adventure,
            cards,
            masterIndex,
            context: safeContext
        });

        const adventureSection = this.buildAdventureSection(adventure);
        this.addSection(report, 'Abenteuerdatei', adventureSection, {
            meta: {
                ID: this.normalizeString(adventure?.id) || '—',
                Set: this.normalizeString(adventure?.set?.id || safeContext?.setKey) || '—'
            }
        });

        const cardsSection = this.buildCardsSection(cards);
        this.addSection(report, 'Kartenpool', cardsSection.result, {
            meta: cardsSection.meta
        });

        const masterSection = this.buildMasterIndexSection(masterIndex, cards);
        this.addSection(report, 'Master-Index', masterSection.result, {
            meta: masterSection.meta
        });

        const setupSection = this.buildSetupSection(adventure, cards);
        this.addSection(report, 'Setup-Referenzen', setupSection.result, {
            meta: setupSection.meta
        });

        report.detailsOpen = false;
        this.recalculateSummary(report);

        const payload = {
            report,
            adventure,
            cards,
            masterIndex,
            context: safeContext
        };

        Events.emit(Constants.events?.validationFinished || 'validation:finished', payload);
        return report;
    }
};

export default DiagnosticsRunner;
