/**
 * js/rulebook.js - Steuerung für das Regelbuch und den Index
 */
window.rulesData = [];
window.currentPage = 1;

// Seiten 4 und 5 sind aktuell fehlerhaft/doppelt und werden vorerst übersprungen
window.validManualPages = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

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
    if (!window.validManualPages.includes(nr)) {
        console.warn(`Regelbuch-Seite ${nr} ist aktuell deaktiviert.`);
        return;
    }

    window.switchTab('reader');
    window.loadPage(nr);
};

window.switchTab = (tab) => {
    document.getElementById('tab-search').classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader').classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search').classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader').classList.toggle('active', tab === 'reader');

    if (tab === 'reader') {
        window.loadPage(window.currentPage);
    }
};

window.getNextManualPage = (current) => {
    return window.validManualPages.find(p => p > current) ?? current;
};

window.getPrevManualPage = (current) => {
    const prev = [...window.validManualPages].reverse().find(p => p < current);
    return prev ?? current;
};

window.loadPage = async (nr) => {
    const cont = document.getElementById('page-content');
    if (!cont) return;

    if (!window.validManualPages.includes(nr)) {
        cont.innerHTML = "Diese Seite ist aktuell nicht verfügbar.";
        return;
    }

    cont.innerHTML = "Lade Schriftrolle...";

    try {
        const res = await fetch(`data/manual/base_game/page_${nr.toString().padStart(2, '0')}.json`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        cont.innerHTML = `
            <h4>${data.title}</h4>
            ${data.image ? `<img src="${data.image}" style="width:100%; border:1px solid #8b4513;">` : ''}
            <div class="reader-text" style="margin-top:15px;">${data.content}</div>
        `;

        document.getElementById('currentPageNum').innerText = nr;
        window.currentPage = nr;
    } catch (e) {
        console.error("Fehler beim Laden der Regelbuch-Seite:", e);
        cont.innerHTML = "Fehler beim Laden der Seite.";
    }
};

window.nextPage = () => {
    window.loadPage(window.getNextManualPage(window.currentPage));
};

window.prevPage = () => {
    window.loadPage(window.getPrevManualPage(window.currentPage));
};

window.filterRules = (term) => {
    const res = document.getElementById('rules-results');
    if (!res) return;

    if (!term) {
        res.innerHTML = "";
        return;
    }

    const filtered = window.rulesData.filter(r =>
        r.title.toLowerCase().includes(term.toLowerCase()) ||
        r.text.toLowerCase().includes(term.toLowerCase())
    );

    res.innerHTML = filtered.map(r => `
        <div class="rule-entry">
            <h4>${r.title}</h4>
            <p>${r.text}</p>
        </div>
    `).join('') || "Kein Treffer im Kodex.";
};

// Initialisierung
function initRulebook() {
    const list = document.getElementById('manual-index');
    if (!list) return;

    list.innerHTML = indexData.map(item =>
        `<li onclick="window.jumpToPage(${item.p})">S. ${item.p}: ${item.title}</li>`
    ).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    initRulebook();

    try {
        const r = await fetch('data/manual.json');
        const d = await r.json();

        window.rulesData = [
            ...d.phases.map(p => ({ title: p.name, text: p.desc })),
            ...Object.entries(d.rules).map(([k, v]) => ({ title: k, text: v }))
        ];
    } catch (e) {
        console.warn("Kodex-Daten fehlen.");
    }
});
