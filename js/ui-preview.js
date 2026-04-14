window.UIPreview = {
    offsetX: 18,
    offsetY: 18,

    getElements() {
        return {
            tooltip: Utils.byId('card-tooltip'),
            image: Utils.byId('tooltip-image')
        };
    },

    show(event, imageSrc) {
        const { tooltip, image } = this.getElements();
        if (!tooltip || !image) return;

        const resolvedImage = Utils.resolveImagePath(imageSrc);
        Utils.setSafeImageSource(image, resolvedImage);
        image.alt = 'Kartenvorschau';
        tooltip.style.display = 'block';

        this.move(event);
    },

    move(event) {
        const { tooltip } = this.getElements();
        if (!tooltip || tooltip.style.display !== 'block' || !event) return;

        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        const rect = tooltip.getBoundingClientRect();
        let left = event.clientX + this.offsetX;
        let top = event.clientY + this.offsetY;

        if (left + rect.width > viewportWidth - 12) {
            left = Math.max(12, event.clientX - rect.width - this.offsetX);
        }

        if (top + rect.height > viewportHeight - 12) {
            top = Math.max(12, event.clientY - rect.height - this.offsetY);
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    },

    close() {
        const { tooltip, image } = this.getElements();
        if (!tooltip || !image) return;

        tooltip.style.display = 'none';
        tooltip.style.left = '-9999px';
        tooltip.style.top = '-9999px';
        image.removeAttribute('src');
        image.dataset.fallbackApplied = 'false';
    },

    open(imageSrc) {
        const resolvedImage = Utils.resolveImagePath(imageSrc);
        if (!resolvedImage) return;

        if (window.Renderer?.ensureCardDetailModal) {
            const modal = window.Renderer.ensureCardDetailModal();
            const content = Utils.byId('card-detail-content');

            if (modal && content) {
                content.innerHTML = `
                    <div class="reader-text">
                        <div class="img-wrapper">
                            <img
                                id="preview-modal-image"
                                alt="Kartenvorschau"
                                class="manual-page-img"
                                loading="lazy"
                            >
                        </div>
                    </div>
                `;

                const previewImage = Utils.byId('preview-modal-image');
                Utils.setSafeImageSource(previewImage, resolvedImage);

                modal.style.display = 'flex';
                return;
            }
        }

        window.open(resolvedImage, '_blank', 'noopener,noreferrer');
    }
};
