import Utils from '../core/utils.js';
import RenderCommon from './common.js';

export const RenderSetup = {
    renderListInto(containerSelector, cards) {
        const list = Utils.qs(containerSelector);
        if (!list) return;

        list.innerHTML = RenderCommon.normalizeArray(cards)
            .map(card => RenderCommon.buildChecklistItem(card))
            .join('');

        RenderCommon.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = Utils.byId('special');
        if (!specialSection) return;

        const ul = specialSection.querySelector('ul');
        if (!ul) return;

        const safeCards = RenderCommon.normalizeArray(cards);

        ul.innerHTML = safeCards
            .map(card => RenderCommon.buildChecklistItem(card))
            .join('');

        specialSection.classList.toggle('hidden', safeCards.length === 0);
        RenderCommon.bindCardPreviews(ul);
    },

    renderDanger(adventure) {
        const dangerValue = Utils.byId('danger-value');
        if (!dangerValue) return;

        const danger = Number(adventure?.danger_calc ?? 0);
        dangerValue.innerHTML = danger > 0
            ? `<strong>Gefahrenstufe:</strong> ${Utils.escapeHtml(danger)}`
            : '';
    },

    normalizeSearchConfig(entry = {}, adventure = {}) {
        const search = entry?.search && typeof entry.search === 'object'
            ? entry.search
            : {};

        const label = Utils.normalizeString(entry?.label || entry?.name || entry?.id || '');

        return {
            preferArchiveSearch: Boolean(
                search?.mode === 'archive'
                || search?.preferArchiveSearch
            ),
            archiveQuery: Utils.normalizeString(search?.query || label),
            archiveSource: Utils.normalizeString(search?.sourceFilter || ''),
            archiveSet: Utils.normalizeString(
                search?.setKey
                || adventure?.set?.id
                || ''
            )
        };
    },

    splitCardsBySetup(adventure, allCards = []) {
        const cardsById = new Map(
            RenderCommon.normalizeArray(allCards)
                .map(card => [Utils.normalizeString(card?.id), card])
                .filter(([id]) => id)
        );

        const mapEntries = entries => RenderCommon.normalizeArray(entries).map(entry => {
            const entryObject = typeof entry === 'object' && entry !== null
                ? entry
                : { id: entry };

            const refId = Utils.normalizeString(entryObject?.id);
            const label = Utils.normalizeString(entryObject?.label);
            const searchConfig = this.normalizeSearchConfig(entryObject, adventure);

            if (!refId) {
                return {
                    id: '',
                    name: label || 'Unbekannter Eintrag',
                    label: label || 'Unbekannter Eintrag',
                    status: 'missing',
                    ...searchConfig
                };
            }

            const existing = cardsById.get(refId);
            if (existing) {
                return {
                    ...existing,
                    label: label || existing?.label || existing?.name || refId,
                    ...searchConfig
                };
            }

            return {
                id: refId,
                name: label || refId,
                label: label || refId,
                status: /^special_|^story_|^minions?_eurer_wahl$/i.test(refId)
                    ? 'placeholder'
                    : 'missing',
                ...searchConfig
            };
        });

        return {
            blueCards: mapEntries(adventure?.setup?.blue_cards),
            minionCards: mapEntries(adventure?.setup?.minion_cards),
            specialCards: mapEntries(adventure?.setup?.special_cards)
        };
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

        const { blueCards, minionCards, specialCards } = this.splitCardsBySetup(adventure, allCards);

        this.renderListInto('#blue-cards ul', blueCards);
        this.renderListInto('#minions ul', minionCards);
        this.renderSpecialSection(specialCards);
        this.renderDanger(adventure);
    }
};

export default RenderSetup;
