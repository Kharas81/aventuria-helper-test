window.Narrative = {
    escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    renderStory(data) {
        const container = document.getElementById('story-area');

        if (!container || !data || !data.narrative) {
            if (container) container.innerHTML = "";
            return;
        }

        const checks = Array.isArray(data.narrative.checks) ? data.narrative.checks : [];

        container.innerHTML = `
            <div class="card-list">
                <h3>📖 Die Geschichte</h3>
                <p class="story-text">${this.escapeHtml(data.narrative.intro ?? "")}</p>
                <div class="probes-area">
                    <h4>Interaktive Proben:</h4>
                    ${checks.map((check, index) => `
                        <div class="probe-item" data-check-index="${index}">
                            <p>
                                <strong>${this.escapeHtml(check.skill ?? "Probe")}:</strong>
                                ${this.escapeHtml(check.text ?? "")}
                            </p>
                            <div class="probe-buttons">
                                <button type="button" class="btn-sm success" data-check-result="success">Erfolg</button>
                                <button type="button" class="btn-sm fail" data-check-result="fail">Misserfolg</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.bindCheckButtons(checks);
    },

    bindCheckButtons(checks) {
        document.querySelectorAll('.probe-item').forEach(item => {
            const index = parseInt(item.dataset.checkIndex, 10);
            const check = checks[index];
            if (!check || !check.results) return;

            item.querySelectorAll('[data-check-result]').forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.dataset.checkResult;
                    const resultText = check.results?.[type] ?? "Kein Ergebnis vorhanden.";

                    if (window.UI?.handleCheck) {
                        window.UI.handleCheck(button, type, this.escapeHtml(resultText));
                    }
                });
            });
        });
    }
};
