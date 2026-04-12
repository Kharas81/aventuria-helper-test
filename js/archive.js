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

        if (window.UI) {
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
            const haystack = [
                card.id,
                card.name,
                card.type,
                card.note,
                ...(Array.isArray(card.tags) ? card.tags : [])
            ]
                .map(entry => this.normalizeText(entry))
                .join(' ');

            return haystack.includes(normalizedQuery);
        });

        this.renderCards(this.filteredCards);
    },

    buildMeta(card) {
        const meta = [];

        if (card.type) meta.push(card.type);
        if (card.status) meta.push(card.status);
        if (card.adventure_id) meta.push(card.adventure_id);

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

            const image = document.createElement('img');
            image.alt = card.name || 'Karte';
            image.loading = 'lazy';

            if (hasImage) {
                image.src = imageSrc;
                image.setAttribute('data-card-image', imageSrc);
            } else {
                image.src =
                    'data:image/svg+xml;utf8,' +
                    encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">
                            <rect width="300" height="420" fill="#f4e7d3"/>
                            <rect x="8" y="8" width="284" height="404" fill="none" stroke="#8b4513" stroke-width="3"/>
                            <text x="150" y="190" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#5c1e1e">
                                Keine Vorschau
                            </text>
                            <text x="150" y="225" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#8b4513">
                                Bild noch nicht ergänzt
                            </text>
                        </svg>
                    `);
            }

            image.addEventListener('error', () => {
                image.src =
                    'data:image/svg+xml;utf8,' +
                    encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">
                            <rect width="300" height="420" fill="#f4e7d3"/>
                            <rect x="8" y="8" width="284" height="404" fill="none" stroke="#8b4513" stroke-width="3"/>
                            <text x="150" y="190" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#5c1e1e">
                                Bild fehlt
                            </text>
                            <text x="150" y="225" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#8b4513">
                                Pfad prüfen
                            </text>
                        </svg>
                    `);
                image.removeAttribute('data-card-image');
            });

            const title = document.createElement('p');
            title.textContent = card.name || 'Unbenannte Karte';

            const meta = this.buildMeta(card);
            if (meta.length) {
                const metaEl = document.createElement('p');
                metaEl.style.fontSize = '0.75em';
                metaEl.style.marginTop = '4px';
                metaEl.style.color = '#8b4513';
                metaEl.textContent = meta.join(' • ');
                wrapper.appendChild(metaEl);
            }

            if (card.id) {
                const idEl = document.createElement('p');
                idEl.style.fontSize = '0.72em';
                idEl.style.marginTop = '4px';
                idEl.style.wordBreak = 'break-word';
                idEl.style.color = '#6b4b36';
                idEl.textContent = `ID: ${card.id}`;
                wrapper.appendChild(idEl);
            }

            wrapper.insertBefore(image, wrapper.firstChild);
            wrapper.appendChild(title);

            if (Array.isArray(card.tags) && card.tags.length) {
                const tagsEl = document.createElement('p');
                tagsEl.style.fontSize = '0.72em';
                tagsEl.style.marginTop = '4px';
                tagsEl.style.color = '#6b4b36';
                tagsEl.textContent = `Tags: ${card.tags.join(', ')}`;
                wrapper.appendChild(tagsEl);
            }

            if (card.note) {
                const noteEl = document.createElement('p');
                noteEl.style.fontSize = '0.72em';
                noteEl.style.marginTop = '4px';
                noteEl.style.color = '#6b4b36';
                noteEl.textContent = card.note;
                wrapper.appendChild(noteEl);
            }

            if (hasImage) {
                wrapper.addEventListener('mouseover', (event) => {
                    if (!window.UI?.isTouchDevice) {
                        window.UI?.showPreview(event, imageSrc);
                    }
                });

                wrapper.addEventListener('mousemove', (event) => {
                    if (!window.UI?.isTouchDevice) {
                        window.UI?.movePreview(event);
                    }
                });

                wrapper.addEventListener('mouseout', () => {
                    if (!window.UI?.isTouchDevice) {
                        window.UI?.hidePreview();
                    }
                });

                wrapper.addEventListener('click', (event) => {
                    window.UI?.showPreview(event, imageSrc);
                });
            }

            fragment.appendChild(wrapper);
        });

        grid.appendChild(fragment);
    }
};
