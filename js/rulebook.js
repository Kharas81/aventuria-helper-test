/**
 * js/rulebook.js - Steuerung für das Regelbuch und den Index
 */
window.rulesData = [];
window.currentPage = 1;

// Seiten 4 und 5 sind jetzt wieder regulär vorhanden
window.validManualPages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

const indexData = [
    { p: 1, title: "Titelblatt" },
    { p: 2, title: "Was ist Aventurien?" },
    { p: 4, title: "Südosten & ferne Regionen" },
    { p: 5, title: "Religionen, Kulturen & Gefahren" },
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
    const modal = document.getElementById('rule-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    window.switchTab('search');
};

window.closeRulebook = () => {
    const modal = document.getElementById('rule-modal');
    if (!modal) return;
    modal.style.display = 'none';
};

window.jumpToPage = (nr) => {
    if (!window.validManualPages.includes(nr)) {
        console.warn(`Regelbuch-Seite ${nr} ist aktuell nicht verfügbar.`);
        return;
    }

    window.switchTab('reader');
    window.loadPage(nr);
};

window.switchTab = (tab) => {
    document.getElementById('tab-search')?.classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader')?.classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search')?.classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader')?.classList.toggle('active', tab === 'reader');

    if (tab === 'reader') {
        window.loadPage(window.currentPage);
    }
};

window.getNextManualPage = (current) => {
    return window.validManualPages.find(page => page > current) ?? current;
};

window.getPrevManualPage = (current) => {
    const prev = [...window.validManualPages].reverse().find(page => page < current);
    return prev ?? current;
};

window.loadPage = async (nr) => {
    const container = document.getElementById('page-content');
    if (!container) return;

    if (!window.validManualPages.includes(nr)) {
        container.innerHTML = 'Diese Seite ist aktuell nicht verfügbar.';
        return;
    }

    container.innerHTML = 'Lade Schriftrolle...';

    try {
        const res = await fetch(`data/manual/base_game/page_${nr.toString().padStart(2, '0')}.json`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        container.innerHTML = `
            <h4>${data.title}</h4>
            ${data.image ? `<img src="${data.image}" style="width:100%; border:1px solid #8b4513;">` : ''}
            <div class="reader-text" style="margin-top:15px;">${data.content}</div>
        `;

        document.getElementById('currentPageNum').innerText = nr;
        window.currentPage = nr;
    } catch (error) {
        console.error('Fehler beim Laden der Regelbuch-Seite:', error);
        container.innerHTML = 'Fehler beim Laden der Seite.';
    }
};

window.nextPage = () => {
    window.loadPage(window.getNextManualPage(window.currentPage));
};

window.prevPage = () => {
    window.loadPage(window.getPrevManualPage(window.currentPage));
};

window.filterRules = (term) => {
    const results = document.getElementById('rules-results');
    if (!results) return;

    if (!term) {
        results.innerHTML = '';
        return;
    }

    const normalized = term.toLowerCase();

    const filtered = window.rulesData.filter(rule =>
        rule.title.toLowerCase().includes(normalized) ||
        rule.text.toLowerCase().includes(normalized)
    );

    results.innerHTML = filtered.map(rule => `
        <div class="rule-entry">
            <h4>${rule.title}</h4>
            <p>${rule.text}</p>
        </div>
    `).join('') || 'Kein Treffer im Kodex.';
};

function initRulebook() {
    const list = document.getElementById('manual-index');
    if (!list) return;

    list.innerHTML = '';

    const fragment = document.createDocumentFragment();

    indexData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `S. ${item.p}: ${item.title}`;
        li.addEventListener('click', () => window.jumpToPage(item.p));
        fragment.appendChild(li);
    });

    list.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', async () => {
    initRulebook();

    try {
        const res = await fetch('data/manual.json');
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        window.rulesData = [
            ...data.phases.map(phase => ({ title: phase.name, text: phase.desc })),
            ...Object.entries(data.rules).map(([key, value]) => ({ title: key, text: value }))
        ];
    } catch (error) {
        console.warn('Kodex-Daten fehlen.', error);
    }
});
