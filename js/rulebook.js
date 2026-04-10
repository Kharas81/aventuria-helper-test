let rulesData = [];
let currentPage = 1;

window.openRulebook = () => { document.getElementById('rule-modal').style.display = 'flex'; switchTab('search'); };
window.closeRulebook = () => { document.getElementById('rule-modal').style.display = 'none'; };

window.switchTab = (tab) => {
    document.getElementById('tab-search').classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader').classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search').classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader').classList.toggle('active', tab === 'reader');
    if(tab === 'reader') loadPage(currentPage);
};

async function loadPage(nr) {
    const cont = document.getElementById('page-content');
    cont.innerHTML = "Lade...";
    try {
        const res = await fetch(`data/manual/base_game/page_${nr.toString().padStart(2,'0')}.json`);
        const data = await res.json();
        cont.innerHTML = `<h4>${data.title}</h4>${data.image ? `<img src="${data.image}" style="width:100%">`:''}<div class="reader-text">${data.content}</div>`;
        document.getElementById('currentPageNum').innerText = nr;
        currentPage = nr;
    } catch(e) { cont.innerHTML = "Fehler."; }
}

window.nextPage = () => { if(currentPage < 24) loadPage(currentPage+1); };
window.prevPage = () => { if(currentPage > 1) loadPage(currentPage-1); };

window.filterRules = (term) => {
    const res = document.getElementById('rules-results');
    if(!term) { res.innerHTML = ""; return; }
    const filtered = rulesData.filter(r => r.title.toLowerCase().includes(term.toLowerCase()) || r.text.toLowerCase().includes(term.toLowerCase()));
    res.innerHTML = filtered.map(r => `<div class="rule-entry"><h4>${r.title}</h4><p>${r.text}</p></div>`).join('') || "Kein Treffer.";
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const r = await fetch('data/manual.json');
        const d = await r.json();
        rulesData = [...d.phases.map(p => ({title: p.name, text: p.desc})), ...Object.entries(d.rules).map(([k,v])=>({title: k, text: v}))];
    } catch(e){}
});
