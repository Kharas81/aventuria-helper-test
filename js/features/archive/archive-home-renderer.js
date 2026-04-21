import ArchiveHomeTemplate from './archive-home-template.js';

export const ArchiveHomeRenderer = {
    renderHome(container, options = {}) {
        if (!container) {
            return;
        }

        container.innerHTML = ArchiveHomeTemplate.render(options);
    }
};

export default ArchiveHomeRenderer;
