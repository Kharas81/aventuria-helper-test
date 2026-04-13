/**
 * js/validator.js
 * Grundvalidierung für Karten- und Abenteuerdaten.
 */
window.SystemCheck = {
    allowedTypes: [
        'timeline',
        'leader',
        'minion',
        'hero_action',
        'special',
        'reward',
        'training',
        'adventure_card',
        'environment',
        'unknown'
    ],

    allowedStatus: [
        'raw',
        'basic',
        'playable',
        'verified'
    ],

    async fetchJson(path) {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`${path} → HTTP ${res.status}`);
        }
        return await res.json();
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    addIssue(list, severity, area, message) {
        list.push({ severity, area, message });
    },

    validateMasterCards(masterCards) {
        const issues = [];
        const seenIds = new Set();

        this.normalizeArray(masterCards).forEach((card, index) => {
            const cardId = String(card?.id ?? '').trim();
            const cardName = String(card?.name ?? '').trim();
            const cardType = String(card?.type ?? '').trim();
            const cardStatus = String(card?.status ?? '').trim();

            if (!cardId) {
                this.addIssue(issues, 'error', 'master_base_game', `Eintrag #${index + 1} hat keine ID.`);
            } else {
                if (seenIds.has(cardId)) {
                    this.addIssue(issues, 'error', 'master_base_game', `Doppelte Karten-ID gefunden: "${cardId}".`);
                }
                seenIds.add(cardId);
            }

            if (!cardName) {
                this.addIssue(issues, 'warn', cardId || `entry_${index + 1}`, 'Name fehlt.');
            }

            if (!cardType) {
                this.addIssue(issues, 'warn', cardId || `entry_${index + 1}`, 'Typ fehlt.');
            } else if (!this.allowedTypes.includes(cardType)) {
                this.addIssue(issues, 'warn', cardId || `entry_${index + 1}`, `Unbekannter Typ: "${cardType}".`);
            }

            if (!cardStatus) {
                this.addIssue(issues, 'warn', cardId || `entry_${index + 1}`, 'Status fehlt.');
            } else if (!this.allowedStatus.includes(cardStatus)) {
                this.addIssue(issues, 'warn', cardId || `entry_${index + 1}`, `Unbekannter Status: "${cardStatus}".`);
            }

            if (!String(card?.image ?? '').trim()) {
                this.addIssue(issues, 'info', cardId || `entry_${index + 1}`, 'Bildpfad leer.');
            }
        });

        return issues;
    },

    validateAdventureReferences(adventure, cardIds, sourceLabel) {
        const issues = [];
        const setup = adventure?.setup || {};

        const groups = [
            { key: 'blue_cards', label: 'blue_cards' },
            { key: 'minion_cards', label: 'minion_cards' },
            { key: 'special_cards', label: 'special_cards' }
        ];

        groups.forEach(group => {
            this.normalizeArray(setup[group.key]).forEach((entry, index) => {
                const refId = typeof entry === 'string'
                    ? entry
                    : String(entry?.id ?? '').trim();

                if (!refId) {
                    this.addIssue(
                        issues,
                        'warn',
                        sourceLabel,
                        `${group.label}[${index}] hat keine Karten-ID.`
                    );
                    return;
                }

                if (!cardIds.has(refId)) {
                    this.addIssue(
                        issues,
                        'warn',
                        sourceLabel,
                        `${group.label}[${index}] verweist auf unbekannte Karte: "${refId}".`
                    );
                }
            });
        });

        return issues;
    },

    validateAdventureCardFile(cardFile, sourceLabel) {
        const issues = [];
        const cards = this.normalizeArray(cardFile?.cards);
        const seen = new Set();

        cards.forEach((card, index) => {
            const id = String(card?.id ?? '').trim();
            const name = String(card?.name ?? '').trim();
            const type = String(card?.type ?? '').trim();
            const status = String(card?.status ?? '').trim();

            if (!id) {
                this.addIssue(issues, 'error', sourceLabel, `cards[${index}] hat keine ID.`);
            } else {
                if (seen.has(id)) {
                    this.addIssue(issues, 'error', sourceLabel, `Doppelte ID in Kartendatei: "${id}".`);
                }
                seen.add(id);
            }

            if (!name) {
                this.addIssue(issues, 'warn', sourceLabel, `Karte "${id || index}" hat keinen Namen.`);
            }

            if (!type) {
                this.addIssue(issues, 'warn', sourceLabel, `Karte "${id || index}" hat keinen Typ.`);
            } else if (!this.allowedTypes.includes(type)) {
                this.addIssue(issues, 'warn', sourceLabel, `Karte "${id || index}" hat unbekannten Typ "${type}".`);
            }

            if (!status) {
                this.addIssue(issues, 'warn', sourceLabel, `Karte "${id || index}" hat keinen Status.`);
            } else if (!this.allowedStatus.includes(status)) {
                this.addIssue(issues, 'warn', sourceLabel, `Karte "${id || index}" hat unbekannten Status "${status}".`);
            }

            if (!String(card?.image ?? '').trim()) {
                this.addIssue(issues, 'info', sourceLabel, `Karte "${id || index}" hat keinen Bildpfad.`);
            }
        });

        return issues;
    },

    compareMasterAndAdventureCards(masterCards, adventureCardFile, sourceLabel) {
        const issues = [];

        const masterIds = new Set(this.normalizeArray(masterCards).map(card => String(card?.id ?? '').trim()).filter(Boolean));
        const fileIds = new Set(this.normalizeArray(adventureCardFile?.cards).map(card => String(card?.id ?? '').trim()).filter(Boolean));

        fileIds.forEach(id => {
            if (!masterIds.has(id)) {
                this.addIssue(
                    issues,
                    'warn',
                    sourceLabel,
                    `Karte "${id}" ist in der Abenteuer-Kartendatei vorhanden, aber nicht im Master-Archiv.`
                );
            }
        });

        return issues;
    },

    buildReport(issues) {
        if (!issues.length) {
            return '✅ Keine Probleme gefunden.';
        }

        const errors = issues.filter(item => item.severity === 'error');
        const warns = issues.filter(item => item.severity === 'warn');
        const infos = issues.filter(item => item.severity === 'info');

        const lines = [
            `Prüfung abgeschlossen.`,
            `Fehler: ${errors.length}`,
            `Warnungen: ${warns.length}`,
            `Hinweise: ${infos.length}`,
            '',
            ...issues.map(item => {
                const icon =
                    item.severity === 'error' ? '❌' :
                    item.severity === 'warn' ? '⚠️' :
                    'ℹ️';

                return `${icon} [${item.area}] ${item.message}`;
            })
        ];

        return lines.join('\n');
    },

    async run(showAlert = false) {
        const issues = [];

        try {
            const master = await this.fetchJson('data/cards/base_game/master_base_game.json');
            const masterCards = this.normalizeArray(master?.cards);
            const masterIds = new Set(masterCards.map(card => String(card?.id ?? '').trim()).filter(Boolean));

            issues.push(...this.validateMasterCards(masterCards));

            const adventureConfigs = [
                {
                    adventurePath: 'data/adventures/base_game/leute_die_nicht_spielen.json',
                    cardsPath: 'data/cards/base_game/leute_die_nicht_spielen/leute_die_nicht_spielen.json',
                    label: 'leute_die_nicht_spielen'
                },
                {
                    adventurePath: 'data/adventures/base_game/silvanas_befreiung.json',
                    cardsPath: 'data/cards/base_game/silvanas_befreiung/silvanas_befreiung.json',
                    label: 'silvanas_befreiung'
                },
                {
                    adventurePath: 'data/adventures/base_game/wildenstein_akt_1.json',
                    cardsPath: 'data/cards/base_game/wildenstein_akt_1/wildenstein_akt_1.json',
                    label: 'wildenstein_akt_1'
                },
                {
                    adventurePath: 'data/adventures/base_game/wildenstein_akt_2.json',
                    cardsPath: 'data/cards/base_game/wildenstein_akt_2/wildenstein_akt_2.json',
                    label: 'wildenstein_akt_2'
                },
                {
                    adventurePath: 'data/adventures/base_game/wildenstein_akt_3.json',
                    cardsPath: 'data/cards/base_game/wildenstein_akt_3/wildenstein_akt_3.json',
                    label: 'wildenstein_akt_3'
                }
            ];

            for (const config of adventureConfigs) {
                try {
                    const [adventure, cardFile] = await Promise.all([
                        this.fetchJson(config.adventurePath),
                        this.fetchJson(config.cardsPath)
                    ]);

                    issues.push(...this.validateAdventureReferences(adventure, masterIds, `${config.label}:setup`));
                    issues.push(...this.validateAdventureCardFile(cardFile, `${config.label}:cards`));
                    issues.push(...this.compareMasterAndAdventureCards(masterCards, cardFile, `${config.label}:master_compare`));
                } catch (error) {
                    this.addIssue(
                        issues,
                        'error',
                        config.label,
                        `Datei konnte nicht geprüft werden: ${error.message}`
                    );
                }
            }

            const report = this.buildReport(issues);
            console.log(report);

            if (showAlert) {
                alert(report);
            }

            return {
                ok: issues.every(item => item.severity !== 'error'),
                issues,
                report
            };
        } catch (error) {
            const message = `Validierung fehlgeschlagen: ${error.message}`;
            console.error(message);

            if (showAlert) {
                alert(message);
            }

            return {
                ok: false,
                issues: [{ severity: 'error', area: 'validator', message }],
                report: message
            };
        }
    }
};
