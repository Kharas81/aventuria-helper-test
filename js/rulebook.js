/**
 * rulebook.js - Modulares Ladesystem mit verbesserter Cite-Reinigung
 */
let rulesData = [];
let currentPage = 1;
const MAX_PAGES = 24;

const indexData = [
    { p: 1, title: "Titelblatt" },
    { p: 2, title: "Was ist Aventurien?" },
    { p: 5, title: "Götter & Währung" },
    { p: 6, title: "Vorbereitung" },
    { p: 7, title: "Spielmaterial" },
    { p: 9, title: "Das Abenteuer" },
    { p: 10, title: "Der Kampf (Setup)" },
    { p: 13, title: "Kampfablauf" },
    { p: 15, title: "Sieg & Atempause" },
    { p: 16, title: "Ergänzende Regeln" },
    { p: 17, title: "Silvanas Befreiung" },
    { p: 19, title: "Leute, die nicht spielen" },
    { p: 20, title: "Wildenstein Akt I" },
    { p: 21, title: "Wildenstein Akt II" },
    { p: 23, title: "Wildenstein Akt III" },
    { p: 24, title: "Übersichten" }
];

// Hilfsfunktion zum Säubern der Texte von Quellenangaben
function cleanAventuriaText(text) {
    if (!text) return "";
    // Diese Regel findet [cite: 1], [cite: 1085] oder [cite: 1091-1095]
    return text.replace(/\]+\]/g, '').trim();
}

async function initRulebook() {
    try {
        const regResp = await fetch('data/manual.json');
        const regData = await regResp.json();
        rulesData = [
            ...regData.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
            ...Object.entries(regData.rules).map(([key, val]) => ({ title: key, text: val }))
        ];
        renderIndex();
    } catch (e) { console.error("Fehler beim Laden des Kodex:", e); }
}

function renderIndex() {
    const list = document.getElementById('manual-index');
    if (list) {
        list.innerHTML = indexData.map(item => 
            `<li onclick="jumpToPage(${item.p})">S. ${item.p}: ${item.title}</li>`
        ).join('');
    }
}

window.openRulebook = () => { document.getElementById('rule-modal').style.display = 'flex'; };
window.closeRulebook = () => { document.getElementById('rule-modal').style.display = 'none'; };

window.jumpToPage = (pageNumber) => {
    switchTab('reader');
    loadPage(pageNumber);
};

window.switchTab = (tab) => {
    document.getElementById('tab-search').classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader').classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search').classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader').classList.toggle('active', tab === 'reader');
    if (tab === 'reader') loadPage(currentPage);
};

async function loadPage(pageNumber) {
    const container = document.getElementById('page-content');
    const pageNumDisplay = document.getElementById('currentPageNum');
    const formattedNum = pageNumber.toString().padStart(2, '0');
    
    container.innerHTML = "<p>Lade Seite...</p>";
    try {
        const resp = await fetch(`data/manual/base_game/page_${formattedNum}.json`);
        const data = await resp.json();
        
        const imageHtml = data.image ? `<img src="${data.image}" class="manual-page-img">` : "";
        
        // Reinigung anwenden
        const cleanContent = cleanAventuriaText(data.content);
        const cleanTitle = cleanAventuriaText(data.title);

        container.innerHTML = `
            <div class="reader-text">
                ${imageHtml}
                <h4>${cleanTitle}</h4>
                <div class="page-body">${cleanContent}</div>
            </div>`;
            
        pageNumDisplay.innerText = pageNumber;
        currentPage = pageNumber;
        container.scrollTop = 0;
    } catch (e) { container.innerHTML = `<p>Fehler beim Laden von Seite ${formattedNum}.</p>`; }
}

window.nextPage = () => { if(currentPage < MAX_PAGES) loadPage(currentPage + 1); };
window.prevPage = () => { if(currentPage > 1) loadPage(currentPage - 1); };

window.filterRules = (term) => {
    const container = document.getElementById('rules-results');
    if(!term) { container.innerHTML = ""; return; }
    const filtered = rulesData.filter(r => 
        r.title.toLowerCase().includes(term.toLowerCase()) || 
        r.text.toLowerCase().includes(term.toLowerCase())
    );
    container.innerHTML = filtered.map(r => {
        const cleanTitle = cleanAventuriaText(r.title);
        const cleanText = cleanAventuriaText(r.text);
        return `<div class="rule-entry"><h4>${cleanTitle}</h4><p>${cleanText}</p></div>`;
    }).join('') || "<p>Kein Eintrag im Kodex gefunden.</p>";
};

document.addEventListener('DOMContentLoaded', initRulebook);