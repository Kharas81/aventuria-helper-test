window.Renderer = {
    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    normalizeCard(card) {
        const fallbackImage =
            card?.images?.front ||
            card?.image ||
            '';

        return {
            id: Utils.normalizeString(card?.id),
            name: Utils.normalizeString(card?.name || 'Unbenannte Karte'),
            type: Utils.normalizeString(card?.type),
            status: Utils.normalizeString(card?.status),
            image: Utils.normalizeString(fallbackImage),
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
        const normalized = this.normalizeCard(card);
        return normalized.image || '';
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
        const imageSrc = this.getCardImage(normalized);
        const cardId = Utils.escapeHtml(normalized.id || label);
        const hasPreview = Boolean(imageSrc);
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
        dangerValue.innerHTML = danger > 0
            ? `<strong>Gefahrenstufe:</strong> ${Utils.escapeHtml(danger)}`
            : '';
    },

    renderTitle(adventure) {
        const title = Utils.byId('title');
        if (!title) return;

        title.innerText = Utils.normalizeString(adventure?.name);
    },

    renderSetup(adventure, allCards) {
        const setupDisplay = Utils.byId('setup-display');
        if (!setupDisplay) return;

        const setup = adventure?.setup ?? {};

        const blueCards = this.normalizeSetupEntries(setup.blue_cards, allCards);
        const minionCards = this.normalizeSetupEntries(setup.minion_cards, allCards);
        const specialCards = this.normalizeSetupEntries(setup.special_cards, allCards);

        this.renderTitle(adventure);
        this.renderDanger(adventure);
        this.renderListInto('#blue-cards ul', blueCards);
        this.renderListInto('#minions ul', minionCards);
        this.renderSpecialSection(specialCards);

        setupDisplay.classList.remove('hidden');
    },

    normalizeCardDetail(card) {
        const normalized = this.normalizeCard(card);

        return {
            ...normalized,
            card_category: Utils.normalizeString(card?.card_category),
            subtypes: this.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: Utils.normalizeString(card?.rules?.passive),
                success: Utils.normalizeString(card?.rules?.success),
                fail: Utils.normalizeString(card?.rules?.fail),
                draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
                flavor: Utils.normalizeString(card?.rules?.flavor),
                timed_effects: this.normalizeArray(card?.rules?.timed_effects),
                milestones: this.normalizeArray(card?.rules?.milestones),
                action_table: this.normalizeArray(card?.rules?.action_table)
            },
            stats: {
                gp: card?.stats?.gp ?? null,
                lp: card?.stats?.lp ?? null,
                armor: card?.stats?.armor ?? null,
                evasion: card?.stats?.evasion ?? null,
                actions: card?.stats?.actions ?? null,
                start_value: card?.stats?.start_value ?? null,
                cost: card?.stats?.cost ?? null
            }
        };
    },

    renderStatsTable(stats) {
        const rows = [
            ['GP', stats?.gp],
            ['LP', stats?.lp],
            ['Rüstung', stats?.armor],
            ['Ausweichen', stats?.evasion],
            ['Aktionen', stats?.actions],
            ['Startwert', stats?.start_value],
            ['Kosten', stats?.cost]
        ].filter(([, value]) => value !== null && value !== undefined && value !== '');

        if (!rows.length) return '';

        return `
            <h4>Werte</h4>
            <table style="width:100%; border-collapse: collapse; margin-top: 8px;">
                <tbody>
                    ${rows.map(([label, value]) => `
                        <tr>
                            <td style="border:1px solid #8b4513; padding:8px; width:140px;"><strong>${Utils.escapeHtml(label)}</strong></td>
                            <td style="border:1px solid #8b4513; padding:8px;">${Utils.escapeHtml(value)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderActionTable(actionTable) {
        if (!actionTable.length) return '';

        return `
            <h4>Aktionstabelle</h4>
            <table style="width:100%; border-collapse: collapse; margin-top: 8px;">
                <tbody>
                    ${actionTable.map(row => `
                        <tr>
                            <td style="border:1px solid #8b4513; padding:8px; width:110px; vertical-align: top;">
                                <strong>${Utils.escapeHtml(row?.roll ?? row?.roll_min ?? '')}</strong>
                            </td>
                            <td style="border:1px solid #8b4513; padding:8px;">
                                <strong>${Utils.escapeHtml(row?.title ?? '')}</strong><br>
                                ${Utils.escapeHtml(row?.description ?? row?.text ?? '')}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderTextList(title, values) {
        const filtered = this.normalizeArray(values).filter(Boolean);
        if (!filtered.length) return '';

        return `
            <h4>${Utils.escapeHtml(title)}</h4>
            <ul>
                ${filtered.map(value => `<li>${Utils.escapeHtml(typeof value === 'string' ? value : JSON.stringify(value))}</li>`).join('')}
            </ul>
        `;
    },

    renderCardDetail(card) {
        const safeCard = this.normalizeCardDetail(card);

        let html = `<div class="reader-text">`;

        html += `<h2 style="margin-top:0;">${Utils.escapeHtml(safeCard.name)}</h2>`;

        if (safeCard.image) {
            html += `
                <div class="img-wrapper">
                    <img
                        src="${Utils.escapeHtml(safeCard.image)}"
                        alt="${Utils.escapeHtml(safeCard.name)}"
                        class="manual-page-img"
                        loading="lazy"
                    >
                </div>
            `;
        }

        html += `<p><strong>ID:</strong> ${Utils.escapeHtml(safeCard.id || '—')}</p>`;
        html += `<p><strong>Typ:</strong> ${Utils.escapeHtml(this.getCardTypeLabel(safeCard))}</p>`;

        if (safeCard.card_category) {
            html += `<p><strong>Kategorie:</strong> ${Utils.escapeHtml(safeCard.card_category)}</p>`;
        }

        if (safeCard.status) {
            html += `<p><strong>Status:</strong> ${Utils.escapeHtml(safeCard.status)}</p>`;
        }

        if (safeCard.subtypes.length) {
            html += `<p><strong>Untertypen:</strong> ${safeCard.subtypes.map(v => Utils.escapeHtml(v)).join(', ')}</p>`;
        }

        html += this.renderStatsTable(safeCard.stats);

        if (safeCard.rules?.passive) {
            html += `<p><strong>Passiv:</strong> ${Utils.escapeHtml(safeCard.rules.passive)}</p>`;
        }

        if (safeCard.rules?.success) {
            html += `<p><strong>Erfolg:</strong> ${Utils.escapeHtml(safeCard.rules.success)}</p>`;
        }

        if (safeCard.rules?.fail) {
            html += `<p><strong>Misserfolg:</strong> ${Utils.escapeHtml(safeCard.rules.fail)}</p>`;
        }

        html += this.renderTextList('Zeit-/Sondereffekte', safeCard.rules?.timed_effects);

        if (safeCard.rules?.milestones?.length) {
            html += `
                <h4>Meilensteine</h4>
                <ul>
                    ${safeCard.rules.milestones.map(item => `
                        <li>
                            <strong>${Utils.escapeHtml(item?.value ?? '')}</strong>
                            ${item?.text ? `: ${Utils.escapeHtml(item.text)}` : ''}
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        html += this.renderActionTable(safeCard.rules?.action_table || []);

        if (safeCard.rules?.draw_effect) {
            html += `<p><strong>Zugeffekt:</strong> ${Utils.escapeHtml(safeCard.rules.draw_effect)}</p>`;
        }

        if (safeCard.rules?.flavor) {
            html += `<p><strong>Beschreibung:</strong> <em>${Utils.escapeHtml(safeCard.rules.flavor)}</em></p>`;
        }

        if (safeCard.tags.length) {
            html += `<p><strong>Tags:</strong> ${safeCard.tags.map(tag => `#${Utils.escapeHtml(tag)}`).join(' ')}</p>`;
        }

        if (safeCard.keywords.length) {
            html += `<p><strong>Keywords:</strong> ${safeCard.keywords.map(v => Utils.escapeHtml(v)).join(', ')}</p>`;
        }

        if (safeCard.source?.book || safeCard.source?.page || safeCard.source?.note) {
            html += `<h4>Quelle</h4><p>`;
            if (safeCard.source?.book) {
                html += `<strong>Buch:</strong> ${Utils.escapeHtml(safeCard.source.book)}<br>`;
            }
            if (safeCard.source?.page !== null && safeCard.source?.page !== undefined && safeCard.source?.page !== '') {
                html += `<strong>Seite:</strong> ${Utils.escapeHtml(safeCard.source.page)}<br>`;
            }
            if (safeCard.source?.note) {
                html += `<strong>Hinweis:</strong> ${Utils.escapeHtml(safeCard.source.note)}`;
            }
            html += `</p>`;
        }

        if (safeCard.note) {
            html += `<p><strong>Notiz:</strong> ${Utils.escapeHtml(safeCard.note)}</p>`;
        }

        html += `</div>`;
        return html;
    },

    ensureCardDetailModal() {
        let modal = Utils.byId('card-detail-modal');

        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = 'card-detail-modal';
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" data-action="close-card-detail">&times;</span>
                <div class="tab-content" id="card-detail-content"></div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.closeCardDetail();
            }
        });

        return modal;
    },

    openCardDetail(card) {
        const modal = this.ensureCardDetailModal();
        const content = Utils.byId('card-detail-content');

        if (!modal || !content) return;

        content.innerHTML = this.renderCardDetail(card);
        modal.style.display = 'flex';
    },

    closeCardDetail() {
        const modal = Utils.byId('card-detail-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
};
