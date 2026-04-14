window.UI = {
    // --- FASSADE FÜR PREVIEW (Damit alte Aufrufe nicht brechen) ---
    showPreview(event, imageSrc) {
        window.UIPreview?.show(event, imageSrc);
    },

    movePreview(event) {
        window.UIPreview?.move(event);
    },

    closePreview() {
        window.UIPreview?.close();
    },

    openPreview(imageSrc) {
        window.UIPreview?.open(imageSrc);
    },

    // --- FASSADE FÜR MODALS ---
    closeAllModals() {
        window.UIModals?.closeAll();
    },


    // --- KERN-UI-ZUSTÄNDE & ROUTING ---
    setStatus(message) {
        const status = Utils.byId('loading-status');
        if (status) {
            status.innerText = String(message ?? '');
        }
    },

    getSectionStateKey(sectionId) {
        const map = {
            'combat-tools-section': 'combatToolsOpen',
            'intermission-section': 'intermissionOpen'
        };
        return map[sectionId] || null;
    },

    toggleSection(sectionId) {
        const section = Utils.byId(sectionId);
        if (!section) return;

        const isOpen = !section.classList.contains('show');
        section.classList.toggle('show', isOpen);

        const sectionKey = this.getSectionStateKey(sectionId);
        if (sectionKey) {
            window.State.setSectionOpen(sectionKey, isOpen);
        }

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    handleActionTrigger(trigger) {
        const action = String(trigger?.dataset?.action ?? '').trim();
        if (!action) return;

        switch (action) {
            case 'open-archive':
                window.Archive?.open?.();
                break;

            case 'close-archive':
                window.Archive?.close?.();
                break;

            case 'open-rulebook':
                window.Rulebook?.open?.();
                break;

            case 'close-rulebook':
                window.Rulebook?.close?.();
                break;

            case 'toggle-section':
                this.toggleSection(trigger.dataset.target);
                break;

            case 'combat-prev-phase':
                window.Combat?.prevPhase?.();
                break;

            case 'combat-next-phase':
                window.Combat?.nextPhase?.();
                break;

            case 'combat-roll-target':
                window.Combat?.rollTarget?.();
                break;

            case 'combat-update-ep':
                window.Combat?.updateEpResult?.();
                break;

            case 'combat-apply-intermission':
                window.Combat?.applyIntermission?.();
                break;

            case 'rulebook-tab':
                window.Rulebook?.showTab?.(trigger.dataset.tab);
                break;

            case 'rulebook-prev-page':
                window.Rulebook?.prevPage?.();
                break;

            case 'rulebook-next-page':
                window.Rulebook?.nextPage?.();
                break;

            case 'archive-load-set':
                window.Archive?.loadSet?.(trigger.dataset.set);
                break;

            case 'open-card-detail':
                if (trigger.dataset.cardId) {
                    window.API?.openCardDetailById?.(trigger.dataset.cardId);
                }
                break;

            case 'close-card-detail':
                window.Renderer?.closeCardDetail?.();
                break;

            case 'toggle-diagnostics-details':
                window.Diagnostics?.toggleDetails?.();
                break;

            case 'clear-diagnostics':
                window.Diagnostics?.clear?.();
                break;

            default:
                break;
        }
    },

    bindGlobalUiEvents() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
        });

        document.addEventListener('click', event => {
            const trigger = event.target.closest('[data-action]');
            if (!trigger) return;
            this.handleActionTrigger(trigger);
        });
    },

    init() {
        this.bindGlobalUiEvents();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.UI?.init) {
        window.UI.init();
    }
});
