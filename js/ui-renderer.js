/**
 * js/ui-renderer.js - Baut das Abenteuer-Setup zusammen
 */
const Renderer = {
    renderSetup(data, adventureCards) {
        const heroCount = document.getElementById('heroCount').value;
        document.getElementById('title').innerText = data.name;

        const buildList = (items) => (items || []).map(item => {
            const card = adventureCards.find(c => item.toLowerCase().includes(c.name.toLowerCase()));
            let hover = "", btn = "", cssClass = "";

            if (card) {
                hover = `onmouseover="UI.showPreview(event, '${card.image}')" onmousemove="UI.movePreview(event)" onmouseout="UI.hidePreview()"` ;
                btn = `<button class="info-btn" onclick="UI.showPreview(event, '${card.image}')">i</button>`;
                cssClass = "has-preview";
            }

            return `<li>
                <label class="checklist-item">
                    <input type="checkbox"> 
                    <span class="${cssClass}" ${hover}>${item}</span> 
                    ${btn}
                </label>
            </li>`;
        }).join('');

        document.querySelector('#blue-cards ul').innerHTML = buildList(data.setup.blue_cards);
        document.querySelector('#minions ul').innerHTML = buildList(data.setup.minion_keywords);
        
        // Gefahrenwert-Berechnung
        document.getElementById('danger-value').innerHTML = 
            `Gefahrenwert: <strong>${heroCount * data.danger_calc} GP</strong> 
             <button class="info-btn" onclick="jumpToPage(12)">i</button>`;

        document.getElementById('special').innerHTML = `
            <h3>Spezialkarten (Grün)</h3>
            <ul>${buildList(data.setup.special_decks)}</ul>
            <hr>
            <p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p>
            <p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>`;
    }
};
