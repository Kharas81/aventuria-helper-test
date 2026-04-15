import Assets from './assets.js';

export const Utils = {
    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    normalizeObject(value) {
        return value && typeof value === 'object' && !Array.isArray(value)
            ? value
            : {};
    },

    toNumber(value, fallback = 0) {
        const numeric = Number(value);
        return Number.isFinite(numeric) ? numeric : fallback;
    },

    clamp(value, min, max) {
        const numeric = this.toNumber(value, min);
        return Math.min(Math.max(numeric, min), max);
    },

    isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    },

    byId(id) {
        return document.getElementById(id);
    },

    qs(selector, scope = document) {
        return scope.querySelector(selector);
    },

    qsa(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    },

    toggleClass(element, className, force) {
        if (!element) return;
        if (typeof force === 'boolean') {
            element.classList.toggle(className, force);
            return;
        }
        element.classList.toggle(className);
    },

    getImageFallbackPath() {
        return Assets.getImageFallbackPath();
    },

    isUsableImagePath(path) {
        return Assets.isUsableImagePath(path);
    },

    resolveImagePath(...candidates) {
        return Assets.resolveImagePath(...candidates);
    },

    hasRealImage(...candidates) {
        return Assets.hasRealImage(...candidates);
    },

    attachImageFallback(img, fallbackSrc = null) {
        Assets.attachImageFallback(img, fallbackSrc);
    },

    setSafeImageSource(img, src, fallbackSrc = null) {
        Assets.setSafeImageSource(img, src, fallbackSrc);
    }
};

export default Utils;
