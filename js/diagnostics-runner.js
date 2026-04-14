window.DiagnosticsRunner = {
    state: {
        visible: false,
        detailsOpen: false,
        summary: {
            errorCount: 0,
            warningCount: 0,
            infoCount: 0
        },
        sections: []
    },

    reset() {
        this.state = {
            visible: false,
            detailsOpen: false,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };
        window.DiagnosticsRenderer?.render(this.state);
    },

    clear() {
        this.reset();
    },

    addSection(title, result, options = {}) {
        const safeResult = result && typeof result === 'object'
            ? result
            : { ok: true, errors: [], warnings: [], info: [] };

        const normalized = {
            title: String(title ?? 'Diagnose'),
            ok: Boolean(safeResult.ok),
            errors: Array.isArray(safeResult.errors) ? safeResult.errors : [],
            warnings: Array.isArray(safeResult.warnings) ? safeResult.warnings : [],
            info: Array.isArray(safeResult.info) ? safeResult.info : [],
            meta: options.meta && typeof options.meta === 'object' ? options.meta : {}
        };

        this.state.sections.push(normalized);
        this.recalculateSummary();

        const hasAnyMessages =
            this.state.summary.errorCount > 0 ||
            this.state.summary.warningCount > 0 ||
            this.state.summary.infoCount > 0;

        this.state.visible = hasAnyMessages;
        window.DiagnosticsRenderer?.render(this.state);
    },

    addMessage(type, title, message) {
        const entry = {
            ok: type !== 'error',
            errors: type === 'error' ? [message] : [],
            warnings: type === 'warning' ? [message] : [],
            info: type === 'info' ? [message] : []
        };

        this.addSection(title, entry);
    },

    recalculateSummary() {
        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        this.state.sections.forEach(section => {
            errorCount += section.errors.length;
            warningCount += section.warnings.length;
            infoCount += section.info.length;
        });

        this.state.summary = {
            errorCount,
            warningCount,
            infoCount
        };
    },

    toggleDetails() {
        this.state.detailsOpen = !this.state.detailsOpen;
        window.DiagnosticsRenderer?.render(this.state);
    },

    collectAssetWarnings(cards) {
        const warnings = [];
        const seenIds = new Set();

        (Array.isArray(cards) ? cards : []).forEach(card => {
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

    classifySetupReferences(adventure, cards) {
        const sections = [
            { name: 'blue_cards', entries: Array.isArray(adventure?.setup?.blue_cards) ? adventure.setup.blue_cards : [] },
            { name: 'minion_cards', entries: Array.isArray(adventure?.setup?.minion_cards) ? adventure.setup.minion_cards : [] },
            { name: 'special_cards', entries: Array.isArray(adventure?.setup?.special_cards) ? adventure.setup.special_cards : [] }
        ];

        const loadedCardIds = new Set(
            (Array.isArray(cards) ? cards : [])
                .map(card => Utils.normalizeString(card?.id))
                .filter(Boolean)
        );

        const missing = [];
        const placeholders = [];
        const resolved = [];

        sections.forEach(section => {
            section.entries.forEach(entry => {
                const refId = window.Validator?.getSetupEntryId?.(entry) || '';
                const label = window.Validator?.getSetupEntryLabel?.(entry) || refId || 'unbekannt';

                if (!refId) {
                    return;
                }

                if (loadedCardIds.has(refId)) {
                    resolved.push(`${section.name}: ${refId}`);
                    return;
                }

                if (window.Validator?.isPlaceholderCardRef?.(refId)) {
                    placeholders.push(`${section.name}: ${refId}${label && label !== refId ? ` (${label})` : ''}`);
                    return;
                }

                missing.push(`${section.name}: ${refId}${label && label !== refId ? ` (${label})` : ''}`);
            });
        });

        return { missing, placeholders, resolved };
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        this.clear();

        if (!window.Validator) {
            this.addMessage('warning', 'Diagnose', 'Validator-Modul fehlt. Es wird nur eine Basisdiagnose angezeigt.');
            return;
        }

        const adventureResult = window.Validator.validateAdventure(adventure);
        const masterResult = window.Validator.validateMasterIndex(masterIndex);

        this.addSection('Abenteuer-Prüfung', adventureResult, {
            meta: {
                Abenteuer: adventure?.name || adventure?.id || 'unbekannt',
                Set: adventure?.set?.name || context.setKey || 'unbekannt'
            }
        });

        this.addSection('Master-Index-Prüfung', masterResult, {
            meta: {
                Set: masterIndex?.set?.name || context.setKey || 'unbekannt',
                'Karten im Index': Array.isArray(masterIndex?.cards) ? masterIndex.cards.length : 0
            }
        });

        const cardsArray = Array.isArray(cards) ? cards : [];

        if (!cardsArray.length) {
            this.addMessage(
                'warning',
                'Geladene Karten',
                'Für dieses Abenteuer wurden keine Karten geladen. Prüfe adventure_refs, detail_path oder Legacy-Dateien.'
            );
        } else {
            const cardErrors = [];
            const cardWarnings = [];
            const cardInfos = [];

            cardsArray.forEach(card => {
                const result = window.Validator.validateCard(card);

                result.errors.forEach(error => {
                    cardErrors.push(`${card?.id || card?.name || 'unbekannt'}: ${error}`);
                });

                result.warnings.forEach(warning => {
                    cardWarnings.push(`${card?.id || card?.name || 'unbekannt'}: ${warning}`);
                });

                result.info.forEach(info => {
                    cardInfos.push(`${card?.id || card?.name || 'unbekannt'}: ${info}`);
                });
            });

            const assetWarnings = this.collectAssetWarnings(cardsArray);
            cardWarnings.push(...assetWarnings);

            this.addSection('Karten-Prüfung', {
                ok: cardErrors.length === 0,
                errors: cardErrors,
                warnings: cardWarnings,
                info: [
                    `Geladene Karten: ${cardsArray.length}`,
                    ...cardInfos
                ]
            }, {
                meta: {
                    Abenteuer: adventure?.name || adventure?.id || 'unbekannt',
                    Set: adventure?.set?.name || context.setKey || 'unbekannt'
                }
            });
        }

        const setupRefs = this.classifySetupReferences(adventure, cardsArray);

        this.addSection('Setup-Referenzen', {
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
        }, {
            meta: {
                'Gelöste Referenzen': setupRefs.resolved.length,
                Platzhalter: setupRefs.placeholders.length,
                'Fehlende Referenzen': setupRefs.missing.length
            }
        });

        this.state.detailsOpen = false;
        window.DiagnosticsRenderer?.render(this.state);
    },

    init() {
        window.DiagnosticsRenderer?.render(this.state);
    }
};
