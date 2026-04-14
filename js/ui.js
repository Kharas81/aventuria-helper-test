window.UI = {
    previewOffsetX: 18,
    previewOffsetY: 18,

    getTooltipElements() {
        return {
            tooltip: Utils.byId('card-tooltip'),
            image: Utils.byId('tooltip-image')
        };
    },

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

    showPreview(event, imageSrc) {
        const { tooltip, image } = this.getTooltipElements();
        if (!tooltip || !image) return;

        const resolvedImage = Utils.resolveImagePath(imageSrc, '');
        if (!resolvedImage) return;

        image.dataset.fallbackApplied = 'false';
        image.dataset.fallbackSrc = Utils.getPlaceholderImage();
        image.src = resolvedImage;
        image.alt = 'Kartenvorschau';
        Utils.applyImageFallback(image, image.dataset.fallbackSrc);

        tooltip.style.display = 'block';

        this.movePreview(event);
    },

    movePreview(event) {
        const { tooltip } = this.getTooltipElements();
        if (!tooltip || tooltip.style.display !== 'block' || !event) return;

        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        const rect = tooltip.getBoundingClientRect();
        let left = event.clientX + this.previewOffsetX;
        let top = event.clientY + this.previewOffsetY;

        if (left + rect.width > viewportWidth - 12) {
            left = Math.max(12, event.clientX - rect.width - this.previewOffsetX);
        }

        if (top + rect.height > viewportHeight - 12) {
            top = Math.max(12, event.clientY - rect.height - this.previewOffsetY);
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    },

    closePreview() {
        const { tooltip, image } = this.getTooltipElements();
        if (!tooltip || !image) return;

        tooltip.style.display = 'none';
        tooltip.style.left = '-9999px';
        tooltip.style.top = '-9999px';
        image.src = '';
        image.alt = '';
        image.dataset.fallbackApplied = 'false';
    },

    openPreview(imageSrc) {
        const resolvedImage = Utils.resolveImagePath(imageSrc, '');
        if (!resolvedImage) return;

        if (window.Renderer?.ensureCardDetailModal) {
            const modal = window.Renderer.ensureCardDetailModal();
            const content = Utils.byId('card-detail-content');

            if (modal && content) {
                content.innerHTML = `
                    <div class="reader-text">
                        <div class="img-wrapper">
                            <img
                                src="${Utils.escapeHtml(resolvedImage)}"
                                alt="Kartenvorschau"
                                class="manual-page-img"
                                loading="lazy"
                                decoding="async"
                                data-fallback-src="${Utils.escapeHtml(Utils.getPlaceholderImage())}"
                            >
                        </div>
                    </div>
                `;
                Utils.bindImageFallbacks(content);
                modal.style.display = 'flex';
                return;
            }
        }

        window.open(resolvedImage, '_blank', 'noopener,noreferrer');
    },

    closeAllModals() {
        Utils.qsa('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        this.closePreview();

        if (window.Renderer?.closeCardDetail) {
            window.Renderer.closeCardDetail();
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
        Utils.bindImageFallbacks(document);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.UI?.init) {
        window.UI.init();
    }
});
