window.Constants = {
    statuses: {
        adventures: [
            'canonical',
            'deprecated_alias',
            'migrated',
            'raw',
            'basic',
            'playable',
            'verified'
        ],

        cards: [
            'raw',
            'basic',
            'playable',
            'playable_placeholder',
            'verified',
            'migrated',
            'canonical',
            'deprecated_alias',
            'complete'
        ]
    },

    placeholders: {
        cardRefPatterns: [
            /^minions?_eurer_wahl$/i,
            /^schergen?_eurer_wahl$/i,
            /^special_/i,
            /^story_/i
        ]
    },

    ui: {
        defaultStatusText: 'Bereit.',
        sectionStateMap: {
            'combat-tools-section': 'combatToolsOpen',
            'intermission-section': 'intermissionOpen'
        }
    },

    events: {
        validationStarted: 'validation:started',
        validationFinished: 'validation:finished',
        diagnosticsRequested: 'diagnostics:requested',
        archiveSetChanged: 'archive:setChanged',
        rulebookIndexLoaded: 'rulebook:indexLoaded'
    },

    isAllowedAdventureStatus(status = '') {
        return this.statuses.adventures.includes(String(status ?? '').trim());
    },

    isAllowedCardStatus(status = '') {
        return this.statuses.cards.includes(String(status ?? '').trim());
    }
};
