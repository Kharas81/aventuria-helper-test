import Utils from '../../core/utils.js';
import SessionHeaderRenderer from './session-header-renderer.js';
import SessionStatusStripRenderer from './session-status-strip-renderer.js';
import SessionCombatRenderer from './session-combat-renderer.js';
import SessionRestPanelRenderer from './session-rest-panel-renderer.js';

export const SessionUI = {
    isInitialized: false,

    getHeader() {
        return document.querySelector('.app-header') || document.querySelector('header');
    },

    getStatusStripContainer() {
        return Utils.byId('session-status-strip');
    },

    getCombatSection() {
        return Utils.byId('combat-tools-section');
    },

    getRestSection() {
        return Utils.byId('intermission-section');
    },

    getAdventurePicker() {
        return Utils.byId('adventurePicker');
    },

    getHeroCountSelect() {
        return Utils.byId('heroCount');
    },

    getDifficultySelect() {
        return Utils.byId('difficulty');
    },

    getStatusElement() {
        return Utils.byId('loading-status');
    },

    getAdventureLabel() {
        const picker = this.getAdventurePicker();
        if (!picker) {
            return 'Kein Abenteuer gewählt';
        }

        const selectedOption = picker.options?.[picker.selectedIndex] || null;
        const selectedValue = Utils.normalizeString(picker.value);
        const selectedLabel = Utils.normalizeString(selectedOption?.textContent);

        if (!selectedValue || selectedLabel === 'Bitte wählen ...') {
            return 'Kein Abenteuer gewählt';
        }

        return selectedLabel || 'Kein Abenteuer gewählt';
    },

    getHeroCountLabel() {
        const heroCount = Number(this.getHeroCountSelect()?.value ?? 2) || 2;
        return `${heroCount} ${heroCount === 1 ? 'Held' : 'Helden'}`;
    },

    getDifficultyLabel() {
        const difficulty = Utils.normalizeString(this.getDifficultySelect()?.value || 'normal');

        const labels = {
            easy: 'Leicht',
            normal: 'Normal',
            hard: 'Schwer'
        };

        return labels[difficulty] || 'Normal';
    },

    getStatusLabel() {
        return Utils.normalizeString(this.getStatusElement()?.textContent || 'Bereit.');
    },

    renderShell() {
        SessionHeaderRenderer.render(this.getHeader());
        SessionCombatRenderer.render(this.getCombatSection());
        SessionRestPanelRenderer.render(this.getRestSection());
    },

    syncStatusStrip() {
        SessionStatusStripRenderer.render(this.getStatusStripContainer(), {
            adventureLabel: this.getAdventureLabel(),
            heroCountLabel: this.getHeroCountLabel(),
            difficultyLabel: this.getDifficultyLabel(),
            statusLabel: this.getStatusLabel()
        });
    },

    bindControl(control, eventName = 'change') {
        if (!control || control.dataset.sessionSyncBound === 'true') {
            return;
        }

        control.addEventListener(eventName, () => {
            this.syncStatusStrip();
        });

        control.dataset.sessionSyncBound = 'true';
    },

    bindStatusObserver() {
        const statusEl = this.getStatusElement();
        if (!statusEl || statusEl.dataset.sessionObserverBound === 'true') {
            return;
        }

        const observer = new MutationObserver(() => {
            this.syncStatusStrip();
        });

        observer.observe(statusEl, {
            childList: true,
            characterData: true,
            subtree: true
        });

        statusEl.dataset.sessionObserverBound = 'true';
    },

    bindSync() {
        this.bindControl(this.getAdventurePicker(), 'change');
        this.bindControl(this.getHeroCountSelect(), 'change');
        this.bindControl(this.getDifficultySelect(), 'change');
        this.bindStatusObserver();
    },

    init() {
        if (this.isInitialized) {
            return;
        }

        this.renderShell();
        this.bindSync();
        this.syncStatusStrip();
        this.isInitialized = true;
    }
};

export default SessionUI;
