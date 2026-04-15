import Utils from '../core/utils.js';
import RenderCommon from './common.js';

export const RenderCardDetail = {
    normalizeCardDetail(card) {
        const normalized = RenderCommon.normalizeCard(card);

        return {
            ...normalized,
            card_category: Utils.normalizeString(card?.card_category),
            subtypes: RenderCommon.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: Utils.normalizeString(card?.rules?.passive),
                success: Utils.normalizeString(card?.rules?.success),
                fail: Utils.normalizeString(card?.rules?.fail),
                draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
                flavor: Utils.normalizeString(card?.rules?.flavor),
                timed_effects: RenderCommon.normalizeArray(card?.rules?.timed_effects),
                milestones: RenderCommon.normalizeArray(card?.rules?.milestones),
                action_table: RenderCommon.normalizeArray(card?.rules?.action_table)
            },
            stats: {
                gp: card?.stats?.gp ?? null,
                lp: card?.stats?.lp ?? null,
                armor: card?.stats?.armor ?? null,
                evasion: card?.stats?.evasion ?? null,
                actions: card?.stats?.actions ?? null,
                start_value: card?.stats?.start_value ?? null,
                cost: card?.stats?.cost ?? null
            }
        };
    },

    renderStatsTable(stats) {
        const rows = [
            ['GP', stats?.gp],
            ['LP', stats?.lp],
            ['Rüstung', stats?.armor],
            ['Ausweichen', stats?.evasion],
            ['Aktionen', stats?.actions],
            ['Startwert', stats?.start_value],
            ['Kosten', stats?.cost]
        ].filter(([, value]) => value !== null && value !== undefined && value !== '');

        if (!rows.length) return '';

        return `
            <table class="detail-table">
                <tbody>
                    ${rows.map(([label, value]) => `
                        <tr>
                            <th>${Utils.escapeHtml(label)}</th>
                            <td>${Utils.escapeHtml(String(value))}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderRuleList(title, items, valueKey = 'text') {
        const safeItems = RenderCommon.normalizeArray(items).filter(Boolean);
        if (!safeItems.length) return '';

        return `
            <div class="rule-entry">
                <h4>${Utils.escapeHtml(title)}</h4>
                <ul>
                    ${safeItems.map(item => {
                        if (typeof item === 'string') {
                            return `<li>${Utils.escapeHtml(item)}</li>`;
                        }

                        const value = Utils.escapeHtml(item?.[valueKey] ?? '');
                        const prefix = item?.value !== undefined && item?.value !== null
                            ? `<strong>${Utils.escapeHtml(String(item.value))}:</strong> `
                            : item?.roll
                                ? `<strong>${Utils.escapeHtml(String(item.roll))}:</strong> `
                                : item?.title
                                    ? `<strong>${Utils.escapeHtml(String(item.title))}:</strong> `
                                    : '';

                        return `<li>${prefix}${value}</li>`;
                    }).join('')}
                </ul>
            </div>
        `;
    },

    renderActionTable(actionTable) {
        const rows = RenderCommon.normalizeArray(actionTable).filter(Boolean);
        if (!rows.length) return '';

        return `
            <div class="rule-entry">
                <h4>Aktionstabelle</h4>
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>Wurf</th>
                            <th>Titel</th>
                            <th>Beschreibung</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                <td>${Utils.escapeHtml(row?.roll ?? '')}</td>
                                <td>${Utils.escapeHtml(row?.title ?? '')}</td>
                                <td>${Utils.escapeHtml(row?.description ?? '')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    ensureCardDetailModal() {
        let modal = Utils.byId('card-detail-modal');

        if (modal) {
            return modal;
        }

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="modal-backdrop" id="card-detail-modal">
                <div class="modal-content">
                    <span class="close-modal" data-action="close-card-detail">&times;</span>
                    <div class="tab-content" id="card-detail-content"></div>
                </div>
            </div>
        `;

        modal = wrapper.firstElementChild;
        document.body.appendChild(modal);

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.closeCardDetail();
            }
        });

        return modal;
    },

    closeCardDetail() {
        const modal = Utils.byId('card-detail-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    openCardDetail(card) {
        const normalized = this.normalizeCardDetail(card);
        const modal = this.ensureCardDetailModal();
        const content = Utils.byId('card-detail-content');

        if (!modal || !content) return;

        const meta = [
            normalized.card_category && { label: 'Kategorie', value: normalized.card_category },
            normalized.type && { label: 'Typ', value: normalized.type },
            normalized.status && { label: 'Status', value: normalized.status },
            normalized.subtypes?.length && { label: 'Untertypen', value: normalized.subtypes.join(', ') },
            normalized.tags?.length && { label: 'Tags', value: normalized.tags.join(', ') },
            normalized.keywords?.length && { label: 'Keywords', value: normalized.keywords.join(', ') },
            normalized.source?.book && { label: 'Quelle', value: normalized.source.book },
            normalized.source?.page && { label: 'Seite', value: normalized.source.page }
        ].filter(Boolean);

        const metaHtml = meta.length
            ? `
                <dl class="ui-meta-list">
                    ${meta.map(item => `
                        <div class="ui-meta-list__row">
                            <dt class="ui-meta-list__label">${Utils.escapeHtml(item.label)}</dt>
                            <dd class="ui-meta-list__value">${Utils.escapeHtml(String(item.value))}</dd>
                        </div>
                    `).join('')}
                </dl>
            `
            : '';

        const imageHtml = normalized.hasRealImage
            ? `
                <div class="img-wrapper">
                    <img id="card-detail-image" class="manual-page-img" alt="${Utils.escapeHtml(normalized.name)}">
                </div>
            `
            : '';

        content.innerHTML = `
            <div class="reader-text">
                <h2>${Utils.escapeHtml(normalized.name)}</h2>
                ${imageHtml}
                ${metaHtml}
                ${this.renderStatsTable(normalized.stats)}

                ${normalized.rules.passive ? `<div class="rule-entry"><h4>Passiv</h4><p>${Utils.escapeHtml(normalized.rules.passive)}</p></div>` : ''}
                ${normalized.rules.success ? `<div class="rule-entry"><h4>Erfolg</h4><p>${Utils.escapeHtml(normalized.rules.success)}</p></div>` : ''}
                ${normalized.rules.fail ? `<div class="rule-entry"><h4>Misserfolg</h4><p>${Utils.escapeHtml(normalized.rules.fail)}</p></div>` : ''}
                ${normalized.rules.draw_effect ? `<div class="rule-entry"><h4>Zieheffekt</h4><p>${Utils.escapeHtml(normalized.rules.draw_effect)}</p></div>` : ''}
                ${this.renderRuleList('Zeiteffekte', normalized.rules.timed_effects)}
                ${this.renderRuleList('Meilensteine', normalized.rules.milestones)}
                ${this.renderActionTable(normalized.rules.action_table)}
                ${normalized.rules.flavor ? `<div class="rule-entry"><h4>Flavour</h4><p>${Utils.escapeHtml(normalized.rules.flavor)}</p></div>` : ''}
            </div>
        `;

        if (normalized.hasRealImage) {
            const image = Utils.byId('card-detail-image');
            Utils.setSafeImageSource(image, normalized.imageSrc);
        }

        modal.style.display = 'flex';
    }
};

export default RenderCardDetail;
