window.Renderer = {

    escape(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    renderCardDetail(card) {
        if (!card) return '<p>Keine Daten vorhanden.</p>';

        let html = '';

        html += `<h2>${this.escape(card.name)}</h2>`;

        html += `<p style="opacity:0.7;">
            ${this.escape(card.card_category)} • ${this.escape(card.type)}
        </p>`;

        if (card.images?.front) {
            html += `<img src="${card.images.front}" style="max-width:300px; margin-bottom:15px;">`;
        }

        // --- Passive ---
        if (card.rules?.passive) {
            html += `<h3>Passiv</h3>`;
            html += `<p>${this.escape(card.rules.passive)}</p>`;
        }

        // --- Action Table (z. B. Glücks-Idol) ---
        if (Array.isArray(card.rules?.action_table) && card.rules.action_table.length > 0) {
            html += `<h3>Aktionen</h3>`;
            html += `<table style="width:100%; border-collapse:collapse;">`;

            card.rules.action_table.forEach(row => {
                html += `
                    <tr>
                        <td style="border:1px solid #555; padding:6px; width:80px;">
                            ${this.escape(row.roll)}
                        </td>
                        <td style="border:1px solid #555; padding:6px;">
                            <strong>${this.escape(row.title)}</strong><br>
                            ${this.escape(row.description)}
                        </td>
                    </tr>
                `;
            });

            html += `</table>`;
        }

        // --- Milestones (z. B. Zeitskala) ---
        if (Array.isArray(card.rules?.milestones) && card.rules.milestones.length > 0) {
            html += `<h3>Zeitskala</h3>`;
            html += `<ul>`;

            card.rules.milestones.forEach(m => {
                html += `<li><strong>${m.value}:</strong> ${this.escape(m.text)}</li>`;
            });

            html += `</ul>`;
        }

        // --- Success / Fail ---
        if (card.rules?.success || card.rules?.fail) {
            html += `<h3>Ergebnis</h3>`;
            if (card.rules.success) {
                html += `<p><strong>Erfolg:</strong> ${this.escape(card.rules.success)}</p>`;
            }
            if (card.rules.fail) {
                html += `<p><strong>Fehlschlag:</strong> ${this.escape(card.rules.fail)}</p>`;
            }
        }

        // --- Flavor ---
        if (card.rules?.flavor) {
            html += `<h3>Beschreibung</h3>`;
            html += `<p style="opacity:0.8;"><em>${this.escape(card.rules.flavor)}</em></p>`;
        }

        // --- Tags ---
        if (Array.isArray(card.tags) && card.tags.length > 0) {
            html += `<h3>Tags</h3>`;
            html += `<p>${card.tags.map(t => `<span style="margin-right:6px;">#${this.escape(t)}</span>`).join('')}</p>`;
        }

        return html;
    }
};
