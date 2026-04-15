window.Validator = {
    get allowedAdventureStatuses() {
        return window.Constants?.statuses?.adventures ?? [
            'canonical',
            'deprecated_alias',
            'migrated',
            'raw',
            'basic',
            'playable',
            'verified'
        ];
    },

    get allowedCardStatuses() {
        return window.Constants?.statuses?.cards ?? [
            'raw',
            'basic',
            'playable',
            'playable_placeholder',
            'verified',
            'migrated',
            'canonical',
            'deprecated_alias',
            'complete'
        ];
    },

    get placeholderPatterns() {
        return window.Constants?.placeholders?.cardRefPatterns ?? [
            /^minions?_eurer_wahl$/i,
            /^schergen?_eurer_wahl$/i,
            /^special_/i,
            /^story_/i
        ];
    },

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

        if (!id) {
            this.addError(result, 'Abenteuer hat keine gültige ID.');
        }

        if (!name) {
            this.addError(result, `Abenteuer "${id || 'unbekannt'}" hat keinen Namen.`);
        }

        if (status && !this.allowedAdventureStatuses.includes(status)) {
            this.addWarning(
                result,
                `Abenteuer "${id || name || 'unbekannt'}" nutzt unbekannten Status "${status}".`
            );
        }

        if (!this.isObject(adventure.setup)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen setup-Block.`);
        }

        if (!this.isObject(adventure.narrative)) {
            this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen narrative-Block.`);
        }

        return result;
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
            this.addError(result, 'Karte hat keine gültige ID.');
        }

        if (!name) {
            this.addWarning(result, `Karte "${id || 'unbekannt'}" hat keinen Namen.`);
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

        return result;
    }
};
