import ArchiveSidebarRenderer from './archive-sidebar-renderer.js';
import ArchiveGridRenderer from './archive-grid-renderer.js';
import ArchivePreviewRenderer from './archive-preview-renderer.js';

export const ArchiveBrowserLayout = {
    ensureSections(container) {
        if (!container) {
            return {};
        }

        container.innerHTML = `
            <div class="archive-browser">
                <aside class="archive-browser__panel archive-browser__sidebar" id="archive-browser-sidebar"></aside>
                <section class="archive-browser__panel archive-browser__list" id="archive-browser-list"></section>
                <aside class="archive-browser__panel archive-browser__preview" id="archive-browser-preview"></aside>
            </div>
        `;

        return {
            sidebar: container.querySelector('#archive-browser-sidebar'),
            list: container.querySelector('#archive-browser-list'),
            preview: container.querySelector('#archive-browser-preview')
        };
    },

    render(container, {
        sidebarOptions = {},
        cards = [],
        listOptions = {},
        selectedCard = null
    } = {}) {
        if (!container) {
            return;
        }

        const sections = this.ensureSections(container);

        ArchiveSidebarRenderer.render(sections.sidebar, sidebarOptions);
        ArchiveGridRenderer.renderGrid(sections.list, cards, listOptions);
        ArchivePreviewRenderer.render(sections.preview, selectedCard);
    }
};

export default ArchiveBrowserLayout;
