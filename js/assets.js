window.Assets = {
    paths: {
        imageFallback: 'assets/images/placeholder.jpg',
        sharedCardPlaceholder: 'assets/images/cards/shared/card_placeholder.jpg',
        cardsRoot: 'assets/images/cards',
        manualsRoot: 'assets/images/manual',
        iconsRoot: 'assets/icons'
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    getImageFallbackPath() {
        return this.paths.imageFallback;
    },

    getSharedCardPlaceholderPath() {
        return this.paths.sharedCardPlaceholder;
    },

    isUsableImagePath(path) {
        const normalized = this.normalizeString(path);
        if (!normalized) return false;

        const lowered = normalized.toLowerCase();
        const blocked = [
            'null',
            'undefined',
            'false',
            'n/a',
            '-',
            this.paths.imageFallback.toLowerCase()
        ];

        return !blocked.includes(lowered);
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
        return candidates.some(candidate => this.isUsableImagePath(candidate));
    },

    attachImageFallback(img, fallbackSrc = null) {
        if (!img || img.dataset.fallbackBound === 'true') return;

        const resolvedFallback = this.resolveImagePath(
            fallbackSrc || this.getImageFallbackPath()
        );

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

        const resolvedFallback = this.resolveImagePath(
            fallbackSrc || this.getImageFallbackPath()
        );

        const resolvedSrc = this.isUsableImagePath(src)
            ? this.normalizeString(src)
            : resolvedFallback;

        img.dataset.fallbackApplied = 'false';
        this.attachImageFallback(img, resolvedFallback);
        img.src = resolvedSrc;
    }
};
