window.Validator = {
    allowedAdventureStatuses: [
        'canonical',
        'deprecated_alias',
        'migrated',
        'raw',
        'basic',
        'playable',
        'verified'
    ],

    allowedCardStatuses: [
        'raw',
        'basic',
        'playable',
        'verified',
        'migrated',
        'canonical',
        'deprecated_alias',
        'complete'
    ],

    placeholderPatterns: [
        /^minions?_eurer_wahl$/i,
        /^schergen?_eurer_wahl$/i,
        /^special_/i,
        /^story_/i
    ],

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    },

    createResult() {
        return {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };
    },

    addError(result, message) {
        result.ok = false;
        result.errors.push(message);
    },

    addWarning(result, message) {
        result.warnings.push(message);
    },

    addInfo(result, message) {
        result.info.push(message);
    },

    isPlaceholderCardRef(refId = '') {
        const normalized = this.normalizeString(refId);
        if (!normalized) return false;

        return this.placeholderPatterns.some(pattern => pattern.test(normalized));
    },

    getSetupEntryId(entry) {
        if (typeof entry === 'string') {
            return this.normalizeString(entry);
        }

        if (this.isObject(entry)) {
            return this.normalizeString(entry.id);
        }

        return '';
    },

    getSetupEntryLabel(entry) {
        if (typeof entry === 'string') {
            return this.normalizeString(entry);
        }

        if (this.isObject(entry)) {
            return this.normalizeString(entry.label || entry.id);
        }

        return '';
    },

    validateAdventure(adventure) {
        const result = this.createResult();

        if (!this.isObject(adventure)) {
            this.addError(result, 'Abenteuerdaten fehlen oder sind kein Objekt.');
            return result;
        }

        const id = this.normalizeString(adventure.id);
        const name = this.normalizeString(adventure.name);
        const status = this.normalizeString(adventure.status);
        const narrative = adventure.narrative ?? {};
        const setup = adventure.setup ?? {};
        const setId = this.normalizeString(adventure?.set?.id);

        if (!id) {
            this.addError(result, 'Abenteuer ohne ID gefunden.');
        }

        if (!name) {
            this.addError(result, `Abenteuer "${id || 'unbekannt'}" hat keinen Namen.`);
        }

        if (!setId) {
            this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keine set.id.`);
        }

        if (status && !this.allowedAdventureStatuses.includes(status)) {
            this.addWarning(
                result,
                `Abenteuer "${id || name || 'unbekannt'}" nutzt unbekannten Status "${status}".`
            );
        }

        if (status === 'deprecated_alias') {
            if (!this.normalizeString(adventure.redirect_to)) {
                this.addError(
                    result,
                    `Alias-Abenteuer "${id || name || 'unbekannt'}" hat kein redirect_to.`
                );
            }

            return result;
        }

        if (!this.isObject(narrative)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat kein gültiges narrative-Objekt.`);
        } else {
            if (!this.normalizeString(narrative.intro)) {
                this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keine Einleitung.`);
            }

            const checks = this.normalizeArray(narrative.checks);
            checks.forEach((check, index) => {
                if (!this.isObject(check)) {
                    this.addWarning(result, `Abenteuer "${id}" enthält eine ungültige Probe an Position ${index}.`);
                    return;
                }

                if (!this.normalizeString(check.id)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne ID an Position ${index}.`);
                }

                if (!this.normalizeString(check.skill)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne Skill an Position ${index}.`);
                }

                if (!this.normalizeString(check.text)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne Text an Position ${index}.`);
                }

                if (!this.isObject(check.results)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne results-Objekt an Position ${index}.`);
                }
            });
        }

        if (!this.isObject(setup)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat kein gültiges setup-Objekt.`);
        } else {
            const blueCards = this.normalizeArray(setup.blue_cards);
            const minionCards = this.normalizeArray(setup.minion_cards);
            const specialCards = this.normalizeArray(setup.special_cards);

            if (!blueCards.length) {
                this.addWarning(result, `Abenteuer "${id}" hat keine blue_cards.`);
            }

            if (!this.normalizeString(setup.victory)) {
                this.addWarning(result, `Abenteuer "${id}" hat keine Siegbedingung.`);
            }

            if (!this.normalizeString(setup.defeat)) {
                this.addWarning(result, `Abenteuer "${id}" hat keine Niederlagebedingung.`);
            }

            const cardRefs = setup.card_refs;
            if (cardRefs && !this.isObject(cardRefs)) {
                this.addWarning(result, `Abenteuer "${id}" hat card_refs, aber nicht als Objekt.`);
            }

            this.validateSetupCardEntries(result, id, 'blue_cards', blueCards);
            this.validateSetupCardEntries(result, id, 'minion_cards', minionCards);
            this.validateSetupCardEntries(result, id, 'special_cards', specialCards);
        }

        const danger = Number(adventure.danger_calc);
        if (!Number.isFinite(danger)) {
            this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen danger_calc.`);
        }

        return result;
    },

    validateSetupCardEntries(result, adventureId, sectionName, entries) {
        entries.forEach((entry, index) => {
            if (typeof entry === 'string') {
                if (!this.normalizeString(entry)) {
                    this.addWarning(result, `Abenteuer "${adventureId}" enthält leeren String in ${sectionName}[${index}].`);
                }
                return;
            }

            if (!this.isObject(entry)) {
                this.addWarning(result, `Abenteuer "${adventureId}" enthält ungültigen Eintrag in ${sectionName}[${index}].`);
                return;
            }

            const entryId = this.normalizeString(entry.id);
            const entryLabel = this.normalizeString(entry.label);

            if (!entryId && !entryLabel) {
                this.addWarning(
                    result,
                    `Abenteuer "${adventureId}" hat in ${sectionName}[${index}] weder id noch label.`
                );
                return;
            }

            if (!entryId && entryLabel) {
                this.addInfo(
                    result,
                    `Abenteuer "${adventureId}" nutzt in ${sectionName}[${index}] nur ein Label ("${entryLabel}").`
                );
            }

            if (entryId && this.isPlaceholderCardRef(entryId)) {
                this.addInfo(
                    result,
                    `Abenteuer "${adventureId}" nutzt Platzhalter in ${sectionName}[${index}]: ${entryId}`
                );
            }
        });
    },

    validateCard(card) {
        const result = this.createResult();

        if (!this.isObject(card)) {
            this.addError(result, 'Kartendaten fehlen oder sind kein Objekt.');
            return result;
        }

        const id = this.normalizeString(card.id);
        const name = this.normalizeString(card.name);
        const status = this.normalizeString(card.status);
        const type = this.normalizeString(card.type);

        if (!id) {
            this.addError(result, 'Karte ohne ID gefunden.');
        }

        if (!name) {
            this.addError(result, `Karte "${id || 'unbekannt'}" hat keinen Namen.`);
        }

        if (!type) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat keinen Typ.`);
        }

        if (status && !this.allowedCardStatuses.includes(status)) {
            this.addWarning(
                result,
                `Karte "${id || name || 'unbekannt'}" nutzt unbekannten Status "${status}".`
            );
        }

        if (!this.isObject(card.stats)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat kein stats-Objekt.`);
        }

        if (!this.isObject(card.rules)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat kein rules-Objekt.`);
        }

        const images = card.images;
        if (images && !this.isObject(images)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat ungültige images.`);
        }

        const imagePath = this.normalizeString(card?.images?.front || card?.image || '');
        if (!imagePath) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat keinen Bildpfad.`);
        }

        const adventureRefs = this.normalizeArray(card.adventure_refs);
        if (card.adventure_refs !== undefined && !Array.isArray(card.adventure_refs)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat adventure_refs nicht als Array.`);
        } else {
            adventureRefs.forEach((ref, index) => {
                if (typeof ref === 'string') {
                    if (!this.normalizeString(ref)) {
                        this.addWarning(result, `Karte "${id}" hat leeren adventure_ref an Position ${index}.`);
                    }
                    return;
                }

                if (!this.isObject(ref) || !this.normalizeString(ref.id)) {
                    this.addWarning(result, `Karte "${id}" hat ungültigen adventure_ref an Position ${index}.`);
                }
            });
        }

        return result;
    },

    validateMasterIndex(masterIndex) {
        const result = this.createResult();

        if (!this.isObject(masterIndex)) {
            this.addError(result, 'Master-Index fehlt oder ist kein Objekt.');
            return result;
        }

        const cards = this.normalizeArray(masterIndex.cards);
        const ids = new Set();

        if (!cards.length) {
            this.addWarning(result, 'Master-Index enthält keine Karten.');
        }

        cards.forEach((entry, index) => {
            if (!this.isObject(entry)) {
                this.addWarning(result, `Master-Index enthält ungültigen Karteneintrag an Position ${index}.`);
                return;
            }

            const id = this.normalizeString(entry.id);
            if (!id) {
                this.addWarning(result, `Master-Index enthält Karteneintrag ohne ID an Position ${index}.`);
                return;
            }

            if (ids.has(id)) {
                this.addWarning(result, `Master-Index enthält doppelte Karten-ID "${id}".`);
            }

            ids.add(id);

            if (!this.normalizeString(entry.name)) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat keinen Namen.`);
            }

            if (!this.normalizeString(entry.type)) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat keinen Typ.`);
            }

            if (entry.detail_path !== undefined && !this.normalizeString(entry.detail_path)) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat leeren detail_path.`);
            }

            if (entry.detail_path !== undefined && !String(entry.detail_path).includes('/')) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat einen ungewöhnlichen detail_path.`);
            }
        });

        return result;
    },

    summarize(result) {
        return {
            ok: result.ok,
            errorCount: result.errors.length,
            warningCount: result.warnings.length,
            infoCount: result.info.length,
            errors: [...result.errors],
            warnings: [...result.warnings],
            info: [...result.info]
        };
    },

    logResult(label, result) {
        const summary = this.summarize(result);

        if (summary.ok) {
            console.log(`✅ ${label}`, summary);
        } else {
            console.warn(`⚠️ ${label}`, summary);
        }

        return summary;
    }
};
