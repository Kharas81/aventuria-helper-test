import RulebookUIDom from './rulebook-ui-dom.js';
import RulebookUITabs from './rulebook-ui-tabs.js';

export const RulebookUIBindings = {
    bind(rulebook) {
        const search = RulebookUIDom.getCodexSearch();
        if (search && search.dataset.bound !== 'true') {
            search.addEventListener('input', event => {
                rulebook.filterRules(event.target.value);
            });
            search.dataset.bound = 'true';
        }

        const modal = RulebookUIDom.getModal();
        if (modal && modal.dataset.bound !== 'true') {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    RulebookUITabs.closeModal();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

export default RulebookUIBindings;
