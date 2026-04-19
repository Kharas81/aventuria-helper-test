import renderLocation from './render-location.js';
import renderHeader from './render-header.js';
import renderParagraph from './render-paragraph.js';
import renderNarrative from './render-narrative.js';
import renderInstructionBox from './render-instruction-box.js';
import renderRuleBlock from './render-rule-block.js';
import renderMapIndex from './render-map-index.js';
import renderWarningBox from './render-warning-box.js';
import renderToc from './render-toc.js';
import renderTable from './render-table.js';

export const BLOCK_RENDERERS = {
    location: renderLocation,
    header: renderHeader,
    paragraph: renderParagraph,
    narrative: renderNarrative,
    instruction_box: renderInstructionBox,
    rule_block: renderRuleBlock,
    map_index: renderMapIndex,
    warning_box: renderWarningBox,
    toc: renderToc,
    table: renderTable
};

export default BLOCK_RENDERERS;
