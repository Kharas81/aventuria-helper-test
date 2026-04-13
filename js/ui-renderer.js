window.Renderer = {
    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    getCardById(cards, id) {
        return (Array.isArray(cards) ? cards : []).find(card => card?.id === id) || null;
    },

    getImageSrc(card) {
        if (!card) return '';
        if (card.images?.front) return card.images.front;
        if (card.image) return card.image;
        return '';
    },

    getDisplayName(cardRef, cardMap) {
        if (!cardRef) return 'Unbekannte Karte';

        if (typeof cardRef === 'string') {
            return cardMap.get(cardRef)?.name || cardRef;
        }

        if (typeof cardRef === 'object') {
            return cardMap.get(cardRef.id)?.name || cardRef.label || cardRef.name || cardRef.id || 'Unbekannte Karte';
        }

        return 'Unbekannte Karte';
    },

    buildCardMap(cards) {
        const map = new Map();
        (Array.isArray(cards) ? cards : []).forEach(card => {
            if (card?.id) {
                map.set(card.id, card);
            }
        });
        return map;
    },

    renderListItems(items, cardMap, options = {}) {
        const allowPreview = options.allowPreview !== false;

        if (!Array.isArray(items) || items.length === 0) {
            return '<li>Keine Einträge vorhanden.</li>';
        }

        return items.map((entry) => {
            const cardId = typeof entry === 'string' ? entry : entry?.id;
            const card = cardId ? cardMap.get(cardId) : null;
            const label = this.getDisplayName(entry, cardMap);
            const imageSrc = this.getImageSrc(card);

            const infoButton = card
                ? `<button type="button" class="info-btn" data-card-id="${this.escapeHtml(card.id)}" title="Kartendetails anzeigen">i</button>`
                : '';

            const textClass = allowPreview && imageSrc ? 'has-preview' : '';

            return `
                <li>
                    <label class="checklist-item">
                        <input type="checkbox">
                        <span class="${textClass}" ${imageSrc ? `data-preview-src="${this.escapeHtml(imageSrc)}"` : ''}>
                            ${this.escapeHtml(label)}
                        </span>
                        ${infoButton}
                    </label>
                    <div class="check-result"></div>
                </li>
            `;
        }).join('');
    },

    bindPreviewAndInfo(root, cardMap) {
        if (!root) return;

        root.querySelectorAll('[data-preview-src]').forEach(el => {
            const imageSrc = el.dataset.previewSrc;
            if (!imageSrc) return;

            if (!window.UI?.isTouchDevice) {
                el.addEventListener('mouseenter', (event) => {
                    window.UI?.showPreview(event, imageSrc);
                });

                el.addEventListener('mousemove', (event) => {
                    window.UI?.movePreview(event);
                });

                el.addEventListener('mouseleave', () => {
                    window.UI?.closePreview();
                });
            } else {
                el.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.UI?.openPreview(imageSrc);
                });
            }
        });

        root.querySelectorAll('.info-btn[data-card-id]').forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const cardId = btn.dataset.cardId;
                if (!cardId) return;

                const card = cardMap.get(cardId);
                if (!card) return;

                this.openCardDetail(card);
            });
        });
    },

    renderSetup(adventureData, cards) {
        const setupDisplay = document.getElementById('setup-display');
        if (!setupDisplay) return;

        const setup = adventureData?.setup || {};
        const cardMap = this.buildCardMap(cards);

        const blueCards = Array.isArray(setup.blue_cards) ? setup.blue_cards : [];
        const minionCards = Array.isArray(setup.minion_cards) ? setup.minion_cards : [];
        const specialCards = Array.isArray(setup.special_cards) ? setup.special_cards : [];

        setupDisplay.innerHTML = `
            <div id="danger-value">
                <strong>Gefahrenwert:</strong> ${this.escapeHtml(adventureData?.danger_calc ?? '—')}
            </div>

            <div class="grid-container">
                <section class="card-list" id="blue-cards">
                    <h3>🔵 Abenteuerkarten</h3>
                    <ul>
                        ${this.renderListItems(blueCards, cardMap, { allowPreview: true })}
                    </ul>
                </section>

                <section class="card-list" id="minions">
                    <h3>⚔️ Schergen</h3>
                    <ul>
                        ${this.renderListItems(minionCards, cardMap, { allowPreview: true })}
                    </ul>
                </section>

                <section class="card-list" id="special">
                    <h3>🟢 Spezialkarten</h3>
                    <ul>
                        ${this.renderListItems(specialCards, cardMap, { allowPreview: true })}
                    </ul>
                </section>
            </div>

            <hr>

            <div class="card-list">
                <h3>🏆 Sieg & Niederlage</h3>
                <p><strong>Sieg:</strong> ${this.escapeHtml(setup.victory ?? '—')}</p>
                <p><strong>Niederlage:</strong> ${this.escapeHtml(setup.defeat ?? '—')}</p>
            </div>
        `;

        this.bindPreviewAndInfo(setupDisplay, cardMap);
    },

    renderCardDetail(card) {
        if (!card) {
            return '<p>Keine Kartendaten vorhanden.</p>';
        }

        const imageSrc = this.getImageSrc(card);
        const subtypes = Array.isArray(card.subtypes) ? card.subtypes : [];
        const tags = Array.isArray(card.tags) ? card.tags : [];
        const keywords = Array.isArray(card.keywords) ? card.keywords : [];
        const actionTable = Array.isArray(card.rules?.action_table) ? card.rules.action_table : [];
        const milestones = Array.isArray(card.rules?.milestones) ? card.rules.milestones : [];
        const timedEffects = Array.isArray(card.rules?.timed_effects) ? card.rules.timed_effects : [];

        let html = `
            <div class="card-list">
                <h3>${this.escapeHtml(card.name)}</h3>
                <p>
                    <strong>Kategorie:</strong> ${this.escapeHtml(card.card_category || '—')}<br>
                    <strong>Typ:</strong> ${this.escapeHtml(card.type || '—')}<br>
                    <strong>Status:</strong> ${this.escapeHtml(card.status || '—')}
                </p>
        `;

        if (subtypes.length) {
            html += `<p><strong>Untertypen:</strong> ${subtypes.map(v => this.escapeHtml(v)).join(', ')}</p>`;
        }

        if (imageSrc) {
            html += `
                <div style="margin: 16px 0;">
                    <img
                        src="${this.escapeHtml(imageSrc)}"
                        alt="${this.escapeHtml(card.name)}"
                        style="max-width: 320px; width: 100%; border: 2px solid #8b4513; border-radius: 6px; display: block;"
                    >
                </div>
            `;
        }

        if (card.rules?.passive) {
            html += `<p><strong>Passiv:</strong> ${this.escapeHtml(card.rules.passive)}</p>`;
        }

        if (card.rules?.success || card.rules?.fail) {
            html += `<h4>Ergebnisse</h4>`;
            if (card.rules?.success) {
                html += `<p><strong>Erfolg:</strong> ${this.escapeHtml(card.rules.success)}</p>`;
            }
            if (card.rules?.fail) {
                html += `<p><strong>Misserfolg:</strong> ${this.escapeHtml(card.rules.fail)}</p>`;
            }
        }

        if (milestones.length) {
            html += `<h4>Meilensteine</h4><ul>`;
            milestones.forEach(item => {
                html += `<li><strong>${this.escapeHtml(item.value)}:</strong> ${this.escapeHtml(item.text)}</li>`;
            });
            html += `</ul>`;
        }

        if (timedEffects.length) {
            html += `<h4>Zeitlich eintretende Effekte</h4><ul>`;
            timedEffects.forEach(item => {
                html += `<li>${this.escapeHtml(typeof item === 'string' ? item : JSON.stringify(item))}</li>`;
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

        if (card.rules?.draw_effect) {
            html += `<p><strong>Zugeffekt:</strong> ${this.escapeHtml(card.rules.draw_effect)}</p>`;
        }

        if (card.rules?.flavor) {
            html += `<p><strong>Beschreibung:</strong> <em>${this.escapeHtml(card.rules.flavor)}</em></p>`;
        }

        if (tags.length) {
            html += `<p><strong>Tags:</strong> ${tags.map(tag => `#${this.escapeHtml(tag)}`).join(' ')}</p>`;
        }

        if (keywords.length) {
            html += `<p><strong>Keywords:</strong> ${keywords.map(v => this.escapeHtml(v)).join(', ')}</p>`;
        }

        if (card.source?.book || card.source?.page || card.source?.note) {
            html += `<h4>Quelle</h4><p>`;
            if (card.source?.book) {
                html += `<strong>Buch:</strong> ${this.escapeHtml(card.source.book)}<br>`;
            }
            if (card.source?.page !== null && card.source?.page !== undefined && card.source?.page !== '') {
                html += `<strong>Seite:</strong> ${this.escapeHtml(card.source.page)}<br>`;
            }
            if (card.source?.note) {
                html += `<strong>Hinweis:</strong> ${this.escapeHtml(card.source.note)}`;
            }
            html += `</p>`;
        }

        if (card.notes || card.note) {
            html += `<p><strong>Notiz:</strong> ${this.escapeHtml(card.notes || card.note)}</p>`;
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
