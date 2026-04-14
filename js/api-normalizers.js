window.ApiNormalizers = {
    extractAdventureIdFromRedirect(redirectValue = '') {
        const normalized = Utils.normalizeString(redirectValue);
        if (!normalized) return '';

        const withoutQuery = normalized.split('?')[0].split('#')[0];
        const lastSegment = withoutQuery.split('/').pop() || '';
        return Utils.normalizeString(lastSegment.replace(/\.json$/i, ''));
    },

    normalizeAdventure(rawData, fallbackId = '', fallbackSetKey = '') {
        const setup = rawData?.setup ?? {};
        const narrative = rawData?.narrative ?? {};
        const resolvedSet = rawData?.set ?? {
            id: fallbackSetKey || 'base_game',
            name: window.CONFIG?.getSetDisplayName?.(fallbackSetKey || 'base_game') || 'Aventuria Grundbox'
        };

        return {
            id: Utils.normalizeString(rawData?.id || fallbackId),
            name: Utils.normalizeString(rawData?.name || fallbackId),
            status: Utils.normalizeString(rawData?.status || ''),
            redirect_to: Utils.normalizeString(rawData?.redirect_to || ''),
            set: {
                id: Utils.normalizeString(resolvedSet?.id || fallbackSetKey || 'base_game'),
                name: Utils.normalizeString(
                    resolvedSet?.name ||
                    window.CONFIG?.getSetDisplayName?.(resolvedSet?.id || fallbackSetKey || 'base_game') ||
                    'Aventuria Grundbox'
                )
            },
            danger_calc: Number(rawData?.danger_calc ?? 0),
            narrative: {
                intro: Utils.normalizeString(narrative?.intro),
                checks: Utils.normalizeArray(narrative?.checks)
            },
            setup: {
                card_refs: setup?.card_refs ?? {},
                blue_cards: Utils.normalizeArray(setup?.blue_cards),
                minion_cards: Utils.normalizeArray(setup?.minion_cards),
                special_cards: Utils.normalizeArray(setup?.special_cards),
                victory: Utils.normalizeString(setup?.victory),
                defeat: Utils.normalizeString(setup?.defeat),
                start_value: Number(setup?.start_value ?? 0)
            },
            source: rawData?.source ?? {},
            notes: Utils.normalizeString(rawData?.notes ?? rawData?.note ?? '')
        };
    },

    normalizeAdventureIndexEntry(rawEntry, fallbackSetKey = '') {
        if (!rawEntry || typeof rawEntry !== 'object') return null;

        const id = Utils.normalizeString(rawEntry.id);
        if (!id) return null;

        const setId = Utils.normalizeString(rawEntry?.set?.id || rawEntry?.set_id || fallbackSetKey || 'base_game');

        return {
            id,
            name: Utils.normalizeString(rawEntry.name || id),
            status: Utils.normalizeString(rawEntry.status || 'canonical'),
            hidden: Boolean(rawEntry.hidden),
            order: Number(rawEntry.order ?? Number.MAX_SAFE_INTEGER),
            set: {
                id: setId,
                name: Utils.normalizeString(
                    rawEntry?.set?.name ||
                    window.CONFIG?.getSetDisplayName?.(setId) ||
                    setId
                ),
                shortName: Utils.normalizeString(
                    rawEntry?.set?.shortName ||
                    window.CONFIG?.getSetShortName?.(setId) ||
                    rawEntry?.set?.name ||
                    setId
                )
            }
        };
    },

    normalizeCatalogCard(rawData) {
        if (!rawData || typeof rawData !== 'object') return null;

        return {
            id: Utils.normalizeString(rawData.id),
            name: Utils.normalizeString(rawData.name),
            set: rawData.set ?? {
                id: 'base_game',
                name: window.CONFIG?.getSetDisplayName?.('base_game') || 'Aventuria Grundbox'
            },
            card_category: Utils.normalizeString(rawData.card_category),
            type: Utils.normalizeString(rawData.type),
            subtypes: Utils.normalizeArray(rawData.subtypes),
            status: Utils.normalizeString(rawData.status),
            adventure_refs: Utils.normalizeArray(rawData.adventure_refs).map(ref => {
                if (typeof ref === 'string') return Utils.normalizeString(ref);
                return ref?.id ? Utils.normalizeString(ref.id) : ref;
            }),
            images: rawData.images ?? { front: '', back: null, alt: [] },
            image: Utils.normalizeString(rawData?.images?.front || rawData?.image || ''),
            tags: Utils.normalizeArray(rawData.tags),
            custom_tags: Utils.normalizeArray(rawData.custom_tags),
            keywords: Utils.normalizeArray(rawData.keywords),
            search_text: Utils.normalizeString(rawData.search_text),
            stats: rawData.stats ?? {},
            rules: rawData.rules ?? {},
            source: rawData.source ?? {},
            note: Utils.normalizeString(rawData.note ?? rawData.notes ?? ''),
            notes: Utils.normalizeString(rawData.notes ?? rawData.note ?? '')
        };
    },

    normalizeCardPayload(rawData, adventureId = '') {
        return {
            adventure_id: Utils.normalizeString(rawData?.adventure_id || adventureId),
            adventure_name: Utils.normalizeString(rawData?.adventure_name || ''),
            cards: Utils.normalizeArray(rawData?.cards)
                .map(card => this.normalizeCatalogCard(card))
                .filter(Boolean)
        };
    }
};
