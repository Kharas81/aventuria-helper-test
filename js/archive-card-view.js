(function () {
  const state = {
    cards: [],
    filteredCards: []
  };

  const elements = {
    search: document.getElementById('archive-search'),
    filterType: document.getElementById('archive-filter-type'),
    filterSet: document.getElementById('archive-filter-set'),
    sort: document.getElementById('archive-sort'),
    resultsMeta: document.getElementById('archive-results-meta'),
    cardList: document.getElementById('archive-card-list'),
    detailOverlay: document.getElementById('archive-detail-overlay'),
    detailTitle: document.getElementById('archive-detail-title'),
    detailSubtitle: document.getElementById('archive-detail-subtitle'),
    detailContent: document.getElementById('archive-detail-content'),
    detailClose: document.getElementById('archive-detail-close')
  };

  function normalizeString(value) {
    return String(value ?? '').trim();
  }

  function normalizeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function normalizeCard(card, index) {
    const stats = card?.stats ?? {};
    const actionTable = normalizeArray(card?.actionTable);

    return {
      id: normalizeString(card?.id || `card_${index}`),
      name: normalizeString(card?.cardName || card?.name || 'Unbenannte Karte'),
      type: normalizeString(card?.cardType || card?.type || 'Unbekannter Typ'),
      setId: normalizeString(card?.setId),
      setName: normalizeString(card?.setShortName || card?.set || 'Unbekanntes Set'),
      setSymbol: normalizeString(card?.setSymbol),
      tags: normalizeArray(card?.tags).map(tag => normalizeString(tag)).filter(Boolean),
      keywords: normalizeArray(card?.keywords).map(keyword => normalizeString(keyword)).filter(Boolean),
      specialRules: normalizeArray(card?.specialRules).map(rule => normalizeString(rule)).filter(Boolean),
      copies: card?.copies ?? null,
      illustration: normalizeString(card?.illustration),
      stats: {
        gefahrenpunkte: stats?.gefahrenpunkte ?? '-',
        lebenspunkte: stats?.lebenspunkte ?? '-',
        ausweichen: stats?.ausweichen ?? '-',
        ruestung: stats?.ruestung ?? '-',
        aktionen: stats?.aktionen ?? '-'
      },
      actionTable: actionTable.map(action => ({
        range: normalizeString(action?.range),
        title: normalizeString(action?.title || 'Ohne Titel'),
        text: normalizeString(action?.text)
      })),
      actionTitles: actionTable
        .map(action => normalizeString(action?.title))
        .filter(Boolean),
      raw: card
    };
  }

  function uniqueSortedValues(cards, getValue) {
    return [...new Set(cards.map(getValue).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'de')
    );
  }

  function buildFilterOptions() {
    const typeValues = uniqueSortedValues(state.cards, card => card.type);
    const setValues = uniqueSortedValues(state.cards, card => card.setName);

    elements.filterType.innerHTML =
      '<option value="">Alle</option>' +
      typeValues
        .map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
        .join('');

    elements.filterSet.innerHTML =
      '<option value="">Alle</option>' +
      setValues
        .map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
        .join('');
  }

  function matchesSearch(card, searchTerm) {
    if (!searchTerm) {
      return true;
    }

    const haystack = [
      card.name,
      card.type,
      card.setName,
      ...card.tags,
      ...card.keywords,
      ...card.actionTitles
    ]
      .join(' ')
      .toLocaleLowerCase('de');

    return haystack.includes(searchTerm);
  }

  function sortCards(cards, sortValue) {
    const cloned = [...cards];

    cloned.sort((a, b) => {
      if (sortValue === 'name-desc') {
        return b.name.localeCompare(a.name, 'de');
      }

      if (sortValue === 'set-asc') {
        const setCompare = a.setName.localeCompare(b.setName, 'de');
        if (setCompare !== 0) {
          return setCompare;
        }
        return a.name.localeCompare(b.name, 'de');
      }

      if (sortValue === 'gp-desc') {
        return Number(b.stats.gefahrenpunkte || 0) - Number(a.stats.gefahrenpunkte || 0)
          || a.name.localeCompare(b.name, 'de');
      }

      if (sortValue === 'leben-desc') {
        return Number(b.stats.lebenspunkte || 0) - Number(a.stats.lebenspunkte || 0)
          || a.name.localeCompare(b.name, 'de');
      }

      return a.name.localeCompare(b.name, 'de');
    });

    return cloned;
  }

  function renderMeta() {
    const count = state.filteredCards.length;
    elements.resultsMeta.innerHTML = `<p><strong>${count}</strong> Karten gefunden</p>`;
  }

  function renderCards() {
    if (!state.filteredCards.length) {
      elements.cardList.innerHTML = `
        <div class="archive-empty">
          Keine Karten gefunden. Passe Suche oder Filter an.
        </div>
      `;
      return;
    }

    elements.cardList.innerHTML = state.filteredCards.map(card => {
      const tagsMarkup = card.tags.length
        ? card.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
        : '<span class="tag">keine Tags</span>';

      const actionsMarkup = card.actionTitles.length
        ? card.actionTitles.slice(0, 4).map(title => `<li>${escapeHtml(title)}</li>`).join('')
        : '<li>Keine Aktionen vorhanden</li>';

      return `
        <article class="archive-card" data-card-id="${escapeHtml(card.id)}">
          <div class="archive-card__header">
            <div class="archive-card__title-wrap">
              <h2 class="archive-card__title">${escapeHtml(card.name)}</h2>
              <p class="archive-card__subtitle">${escapeHtml(card.type)}</p>
            </div>

            <div class="archive-card__badges">
              <span class="badge badge--type">${escapeHtml(card.type)}</span>
              <span class="badge badge--set">${escapeHtml(card.setName)}</span>
            </div>
          </div>

          <div class="archive-card__body">
            <dl class="archive-card__stats">
              <div class="stat-box">
                <dt>GP</dt>
                <dd>${escapeHtml(card.stats.gefahrenpunkte)}</dd>
              </div>
              <div class="stat-box">
                <dt>Leben</dt>
                <dd>${escapeHtml(card.stats.lebenspunkte)}</dd>
              </div>
              <div class="stat-box">
                <dt>Rüstung</dt>
                <dd>${escapeHtml(card.stats.ruestung)}</dd>
              </div>
              <div class="stat-box">
                <dt>Aktionen</dt>
                <dd>${escapeHtml(card.stats.aktionen)}</dd>
              </div>
            </dl>

            <div class="archive-card__tags">
              ${tagsMarkup}
            </div>

            <div class="archive-card__actions-preview">
              <strong>Aktionen:</strong>
              <ul>
                ${actionsMarkup}
              </ul>
            </div>
          </div>

          <div class="archive-card__footer">
            <button
              class="archive-card__details-button"
              type="button"
              data-open-card-detail="${escapeHtml(card.id)}"
            >
              Details ansehen
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function applyFilters() {
    const searchTerm = normalizeString(elements.search?.value).toLocaleLowerCase('de');
    const selectedType = normalizeString(elements.filterType?.value);
    const selectedSet = normalizeString(elements.filterSet?.value);
    const sortValue = normalizeString(elements.sort?.value || 'name-asc');

    const filtered = state.cards.filter(card => {
      if (selectedType && card.type !== selectedType) {
        return false;
      }

      if (selectedSet && card.setName !== selectedSet) {
        return false;
      }

      if (!matchesSearch(card, searchTerm)) {
        return false;
      }

      return true;
    });

    state.filteredCards = sortCards(filtered, sortValue);
    renderMeta();
    renderCards();
  }

  function openDetail(cardId) {
    const card = state.cards.find(entry => entry.id === cardId);
    if (!card) {
      return;
    }

    elements.detailTitle.textContent = card.name;
    elements.detailSubtitle.textContent = `${card.type} · ${card.setName}`;

    const tagsMarkup = card.tags.length
      ? card.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
      : '<span class="tag">keine Tags</span>';

    const specialRulesMarkup = card.specialRules.length
      ? `<p><strong>Sonderregeln:</strong> ${escapeHtml(card.specialRules.join(', '))}</p>`
      : '<p><strong>Sonderregeln:</strong> keine</p>';

    const actionsMarkup = card.actionTable.length
      ? card.actionTable.map(action => `
          <article class="archive-action-row">
            <h4>${escapeHtml(action.range)} · ${escapeHtml(action.title)}</h4>
            <p>${escapeHtml(action.text || 'Kein Beschreibungstext vorhanden.')}</p>
          </article>
        `).join('')
      : '<p>Keine Aktionen vorhanden.</p>';

    elements.detailContent.innerHTML = `
      <div class="archive-detail-grid">
        <section class="archive-detail-meta">
          <p><strong>Typ:</strong> ${escapeHtml(card.type)}</p>
          <p><strong>Set:</strong> ${escapeHtml(card.setName)}</p>
          <p><strong>Set-ID:</strong> ${escapeHtml(card.setId || '-')}</p>
          <p><strong>Set-Symbol:</strong> ${escapeHtml(card.setSymbol || '-')}</p>
          <p><strong>Illustration:</strong> ${escapeHtml(card.illustration || '-')}</p>
          <p><strong>Kopien:</strong> ${escapeHtml(card.copies ?? '-')}</p>
          ${specialRulesMarkup}
        </section>

        <section class="archive-detail-stats">
          <h3>Werte</h3>
          <div class="archive-detail-stats-grid">
            <div class="stat-box">
              <dt>GP</dt>
              <dd>${escapeHtml(card.stats.gefahrenpunkte)}</dd>
            </div>
            <div class="stat-box">
              <dt>Leben</dt>
              <dd>${escapeHtml(card.stats.lebenspunkte)}</dd>
            </div>
            <div class="stat-box">
              <dt>Ausweichen</dt>
              <dd>${escapeHtml(card.stats.ausweichen)}</dd>
            </div>
            <div class="stat-box">
              <dt>Rüstung</dt>
              <dd>${escapeHtml(card.stats.ruestung)}</dd>
            </div>
            <div class="stat-box">
              <dt>Aktionen</dt>
              <dd>${escapeHtml(card.stats.aktionen)}</dd>
            </div>
          </div>
        </section>

        <section class="archive-detail-tags">
          <h3>Tags</h3>
          <div class="archive-card__tags">
            ${tagsMarkup}
          </div>
        </section>

        <section class="archive-detail-actions">
          <h3>Aktionstabelle</h3>
          ${actionsMarkup}
        </section>
      </div>
    `;

    elements.detailOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    elements.detailOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  function bindEvents() {
    elements.search?.addEventListener('input', applyFilters);
    elements.filterType?.addEventListener('change', applyFilters);
    elements.filterSet?.addEventListener('change', applyFilters);
    elements.sort?.addEventListener('change', applyFilters);

    elements.cardList?.addEventListener('click', event => {
      const button = event.target.closest('[data-open-card-detail]');
      if (!button) {
        return;
      }

      const cardId = button.getAttribute('data-open-card-detail');
      openDetail(cardId);
    });

    elements.detailClose?.addEventListener('click', closeDetail);

    elements.detailOverlay?.addEventListener('click', event => {
      if (event.target === elements.detailOverlay) {
        closeDetail();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && elements.detailOverlay && !elements.detailOverlay.hidden) {
        closeDetail();
      }
    });
  }

  function init(cards) {
    state.cards = normalizeArray(cards).map(normalizeCard);
    buildFilterOptions();
    applyFilters();
  }

  bindEvents();

  window.ArchiveCardView = {
    init,
    refresh(cards) {
      init(cards);
    }
  };
})();
