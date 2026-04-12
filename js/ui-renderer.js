/**
 * js/ui-renderer.js - Verbesserte Karten-Vorschau
 */
window.Renderer = {
    escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    renderSetup(data, adventureCards) {
        if (!data) return;

        const heroCount = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const dangerCalc = Number.isFinite(Number(data.danger_calc)) ? Number(data.danger_calc) : 0;

        document.getElementById('title').innerText = data.name || "Unbekanntes Abenteuer";

        const buildList = (items) => (items || []).map(item => {
            const originalText = String(item ?? "");
            const cleanName = originalText.split('[')[0].trim().toLowerCase();

            const card = (adventureCards || []).find(c => {
                const cardName = String(c.name ?? "").toLowerCase();
                return cleanName.includes(cardName) || cardName.includes(cleanName);
            });

            const safeText = this.escapeHtml(originalText);

            if (card?.image) {
                const safeImage = this.escapeHtml(card.image);

                return `
                    <li>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span
                                class="has-preview"
                                data-card-image="${safeImage}"
                            >${safeText}</span>
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
                    <label class="checklist-item">
                        <input type="checkbox">
                        <span>${safeText}</span>
                        <button
                            type="button"
                            class="info-btn"
                            disabled
                            title="Keine Kartendaten vorhanden"
                        >–</button>
                    </label>
                </li>
            `;
        }).join('');

        document.querySelector('#blue-cards ul').innerHTML = buildList(data.setup?.blue_cards);
        document.querySelector('#minions ul').innerHTML = buildList(data.setup?.minion_keywords);

        document.getElementById('danger-value').innerHTML = `
            Gefahrenwert: <strong>${heroCount * dangerCalc} GP</strong>
            <button type="button" class="info-btn" id="danger-info-btn">i</button>
        `;

        document.getElementById('special').innerHTML = `
            <h3>Spezialkarten</h3>
            <ul>${buildList(data.setup?.special_decks)}</ul>
            <hr>
            <p><strong>⚔ Sieg:</strong> ${this.escapeHtml(data.setup?.victory ?? "—")}</p>
            <p><strong>☠ Niederlage:</strong> ${this.escapeHtml(data.setup?.defeat ?? "—")}</p>
        `;

        this.bindPreviewEvents();
        this.bindDangerInfoButton();
    },

    bindPreviewEvents() {
        document.querySelectorAll('[data-card-image]').forEach(el => {
            const image = el.dataset.cardImage;
            if (!image) return;

            el.addEventListener('mouseover', (event) => window.UI?.showPreview(event, image));
            el.addEventListener('mousemove', (event) => window.UI?.movePreview(event));
            el.addEventListener('mouseout', () => window.UI?.hidePreview());

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
