window.Combat = {
    currentPhase: 0,
    phaseLabels: [
        '1. Heldenphase',
        '2. Schergenphase',
        '3. Anführerphase',
        '4. Zeitphase'
    ],
    currentAdventure: null,
    currentCards: [],

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    getHeroCount() {
        const el = document.getElementById('heroCount');
        const value = Number(el?.value ?? 2);
        return Number.isFinite(value) && value > 0 ? value : 2;
    },

    getDifficulty() {
        return String(document.getElementById('difficulty')?.value ?? 'normal');
    },

    getDefaultHeroLp() {
        return 40;
    },

    getDefaultHeroFate() {
        return 0;
    },

    getHeroDashboard() {
        return document.getElementById('heroDashboard');
    },

    getRemainingTimeInput() {
        return document.getElementById('remainingTime');
    },

    getEpResultEl() {
        return document.getElementById('ep-result');
    },

    getTargetResultEl() {
        return document.getElementById('targetResult');
    },

    getPhaseSteps() {
        return Array.from(document.querySelectorAll('#phaseTracker .step'));
    },

    initializeForAdventure(adventure, cards = []) {
        this.currentAdventure = adventure ?? null;
        this.currentCards = Array.isArray(cards) ? cards : [];
        this.currentPhase = 0;

        this.updateDashboard();
        this.updatePhaseTracker();

        const remainingTime = this.getRemainingTimeInput();
        const startValue = this.getTimelineStartValue();

        if (remainingTime) {
            const currentValue = Number(remainingTime.value);
            remainingTime.value = Number.isFinite(currentValue) && currentValue > 0
                ? currentValue
                : startValue;
        }

        this.updateEpResult();
        this.resetTargetResult();
    },

    getTimelineStartValue() {
        const timelineCard = (this.currentCards || []).find(card => String(card?.type ?? '') === 'timeline');
        const cardStartValue = Number(timelineCard?.stats?.start_value);

        if (Number.isFinite(cardStartValue) && cardStartValue >= 0) {
            return cardStartValue;
        }

        const adventureStartValue = Number(this.currentAdventure?.setup?.start_value);
        if (Number.isFinite(adventureStartValue) && adventureStartValue >= 0) {
            return adventureStartValue;
        }

        return 6;
    },

    buildHeroCard(heroIndex, heroState = {}) {
        const lp = Number.isFinite(Number(heroState.lp))
            ? Number(heroState.lp)
            : this.getDefaultHeroLp();

        const fate = Number.isFinite(Number(heroState.fate))
            ? Number(heroState.fate)
            : this.getDefaultHeroFate();

        return `
            <div class="hero-card" data-hero-index="${heroIndex}">
                <h4>Held ${heroIndex}</h4>

                <div class="stat">
                    <span aria-hidden="true">💗</span>
                    <span data-stat="lp">${this.escapeHtml(lp)}</span>
                    <button type="button" data-action="lp-minus" aria-label="Lebenspunkte verringern">-</button>
                    <button type="button" data-action="lp-plus" aria-label="Lebenspunkte erhöhen">+</button>
                </div>

                <div class="stat" style="margin-top: 8px;">
                    <span aria-hidden="true">🍀</span>
                    <span data-stat="fate">${this.escapeHtml(fate)}</span>
                    <button type="button" data-action="fate-minus" aria-label="Schicksalspunkte verringern">-</button>
                    <button type="button" data-action="fate-plus" aria-label="Schicksalspunkte erhöhen">+</button>
                </div>
            </div>
        `;
    },

    updateDashboard(savedHeroStats = null) {
        const container = this.getHeroDashboard();
        if (!container) return;

        const heroCount = this.getHeroCount();
        const stats = savedHeroStats && typeof savedHeroStats === 'object'
            ? savedHeroStats
            : this.readCurrentHeroStats();

        container.innerHTML = Array.from({ length: heroCount }, (_, i) => {
            const heroIndex = i + 1;
            return this.buildHeroCard(heroIndex, stats[heroIndex] || {});
        }).join('');

        this.bindDashboardButtons();
    },

    readCurrentHeroStats() {
        const container = this.getHeroDashboard();
        const result = {};

        if (!container) return result;

        container.querySelectorAll('.hero-card').forEach(card => {
            const heroIndex = Number(card.dataset.heroIndex);
            const lp = Number(card.querySelector('[data-stat="lp"]')?.textContent ?? this.getDefaultHeroLp());
            const fate = Number(card.querySelector('[data-stat="fate"]')?.textContent ?? this.getDefaultHeroFate());

            result[heroIndex] = {
                lp: Number.isFinite(lp) ? lp : this.getDefaultHeroLp(),
                fate: Number.isFinite(fate) ? fate : this.getDefaultHeroFate()
            };
        });

        return result;
    },

    bindDashboardButtons() {
        const container = this.getHeroDashboard();
        if (!container) return;

        container.querySelectorAll('button[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const heroCard = button.closest('.hero-card');
                if (!heroCard) return;

                const action = button.dataset.action;
                const lpEl = heroCard.querySelector('[data-stat="lp"]');
                const fateEl = heroCard.querySelector('[data-stat="fate"]');

                if (action === 'lp-minus' && lpEl) {
                    lpEl.textContent = String(Math.max(0, Number(lpEl.textContent) - 1));
                }

                if (action === 'lp-plus' && lpEl) {
                    lpEl.textContent = String(Number(lpEl.textContent) + 1);
                }

                if (action === 'fate-minus' && fateEl) {
                    fateEl.textContent = String(Math.max(0, Number(fateEl.textContent) - 1));
                }

                if (action === 'fate-plus' && fateEl) {
                    fateEl.textContent = String(Number(fateEl.textContent) + 1);
                }

                if (window.StorageManager?.persist) {
                    window.StorageManager.persist();
                }
            });
        });
    },

    updatePhaseTracker() {
        const steps = this.getPhaseSteps();
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentPhase);
        });
    },

    prevPhase() {
        this.currentPhase = (this.currentPhase - 1 + this.phaseLabels.length) % this.phaseLabels.length;
        this.updatePhaseTracker();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    nextPhase() {
        const wasTimePhase = this.currentPhase === this.phaseLabels.length - 1;

        this.currentPhase = (this.currentPhase + 1) % this.phaseLabels.length;
        this.updatePhaseTracker();

        if (wasTimePhase) {
            this.advanceTimeMarker();
        }

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    advanceTimeMarker() {
        const input = this.getRemainingTimeInput();
        if (!input) return;

        const current = Number(input.value);
        const next = Number.isFinite(current) ? Math.max(0, current - 1) : 0;

        input.value = next;
        this.updateEpResult();
    },

    rollTarget() {
        const el = this.getTargetResultEl();
        if (!el) return;

        const heroCount = this.getHeroCount();
        const result = Math.max(1, Math.ceil(Math.random() * heroCount));

        el.textContent = `Held ${result}`;

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    resetTargetResult() {
        const el = this.getTargetResultEl();
        if (el) {
            el.textContent = '--';
        }
    },

    updateEpResult() {
        const el = this.getEpResultEl();
        if (!el) return;

        const difficulty = this.getDifficulty();
        const remainingTime = Number(this.getRemainingTimeInput()?.value ?? 0);

        let ep = 2;

        if (difficulty === 'easy') ep += 1;
        if (difficulty === 'hard') ep -= 1;

        if (remainingTime >= 5) ep += 1;
        if (remainingTime <= 1) ep -= 1;

        ep = Math.max(0, ep);

        el.textContent = `${ep} EP`;

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    applyIntermission() {
        const dashboard = this.getHeroDashboard();
        if (!dashboard) return;

        dashboard.querySelectorAll('.hero-card').forEach(card => {
            const lpEl = card.querySelector('[data-stat="lp"]');
            const fateEl = card.querySelector('[data-stat="fate"]');

            if (lpEl) {
                const currentLp = Number(lpEl.textContent);
                lpEl.textContent = String(Math.max(0, currentLp + 3));
            }

            if (fateEl) {
                const currentFate = Number(fateEl.textContent);
                fateEl.textContent = String(Math.max(0, currentFate + 1));
            }
        });

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    bindGlobalCombatInputs() {
        const remainingTime = this.getRemainingTimeInput();
        const difficulty = document.getElementById('difficulty');

        if (remainingTime && !remainingTime.dataset.boundCombat) {
            remainingTime.addEventListener('input', () => {
                this.updateEpResult();
            });
            remainingTime.dataset.boundCombat = 'true';
        }

        if (difficulty && !difficulty.dataset.boundCombat) {
            difficulty.addEventListener('change', () => {
                this.updateEpResult();
            });
            difficulty.dataset.boundCombat = 'true';
        }
    },

    init() {
        this.bindGlobalCombatInputs();
        this.updatePhaseTracker();
        this.updateDashboard();
        this.updateEpResult();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Combat?.init) {
        window.Combat.init();
    }
});
