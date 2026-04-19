import Utils from '../../core/utils.js';
import BLOCK_RENDERERS from './block-renderers/index.js';
import renderParagraph from './block-renderers/render-paragraph.js';
import renderToc from './block-renderers/render-toc.js';
import renderTable from './block-renderers/render-table.js';

export const RulebookReaderBlockRenderer = {
    renderTocBlock(rulebook, block) {
        return renderToc(rulebook, block);
    },

    renderTableBlock(rulebook, block) {
        return renderTable(rulebook, block);
    },

    renderBlock(rulebook, block) {
        if (typeof block === 'string') {
            return renderParagraph(rulebook, { text: block });
        }

        const renderer = BLOCK_RENDERERS[block?.type];

        if (typeof renderer === 'function') {
            return renderer(rulebook, block);
        }

        const fallbackText = rulebook.stripCitationMarkers(block?.text || '');
        return fallbackText ? renderParagraph(rulebook, { text: fallbackText }) : '';
    },

    renderContentBlocks(rulebook, content) {
        if (!content) return '<p>Kein Inhalt vorhanden.</p>';

        // Abwärtskompatibilität für alte HTML-Strings
        if (typeof content === 'string') {
            return rulebook.stripCitationMarkers(content);
        }

        const blocks = Utils.normalizeArray(content);

        return blocks.map(block => this.renderBlock(rulebook, block)).join('');
    }
};

export default RulebookReaderBlockRenderer;
