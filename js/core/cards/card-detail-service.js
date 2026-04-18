import Utils from '../utils.js';
import CardRepository from './card-repository.js';

export const CardDetailService = {
    async openCardDetailById(id, setKey = '') {
        const targetId = Utils.normalizeString(id);
        if (!targetId) {
            return null;
        }

        const card = await CardRepository.findCardById(targetId, setKey);
        if (!card) {
            return null;
        }

        if (window.RenderCardDetail?.openCardDetail) {
            window.RenderCardDetail.openCardDetail(card);
            return card;
        }

        if (window.Renderer?.openCardDetail) {
            window.Renderer.openCardDetail(card);
            return card;
        }

        return card;
    }
};

export default CardDetailService;
