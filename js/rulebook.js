/**
 * rulebook.js - Modulares Ladesystem mit Deep-Linking
 */
let rulesData = [];
let currentPage = 1;
const MAX_PAGES = 24;

async function initRulebook() {
    try {
        const regResp = await fetch('data/manual.json');
        const regData = await regResp.json();
        rulesData = [
            ...regData.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
            ...Object.entries(regData.rules).map(([key, val]) => ({ title: key, text: val }))
        ];
    } catch (e) { console.error("Initialisierungsfehler:", e); }
}

window.openRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'flex'; 
    switchTab('search'); // Standardmäßig beim Öffnen die Suche zeigen
};

window.closeRulebook = () => { 
    document.getElementById('rule-modal').style.display = 'none'; 
};

// Neue Funktion für Info-Buttons
window.jumpToPage = (pageNumber) => {
    document.getElementById('rule-modal').style.display = 'flex';
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
        renderRules('');
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
    
    try {
        const resp = await fetch(`data/manual/base_game/page_${formattedNum}.json`);
        const data = await resp.json();
        container.innerHTML = `<h3>${data.title}</h3><div class="reader-text">${data.content}</div>`;
        pageNumDisplay.innerText = pageNumber;
        currentPage = pageNumber;
    } catch (e) {
        container.innerHTML = `<p>Seite ${formattedNum} nicht gefunden.</p>`;
    }
}

window.nextPage = () => { if(currentPage < MAX_PAGES) loadPage(currentPage + 1); };
window.prevPage = () => { if(currentPage > 1) loadPage(currentPage - 1); };

window.filterRules = (term) => {
    const container = document.getElementById('rules-results');
    const filtered = rulesData.filter(r => r.title.toLowerCase().includes(term.toLowerCase()) || r.text.toLowerCase().includes(term.toLowerCase()));
    container.innerHTML = filtered.map(r => `<div class="rule-entry"><h4>${r.title}</h4><p>${r.text}</p></div>`).join('');
};

document.addEventListener('DOMContentLoaded', initRulebook);