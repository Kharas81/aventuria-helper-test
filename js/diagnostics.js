window.Diagnostics = {
    state: {
        visible: false,
        detailsOpen: true,
        summary: {
            errorCount: 0,
            warningCount: 0,
            infoCount: 0
        },
        sections: []
    },

    getSectionEl() {
        return Utils.byId('diagnostics-section');
    },

    getSummaryEl() {
        return Utils.byId('diagnostics-summary');
    },

    getDetailsEl() {
        return Utils.byId('diagnostics-details');
    },

    reset() {
        this.state = {
            visible: false,
            detailsOpen: true,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };

        this.render();
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
        this.state.visible = this.state.sections.length > 0;
        this.render();
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

    renderSummary() {
        const summaryEl = this.getSummaryEl();
        if (!summaryEl) return;

        const { errorCount, warningCount, infoCount } = this.state.summary;

        if (!this.state.visible) {
            summaryEl.innerHTML = '';
            return;
        }

        const overallState = errorCount > 0
            ? 'Fehler gefunden'
            : warningCount > 0
                ? 'Warnungen vorhanden'
                : 'Keine kritischen Probleme';

        summaryEl.innerHTML = `
            <div class="card-list" style="padding:12px; margin:0;">
                <p style="margin:0 0 8px 0;"><strong>Status:</strong> ${Utils.escapeHtml(overallState)}</p>
                <div style="display:flex; gap:12px; flex-wrap:wrap;">
                    <span><strong>Fehler:</strong> ${Utils.escapeHtml(errorCount)}</span>
                    <span><strong>Warnungen:</strong> ${Utils.escapeHtml(warningCount)}</span>
                    <span><strong>Infos:</strong> ${Utils.escapeHtml(infoCount)}</span>
                </div>
            </div>
        `;
    },

    renderDetails() {
        const detailsEl = this.getDetailsEl();
        if (!detailsEl) return;

        if (!this.state.visible || !this.state.detailsOpen) {
            detailsEl.innerHTML = '';
            return;
        }

        detailsEl.innerHTML = this.state.sections.map(section => {
            const badge = section.errors.length > 0
                ? '❌'
                : section.warnings.length > 0
                    ? '⚠️'
                    : '✅';

            const metaHtml = Object.keys(section.meta).length
                ? `
                    <div style="margin-top:8px; font-size:0.95em; opacity:0.9;">
                        ${Object.entries(section.meta).map(([key, value]) => `
                            <div><strong>${Utils.escapeHtml(key)}:</strong> ${Utils.escapeHtml(value)}</div>
                        `).join('')}
                    </div>
                `
                : '';

            const listBlock = (title, items) => {
                if (!items.length) return '';
                return `
                    <div style="margin-top:10px;">
                        <strong>${Utils.escapeHtml(title)}</strong>
                        <ul style="margin:8px 0 0 18px;">
                            ${items.map(item => `<li>${Utils.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            };

            return `
                <div class="card-list" style="margin-top:12px;">
                    <h3 style="margin-top:0;">${badge} ${Utils.escapeHtml(section.title)}</h3>
                    ${metaHtml}
                    ${listBlock('Fehler', section.errors)}
                    ${listBlock('Warnungen', section.warnings)}
                    ${listBlock('Infos', section.info)}
                </div>
            `;
        }).join('');
    },

    render() {
        const sectionEl = this.getSectionEl();
        if (!sectionEl) return;

        sectionEl.classList.toggle('hidden', !this.state.visible);

        this.renderSummary();
        this.renderDetails();
    },

    toggleDetails() {
        this.state.detailsOpen = !this.state.detailsOpen;
        this.render();
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

        const setupRefs = [
            ...(Array.isArray(adventure?.setup?.blue_cards) ? adventure.setup.blue_cards : []),
            ...(Array.isArray(adventure?.setup?.minion_cards) ? adventure.setup.minion_cards : []),
            ...(Array.isArray(adventure?.setup?.special_cards) ? adventure.setup.special_cards : [])
        ];

        const missingCards = [];

        setupRefs.forEach(entry => {
            const refId = typeof entry === 'string'
                ? Utils.normalizeString(entry)
                : Utils.normalizeString(entry?.id);

            if (!refId) return;

            const exists = cardsArray.some(card => Utils.normalizeString(card?.id) === refId);
            if (!exists) {
                missingCards.push(refId);
            }
        });

        if (missingCards.length) {
            this.addSection('Setup-Referenzen', {
                ok: false,
                errors: [],
                warnings: missingCards.map(id => `Karte aus Setup nicht im geladenen Kartenpool gefunden: ${id}`),
                info: []
            }, {
                meta: {
                    'Fehlende Referenzen': missingCards.length
                }
            });
        } else {
            this.addSection('Setup-Referenzen', {
                ok: true,
                errors: [],
                warnings: [],
                info: ['Alle Setup-Referenzen wurden im Kartenpool gefunden.']
            });
        }
    },

    init() {
        this.render();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Diagnostics?.init) {
        window.Diagnostics.init();
    }
});
