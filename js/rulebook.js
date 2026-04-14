window.Rulebook = {
    rulesData: [],
    currentPage: 1,

    validManualPages: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ],

    indexData: [
        { p: 1, title: 'Titelblatt' },
        { p: 2, title: 'Was ist Aventurien?' },
        { p: 4, title: 'Südosten & ferne Regionen' },
        { p: 5, title: 'Religionen, Kulturen & Gefahren' },
        { p: 6, title: 'Vorbereitung' },
        { p: 7, title: 'Spielmaterial' },
        { p: 9, title: 'Das Abenteuer' },
        { p: 10, title: 'Der Kampf (Setup)' },
        { p: 13, title: 'Kampfablauf' },
        { p: 15, title: 'Sieg & Atempause' },
        { p: 17, title: 'Silvanas Befreiung' },
        { p: 19, title: 'Leute, die nicht spielen' },
        { p: 20, title: 'Wildenstein Akt I' },
        { p: 21, title: 'Wildenstein Akt II' },
        { p: 23, title: 'Wildenstein Akt III' },
        { p: 24, title: 'Übersichten' }
    ],

    stripCitationMarkers(text) {
        return String(text ?? '').replace(/\s*\[cite:\s*[\d\- ,]+\]/gi, '').trim();
    },

    getModal() {
        return Utils.byId('rulebook-modal');
    },

    getReaderTab() {
        return Utils.byId('reader-tab');
    },

    getCodexTab() {
        return Utils.byId('codex-tab');
    },

    getManualContent() {
        return Utils.byId('manual-content');
    },

    getPageIndicator() {
        return Utils.byId('manual-page-indicator');
    },

    getManualPageList() {
        return Utils.byId('manual-page-list');
    },

    getCodexResults() {
        return Utils.byId('codex-results');
    },

    getCodexSearch() {
        return Utils.byId('codex-search');
    },

    open() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';
        this.showTab('reader');

        if (!this.getManualPageList()?.children.length) {
            this.init();
        }

        if (!this.currentPage || !this.validManualPages.includes(this.currentPage)) {
            this.currentPage = this.validManualPages[0];
        }

        this.loadPage(this.currentPage);
    },

    close() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'none';
    },

    showTab(tab) {
        const readerTab = this.getReaderTab();
        const codexTab = this.getCodexTab();

        if (readerTab) {
            readerTab.classList.toggle('hidden', tab !== 'reader');
        }

        if (codexTab) {
            codexTab.classList.toggle('hidden', tab !== 'codex');
        }

        const buttons = Utils.qsa('#rulebook-modal .tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        if (tab === 'reader' && buttons[0]) {
            buttons[0].classList.add('active');
        }

        if (tab === 'codex' && buttons[1]) {
            buttons[1].classList.add('active');
        }
    },

    getNextManualPage(current) {
        return this.validManualPages.find(page => page > current) ?? current;
    },

    getPrevManualPage(current) {
        const prev = [...this.validManualPages].reverse().find(page => page < current);
        return prev ?? current;
    },

    async loadPage(pageNumber) {
        const nr = Number(pageNumber);
        const container = this.getManualContent();
        const indicator = this.getPageIndicator();

        if (!container) return;

        if (!this.validManualPages.includes(nr)) {
            container.innerHTML = '<div class="reader-text">Diese Seite ist aktuell nicht verfügbar.</div>';
            if (indicator) {
                indicator.textContent = `Seite ? / ${this.validManualPages.length}`;
            }
            return;
        }

        container.innerHTML = '<div class="reader-text">Lade Schriftrolle...</div>';

        try {
            const res = await fetch(`data/manual/base_game/page_${String(nr).padStart(2, '0')}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            const title = Utils.escapeHtml(this.stripCitationMarkers(data?.title ?? `Seite ${nr}`));
            const content = Utils.escapeHtml(this.stripCitationMarkers(data?.content ?? '')).replace(/\n/g, '<br>');
            const image = String(data?.image ?? '').trim();

            container.innerHTML = `
                <div class="reader-text">
                    <h3>${title}</h3>
                    ${image ? `
                        <div class="img-wrapper">
                            <img
                                src="${Utils.escapeHtml(image)}"
                                alt="${title}"
                                class="manual-page-img"
                                loading="lazy"
                            >
                        </div>
                    ` : ''}
                    <div class="reader-text">${content}</div>
                </div>
            `;

            if (indicator) {
                indicator.textContent = `Seite ${nr} / ${this.validManualPages.length}`;
            }

            const titleEl = Utils.byId('manual-title');
            if (titleEl) {
                titleEl.textContent = this.stripCitationMarkers(data?.title ?? `Seite ${nr}`);
            }

            this.currentPage = nr;
        } catch (error) {
            console.error('Fehler beim Laden der Regelbuch-Seite:', error);
            container.innerHTML = '<div class="reader-text">Fehler beim Laden der Seite.</div>';
        }
    },

    nextPage() {
        this.loadPage(this.getNextManualPage(this.currentPage));
    },

    prevPage() {
        this.loadPage(this.getPrevManualPage(this.currentPage));
    },

    jumpToPage(pageNumber) {
        if (!this.validManualPages.includes(Number(pageNumber))) {
            console.warn(`Regelbuch-Seite ${pageNumber} ist aktuell nicht verfügbar.`);
            return;
        }

        this.showTab('reader');
        this.loadPage(Number(pageNumber));
    },

    filterRules(term = '') {
        const results = this.getCodexResults();
        if (!results) return;

        const normalized = String(term ?? '').trim().toLowerCase();

        if (!normalized) {
            results.innerHTML = '';
            return;
        }

        const filtered = this.rulesData.filter(rule => {
            const title = String(rule?.title ?? '').toLowerCase();
            const text = String(rule?.text ?? '').toLowerCase();
            return title.includes(normalized) || text.includes(normalized);
        });

        results.innerHTML = filtered.length
            ? filtered.map(rule => `
                <div class="rule-entry">
                    <h4>${Utils.escapeHtml(rule.title)}</h4>
                    <p>${Utils.escapeHtml(rule.text)}</p>
                </div>
            `).join('')
            : '<p>Kein Treffer im Kodex.</p>';
    },

    async buildRulesData() {
        const pages = [];

        for (const nr of this.validManualPages) {
            try {
                const res = await fetch(`data/manual/base_game/page_${String(nr).padStart(2, '0')}.json`);
                if (!res.ok) continue;

                const data = await res.json();
                pages.push({
                    page: nr,
                    title: this.stripCitationMarkers(data?.title ?? `Seite ${nr}`),
                    text: this.stripCitationMarkers(data?.content ?? '')
                });
            } catch (error) {
                console.warn(`Kodex-Seite ${nr} konnte nicht geladen werden.`, error);
            }
        }

        this.rulesData = pages;
    },

    async init() {
        const list = this.getManualPageList();
        if (list) {
            list.innerHTML = '';

            const fragment = document.createDocumentFragment();

            this.indexData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `S. ${item.p} – ${item.title}`;
                li.addEventListener('click', () => this.jumpToPage(item.p));
                fragment.appendChild(li);
            });

            list.appendChild(fragment);
        }

        await this.buildRulesData();

        const search = this.getCodexSearch();
        if (search && !search.dataset.bound) {
            search.addEventListener('input', event => {
                this.filterRules(event.target.value);
            });
            search.dataset.bound = 'true';
        }

        const modal = this.getModal();
        if (modal && !modal.dataset.bound) {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.close();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Rulebook?.init) {
        window.Rulebook.init();
    }
});
