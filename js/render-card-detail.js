window.RenderCardDetail = {
    normalizeCardDetail(card) {
        const normalized = window.RenderCommon.normalizeCard(card);

        return {
            ...normalized,
            card_category: Utils.normalizeString(card?.card_category),
            subtypes: window.RenderCommon.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: Utils.normalizeString(card?.rules?.passive),
                success: Utils.normalizeString(card?.rules?.success),
                fail: Utils.normalizeString(card?.rules?.fail),
                draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
                flavor: Utils.normalizeString(card?.rules?.flavor),
                timed_effects: window.RenderCommon.normalizeArray(card?.rules?.timed_effects),
                milestones: window.RenderCommon.normalizeArray(card?.rules?.milestones),
                action_table: window.RenderCommon.normalizeArray(card?.rules?.action_table)
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
        const filtered = window.RenderCommon.normalizeArray(values).filter(Boolean);
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

        if (safeCard.hasRealImage) {
            html += `
                <div class="img-wrapper">
                    <img
                        id="card-detail-image"
                        alt="${Utils.escapeHtml(safeCard.name)}"
                        class="manual-page-img"
                        loading="lazy"
                    >
                </div>
            `;
        }

        html += `<p><strong>ID:</strong> ${Utils.escapeHtml(safeCard.id || '—')}</p>`;
        html += `<p><strong>Typ:</strong> ${Utils.escapeHtml(window.RenderCommon.getCardTypeLabel(safeCard))}</p>`;

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

        const detailImage = Utils.byId('card-detail-image');
        if (detailImage) {
            Utils.setSafeImageSource(detailImage, window.RenderCommon.getCardImage(card));
        }

        modal.style.display = 'flex';
    },

    closeCardDetail() {
        const modal = Utils.byId('card-detail-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
};
