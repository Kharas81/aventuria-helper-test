import ArchiveSidebarRenderer from './archive-sidebar-renderer.js';
import ArchiveGridRenderer from './archive-grid-renderer.js';
import ArchivePreviewRenderer from './archive-preview-renderer.js';

export const ArchiveBrowserLayout = {
  ensureSections(container) {
    if (!container) return {};

    container.innerHTML = `
      <div class="archive-browser">
        <section class="archive-browser__setbar" id="archive-browser-setbar"></section>

        <aside class="archive-browser__panel archive-browser__panel--sidebar">
          <div class="archive-browser__panel-scroll" id="archive-browser-sidebar"></div>
        </aside>

        <section class="archive-browser__panel archive-browser__panel--list">
          <div class="archive-browser__panel-scroll" id="archive-browser-list"></div>
        </section>

        <section class="archive-browser__panel archive-browser__panel--preview">
          <div class="archive-browser__panel-scroll" id="archive-browser-preview"></div>
        </section>
      </div>
    `;

    return {
      setbar: container.querySelector('#archive-browser-setbar'),
      sidebar: container.querySelector('#archive-browser-sidebar'),
      list: container.querySelector('#archive-browser-list'),
      preview: container.querySelector('#archive-browser-preview'),
    };
  },

  render(
    container,
    { sidebarOptions = {}, cards = [], listOptions = {}, selectedCard = null } = {}
  ) {
    if (!container) return;

    const sections = this.ensureSections(container);

    ArchiveSidebarRenderer.renderSetbar(sections.setbar, sidebarOptions);
    ArchiveSidebarRenderer.render(sections.sidebar, sidebarOptions);
    ArchiveGridRenderer.renderGrid(sections.list, cards, listOptions);
    ArchivePreviewRenderer.render(sections.preview, selectedCard);
  },
};

export default ArchiveBrowserLayout;
