const Archive = {
    open() { document.getElementById('archive-modal').style.display = 'flex'; },
    close() { document.getElementById('archive-modal').style.display = 'none'; },
    async loadSet(setKey) {
        const grid = document.getElementById('archive-grid');
        grid.innerHTML = "Lade...";
        const res = await fetch(`data/cards/base_game/master_${setKey}.json`);
        const data = await res.json();
        grid.innerHTML = data.cards.map(c => `<div class="archive-card" onmouseover="UI.showPreview(event, '${c.image}')" onmousemove="UI.movePreview(event)" onmouseout="UI.hidePreview()"><img src="${c.image}"><p>${c.name}</p></div>`).join('');
    },
    filter(query) {
        const q = query.toLowerCase();
        document.querySelectorAll('.archive-card').forEach(c => {
            c.style.display = c.innerText.toLowerCase().includes(q) ? 'block' : 'none';
        });
    }
};
