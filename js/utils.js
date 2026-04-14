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
        return 'assets/images/placeholder.jpg';
    },

    isUsableImagePath(path) {
        const normalized = this.normalizeString(path);
        if (!normalized) return false;

        const lowered = normalized.toLowerCase();

        if (
            lowered === 'null' ||
            lowered === 'undefined' ||
            lowered === 'false' ||
            lowered === 'n/a' ||
            lowered === '-' ||
            lowered === 'assets/images/placeholder.jpg'
        ) {
            return false;
        }

        return true;
    },

    resolveImagePath(...candidates) {
        for (const candidate of candidates) {
            const normalized = this.normalizeString(candidate);
            if (this.isUsableImagePath(normalized)) {
                return normalized;
            }
        }

        return this.getImageFallbackPath();
    },

    hasRealImage(...candidates) {
        for (const candidate of candidates) {
            if (this.isUsableImagePath(candidate)) {
                return true;
            }
        }

        return false;
    },

    attachImageFallback(img, fallbackSrc = null) {
        if (!img || img.dataset.fallbackBound === 'true') return;

        const resolvedFallback = this.resolveImagePath(fallbackSrc || this.getImageFallbackPath());

        img.addEventListener('error', () => {
            if (img.dataset.fallbackApplied === 'true') {
                return;
            }

            img.dataset.fallbackApplied = 'true';
            img.src = resolvedFallback;
        });

        img.dataset.fallbackBound = 'true';
    },

    setSafeImageSource(img, src, fallbackSrc = null) {
        if (!img) return;

        const resolvedFallback = this.resolveImagePath(fallbackSrc || this.getImageFallbackPath());
        const resolvedSrc = this.isUsableImagePath(src)
            ? this.normalizeString(src)
            : resolvedFallback;

        img.dataset.fallbackApplied = 'false';
        this.attachImageFallback(img, resolvedFallback);
        img.src = resolvedSrc;
    }
};
