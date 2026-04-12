/**
 * js/api.js
 * Lädt Abenteuer- und Kartendaten und normalisiert sie auf ein flexibles Minimal-Schema.
 */
window.API = {
    getDefaultCard() {
        return {
            id: '',
            name: '',
            type: 'unknown',
            status: 'basic',
            adventure_id: null,
            set: 'base_game',
            sub_name: null,
            difficulty: null,
            image: '',
            thumb: null,
            tags: [],
            stats: {
                gp: null,
                lp: null,
                armor: null,
                evasion: null,
                actions: null,
                start_value: null,
                cost: null
            },
            rules: {
                passive: '',
                success: '',
                fail: '',
                timed_effects: [],
                milestones: [],
                action_table: [],
                draw_effect: '',
                flavor: ''
            },
            keywords: [],
            pool_refs: [],
            source: {
                book: null,
                page: null,
                note: ''
            },
            note: ''
        };
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeString(value, fallback = '') {
        return typeof value === 'string' ? value : fallback;
    },

    normalizeNullableString(value) {
        return typeof value === 'string' ? value : null;
    },

    normalizeIntOrNull(value) {
        if (value === null || value === undefined || value === '') return null;
        const parsed = parseInt(value, 10);
        return Number.isFinite(parsed) ? parsed : null;
    },

    normalizeMilestones(rawMilestones) {
        if (Array.isArray(rawMilestones)) {
            return rawMilestones.map(entry => ({
                value: this.normalizeIntOrNull(entry?.value),
                text: this.normalizeString(entry?.text)
            })).filter(entry => entry.value !== null && entry.text);
        }

        if (rawMilestones && typeof rawMilestones === 'object') {
            return Object.entries(rawMilestones).map(([key, text]) => ({
                value: this.normalizeIntOrNull(key),
                text: this.normalizeString(text)
            })).filter(entry => entry.value !== null && entry.text);
        }

        return [];
    },

    normalizeActionTable(rawTable) {
        return this.normalizeArray(rawTable).map(row => ({
            roll: this.normalizeString(row?.roll),
            title: this.normalizeString(row?.title),
            description: this.normalizeString(row?.description)
        })).filter(row => row.roll || row.title || row.description);
    },

    normalizeTimedEffects(rawEffects) {
        return this.normalizeArray(rawEffects).map(entry => ({
            trigger: this.normalizeString(entry?.trigger),
            text: this.normalizeString(entry?.text)
        })).filter(entry => entry.trigger || entry.text);
    },

    inferCardType(card) {
        if (card.type) return card.type;

        const id = this.normalizeString(card.id).toLowerCase();
        const name = this.normalizeString(card.name).toLowerCase();

        if (id.startsWith('zs_') || name.includes('zeitskala')) return 'timeline';
        if (id.startsWith('leader_') || id.startsWith('lg_') || name.includes('anführer')) return 'leader';
        if (id.startsWith('minion_')) return 'minion';
        if (id.startsWith('ha_') || name.includes('heldenaktion') || name.includes('handlung')) return 'hero_action';
        if (id.startsWith('special_') || id.startsWith('daemon_') || id.startsWith('demon_')) return 'special';
        if (id.startsWith('reward_')) return 'reward';
        if (id.startsWith('training_')) return 'training';
        if (id.startsWith('kg_')) return 'environment';

        return 'unknown';
    },

    normalizeCard(rawCard, fallbackAdventureId = null) {
        const base = this.getDefaultCard();

        const keywords = this.normalizeArray(rawCard?.keywords).map(value => this.normalizeString(value)).filter(Boolean);
        const tags = this.normalizeArray(rawCard?.tags).map(value => this.normalizeString(value)).filter(Boolean);

        const normalized = {
            ...base,
            id: this.normalizeString(rawCard?.id),
            name: this.normalizeString(rawCard?.name),
            type: this.inferCardType(rawCard),
            status: this.normalizeString(rawCard?.status || 'basic'),
            adventure_id: this.normalizeNullableString(rawCard?.adventure_id) || fallbackAdventureId,
            set: this.normalizeString(rawCard?.set || 'base_game'),
            sub_name: this.normalizeNullableString(rawCard?.sub_name),
            difficulty: this.normalizeNullableString(rawCard?.difficulty),
            image: this.normalizeString(rawCard?.image),
            thumb: this.normalizeNullableString(rawCard?.thumb),
            tags: tags.length ? tags : keywords,
            stats: {
                gp: this.normalizeIntOrNull(rawCard?.stats?.gp ?? rawCard?.gp),
                lp: this.normalizeIntOrNull(rawCard?.stats?.lp ?? rawCard?.lp),
                armor: this.normalizeIntOrNull(rawCard?.stats?.armor ?? rawCard?.armor),
                evasion: this.normalizeIntOrNull(rawCard?.stats?.evasion ?? rawCard?.evasion),
                actions: this.normalizeIntOrNull(rawCard?.stats?.actions ?? rawCard?.actions),
                start_value: this.normalizeIntOrNull(rawCard?.stats?.start_value ?? rawCard?.start_value),
                cost: this.normalizeIntOrNull(rawCard?.stats?.cost ?? rawCard?.cost)
            },
            rules: {
                passive: this.normalizeString(rawCard?.rules?.passive ?? rawCard?.passive_rules),
                success: this.normalizeString(rawCard?.rules?.success ?? rawCard?.success),
                fail: this.normalizeString(rawCard?.rules?.fail ?? rawCard?.fail),
                timed_effects: this.normalizeTimedEffects(rawCard?.rules?.timed_effects),
                milestones: this.normalizeMilestones(rawCard?.rules?.milestones ?? rawCard?.milestones),
                action_table: this.normalizeActionTable(rawCard?.rules?.action_table ?? rawCard?.action_table),
                draw_effect: this.normalizeString(rawCard?.rules?.draw_effect),
                flavor: this.normalizeString(rawCard?.rules?.flavor)
            },
            keywords,
            pool_refs: this.normalizeArray(rawCard?.pool_refs).map(value => this.normalizeString(value)).filter(Boolean),
            source: {
                book: this.normalizeNullableString(rawCard?.source?.book),
                page: this.normalizeIntOrNull(rawCard?.source?.page),
                note: this.normalizeString(rawCard?.source?.note)
            },
            note: this.normalizeString(rawCard?.note)
        };

        return normalized;
    },

    normalizeSetupArray(items) {
        if (!Array.isArray(items)) return [];

        return items.map(item => {
            if (typeof item === 'string') {
                return { id: item };
            }

            return {
                id: this.normalizeString(item?.id),
                label: this.normalizeString(item?.label || '')
            };
        }).filter(item => item.id);
    },

    normalizeAdventure(rawAdventure, path) {
        const fallbackId = this.normalizeString(path.split('/').pop());

        const normalized = {
            ...rawAdventure,
            id: this.normalizeString(rawAdventure?.id || fallbackId),
            name: this.normalizeString(rawAdventure?.name || fallbackId),
            danger_calc: this.normalizeIntOrNull(rawAdventure?.danger_calc) ?? 0,
            narrative: {
                intro: this.normalizeString(rawAdventure?.narrative?.intro),
                checks: this.normalizeArray(rawAdventure?.narrative?.checks).map(check => ({
                    id: this.normalizeString(check?.id || ''),
                    skill: this.normalizeString(check?.skill),
                    text: this.normalizeString(check?.text),
                    results: {
                        success: this.normalizeString(check?.results?.success),
                        fail: this.normalizeString(check?.results?.fail)
                    }
                }))
            },
            setup: {
                blue_cards: this.normalizeSetupArray(
                    rawAdventure?.setup?.blue_cards ?? rawAdventure?.setup?.blueCards ?? []
                ),
                minion_cards: this.normalizeSetupArray(
                    rawAdventure?.setup?.minion_cards ??
                    rawAdventure?.setup?.minionCards ??
                    rawAdventure?.setup?.minion_keywords ??
                    []
                ),
                special_cards: this.normalizeSetupArray(
                    rawAdventure?.setup?.special_cards ??
                    rawAdventure?.setup?.specialCards ??
                    rawAdventure?.setup?.special_decks ??
                    []
                ),
                victory: this.normalizeString(rawAdventure?.setup?.victory),
                defeat: this.normalizeString(rawAdventure?.setup?.defeat)
            }
        };

        return normalized;
    },

    normalizeCardPayload(rawPayload, fallbackAdventureId = null) {
        const cards = this.normalizeArray(rawPayload?.cards).map(card =>
            this.normalizeCard(card, fallbackAdventureId)
        );

        return {
            adventure_id: this.normalizeString(rawPayload?.adventure_id || fallbackAdventureId),
            adventure_name: this.normalizeString(rawPayload?.adventure_name),
            cards
        };
    },

    async getAdventure(path) {
        try {
            const res = await fetch(`data/adventures/${path}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const rawData = await res.json();
            return this.normalizeAdventure(rawData, path);
        } catch (err) {
            console.error('Fehler beim Laden des Abenteuers:', err);
            return null;
        }
    },

    async getCards(id) {
        try {
            const res = await fetch(`data/cards/base_game/${id}/${id}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const rawData = await res.json();
            return this.normalizeCardPayload(rawData, id);
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${id}"`, err);
            return this.normalizeCardPayload({ cards: [] }, id);
        }
    }
};
