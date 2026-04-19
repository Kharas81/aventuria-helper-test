import { normalizeCardDetail } from './card-detail-normalizer.js';
import { renderSearchChips } from './card-detail-search.js';
import { renderMetaRows } from './card-detail-meta.js';
import { renderStats } from './card-detail-stats.js';
import {
    renderTextBlock,
    renderRuleList,
    renderActionBlocks,
    buildRulesSections
} from './card-detail-rules.js';
import {
    buildOverviewPanel,
    buildValuesPanel,
    buildExplorePanel,
    buildImagePanel
} from './card-detail-panels.js';
import { buildDetailMarkup } from './card-detail-template.js';

export const CardDetailSections = {
    normalizeCardDetail,
    renderSearchChips,
    renderMetaRows,
    renderStats,
    renderTextBlock,
    renderRuleList,
    renderActionBlocks,
    buildOverviewPanel,
    buildValuesPanel,
    buildExplorePanel,
    buildImagePanel,
    buildRulesSections,
    buildDetailMarkup
};

export default CardDetailSections;
