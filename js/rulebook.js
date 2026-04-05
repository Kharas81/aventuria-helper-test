/**
 * rulebook.js - Modulares Ladesystem mit Index, Suche und Bild-Support
 */
let rulesData = [];
let currentPage = 1;
const MAX_PAGES = 24;

// Inhaltsverzeichnis basierend auf der Anleitung
const indexData = [
    { p: 1, title: "Titelblatt" }, // [cite: 1]
    { p: 2, title: "Was ist Aventurien?" }, // [cite: 6]
    { p: 5, title: "Götter & Währung" }, // [cite: 117, 127]
    { p: 6, title: "Vorbereitung der Helden" }, // [cite: 148]
    { p: 7, title: "Spielmaterial (Karten)" }, // [cite: 175]
    { p: 9, title: "Abenteuer & Proben" }, // [cite: 273, 299]
    { p: 10, title: "Der Kampf (Vorbereitung)" }, // [cite: 317]
    { p: 13, title: "Der Kampfablauf" }, // [cite: 522]
    { p: 15, title: "Sieg & Atempause" }, // [cite: 622, 644]
    { p: 16, title: "Ergänzende Regeln" }, // [cite: 670]
    { p: 17, title: "Silvanas Befreiung" }, // [cite: 712]
    { p: 19, title: "Leute, die nicht spielen" }, // [cite: 789]
    { p: 20, title: "Wildenstein Akt I" }, // [cite: 836]
    { p: 21, title: "Wildenstein Akt II" }, // [cite: 903]
    { p: 23, title: "Wildenstein Akt III" }, // [cite: 972]
    { p: 24, title: "Übersichten & Symbole" } // [cite: 1051, 1062]
];

async function initRulebook() {
    try {
        // Suchdaten für den Kodex laden
        const regResp = await fetch('data/manual.json');
        const regData = await regResp.json();
        rulesData = [
            ...regData.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
            ...Object.entries(regData.rules).map(([key, val]) => ({ title: key, text: val }))
        ];
        renderIndex();
    } catch (e) { 
        console.error("Fehler beim Initialisieren des Regelwerks:", e); 
    }
}

function renderIndex() {
    const list = document.getElementById('manual-index');
    if (!list) return;
    list.innerHTML = indexData.map(item => 
        `<li onclick="jumpToPage(${item.p})">S. ${item.p}: ${item.title}</li>`
    ).join('');
}

window.openRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'flex'; 
};

window.closeRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'none'; 
};

window.jumpToPage = (pageNumber) => {
    switchTab('reader');
    loadPage(pageNumber);
};

window.switchTab = (tab) => {
    const searchTab = document.getElementById('tab-search');
    const readerTab = document.getElementById('tab-reader');
    const btnSearch = document.getElementById('btn-search');
    const btnReader = document.getElementById('btn-reader');

    if (tab === 'search') {
        searchTab.classList.remove('hidden');
        readerTab.classList.add('hidden');
        btnSearch.classList.add('active');
        btnReader.classList.remove('active');
    } else {
        searchTab.classList.add('hidden');
        readerTab.classList.remove('hidden');
        btnSearch.classList.remove('active');
        btnReader.classList.add('active');
        loadPage(currentPage);
    }
};

async function loadPage(pageNumber) {
    const container = document.getElementById('page-content');
    const pageNumDisplay = document.getElementById('currentPageNum');
    const formattedNum = pageNumber.toString().padStart(2, '0');
    
    container.innerHTML = "<p>Lade Schriftrolle...</p>";
    try {
        const resp = await fetch(`data/manual/base_game/page_${formattedNum}.json`);
        const data = await resp.json();
        
        // Bild einfügen, falls im JSON definiert
        const imageHtml = data.image ? `<img src="${data.image}" class="manual-page-img">` : "";
        
        container.innerHTML = `
            <div class="reader-text">
                ${imageHtml}
                <h4>${data.title}</h4>
                <div class="page-body">${data.content}</div>
            </div>`;
            
        pageNumDisplay.innerText = pageNumber;
        currentPage = pageNumber;
        container.scrollTop = 0; // Immer nach oben springen bei neuer Seite
    } catch (e) {
        container.innerHTML = `<p>Fehler: Seite ${formattedNum} konnte nicht geladen werden.</p>`;
    }
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
    
    container.innerHTML = filtered.map(r => `
        <div class="rule-entry">
            <h4>${r.title}</h4>
            <p>${r.text}</p>
        </div>`).join('') || "<p>Kein Eintrag im Kodex gefunden.</p>";
};

document.addEventListener('DOMContentLoaded', initRulebook);