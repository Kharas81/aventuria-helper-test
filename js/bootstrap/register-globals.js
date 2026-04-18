export function registerGlobals(globals = {}) {
    Object.entries(globals).forEach(([key, value]) => {
        window[key] = value;
    });
}

export default registerGlobals;
