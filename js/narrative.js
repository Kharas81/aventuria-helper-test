window.Narrative = {
    renderStory(data) {
        const container = document.getElementById('story-area');
        if (!container || !data || !data.narrative) {
            if(container) container.innerHTML = "";
            return;
        }
        container.innerHTML = `
            <div class="card-list">
                <h3>📖 Die Geschichte</h3><p class="story-text">${data.narrative.intro}</p>
                <div class="probes-area">
                    <h4>Interaktive Proben:</h4>
                    ${data.narrative.checks.map(check => `
                        <div class="probe-item">
                            <p><strong>${check.skill}:</strong> ${check.text}</p>
                            <div class="probe-buttons">
                                <button class="btn-sm success" onclick="window.UI.handleCheck(this, 'success', '${check.results.success}')">Erfolg</button>
                                <button class="btn-sm fail" onclick="window.UI.handleCheck(this, 'fail', '${check.results.fail}')">Misserfolg</button>
                            </div>
                        </div>`).join('')}
                </div>
            </div>`;
    }
};
