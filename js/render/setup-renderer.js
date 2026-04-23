import Utils from '../core/utils.js';
import SetupCardMapper from './setup-card-mapper.js';
import SetupHeaderRenderer from './setup/setup-header-renderer.js';
import SetupGroupRenderer from './setup/setup-group-renderer.js';

export const SetupRenderer = {
    getSetupDisplay() {
        return Utils.byId('setup-display');
    },

    getOrCreateGroupsContainer() {
        const setupDisplay = this.getSetupDisplay();
        if (!setupDisplay) {
            return null;
        }

        let groupsContainer = setupDisplay.querySelector('.adventure-setup__groups');

        if (!groupsContainer) {
            groupsContainer = document.createElement('div');
            groupsContainer.className = 'adventure-setup__groups';
            setupDisplay.appendChild(groupsContainer);
        }

        return groupsContainer;
    },

    getOrCreateGroupSection(groupId = '') {
        const groupsContainer = this.getOrCreateGroupsContainer();
        if (!groupsContainer) {
            return null;
        }

        let group = Utils.byId(groupId);

        if (!group) {
            group = document.createElement('div');
            group.id = groupId;
            groupsContainer.appendChild(group);
        } else if (group.parentElement !== groupsContainer) {
            groupsContainer.appendChild(group);
        }

        return group;
    },

    renderDanger() {
        // Bewusst leer:
        // Die Gefahrenstufe wird jetzt vom Header-Renderer visuell übernommen.
    },

    renderListInto(containerSelector, cards, groupKey = '') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        SetupGroupRenderer.renderGroup(container, groupKey, cards);
    },

    renderSpecialSection(cards) {
        const specialSection = this.getOrCreateGroupSection('special');
        if (!specialSection) return;

        SetupGroupRenderer.renderGroup(specialSection, 'special', cards);
        specialSection.classList.toggle('hidden', !Utils.normalizeArray(cards).length);
    },

    renderSetup(adventure, allCards = []) {
        const setupDisplay = this.getSetupDisplay();
        if (!setupDisplay) {
            return;
        }

        setupDisplay.classList.remove('hidden');

        SetupHeaderRenderer.render(setupDisplay, adventure);

        const { blueCards, minionCards, specialCards } = SetupCardMapper.splitCardsBySetup(
            adventure,
            allCards
        );

        const blueSection = this.getOrCreateGroupSection('blue-cards');
        const minionSection = this.getOrCreateGroupSection('minions');

        this.renderListInto('#blue-cards', blueCards, 'blue');
        this.renderListInto('#minions', minionCards, 'minions');
        this.renderSpecialSection(specialCards);

        if (blueSection) {
            blueSection.classList.remove('hidden');
        }

        if (minionSection) {
            minionSection.classList.remove('hidden');
        }
    }
};

export default SetupRenderer;
