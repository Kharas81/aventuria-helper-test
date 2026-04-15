window.Rulebook = {
    rulesData: [],
    rulesDataBuilt: false,
    isBuildingRulesData: false,
    currentPage: 1,
    currentSet: '',

    validManualPages: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ],

    indexDataBySet: {
        base_game: [
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
        ]
    },

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

    getManualSetLabel() {
        return Utils.byId('manual-set-label');
    },

    resolveSetKey(preferredSetKey = '') {
        const normalizedPreferred = Utils.normalizeString(preferredSetKey);
        if (normalizedPreferred && window.CONFIG?.hasSet?.(normalizedPreferred)) {
            return normalizedPreferred;
        }

        const activeSet = window.API?.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    getIndexDataForSet(setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);
        return this.indexDataBySet[resolvedSetKey]
            || this.indexDataBySet[window.CONFIG?.defaultSet || 'base_game']
            || [];
    },

    updateSetLabel() {
        const label = this.getManualSetLabel();
        if (!label) return;

        label.textContent = window.CONFIG?.getSetDisplayName?.(this.currentSet) || 'Regelbuch';
    },

    async ensureSet(setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);

        if (this.currentSet === resolvedSetKey) {
            this.updateSetLabel();
            return;
        }

        this.currentSet = resolvedSetKey;
        this.rulesData = [];
        this.rulesDataBuilt = false;
        this.isBuildingRulesData = false;
        this.updateSetLabel();

        const list = this.getManualPageList();
        if (list) {
            list.innerHTML = '';

            const fragment = document.createDocumentFragment();

            this.getIndexDataForSet(this.currentSet).forEach(item => {
                const li = document.createElement('li');
                li.textContent = `S. ${item.p} – ${item.title}`;
                li.addEventListener('click', () => this.jumpToPage(item.p));
                fragment.appendChild(li);
            });

            list.appendChild(fragment);
        }

        const codexResults = this.getCodexResults();
        if (codexResults) {
            codexResults.innerHTML = '';
        }

        const codexSearch = this.getCodexSearch();
        if (codexSearch) {
            codexSearch.value = '';
        }
    },

    async ensureRulesData() {
        if (this.rulesDataBuilt || this.isBuildingRulesData) {
            return;
        }

        this.isBuildingRulesData = true;

        try {
            await this.buildRulesData(this.currentSet);
            this.rulesDataBuilt = true;
        } finally {
            this.isBuildingRulesData = false;
        }
    },

    async open() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';

        await this.ensureSet();
        await this.showTab('reader');

        if (!this.currentPage || !this.validManualPages.includes(this.currentPage)) {
            this.currentPage = this.validManualPages[0];
        }

        await this.loadPage(this.currentPage);
    },

    close() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'none';
    },

    async showTab(tab) {
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
            await this.ensureRulesData();
        }
    },

    getNextManualPage(current) {
        return this.validManualPages.find(page => page > current)
            ?? this.validManualPages[this.validManualPages.length - 1];
    },

    getPrevManualPage(current) {
        return [...this.validManualPages].reverse().find(page => page < current)
            ?? this.validManualPages[0];
    },

    async loadPage(nr) {
        const container = this.getManualContent();
        const indicator = this.getPageIndicator();

        if (!container) return;

        if (!this.validManualPages.includes(Number(nr))) {
            container.innerHTML = '<div class="reader-text">Diese Seite ist aktuell nicht verfügbar.</div>';
            return;
        }

        container.innerHTML = '<div class="reader-text">Seite wird geladen ...</div>';

        try {
            const path = window.CONFIG?.getManualPagePath?.(nr, this.currentSet)
                || `data/manual/base_game/page_${String(nr).padStart(2, '0')}.json`;

            const res = await fetch(path);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} beim Laden von ${path}`);
            }

            const data = await res.json();

            const rawTitle = this.stripCitationMarkers(data?.title ?? `Seite ${nr}`);
            const content = Utils.escapeHtml(this.stripCitationMarkers(data?.content ?? ''))
                .replace(/\n/g, '<br>');
            const image = data?.image ? Utils.resolveImagePath(data.image) : '';

            container.innerHTML = `
                <div class="reader-container">
                    <div class="reader-page">
                        ${image ? `
                            <div class="img-wrapper">
                                <img
                                    src="${Utils.escapeHtml(image)}"
                                    alt="${Utils.escapeHtml(rawTitle)}"
                                    class="manual-page-img"
                                    loading="lazy"
                                >
                            </div>
                        ` : ''}
                        <div class="reader-text">${content}</div>
                    </div>
                </div>
            `;

            if (indicator) {
                indicator.textContent = `Seite ${nr} / ${this.validManualPages.length}`;
            }

            const titleEl = Utils.byId('manual-title');
            if (titleEl) {
                titleEl.textContent = rawTitle;
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

    async buildRulesData(setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);
        const pages = [];

        for (const nr of this.validManualPages) {
            try {
                const path = window.CONFIG?.getManualPagePath?.(nr, resolvedSetKey)
                    || `data/manual/base_game/page_${String(nr).padStart(2, '0')}.json`;

                const res = await fetch(path);
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
        await this.ensureSet();

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
    window.Rulebook?.init?.();
});
