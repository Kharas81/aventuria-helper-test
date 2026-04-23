export const SessionRestPanelRenderer = {
    render(container) {
        if (!container) {
            return;
        }

        container.classList.add('session-section', 'session-section--rest');
        container.innerHTML = `
            <div class="session-section__frame session-section__frame--rest">
                <div class="session-panel__header">
                    <div class="ui-divider ui-divider--ornament">
                        <span class="ui-divider__label">Atempause</span>
                    </div>

                    <p class="session-panel__subcopy">
                        Der ruhige Gegenpol zum Kampf – Folgen lesen, Ergebnis prüfen und Erholung anwenden.
                    </p>
                </div>

                <div class="session-rest-layout">
                    <div class="session-rest-copy">
                        <div class="session-rest-copy__item">
                            <strong>Sieg</strong>
                            <p id="victory-text">—</p>
                        </div>

                        <div class="session-rest-copy__item">
                            <strong>Niederlage</strong>
                            <p id="defeat-text">—</p>
                        </div>
                    </div>

                    <div class="session-rest-outcome">
                        <div>
                            <p class="session-rest-outcome__lead">
                                Wende nach dem Kampf gesammelt die Ruhephase an und halte die Gruppe einsatzfähig.
                            </p>
                        </div>

                        <div class="result-badge" id="intermission-result">Atempause</div>

                        <div class="button-group button-group--center">
                            <button type="button" class="btn" data-action="combat-apply-intermission">
                                Atempause anwenden
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export default SessionRestPanelRenderer;
