/**
 * rulebook.js - Fehlerfreie Version mit Deep-Linking und Text-Reinigung
 */

// Globale Variablen für den Status
let rulesData = [];
let currentPage = 1;
const MAX_PAGES = 24;

// Inhaltsverzeichnis für die Sidebar
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

/**
 * Entfernt die Markierungen zuverlässig aus dem Text.
 */
function cleanAventuriaText(text) {
    if (!text) return "";
    // Die korrekte Regex-Formel ohne Syntax-Risiko
    const citeRegex = /\]*\]/gi;
    return text.replace(citeRegex, "").trim();
}

/**
 * Öffnet das Modal und setzt den Standard-Tab auf Suche
 */
window.openRulebook = function() {
    const modal = document.getElementById('rule-modal');
    if (modal) {
        modal.style.display = 'flex';
        window.switchTab('search');
    }
};

/**
 * Schließt das Modal
 */
window.closeRulebook = function() {
    const modal = document.getElementById('rule-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};

/**
 * Springt direkt zu einer Seite im Reader
 */
window.jumpToPage = function(pageNumber) {
    window.switchTab('reader');
    loadPage(pageNumber);
};

/**
 * Wechselt zwischen den Tabs (Kodex/Reader)
 */
window.switchTab = function(tab) {
    const sTab = document.getElementById('tab-search');
    const rTab = document.getElementById('tab-reader');
    const sBtn = document.getElementById('btn-search');
    const rBtn = document.getElementById('btn-reader');

    if (sTab && rTab && sBtn && rBtn) {
        if (tab === 'search') {
            sTab.classList.remove('hidden');
            rTab.classList.add('hidden');
            sBtn.classList.add('active');
            rBtn.classList.remove('active');
        } else {
            sTab.classList.add('hidden');
            rTab.classList.remove('hidden');
            sBtn.classList.remove('active');
            rBtn.classList.add('active');
            loadPage(currentPage);
        }
    }
};

/**
 * Lädt eine einzelne Seite (JSON) und zeigt sie an
 */
async function loadPage(pageNumber) {
    const container = document.getElementById('page-content');
    const pageNumDisplay = document.getElementById('currentPageNum');
    if (!container) return;

    const formattedNum = pageNumber.toString().padStart(2, '0');
    container.innerHTML = "<p>Lade Schriftrolle...</p>";

    try {
        const resp = await fetch(`data/manual/base_game/page_${formattedNum}.json`);
        if (!resp.ok) throw new Error("Datei fehlt");
        const data = await resp.json();
        
        // Bild-HTML falls vorhanden
        const imageHtml = data.image ? `<div class="img-wrapper"><img src="${data.image}" class="manual-page-img"></div>` : "";
        
        container.innerHTML = `
            <div class="reader-text">
                ${imageHtml}
                <h4>${cleanAventuriaText(data.title)}</h4>
                <div class="page-body">${cleanAventuriaText(data.content)}</div>
            </div>`;
            
        if (pageNumDisplay) pageNumDisplay.innerText = pageNumber;
        currentPage = pageNumber;
        container.scrollTop = 0;
    } catch (e) {
        container.innerHTML = `<p class="error">Fehler: Seite ${formattedNum} konnte nicht geladen werden.</p>`;
    }
}

// Blätter-Funktionen
window.nextPage = () => { if(currentPage < MAX_PAGES) loadPage(currentPage + 1); };
window.prevPage = () => { if(currentPage > 1) loadPage(currentPage - 1); };

/**
 * Filtert die Regeln im Kodex-Tab
 */
window.filterRules = function(term) {
    const resContainer = document.getElementById('rules-results');
    if(!resContainer) return;
    if(!term) { resContainer.innerHTML = ""; return; }
    
    const filtered = rulesData.filter(r => 
        r.title.toLowerCase().includes(term.toLowerCase()) || 
        r.text.toLowerCase().includes(term.toLowerCase())
    );
    
    resContainer.innerHTML = filtered.map(r => `
        <div class="rule-entry">
            <h4>${cleanAventuriaText(r.title)}</h4>
            <p>${cleanAventuriaText(r.text)}</p>
        </div>`).join('') || "<p>Kein Eintrag im Kodex gefunden.</p>";
};

/**
 * Initialisierung beim Laden der Seite
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Index aufbauen
    const list = document.getElementById('manual-index');
    if (list) {
        list.innerHTML = indexData.map(item => 
            `<li onclick="jumpToPage(${item.p})">S. ${item.p}: ${item.title}</li>`
        ).join('');
    }

    // 2. Suchdaten laden
    try {
        const regResp = await fetch('data/manual.json');
        if (regResp.ok) {
            const regData = await regResp.json();
            rulesData = [
                ...regData.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
                ...Object.entries(regData.rules).map(([key, val]) => ({ title: key, text: val }))
            ];
        }
    } catch (e) {
        console.warn("Regel-Suchdaten konnten nicht geladen werden.");
    }
});