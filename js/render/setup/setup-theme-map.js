export const SetupThemeMap = {
    getGroupTheme(groupKey = '') {
        const themes = {
            blue: {
                key: 'blue',
                modifierClass: 'setup-group--blue',
                eyebrow: 'Vorbereitung',
                title: 'Blaue Karten',
                description: 'Wichtige Vorbereitungs- und Abenteuerelemente für den Start.',
                icon: '✦'
            },
            minions: {
                key: 'minions',
                modifierClass: 'setup-group--minions',
                eyebrow: 'Begegnungen',
                title: 'Schergen',
                description: 'Gegner, die im Verlauf des Abenteuers vorbereitet werden.',
                icon: '⚔'
            },
            special: {
                key: 'special',
                modifierClass: 'setup-group--special',
                eyebrow: 'Besonderes',
                title: 'Spezial',
                description: 'Sondereffekte, Zusatzkarten und besondere Hinweise.',
                icon: '✧'
            }
        };

        return themes[groupKey] || themes.blue;
    }
};

export default SetupThemeMap;
