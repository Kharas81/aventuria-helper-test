window.Utils = {
    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
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

    getPlaceholderImage() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="420" height="600" viewBox="0 0 420 600">
                <rect width="100%" height="100%" rx="18" fill="#f3e7c8"/>
                <rect x="18" y="18" width="384" height="564" rx="14" fill="#faf4e3" stroke="#8b4513" stroke-width="4"/>
                <rect x="48" y="72" width="324" height="220" rx="12" fill="#e8dcc0" stroke="#8b4513" stroke-width="3"/>
                <text x="210" y="355" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#5e3312">Kein Bild</text>
                <text x="210" y="395" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#7a5536">Aventuria Abenteuer-Helfer</text>
            </svg>
        `;

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    },

    isUsableImagePath(value) {
        const normalized = this.normalizeString(value);
        if (!normalized) return false;

        return (
            normalized.startsWith('data:image/') ||
            normalized.startsWith('http://') ||
            normalized.startsWith('https://') ||
            normalized.startsWith('./') ||
            normalized.startsWith('../') ||
            normalized.startsWith('/') ||
            /\.(png|jpe?g|webp|gif|svg)$/i.test(normalized)
        );
    },

    resolveImagePath(value, fallback = '') {
        const normalized = this.normalizeString(value);
        if (!this.isUsableImagePath(normalized)) {
            return fallback || '';
        }
        return normalized;
    },

    getCardImagePath(card, options = {}) {
        const fallback = options.fallback || this.getPlaceholderImage();
        const status = this.normalizeString(card?.status);

        if (status === 'missing' || status === 'placeholder') {
            return fallback;
        }

        const candidate =
            card?.images?.front ||
            card?.image ||
            '';

        return this.resolveImagePath(candidate, fallback);
    },

    applyImageFallback(imgEl, fallbackSrc = '') {
        if (!imgEl) return;

        const resolvedFallback = this.resolveImagePath(fallbackSrc, this.getPlaceholderImage()) || this.getPlaceholderImage();

        if (!imgEl.dataset.fallbackBound) {
            imgEl.addEventListener('error', () => {
                if (imgEl.dataset.fallbackApplied === 'true') {
                    return;
                }

                imgEl.dataset.fallbackApplied = 'true';
                imgEl.src = resolvedFallback;
            });

            imgEl.dataset.fallbackBound = 'true';
        }

        if (!this.normalizeString(imgEl.getAttribute('src'))) {
            imgEl.dataset.fallbackApplied = 'true';
            imgEl.src = resolvedFallback;
        }
    },

    bindImageFallbacks(scope = document) {
        this.qsa('img[data-fallback-src]', scope).forEach(img => {
            const fallback = img.dataset.fallbackSrc || this.getPlaceholderImage();
            this.applyImageFallback(img, fallback);
        });
    }
};
