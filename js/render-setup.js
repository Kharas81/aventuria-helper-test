window.RenderSetup = {
    renderListInto(containerSelector, cards) {
        const list = Utils.qs(containerSelector);
        if (!list) return;

        list.innerHTML = window.RenderCommon.normalizeArray(cards)
            .map(card => window.RenderCommon.buildChecklistItem(card))
            .join('');

        window.RenderCommon.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = Utils.byId('special');
        if (!specialSection) return;

        const ul = specialSection.querySelector('ul');
        if (!ul) return;

        ul.innerHTML = window.RenderCommon.normalizeArray(cards)
            .map(card => window.RenderCommon.buildChecklistItem(card))
            .join('');

        specialSection.classList.toggle('hidden', cards.length === 0);
        window.RenderCommon.bindCardPreviews(ul);
    },

    renderDanger(adventure) {
        const dangerValue = Utils.byId('danger-value');
        if (!dangerValue) return;

        const danger = Number(adventure?.danger_calc ?? 0);
        dangerValue.innerHTML = danger > 0
            ? `<strong>Gefahrenstufe:</strong> ${Utils.escapeHtml(danger)}`
            : '';
    },

    renderTitle(adventure) {
        const title = Utils.byId('title');
        if (!title) return;

        title.innerText = Utils.normalizeString(adventure?.name);
    },

    renderSetup(adventure, allCards) {
        const setupDisplay = Utils.byId('setup-display');
        if (!setupDisplay) return;

        const setup = adventure?.setup ?? {};

        const blueCards = window.RenderCommon.normalizeSetupEntries(setup.blue_cards, allCards);
        const minionCards = window.RenderCommon.normalizeSetupEntries(setup.minion_cards, allCards);
        const specialCards = window.RenderCommon.normalizeSetupEntries(setup.special_cards, allCards);

        this.renderTitle(adventure);
        this.renderDanger(adventure);
        this.renderListInto('#blue-cards ul', blueCards);
        this.renderListInto('#minions ul', minionCards);
        this.renderSpecialSection(specialCards);

        setupDisplay.classList.remove('hidden');
    }
};
