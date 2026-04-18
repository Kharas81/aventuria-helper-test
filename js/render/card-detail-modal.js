import Utils from '../core/utils.js';

const CARD_DETAIL_TEMPLATE_ID = 'card-detail-modal-template';
const CARD_DETAIL_MODAL_ID = 'card-detail-modal';
const CARD_DETAIL_CONTENT_ID = 'card-detail-content';
const CARD_DETAIL_TITLE_ID = 'card-detail-title';
const CARD_DETAIL_IMAGE_ID = 'card-detail-image';

export const CardDetailModal = {
    getTemplate() {
        return document.getElementById(CARD_DETAIL_TEMPLATE_ID);
    },

    getModal() {
        return Utils.byId(CARD_DETAIL_MODAL_ID);
    },

    getContent() {
        return Utils.byId(CARD_DETAIL_CONTENT_ID);
    },

    getTitleId() {
        return CARD_DETAIL_TITLE_ID;
    },

    getImageId() {
        return CARD_DETAIL_IMAGE_ID;
    },

    createFallbackMarkup() {
        return `
            <div
                class="modal-backdrop"
                id="${CARD_DETAIL_MODAL_ID}"
                role="dialog"
                aria-modal="true"
                aria-labelledby="${CARD_DETAIL_TITLE_ID}"
                aria-hidden="true"
            >
                <div class="modal-content">
                    <span
                        class="close-modal"
                        data-action="close-card-detail"
                        aria-label="Kartendetail schließen"
                    >&times;</span>

                    <div class="tab-content" id="${CARD_DETAIL_CONTENT_ID}"></div>
                </div>
            </div>
        `;
    },

    bindBackdropClose(modal) {
        if (!modal || modal.dataset.boundBackdropClose === 'true') {
            return;
        }

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.close();
            }
        });

        modal.dataset.boundBackdropClose = 'true';
    },

    ensure() {
        let modal = this.getModal();
        if (modal) {
            this.bindBackdropClose(modal);
            return modal;
        }

        const template = this.getTemplate();

        if (template?.content) {
            const fragment = template.content.cloneNode(true);
            document.body.appendChild(fragment);
            modal = this.getModal();
        } else {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = this.createFallbackMarkup().trim();
            modal = wrapper.firstElementChild;
            if (modal) {
                document.body.appendChild(modal);
            }
        }

        this.bindBackdropClose(modal);
        return modal;
    },

    close() {
        const modal = this.getModal();
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    },

    open() {
        const modal = this.ensure();
        if (modal) {
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
        }
        return modal;
    },

    applyCardImage(card) {
        if (!card?.hasRealImage) {
            return;
        }

        const image = Utils.byId(this.getImageId());
        Utils.setSafeImageSource(image, card.imageSrc);
    }
};

export default CardDetailModal;
