window.Archive = {
    currentCards: [],
    filteredCards: [],
    currentSet: 'base_game',
    currentQuery: '',

    open() {
        const modal = document.getElementById('archive-modal');
        if (modal) {
            modal.style.display = 'flex';
        }

        if (!this.currentCards.length) {
            this.loadSet(this.currentSet);
        }
    },

    close() {
        const modal = document.getElementById('archive-modal');
        if (modal) {
            modal.style.display = 'none';
        }

        if (window.UI && typeof window.UI.closePreview === 'function') {
            window.UI.closePreview();
        }
    },

    normalizeText(value) {
        return String(value ?? '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
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
        this.currentSet = setKey;

        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        grid.innerHTML = '<p class="placeholder-text">Lade Karten-Archiv...</p>';

        try {
            const res = await fetch(`data/cards/base_game/master_${setKey}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            this.currentCards = Array.isArray(data.cards) ? data.cards : [];
            this.filteredCards = [...this.currentCards];

            this.renderCards(this.filteredCards);
        } catch (error) {
            console.error('Fehler beim Laden des Karten-Archivs:', error);
            grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Karten-Archivs.</p>';
        }
    },

    filter(term) {
        this.currentQuery = String(term ?? '').trim();
        const normalizedQuery = this.normalizeText(this.currentQuery);

        if (!normalizedQuery) {
            this.filteredCards = [...this.currentCards];
            this.renderCards(this.filteredCards);
            return;
        }

        this.filteredCards = this.currentCards.filter(card => {
            const haystackParts = [
                card.id,
                card.name,
                card.card_category,
                card.type,
                card.status,
                card.note,
                card.search_text,
                ...(Array.isArray(card.tags) ? card.tags : []),
                ...(Array.isArray(card.keywords) ? card.keywords : []),
                ...(Array.isArray(card.adventure_refs) ? card.adventure_refs : [])
            ];

            const haystack = haystackParts
                .map(entry => this.normalizeText(entry))
                .join(' ');

            return haystack.includes(normalizedQuery);
        });

        this.renderCards(this.filteredCards);
    },

    buildMeta(card) {
        const meta = [];

        if (card.card_category) meta.push(card.card_category);
        if (card.type) meta.push(card.type);
        if (card.status) meta.push(card.status);

        if (Array.isArray(card.adventure_refs) && card.adventure_refs.length) {
            meta.push(`Abenteuer: ${card.adventure_refs.join(', ')}`);
        }

        return meta;
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

            const imageSrc = String(card.image ?? '').trim();
            const hasImage = imageSrc.length > 0;

            const title = this.escapeHtml(card.name || card.id || 'Unbenannte Karte');
            const meta = this.buildMeta(card)
                .map(entry => this.escapeHtml(entry))
                .join(' • ');

            wrapper.innerHTML = `
                ${
                    hasImage
                        ? `<img src="${this.escapeHtml(imageSrc)}" alt="${title}" loading="lazy">`
                        : `<div style="width:100%; aspect-ratio:5/7; display:flex; align-items:center; justify-content:center; border:2px solid #8b4513; border-radius:5px; background:#f4e7d3; color:#8b4513; font-weight:bold;">Kein Bild</div>`
                }
                <p>${title}</p>
                ${meta ? `<small style="display:block; margin-top:6px; color:#6b4f3a;">${meta}</small>` : ''}
            `;

            wrapper.addEventListener('click', () => this.openCard(card));

            fragment.appendChild(wrapper);
        });

        grid.appendChild(fragment);
    },

    async openCard(card) {
        const imageSrc = String(card.image ?? '').trim();

        if (!card.detail_path) {
            if (imageSrc && window.UI && typeof window.UI.openPreview === 'function') {
                window.UI.openPreview(imageSrc);
            }
            return;
        }

        try {
            const res = await fetch(card.detail_path);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const detail = await res.json();

            if (window.Renderer && typeof window.Renderer.openCardDetail === 'function') {
                window.Renderer.openCardDetail(detail);
                return;
            }

            if (imageSrc && window.UI && typeof window.UI.openPreview === 'function') {
                window.UI.openPreview(imageSrc);
            }
        } catch (error) {
            console.error(`Fehler beim Laden der Kartendetails für "${card.id}":`, error);

            if (imageSrc && window.UI && typeof window.UI.openPreview === 'function') {
                window.UI.openPreview(imageSrc);
            }
        }
    },

    init() {
        const input = document.getElementById('archive-search');
        if (input) {
            input.addEventListener('input', (event) => {
                this.filter(event.target.value);
            });
        }

        const closeBtn = document.getElementById('close-archive-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        const modal = document.getElementById('archive-modal');
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    this.close();
                }
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Archive) {
        window.Archive.init();
    }
});
