/**
 * js/ui-renderer.js
 * Rendert Abenteuerdaten über Karten-IDs und unterstützt unvollständige Kartendaten.
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

    normalizeCard(rawCard) {
        return {
            id: rawCard?.id || '',
            name: rawCard?.name || '',
            type: rawCard?.type || 'unknown',
            status: rawCard?.status || 'basic',
            image: rawCard?.image || '',
            tags: Array.isArray(rawCard?.tags) ? rawCard.tags : [],
            note: rawCard?.note || '',
            stats: rawCard?.stats || {},
            rules: rawCard?.rules || {}
        };
    },

    getCardById(cards, id) {
        const match = (cards || []).find(card => card.id === id);
        return match ? this.normalizeCard(match) : null;
    },

    buildMetaLine(card) {
        if (!card) return '';

        const parts = [];

        if (card.type) parts.push(card.type);
        if (card.status) parts.push(card.status);
        if (Array.isArray(card.tags) && card.tags.length) {
            parts.push(card.tags.join(', '));
        }

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
        if (!Array.isArray(items)) return '';

        return items.map((item, index) => {
            const entry = typeof item === 'string' ? { id: item } : item;
            const card = this.getCardById(cards, entry.id);

            const label = this.escapeHtml(
                entry.label || card?.name || `⚠️ ${entry.id}`
            );

            const metaLine = this.buildMetaLine(card);
            const noteLine = this.buildNoteLine(card);
            const safeImage = card?.image ? this.escapeHtml(card.image) : '';

            const dataAttrs = [
                `data-list-type="${this.escapeHtml(listType)}"`,
                `data-list-index="${index}"`,
                `data-card-id="${this.escapeHtml(entry.id || '')}"`
            ].join(' ');

            if (card?.image) {
                return `
                    <li>
                        <label class="checklist-item" ${dataAttrs}>
                            <input type="checkbox">
                            <span class="has-preview">${label}${metaLine}${noteLine}</span>
                            <button
                                type="button"
                                class="info-btn"
                                data-card-image="${safeImage}"
                                title="Kartenvorschau öffnen"
                            >i</button>
                        </label>
                    </li>
                `;
            }

            return `
                <li>
                    <label class="checklist-item" ${dataAttrs}>
                        <input type="checkbox">
                        <span>${label}${metaLine}${noteLine}</span>
                        <button
                            type="button"
                            class="info-btn"
                            disabled
                            title="Keine Kartenvorschau vorhanden"
                        >–</button>
                    </label>
                </li>
            `;
        }).join('');
    },

    renderSetup(data, adventureCards) {
        if (!data) return;

        const heroCount = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const dangerCalc = Number.isFinite(Number(data.danger_calc)) ? Number(data.danger_calc) : 0;

        const titleEl = document.getElementById('title');
        const blueList = document.querySelector('#blue-cards ul');
        const minionList = document.querySelector('#minions ul');
        const dangerValue = document.getElementById('danger-value');
        const specialBox = document.getElementById('special');

        if (titleEl) {
            titleEl.innerText = data.name || 'Unbekanntes Abenteuer';
        }

        if (blueList) {
            blueList.innerHTML = this.buildList(data.setup?.blue_cards, adventureCards, 'blue_cards');
        }

        if (minionList) {
            minionList.innerHTML = this.buildList(data.setup?.minion_cards, adventureCards, 'minion_cards');
        }

        if (dangerValue) {
            dangerValue.innerHTML = `
                Gefahrenwert: <strong>${heroCount * dangerCalc} GP</strong>
                <button type="button" class="info-btn" id="danger-info-btn">i</button>
            `;
        }

        if (specialBox) {
            specialBox.innerHTML = `
                <h3>Spezialkarten</h3>
                <ul>${this.buildList(data.setup?.special_cards, adventureCards, 'special_cards')}</ul>
                <hr>
                <p><strong>⚔ Sieg:</strong> ${this.escapeHtml(data.setup?.victory ?? '—')}</p>
                <p><strong>☠ Niederlage:</strong> ${this.escapeHtml(data.setup?.defeat ?? '—')}</p>
            `;
        }

        this.bindPreviewEvents();
        this.bindDangerInfoButton();

        if (window.StorageManager && !window.App?.isApplyingSavedState) {
            window.StorageManager.persist();
        }
    },

    bindPreviewEvents() {
        document.querySelectorAll('[data-card-image]').forEach(el => {
            const image = el.dataset.cardImage;
            if (!image) return;

            el.addEventListener('mouseover', (event) => {
                if (!window.UI?.isTouchDevice) {
                    window.UI?.showPreview(event, image);
                }
            });

            el.addEventListener('mousemove', (event) => {
                if (!window.UI?.isTouchDevice) {
                    window.UI?.movePreview(event);
                }
            });

            el.addEventListener('mouseout', () => {
                if (!window.UI?.isTouchDevice) {
                    window.UI?.hidePreview();
                }
            });

            if (el.tagName === 'BUTTON') {
                el.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.UI?.showPreview(event, image);
                });
            }
        });
    },

    bindDangerInfoButton() {
        const btn = document.getElementById('danger-info-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (typeof window.jumpToPage === 'function') {
                window.jumpToPage(12);
            } else {
                console.warn('jumpToPage ist noch nicht verfügbar.');
            }
        });
    }
};
