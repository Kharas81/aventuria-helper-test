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

    async loadSet(setKey) {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        grid.innerHTML = 'Lade Karten...';

        const data = await window.API.getMasterSet(setKey);
        this.currentCards = Array.isArray(data.cards) ? data.cards : [];

        this.restoreArchiveFilters();
        this.applyFilters();
    },

    restoreArchiveFilters() {
        const state = window.StorageManager?.load();
        if (!state) return;

        const search = document.getElementById('archiveSearch');
        const type = document.getElementById('archiveTypeFilter');
        const status = document.getElementById('archiveStatusFilter');

        if (search) search.value = state.archive?.search || '';
        if (type) type.value = state.archive?.type || '';
        if (status) status.value = state.archive?.status || '';
    },

    persistArchiveFilters() {
        const search = document.getElementById('archiveSearch')?.value || '';
        const type = document.getElementById('archiveTypeFilter')?.value || '';
        const status = document.getElementById('archiveStatusFilter')?.value || '';

        window.StorageManager?.save({
            archive: { search, type, status }
        });
    },

    applyFilters() {
        const search = (document.getElementById('archiveSearch')?.value || '').trim().toLowerCase();
        const type = document.getElementById('archiveTypeFilter')?.value || '';
        const status = document.getElementById('archiveStatusFilter')?.value || '';

        this.persistArchiveFilters();

        const filtered = this.currentCards.filter(card => {
            const haystack = [
                card.name,
                card.id,
                card.type,
                card.status,
                ...(card.tags || [])
            ].join(' ').toLowerCase();

            const matchesSearch = !search || haystack.includes(search);
            const matchesType = !type || card.type === type;
            const matchesStatus = !status || card.status === status;

            return matchesSearch && matchesType && matchesStatus;
        });

        this.renderCards(filtered);
    },

    bindControls() {
        document.getElementById('archiveSearch')?.addEventListener('input', () => this.applyFilters());
        document.getElementById('archiveTypeFilter')?.addEventListener('change', () => this.applyFilters());
        document.getElementById('archiveStatusFilter')?.addEventListener('change', () => this.applyFilters());
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
            image.src = card.image || 'assets/images/placeholder_card.jpg';
            image.alt = card.name || 'Karte';
            image.loading = 'lazy';

            const title = document.createElement('p');
            title.textContent = card.name || 'Unbenannte Karte';

            const meta = document.createElement('small');
            meta.textContent = `${card.type || 'unknown'} • ${card.status || 'raw'}`;

            wrapper.appendChild(image);
            wrapper.appendChild(title);
            wrapper.appendChild(meta);

            if (card.image) {
                wrapper.addEventListener('mouseover', (event) => window.UI?.showPreview(event, card.image));
                wrapper.addEventListener('mousemove', (event) => window.UI?.movePreview(event));
                wrapper.addEventListener('mouseout', () => window.UI?.hidePreview());
                wrapper.addEventListener('click', (event) => window.UI?.showPreview(event, card.image));
            }

            fragment.appendChild(wrapper);
        });

        grid.appendChild(fragment);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.Archive.bindControls();
});
