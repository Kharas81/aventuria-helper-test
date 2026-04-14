window.UI = {
    previewOffsetX: 18,
    previewOffsetY: 18,

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    getTooltipElements() {
        return {
            tooltip: document.getElementById('card-tooltip'),
            image: document.getElementById('tooltip-image')
        };
    },

    showPreview(event, imageSrc) {
        const { tooltip, image } = this.getTooltipElements();
        if (!tooltip || !image || !imageSrc) return;

        image.src = imageSrc;
        image.alt = 'Kartenvorschau';
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
    },

    openPreview(imageSrc) {
        if (!imageSrc) return;

        if (window.Renderer?.ensureCardDetailModal) {
            const modal = window.Renderer.ensureCardDetailModal();
            const content = document.getElementById('card-detail-content');

            if (modal && content) {
                content.innerHTML = `
                    <div class="reader-text">
                        <div class="img-wrapper">
                            <img
                                src="${this.escapeHtml(imageSrc)}"
                                alt="Kartenvorschau"
                                class="manual-page-img"
                                loading="lazy"
                            >
                        </div>
                    </div>
                `;
                modal.style.display = 'flex';
                return;
            }
        }

        window.open(imageSrc, '_blank', 'noopener,noreferrer');
    },

    closeAllModals() {
        document.querySelectorAll('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        this.closePreview();

        if (window.Renderer?.closeCardDetail) {
            window.Renderer.closeCardDetail();
        }
    },

    handleCheck(button, resultType, resultText) {
        const probeItem = button?.closest?.('.probe-item');
        if (!probeItem) return;

        const resultBox = probeItem.querySelector('.check-result');
        if (!resultBox) return;

        resultBox.classList.remove('success', 'fail', 'show');
        resultBox.innerHTML = `
            <strong>${resultType === 'success' ? 'Erfolg:' : 'Misserfolg:'}</strong>
            ${this.escapeHtml(resultText)}
        `;
        resultBox.classList.add(resultType === 'success' ? 'success' : 'fail');
        resultBox.classList.add('show');

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    bindGlobalUiEvents() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
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
