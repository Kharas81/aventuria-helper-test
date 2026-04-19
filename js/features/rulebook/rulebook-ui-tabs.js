import Utils from '../../core/utils.js';
import RulebookUIDom from './rulebook-ui-dom.js';
import RulebookModal from '../../templates/rulebook-modal.js';

export const RulebookUITabs = {
    showModal() {
        RulebookModal.open();
    },

    closeModal() {
        RulebookModal.close();
    },

    async showTab(tabName, rulebook) {
        const readerTab = RulebookUIDom.getReaderTab();
        const codexTab = RulebookUIDom.getCodexTab();

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
    }
};

export default RulebookUITabs;
