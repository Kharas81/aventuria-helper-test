import CoreRuntime from '../core/runtime.js';

export function getRulebookActions() {
    return {
        'open-rulebook': () => {
            CoreRuntime.getRulebook()?.open?.();
        },

        'close-rulebook': () => {
            CoreRuntime.getRulebook()?.close?.();
        },

        'rulebook-tab': trigger => {
            CoreRuntime.getRulebook()?.showTab?.(trigger?.dataset?.tab);
        },

        'rulebook-prev-page': () => {
            CoreRuntime.getRulebook()?.prevPage?.();
        },

        'rulebook-next-page': () => {
            CoreRuntime.getRulebook()?.nextPage?.();
        }
    };
}

export default {
    getRulebookActions
};
