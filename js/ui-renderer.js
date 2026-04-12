/**
 * js/ui-renderer.js - Rendert Abenteuerdaten über Karten-IDs
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

    getCardById(cards, id) {
        return (cards || []).find(card => card.id === id) || null;
    },

    buildList(items, cards) {
        if (!Array.isArray(items)) return "";

        return items.map(item => {
            const entry = typeof item === "string" ? { id: item } : item;
            const card = this.getCardById(cards, entry.id);

            const label = this.escapeHtml(
                entry.label || card?.name || `⚠️ ${entry.id}`
            );

            if (card?.image) {
                const safeImage = this.escapeHtml(card.image);

                return `
                    <li>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span class="has-preview">${label}</span>
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
                        <span>${label}</span>
                        <button
                            type="button"
                            class="info-btn"
                            disabled
                            title="Keine Kartendaten vorhanden"
                        >–</button>
                    </label>
                </li>
            `;
        }).join("");
    },

    renderSetup(data, adventureCards) {
        if (!data) return;

        const heroCount = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const dangerCalc = Number.isFinite(Number(data.danger_calc)) ? Number(data.danger_calc) : 0;

        document.getElementById('title').innerText = data.name || "Unbekanntes Abenteuer";

        document.querySelector('#blue-cards ul').innerHTML = this.buildList(
            data.setup?.blue_cards,
            adventureCards
        );

        document.querySelector('#minions ul').innerHTML = this.buildList(
            data.setup?.minion_cards,
            adventureCards
        );

        document.getElementById('danger-value').innerHTML = `
            Gefahrenwert: <strong>${heroCount * dangerCalc} GP</strong>
            <button type="button" class="info-btn" id="danger-info-btn">i</button>
        `;

        document.getElementById('special').innerHTML = `
            <h3>Spezialkarten</h3>
            <ul>${this.buildList(data.setup?.special_cards, adventureCards)}</ul>
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
