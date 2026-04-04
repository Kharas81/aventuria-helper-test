function renderStory(adventureData) {
    const container = document.getElementById('story-area');
    if (!adventureData.narrative) return;

    let html = ` <div class="narrative-box">
        <p class="italic-text">${adventureData.narrative.intro}</p>
        <hr>
        <h4>Interaktive Proben:</h4>`;
    
    adventureData.narrative.checks.forEach(check => {
        html += `
            <div class="check-card">
                <p><strong>${check.skill}:</strong> ${check.text}</p>
                <button class="btn-sm" onclick="alert('${check.results.success}')">Erfolg</button>
                <button class="btn-sm" onclick="alert('${check.results.fail}')">Misserfolg</button>
            </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
}
window.renderStory = renderStory;