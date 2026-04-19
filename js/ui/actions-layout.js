import Utils from '../core/utils.js';
import Constants from '../core/constants.js';
import State from '../core/state.js';
import CoreRuntime from '../core/runtime.js';

export function getSectionStateKey(sectionId) {
    const map = Constants.ui?.sectionStateMap ?? {};
    return map[sectionId] || null;
}

export function toggleSection(sectionId) {
    const section = Utils.byId(sectionId);
    if (!section) return;

    const isOpen = !section.classList.contains('show');
    section.classList.toggle('show', isOpen);

    const sectionKey = getSectionStateKey(sectionId);
    if (sectionKey) {
        State.setSectionOpen(sectionKey, isOpen);
    }

    CoreRuntime.persistIfAllowed();
}

export function getLayoutActions() {
    return {
        'toggle-section': trigger => {
            toggleSection(trigger?.dataset?.target || '');
        }
    };
}

export default {
    getSectionStateKey,
    toggleSection,
    getLayoutActions
};
