import Utils from '../core/utils.js';
import ChecklistItemTemplate from './checklist-item-template.js';
import CardPreviewBinder from './card-preview-binder.js';
import SetupCardMapper from './setup-card-mapper.js';

export const SetupRenderer = {
    renderListInto(containerSelector, cards) {
        const list = Utils.qs(containerSelector);
        if (!list) return;

        list.innerHTML = Utils.normalizeArray(cards)
            .map(card => ChecklistItemTemplate.buildChecklistItem(card))
            .join('');

        CardPreviewBinder.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = Utils.byId('special');
        if (!specialSection) return;

        const ul = specialSection.querySelector('ul');
        if (!ul) return;

        const safeCards = Utils.normalizeArray(cards);

        ul.innerHTML = safeCards
            .map(card => ChecklistItemTemplate.buildChecklistItem(card))
            .join('');

        specialSection.classList.toggle('hidden', safeCards.length === 0);
        CardPreviewBinder.bindCardPreviews(ul);
    },

    renderDanger(adventure) {
        const dangerValue = Utils.byId('danger-value');
        if (!dangerValue) return;

        const danger = Number(adventure?.danger_calc ?? 0);
        dangerValue.innerHTML = danger > 0
            ? `<strong>Gefahrenstufe:</strong> ${Utils.escapeHtml(danger)}`
            : '';
    },

    renderSetup(adventure, allCards = []) {
        const title = Utils.byId('title');
        const setupDisplay = Utils.byId('setup-display');

        if (title) {
            title.textContent = Utils.normalizeString(adventure?.name || 'Abenteuer');
        }

        if (setupDisplay) {
            setupDisplay.classList.remove('hidden');
        }

        const { blueCards, minionCards, specialCards } = SetupCardMapper.splitCardsBySetup(
            adventure,
            allCards
        );

        this.renderListInto('#blue-cards ul', blueCards);
        this.renderListInto('#minions ul', minionCards);
        this.renderSpecialSection(specialCards);
        this.renderDanger(adventure);
    }
};

export default SetupRenderer;
