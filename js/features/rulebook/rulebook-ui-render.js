import Utils from '../../core/utils.js';
import RulebookUIDom from './rulebook-ui-dom.js';

export const RulebookUIRender = {
    updateSetLabel(setKey = '') {
        const label = RulebookUIDom.getManualSetLabel();
        if (!label) {
            return;
        }

        label.textContent = window.CONFIG?.getSetDisplayName?.(setKey) || 'Regelbuch';
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
