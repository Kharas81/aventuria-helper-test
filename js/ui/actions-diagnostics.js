import CoreRuntime from '../core/runtime.js';

export function getDiagnosticsActions() {
    return {
        'toggle-diagnostics-details': () => {
            CoreRuntime.getDiagnostics()?.toggleDetails?.();
        },

        'clear-diagnostics': () => {
            CoreRuntime.getDiagnostics()?.clear?.();
        }
    };
}

export default {
    getDiagnosticsActions
};
