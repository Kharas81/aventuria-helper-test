import Utils from '../core/utils.js';
import CoreRuntime from '../core/runtime.js';

export function normalizeArchiveQuery(value = '') {
    return Utils.normalizeString(value)
        .replace(/\s*\([^)]*\)\s*$/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

export function openArchiveWithSearch({
    query = '',
    sourceFilter = '',
    categoryFilter = '',
    setKey = ''
} = {}) {
    const archive = CoreRuntime.getArchive();
    if (!archive?.open) {
        return;
    }

    const safeQuery = normalizeArchiveQuery(query);
    const safeSourceFilter = Utils.normalizeString(sourceFilter);
    const safeCategoryFilter = Utils.normalizeString(categoryFilter);
    const safeSetKey = Utils.normalizeString(setKey);

    CoreRuntime.getRenderCardDetail()?.closeCardDetail?.();

    archive.open({
        query: safeQuery,
        sourceFilter: safeSourceFilter,
        categoryFilter: safeCategoryFilter,
        setKey: safeSetKey
    });
}

export function getArchiveActions() {
    return {
        'open-archive': () => {
            CoreRuntime.getArchive()?.open?.();
        },

        'close-archive': () => {
            CoreRuntime.getArchive()?.close?.();
        },

        'archive-load-set': trigger => {
            CoreRuntime.getArchive()?.loadSet?.(trigger?.dataset?.set, {
                sourceFilter: '__all__',
                categoryFilter: '__all__'
            });
        },

        'archive-open-category': trigger => {
            CoreRuntime.getArchive()?.openCategory?.(
                trigger?.dataset?.categoryFilter || '',
                {
                    setKey: trigger?.dataset?.set || ''
                }
            );
        },

        'archive-filter-source': trigger => {
            CoreRuntime.getArchive()?.setSourceFilter?.(
                trigger?.dataset?.sourceFilter || ''
            );
        },

        'archive-filter-category': trigger => {
            CoreRuntime.getArchive()?.setCategoryFilter?.(
                trigger?.dataset?.categoryFilter || ''
            );
        },

        'archive-select-card': trigger => {
            CoreRuntime.getArchive()?.setSelectedCard?.(
                trigger?.dataset?.cardId || ''
            );
        },

        'archive-search': trigger => {
            openArchiveWithSearch({
                query: trigger?.dataset?.archiveQuery || '',
                sourceFilter: trigger?.dataset?.archiveSource || '',
                categoryFilter: trigger?.dataset?.archiveCategory || '',
                setKey: trigger?.dataset?.archiveSet || ''
            });
        }
    };
}

export default {
    normalizeArchiveQuery,
    openArchiveWithSearch,
    getArchiveActions
};
