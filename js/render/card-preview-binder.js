import CoreRuntime from '../core/runtime.js';

export const CardPreviewBinder = {
    bindCardPreviews(scope = document) {
        const previewTargets = scope.querySelectorAll('.has-preview[data-image]');
        const ui = CoreRuntime.getUI();

        previewTargets.forEach(el => {
            if (el.dataset.previewBound === 'true') return;
            el.dataset.previewBound = 'true';

            el.addEventListener('mouseenter', event => {
                const imageSrc = el.dataset.image;
                ui?.showPreview?.(event, imageSrc);
            });

            el.addEventListener('mousemove', event => {
                ui?.movePreview?.(event);
            });

            el.addEventListener('mouseleave', () => {
                ui?.closePreview?.();
            });

            el.addEventListener('click', () => {
                const imageSrc = el.dataset.image;
                if (imageSrc) {
                    ui?.openPreview?.(imageSrc);
                }
            });
        });
    }
};

export default CardPreviewBinder;
