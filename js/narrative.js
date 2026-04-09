/**
 * narrative.js - Steuert die Vorlesetexte und interaktiven Proben
 */

const Narrative = {
    renderStory(data) {
        const container = document.getElementById('story-area');
        if (!container) return;

        // Wenn keine Story-Daten vorhanden sind, Bereich leeren/verstecken
        if (!data.story) {
            container.innerHTML = "";
            return;
        }

        container.innerHTML = `
            <div class="card-list">
                <h3>📖 Die Geschichte</h3>
                <p class="story-text">${data.story.intro}</p>
                
                ${this.renderChecks(data.story.checks)}
            </div>
        `;
    },

    renderChecks(checks) {
        if (!checks || checks.length === 0) return "";

        return `
            <div class="probes-area">
                <h4>Interaktive Proben:</h4>
                ${checks.map((check, index) => `
                    <div class="probe-item">
                        <p><strong>${check.type}:</strong> ${check.description}</p>
                        <div class="probe-buttons">
                            <button class="btn-sm success" onclick="UI.handleCheck(this, 'success', '${check.success}')">Erfolg</button>
                            <button class="btn-sm fail" onclick="UI.handleCheck(this, 'fail', '${check.fail}')">Misserfolg</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// Globaler Alias für die app.js
window.renderStory = (data) => Narrative.renderStory(data);
