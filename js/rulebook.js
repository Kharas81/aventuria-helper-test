/**
 * js/rulebook.js - Steuerung für das Regelbuch und den Index
 */
window.rulesData = [];
window.currentPage = 1;

// Das Inhaltsverzeichnis für die Sidebar
const indexData = [
    { p: 1, title: "Titelblatt" },
    { p: 2, title: "Was ist Aventurien?" },
    { p: 6, title: "Vorbereitung" },
    { p: 7, title: "Spielmaterial" },
    { p: 9, title: "Das Abenteuer" },
    { p: 10, title: "Der Kampf (Setup)" },
    { p: 13, title: "Kampfablauf" },
    { p: 15, title: "Sieg & Atempause" },
    { p: 17, title: "Silvanas Befreiung" },
    { p: 19, title: "Leute, die nicht spielen" },
    { p: 20, title: "Wildenstein Akt I" },
    { p: 21, title: "Wildenstein Akt II" },
    { p: 23, title: "Wildenstein Akt III" },
    { p: 24, title: "Übersichten" }
];

window.openRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'flex'; 
    window.switchTab('search'); 
};

window.closeRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'none'; 
};

window.jumpToPage = (nr) => {
    window.switchTab('reader');
    window.loadPage(nr);
};

window.switchTab = (tab) => {
    document.getElementById('tab-search').classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader').classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search').classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader').classList.toggle('active', tab === 'reader');
    if(tab === 'reader') window.loadPage(window.currentPage);
};

window.loadPage = async (nr) => {
    const cont = document.getElementById('page-content');
    if (!cont) return;
    cont.innerHTML = "Lade Schriftrolle...";
    try {
        const res = await fetch(`data/manual/base_game/page_${nr.toString().padStart(2,'0')}.json`);
        const data = await res.json();
        cont.innerHTML = `<h4>${data.title}</h4>${data.image ? `<img src="${data.image}" style="width:100%; border:1px solid #8b4513;">`:''}<div class="reader-text" style="margin-top:15px;">${data.content}</div>`;
        document.getElementById('currentPageNum').innerText = nr;
        window.currentPage = nr;
    } catch(e) { cont.innerHTML = "Fehler beim Laden der Seite."; }
};

window.nextPage = () => { if(window.currentPage < 24) window.loadPage(window.currentPage+1); };
window.prevPage = () => { if(window.currentPage > 1) window.loadPage(window.currentPage-1); };

window.filterRules = (term) => {
    const res = document.getElementById('rules-results');
    if(!term) { res.innerHTML = ""; return; }
    const filtered = window.rulesData.filter(r => r.title.toLowerCase().includes(term.toLowerCase()) || r.text.toLowerCase().includes(term.toLowerCase()));
    res.innerHTML = filtered.map(r => `<div class="rule-entry"><h4>${r.title}</h4><p>${r.text}</p></div>`).join('') || "Kein Treffer im Kodex.";
};

document.addEventListener('DOMContentLoaded', async () => {
    // Index befüllen
    const list = document.getElementById('manual-index');
    if (list) {
        list.innerHTML = indexData.map(item => 
            `<li onclick="window.jumpToPage(${item.p})">S. ${item.p}: ${item.title}</li>`
        ).join('');
    }

    // Kodex-Daten laden
    try {
        const r = await fetch('data/manual.json');
        const d = await r.json();
        window.rulesData = [...d.phases.map(p => ({title: p.name, text: p.desc})), ...Object.entries(d.rules).map(([k,v])=>({title: k, text: v}))];
    } catch(e){ console.warn("Kodex-Daten konnten nicht geladen werden."); }
});
