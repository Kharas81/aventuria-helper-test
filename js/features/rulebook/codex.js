import RulebookCodexTextExtractor from './codex-text-extractor.js';
import RulebookCodexDataBuilder from './codex-data-builder.js';
import RulebookCodexActions from './codex-actions.js';
import RulebookCodexFilter from './codex-filter.js';

export const RulebookCodex = {
    htmlToPlainText(html) {
        return RulebookCodexTextExtractor.htmlToPlainText(html);
    },

    collectBlockText(rulebook, block) {
        return RulebookCodexTextExtractor.collectBlockText(rulebook, block);
    },

    extractPlainText(rulebook, content) {
        return RulebookCodexTextExtractor.extractPlainText(rulebook, content);
    },

    async buildRulesData(rulebook) {
        return RulebookCodexDataBuilder.buildRulesData(rulebook);
    },

    bindPageJumpActions(scope, rulebook) {
        return RulebookCodexActions.bindPageJumpActions(scope, rulebook);
    },

    getExcerpt(text, maxLength = 220) {
        return RulebookCodexFilter.getExcerpt(text, maxLength);
    },

    filterRules(rulebook, term = '') {
        return RulebookCodexFilter.filterRules(rulebook, term);
    }
};

export default RulebookCodex;
