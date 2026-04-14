window.Renderer = {
    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeCard(card) {
        const fallbackImage =
            card?.images?.front ||
            card?.image ||
            '';

        return {
            id: String(card?.id ?? '').trim(),
            name: String(card?.name ?? 'Unbenannte Karte').trim(),
            type: String(card?.type ?? '').trim(),
            status: String(card?.status ?? '').trim(),
            image: String(fallbackImage ?? '').trim(),
            note: String(card?.note ?? card?.notes ?? '').trim(),
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
        const type = String(card?.type ?? '').trim();

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
        const targetId = String(id ?? '').trim();
        return this.normalizeArray(cards).find(card => String(card?.id ?? '').trim() === targetId) || null;
    },

    resolveCardEntry(entry, allCards) {
        if (!entry) return null;

        if (typeof entry === 'string') {
            const found = this.findCardById(allCards, entry);
            if (found) return found;

            return {
                id: entry,
                name: entry,
                type: '',
                status: 'missing',
                image: '',
                note: 'Karte konnte im geladenen Kartenpool nicht gefunden werden.'
            };
        }

        const entryId = String(entry?.id ?? '').trim();
        if (entryId) {
            const found = this.findCardById(allCards, entryId);
            if (found) {
                return {
                    ...found,
                    label: entry?.label ?? found?.label ?? null
                };
            }
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
        const label = card?.label ? String(card.label).trim() : this.getCardLabel(normalized);
        const safeLabel = this.escapeHtml(label);
        const imageSrc = this.getCardImage(normalized);
        const cardId = this.escapeHtml(normalized.id || label);
        const hasPreview = Boolean(imageSrc);
        const isMissing = normalized.status === 'missing';

        const previewAttr = hasPreview
            ? ` data-image="${this.escapeHtml(imageSrc)}" data-card-id="${cardId}" class="has-preview"`
            : '';

        const infoButton = `
            <button
                class="info-btn"
                type="button"
                title="Kartendetails anzeigen"
                ${normalized.id ? `onclick="window.API?.openCardDetailById('${cardId}')"` : 'disabled'}
            >i</button>
        `;

        return `
            <li class="checklist-item" data-card-id="${cardId}">
                <input type="checkbox">
                <span${previewAttr}>${safeLabel}${isMissing ? ' ⚠️' : ''}</span>
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
                if (window.UI && typeof window.UI.showPreview === 'function') {
                    window.UI.showPreview(event, imageSrc);
                }
            });

            el.addEventListener('mousemove', event => {
                if (window.UI && typeof window.UI.movePreview === 'function') {
                    window.UI.movePreview(event);
                }
            });

            el.addEventListener('mouseleave', () => {
                if (window.UI && typeof window.UI.closePreview === 'function') {
                    window.UI.closePreview();
                }
            });

            el.addEventListener('click', () => {
                const imageSrc = el.dataset.image;
                if (imageSrc && window.UI && typeof window.UI.openPreview === 'function') {
                    window.UI.openPreview(imageSrc);
                }
            });
        });
    },

    renderListInto(containerSelector, cards) {
        const list = document.querySelector(containerSelector);
        if (!list) return;

        list.innerHTML = this.normalizeArray(cards)
            .map(card => this.buildChecklistItem(card))
            .join('');

        this.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = document.getElementById('special');
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
        const dangerValue = document.getElementById('danger-value');
        if (!dangerValue) return;

        const danger = Number(adventure?.danger_calc ?? 0);
        dangerValue.innerHTML = danger > 0
            ? `<strong>Gefahrenstufe:</strong> ${this.escapeHtml(danger)}`
            : '';
    },

    renderTitle(adventure) {
        const title = document.getElementById('title');
        if (!title) return;

        title.innerText = String(adventure?.name ?? '').trim();
    },

    renderSetup(adventure, allCards) {
        const setupDisplay = document.getElementById('setup-display');
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
            card_category: String(card?.card_category ?? '').trim(),
            subtypes: this.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: String(card?.rules?.passive ?? '').trim(),
                success: String(card?.rules?.success ?? '').trim(),
                fail: String(card?.rules?.fail ?? '').trim(),
                draw_effect: String(card?.rules?.draw_effect ?? '').trim(),
                flavor: String(card?.rules?.flavor ?? '').trim(),
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
                            <td style="border:1px solid #8b4513; padding:8px; width:140px;"><strong>${this.escapeHtml(label)}</strong></td>
                            <td style="border:1px solid #8b4513; padding:8px;">${this.escapeHtml(value)}</td>
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
                                <strong>${this.escapeHtml(row?.roll ?? row?.roll_min ?? '')}</strong>
                            </td>
                            <td style="border:1px solid #8b4513; padding:8px;">
                                <strong>${this.escapeHtml(row?.title ?? '')}</strong><br>
                                ${this.escapeHtml(row?.description ?? row?.text ?? '')}
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
            <h4>${this.escapeHtml(title)}</h4>
            <ul>
                ${filtered.map(value => `<li>${this.escapeHtml(typeof value === 'string' ? value : JSON.stringify(value))}</li>`).join('')}
            </ul>
        `;
    },

    renderCardDetail(card) {
        const safeCard = this.normalizeCardDetail(card);

        let html = `<div class="reader-text">`;

        html += `<h2 style="margin-top:0;">${this.escapeHtml(safeCard.name)}</h2>`;

        if (safeCard.image) {
            html += `
                <div class="img-wrapper">
                    <img
                        src="${this.escapeHtml(safeCard.image)}"
                        alt="${this.escapeHtml(safeCard.name)}"
                        class="manual-page-img"
                        loading="lazy"
                    >
                </div>
            `;
        }

        html += `<p><strong>ID:</strong> ${this.escapeHtml(safeCard.id || '—')}</p>`;
        html += `<p><strong>Typ:</strong> ${this.escapeHtml(this.getCardTypeLabel(safeCard))}</p>`;

        if (safeCard.card_category) {
            html += `<p><strong>Kategorie:</strong> ${this.escapeHtml(safeCard.card_category)}</p>`;
        }

        if (safeCard.status) {
            html += `<p><strong>Status:</strong> ${this.escapeHtml(safeCard.status)}</p>`;
        }

        if (safeCard.subtypes.length) {
            html += `<p><strong>Untertypen:</strong> ${safeCard.subtypes.map(v => this.escapeHtml(v)).join(', ')}</p>`;
        }

        html += this.renderStatsTable(safeCard.stats);

        if (safeCard.rules?.passive) {
            html += `<p><strong>Passiv:</strong> ${this.escapeHtml(safeCard.rules.passive)}</p>`;
        }

        if (safeCard.rules?.success) {
            html += `<p><strong>Erfolg:</strong> ${this.escapeHtml(safeCard.rules.success)}</p>`;
        }

        if (safeCard.rules?.fail) {
            html += `<p><strong>Misserfolg:</strong> ${this.escapeHtml(safeCard.rules.fail)}</p>`;
        }

        html += this.renderTextList('Zeit-/Sondereffekte', safeCard.rules?.timed_effects);

        if (safeCard.rules?.milestones?.length) {
            html += `
                <h4>Meilensteine</h4>
                <ul>
                    ${safeCard.rules.milestones.map(item => `
                        <li>
                            <strong>${this.escapeHtml(item?.value ?? '')}</strong>
                            ${item?.text ? `: ${this.escapeHtml(item.text)}` : ''}
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        html += this.renderActionTable(safeCard.rules?.action_table || []);

        if (safeCard.rules?.draw_effect) {
            html += `<p><strong>Zugeffekt:</strong> ${this.escapeHtml(safeCard.rules.draw_effect)}</p>`;
        }

        if (safeCard.rules?.flavor) {
            html += `<p><strong>Beschreibung:</strong> <em>${this.escapeHtml(safeCard.rules.flavor)}</em></p>`;
        }

        if (safeCard.tags.length) {
            html += `<p><strong>Tags:</strong> ${safeCard.tags.map(tag => `#${this.escapeHtml(tag)}`).join(' ')}</p>`;
        }

        if (safeCard.keywords.length) {
            html += `<p><strong>Keywords:</strong> ${safeCard.keywords.map(v => this.escapeHtml(v)).join(', ')}</p>`;
        }

        if (safeCard.source?.book || safeCard.source?.page || safeCard.source?.note) {
            html += `<h4>Quelle</h4><p>`;
            if (safeCard.source?.book) {
                html += `<strong>Buch:</strong> ${this.escapeHtml(safeCard.source.book)}<br>`;
            }
            if (safeCard.source?.page !== null && safeCard.source?.page !== undefined && safeCard.source?.page !== '') {
                html += `<strong>Seite:</strong> ${this.escapeHtml(safeCard.source.page)}<br>`;
            }
            if (safeCard.source?.note) {
                html += `<strong>Hinweis:</strong> ${this.escapeHtml(safeCard.source.note)}`;
            }
            html += `</p>`;
        }

        if (safeCard.note) {
            html += `<p><strong>Notiz:</strong> ${this.escapeHtml(safeCard.note)}</p>`;
        }

        html += `</div>`;
        return html;
    },

    ensureCardDetailModal() {
        let modal = document.getElementById('card-detail-modal');

        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = 'card-detail-modal';
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" id="close-card-detail-modal">&times;</span>
                <div class="tab-content" id="card-detail-content"></div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.closeCardDetail();
            }
        });

        const closeBtn = document.getElementById('close-card-detail-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeCardDetail());
        }

        return modal;
    },

    openCardDetail(card) {
        const modal = this.ensureCardDetailModal();
        const content = document.getElementById('card-detail-content');

        if (!modal || !content) return;

        content.innerHTML = this.renderCardDetail(card);
        modal.style.display = 'flex';
    },

    closeCardDetail() {
        const modal = document.getElementById('card-detail-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
};
