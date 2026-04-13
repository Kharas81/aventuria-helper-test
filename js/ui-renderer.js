/**
 * js/ui-renderer.js
 * Rendert Abenteuer-Setup und Karten-Details.
 * Kompatibel mit altem Setup-Flow und neuem Karten-Katalog.
 */
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

    normalizeCard(rawCard) {
        return {
            id: rawCard?.id || '',
            name: rawCard?.name || '',
            card_category: rawCard?.card_category || rawCard?.type || 'unknown',
            type: rawCard?.type || 'unknown',
            status: rawCard?.status || 'basic',
            image: rawCard?.image || rawCard?.images?.front || '',
            images: rawCard?.images || {
                front: rawCard?.image || '',
                back: null,
                alt: []
            },
            subtypes: Array.isArray(rawCard?.subtypes) ? rawCard.subtypes : [],
            tags: Array.isArray(rawCard?.tags) ? rawCard.tags : [],
            keywords: Array.isArray(rawCard?.keywords) ? rawCard.keywords : [],
            note: rawCard?.note || rawCard?.notes || '',
            stats: rawCard?.stats || {},
            rules: rawCard?.rules || {},
            source: rawCard?.source || {}
        };
    },

    getCardById(cards, id) {
        const match = (Array.isArray(cards) ? cards : []).find(card => card?.id === id);
        return match ? this.normalizeCard(match) : null;
    },

    getDisplayName(entry, cards) {
        const ref = typeof entry === 'string' ? { id: entry } : (entry || {});
        const card = this.getCardById(cards, ref.id);
        return ref.label || card?.name || ref.name || ref.id || '⚠️ Unbekannte Karte';
    },

    buildMetaLine(card) {
        if (!card) return '';

        const parts = [];

        if (card.card_category) parts.push(card.card_category);
        if (card.type) parts.push(card.type);
        if (card.status) parts.push(card.status);

        if (!parts.length) return '';

        return `
            <small style="display:block; margin-top:4px; color:#8b4513;">
                ${this.escapeHtml(parts.join(' • '))}
            </small>
        `;
    },

    buildNoteLine(card) {
        if (!card?.note) return '';

        return `
            <small style="display:block; margin-top:4px; color:#6b4b36;">
                ${this.escapeHtml(card.note)}
            </small>
        `;
    },

    buildList(items, cards, listType = 'generic') {
        const safeItems = this.normalizeArray(items);

        if (!safeItems.length) {
            return '<li><em>Keine Einträge vorhanden.</em></li>';
        }

        return safeItems.map((item, index) => {
            const entry = typeof item === 'string' ? { id: item } : item;
            const card = this.getCardById(cards, entry?.id);
            const label = this.escapeHtml(this.getDisplayName(entry, cards));
            const metaLine = this.buildMetaLine(card);
            const noteLine = this.buildNoteLine(card);
            const imageSrc = card?.image ? this.escapeHtml(card.image) : '';

            const dataAttrs = [
                `data-list-type="${this.escapeHtml(listType)}"`,
                `data-list-index="${index}"`,
                `data-card-id="${this.escapeHtml(entry?.id || '')}"`
            ].join(' ');

            return `
                <li>
                    <label class="checklist-item" ${dataAttrs}>
                        <input type="checkbox">
                        <span ${imageSrc ? `class="has-preview" data-preview-src="${imageSrc}"` : ''}>
                            ${label}
                            ${metaLine}
                            ${noteLine}
                        </span>
                        ${
                            card
                                ? `<button
                                        type="button"
                                        class="info-btn"
                                        data-card-id="${this.escapeHtml(card.id)}"
                                        title="Kartendetails anzeigen"
                                   >i</button>`
                                : ''
                        }
                    </label>
                </li>
            `;
        }).join('');
    },

    bindSetupInteractions(root, cards) {
        if (!root) return;

        root.querySelectorAll('[data-preview-src]').forEach(el => {
            const imageSrc = el.dataset.previewSrc;
            if (!imageSrc) return;

            if (window.UI?.isTouchDevice) {
                el.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (window.UI?.openPreview) {
                        window.UI.openPreview(imageSrc);
                    }
                });
            } else {
                el.addEventListener('mouseenter', (event) => {
                    if (window.UI?.showPreview) {
                        window.UI.showPreview(event, imageSrc);
                    }
                });

                el.addEventListener('mousemove', (event) => {
                    if (window.UI?.movePreview) {
                        window.UI.movePreview(event);
                    }
                });

                el.addEventListener('mouseleave', () => {
                    if (window.UI?.closePreview) {
                        window.UI.closePreview();
                    }
                });
            }
        });

        root.querySelectorAll('.info-btn[data-card-id]').forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const cardId = btn.dataset.cardId;
                const card = this.getCardById(cards, cardId);
                if (!card) return;

                this.openCardDetail(card);
            });
        });
    },

    renderSetup(adventureData, cards) {
        const setupDisplay = document.getElementById('setup-display');
        if (!setupDisplay) return;

        const setup = adventureData?.setup || {};
        const blueCards = this.normalizeArray(setup.blue_cards);
        const minionCards = this.normalizeArray(setup.minion_cards);
        const specialCards = this.normalizeArray(setup.special_cards);

        setupDisplay.innerHTML = `
            <div id="danger-value">
                <strong>Gefahrenwert:</strong> ${this.escapeHtml(adventureData?.danger_calc ?? '—')}
            </div>

            <div class="grid-container">
                <div class="card-list" id="blue-cards">
                    <h3>Abenteuerkarten</h3>
                    <ul>
                        ${this.buildList(blueCards, cards, 'blue_cards')}
                    </ul>
                </div>

                <div class="card-list" id="minions">
                    <h3>Schergen</h3>
                    <ul>
                        ${this.buildList(minionCards, cards, 'minion_cards')}
                    </ul>
                </div>

                <div class="card-list" id="special">
                    <h3>Spezialkarten</h3>
                    <ul>
                        ${this.buildList(specialCards, cards, 'special_cards')}
                    </ul>
                </div>
            </div>

            <hr>

            <div class="card-list">
                <h3>Sieg & Niederlage</h3>
                <p><strong>Sieg:</strong> ${this.escapeHtml(setup.victory || '—')}</p>
                <p><strong>Niederlage:</strong> ${this.escapeHtml(setup.defeat || '—')}</p>
            </div>
        `;

        this.bindSetupInteractions(setupDisplay, cards);
    },

    renderCardDetail(card) {
        if (!card) {
            return '<p>Keine Kartendaten vorhanden.</p>';
        }

        const safeCard = this.normalizeCard(card);
        const imageSrc = safeCard.image;
        const milestones = this.normalizeArray(safeCard.rules?.milestones);
        const actionTable = this.normalizeArray(safeCard.rules?.action_table);
        const timedEffects = this.normalizeArray(safeCard.rules?.timed_effects);

        let html = `
            <div class="card-list">
                <h3>${this.escapeHtml(safeCard.name)}</h3>
                <p>
                    <strong>Kategorie:</strong> ${this.escapeHtml(safeCard.card_category || '—')}<br>
                    <strong>Typ:</strong> ${this.escapeHtml(safeCard.type || '—')}<br>
                    <strong>Status:</strong> ${this.escapeHtml(safeCard.status || '—')}
                </p>
        `;

        if (safeCard.subtypes.length) {
            html += `<p><strong>Untertypen:</strong> ${safeCard.subtypes.map(v => this.escapeHtml(v)).join(', ')}</p>`;
        }

        if (imageSrc) {
            html += `
                <div style="margin: 16px 0;">
                    <img
                        src="${this.escapeHtml(imageSrc)}"
                        alt="${this.escapeHtml(safeCard.name)}"
                        style="max-width: 320px; width: 100%; border: 2px solid #8b4513; border-radius: 6px; display: block;"
                    >
                </div>
            `;
        }

        if (safeCard.rules?.passive) {
            html += `<p><strong>Passiv:</strong> ${this.escapeHtml(safeCard.rules.passive)}</p>`;
        }

        if (safeCard.rules?.success || safeCard.rules?.fail) {
            html += `<h4>Ergebnisse</h4>`;
            if (safeCard.rules?.success) {
                html += `<p><strong>Erfolg:</strong> ${this.escapeHtml(safeCard.rules.success)}</p>`;
            }
            if (safeCard.rules?.fail) {
                html += `<p><strong>Misserfolg:</strong> ${this.escapeHtml(safeCard.rules.fail)}</p>`;
            }
        }

        if (milestones.length) {
            html += `<h4>Meilensteine</h4><ul>`;
            milestones.forEach(item => {
                if (typeof item === 'object') {
                    html += `<li><strong>${this.escapeHtml(item.value)}:</strong> ${this.escapeHtml(item.text)}</li>`;
                } else {
                    html += `<li>${this.escapeHtml(item)}</li>`;
                }
            });
            html += `</ul>`;
        }

        if (timedEffects.length) {
            html += `<h4>Zeitlich eintretende Effekte</h4><ul>`;
            timedEffects.forEach(item => {
                if (typeof item === 'object') {
                    const trigger = item.trigger ? `<strong>${this.escapeHtml(item.trigger)}:</strong> ` : '';
                    html += `<li>${trigger}${this.escapeHtml(item.text || '')}</li>`;
                } else {
                    html += `<li>${this.escapeHtml(item)}</li>`;
                }
            });
            html += `</ul>`;
        }

        if (actionTable.length) {
            html += `
                <h4>Aktionstabelle</h4>
                <table style="width:100%; border-collapse: collapse; margin-top: 8px;">
                    <tbody>
            `;

            actionTable.forEach(row => {
                html += `
                    <tr>
                        <td style="border:1px solid #8b4513; padding:8px; width:110px; vertical-align: top;">
                            <strong>${this.escapeHtml(row.roll)}</strong>
                        </td>
                        <td style="border:1px solid #8b4513; padding:8px;">
                            <strong>${this.escapeHtml(row.title)}</strong><br>
                            ${this.escapeHtml(row.description)}
                        </td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;
        }

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

        modal.addEventListener('click', (event) => {
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
