import Utils from '../../core/utils.js';
import RulebookCodexTextExtractor from './codex-text-extractor.js';

export const RulebookCodexDataBuilder = {
    async buildRulesData(rulebook) {
        const indexData = rulebook.manualIndex || await rulebook.indexLoader.load(rulebook.currentSet);
        const pages = Utils.normalizeArray(indexData?.pages);
        const rules = [];

        for (const entry of pages) {
            try {
                const response = await fetch(entry.path);
                if (!response.ok) continue;

                const data = await response.json();
                const title = rulebook.stripCitationMarkers(
                    data?.title ?? entry.title ?? `Seite ${entry.page}`
                );

                const text = RulebookCodexTextExtractor.extractPlainText(rulebook, data?.content);

                rules.push({
                    page: entry.page,
                    title,
                    text
                });
            } catch (error) {
                console.warn(`Kodex-Seite ${entry.page} Fehler`, error);
            }
        }

        rulebook.rulesData = rules;
    }
};

export default RulebookCodexDataBuilder;
