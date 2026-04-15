import Utils from '../../core/utils.js';

export const RulebookUI = {
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

    getManualTitle() {
        return Utils.byId('manual-title');
    },

    updateSetLabel(setKey = '') {
        const label = this.getManualSetLabel();
        if (!label) {
            return;
        }

        label.textContent = window.CONFIG?.getSetDisplayName?.(setKey) || 'Regelbuch';
    },

    renderPageList(indexData, onJump) {
        const list = this.getManualPageList();
        if (!list) {
            return;
        }

        list.innerHTML = '';

        const pages = Utils.normalizeArray(indexData?.pages);
        const fragment = document.createDocumentFragment();

        pages.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `S. ${entry.page} – ${entry.title}`;
            li.addEventListener('click', () => onJump?.(entry.page));
            fragment.appendChild(li);
        });

        list.appendChild(fragment);
    },

    clearCodexResults() {
        const results = this.getCodexResults();
        if (results) {
            results.innerHTML = '';
        }
    },

    resetCodexSearch() {
        const search = this.getCodexSearch();
        if (search) {
            search.value = '';
        }
    },

    showModal() {
        const modal = this.getModal();
        if (modal) {
            modal.style.display = 'flex';
        }
    },

    closeModal() {
        const modal = this.getModal();
        if (modal) {
            modal.style.display = 'none';
        }
    },

    async showTab(tabName, rulebook) {
        const readerTab = this.getReaderTab();
        const codexTab = this.getCodexTab();

        if (readerTab) {
            readerTab.classList.toggle('hidden', tabName !== 'reader');
        }

        if (codexTab) {
            codexTab.classList.toggle('hidden', tabName !== 'codex');
        }

        const buttons = Utils.qsa('#rulebook-modal .tab-btn');
        buttons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });

        if (tabName === 'codex') {
            await rulebook.ensureRulesData();
        }
    },

    bind(rulebook) {
        const search = this.getCodexSearch();
        if (search && search.dataset.bound !== 'true') {
            search.addEventListener('input', event => {
                rulebook.filterRules(event.target.value);
            });
            search.dataset.bound = 'true';
        }

        const modal = this.getModal();
        if (modal && modal.dataset.bound !== 'true') {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.closeModal();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

export default RulebookUI;
