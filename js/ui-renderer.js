window.Renderer = {
    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    normalizeCard(card) {
        return {
            id: Utils.normalizeString(card?.id),
            name: Utils.normalizeString(card?.name || 'Unbenannte Karte'),
            type: Utils.normalizeString(card?.type),
            status: Utils.normalizeString(card?.status),
            image: Utils.getCardImagePath(card, { fallback: '' }),
            note: Utils.normalizeString(card?.note ?? card?.notes ?? ''),
            rules: card?.rules ?? {},
            stats: card?.stats ?? {},
            tags: this.normalizeArray(card?.tags),
            keywords: this.normalizeArray(card?.keywords),
            source: card?.source ?? {}
        };
    },

    getCardLabel(card) {
        const normalized = this.normalizeCard(card);
        return normalized.name || normalized.id || 'Unbenannte Karte';
    },

    getCardImage(card) {
        return Utils.getCardImagePath(card);
    },

    getCardTypeLabel(card) {
        const type = Utils.normalizeString(card?.type);

        const map = {
            timeline: 'Zeitskala',
            leader: 'Anführer',
            minion: 'Scherge',
            hero_action: 'Heldenaktion',
            special: 'Spezialkarte',
            reward: 'Belohnung',
            training: 'Training',
            adventure_card: 'Abenteuerkarte',
            environment: 'Kampfumgebung'
        };

        return map[type] || (type || 'Karte');
    },

    findCardById(cards, id) {
        const targetId = Utils.normalizeString(id);
        return this.normalizeArray(cards).find(card => Utils.normalizeString(card?.id) === targetId) || null;
    },

    createPlaceholderEntry(entry) {
        const entryId = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.id);

        const entryLabel = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.label || entry?.id || 'Variable Karte');

        return {
            id: entryId,
            name: entryLabel || entryId || 'Variable Karte',
            type: '',
            status: 'placeholder',
            image: '',
            note: 'Diese Referenz ist ein Platzhalter oder eine variable Setup-Vorgabe und keine feste Karten-Detaildatei.'
        };
    },

    createMissingEntry(entry) {
        const entryId = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.id);

        const entryLabel = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.label || entry?.id || 'Fehlende Karte');

        return {
            id: entryId,
            name: entryLabel || entryId || 'Fehlende Karte',
            type: '',
            status: 'missing',
            image: '',
            note: 'Karte konnte im geladenen Kartenpool nicht gefunden werden.'
        };
    },

    resolveCardEntry(entry, allCards) {
        if (!entry) return null;

        if (typeof entry === 'string') {
            const found = this.findCardById(allCards, entry);
            if (found) return found;

            if (window.Validator?.isPlaceholderCardRef?.(entry)) {
                return this.createPlaceholderEntry(entry);
            }

            return this.createMissingEntry(entry);
        }

        const entryId = Utils.normalizeString(entry?.id);
        if (entryId) {
            const found = this.findCardById(allCards, entryId);
            if (found) {
                return {
                    ...found,
                    label: entry?.label ?? found?.label ?? null
                };
            }

            if (window.Validator?.isPlaceholderCardRef?.(entryId)) {
                return this.createPlaceholderEntry(entry);
            }
        }

        if (entryId || entry?.label) {
            return this.createMissingEntry(entry);
        }

        return entry;
    },

    normalizeSetupEntries(entries, allCards) {
        return this.normalizeArray(entries)
            .map(entry => this.resolveCardEntry(entry, allCards))
            .filter(Boolean);
    },

    buildChecklistItem(card) {
        const normalized = this.normalizeCard(card);
        const label = card?.label ? Utils.normalizeString(card.label) : this.getCardLabel(normalized);
        const safeLabel = Utils.escapeHtml(label);
        const imageSrc = this.getCardImage(card);
        const cardId = Utils.escapeHtml(normalized.id || label);
        const hasPreview = Boolean(Utils.resolveImagePath(imageSrc, ''));
        const isMissing = normalized.status === 'missing';
        const isPlaceholder = normalized.status === 'placeholder';

        const previewAttr = hasPreview
            ? ` data-image="${Utils.escapeHtml(imageSrc)}" data-card-id="${cardId}" class="has-preview"`
            : '';

        const infoButton = `
            <button
                class="info-btn"
                type="button"
                title="Kartendetails anzeigen"
                data-action="open-card-detail"
                data-card-id="${cardId}"
                ${normalized.id && !isPlaceholder ? '' : 'disabled'}
            >i</button>
        `;

        const suffix = isMissing
            ? ' ⚠️'
            : isPlaceholder
                ? ' 🛈'
                : '';

        return `
            <li class="checklist-item" data-card-id="${cardId}">
                <input type="checkbox">
                <span${previewAttr}>${safeLabel}${suffix}</span>
                ${infoButton}
            </li>
        `;
    },

    bindCardPreviews(scope = document) {
        const previewTargets = scope.querySelectorAll('.has-preview[data-image]');

        previewTargets.forEach(el => {
            if (el.dataset.previewBound === 'true') return;
            el.dataset.previewBound = 'true';

            el.addEventListener('mouseenter', event => {
                const imageSrc = el.dataset.image;
                if (window.UI?.showPreview) {
                    window.UI.showPreview(event, imageSrc);
                }
            });

            el.addEventListener('mousemove', event => {
                if (window.UI?.movePreview) {
                    window.UI.movePreview(event);
                }
            });

            el.addEventListener('mouseleave', () => {
                if (window.UI?.closePreview) {
                    window.UI.closePreview();
                }
            });

            el.addEventListener('click', () => {
                const imageSrc = el.dataset.image;
                if (imageSrc && window.UI?.openPreview) {
                    window.UI.openPreview(imageSrc);
                }
            });
        });
    },

    renderListInto(containerSelector, cards) {
        const list = Utils.qs(containerSelector);
        if (!list) return;

        list.innerHTML = this.normalizeArray(cards)
            .map(card => this.buildChecklistItem(card))
            .join('');

        this.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = Utils.byId('special');
        if (!specialSection) return;

        const ul = specialSection.querySelector('ul');
        if (!ul) return;

        ul.innerHTML = this.normalizeArray(cards)
            .map(card => this.buildChecklistItem(card))
            .join('');

        specialSection.classList.toggle('hidden', cards.length === 0);
        this.bindCardPreviews(ul);
    },

    renderDanger(adventure) {
        const dangerValue = Utils.byId('danger-value');
        if (!dangerValue) return;

        const danger = Number(adventure?.danger_calc ?? 0);
       
