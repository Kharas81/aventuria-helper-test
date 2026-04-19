import SetupCardMapper from './setup-card-mapper.js';
import SetupRenderer from './setup-renderer.js';

export const RenderSetup = {
    renderListInto(containerSelector, cards) {
        return SetupRenderer.renderListInto(containerSelector, cards);
    },

    renderSpecialSection(cards) {
        return SetupRenderer.renderSpecialSection(cards);
    },

    renderDanger(adventure) {
        return SetupRenderer.renderDanger(adventure);
    },

    normalizeSearchConfig(entry = {}, adventure = {}) {
        return SetupCardMapper.normalizeSearchConfig(entry, adventure);
    },

    splitCardsBySetup(adventure, allCards = []) {
        return SetupCardMapper.splitCardsBySetup(adventure, allCards);
    },

    renderSetup(adventure, allCards = []) {
        return SetupRenderer.renderSetup(adventure, allCards);
    }
};

export default RenderSetup;
