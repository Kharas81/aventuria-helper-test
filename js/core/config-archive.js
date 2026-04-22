const CONFIG_ARCHIVE = {
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
};

export default CONFIG_ARCHIVE;
