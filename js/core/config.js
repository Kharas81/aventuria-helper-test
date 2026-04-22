export const CONFIG = {
    defaultSet: 'base_game',

    paths: {
        dataRoot: 'data',
        adventuresRoot: 'data/adventures',
        cardsRoot: 'data/cards',
        manualRoot: 'data/manual',
        runtimeRoot: 'data/runtime'
    },

    cards: {
        legacyAdventureCards: {
            mode: 'allow', // allow | off
            warnOnFallback: true
        }
    },

    catalogs: {
        schergen: {
            key: 'schergen',
            enabled: true,
            dataDir: 'data/cards/catalog/schergen',
            imageDir: 'assets/images/cards/schergen',
            indexFile: 'data/cards/catalog/schergen/index.json',
            runtimeBundle: 'data/runtime/catalogs/schergen.cards.json',
            defaultType: 'minion',
            defaultCardCategory: 'schergenkarte'
        }
    },

    archive: {
        supplementalCatalogsBySet: {
            base_game: ['schergen'],
            mythische_geschichten: ['schergen'],
            rueckkehr_zum_schwarzen_keiler: ['schergen'],
            schiff_der_verlorenen_seelen: ['schergen'],
            wald_ohne_wiederkehr: ['schergen'],
            wirthaus_zum_schwarzen_keiler: ['schergen']
        },

        mergePriority: {
            adventure_specific: 300,
            set_catalog: 200,
            central_catalog: 100,
            unknown: 0
        }
    },

    sets: {
        base_game: {
            id: 'base_game',
            name: 'Aventuria Grundbox',
            shortName: 'Grundbox',
            enabled: true,
            archiveEnabled: true,
            adventurePath: 'data/adventures/base_game',
            adventureIndex: 'data/adventures/base_game/index.json',
            cardRoot: 'data/cards/base_game',
            catalogRoot: 'data/cards/base_game/catalog',
            manualRoot: 'data/manual/base_game',
            masterIndex: 'data/cards/base_game/master_base_game.json',

            theme: {
                cssVars: {
                    '--color-primary': '#5c1e1e',
                    '--color-primary-hover': '#7a2828',
                    '--color-secondary': '#8b4513',
                    '--color-secondary-soft': '#a0522d',
                    '--color-bg-body': '#dcd0ba',
                    '--color-bg-panel': '#f4e7d3',
                    '--color-bg-panel-alt': '#e6dec9',
                    '--color-text': '#2e241f',
                    '--color-info': '#2c5282',
                    '--color-success': '#276749',
                    '--color-danger': '#9b2c2c'
                },
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Klassisch Aventurisch'
                }
            }
        },

        mythische_geschichten: {
            id: 'mythische_geschichten',
            name: 'Mythische Geschichten',
            shortName: 'Mythische Geschichten',
            enabled: false,
            archiveEnabled: true,
            adventurePath: 'data/adventures/mythische_geschichten',
            adventureIndex: 'data/adventures/mythische_geschichten/index.json',
            cardRoot: 'data/cards/mythische_geschichten',
            catalogRoot: 'data/cards/mythische_geschichten/catalog',
            manualRoot: 'data/manual/mythische_geschichten',
            masterIndex: 'data/cards/mythische_geschichten/master_mythische_geschichten.json',
            theme: {
                cssVars: {},
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Mythische Geschichten'
                }
            }
        },

        rueckkehr_zum_schwarzen_keiler: {
            id: 'rueckkehr_zum_schwarzen_keiler',
            name: 'Rückkehr zum Schwarzen Keiler',
            shortName: 'Rückkehr zum Schwarzen Keiler',
            enabled: false,
            archiveEnabled: true,
            adventurePath: 'data/adventures/rueckkehr_zum_schwarzen_keiler',
            adventureIndex: 'data/adventures/rueckkehr_zum_schwarzen_keiler/index.json',
            cardRoot: 'data/cards/rueckkehr_zum_schwarzen_keiler',
            catalogRoot: 'data/cards/rueckkehr_zum_schwarzen_keiler/catalog',
            manualRoot: 'data/manual/rueckkehr_zum_schwarzen_keiler',
            masterIndex: 'data/cards/rueckkehr_zum_schwarzen_keiler/master_rueckkehr_zum_schwarzen_keiler.json',
            theme: {
                cssVars: {},
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Rückkehr zum Schwarzen Keiler'
                }
            }
        },

        schiff_der_verlorenen_seelen: {
            id: 'schiff_der_verlorenen_seelen',
            name: 'Schiff der verlorenen Seelen',
            shortName: 'Schiff der verlorenen Seelen',
            enabled: false,
            archiveEnabled: true,
            adventurePath: 'data/adventures/schiff_der_verlorenen_seelen',
            adventureIndex: 'data/adventures/schiff_der_verlorenen_seelen/index.json',
            cardRoot: 'data/cards/schiff_der_verlorenen_seelen',
            catalogRoot: 'data/cards/schiff_der_verlorenen_seelen/catalog',
            manualRoot: 'data/manual/schiff_der_verlorenen_seelen',
            masterIndex: 'data/cards/schiff_der_verlorenen_seelen/master_schiff_der_verlorenen_seelen.json',
            theme: {
                cssVars: {},
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Schiff der verlorenen Seelen'
                }
            }
        },

        wald_ohne_wiederkehr: {
            id: 'wald_ohne_wiederkehr',
            name: 'Wald ohne Wiederkehr',
            shortName: 'Wald ohne Wiederkehr',
            enabled: false,
            archiveEnabled: true,
            adventurePath: 'data/adventures/wald_ohne_wiederkehr',
            adventureIndex: 'data/adventures/wald_ohne_wiederkehr/index.json',
            cardRoot: 'data/cards/wald_ohne_wiederkehr',
            catalogRoot: 'data/cards/wald_ohne_wiederkehr/catalog',
            manualRoot: 'data/manual/wald_ohne_wiederkehr',
            masterIndex: 'data/cards/wald_ohne_wiederkehr/master_wald_ohne_wiederkehr.json',
            theme: {
                cssVars: {},
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Wald ohne Wiederkehr'
                }
            }
        },

        wirthaus_zum_schwarzen_keiler: {
            id: 'wirthaus_zum_schwarzen_keiler',
            name: 'Wirtshaus zum Schwarzen Keiler',
            shortName: 'Wirtshaus zum Schwarzen Keiler',
            enabled: false,
            archiveEnabled: true,
            adventurePath: 'data/adventures/wirthaus_zum_schwarzen_keiler',
            adventureIndex: 'data/adventures/wirthaus_zum_schwarzen_keiler/index.json',
            cardRoot: 'data/cards/wirthaus_zum_schwarzen_keiler',
            catalogRoot: 'data/cards/wirthaus_zum_schwarzen_keiler/catalog',
            manualRoot: 'data/manual/wirthaus_zum_schwarzen_keiler',
            masterIndex: 'data/cards/wirthaus_zum_schwarzen_keiler/master_wirthaus_zum_schwarzen_keiler.json',
            theme: {
                cssVars: {},
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Wirtshaus zum Schwarzen Keiler'
                }
            }
        }
    },

    normalizeSetKey(setKey = '') {
        const normalized = String(setKey || '').trim();
        return normalized || this.defaultSet;
    },

    getSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return this.sets[normalizedKey] || this.sets[this.defaultSet];
    },

    getEnabledSets() {
        return Object.values(this.sets)
            .filter(setConfig => setConfig?.enabled !== false)
            .map(setConfig => ({
                id: String(setConfig.id ?? '').trim(),
                name: String(setConfig.name ?? setConfig.id ?? '').trim(),
                shortName: String(setConfig.shortName ?? setConfig.name ?? setConfig.id ?? '').trim()
            }))
            .filter(setConfig => setConfig.id);
    },

    getArchiveSets() {
        return Object.values(this.sets)
            .filter(setConfig => setConfig?.archiveEnabled !== false)
            .map(setConfig => ({
                id: String(setConfig.id ?? '').trim(),
                name: String(setConfig.name ?? setConfig.id ?? '').trim(),
                shortName: String(setConfig.shortName ?? setConfig.name ?? setConfig.id ?? '').trim()
            }))
            .filter(setConfig => setConfig.id);
    },

    hasSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return Boolean(this.sets[normalizedKey]);
    },

    getAdventurePath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.adventurePath}/${id}.json`;
    },

    getAdventureIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.adventureIndex;
    },

    getLegacyAdventureCardsPath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.cardRoot}/${id}/${id}.json`;
    },

    getLegacyAdventureCardsMode() {
        const mode = String(this.cards?.legacyAdventureCards?.mode || 'allow').trim().toLowerCase();
        return mode === 'off' ? 'off' : 'allow';
    },

    isLegacyAdventureCardsEnabled() {
        return this.getLegacyAdventureCardsMode() !== 'off';
    },

    shouldWarnOnLegacyAdventureCardsFallback() {
        return Boolean(this.cards?.legacyAdventureCards?.warnOnFallback);
    },

    getMasterIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.masterIndex;
    },

    getCatalogRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.catalogRoot;
    },

    getManualRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.manualRoot;
    },

    getManualIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return `${setConfig.manualRoot}/index.json`;
    },

    getManualPagePath(pageNumber, setKey = '') {
        const setConfig = this.getSet(setKey);
        const page = String(pageNumber).padStart(2, '0');
        return `${setConfig.manualRoot}/page_${page}.json`;
    },

    getSetDisplayName(setKey = '') {
        return this.getSet(setKey)?.name || this.getSet(this.defaultSet)?.name || 'Aventuria';
    },

    getSetShortName(setKey = '') {
        return this.getSet(setKey)?.shortName || this.getSet(setKey)?.name || 'Set';
    },

    getSetTheme(setKey = '') {
        return this.getSet(setKey)?.theme || { cssVars: {}, meta: {} };
    },

    getCatalogConfig(catalogKey = '') {
        const normalizedKey = String(catalogKey || '').trim();
        if (!normalizedKey) {
            return null;
        }

        return this.catalogs?.[normalizedKey] || null;
    },

    getCatalogIndexPath(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.indexFile || '';
    },

    getCatalogDataDir(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.dataDir || '';
    },

    getCatalogImageDir(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.imageDir || '';
    },

    getRuntimeCatalogCardsPath(catalogKey = '') {
        return this.getCatalogConfig(catalogKey)?.runtimeBundle || '';
    },

    getSupplementalCatalogKeysForSet(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        return Array.isArray(this.archive?.supplementalCatalogsBySet?.[resolvedSetKey])
            ? [...this.archive.supplementalCatalogsBySet[resolvedSetKey]]
            : [];
    },

    getArchiveMergePriority(sourceScope = '') {
        const normalizedScope = String(sourceScope || '').trim();
        return Number(
            this.archive?.mergePriority?.[normalizedScope]
            ?? this.archive?.mergePriority?.unknown
            ?? 0
        );
    }
};

export default CONFIG;
