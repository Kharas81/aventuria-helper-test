window.UI = {
    activePreviewSource: null,
    isTouchDevice: window.matchMedia('(hover: none), (pointer: coarse)').matches,

    toggleSection(id) {
        const el = document.getElementById(id);
        if (!el) return;

        el.classList.toggle('show');

        if (window.StorageManager) {
            window.StorageManager.persist();
        }
    },

    getTooltipElement() {
        return document.getElementById('card-tooltip');
    },

    showPreview(event, imageSrc) {
        const tooltip = this.getTooltipElement();
        if (!tooltip || !imageSrc) return;

        this.activePreviewSource = imageSrc;

        tooltip.innerHTML = `
            <div class="tooltip-inner">
                <img src="${imageSrc}" alt="Kartenvorschau" loading="lazy">
            </div>
        `;

        tooltip.style.display = 'block';
        tooltip.setAttribute('data-open', 'true');

        this.movePreview(event);
    },

    movePreview(event) {
        const tooltip = this.getTooltipElement();
        if (!tooltip || tooltip.style.display !== 'block') return;

        const margin = 12;
        const defaultOffsetX = 18;
        const defaultOffsetY = 18;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const tooltipWidth = tooltip.offsetWidth || Math.min(450, viewportWidth - margin * 2);
        const tooltipHeight = tooltip.offsetHeight || 320;

        let clientX = viewportWidth / 2;
        let clientY = viewportHeight / 2;

        if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        let left;
        let top;

        if (this.isTouchDevice || viewportWidth <= 700) {
            left = Math.max(margin, Math.round((viewportWidth - tooltipWidth) / 2));
            top = Math.max(margin, Math.round((viewportHeight - tooltipHeight) / 2));
        } else {
            left = clientX + defaultOffsetX;
            top = clientY + defaultOffsetY;

            if (left + tooltipWidth + margin > viewportWidth) {
                left = clientX - tooltipWidth - defaultOffsetX;
            }

            if (top + tooltipHeight + margin > viewportHeight) {
                top = viewportHeight - tooltipHeight - margin;
            }

            if (left < margin) left = margin;
            if (top < margin) top = margin;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.maxWidth = viewportWidth <= 700 ? `${viewportWidth - margin * 2}px` : 'min(450px, 90vw)';
        tooltip.style.maxHeight = `${viewportHeight - margin * 2}px`;
    },

    hidePreview(force = false) {
        const tooltip = this.getTooltipElement();
        if (!tooltip) return;

        if (!force && this.isTouchDevice) return;

        tooltip.style.display = 'none';
        tooltip.removeAttribute('data-open');
        tooltip.innerHTML = '';
        this.activePreviewSource = null;
    },

    closePreview() {
        const tooltip = this.getTooltipElement();
        if (!tooltip) return;

        tooltip.style.display = 'none';
        tooltip.removeAttribute('data-open');
        tooltip.innerHTML = '';
        this.activePreviewSource = null;
    },

    bindGlobalPreviewClose() {
        document.addEventListener('click', (event) => {
            const tooltip = this.getTooltipElement();
            if (!tooltip || tooltip.style.display !== 'block') return;

            const clickedPreviewTrigger = event.target.closest('[data-card-image]');
            const clickedTooltip = event.target.closest('#card-tooltip');

            if (!clickedPreviewTrigger && !clickedTooltip) {
                this.closePreview();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closePreview();
            }
        });

        window.addEventListener('resize', () => {
            const tooltip = this.getTooltipElement();
            if (!tooltip || tooltip.style.display !== 'block') return;
            this.movePreview();
        });
    },

    bindTouchPreviewSupport() {
        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-card-image]');
            if (!trigger) return;

            if (!this.isTouchDevice && window.innerWidth > 700) return;

            const imageSrc = trigger.dataset.cardImage;
            if (!imageSrc) return;

            event.preventDefault();
            this.showPreview(event, imageSrc);
        });
    },

    handleCheck(btn, type, text) {
        const probeItem = btn.closest('.probe-item');
        if (!probeItem) return;

        let result = probeItem.querySelector('.check-result');

        if (!result) {
            result = document.createElement('div');
            result.className = 'check-result';
            probeItem.appendChild(result);
        }

        result.className = `check-result show ${type}`;
        result.innerHTML = `<strong>${type === 'success' ? '✅' : '❌'}</strong> ${text}`;

        if (window.StorageManager) {
            window.StorageManager.persist();
        }
    },

    init() {
        this.bindGlobalPreviewClose();
        this.bindTouchPreviewSupport();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.UI.init();
});
