import Utils from '../../core/utils.js';
import ArchiveListCardTemplate from './archive-list-card-template.js';

export const ArchiveGridRenderer = {
    renderGrid(container, cards = [], options = {}) {
        if (!container) {
            return;
        }

        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            container.innerHTML = `
                <div class="archive-browser-head">
                    <div class="archive-browser-head__eyebrow">Kartenliste</div>
                    <h4 class="archive-browser-head__title">Keine Karten gefunden</h4>
                    <p class="archive-browser-head__text">
                        Passe links Filter oder Suche an, um Treffer zu sehen.
                    </p>
                </div>

                <div class="archive-browser-empty">
                    Für die aktuelle Kombination aus Suche, Karten-Set und Kategorie wurden keine Karten gefunden.
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="archive-browser-head">
                <div class="archive-browser-head__eyebrow">Kartenliste</div>
                <h4 class="archive-browser-head__title">Treffer im Archiv</h4>
                <p class="archive-browser-head__text">
                    Wähle eine Karte aus der Liste, um rechts sofort eine Vorschau zu sehen.
                </p>
            </div>

            <div class="archive-browser-list">
                ${safeCards.map(card => ArchiveListCardTemplate.renderCard(card, options)).join('')}
            </div>
        `;
    }
};

export default ArchiveGridRenderer;
