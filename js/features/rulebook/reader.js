import RulebookReaderNavigation from './reader-navigation.js';
import RulebookReaderBlockRenderer from './reader-block-renderer.js';
import RulebookReaderPageLoader from './reader-page-loader.js';
import RulebookReaderActions from './reader-actions.js';

export const RulebookReader = {
    getPageEntries(rulebook) {
        return RulebookReaderNavigation.getPageEntries(rulebook);
    },

    getPageEntry(rulebook, pageNumber) {
        return RulebookReaderNavigation.getPageEntry(rulebook, pageNumber);
    },

    getFirstPage(rulebook) {
        return RulebookReaderNavigation.getFirstPage(rulebook);
    },

    getNextPage(rulebook, currentPage) {
        return RulebookReaderNavigation.getNextPage(rulebook, currentPage);
    },

    getPrevPage(rulebook, currentPage) {
        return RulebookReaderNavigation.getPrevPage(rulebook, currentPage);
    },

    buildIndicatorText(rulebook, pageNumber) {
        return RulebookReaderNavigation.buildIndicatorText(rulebook, pageNumber);
    },

    renderTocBlock(rulebook, block) {
        return RulebookReaderBlockRenderer.renderTocBlock(rulebook, block);
    },

    renderTableBlock(rulebook, block) {
        return RulebookReaderBlockRenderer.renderTableBlock(rulebook, block);
    },

    renderContentBlocks(rulebook, content) {
        return RulebookReaderBlockRenderer.renderContentBlocks(rulebook, content);
    },

    async loadPage(rulebook, pageNumber) {
        return RulebookReaderPageLoader.loadPage(rulebook, pageNumber);
    },

    bindInlinePageActions(scope, rulebook) {
        return RulebookReaderActions.bindInlinePageActions(scope, rulebook);
    }
};

export default RulebookReader;
