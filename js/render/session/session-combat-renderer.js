export const SessionCombatRenderer = {
    getPhaseDefinitions() {
        return [
            {
                index: '1',
                title: 'Heldenphase',
                hint: 'Aktionen der Helden planen und ausführen.'
            },
            {
                index: '2',
                title: 'Schergenphase',
                hint: 'Schergen reagieren und greifen an.'
            },
            {
                index: '3',
                title: 'Anführerphase',
                hint: 'Stärkere Gegner und besondere Effekte.'
            },
            {
                index: '4',
                title: 'Zeitphase',
                hint: 'Zeitmarker verringern und Druck erhöhen.'
            }
        ];
    },

    renderPhaseStep(phase, isActive = false) {
        return `
            <div class="step session-phase-step ${isActive ? 'active' : ''}">
                <span class="session-phase-step__index">${phase.index}</span>
                <span class="session-phase-step__title">${phase.title}</span>
                <span class="session-phase-step__hint">${phase.hint}</span>
            </div>
        `;
    },

    render(container) {
        if (!container) {
            return;
        }

        const phases = this.getPhaseDefinitions();

        container.classList.add('session-section', 'session-section--combat');
        container.innerHTML = `
            <div class="session-section__frame session-section__frame--combat">
                <div class="session-panel__header">
                    <div class="ui-divider ui-divider--ornament">
                        <span class="ui-divider__label">Kampf-Tools</span>
                    </div>

                    <p class="session-panel__subcopy">
                        Der Hauptblock für Phasen, Zeitdruck und Heldenverwaltung.
                    </p>
                </div>

                <div
                    class="phase-steps session-phase-steps"
                    id="phaseTracker"
                    aria-label="Phasenanzeige"
                >
                    ${phases.map((phase, index) => this.renderPhaseStep(phase, index === 0)).join('')}
                </div>

                <div class="button-group button-group--center button-group--mb-lg session-command-bar">
                    <button type="button" class="btn-outline" data-action="combat-prev-phase">
                        Phase zurück
                    </button>

                    <button type="button" class="btn-outline" data-action="combat-next-phase">
                        Nächste Phase
                    </button>

                    <button type="button" class="btn-outline" data-action="combat-roll-target">
                        Zufallsziel würfeln
                    </button>

                    <button type="button" class="btn-outline" data-action="combat-update-ep">
                        EP neu berechnen
                    </button>
                </div>

                <div class="session-combat-summary">
                    <div class="session-combat-summary__card">
                        <span class="session-combat-summary__label">Zeitmarker</span>
                        <span class="session-combat-summary__value">Verbleibende Zeit</span>
                        <input type="number" id="remainingTime" min="0" value="0">
                    </div>

                    <div class="session-combat-summary__card">
                        <span class="session-combat-summary__label">Ergebnis</span>
                        <span class="session-combat-summary__value" id="ep-result">2 EP</span>
                    </div>

                    <div class="session-combat-summary__card">
                        <span class="session-combat-summary__label">Zufallsziel</span>
                        <span class="session-combat-summary__value" id="targetResult">--</span>
                    </div>
                </div>

                <div
                    class="hero-dashboard session-hero-dashboard"
                    id="heroDashboard"
                    aria-label="Heldenübersicht"
                ></div>
            </div>
        `;
    }
};

export default SessionCombatRenderer;
