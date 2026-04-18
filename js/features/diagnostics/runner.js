import Utils from '../../core/utils.js';
import Constants from '../../core/constants.js';
import Events from '../../core/events.js';
import Validator from '../../core/validator.js';

import DiagnosticsReport from './report.js';
import DiagnosticsCardChecks from './card-checks.js';
import DiagnosticsMasterChecks from './master-checks.js';
import DiagnosticsSetupChecks from './setup-checks.js';

export const DiagnosticsRunner = {
    buildAdventureSection(adventure) {
        return Validator.validateAdventure(adventure) || {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        const report = DiagnosticsReport.createEmptyReport();
        const safeContext = Utils.normalizeObject(context);

        Events.emit(Constants.events?.validationStarted || 'validation:started', {
            adventure,
            cards,
            masterIndex,
            context: safeContext
        });

        const adventureSection = this.buildAdventureSection(adventure);
        DiagnosticsReport.addSection(report, 'Abenteuerdatei', adventureSection, {
            meta: {
                ID: Utils.normalizeString(adventure?.id) || '—',
                Set: Utils.normalizeString(adventure?.set?.id || safeContext?.setKey) || '—'
            }
        });

        const cardsSection = DiagnosticsCardChecks.buildCardsSection(cards);
        DiagnosticsReport.addSection(report, 'Kartenpool', cardsSection.result, {
            meta: cardsSection.meta
        });

        const masterSection = DiagnosticsMasterChecks.buildMasterIndexSection(masterIndex, cards);
        DiagnosticsReport.addSection(report, 'Master-Index', masterSection.result, {
            meta: masterSection.meta
        });

        const setupSection = DiagnosticsSetupChecks.buildSetupSection(adventure, cards);
        DiagnosticsReport.addSection(report, 'Setup-Referenzen', setupSection.result, {
            meta: setupSection.meta
        });

        report.detailsOpen = false;
        DiagnosticsReport.recalculateSummary(report);

        const payload = {
            report,
            adventure,
            cards,
            masterIndex,
            context: safeContext
        };

        Events.emit(Constants.events?.validationFinished || 'validation:finished', payload);
        return report;
    }
};

export default DiagnosticsRunner;
