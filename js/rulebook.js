/**
 * rulebook.js - Suche und Blätterfunktion für die Regeln
 */
let rulesData = [];
let manualPages = [];
let currentPage = 0;

async function initRulebook() {
    try {
        const [regResp, pagResp] = await Promise.all([
            fetch('data/manual.json'),
            fetch('data/manual_pages.json')
        ]);
        
        const regData = await regResp.json();
        manualPages = await pagResp.json();

        rulesData = [
            ...regData.phases.map(p => ({ title: `Phase ${p.id}: ${p.name}`, text: p.desc })),
            ...Object.entries(regData.rules).map(([key, val]) => ({ title: key, text: val }))
        ];
    } catch (e) { console.error("Regel-Ladefehler:", e); }
}

window.openRulebook = () => { document.getElementById('rule-modal').style.display = 'flex'; renderRules(''); };
window.closeRulebook = () => { document.getElementById('rule-modal').style.display = 'none'; };

window.switchTab = (tab) => {
    document.getElementById('tab-search').classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader').classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search').classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader').classList.toggle('active', tab === 'reader');
    if(tab === 'reader') displayPage();
};

function displayPage() {
    const page = manualPages[currentPage];
    if(!page) return;
    document.getElementById('page-content').innerHTML = `<h3>${page.title}</h3><div class="reader-text">${page.content}</div>`;
    document.getElementById('currentPageNum').innerText = currentPage + 1;
}

window.nextPage = () => { if(currentPage < manualPages.length - 1) { currentPage++; displayPage(); } };
window.prevPage = () => { if(currentPage > 0) { currentPage--; displayPage(); } };

window.filterRules = (term) => {
    const container = document.getElementById('rules-results');
    const filtered = rulesData.filter(r => r.title.toLowerCase().includes(term.toLowerCase()) || r.text.toLowerCase().includes(term.toLowerCase()));
    container.innerHTML = filtered.map(r => `<div class="rule-entry"><h4>${r.title}</h4><p>${r.text}</p></div>`).join('');
};

document.addEventListener('DOMContentLoaded', initRulebook);