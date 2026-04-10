/**
 * js/ui-renderer.js - Verbesserte Karten-Vorschau
 */
window.Renderer = {
    renderSetup(data, adventureCards) {
        if (!data) return;
        const heroCount = document.getElementById('heroCount').value;
        document.getElementById('title').innerText = data.name;

        const buildList = (items) => (items || []).map(item => {
            // Verbesserte Suche: Ignoriert Zitate und unnötige Leerzeichen
            const cleanName = item.split('[')[0].trim().toLowerCase();
            const card = adventureCards.find(c => cleanName.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(cleanName));
            
            let hover = "", btn = "", cssClass = "";

            if (card) {
                hover = `onmouseover="window.UI.showPreview(event, '${card.image}')" onmousemove="window.UI.movePreview(event)" onmouseout="window.UI.hidePreview()"` ;
                btn = `<button class="info-btn" onclick="window.UI.showPreview(event, '${card.image}')">i</button>`;
                cssClass = "has-preview";
            }

            return `<li><label class="checklist-item"><input type="checkbox"><span class="${cssClass}" ${hover}>${item}</span>${btn}</label></li>`;
        }).join('');

        document.querySelector('#blue-cards ul').innerHTML = buildList(data.setup.blue_cards);
        document.querySelector('#minions ul').innerHTML = buildList(data.setup.minion_keywords);
        
        document.getElementById('danger-value').innerHTML = 
            `Gefahrenwert: <strong>${heroCount * data.danger_calc} GP</strong> 
             <button class="info-btn" onclick="window.jumpToPage(12)">i</button>`;

        document.getElementById('special').innerHTML = `
            <h3>Spezialkarten</h3><ul>${buildList(data.setup.special_decks)}</ul><hr>
            <p><strong>⚔ Sieg:</strong> ${data.setup.victory}</p>
            <p><strong>☠ Niederlage:</strong> ${data.setup.defeat}</p>`;
    }
};
