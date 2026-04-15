window.Utils = {
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
        return window.Assets?.getImageFallbackPath?.()
            || 'assets/images/placeholder.jpg';
    },

    isUsableImagePath(path) {
        if (window.Assets?.isUsableImagePath) {
            return window.Assets.isUsableImagePath(path);
        }

        const normalized = this.normalizeString(path);
        return Boolean(normalized);
    },

    resolveImagePath(...candidates) {
        if (window.Assets?.resolveImagePath) {
            return window.Assets.resolveImagePath(...candidates);
        }

        for (const candidate of candidates) {
            const normalized = this.normalizeString(candidate);
            if (normalized) {
                return normalized;
            }
        }

        return this.getImageFallbackPath();
    },

    hasRealImage(...candidates) {
        if (window.Assets?.hasRealImage) {
            return window.Assets.hasRealImage(...candidates);
        }

        return candidates.some(candidate => this.isUsableImagePath(candidate));
    },

    attachImageFallback(img, fallbackSrc = null) {
        if (window.Assets?.attachImageFallback) {
            window.Assets.attachImageFallback(img, fallbackSrc);
        }
    },

    setSafeImageSource(img, src, fallbackSrc = null) {
        if (window.Assets?.setSafeImageSource) {
            window.Assets.setSafeImageSource(img, src, fallbackSrc);
            return;
        }

        if (!img) return;
        img.src = this.resolveImagePath(src, fallbackSrc);
    }
};
