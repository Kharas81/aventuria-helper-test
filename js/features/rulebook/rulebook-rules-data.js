export const RulebookRulesData = {
    async ensureRulesData(rulebook) {
        if (rulebook.rulesDataBuilt || rulebook.isBuildingRulesData) {
            return;
        }

        rulebook.isBuildingRulesData = true;

        try {
            await rulebook.codex.buildRulesData(rulebook);
            rulebook.rulesDataBuilt = true;
        } finally {
            rulebook.isBuildingRulesData = false;
        }
    }
};

export default RulebookRulesData;
