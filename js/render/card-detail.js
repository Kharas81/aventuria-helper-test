import CardDetailSections from './card-detail-sections.js';
import CardDetailModal from '../templates/card-detail-modal.js';

export const RenderCardDetail = {
    normalizeCardDetail(card) {
        return CardDetailSections.normalizeCardDetail(card);
    },

    ensureCardDetailModal() {
        return CardDetailModal.ensure();
    },

    closeCardDetail() {
        CardDetailModal.close();
    },

    openCardDetail(card) {
        const normalized = this.normalizeCardDetail(card);
        const modal = this.ensureCardDetailModal();
        const content = CardDetailModal.getContent();

        if (!modal || !content) {
            return;
        }

        content.innerHTML = CardDetailSections.buildDetailMarkup(normalized, {
            titleId: CardDetailModal.getTitleId(),
            imageId: CardDetailModal.getImageId()
        });

        CardDetailModal.applyCardImage(normalized);
        CardDetailModal.open();
    }
};

export default RenderCardDetail;
