window.Archive = {
    currentCards: [],

    open() {
        const modal = document.getElementById('archive-modal');
        if (modal) modal.style.display = 'flex';
    },

    close() {
        const modal = document.getElementById('archive-modal');
        if (modal) modal.style.display = 'none';
        window.UI?.hidePreview();
    },

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    async loadSet(setKey) {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        grid.innerHTML = 'Lade Karten...';

        try {
            const res = await fetch(`data/cards/base_game/master_${setKey}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            this.currentCards = Array.isArray(data.cards) ? data.cards : [];
            this.renderCards(this.currentCards);
        } catch (error) {
            console.error('Fehler beim Laden des Archivs:', error);
            grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Karten-Archivs.</p>';
        }
    },

    filter(term) {
        const normalized = String(term ?? '').trim().toLowerCase();

        if (!normalized) {
            this.renderCards(this.currentCards);
            return;
        }

        const filtered = this.currentCards.filter(card => {
            const name = String(card.name ?? '').toLowerCase();
            const id = String(card.id ?? '').toLowerCase();
            return name.includes(normalized) || id.includes(normalized);
        });

        this.renderCards(filtered);
    },

    renderCards(cards) {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        grid.innerHTML = '';

        if (!cards.length) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        cards.forEach(card => {
            const wrapper = document.createElement('div');
            wrapper.className = 'archive-card';

            const image = document.createElement('img');
            image.src = card.image;
            image.alt = card.name || 'Karte';
            image.loading = 'lazy';

            const caption = document.createElement('p');
            caption.textContent = card.name || 'Unbenannte Karte';

            wrapper.appendChild(image);
            wrapper.appendChild(caption);

            if (card.image) {
                wrapper.addEventListener('mouseover', (event) => {
                    window.UI?.showPreview(event, card.image);
                });

                wrapper.addEventListener('mousemove', (event) => {
                    window.UI?.movePreview(event);
                });

                wrapper.addEventListener('mouseout', () => {
                    window.UI?.hidePreview();
                });

                wrapper.addEventListener('click', (event) => {
                    window.UI?.showPreview(event, card.image);
                });
            }

            fragment.appendChild(wrapper);
        });

        grid.appendChild(fragment);
    }
};
