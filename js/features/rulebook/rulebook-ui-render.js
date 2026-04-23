import Utils from '../../core/utils.js';
import CONFIG from '../../core/config.js';
import RulebookUIDom from './rulebook-ui-dom.js';

export const RulebookUIRender = {
    updateSetLabel(setKey = '') {
        const label = RulebookUIDom.getManualSetLabel();
        if (!label) {
            return;
        }

        label.textContent = CONFIG.getSetDisplayName?.(setKey) || 'Regelbuch';
    },

    updateModalTitle(setKey = '') {
        const title = RulebookUIDom.getManualTitle();
        if (!title) {
            return;
        }

        const setLabel = CONFIG.getSetDisplayName?.(setKey) || 'Regelbuch';
        title.textContent = `Regelbuch – ${setLabel}`;
    },

    highlightActivePage(pageNumber = 0) {
        const list = RulebookUIDom.getManualPageList();
        if (!list) {
            return;
        }

        const items = list.querySelectorAll('li[data-page]');
        items.forEach(item => {
            item.classList.toggle('active', Number(item.dataset.page) === Number(pageNumber));
        });
    },

    renderPageList(indexData, onJump) {
        const list = RulebookUIDom.getManualPageList();
        if (!list) {
            return;
        }

        list.innerHTML = '';

        const pages = Utils.normalizeArray(indexData?.pages);
        const fragment = document.createDocumentFragment();

        pages.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `S. ${entry.page} – ${entry.title}`;
            li.dataset.page = String(entry.page);
            li.addEventListener('click', () => onJump?.(entry.page));
            fragment.appendChild(li);
        });

        list.appendChild(fragment);
    },

    clearCodexResults() {
        const results = RulebookUIDom.getCodexResults();
        if (results) {
            results.innerHTML = '';
        }
    },

    resetCodexSearch() {
        const search = RulebookUIDom.getCodexSearch();
        if (search) {
            search.value = '';
        }
    }
};

export default RulebookUIRender;
