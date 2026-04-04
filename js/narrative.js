/**
 * narrative.js - Steuert die Vorlesetexte und interaktiven Proben
 */
window.renderStory = function(data) {
    const container = document.getElementById('story-area');
    container.innerHTML = ""; // Container leeren vor neuem Abenteuer

    if (!data.narrative) {
        container.style.display = "none";
        return;
    }

    container.style.display = "block";
    let html = `
        <div class="narrative-box">
            <h3>📖 Die Geschichte</h3>
            <p class="italic-text">${data.narrative.intro}</p>
    `;

    if (data.narrative.checks && data.narrative.checks.length > 0) {
        html += `<hr><h4>Interaktive Proben:</h4>`;
        data.narrative.checks.forEach(check => {
            html += `
                <div class="check-card">
                    <p><strong>${check.skill}:</strong> ${check.text}</p>
                    <div class="check-btns">
                        <button class="btn-sm success" onclick="alert('Erfolg: ${check.results.success}')">Erfolg</button>
                        <button class="btn-sm fail" onclick="alert('Misserfolg: ${check.results.fail}')">Misserfolg</button>
                    </div>
                </div>
            `;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
};