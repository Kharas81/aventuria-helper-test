/**
 * rulebook.js - Modulares Ladesystem für die Anleitung
 */
let rulesData = [];
let currentPage = 1; // Wir starten bei Seite 1
const MAX_PAGES = 24;

async function initRulebook() {
    try {
        // Allgemeine Suchdaten laden (für die Schnellsuche)
        const regResp = await fetch('data/manual.json');
        const regData = await regResp.json();

        rulesData = [
            ...regData.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
            ...Object.entries(regData.rules).map(([key, val]) => ({ title: key, text: val }))
        ];
    } catch (e) { 
        console.error("Fehler beim Initialisieren der Regelsuche:", e); 
    }
}

/**
 * Lädt eine spezifische Seite vom Server
 */
async function loadPage(pageNumber) {
    const container = document.getElementById('page-content');
    const pageNumDisplay = document.getElementById('currentPageNum');
    
    // Führende Null für Dateinamen hinzufügen (z.B. page_01.json)
    const formattedNum = pageNumber.toString().padStart(2, '0');
    
    try {
        container.innerHTML = "<p>Lade Seite...</p>";
        const resp = await fetch(`data/manual/base_game/page_${formattedNum}.json`);
        if (!resp.ok) throw new Error("Seite nicht gefunden");
        
        const data = await resp.json();
        
        // Inhalt anzeigen
        container.innerHTML = `<h3>${data.title}</h3><div class="reader-text">${data.content}</div>`;
        pageNumDisplay.innerText = pageNumber;
        currentPage = pageNumber;
    } catch (e) {
        container.innerHTML = `<p class="error">Fehler: Die Seite ${formattedNum} konnte nicht geladen werden.</p>`;
        console.error(e);
    }
}

window.openRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'flex'; 
    renderRules(''); 
};

window.closeRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'none'; 
};

window.switchTab = (tab) => {
    document.getElementById('tab-search').classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader').classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search').classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader').classList.toggle('active', tab === 'reader');
    
    if(tab === 'reader') loadPage(currentPage);
};

window.nextPage = () => { 
    if(currentPage < MAX_PAGES) { 
        loadPage(currentPage + 1); 
    } 
};

window.prevPage = () => { 
    if(currentPage > 1) { 
        loadPage(currentPage - 1); 
    } 
};

window.filterRules = (term) => {
    const container = document.getElementById('rules-results');
    if (!term) { container.innerHTML = ""; return; }
    
    const filtered = rulesData.filter(r => 
        r.title.toLowerCase().includes(term.toLowerCase()) || 
        r.text.toLowerCase().includes(term.toLowerCase())
    );
    container.innerHTML = filtered.map(r => `
        <div class="rule-entry">
            <h4>${r.title}</h4>
            <p>${r.text}</p>
        </div>`).join('');
};

document.addEventListener('DOMContentLoaded', initRulebook);