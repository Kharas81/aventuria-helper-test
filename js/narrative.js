/**
 * js/narrative.js - Steuert Vorlesetexte und interaktive Proben
 */
const Narrative = {
    renderStory(data) {
        const container = document.getElementById('story-area');
        if (!container) return;

        // Nutzt data.narrative passend zu den JSON-Dateien
        if (!data.narrative) {
            container.innerHTML = "";
            return;
        }

        container.innerHTML = `
            <div class="card-list" style="margin-bottom: 20px;">
                <h3>📖 Die Geschichte</h3>
                <p class="story-text">${data.narrative.intro}</p>
                <hr>
                ${this.renderChecks(data.narrative.checks)}
            </div>
        `;
    },

    renderChecks(checks) {
        if (!checks || checks.length === 0) return "";

        return `
            <div class="probes-area">
                <h4>Interaktive Proben:</h4>
                ${checks.map((check) => `
                    <div class="probe-item" style="margin-bottom: 15px; padding: 10px; background: rgba(0,0,0,0.03); border-radius: 4px;">
                        <p><strong>${check.skill}:</strong> ${check.text}</p>
                        <div class="probe-buttons">
                            <button class="btn-sm success" onclick="UI.handleCheck(this, 'success', '${check.results.success}')">Erfolg</button>
                            <button class="btn-sm fail" onclick="UI.handleCheck(this, 'fail', '${check.results.fail}')">Misserfolg</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

window.renderStory = (data) => Narrative.renderStory(data);
