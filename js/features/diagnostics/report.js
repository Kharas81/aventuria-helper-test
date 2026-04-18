import Utils from '../../core/utils.js';

export const DiagnosticsReport = {
    createEmptyReport() {
        return {
            visible: false,
            detailsOpen: false,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };
    },

    recalculateSummary(report) {
        const safeReport = Utils.normalizeObject(report);
        const sections = Utils.normalizeArray(safeReport.sections);

        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        sections.forEach(section => {
            errorCount += Utils.normalizeArray(section?.errors).length;
            warningCount += Utils.normalizeArray(section?.warnings).length;
            infoCount += Utils.normalizeArray(section?.info).length;
        });

        safeReport.summary = {
            errorCount,
            warningCount,
            infoCount
        };

        safeReport.visible = errorCount > 0 || warningCount > 0 || infoCount > 0;
        return safeReport;
    },

    addSection(report, title, result, options = {}) {
        const safeReport = Utils.normalizeObject(report);
        const safeResult = Utils.normalizeObject(result);
        const safeMeta = Utils.normalizeObject(options.meta);

        if (!Array.isArray(safeReport.sections)) {
            safeReport.sections = [];
        }

        safeReport.sections.push({
            title: Utils.normalizeString(title) || 'Diagnose',
            ok: Boolean(safeResult.ok),
            errors: Utils.normalizeArray(safeResult.errors),
            warnings: Utils.normalizeArray(safeResult.warnings),
            info: Utils.normalizeArray(safeResult.info),
            meta: safeMeta
        });

        this.recalculateSummary(safeReport);
        return safeReport;
    },

    createSingleMessageReport(type, title, message) {
        const report = this.createEmptyReport();

        this.addSection(report, title, {
            ok: type !== 'error',
            errors: type === 'error' ? [message] : [],
            warnings: type === 'warning' ? [message] : [],
            info: type === 'info' ? [message] : []
        });

        return report;
    }
};

export default DiagnosticsReport;
