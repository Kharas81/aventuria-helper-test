# 🛡️ Aventuria Projekt-Backup - 4/14/2026, 7:50:49 AM

## 📄 Datei: css/base.css
```css
body {
    background: #dcd0ba radial-gradient(circle, #e6dec9 0%, #dcd0ba 100%);
    font-family: 'Georgia', 'Times New Roman', serif;
    color: #2e241f;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
}

.app-container {
    max-width: 1100px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.2);
    padding: 30px;
    border: 3px solid #5c1e1e;
    box-shadow: 0 0 25px rgba(0,0,0,0.2);
    border-radius: 4px;
}

header {
    text-align: center;
    border-bottom: 2px solid #8b4513;
    margin-bottom: 30px;
    padding-bottom: 15px;
}

h1 {
    color: #5c1e1e;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0;
}

.hidden { display: none; }
```

---

## 📄 Datei: css/components.css
```css
/* --- ALLGEMEINES LAYOUT & TOP-BAR --- */
.top-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.config-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* --- FORMULAR ELEMENTE --- */
input[type="number"],
select {
    padding: 8px;
    background: #f4e7d3;
    border: 1px solid #8b4513;
    font-family: inherit;
    border-radius: 4px;
    color: #2e241f;
}

/* --- BUTTON STYLES --- */
.btn,
.btn-outline {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    transition: all 0.2s ease;
}

.btn {
    background: #5c1e1e;
    color: white;
    border: none;
}

.btn:hover {
    background: #7a2828;
}

.btn-outline {
    background: none;
    border: 2px solid #8b4513;
    color: #8b4513;
}

.btn-outline:hover {
    background: #8b4513;
    color: white;
}

/* Kleine Buttons für Proben/Checks */
.btn-sm {
    padding: 6px 12px;
    font-size: 0.85em;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin-right: 5px;
}

.btn-sm.success {
    background: #276749;
    color: white;
}

.btn-sm.fail {
    background: #9b2c2c;
    color: white;
}

/* --- DER INFO-BUTTON (i) --- */
.info-btn {
    background: #8b4513;
    color: white;
    border: none;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    flex-shrink: 0;
}

.info-btn:hover:not(:disabled) {
    background: #5c1e1e;
    transform: scale(1.1);
}

.info-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
}

/* --- KARTEN-LISTEN & GRID --- */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 25px;
    margin-top: 20px;
}

.card-list {
    background: rgba(244, 231, 211, 0.9);
    padding: 20px;
    border: 1px solid #a0522d;
    border-radius: 8px;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
}

.card-list h3 {
    margin-top: 0;
    font-variant: small-caps;
    border-bottom: 1px solid #a0522d;
    padding-bottom: 8px;
}

#blue-cards h3 {
    color: #2c5282;
    border-bottom-color: #2c5282;
}

#special h3 {
    color: #276749;
    border-bottom-color: #276749;
}

.card-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.card-list li {
    margin-bottom: 12px;
}

/* --- CHECKLISTE --- */
.checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 0;
    line-height: 1.4;
    transition: transform 0.2s ease;
}

.checklist-item:hover {
    transform: translateX(5px);
}

.checklist-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    cursor: pointer;
    accent-color: #5c1e1e;
    flex-shrink: 0;
}

.checklist-item span {
    display: block;
    min-width: 0;
    word-break: break-word;
    flex: 1;
}

.checklist-item input:checked + span {
    text-decoration: line-through #5c1e1e 2px;
    color: #7a7a7a;
    opacity: 0.6;
}

.has-preview {
    color: #5c1e1e;
    cursor: help;
    font-weight: 500;
}

/* --- PROBEN FEEDBACK (INLINE) --- */
.check-result {
    margin-top: 10px;
    padding: 12px;
    border-radius: 4px;
    display: none;
    font-size: 0.9em;
    border-left: 5px solid #8b4513;
    background: rgba(255, 255, 255, 0.6);
    line-height: 1.4;
    color: #2e241f;
}

.check-result.show {
    display: block;
    animation: slideIn 0.3s ease-out;
}

.check-result.success {
    border-color: #276749;
}

.check-result.fail {
    border-color: #9b2c2c;
}

/* --- TOOLTIP / GROSSE VORSCHAU --- */
.card-tooltip {
    position: fixed;
    display: none;
    z-index: 9999;
    width: 450px;
    max-width: min(450px, 90vw);
    border: 5px solid #5c1e1e;
    border-radius: 12px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.6);
    background: #000;
    overflow: hidden;
}

.card-tooltip .tooltip-inner {
    width: 100%;
    max-height: calc(100vh - 24px);
    overflow: auto;
}

.card-tooltip img {
    width: 100%;
    display: block;
    border-radius: 7px;
}

/* --- ARCHIV GRID --- */
.archive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    padding: 20px;
    align-items: start;
}

.archive-card {
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    background: rgba(255,255,255,0.35);
    border: 1px solid rgba(139, 69, 19, 0.2);
    border-radius: 8px;
    padding: 10px;
    min-height: 100%;
    box-sizing: border-box;
}

.archive-card:hover {
    transform: translateY(-5px);
}

.archive-card img {
    width: 100%;
    aspect-ratio: 5 / 7;
    object-fit: cover;
    border: 2px solid #8b4513;
    border-radius: 5px;
    background: #fff;
}

.archive-card p {
    font-size: 0.85em;
    margin-top: 8px;
    margin-bottom: 0;
    font-weight: bold;
    color: #5c1e1e;
    word-break: break-word;
}

/* --- DANGER / HINWEISE --- */
#danger-value {
    font-size: 1.15em;
    color: #5c1e1e;
    margin-bottom: 15px;
    padding: 10px;
    background: rgba(92, 30, 30, 0.05);
    border-radius: 4px;
}

hr {
    border: 0;
    border-top: 1px solid #a0522d;
    margin: 20px 0;
}

/* --- ANIMATIONEN --- */
@keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* --- RESPONSIVE FEINSCHLIFF --- */
@media (max-width: 900px) {
    .grid-container {
        grid-template-columns: 1fr;
    }

    .archive-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;
        padding: 12px;
    }
}

@media (max-width: 700px) {
    .top-bar {
        gap: 16px;
    }

    .button-group {
        width: 100%;
        justify-content: center;
    }

    .config-item {
        flex-wrap: wrap;
        justify-content: center;
    }

    .card-list {
        padding: 16px;
    }

    .checklist-item {
        gap: 10px;
        padding: 10px 0;
    }

    .archive-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        padding: 8px;
    }

    .archive-card {
        padding: 8px;
    }

    .card-tooltip {
        max-width: calc(100vw - 24px);
        border-width: 3px;
        border-radius: 10px;
    }
}

@media (max-width: 480px) {
    .btn,
    .btn-outline {
        width: 100%;
        box-sizing: border-box;
    }

    .archive-grid {
        grid-template-columns: 1fr;
    }

    .info-btn {
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
    }
}

```

---

## 📄 Datei: css/features.css
```css
/* --- SEKTIONS-STEUERUNG (Ein/Ausblenden) --- */
.hidden-section {
    display: none;
    margin-top: 20px;
    padding: 20px;
    border: 1px dashed #8b4513;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    animation: fadeIn 0.3s ease-in-out;
}

.hidden-section.show {
    display: block;
}

.toggle-section {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 30px;
    flex-wrap: wrap;
}

/* --- PHASEN-TRACKER --- */
.phase-steps {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 20px 0;
    gap: 10px;
}

.step {
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #8b4513;
    border-radius: 20px;
    font-size: 0.85em;
    font-weight: bold;
    opacity: 0.3;
    transition: all 0.4s ease;
}

.step.active {
    opacity: 1;
    background: #5c1e1e;
    color: white;
    border-color: #5c1e1e;
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(92, 30, 30, 0.3);
}

/* --- HELDEN-DASHBOARD --- */
.hero-dashboard {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    flex-wrap: wrap;
}

.hero-card {
    background: #f4e7d3;
    border: 1px solid #8b4513;
    border-top: 6px solid #5c1e1e;
    padding: 15px;
    min-width: 160px;
    border-radius: 4px;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.1);
    text-align: center;
}

.hero-card h4 {
    margin: 0 0 10px 0;
    color: #5c1e1e;
    font-variant: small-caps;
}

.stat {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.2em;
    font-weight: bold;
}

.stat button {
    background: #8b4513;
    color: white;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

/* --- STORY / PROBEN --- */
.story-text {
    line-height: 1.6;
    margin-bottom: 20px;
}

.probes-area {
    margin-top: 20px;
}

.probe-item {
    padding: 15px;
    margin-bottom: 15px;
    background: rgba(255,255,255,0.35);
    border-left: 4px solid #8b4513;
    border-radius: 4px;
}

.probe-item p {
    margin: 0 0 10px 0;
}

.probe-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

/* --- ATEMPAUSE BEREICH --- */
.intermission-area {
    margin-top: 60px;
    display: flex;
    justify-content: center;
}

.intermission-card {
    background: linear-gradient(145deg, #f4e7d3, #e6dec9);
    border: 2px solid #8b4513;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 450px;
}

.intermission-card h3 {
    margin-top: 0;
    color: #5c1e1e;
    font-size: 1.5em;
}

.result-badge {
    margin-top: 20px;
    font-size: 2em;
    color: #5c1e1e;
    font-weight: bold;
    background: rgba(255,255,255,0.5);
    display: inline-block;
    padding: 5px 20px;
    border-radius: 8px;
    border: 1px solid #8b4513;
}

/* --- ANIMATIONEN --- */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

```

---

## 📄 Datei: css/modal.css
```css
/* --- MODAL BASIS --- */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 12px;
    box-sizing: border-box;
}

.modal-content {
    background: #f4e7d3;
    width: 95vw;
    max-width: 1200px;
    height: 90vh;
    border: 3px solid #5c1e1e;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 50px rgba(0,0,0,0.5);
    overflow: hidden;
}

/* Spezielle Breite für das Archiv */
.archive-modal-size {
    max-width: 1400px;
}

.close-modal {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 2.5em;
    line-height: 1;
    cursor: pointer;
    color: #5c1e1e;
    z-index: 100;
}

/* --- LAYOUT AUFTEILUNG (Sidebar & Main) --- */
.modal-layout {
    display: flex;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.modal-sidebar {
    width: 280px;
    min-width: 240px;
    background: #e6dec9;
    border-right: 2px solid #8b4513;
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
}

.modal-sidebar h4 {
    margin-top: 0;
    color: #5c1e1e;
    border-bottom: 2px solid #8b4513;
    padding-bottom: 5px;
    font-variant: small-caps;
}

.modal-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.modal-sidebar li {
    padding: 10px 8px;
    border-bottom: 1px solid rgba(139, 69, 19, 0.1);
    font-size: 0.9em;
    cursor: pointer;
    transition: background 0.2s ease;
    word-break: break-word;
}

.modal-sidebar li:hover {
    background: #dcd0ba;
    font-weight: bold;
}

.modal-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f4e7d3;
    min-width: 0;
    min-height: 0;
}

.modal-nav {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background: #dcd0ba;
    border-bottom: 2px solid #8b4513;
    gap: 15px;
    flex-wrap: wrap;
}

.modal-nav h2 {
    margin: 0;
    color: #5c1e1e;
    font-size: 1.3rem;
}

.tab-btn {
    background: #f4e7d3;
    border: 1px solid #8b4513;
    padding: 8px 20px;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    border-radius: 4px;
}

.tab-btn.active {
    background: #5c1e1e;
    color: white;
    border-color: #5c1e1e;
}

.tab-content {
    flex: 1;
    padding: 25px;
    overflow-y: auto;
    min-height: 0;
    box-sizing: border-box;
}

/* --- READER & BILDANZEIGE (Regelbuch) --- */
.reader-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
}

.reader-page {
    flex: 1;
    overflow-y: auto;
    padding-right: 15px;
}

.reader-text {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #2e241f;
    max-width: 850px;
    margin: 0 auto;
    word-break: break-word;
}

.img-wrapper {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 25px auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.manual-page-img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid #8b4513;
}

.reader-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 15px 0;
    margin-top: 10px;
    border-top: 2px solid #8b4513;
    flex-wrap: wrap;
}

.reader-footer button {
    background: #8b4513;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
}

/* --- KODEX SUCHE --- */
.search-bar {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 2px solid #8b4513;
    box-sizing: border-box;
    background: #fffdf8;
    color: #2e241f;
    font-family: inherit;
}

.rule-entry {
    background: rgba(255, 255, 255, 0.4);
    padding: 15px;
    margin-bottom: 15px;
    border-left: 5px solid #5c1e1e;
    border-radius: 4px;
}

.rule-entry h4 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #5c1e1e;
}

/* --- ARCHIV SPEZIFISCH --- */
.archive-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
}

.placeholder-text {
    text-align: center;
    color: #8b4513;
    font-style: italic;
    margin-top: 50px;
    grid-column: 1 / -1;
}

.hidden {
    display: none;
}

/* --- RESPONSIVE FEINSCHLIFF --- */
@media (max-width: 1000px) {
    .modal-content {
        width: 98vw;
        height: 92vh;
    }

    .modal-sidebar {
        width: 240px;
        min-width: 220px;
        padding: 16px;
    }

    .tab-content {
        padding: 18px;
    }
}

@media (max-width: 820px) {
    .modal-backdrop {
        padding: 8px;
    }

    .modal-content {
        width: 100%;
        height: 95vh;
        border-width: 2px;
        border-radius: 8px;
    }

    .modal-layout {
        flex-direction: column;
    }

    .modal-sidebar {
        width: 100%;
        min-width: 0;
        max-height: 170px;
        border-right: none;
        border-bottom: 2px solid #8b4513;
        padding: 12px 14px;
    }

    .modal-sidebar ul {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .modal-sidebar li {
        border-bottom: none;
        background: rgba(255,255,255,0.35);
        border: 1px solid rgba(139, 69, 19, 0.18);
        border-radius: 6px;
        padding: 8px 10px;
        font-size: 0.85em;
    }

    .modal-main {
        min-height: 0;
    }

    .modal-nav {
        padding: 10px 14px;
        gap: 10px;
    }

    .tab-content {
        padding: 14px;
    }

    .close-modal {
        top: 8px;
        right: 14px;
        font-size: 2.2em;
    }
}

@media (max-width: 600px) {
    .modal-content {
        height: 96vh;
        border-radius: 6px;
    }

    .modal-nav {
        flex-direction: column;
        align-items: stretch;
    }

    .modal-nav h2 {
        font-size: 1.1rem;
    }

    .tab-btn {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
    }

    .tab-content {
        padding: 12px;
    }

    .reader-footer {
        flex-direction: column;
        align-items: stretch;
    }

    .reader-footer button {
        width: 100%;
    }

    .reader-footer span {
        text-align: center;
    }

    .search-bar {
        padding: 10px;
        font-size: 0.95rem;
    }

    .modal-sidebar {
        max-height: 145px;
    }
}

@media (max-width: 420px) {
    .modal-backdrop {
        padding: 4px;
    }

    .modal-content {
        border-radius: 4px;
        height: 97vh;
    }

    .modal-sidebar {
        padding: 10px;
        max-height: 135px;
    }

    .modal-sidebar h4 {
        font-size: 1rem;
    }

    .modal-sidebar li {
        font-size: 0.8em;
        padding: 7px 8px;
    }

    .close-modal {
        font-size: 2em;
        right: 10px;
    }

    .tab-content {
        padding: 10px;
    }

    .reader-text {
        font-size: 0.96rem;
        line-height: 1.55;
    }
}

```

---

## 📄 Datei: data/adventures/base_game/leute_die_nicht_spielen.json
```json
{
  "id": "leute_die_nicht_spielen",
  "name": "Leute, die nicht spielen",
  "status": "canonical",
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },

  "danger_calc": 4,

  "narrative": {
    "intro": "Chorhop, 1024 BF: Die Stadt ist bei Nacht ein gefährliches Pflaster. Ihr eskortiert das Glücks-Idol zum Spielhaus Karfunkel-Stein. Als ihr es betretet, beginnt die Statue plötzlich Goldstücke zu weinen...",
    "checks": [
      {
        "id": "will_check",
        "skill": "Willenskraft",
        "text": "Könnt ihr dem Bann des Glücks-Idols widerstehen?",
        "results": {
          "success": "Du kannst dich dem Einfluss vollständig widersetzen.",
          "fail": "Du verlierst 1W6 Lebenspunkte, bevor du den Bann brichst."
        }
      }
    ]
  },

  "setup": {
    "card_refs": {
      "blue_cards": [
        "zs_leute",
        "kg_risiko_gewinn",
        "lg_leute_idol",
        "ha_das_spiel_spielen"
      ],
      "minion_cards": [
        "minions_eurer_wahl"
      ],
      "special_cards": [
        "special_ereignisse",
        "special_anfuehrer_aktionen"
      ]
    },

    "blue_cards": [
      { "id": "zs_leute" },
      { "id": "kg_risiko_gewinn" },
      { "id": "lg_leute_idol" },
      { "id": "ha_das_spiel_spielen" }
    ],

    "minion_cards": [
      { "id": "minions_eurer_wahl", "label": "Schergen eurer Wahl" }
    ],

    "special_cards": [
      { "id": "special_ereignisse", "label": "Ereignisse" },
      { "id": "special_anfuehrer_aktionen", "label": "Anführer-Aktionen" }
    ],

    "victory": "Aktion 'Das Spiel beenden' erfolgreich durchgeführt.",
    "defeat": "Letzte Zeitmarke entfernt, während Kampf noch läuft."
  },

  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": 19,
    "note": "Kanonische Abenteuerdatei für die langfristige Migration. Karten werden schrittweise in Einzeldateien überführt."
  },

  "notes": "Diese Datei ist die führende Abenteuerquelle. Kartenlogik wird nicht mehr in konkurrierenden Abenteuerdateien gepflegt, sondern über card_refs und den Kartenkatalog referenziert."
}

```

---

## 📄 Datei: data/adventures/base_game/leute_nicht_spielen.json
```json
{
  "id": "leute_nicht_spielen",
  "name": "Leute, die nicht spielen",
  "status": "deprecated_alias",
  "redirect_to": "data/adventures/base_game/leute_die_nicht_spielen.json",
  "note": "Diese Datei ist nur noch ein Altname/Kompatibilitätseintrag. Die kanonische Abenteuerdatei ist data/adventures/base_game/leute_die_nicht_spielen.json. Pflege und Änderungen nur noch dort vornehmen.",

  "narrative": {
    "intro": "DEPRECATED_ALIAS",
    "checks": []
  },

  "setup": {
    "blue_cards": [],
    "minion_cards": [],
    "special_cards": [],
    "victory": "Siehe kanonische Datei.",
    "defeat": "Siehe kanonische Datei."
  }
}

```

---

## 📄 Datei: data/adventures/base_game/silvanas_befreiung.json
```json
{
  "id": "silvanas_befreiung",
  "name": "Silvanas Befreiung",
  "danger_calc": 5,
  "expansion": "Grundbox [cite: 146]",
  "narrative": {
    "intro": "Euer Freund Alrik hat euch herbeigerufen... Hinter der Tür blickt ihr in das Gesicht eines Kobolds... [cite: 715-718]",
    "checks": [
      {
        "id": "chase_goblins",
        "skill": "Körperbeherrschung [cite: 722]",
        "text": "Die Goblins ergreifen die Flucht! Setzt ihnen nach.",
        "results": {
          "success": "Ein Goblin weniger im Kampf [cite: 725-726].",
          "fail": "Füge 'Feiger Goblin' zum Schergendeck hinzu [cite: 727-729]."
        }
      }
    ]
  },
  "setup": {
    "blue_cards": [
      { "id": "zs_silvana" },
      { "id": "ha_namen_erraten" },
      { "id": "leader_kobold" }
    ],
    "minion_cards": [
      { "id": "minion_pirat", "label": "Pirat" },
      { "id": "minion_ork", "label": "Ork" },
      { "id": "minion_feiger_goblin", "label": "Feiger Goblin (falls benötigt)" }
    ],
    "special_cards": [],
    "victory": "Alle Gegner besiegt oder vertrieben[cite: 774].",
    "defeat": "Verderbensmarken = Anzahl Helden[cite: 773]."
  }
}

```

---

## 📄 Datei: data/adventures/base_game/wildenstein_akt_1.json
```json
{
  "id": "wildenstein_akt_1",
  "name": "Das Erbe von Wildenstein - Akt I",
  "danger_calc": 5,
  "narrative": {
    "intro": "In Perainefurten erreicht euch ein Brief eurer Mutter: Ihr sollt das Erbe des verstorbenen Barons Wildenstein antreten. Doch der Weg dorthin ist gefährlich und führt durch die Schattenlande... [cite: 837-854]",
    "checks": [
      {
        "id": "scout",
        "skill": "Sinnesschärfe",
        "text": "Ihr erreicht eine Furt. Ist dort ein Hinterhalt? [cite: 872-874]",
        "results": {
          "success": "Du reagierst blitzschnell! Starte mit +1 Handkarte. [cite: 875]",
          "fail": "Du wirst überrascht! Starte mit -1 Handkarte. [cite: 877]"
        }
      }
    ]
  },
  "setup": {
    "blue_cards": [
      { "id": "zs_wildenstein_1" },
      { "id": "leader_greifbart_gichthain" },
      { "id": "story_erbe" }
    ],
    "minion_cards": [
      { "id": "minion_raeuber", "label": "Räuber" }
    ],
    "special_cards": [
      { "id": "special_ereignisse_allgemein", "label": "Ereignisse: Allgemein" },
      { "id": "special_ereignisse_gewaesser", "label": "Ereignisse: Gewässer" },
      { "id": "special_ereignisse_wald", "label": "Ereignisse: Wald" }
    ],
    "victory": "Alle Gegner besiegt UND der Erbe lebt noch. [cite: 889]",
    "defeat": "Der Erbe wird ausgeschaltet. [cite: 888]"
  }
}

```

---

## 📄 Datei: data/adventures/base_game/wildenstein_akt_2.json
```json
{
  "id": "wildenstein_akt_2",
  "name": "Das Erbe von Wildenstein - Akt II",
  "danger_calc": 6,
  "narrative": {
    "intro": "Dorf Wildenstein, im Spätherbst: Bei Sonnenaufgang werdet ihr durch den Ruf von Raben geweckt. Sie fliegen zur Burg, deren Silhouette bedrohlich auf einem fernen Fels thront. Ein Gefühl der Beklommenheit überkommt euch [cite: 906-909].",
    "checks": [
      {
        "id": "beklommenheit",
        "skill": "Willenskraft",
        "text": "Könnt ihr der Beklommenheit widerstehen?",
        "results": {
          "success": "Du schöpfst Mut (+1 Schicksalspunkt) [cite: 911].",
          "fail": "Du bist nervös und zweifelnd (Lege 1 Schicksalspunkt ab)[cite: 913]."
        }
      },
      {
        "id": "reparaturen",
        "skill": "Handwerk",
        "text": "Helft den Dorfbewohnern bei Reparaturen.",
        "results": {
          "success": "Du erhältst ein Zwölfgötter-Amulett [cite: 922-924].",
          "fail": "Du stümperst herum und verlierst 1W6 LP [cite: 925-926]."
        }
      }
    ]
  },
  "setup": {
    "blue_cards": [
      { "id": "zs_wildenstein_2" },
      { "id": "leader_baron_von_wildenstein" },
      { "id": "ha_hypnose_brechen" }
    ],
    "minion_cards": [
      { "id": "minion_waechter", "label": "Wächter" },
      { "id": "minion_diener", "label": "Diener" }
    ],
    "special_cards": [
      { "id": "special_anfuehrer_aktionen_uebernatuerlich", "label": "Anführer-Aktionen: Übernatürlich" },
      { "id": "special_nekromantie", "label": "Nekromantie" }
    ],
    "victory": "Alle Gegner besiegt oder Baron vertrieben[cite: 958].",
    "defeat": "Der Erbe wird ausgeschaltet[cite: 957]."
  }
}

```

---

## 📄 Datei: data/adventures/base_game/wildenstein_akt_3.json
```json
{
  "id": "wildenstein_akt_3",
  "name": "Das Erbe von Wildenstein - Akt III",
  "danger_calc": 7,
  "narrative": {
    "intro": "Ihr habt den Geheimgang gefunden. Die Spuren des Barons führen in einen schaurigen Forst. Es ist genau die Art Wald in den Schattenlanden, vor der man euch immer gewarnt hat [cite: 975-987].",
    "checks": [
      {
        "id": "abseilen",
        "skill": "Körperbeherrschung",
        "text": "Seilt euch am Wehrgang in den Forst ab.",
        "results": {
          "success": "Du seilst dich erfolgreich ab [cite: 982].",
          "fail": "Du stürzt oder rutschst ab und verlierst LP [cite: 983-984]."
        }
      },
      {
        "id": "spuren_folgen",
        "skill": "Wildnisleben",
        "text": "Folgt den Spuren des Barons im Dickicht.",
        "results": {
          "success": "Du findest eine Abkürzung (+1 Schicksalspunkt) [cite: 990-992].",
          "fail": "Du verlierst die Spur (Zeitmarke wird entfernt) [cite: 995-996]."
        }
      }
    ]
  },
  "setup": {
    "blue_cards": [
      { "id": "zs_wildenstein_3" },
      { "id": "leader_grautax" },
      { "id": "demon_irrhalk" }
    ],
    "minion_cards": [
      { "id": "minion_skelett", "label": "Skelett" }
    ],
    "special_cards": [
      { "id": "special_anfuehrer_aktionen_nekromantie", "label": "Anführer-Aktionen: Nekromantie" },
      { "id": "special_untotenbeschwoerung", "label": "Ereignisse: Untotenbeschwörung" }
    ],
    "victory": "Grautax, der falsche Baron, wurde besiegt[cite: 1031].",
    "defeat": "Anzahl Verderbensmarken = Anzahl Helden[cite: 1030]."
  }
}

```

---

## 📄 Datei: data/cards/base_game/_template_adventure.json
```json
{
  "id": "abenteuer_id_hier_eintragen",
  "name": "Abenteuername hier eintragen",
  "danger_calc": 5,

  "narrative": {
    "intro": "Kurze Einleitung des Abenteuers. Was passiert? Warum sind die Helden hier?",
    "checks": [
      {
        "id": "check_1",
        "skill": "Mut",
        "text": "Die Helden müssen sich einer ersten Herausforderung stellen.",
        "results": {
          "success": "Die Helden bestehen die Probe und erhalten einen Vorteil.",
          "fail": "Die Helden scheitern und müssen die Konsequenzen tragen."
        }
      }
    ]
  },

  "setup": {
    "blue_cards": [
      {
        "id": "zs_beispiel"
      },
      {
        "id": "kg_beispiel"
      }
    ],

    "minion_cards": [
      {
        "id": "minion_beispiel"
      }
    ],

    "special_cards": [
      {
        "id": "special_beispiel"
      }
    ],

    "victory": "Die Helden gewinnen, wenn sie den Anführer besiegen oder das Ziel des Abenteuers erreichen.",
    "defeat": "Die Helden verlieren, wenn alle Helden besiegt sind oder die Zeitskala 0 erreicht."
  }
}

```

---

## 📄 Datei: data/cards/base_game/_template_adventure_cards.json
```json
{
  "adventure_id": "abenteuer_id_hier_eintragen",
  "adventure_name": "Abenteuername hier eintragen",
  "cards": [
    {
      "id": "zs_beispiel",
      "name": "Zeitskala Beispiel",
      "type": "timeline",
      "status": "raw",
      "adventure_id": "abenteuer_id_hier_eintragen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "zeitskala"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": null,
        "note": ""
      },
      "note": ""
    },
    {
      "id": "leader_beispiel",
      "name": "Anführer: Beispiel",
      "type": "leader",
      "status": "raw",
      "adventure_id": "abenteuer_id_hier_eintragen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": null,
        "note": ""
      },
      "note": ""
    },
    {
      "id": "ha_beispiel",
      "name": "Heldenaktion: Beispiel",
      "type": "hero_action",
      "status": "raw",
      "adventure_id": "abenteuer_id_hier_eintragen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "heldenaktion"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": null,
        "note": ""
      },
      "note": ""
    },
    {
      "id": "minion_beispiel",
      "name": "Beispiel-Scherge",
      "type": "minion",
      "status": "raw",
      "adventure_id": "abenteuer_id_hier_eintragen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": null,
        "note": ""
      },
      "note": ""
    },
    {
      "id": "special_beispiel",
      "name": "Spezialkarte oder Deck-Referenz Beispiel",
      "type": "special",
      "status": "raw",
      "adventure_id": "abenteuer_id_hier_eintragen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "spezial"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": null,
        "note": ""
      },
      "note": ""
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/_template_card.json
```json
{
  "id": "card_id_hier_eintragen",
  "name": "Kartenname hier eintragen",
  "type": "unknown",
  "status": "raw",
  "adventure_id": null,
  "set": "base_game",
  "sub_name": null,
  "difficulty": null,
  "image": "",
  "thumb": null,
  "tags": [],
  "stats": {
    "gp": null,
    "lp": null,
    "armor": null,
    "evasion": null,
    "actions": null,
    "start_value": null,
    "cost": null
  },
  "rules": {
    "passive": "",
    "success": "",
    "fail": "",
    "timed_effects": [],
    "milestones": [],
    "action_table": [],
    "draw_effect": "",
    "flavor": ""
  },
  "keywords": [],
  "pool_refs": [],
  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": null,
    "note": ""
  },
  "note": ""
}

```

---

## 📄 Datei: data/cards/base_game/catalog/_template_card.json
```json
{
  "id": "card_id_hier_eintragen",
  "name": "Kartenname hier eintragen",

  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },

  "card_category": "unknown",
  "type": "unknown",
  "subtypes": [],

  "status": "raw",

  "adventure_refs": [],

  "images": {
    "front": "",
    "back": null,
    "alt": []
  },

  "tags": [],
  "custom_tags": [],
  "keywords": [],

  "search_text": "",

  "stats": {
    "gp": null,
    "lp": null,
    "armor": null,
    "evasion": null,
    "actions": null,
    "start_value": null,
    "cost": null
  },

  "rules": {
    "passive": "",
    "success": "",
    "fail": "",
    "timed_effects": [],
    "milestones": [],
    "action_table": [],
    "draw_effect": "",
    "flavor": ""
  },

  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": null,
    "note": ""
  },

  "notes": ""
}

```

---

## 📄 Datei: data/cards/base_game/catalog/ha_das_spiel_spielen.json
```json
{
  "id": "ha_das_spiel_spielen",
  "name": "Heldenaktion: Das Spiel spielen",

  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },

  "card_category": "abenteuerkarte",
  "type": "hero_action",
  "subtypes": [
    "Heldenaktion"
  ],

  "status": "raw",

  "adventure_refs": [
    {
      "id": "leute_die_nicht_spielen",
      "name": "Leute, die nicht spielen"
    }
  ],

  "images": {
    "front": "",
    "back": null,
    "alt": []
  },

  "tags": [
    "abenteuerkarte",
    "heldenaktion",
    "gluecksspiel",
    "interaktion"
  ],

  "custom_tags": [
    "chorhop",
    "karfunkel-stein",
    "spielhaus"
  ],

  "keywords": [
    "Das Spiel spielen"
  ],

  "search_text": "Heldenaktion Das Spiel spielen Leute die nicht spielen Abenteuerkarte Glücksspiel Chorhop Karfunkel-Stein Spielhaus",

  "stats": {
    "gp": null,
    "lp": null,
    "armor": null,
    "evasion": null,
    "actions": null,
    "start_value": null,
    "cost": null
  },

  "rules": {
    "passive": "",
    "success": "",
    "fail": "",
    "timed_effects": [],
    "milestones": [],
    "action_table": [],
    "draw_effect": "",
    "flavor": "Die Heldenaktion gehört zum Kurzabenteuer 'Leute, die nicht spielen' und bildet einen zentralen Interaktionspunkt im Kampf gegen das Glücks-Idol."
  },

  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": 19,
    "note": "Im Kurzabenteuer 'Leute, die nicht spielen' als Heldenaktion referenziert. Genaue Regeln und Bilddatei später ergänzen."
  },

  "notes": "Platzhalter im neuen Einzelkartenformat. Sobald Bild oder vollständiger Kartentext vorliegt, Status auf 'playable' oder 'complete' erhöhen."
}

```

---

## 📄 Datei: data/cards/base_game/catalog/kg_risiko_gewinn.json
```json
{
  "id": "kg_risiko_gewinn",
  "name": "Kampfumgebung: Risiko und Gewinn",

  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },

  "card_category": "abenteuerkarte",
  "type": "environment",
  "subtypes": [
    "Kampfumgebung"
  ],

  "status": "raw",

  "adventure_refs": [
    {
      "id": "leute_die_nicht_spielen",
      "name": "Leute, die nicht spielen"
    }
  ],

  "images": {
    "front": "",
    "back": null,
    "alt": []
  },

  "tags": [
    "abenteuerkarte",
    "kampfumgebung",
    "gluecksspiel",
    "risiko"
  ],

  "custom_tags": [
    "chorhop",
    "karfunkel-stein"
  ],

  "keywords": [
    "Risiko",
    "Gewinn"
  ],

  "search_text": "Kampfumgebung Risiko und Gewinn Leute die nicht spielen Abenteuerkarte Glücksspiel Risiko Gewinn Chorhop Karfunkel-Stein",

  "stats": {
    "gp": null,
    "lp": null,
    "armor": null,
    "evasion": null,
    "actions": null,
    "start_value": null,
    "cost": null
  },

  "rules": {
    "passive": "",
    "success": "",
    "fail": "",
    "timed_effects": [],
    "milestones": [],
    "action_table": [],
    "draw_effect": "",
    "flavor": "Die Kampfumgebung gehört zum Kurzabenteuer 'Leute, die nicht spielen' und wird durch das Glücks-Idol in den Ablauf eingebunden."
  },

  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": 19,
    "note": "Im Kurzabenteuer 'Leute, die nicht spielen' als Kampfumgebung referenziert. Genaue Kartentexte und Bilddatei später ergänzen."
  },

  "notes": "Platzhalter im neuen Einzelkartenformat. Sobald Bild oder vollständiger Kartentext vorliegt, diese Datei von 'raw' auf 'playable' oder 'complete' hochziehen."
}

```

---

## 📄 Datei: data/cards/base_game/catalog/lg_leute_idol.json
```json
{
  "id": "lg_leute_idol",
  "name": "Glücks-Idol",

  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },

  "card_category": "abenteuerkarte",
  "type": "leader",
  "subtypes": [
    "Göttlich",
    "Dämon",
    "Übernatürlich"
  ],

  "status": "playable",

  "adventure_refs": [
    {
      "id": "leute_die_nicht_spielen",
      "name": "Leute, die nicht spielen"
    }
  ],

  "images": {
    "front": "assets/images/cards/base_game/leute_die_nicht_spielen/gluecks_idol.jpg",
    "back": null,
    "alt": []
  },

  "tags": [
    "abenteuerkarte",
    "anfuehrer",
    "goettlich",
    "daemon",
    "uebernatuerlich",
    "wuerfelmechanik",
    "schergen",
    "zufall"
  ],

  "custom_tags": [
    "idol",
    "gluecksspiel",
    "chorhop",
    "karfunkel-stein"
  ],

  "keywords": [
    "Spannung",
    "Glückssache",
    "Glücksspiel",
    "Entspannung",
    "Unterhaltung"
  ],

  "search_text": "Glücks-Idol Leute die nicht spielen Anführer Abenteuerkarte göttlich dämon übernatürlich Spannung Glückssache Glücksspiel Entspannung Unterhaltung zusätzlicher Scherge Held Einsatz erhöhen Risiko und Gewinn",

  "stats": {
    "gp": null,
    "lp": null,
    "armor": null,
    "evasion": null,
    "actions": null,
    "start_value": null,
    "cost": null
  },

  "rules": {
    "passive": "Das Idol kann nicht zum Ziel von Angriffen werden. Das Wurfergebnis für seine Aktionen wird pro 🌀 auf dieser Karte um 1 gesenkt. Die 🌀 werden abgelegt, sobald der Aktionswurf „Spannung“ ergibt.",
    "success": "",
    "fail": "",
    "timed_effects": [],
    "milestones": [],
    "action_table": [
      {
        "roll": "1-5",
        "title": "Spannung",
        "description": "Es wird ein zusätzlicher Scherge gezogen und rechts an die Schergenreihe angelegt."
      },
      {
        "roll": "6-8",
        "title": "Glückssache",
        "description": "Ein zufälliger Held muss die „Heldenaktion: Den Einsatz erhöhen“ ausführen."
      },
      {
        "roll": "9",
        "title": "Glücksspiel",
        "description": "Alle Helden führen einen Wurf für die „Kampfumgebung: Risiko und Gewinn“ aus."
      },
      {
        "roll": "10-12",
        "title": "Entspannung",
        "description": "Jedem Schergen werden 5 🩸 geheilt."
      },
      {
        "roll": "13-20",
        "title": "Unterhaltung",
        "description": "Das Idol tanzt."
      }
    ],
    "draw_effect": "",
    "flavor": "Im Abenteuer 'Leute, die nicht spielen' ist das Glücks-Idol der zentrale Gegner und Auslöser des chaotischen Kampfgeschehens."
  },

  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": 19,
    "note": "Kurzabenteuer 'Leute, die nicht spielen'. Detailregel und Aktionszeilen aus bestehender Projektdatei übernommen; Abenteuerkontext durch Regelheft bestätigt."
  },

  "notes": "Langfristige Einzelkarten-Datei. LP/Aktionen/Rüstung/Ausweichen können später ergänzt werden, sobald vollständige Kartenwerte oder bessere Bildquellen vorliegen."
}

```

---

## 📄 Datei: data/cards/base_game/catalog/zs_leute.json
```json
{
  "id": "zs_leute",
  "name": "Zeitskala",

  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },

  "card_category": "abenteuerkarte",
  "type": "timeline",
  "subtypes": [
    "Zeitskala"
  ],

  "status": "playable",

  "adventure_refs": [
    {
      "id": "leute_die_nicht_spielen",
      "name": "Leute, die nicht spielen"
    }
  ],

  "images": {
    "front": "assets/images/cards/base_game/leute_die_nicht_spielen/zs_leute.jpg",
    "back": null,
    "alt": []
  },

  "tags": [
    "abenteuerkarte",
    "zeitskala",
    "timer",
    "schergen",
    "ereigniskarte",
    "anfuehrer-aktionskarte",
    "niederlagebedingung"
  ],

  "custom_tags": [
    "countdown",
    "tempo",
    "druck"
  ],

  "keywords": [
    "Zeitmarken",
    "Ereigniskarte",
    "Anführer-Aktionskarte",
    "Schergenstapel",
    "Niederlage"
  ],

  "search_text": "Zeitskala Leute die nicht spielen Abenteuerkarte timeline Zeitmarken Ereigniskarte Anführer-Aktionskarte Schergenstapel Niederlage Countdown Timer",

  "stats": {
    "gp": null,
    "lp": null,
    "armor": null,
    "evasion": null,
    "actions": null,
    "start_value": 6,
    "cost": null
  },

  "rules": {
    "passive": "",
    "success": "",
    "fail": "",
    "timed_effects": [],
    "milestones": [
      {
        "value": 5,
        "text": "Zieht eine Ereigniskarte."
      },
      {
        "value": 4,
        "text": "Zieht eine Anführer-Aktionskarte."
      },
      {
        "value": 3,
        "text": "Befinden sich 1 oder weniger Schergen im Spiel, zieht einen weiteren Schergen vom Schergenstapel und fügt ihn rechts an die Gegnerreihe an."
      },
      {
        "value": 2,
        "text": "Zieht sowohl eine Ereigniskarte als auch eine Anführer-Aktionskarte."
      },
      {
        "value": 1,
        "text": "Zieht einen weiteren Schergen vom Schergenstapel und fügt ihn rechts an die Gegnerreihe an."
      },
      {
        "value": 0,
        "text": "Wenn der Kampf zu diesem Zeitpunkt noch läuft, erleiden die Helden automatisch eine Niederlage."
      }
    ],
    "action_table": [],
    "draw_effect": "",
    "flavor": "Die Zeitskala steuert das Tempo des Kampfes und erhöht den Druck auf die Helden Runde für Runde."
  },

  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
    "page": 19,
    "note": "Kurzabenteuer 'Leute, die nicht spielen'. Startwert und Meilensteine aus bestehender Projektdatei übernommen."
  },

  "notes": "Langfristige Einzelkarten-Datei. Weitere Schwierigkeitsvarianten können später als eigene Karten oder als Variantenmodell ergänzt werden."
}

```

---

## 📄 Datei: data/cards/base_game/leute_die_nicht_spielen/leute_die_nicht_spielen.json
```json
{
  "adventure_id": "leute_die_nicht_spielen",
  "adventure_name": "Leute, die nicht spielen",
  "migration_status": "catalog_source_of_truth",
  "note": "Kompatibilitätsdatei für die laufende Migration. Die eigentliche Datenquelle sind jetzt die Einzelkarten unter data/cards/base_game/catalog/ und der Master-Index master_base_game.json.",
  "cards": [
    {
      "id": "lg_leute_idol",
      "name": "Glücks-Idol",
      "type": "leader",
      "status": "migrated",
      "adventure_id": "leute_die_nicht_spielen",
      "set": "base_game",
      "sub_name": "Spezial-Gegner",
      "difficulty": null,
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/gluecks_idol.jpg",
      "thumb": null,
      "tags": [
        "abenteuerkarte",
        "anfuehrer",
        "goettlich",
        "daemon",
        "uebernatuerlich"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "Migriert in Einzelkarten-Datei.",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [
        "Spannung",
        "Glückssache",
        "Glücksspiel",
        "Entspannung",
        "Unterhaltung"
      ],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 19,
        "note": "Quelle im neuen Katalog: data/cards/base_game/catalog/lg_leute_idol.json"
      },
      "note": "Kompatibilitätseintrag. Inhaltliche Pflege nur noch in der Einzelkarten-Datei."
    },
    {
      "id": "zs_leute",
      "name": "Zeitskala",
      "type": "timeline",
      "status": "migrated",
      "adventure_id": "leute_die_nicht_spielen",
      "set": "base_game",
      "sub_name": "Leute, die nicht spielen",
      "difficulty": "normal",
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/zs_leute.jpg",
      "thumb": null,
      "tags": [
        "abenteuerkarte",
        "zeitskala",
        "timer"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": 6,
        "cost": null
      },
      "rules": {
        "passive": "Migriert in Einzelkarten-Datei.",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [
        "Zeitmarken",
        "Ereigniskarte",
        "Anführer-Aktionskarte",
        "Schergenstapel",
        "Niederlage"
      ],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 19,
        "note": "Quelle im neuen Katalog: data/cards/base_game/catalog/zs_leute.json"
      },
      "note": "Kompatibilitätseintrag. Inhaltliche Pflege nur noch in der Einzelkarten-Datei."
    },
    {
      "id": "kg_risiko_gewinn",
      "name": "Kampfumgebung: Risiko und Gewinn",
      "type": "environment",
      "status": "migrated",
      "adventure_id": "leute_die_nicht_spielen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "abenteuerkarte",
        "kampfumgebung",
        "gluecksspiel",
        "risiko"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "Migriert in Einzelkarten-Datei.",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [
        "Risiko",
        "Gewinn"
      ],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 19,
        "note": "Quelle im neuen Katalog: data/cards/base_game/catalog/kg_risiko_gewinn.json"
      },
      "note": "Kompatibilitätseintrag. Inhaltliche Pflege nur noch in der Einzelkarten-Datei."
    },
    {
      "id": "ha_das_spiel_spielen",
      "name": "Heldenaktion: Das Spiel spielen",
      "type": "hero_action",
      "status": "migrated",
      "adventure_id": "leute_die_nicht_spielen",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "abenteuerkarte",
        "heldenaktion",
        "gluecksspiel",
        "interaktion"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "Migriert in Einzelkarten-Datei.",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [
        "Das Spiel spielen"
      ],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 19,
        "note": "Quelle im neuen Katalog: data/cards/base_game/catalog/ha_das_spiel_spielen.json"
      },
      "note": "Kompatibilitätseintrag. Inhaltliche Pflege nur noch in der Einzelkarten-Datei."
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/master_base_game.json
```json
{
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },
  "catalog_version": 2,
  "cards": [
    {
      "id": "lg_leute_idol",
      "name": "Glücks-Idol",
      "card_category": "abenteuerkarte",
      "type": "leader",
      "status": "playable",
      "adventure_refs": [
        "leute_die_nicht_spielen"
      ],
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/gluecks_idol.jpg",
      "tags": [
        "abenteuerkarte",
        "anfuehrer",
        "goettlich",
        "daemon",
        "uebernatuerlich",
        "wuerfelmechanik",
        "schergen",
        "zufall"
      ],
      "keywords": [
        "Spannung",
        "Glückssache",
        "Glücksspiel",
        "Entspannung",
        "Unterhaltung"
      ],
      "search_text": "Glücks-Idol Leute die nicht spielen Anführer Abenteuerkarte göttlich dämon übernatürlich Spannung Glückssache Glücksspiel Entspannung Unterhaltung zusätzlicher Scherge Held Einsatz erhöhen Risiko und Gewinn",
      "detail_path": "data/cards/base_game/catalog/lg_leute_idol.json",
      "note": "Einzelkarten-Datei migriert."
    },
    {
      "id": "zs_leute",
      "name": "Zeitskala",
      "card_category": "abenteuerkarte",
      "type": "timeline",
      "status": "playable",
      "adventure_refs": [
        "leute_die_nicht_spielen"
      ],
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/zs_leute.jpg",
      "tags": [
        "abenteuerkarte",
        "zeitskala",
        "timer",
        "schergen",
        "ereigniskarte",
        "anfuehrer-aktionskarte",
        "niederlagebedingung"
      ],
      "keywords": [
        "Zeitmarken",
        "Ereigniskarte",
        "Anführer-Aktionskarte",
        "Schergenstapel",
        "Niederlage"
      ],
      "search_text": "Zeitskala Leute die nicht spielen Abenteuerkarte timeline Zeitmarken Ereigniskarte Anführer-Aktionskarte Schergenstapel Niederlage Countdown Timer",
      "detail_path": "data/cards/base_game/catalog/zs_leute.json",
      "note": "Einzelkarten-Datei migriert."
    },
    {
      "id": "kg_risiko_gewinn",
      "name": "Kampfumgebung: Risiko und Gewinn",
      "card_category": "abenteuerkarte",
      "type": "environment",
      "status": "raw",
      "adventure_refs": [
        "leute_die_nicht_spielen"
      ],
      "image": "",
      "tags": [
        "abenteuerkarte",
        "kampfumgebung",
        "gluecksspiel",
        "risiko"
      ],
      "keywords": [
        "Risiko",
        "Gewinn"
      ],
      "search_text": "Kampfumgebung Risiko und Gewinn Leute die nicht spielen Abenteuerkarte Glücksspiel Risiko Gewinn Chorhop Karfunkel-Stein",
      "detail_path": "data/cards/base_game/catalog/kg_risiko_gewinn.json",
      "note": "Einzelkarten-Datei angelegt, Inhalte noch raw."
    },
    {
      "id": "ha_das_spiel_spielen",
      "name": "Heldenaktion: Das Spiel spielen",
      "card_category": "abenteuerkarte",
      "type": "hero_action",
      "status": "raw",
      "adventure_refs": [
        "leute_die_nicht_spielen"
      ],
      "image": "",
      "tags": [
        "abenteuerkarte",
        "heldenaktion",
        "gluecksspiel",
        "interaktion"
      ],
      "keywords": [
        "Das Spiel spielen"
      ],
      "search_text": "Heldenaktion Das Spiel spielen Leute die nicht spielen Abenteuerkarte Glücksspiel Chorhop Karfunkel-Stein Spielhaus",
      "detail_path": "data/cards/base_game/catalog/ha_das_spiel_spielen.json",
      "note": "Einzelkarten-Datei angelegt, Inhalte noch raw."
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/silvanas_befreiung/silvanas_befreiung.json
```json
{
  "adventure_id": "silvanas_befreiung",
  "adventure_name": "Silvanas Befreiung",
  "cards": [
    {
      "id": "zs_silvana",
      "name": "Zeitskala 'Silvanas Befreiung'",
      "type": "timeline",
      "status": "raw",
      "adventure_id": "silvanas_befreiung",
      "set": "base_game",
      "sub_name": "Silvanas Befreiung",
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "zeitskala",
        "abenteuerkarte"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 17,
        "note": "Zeitskala für das Kurzabenteuer Silvanas Befreiung, Details später von der Kartenabbildung/Originalkarte übernehmen."
      },
      "note": "Bild/Kartendaten noch ergänzen. Kann später in mehrere Schwierigkeitsvarianten aufgeteilt werden."
    },
    {
      "id": "ha_namen_erraten",
      "name": "Heldenaktion: Namen erraten",
      "type": "hero_action",
      "status": "basic",
      "adventure_id": "silvanas_befreiung",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "heldenaktion",
        "abenteuerkarte"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 7,
        "note": "Die Karte ist auf der Spielmaterial-Seite als Beispielabbildung zu sehen; Abenteuerbezug in Silvanas Befreiung."
      },
      "note": "Bild/Kartendaten noch ergänzen. Wirktext der Heldenaktion später direkt von der Karte übernehmen."
    },
    {
      "id": "leader_kobold",
      "name": "???, der Kobold",
      "type": "leader",
      "status": "basic",
      "adventure_id": "silvanas_befreiung",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer",
        "kobold",
        "uebernatuerlich"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 10,
        "note": "Anführerkarten-Beispiel zeigt ???, der Kobold mit Tabellen- und Anführerstruktur."
      },
      "note": "Bild/Kartendaten noch ergänzen. LP/Aktionen/Ausweichen/Rüstung und Aktionswürfe später übernehmen."
    },
    {
      "id": "minion_pirat",
      "name": "Pirat",
      "type": "minion",
      "status": "raw",
      "adventure_id": "silvanas_befreiung",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "pirat"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 18,
        "note": "Im Abenteuer Silvanas Befreiung als mögliche Schergen genannt."
      },
      "note": "Sammel-/Platzhalter-Eintrag. Einzelne Piratenkarten später genauer erfassen."
    },
    {
      "id": "minion_ork",
      "name": "Ork",
      "type": "minion",
      "status": "raw",
      "adventure_id": "silvanas_befreiung",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "ork"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 18,
        "note": "Im Abenteuer Silvanas Befreiung als mögliche Schergen genannt."
      },
      "note": "Sammel-/Platzhalter-Eintrag. Einzelne Ork-Schergen später genauer erfassen."
    },
    {
      "id": "minion_feiger_goblin",
      "name": "Feiger Goblin",
      "type": "minion",
      "status": "raw",
      "adventure_id": "silvanas_befreiung",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "goblin"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 17,
        "note": "Wird bei Misserfolg in der Erzählung als zusätzlicher Scherge erwähnt."
      },
      "note": "Optionaler Zusatz-Scherge. Später konkretisieren, falls mehrere Goblin-Karten infrage kommen."
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/wildenstein_akt_1/wildenstein_akt_1.json
```json
{
  "adventure_id": "wildenstein_akt_1",
  "adventure_name": "Das Erbe von Wildenstein - Akt I",
  "cards": [
    {
      "id": "zs_wildenstein_1",
      "name": "Zeitskala Wildenstein-I",
      "type": "timeline",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": "Wildenstein I",
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "zeitskala",
        "wildenstein",
        "abenteuerkarte"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Abenteuer 'Das Erbe von Wildenstein' beginnt auf Seite 20. Die Zeitskala selbst ist später aus Karte/Bild zu ergänzen."
      },
      "note": "Bild/Kartendaten noch ergänzen."
    },
    {
      "id": "leader_greifbart_gichthain",
      "name": "Anführer: Greifbart Gichthain",
      "type": "leader",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Greifbart Gichthain wird im Setup von Wildenstein Akt I als Anführer genannt."
      },
      "note": "Bild/Kartendaten noch ergänzen. LP/Aktionen/Ausweichen/Rüstung später übernehmen."
    },
    {
      "id": "story_erbe",
      "name": "Karte: Erbe",
      "type": "adventure_card",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "abenteuerkarte",
        "story",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Im Setup von Wildenstein Akt I als zusätzliche Karte genannt."
      },
      "note": "Bild/Kartendaten noch ergänzen."
    },
    {
      "id": "minion_raeuber",
      "name": "Räuber",
      "type": "minion",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "raeuber",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Im Setup von Wildenstein Akt I als Schergen-Schlagwort genannt."
      },
      "note": "Sammel-/Platzhalter-Eintrag. Einzelne Räuber-Schergen später genauer erfassen."
    },
    {
      "id": "special_ereignisse_allgemein",
      "name": "Ereignisse: Allgemein",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "ereignisse",
        "deck",
        "allgemein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Im Setup von Wildenstein Akt I als Spezialdeck referenziert."
      },
      "note": "Deck-Referenz, keine Einzelkarte. Später als Pool oder Deckliste ausbauen."
    },
    {
      "id": "special_ereignisse_gewaesser",
      "name": "Ereignisse: Gewässer",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "ereignisse",
        "deck",
        "gewaesser"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Im Setup von Wildenstein Akt I als Spezialdeck referenziert."
      },
      "note": "Deck-Referenz, keine Einzelkarte. Später als Pool oder Deckliste ausbauen."
    },
    {
      "id": "special_ereignisse_wald",
      "name": "Ereignisse: Wald",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_1",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "ereignisse",
        "deck",
        "wald"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 20,
        "note": "Im Setup von Wildenstein Akt I als Spezialdeck referenziert."
      },
      "note": "Deck-Referenz, keine Einzelkarte. Später als Pool oder Deckliste ausbauen."
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/wildenstein_akt_2/wildenstein_akt_2.json
```json
{
  "adventure_id": "wildenstein_akt_2",
  "adventure_name": "Das Erbe von Wildenstein - Akt II",
  "cards": [
    {
      "id": "zs_wildenstein_2",
      "name": "Zeitskala Wildenstein-II",
      "type": "timeline",
      "status": "raw",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": "Wildenstein II",
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "zeitskala",
        "wildenstein",
        "abenteuerkarte"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 21,
        "note": "Abenteuer 'Das Erbe von Wildenstein' Akt II. Zeitskalen-Details später direkt von Karte/Bild ergänzen."
      },
      "note": "Bild/Kartendaten noch ergänzen."
    },
    {
      "id": "leader_baron_von_wildenstein",
      "name": "Anführer: Baron von Wildenstein",
      "type": "leader",
      "status": "basic",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer",
        "baron",
        "wildenstein",
        "untoter"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 12,
        "note": "Auf der Beispielseite zum Auslegen von Anführern und Schergen wird der Baron von Wildenstein mit Kartenstruktur beschrieben."
      },
      "note": "Guter Kandidat für frühe Vervollständigung, da das Regelbuch bereits Beispielinfos zur Karte zeigt. Konkrete LP/Aktionen/Werte später aus Karte/Bild übernehmen."
    },
    {
      "id": "ha_hypnose_brechen",
      "name": "Handlung: Hypnose brechen",
      "type": "hero_action",
      "status": "raw",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "heldenaktion",
        "handlung",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 21,
        "note": "Im Setup von Wildenstein Akt II als Handlungskarte genannt."
      },
      "note": "Bild/Kartendaten noch ergänzen."
    },
    {
      "id": "minion_waechter",
      "name": "Wächter",
      "type": "minion",
      "status": "basic",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "waechter",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 12,
        "note": "Im Schergen-Beispiel für Wildenstein II als Schlagwort/Schergengruppe genannt."
      },
      "note": "Sammel-/Platzhalter-Eintrag. Einzelne Wächterkarten später genauer erfassen."
    },
    {
      "id": "minion_diener",
      "name": "Diener",
      "type": "minion",
      "status": "basic",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "diener",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 12,
        "note": "Im Schergen-Beispiel für Wildenstein II als Schlagwort/Schergengruppe genannt."
      },
      "note": "Sammel-/Platzhalter-Eintrag. Einzelne Dienerkarten später genauer erfassen."
    },
    {
      "id": "special_anfuehrer_aktionen_uebernatuerlich",
      "name": "Anführer-Aktionen: Übernatürlich",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer-aktion",
        "uebernatuerlich",
        "deck"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 21,
        "note": "Im Setup von Wildenstein Akt II als Spezialdeck genannt."
      },
      "note": "Deck-Referenz. Später als Deckliste oder Pool ausbauen."
    },
    {
      "id": "special_nekromantie",
      "name": "Nekromantie",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_2",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "nekromantie",
        "deck",
        "spezial"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 21,
        "note": "Im Setup von Wildenstein Akt II als Spezialdeck genannt."
      },
      "note": "Deck-Referenz. Später als Deckliste oder Pool ausbauen."
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/wildenstein_akt_3/wildenstein_akt_3.json
```json
{
  "adventure_id": "wildenstein_akt_3",
  "adventure_name": "Das Erbe von Wildenstein - Akt III",
  "cards": [
    {
      "id": "zs_wildenstein_3",
      "name": "Zeitskala Wildenstein-III",
      "type": "timeline",
      "status": "raw",
      "adventure_id": "wildenstein_akt_3",
      "set": "base_game",
      "sub_name": "Wildenstein III",
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "zeitskala",
        "wildenstein",
        "abenteuerkarte"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 23,
        "note": "Abenteuer 'Das Erbe von Wildenstein' Akt III. Zeitskala-Details später direkt von Karte/Bild ergänzen."
      },
      "note": "Bild/Kartendaten noch ergänzen."
    },
    {
      "id": "leader_grautax",
      "name": "Anführer: Grautax",
      "type": "leader",
      "status": "raw",
      "adventure_id": "wildenstein_akt_3",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer",
        "grautax",
        "wildenstein"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 23,
        "note": "Grautax wird im Setup von Wildenstein Akt III als Anführer genannt."
      },
      "note": "Bild/Kartendaten noch ergänzen. LP/Aktionen/Ausweichen/Rüstung und Aktionswürfe später übernehmen."
    },
    {
      "id": "daemon_irrhalk",
      "name": "Dämon: Irrhalk",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_3",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "daemon",
        "irrhalk",
        "spezial"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 23,
        "note": "Im Setup von Wildenstein Akt III als zusätzliche Dämon-/Spezialkarte genannt."
      },
      "note": "Kartendaten/Bild noch nicht ergänzt."
    },
    {
      "id": "minion_skelett",
      "name": "Skelett",
      "type": "minion",
      "status": "raw",
      "adventure_id": "wildenstein_akt_3",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "scherge",
        "skelett",
        "untot"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 23,
        "note": "Im Setup von Wildenstein Akt III als Schergen-Schlagwort genannt."
      },
      "note": "Sammel-/Platzhalter-Eintrag. Einzelne Skelett-Schergen später genauer erfassen."
    },
    {
      "id": "special_anfuehrer_aktionen_nekromantie",
      "name": "Anführer-Aktionen: Nekromantie",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_3",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "anfuehrer-aktion",
        "nekromantie",
        "deck"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 23,
        "note": "Im Setup von Wildenstein Akt III als Spezialdeck genannt."
      },
      "note": "Deck-Referenz. Später als Deckliste oder Pool ausbauen."
    },
    {
      "id": "special_ereignisse_untotenbeschwoerung",
      "name": "Ereignisse: Untotenbeschwörung",
      "type": "special",
      "status": "raw",
      "adventure_id": "wildenstein_akt_3",
      "set": "base_game",
      "sub_name": null,
      "difficulty": null,
      "image": "",
      "thumb": null,
      "tags": [
        "ereignisse",
        "untotenbeschwoerung",
        "deck"
      ],
      "stats": {
        "gp": null,
        "lp": null,
        "armor": null,
        "evasion": null,
        "actions": null,
        "start_value": null,
        "cost": null
      },
      "rules": {
        "passive": "",
        "success": "",
        "fail": "",
        "timed_effects": [],
        "milestones": [],
        "action_table": [],
        "draw_effect": "",
        "flavor": ""
      },
      "keywords": [],
      "pool_refs": [],
      "source": {
        "book": "Aventuria Das Abenteuerkartenspiel Anleitung",
        "page": 23,
        "note": "Im Setup von Wildenstein Akt III als Spezialdeck genannt."
      },
      "note": "Deck-Referenz. Später als Deckliste oder Pool ausbauen."
    }
  ]
}

```

---

## 📄 Datei: data/manual/base_game/page_01.json
```json
{
  "pageNumber": 1,
  "title": "Titelblatt",
  "image": "assets/images/manual/page_01.png",
  "content": "<h1>AVENTURIA</h1><h3>Das Schwarze Auge</h3><p>VON LUKAS ZACH UND MICHAEL PALM</p><div class='warning-box'><strong>Achtung!</strong> Bitte Duell-Regeln zuerst lesen! [cite: 1]</div><h2>ABENTEUER-REGELN</h2>"
}
```

---

## 📄 Datei: data/manual/base_game/page_02.json
```json
{
  "pageNumber": 2,
  "title": "Das Schwarze Auge und Aventurien",
  "image": "assets/images/manual/page_02.png",
  "content": "<h3>Was ist ein Schwarzes Auge?</h3><p>Bei einem Schwarzen Auge handelt es sich um einen magischen Gegenstand von großer Macht. Ein solches Auge kommt ausgesprochen selten vor, und nur wenige Zauberer früherer Zeitalter konnten das Metall, aus dem das Artefakt besteht, so verzaubern, dass der Betrachter an ferne Orte oder in die Vergangenheit blicken kann. Um ein Auge herzustellen, benötigt ein Erschaffer neben seiner Magie auch noch Meteoreisen, das vom Himmel gefallen ist. Beim Verzaubern nimmt der Eisenklumpen eine kugel- oder augenartige Form an [cite: 1091-1095].</p><h3>Was ist Aventurien?</h3><p>Aventurien ist ein Kontinent, der sich von den Dschungeln und Sümpfen des Südens, in dem Echsenmenschen ihr Unwesen treiben, bis in die eisigen Länder der Fjarninger-Barbaren in den nördlichen Weiten erstreckt. Dazwischen gibt es noch die Bergkönigreiche der Zwerge, die Steppen der Orks und die Wälder der Elfen, und natürlich die vielen Länder und Städte der Menschen. Aventurien bietet Abenteuer, Herausforderungen und Gefahren für jeden Helden, vom reisenden Ritter bis hin zur mächtigen Erzmagierin [cite: 1096-1099].</p><h3>Eine Welt der Abenteuer</h3><p>Das Herz Aventuriens wird vom Mittelreich (1) eingenommen. Beherrscht von mächtigen Provinzherren und zusammengehalten von der jungen Kaiserin Rohaja, ist das Mittelreich die Heimat kühner Ritter und anderer Helden, die für die Ordnung der Götter streiten. Das Mittelreich ist auch der Lebensraum grimmiger Zwerge, die ihre Bingen und unterirdischen Städte tief in die Gebirge getrieben haben. Der Mittelpunkt des Reichs ist jedoch Gareth, die mit Abstand größte Stadt des Kontinents. Gareth alleine bietet bereits mehr als genug Möglichkeiten, um Hunderte von spannenden Abenteuern zu erleben [cite: 1101-1105].</p><p>Im ewigen, verbissenen Kampf steht das Mittelreich mit den Orks, den Bewohnern der Steppen im Nordwesten Aventuriens, des sogenannten Orklands (2). Wegen ihrer dunklen Behaarung am ganzen Körper nennen die Menschen die Orks meist Schwarzpelze. Sie gelten als wild und barbarisch und nutzen jede Gelegenheit, um ihre Kräfte mit jedem zu messen, der dumm oder mutig genug ist, sich in ihr Land zu wagen [cite: 1106-1108].</p><p>Im Nordwesten Aventuriens leben die Thorwaler, mutige Seefahrer, die kaum etwas schrecken kann, solange sie ihren Walgott Swafnir an ihrer Seite wissen. Von ihrer Heimat Thorwal (3) aus segeln sie die Küsten entlang und genießen einen Ruf als gefürchtete Piraten [cite: 1109-1110].</p><p>Südlich von Thorwal und dem Orkland liegen die beiden Königreiche Nostria (4) und Andergast (5). In den Augen anderer Menschen gelten ihre Bewohner als rückständig und hinterwäldlerisch. Die beiden Länder verbindet eine gemeinsame Geschichte mit zahlreichen Kriegen und Scharmützeln, denn die Bewohner beider Reiche sind sich spinnefeind [cite: 1111-1113].</p><p>Südlich des Mittelreichs liegt das fortschrittliche Horasreich (6), das Land der Künstler und Dichter. Über die Städte dieses ergiebigen Landstrichs herrschen Patrizier, Adlige und Stadträte, die stets darum bemüht sind, ihre Konkurrenten zu übertrumpfen oder sie durch Intrigen zu schwächen. An der Spitze dieses Staates steht der Horas, der das ganze Reich mit Weitblick regiert, und dessen Vater ein leibhaftiger Drache sein soll [cite: 1114-1116].</p><p>Der horasischen Küste vorgelagert sind die Zyklopeninseln (7), wo neben den namensgebenden einäugigen Riesen auch Minotauren und Feen die Wälder durchstreifen. Die Zyklopeninseln gehören politisch zum Horasreich, obwohl der dort lebende Menschenschlag nur wenig mit den Bewohnern des Festlands gemeinsam hat [cite: 1117-1118].</p><p>In südlichen Gefilden liegt das Imperium von Al’Anfa (8), dessen gleichnamige Hauptstadt von manchen auch die Pestbeule des Südens genannt wird. Eine[cite: 1119].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_03.json
```json
{
  "pageNumber": 3,
  "title": "Der Süden und Osten Aventuriens",
  "content": "<p>Al'Anfa ist eine Stadt voller Dekadenz und Intrigen, in der das Leben eines Fremden oft nur seinen Wert auf dem Sklavenmarkt besitzt[cite: 38]. Der Dschungel des Südens und die Waldinseln werden von Waldmenschen und Utulu bewohnt, die ständig von Sklavenjägern bedroht werden [cite: 40-41]. Weiter südlich locken im Südmeer sagenhafte Schätze und Passagen zu unbekannten Kontinenten Abenteurer an [cite: 42-43].</p><p>Im Osten beherrschen die Novadis die Wüste Khôm. Als stolze Nomaden und Anhänger des Gottes Rastullah belächeln sie die Vielgötterei anderer Völker [cite: 44-45]. Jenseits davon liegen die Tulamidenlande, bekannt für Dschinnenbeschwörer und exotische Basare [cite: 46-47]. Das fruchtbare Aranien ist geprägt durch ein Völkergemisch, in dem Frauen die eigentlichen Machthaber sind [cite: 48-51]. Die Insel Maraskan gilt als Bannland mit einer giftigen Tierwelt und einer einzigartigen Religion um die Zwillingsgötter Rur und Gror [cite: 52-53].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_04.json
```json
{
  "pageNumber": 4,
  "title": "Südosten & ferne Regionen",
  "content": "<p>Im Osten Aventuriens prägen Wüsten, Handelsstädte und alte Kulturen das Bild. Jenseits der Khôm liegen die Tulamidenlande mit ihren Basaren, Palästen und Erzählungen von Dschinnen und Magie.</p><p>Weiter im Südosten findet sich Aranien, ein fruchtbares Land mit eigenständiger Kultur und einer starken Stellung weiblicher Herrschaft. Noch weiter östlich und südlich locken fremde Küsten, Inseln und das Südmeer, das für Händler, Piraten und Abenteurer gleichermaßen Chancen und Gefahren birgt.</p>"
}

```

---

## 📄 Datei: data/manual/base_game/page_05.json
```json
{
  "pageNumber": 5,
  "title": "Religionen, Kulturen & Gefahren",
  "content": "<p>Aventurien ist geprägt von einer Vielzahl von Glaubensrichtungen, regionalen Traditionen und unterschiedlichen Lebensweisen. Diese Vielfalt beeinflusst Städte, Reiche, Handel, Recht und den Alltag der Helden.</p><p>Gleichzeitig ist der Kontinent voller Gefahren: politische Intrigen, uralte Ruinen, wilde Kreaturen, übernatürliche Bedrohungen und Konflikte zwischen Reichen. Gerade diese Mischung aus Kultur, Mythos und Gefahr macht Aventurien zum Schauplatz unzähliger Abenteuer.</p>"
}

```

---

## 📄 Datei: data/manual/base_game/page_06.json
```json
{
  "pageNumber": 6,
  "title": "Abenteuer-Regeln & Spielziel",
  "content": "<h2>Aventuria Abenteuer-Regeln</h2><p>In diesem Modus bestreitet ihr kooperative Abenteuer für 1 bis 4 Spieler ab 10 Jahren[cite: 138].</p><h3>Spielziel</h3><p>Die Helden versuchen gemeinsam, Abenteuer in Aventurien zu bestehen. Dabei müsst ihr euch gut absprechen und euch im Kampf gegenseitig unterstützen[cite: 142, 143]. Nur gemeinsam könnt ihr Ziele erreichen, Schätze sammeln und Erfahrungen anhäufen, um euch größeren Herausforderungen zu stellen [cite: 144].</p><div class='warning-box'><strong>ACHTUNG!</strong> Wir empfehlen, erst einige Partien nach den Duell-Regeln zu spielen, bevor ihr euch ins Abenteuer wagt [cite: 145].</div><h3>Vorbereitung der Helden</h3><p>Bereitet eure Heldendecks und Lebenspunkte-Karten wie im Duell-Modus vor[cite: 149]. Zusätzlich verwendet ihr nun die <strong>Talentkarte</strong> eures Helden[cite: 150]. Platziert pro Spieler zwei Schicksalspunkte (🍀) und ausreichend Würfel in der Tischmitte[cite: 151]. Ein Spieler wird Startspieler und erhält die entsprechende Marke[cite: 152].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_07.json
```json
{
  "pageNumber": 7,
  "title": "Spielmaterial: Die verschiedenen Karten",
  "content": "<h3>Heldendekks & Talentkarten</h3><p>Der Abenteuermodus nutzt alle Materialien aus dem Duellmodus[cite: 179]. Jeder Held fügt seiner Heldenkarte eine <b>Talentkarte</b> hinzu. Auf der Vorderseite stehen die Talentwerte, auf der Rückseite das Kartenmaximum für verschiedene Kategorien [cite: 180].</p><h3>Schergenkarten</h3><p>Diese Karten stellen Gegner dar, die den Helden in großer Zahl begegnen [cite: 181-182].</p><h3>Abenteuerkarten (Blau)</h3><p>Diese gelten oft nur für ein bestimmtes Abenteuer oder einen Akt. Dazu zählen Zeitskalen, Handlungskarten und Anführer-Karten [cite: 188-191].</p><h3>Belohnungskarten</h3><p>Besondere Aktionskarten, die man während eines Abenteuers erbeutet. Sie erhöhen die Kampfkraft und können beim Kampagnenspiel ins Deck aufgenommen werden [cite: 193-194].</p><h3>Übungs- & Trainingskarten</h3><p>Können während einer Atempause erworben werden, um den Helden auf kommende Herausforderungen vorzubereiten [cite: 218-219].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_08.json
```json
{
  "pageNumber": 8,
  "title": "Spezialkarten & Spielmarken",
  "content": "<h3>Spezialkarten (Grün)</h3><p>Diese kommen bei verschiedenen Kämpfen zum Einsatz und machen diese abwechslungsreicher. Dazu gehören Ereignisse, Anführer-Aktionen und Dämoneneigenschaften [cite: 225-227].</p><h3>Spielmarken</h3><ul><li><b>Startspielermarke:</b> Zeigt den aktuellen Startspieler an; wird am Rundenende weitergereicht [cite: 235].</li><li><b>Heldenmarken:</b> Werden für Abenteuersituationen oder zur zufälligen Heldenbestimmung genutzt [cite: 236-237].</li><li><b>Lebenspunkte-/Abenteuermarken:</b> Zeigen LP von Gegnern an oder werden für Effekte auf Abenteuerkarten genutzt [cite: 238-239].</li><li><b>Zeit-/Verderbensmarken:</b> Zeitmarken steuern die Zeitskala, Verderbensmarken führen oft zur Niederlage [cite: 240].</li></ul><h3>Kampfplan</h3><p>Eine ausfaltbare Auslage, die beim Platzieren aller Karten hilft [cite: 241-242].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_09.json
```json
{
  "pageNumber": 9,
  "title": "Das Abenteuer & Talentproben",
  "content": "<h3>Struktur</h3><p>Ein Abenteuer besteht aus Erzählung (Rahmenhandlung) und Kampf (Regeln)[cite: 277]. Jedes Abenteuer hat vier Schwierigkeitsgrade: einfach, normal, schwer und legendär [cite: 281-282].</p><h3>Talentproben</h3><p>Wird eine Probe verlangt, würfelt der Spieler mit einem W20 gleich oder unter den Wert seines Talents [cite: 293, 299].</p><ul><li><b>Kritischer Erfolg:</b> Eine gewürfelte 1 [cite: 303].</li><li><b>Erfolg:</b> Gleich oder unter dem Talentwert [cite: 304].</li><li><b>Misserfolg:</b> Über dem Talentwert [cite: 304].</li><li><b>Kritischer Patzer:</b> Eine gewürfelte 20 [cite: 305].</li></ul><div class='warning-box'>Helden dürfen Schicksalspunkte (🍀) einsetzen, um Würfe zu wiederholen[cite: 307].</div>"
}
```

---

## 📄 Datei: data/manual/base_game/page_10.json
```json
{
  "pageNumber": 10,
  "title": "Der Kampf (Vorbereitung)",
  "content": "<h3>Karten platzieren</h3><p>Nutze den Kampfplan und die Spielanweisungen des Abenteuers [cite: 322-323].</p><ol><li><b>Zeitskala:</b> Wähle die Karte passend zum Schwierigkeitsgrad und lege die angegebene Anzahl Zeitmarken darauf [cite: 379-381].</li><li><b>Anführer:</b> Bildet den Beginn der Gegnerreihe. Platziere Lebenspunkte-Marken entsprechend der Heldenanzahl auf der Karte [cite: 382-387].</li></ol><h3>Anführer-Details</h3><p>Karten enthalten: Name, Schlagworte, Sonderregeln, LP, Ausweichen-Wert, Rüstungsschuz, Anzahl der Aktionen und eine Aktionstabelle (1-20) [cite: 319, 388-399].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_11.json
```json
{
  "pageNumber": 11,
  "title": "Handlung, Spezial- & Schergenkarten",
  "content": "<h3>3) Handlungskarten (Heldenaktionen)</h3><p>Diese Karten beschreiben Aktionen, die Helden durch Talentproben durchführen können. Oft werden hier Abenteuermarken gesammelt oder entfernt [cite: 422-428].</p><h3>4) Spezialkarten</h3><p>Zugkartendecks werden nach Schlagworten (z.B. 'Übernatürlich') zusammengestellt, gemischt und auf dem Plan platziert [cite: 454-457].</p><h3>5) Schergenkarten</h3><p>Allgemeine Gegner, die die Gegnerreihe ergänzen. Bildet ein Deck aus Schergen mit den passenden Schlagworten [cite: 460-463]. Ziehe nacheinander Karten, bis deren Gefahrenpunkte (GP) den in der Spielanweisung genannten Wert erreichen oder übertreffen [cite: 464-466].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_12.json
```json
{
  "pageNumber": 12,
  "title": "Schergen & Gefahrenwert (GP)",
  "content": "<h3>GP-Beispiel</h3><p>Im Abenteuer 'Wildenstein II' gilt: GP = Helden x 6. Bei 2 Helden also 12 GP. Es werden Schergen (Wächter/Diener) gezogen, bis die Summe ihrer GP mindestens 12 beträgt [cite: 477-480].</p><h3>Schergen-Details</h3><p>Die Karten zeigen: Name, Schlagworte, Sonderregeln, Gefahrenpunkte (GP), LP, Ausweichen, Rüstung und Aktionen [cite: 491-502].</p><div class='warning-box'><b>Zeitlich eintretende Ereignisse:</b> Einige Schergen haben Effekte, die wie bei der Zeitskala in bestimmten Runden eintreten[cite: 503].</div>"
}
```

---

## 📄 Datei: data/manual/base_game/page_13.json
```json
{
  "pageNumber": 13,
  "title": "Kampfablauf & Helden-Spielzüge",
  "content": "<h3>Kampfablauf</h3><p>Ein Kampf besteht aus Runden mit fünf Schritten: 1) Vorbereitung, 2) Helden-Spielzüge, 3) Gegner-Spielzüge, 4) Zeit-Effekte, 5) Ende der Runde [cite: 524-528].</p><h3>1) Vorbereitung</h3><p>Alle Helden führen zeitgleich die Phasen 1 bis 4 der Duell-Regeln aus: Karten bereit machen, 2 Karten ziehen, Ausdauer spielen [cite: 530].</p><h3>2) Helden-Spielzüge</h3><p>Beginnend beim Startspieler führt jeder Held seinen Zug aus (Phasen 5 & 6 der Duell-Regeln) [cite: 532-533]. Gegner werden wie Helden im Duell anvisiert. Ein Gegner bei 0 LP ist ausgeschaltet [cite: 535-540]. Für jeden ausgeschalteten Gegner erhält der Held sofort 1 Schicksalspunkt (🍀) [cite: 545].</p><div class='warning-box'><b>Besonderheit:</b> Karten mit dem Absatz 'Im Abenteuer' verwenden diese Regeln anstelle der normalen Duell-Regeln [cite: 556, 569-570].</div>"
}
```

---

## 📄 Datei: data/manual/base_game/page_14.json
```json
{
  "pageNumber": 14,
  "title": "Gegner-Spielzüge & Zeit-Effekte",
  "content": "<h3>3) Gegner-Spielzüge</h3><p>Gegner handeln von links nach rechts[cite: 574]. Für jede Aktion (⚔️) wird ein W20 gewürfelt und das Ergebnis in der Tabelle abgelesen[cite: 577]. Eine '1' gibt eine Zusatzaktion, eine '20' beendet den Zug des Gegners sofort [cite: 578-581]. Angriffe der Gegner treffen automatisch; Helden dürfen jedoch ausweichen [cite: 585-587].</p><h3>Zielauswahl</h3><ul><li><b>Startspieler:</b> Ziel ist der Held mit der Startspielermarke [cite: 590].</li><li><b>Zufällig:</b> Bestimmung per W6 oder Heldenmarken [cite: 591-593].</li><li><b>Am meisten/wenigsten:</b> Ziel ist der Held mit den entsprechenden Werten (LP, 🍀 etc.) [cite: 607].</li></ul><h3>4) Zeit-Effekte & 5) Rundenende</h3><p>Entferne eine Zeitmarke (⏳) von der Zeitskala und löse den entsprechenden Effekt aus[cite: 617]. Danach gibt der Startspieler die Marke nach links weiter[cite: 621].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_15.json
```json
{
  "pageNumber": 15,
  "title": "Kampfende & Atempause",
  "content": "<h3>Sieg & Niederlage</h3><p>Bei einer Niederlage endet das Abenteuer sofort; es kann jedoch neu gestartet werden [cite: 625-627]. Bei Sieg zwischen Akten: LP unter 30 werden auf 30 angehoben. Alle 🍀 gehen zurück in die Tischmitte [cite: 629-630].</p><h3>Atempause</h3><p>Erholungspunkte (EP) = Verbleibende Zeitmarken + 2 [cite: 645-646]. Optionen:</p><ul><li><b>Ausruhen:</b> 1 EP = 2 LP Heilung [cite: 648].</li><li><b>Beten:</b> 2 EP = 1 Schicksalspunkt (🍀) [cite: 650].</li><li><b>Vorbereiten:</b> 4 EP = Eine Karte aus dem Deck auf die Hand suchen [cite: 652-653].</li><li><b>Üben/Trainieren:</b> Erwerb von Übungs-/Trainingskarten für 2+ EP [cite: 654-668].</li></ul><p>Am Abenteuerende gibt es <b>Abenteuerpunkte</b> für Belohnungen oder Talentsteigerungen [cite: 658-662].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_16.json
```json
{
  "pageNumber": 16,
  "title": "Zusatzregeln & Kampagne",
  "content": "<h3>Ausgeschaltete Helden</h3><p>Ein Held bei 0 LP setzt aus, behält aber seine Karten [cite: 672-674]. <b>Wiederbelebung:</b> Ein Mitspieler erschöpft X Ausdauerkarten; bei W20 <= X kehrt der Held mit X LP zurück [cite: 678-680].</p><h3>Kampagnenspiel</h3><p>Helden können Belohnungen und Talentwerte im Heldendokument notieren[cite: 697]. Vor jedem neuen Abenteuer dürfen bis zu 3 Belohnungskarten ins Deck gemischt werden[cite: 698].</p><h3>Zufallsbegegnungen</h3><p>Ein spezieller Modus ohne Story. Nutze die Zeitskala 'Zufallsbegegnung'. Gefahrenwert = Helden x 7 [cite: 701-705]. Der Scherge mit den höchsten GP gilt als Anführer[cite: 707].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_17.json
```json
{
  "pageNumber": 17,
  "title": "Abenteuer: Silvanas Befreiung (Teil 1)",
  "content": "<h3>Havena, 993 BF</h3><p>Euer Freund Alrik bittet um Hilfe bei der Befreiung Silvanas von Piraten [cite: 712-715].</p><h3>Interaktive Abschnitte</h3><ul><li><b>Goblins verfolgen:</b> Jeder Held würfelt Körperbeherrschung. Bei Misserfolg wird die Karte 'Feiger Goblin' zum Schergendeck hinzugefügt [cite: 722-729].</li><li><b>Keller durchsuchen:</b> Ein Held würfelt Sinnesschärfe. Bei Erfolg startet jeder Held mit einer zusätzlichen Handkarte in den Kampf [cite: 734-741].</li></ul><p>Ein Wandgemälde verbirgt eine Geheimtür zum Raum der Entführer [cite: 746-748].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_18.json
```json
{
  "pageNumber": 18,
  "title": "Abenteuer: Silvanas Befreiung (Teil 2)",
  "content": "<h3>Das Gemälde</h3><p>Ein Held würfelt Wissen. Bei Erfolg startet jeder Held mit einer zusätzlichen Handkarte [cite: 750-754]. Bei Misserfolg startet jeder mit einer Karte weniger [cite: 758].</p><h3>Kampf-Vorgaben</h3><ul><li><b>Schergen:</b> Piraten oder Orks [cite: 770].</li><li><b>Gefahrenwert:</b> Helden x 5 (+ eventuelle Feige Goblins) [cite: 771].</li><li><b>Heldenaktion:</b> Namen erraten [cite: 772].</li><li><b>Niederlage:</b> Verderbensmarken (💀) = Heldenanzahl[cite: 773].</li></ul><p><b>Sieg:</b> Alle Gegner besiegt oder vertrieben. Belohnung: 1 Abenteuerpunkt[cite: 774, 786].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_19.json
```json
{
  "pageNumber": 19,
  "title": "Abenteuer: Leute, die nicht spielen",
  "content": "<h3>Chorhop, 1024 BF</h3><p>Eskorte des 'Glücks-Idols' zum Spielhaus 'Karfunkel-Stein' [cite: 789-791].</p><h3>Das Gold-Dilemma</h3><p>Die Statue weint Goldstücke. Wer Gold nimmt, erhält Schicksalspunkte (🍀), muss aber eine erschwerte Willenskraft-Probe bestehen [cite: 797-815].</p><h3>Kampf-Vorgaben</h3><ul><li><b>Karten:</b> Alle 'Leute, die nicht spielen'-Karten, Ereignis-Deck, Anführer-Aktionsdeck [cite: 817-819].</li><li><b>Gefahrenwert:</b> (Helden x 4) + gesammelte Schicksalspunkte vom Gold [cite: 823].</li><li><b>Sieg:</b> Heldenaktion 'Das Spiel beenden' erfolgreich durchführen[cite: 825].</li></ul>"
}
```

---

## 📄 Datei: data/manual/base_game/page_20.json
```json
{
  "pageNumber": 20,
  "title": "Wildenstein Akt I: Eine Botschaft",
  "content": "<h3>Perainefurten, 1039 BF</h3><p>Ein Brief ruft einen zufälligen Helden (den Erben) zum Antritt des Erbes von Baron Wildenstein auf [cite: 837-856].</p><h3>Der Weg zur Burg</h3><ul><li><b>Wissen-Probe:</b> Erfolg bringt Schicksalspunkte [cite: 858-859].</li><li><b>Wildnisleben-Probe:</b> Misserfolg kostet 2 LP [cite: 866-869].</li><li><b>Sinnesschärfe-Probe:</b> Erfolg/Misserfolg beeinflusst die Start-Handkarten im Hinterhalt [cite: 874-879].</li></ul><h3>Kampf-Vorgaben</h3><p>Gegner: Räuber. Anführer: Greifbart Gichthain. Gefahrenwert: Helden x 5 [cite: 881-887]. <b>Niederlage:</b> Wenn der Erbe ausgeschaltet wird[cite: 888].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_21.json
```json
{
  "pageNumber": 21,
  "title": "Wildenstein Akt II: Auf der Burg",
  "content": "<h3>Dorf Wildenstein</h3><p>Willenskraft-Probe gegen Beklommenheit [cite: 910-915]. Handwerk-Probe für 'Zwölfgötter-Amulett' [cite: 921-924].</p><h3>Der Ball</h3><p>Überzeugen-Probe für einen eleganten Auftritt (bringt 🍀 oder Handkarten) [cite: 935-941]. Pünktlich zum zehnten Glockenschlag erscheint der Baron. Er ist am Leben und befiehlt: 'Ergreift sie!' [cite: 942-947].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_22.json
```json
{
  "pageNumber": 22,
  "title": "Wildenstein Akt II (Kampf) & Akt III",
  "content": "<h3>Kampf im Ballsaal</h3><ul><li><b>Gegner:</b> Wächter oder Diener. Anführer: Baron von Wildenstein [cite: 951-956].</li><li><b>Gefahrenwert:</b> Helden x 6 [cite: 957].</li><li><b>Aktionen:</b> Bad in der Menge, Sprung an den Kronleuchter, Hypnose brechen[cite: 957].</li></ul><h3>Akt III: Verfolgung</h3><p>Verfolgung des Barons in den Forst. Körperbeherrschung-Probe zum Abseilen [cite: 979-984]. Wildnisleben-Probe zum Spurenlesen beeinflusst die Zeitmarken (⏳) im Finale [cite: 990-996].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_23.json
```json
{
  "pageNumber": 23,
  "title": "Wildenstein Akt III: Das Ritual",
  "content": "<h3>Der Boronanger</h3><p>Heimlichkeit-Probe beeinflusst die Start-Handkarten [cite: 1000-1004]. Der falsche Baron Grautax bedroht die Mutter des Erben [cite: 1005-1015].</p><h3>Kampf-Vorgaben</h3><ul><li><b>Gegner:</b> Skelette. Anführer: Grautax. Dämon: Irrhalk [cite: 1018-1027].</li><li><b>Gefahrenwert:</b> Helden x 3 [cite: 1027].</li><li><b>Heldenaktionen:</b> Mutter befreien, Grab segnen [cite: 1028].</li></ul><p><b>Belohnung:</b> 2 Abenteuerpunkte (+1 Bonus für die Rettung der Mutter) [cite: 1047-1048].</p>"
}
```

---

## 📄 Datei: data/manual/base_game/page_24.json
```json
{
  "pageNumber": 24,
  "title": "Heldendokument & Symbole",
  "content": "<h3>Kopiervorlage Heldendokument</h3><p>Verwalte Namen, Talentsteigerungen (+1 bis max +4) und Belohnungen [cite: 1051-1057].</p><h3>Symbol-Legende</h3><p>⚔️ Nahkampf, 🏹 Fernkampf, ✨ Magie, 🛡️ Ausweichen, 🍀 Schicksalspunkt, ❤️ Lebenspunkt, 💥 Trefferpunkt, ⏳ Zeit, 💀 Verderben [cite: 1054].</p><h3>Rundenablauf Zusammenfassung</h3><ol><li>Vorbereitung (Helden zeitgleich) [cite: 1072].</li><li>Helden-Spielzüge [cite: 1073].</li><li>Gegner-Spielzüge [cite: 1074].</li><li>Zeit-Effekte [cite: 1075].</li><li>Ende der Runde[cite: 1077].</li></ol>"
}
```

---

## 📄 Datei: data/manual.json
```json
{
  "phases": [
    {
      "id": 1,
      "name": "Vorbereitung",
      "desc": "Phase 1-4 der Duell-Regeln gleichzeitig ausführen: Karten ziehen, bereit machen, Ausdauer spielen[cite: 530]."
    },
    {
      "id": 2,
      "name": "Helden-Spielzüge",
      "desc": "Reihum agieren, Karten spielen und Angriffe durchführen [cite: 531-534]."
    },
    {
      "id": 3,
      "name": "Gegner-Spielzüge",
      "desc": "Gegner handeln von links nach rechts mit ihren Aktionen [cite: 572-574]."
    },
    {
      "id": 4,
      "name": "Zeit-Effekte",
      "desc": "Zeitmarke entfernen und Effekte der Zeitskala auslösen [cite: 616-617]."
    },
    {
      "id": 5,
      "name": "Ende der Runde",
      "desc": "Startspielermarke weitergeben [cite: 620-621]."
    }
  ],
  "rules": {
    "Wiederbelebung": "Erschöpfe X Ausdauerkarten. Würfle W20 <= X. Bei Erfolg kehrt Held mit X LP zurück [cite: 677-682].",
    "Atempause": "Erholungspunkte (EP) = Zeitmarken + 2 [cite: 645-646]. Optionen: Ausruhen (1 EP = 2 LP), Beten (2 EP = 1 Schicksalspunkt), Vorbereiten (4 EP = 1 Karte suchen) [cite: 647-653].",
    "Sieg & Niederlage": "Siegbedingungen variieren je nach Abenteuer[cite: 623]. Bei Niederlage: Alles entfernen und bei 'Vorbereitung der Helden' neu starten [cite: 624-627]."
  },
  "pantheon": [
    {
      "name": "Praios",
      "aspekte": "Gerechtigkeit, Magiebann, Wahrheit",
      "tier": "Greif [cite: 126]"
    },
    {
      "name": "Rondra",
      "aspekte": "Ehre, Kampf, Mut",
      "tier": "Löwin [cite: 126]"
    }
  ]
}
```

---

## 📄 Datei: index.html
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventuria Abenteuer-Helfer</title>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/features.css">
    <link rel="stylesheet" href="css/modal.css">
</head>
<body>
    <div class="app-container">
        <header>
            <h1>Aventuria Abenteuer-Helfer</h1>
            <p id="loading-status">Bereit.</p>
        </header>

        <div class="top-bar">
            <div class="config-item">
                <label for="adventurePicker"><strong>Abenteuer:</strong></label>
                <select id="adventurePicker">
                    <option value="">Bitte wählen ...</option>
                    <option value="leute_die_nicht_spielen">Leute, die nicht spielen</option>
                    <option value="silvanas_befreiung">Silvanas Befreiung</option>
                    <option value="wildenstein_akt_1">Das Erbe von Wildenstein - Akt I</option>
                    <option value="wildenstein_akt_2">Das Erbe von Wildenstein - Akt II</option>
                    <option value="wildenstein_akt_3">Das Erbe von Wildenstein - Akt III</option>
                </select>
            </div>

            <div class="config-item">
                <label for="heroCount"><strong>Helden:</strong></label>
                <select id="heroCount">
                    <option value="1">1</option>
                    <option value="2" selected>2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <div class="config-item">
                <label for="difficulty"><strong>Schwierigkeit:</strong></label>
                <select id="difficulty">
                    <option value="easy">Leicht</option>
                    <option value="normal" selected>Normal</option>
                    <option value="hard">Schwer</option>
                </select>
            </div>

            <div class="button-group">
                <button id="saveStateBtn" class="btn" type="button">Speichern</button>
                <button id="clearStateBtn" class="btn-outline" type="button">Zurücksetzen</button>
                <button class="btn-outline" type="button" data-action="open-archive">Archiv</button>
                <button class="btn-outline" type="button" data-action="open-rulebook">Regelbuch</button>
            </div>
        </div>

        <section id="story-wrapper" class="card-list">
            <h2 id="title">Abenteuer</h2>
            <div id="story-area"></div>
        </section>

        <section id="setup-display" class="hidden">
            <div id="danger-value"></div>

            <div class="grid-container">
                <div class="card-list" id="blue-cards">
                    <h3>Abenteuerkarten</h3>
                    <ul></ul>
                </div>

                <div class="card-list" id="minions">
                    <h3>Schergen</h3>
                    <ul></ul>
                </div>

                <div class="card-list hidden" id="special">
                    <h3>Spezialkarten</h3>
                    <ul></ul>
                </div>
            </div>

            <hr>

            <div class="card-list" id="victory-defeat-box">
                <h3>Sieg &amp; Niederlage</h3>
                <p id="victory-text"><strong>Sieg:</strong> —</p>
                <p id="defeat-text"><strong>Niederlage:</strong> —</p>
            </div>
        </section>

        <div class="toggle-section">
            <button
                class="btn-outline"
                type="button"
                data-action="toggle-section"
                data-target="combat-tools-section"
            >
                Kampf-Hilfen ein/ausblenden
            </button>
            <button
                class="btn-outline"
                type="button"
                data-action="toggle-section"
                data-target="intermission-section"
            >
                Atempause ein/ausblenden
            </button>
        </div>

        <section class="hero-dashboard" id="heroDashboard"></section>

        <section id="combat-tools-section" class="hidden-section show">
            <div class="card-list">
                <h3>Kampf-Hilfen</h3>

                <div class="phase-steps" id="phaseTracker">
                    <div class="step active">1. Heldenphase</div>
                    <div class="step">2. Schergenphase</div>
                    <div class="step">3. Anführerphase</div>
                    <div class="step">4. Zeitphase</div>
                </div>

                <div class="grid-container">
                    <div class="card-list">
                        <h3>Zeitmarken</h3>
                        <div class="config-item">
                            <label for="remainingTime"><strong>Verbleibend:</strong></label>
                            <input id="remainingTime" type="number" min="0" value="0">
                        </div>
                    </div>

                    <div class="card-list">
                        <h3>EP-Ergebnis</h3>
                        <div id="ep-result" class="result-badge">2 EP</div>
                    </div>

                    <div class="card-list">
                        <h3>Zufallsziel</h3>
                        <div id="targetResult" class="result-badge">--</div>
                    </div>
                </div>

                <div class="button-group" style="margin-top: 20px;">
                    <button class="btn" type="button" data-action="combat-prev-phase">Phase zurück</button>
                    <button class="btn" type="button" data-action="combat-next-phase">Nächste Phase</button>
                    <button class="btn-outline" type="button" data-action="combat-roll-target">Zufallsziel würfeln</button>
                    <button class="btn-outline" type="button" data-action="combat-update-ep">EP neu berechnen</button>
                </div>
            </div>
        </section>

        <section id="intermission-section" class="hidden-section show">
            <div class="intermission-area">
                <div class="intermission-card">
                    <h3>Atempause</h3>
                    <p>Nutze diesen Bereich für Zwischenstände, Erholung und Abenteuer-Notizen.</p>
                    <div class="button-group" style="justify-content: center; margin-top: 16px;">
                        <button class="btn-outline" type="button" data-action="combat-apply-intermission">
                            Atempause anwenden
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div class="card-tooltip" id="card-tooltip">
        <div class="tooltip-inner">
            <img id="tooltip-image" src="" alt="Kartenvorschau">
        </div>
    </div>

    <div class="modal-backdrop" id="archive-modal">
        <div class="modal-content archive-modal-size">
            <span class="close-modal" data-action="close-archive">&times;</span>
            <div class="tab-content">
                <div class="archive-header">
                    <h2>Kartenarchiv</h2>
                    <input
                        id="archive-search"
                        class="search-bar"
                        type="text"
                        placeholder="Karten suchen..."
                    >
                </div>

                <div class="button-group" style="margin-bottom: 20px;">
                    <button
                        class="btn-outline"
                        type="button"
                        data-action="archive-load-set"
                        data-set="base_game"
                    >
                        Grundbox
                    </button>
                </div>

                <div id="archive-grid" class="archive-grid">
                    <p class="placeholder-text">Archiv wird geladen ...</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-backdrop" id="rulebook-modal">
        <div class="modal-content">
            <span class="close-modal" data-action="close-rulebook">&times;</span>

            <div class="modal-layout">
                <aside class="modal-sidebar">
                    <h4>Regelbuch</h4>
                    <ul id="manual-page-list"></ul>
                </aside>

                <div class="modal-main">
                    <div class="modal-nav">
                        <h2 id="manual-title">Regelbuch</h2>
                        <button
                            class="tab-btn active"
                            type="button"
                            data-action="rulebook-tab"
                            data-tab="reader"
                        >
                            Leser
                        </button>
                        <button
                            class="tab-btn"
                            type="button"
                            data-action="rulebook-tab"
                            data-tab="codex"
                        >
                            Kodex
                        </button>
                    </div>

                    <div class="tab-content">
                        <div id="reader-tab">
                            <div class="reader-container">
                                <div class="reader-page" id="manual-content"></div>
                                <div class="reader-footer">
                                    <button type="button" data-action="rulebook-prev-page">Zurück</button>
                                    <span id="manual-page-indicator">Seite 0 / 0</span>
                                    <button type="button" data-action="rulebook-next-page">Weiter</button>
                                </div>
                            </div>
                        </div>

                        <div id="codex-tab" class="hidden">
                            <input
                                id="codex-search"
                                class="search-bar"
                                type="text"
                                placeholder="Regeln durchsuchen..."
                            >
                            <div id="codex-results"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/config.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/state.js"></script>
    <script src="js/api.js"></script>
    <script src="js/ui.js"></script>
    <script src="js/ui-renderer.js"></script>
    <script src="js/narrative.js"></script>
    <script src="js/combat.js"></script>
    <script src="js/storage.js"></script>
    <script src="js/archive.js"></script>
    <script src="js/rulebook.js"></script>
    <script src="js/validator.js"></script>
    <script src="js/app.js"></script>
</body>
</html>

```

---

## 📄 Datei: js/api.js
```js
window.API = {
    cache: {
        adventures: {},
        masterIndexes: {},
        catalogCards: {},
        cardPayloads: {}
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    getConfig() {
        return window.CONFIG || null;
    },

    async fetchJson(path) {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`${path} → HTTP ${res.status}`);
        }
        return await res.json();
    },

    async loadJSON(path) {
        try {
            return await this.fetchJson(path);
        } catch (err) {
            console.error('Fehler beim Laden:', path, err);
            return null;
        }
    },

    normalizeAdventure(rawData, fallbackId = '') {
        const setup = rawData?.setup ?? {};
        const narrative = rawData?.narrative ?? {};

        return {
            id: this.normalizeString(rawData?.id || fallbackId),
            name: this.normalizeString(rawData?.name || fallbackId),
            status: this.normalizeString(rawData?.status || ''),
            set: rawData?.set ?? { id: 'base_game', name: 'Aventuria Grundbox' },
            danger_calc: Number(rawData?.danger_calc ?? 0),
            narrative: {
                intro: this.normalizeString(narrative?.intro),
                checks: this.normalizeArray(narrative?.checks)
            },
            setup: {
                card_refs: setup?.card_refs ?? {},
                blue_cards: this.normalizeArray(setup?.blue_cards),
                minion_cards: this.normalizeArray(setup?.minion_cards),
                special_cards: this.normalizeArray(setup?.special_cards),
                victory: this.normalizeString(setup?.victory),
                defeat: this.normalizeString(setup?.defeat)
            },
            source: rawData?.source ?? {},
            notes: this.normalizeString(rawData?.notes ?? rawData?.note ?? '')
        };
    },

    normalizeCatalogCard(rawData) {
        if (!rawData || typeof rawData !== 'object') return null;

        return {
            id: this.normalizeString(rawData.id),
            name: this.normalizeString(rawData.name),
            set: rawData.set ?? { id: 'base_game', name: 'Aventuria Grundbox' },
            card_category: this.normalizeString(rawData.card_category),
            type: this.normalizeString(rawData.type),
            subtypes: this.normalizeArray(rawData.subtypes),
            status: this.normalizeString(rawData.status),
            adventure_refs: this.normalizeArray(rawData.adventure_refs).map(ref => {
                if (typeof ref === 'string') return this.normalizeString(ref);
                return ref?.id ? this.normalizeString(ref.id) : ref;
            }),
            images: rawData.images ?? { front: '', back: null, alt: [] },
            image: this.normalizeString(rawData?.images?.front || rawData?.image || ''),
            tags: this.normalizeArray(rawData.tags),
            custom_tags: this.normalizeArray(rawData.custom_tags),
            keywords: this.normalizeArray(rawData.keywords),
            search_text: this.normalizeString(rawData.search_text),
            stats: rawData.stats ?? {},
            rules: rawData.rules ?? {},
            source: rawData.source ?? {},
            note: this.normalizeString(rawData.note ?? rawData.notes ?? ''),
            notes: this.normalizeString(rawData.notes ?? rawData.note ?? '')
        };
    },

    normalizeCardPayload(rawData, adventureId = '') {
        return {
            adventure_id: this.normalizeString(rawData?.adventure_id || adventureId),
            adventure_name: this.normalizeString(rawData?.adventure_name || ''),
            cards: this.normalizeArray(rawData?.cards)
                .map(card => this.normalizeCatalogCard(card))
                .filter(Boolean)
        };
    },

    getAdventureSetKey(adventureId, fallbackSetKey = 'base_game') {
        const adventure = this.cache.adventures[this.normalizeString(adventureId)];
        const setId = this.normalizeString(adventure?.set?.id);
        return setId || fallbackSetKey || this.getConfig()?.defaultSet || 'base_game';
    },

    async getAdventure(id, setKey = null) {
        const adventureId = this.normalizeString(id);
        if (!adventureId) return null;

        if (this.cache.adventures[adventureId]) {
            return this.cache.adventures[adventureId];
        }

        const config = this.getConfig();
        const resolvedSetKey = this.normalizeString(setKey || config?.defaultSet || 'base_game');
        const path = config?.getAdventurePath
            ? config.getAdventurePath(adventureId, resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/${adventureId}.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            console.error('Abenteuer-Datei fehlt:', path);
            return null;
        }

        const normalized = this.normalizeAdventure(rawData, adventureId);
        this.cache.adventures[adventureId] = normalized;
        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const config = this.getConfig();
        const resolvedSetKey = this.normalizeString(setKey || config?.defaultSet || 'base_game');

        if (this.cache.masterIndexes[resolvedSetKey]) {
            return this.cache.masterIndexes[resolvedSetKey];
        }

        const path = config?.getMasterIndexPath
            ? config.getMasterIndexPath(resolvedSetKey)
            : `data/cards/${resolvedSetKey}/master_${resolvedSetKey}.json`;

        try {
            const rawData = await this.fetchJson(path);
            const normalized = {
                set: rawData?.set || { id: resolvedSetKey, name: resolvedSetKey },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: this.normalizeArray(rawData?.cards)
            };

            this.cache.masterIndexes[resolvedSetKey] = normalized;
            return normalized;
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);

            const fallback = {
                set: { id: resolvedSetKey, name: resolvedSetKey },
                catalog_version: 1,
                cards: []
            };

            this.cache.masterIndexes[resolvedSetKey] = fallback;
            return fallback;
        }
    },

    async getCatalogCard(detailPath) {
        const normalizedPath = this.normalizeString(detailPath);
        if (!normalizedPath) return null;

        if (this.cache.catalogCards[normalizedPath]) {
            return this.cache.catalogCards[normalizedPath];
        }

        const rawData = await this.fetchJson(normalizedPath);
        const normalized = this.normalizeCatalogCard(rawData);

        this.cache.catalogCards[normalizedPath] = normalized;
        return normalized;
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = this.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return this.normalizeCardPayload({ cards: [] }, '');
        }

        if (this.cache.cardPayloads[normalizedAdventureId]) {
            return this.cache.cardPayloads[normalizedAdventureId];
        }

        const config = this.getConfig();
        const resolvedSetKey = this.getAdventureSetKey(normalizedAdventureId, setKey || config?.defaultSet || 'base_game');
        const master = await this.getMasterIndex(resolvedSetKey);

        const migratedMasterCards = this.normalizeArray(master.cards).filter(card =>
            Array.isArray(card?.adventure_refs) &&
            card.adventure_refs.includes(normalizedAdventureId) &&
            typeof card?.detail_path === 'string' &&
            card.detail_path.trim().length > 0
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = [];

            for (const entry of migratedMasterCards) {
                try {
                    const detail = await this.getCatalogCard(entry.detail_path);
                    if (detail) {
                        loadedCards.push(detail);
                    }
                } catch (err) {
                    console.warn(`⚠️ Katalogkarte konnte nicht geladen werden: ${entry?.id}`, err);
                }
            }

            const payload = {
                adventure_id: normalizedAdventureId,
                adventure_name: '',
                cards: loadedCards
            };

            this.cache.cardPayloads[normalizedAdventureId] = payload;
            return payload;
        }

        const legacyPath = config?.getLegacyAdventureCardsPath
            ? config.getLegacyAdventureCardsPath(normalizedAdventureId, resolvedSetKey)
            : `data/cards/${resolvedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;

        try {
            const rawData = await this.fetchJson(legacyPath);
            const payload = this.normalizeCardPayload(rawData, normalizedAdventureId);

            this.cache.cardPayloads[normalizedAdventureId] = payload;
            return payload;
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, err);

            const fallback = this.normalizeCardPayload({ cards: [] }, normalizedAdventureId);
            this.cache.cardPayloads[normalizedAdventureId] = fallback;
            return fallback;
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    async findCardById(id, setKey = null) {
        const targetId = this.normalizeString(id);
        if (!targetId) return null;

        const cachedCatalogCard = Object.values(this.cache.catalogCards).find(card => card?.id === targetId);
        if (cachedCatalogCard) return cachedCatalogCard;

        const config = this.getConfig();
        const resolvedSetKey = this.normalizeString(setKey || config?.defaultSet || 'base_game');
        const master = await this.getMasterIndex(resolvedSetKey);
        const entry = this.normalizeArray(master.cards).find(card => this.normalizeString(card?.id) === targetId);

        if (entry?.detail_path) {
            try {
                return await this.getCatalogCard(entry.detail_path);
            } catch (err) {
                console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
            }
        }

        for (const payload of Object.values(this.cache.cardPayloads)) {
            const found = this.normalizeArray(payload?.cards).find(card => this.normalizeString(card?.id) === targetId);
            if (found) return found;
        }

        return null;
    },

    async openCardDetailById(id) {
        const card = await this.findCardById(id);
        if (!card) return;

        if (window.Renderer && typeof window.Renderer.openCardDetail === 'function') {
            window.Renderer.openCardDetail(card);
        }
    }
};

```

---

## 📄 Datei: js/app.js
```js
window.App = {
    isApplyingSavedState: false,

    async init() {
        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const saveBtn = Utils.byId('saveStateBtn');
        const clearBtn = Utils.byId('clearStateBtn');

        if (picker) {
            picker.addEventListener('change', () => this.handleUpdate());
        }

        if (heroCount) {
            heroCount.addEventListener('change', () => {
                if (window.Combat?.updateDashboard) {
                    window.Combat.updateDashboard();
                }

                if (!this.isApplyingSavedState && window.StorageManager) {
                    window.StorageManager.persist();
                }
            });
        }

        if (difficulty) {
            difficulty.addEventListener('change', () => {
                if (!this.isApplyingSavedState && window.StorageManager) {
                    window.StorageManager.persist();
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (window.StorageManager) {
                    window.StorageManager.persist();
                    window.UI?.setStatus?.('💾 Spielstand gespeichert.');
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', async () => {
                if (window.StorageManager) {
                    window.StorageManager.clearState();
                }

                this.resetUIToDefaults();
                window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
            });
        }

        if (window.Combat?.updateDashboard) {
            window.Combat.updateDashboard();
        }

        if (window.StorageManager?.bindAutoSave) {
            window.StorageManager.bindAutoSave();
        }

        await this.restoreSavedState();

        console.log('App initialisiert.');
    },

    setVictoryDefeat(adventure) {
        const victoryEl = Utils.byId('victory-text');
        const defeatEl = Utils.byId('defeat-text');

        const victory = String(adventure?.setup?.victory ?? '—').trim() || '—';
        const defeat = String(adventure?.setup?.defeat ?? '—').trim() || '—';

        if (victoryEl) {
            victoryEl.innerHTML = `<strong>Sieg:</strong> ${Utils.escapeHtml(victory)}`;
        }

        if (defeatEl) {
            defeatEl.innerHTML = `<strong>Niederlage:</strong> ${Utils.escapeHtml(defeat)}`;
        }
    },

    clearVictoryDefeat() {
        const victoryEl = Utils.byId('victory-text');
        const defeatEl = Utils.byId('defeat-text');

        if (victoryEl) {
            victoryEl.innerHTML = '<strong>Sieg:</strong> —';
        }

        if (defeatEl) {
            defeatEl.innerHTML = '<strong>Niederlage:</strong> —';
        }
    },

    renderStory(adventure) {
        if (window.Narrative?.renderStory) {
            window.Narrative.renderStory(adventure);
            return;
        }

        const container = Utils.byId('story-area');
        if (container) {
            container.innerHTML = '';
        }
    },

    resetUIToDefaults() {
        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const setupDisplay = Utils.byId('setup-display');
        const storyArea = Utils.byId('story-area');
        const title = Utils.byId('title');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.byId('special');
        const dangerValue = Utils.byId('danger-value');
        const remainingTime = Utils.byId('remainingTime');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');

        if (picker) picker.value = '';
        if (heroCount) heroCount.value = '2';
        if (difficulty) difficulty.value = 'normal';

        if (setupDisplay) setupDisplay.classList.add('hidden');
        if (storyArea) storyArea.innerHTML = '';
        if (title) title.innerText = 'Abenteuer';
        if (blueCards) blueCards.innerHTML = '';
        if (minions) minions.innerHTML = '';
        if (special) {
            const ul = special.querySelector('ul');
            if (ul) ul.innerHTML = '';
            special.classList.add('hidden');
        }
        if (dangerValue) dangerValue.innerHTML = '';
        if (remainingTime) remainingTime.value = 0;
        if (epResult) epResult.textContent = '2 EP';
        if (targetResult) targetResult.textContent = '--';

        this.clearVictoryDefeat();

        if (window.Combat) {
            window.Combat.currentPhase = 0;
            if (window.Combat.updatePhaseTracker) {
                window.Combat.updatePhaseTracker();
            }
            if (window.Combat.updateDashboard) {
                window.Combat.updateDashboard();
            }
        }
    },

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;

        const picker = Utils.byId('adventurePicker');
        const adventureId = picker?.value || '';

        if (!adventureId) {
            this.resetUIToDefaults();
            window.UI?.setStatus?.('Bereit.');
            return;
        }

        window.UI?.setStatus?.('⏳ Abenteuer wird geladen...');

        try {
            const advData = await window.API?.getAdventure?.(adventureId);

            if (!advData) {
                throw new Error('Abenteuer-Datei fehlt.');
            }

            const cardData = await window.API?.getCards?.(advData.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];

            if (window.Renderer?.renderSetup) {
                window.Renderer.renderSetup(advData, allCards);
            }

            this.renderStory(advData);
            this.setVictoryDefeat(advData);

            if (window.Combat?.initializeForAdventure) {
                window.Combat.initializeForAdventure(advData, allCards);
            } else {
                if (window.Combat?.updateDashboard) {
                    window.Combat.updateDashboard();
                }
                if (window.Combat?.updatePhaseTracker) {
                    window.Combat.updatePhaseTracker();
                }
            }

            if (!skipPersist && !this.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }

            window.UI?.setStatus?.(`✅ Abenteuer geladen: ${advData.name}`);
        } catch (error) {
            console.error(error);
            window.UI?.setStatus?.(`❌ Fehler: ${error.message}`);
        }
    },

    async restoreSavedState() {
        if (!window.StorageManager) {
            return;
        }

        const state = window.StorageManager.loadState();
        if (!state) return;

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');

        this.isApplyingSavedState = true;

        try {
            if (heroCount) {
                heroCount.value = String(state.heroCount ?? 2);
            }

            if (difficulty) {
                difficulty.value = state.difficulty || 'normal';
            }

            if (picker && state.selectedAdventure) {
                picker.value = state.selectedAdventure;
                await this.handleUpdate({ skipPersist: true });
            } else {
                this.resetUIToDefaults();
            }

            if (window.StorageManager.applyHeroStats) {
                window.StorageManager.applyHeroStats(state.heroStats);
            }

            if (window.StorageManager.applyChecklistState) {
                window.StorageManager.applyChecklistState(state.checklist);
            }

            if (window.StorageManager.applyUIState) {
                window.StorageManager.applyUIState(state.sections);
            }

            if (window.StorageManager.applyCombatState) {
                window.StorageManager.applyCombatState(state.combatState);
            }

            if (window.Combat) {
                window.Combat.currentPhase = Number(state.combatPhase ?? 0) || 0;

                if (window.Combat.updatePhaseTracker) {
                    window.Combat.updatePhaseTracker();
                }
            }
        } finally {
            this.isApplyingSavedState = false;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.App?.init) {
        window.App.init();
    }
});

```

---

## 📄 Datei: js/archive.js
```js
window.Archive = {
    currentSet: 'base_game',
    allCards: [],
    filteredCards: [],

    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    async open() {
        const modal = Utils.byId('archive-modal');
        if (!modal) return;

        modal.style.display = 'flex';

        if (!this.allCards.length) {
            await this.loadSet(this.currentSet);
        } else {
            this.render();
        }
    },

    close() {
        const modal = Utils.byId('archive-modal');
        if (!modal) return;

        modal.style.display = 'none';
    },

    async loadSet(setKey = 'base_game') {
        this.currentSet = String(setKey || 'base_game').trim() || 'base_game';

        const grid = Utils.byId('archive-grid');
        if (grid) {
            grid.innerHTML = '<p class="placeholder-text">Archiv wird geladen ...</p>';
        }

        try {
            const master = await window.API?.getMasterIndex?.(this.currentSet);
            const entries = this.normalizeArray(master?.cards);

            const loadedCards = [];

            for (const entry of entries) {
                try {
                    if (entry?.detail_path) {
                        const detail = await window.API.getCatalogCard(entry.detail_path);
                        if (detail) {
                            loadedCards.push(detail);
                            continue;
                        }
                    }

                    if (entry?.id) {
                        const fallbackCard = await window.API.findCardById(entry.id, this.currentSet);
                        if (fallbackCard) {
                            loadedCards.push(fallbackCard);
                        }
                    }
                } catch (error) {
                    console.warn('Archivkarte konnte nicht geladen werden:', entry?.id, error);
                }
            }

            this.allCards = loadedCards;
            this.filteredCards = [...loadedCards];
            this.render();

            const searchInput = Utils.byId('archive-search');
            if (searchInput) {
                searchInput.value = '';
            }
        } catch (error) {
            console.error('Fehler beim Laden des Archivs:', error);

            if (grid) {
                grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Archivs.</p>';
            }
        }
    },

    handleSearch(searchTerm = '') {
        const term = String(searchTerm ?? '').trim().toLowerCase();

        if (!term) {
            this.filteredCards = [...this.allCards];
            this.render();
            return;
        }

        this.filteredCards = this.allCards.filter(card => {
            const name = String(card?.name ?? '').toLowerCase();
            const type = String(card?.type ?? '').toLowerCase();
            const category = String(card?.card_category ?? '').toLowerCase();
            const status = String(card?.status ?? '').toLowerCase();
            const searchText = String(card?.search_text ?? '').toLowerCase();
            const tags = this.normalizeArray(card?.tags).join(' ').toLowerCase();
            const customTags = this.normalizeArray(card?.custom_tags).join(' ').toLowerCase();
            const keywords = this.normalizeArray(card?.keywords).join(' ').toLowerCase();
            const notes = String(card?.note ?? card?.notes ?? '').toLowerCase();

            return (
                name.includes(term) ||
                type.includes(term) ||
                category.includes(term) ||
                status.includes(term) ||
                searchText.includes(term) ||
                tags.includes(term) ||
                customTags.includes(term) ||
                keywords.includes(term) ||
                notes.includes(term)
            );
        });

        this.render();
    },

    getImageForCard(card) {
        return (
            card?.images?.front ||
            card?.image ||
            'assets/images/placeholder.jpg'
        );
    },

    render() {
        const grid = Utils.byId('archive-grid');
        if (!grid) return;

        if (!this.filteredCards.length) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
            return;
        }

        grid.innerHTML = this.filteredCards.map(card => {
            const image = this.getImageForCard(card);
            const id = Utils.escapeHtml(card?.id ?? '');
            const name = Utils.escapeHtml(card?.name ?? 'Unbenannte Karte');
            const type = Utils.escapeHtml(card?.type ?? 'karte');
            const status = Utils.escapeHtml(card?.status ?? '');

            return `
                <div class="archive-card" data-card-id="${id}">
                    <img
                        src="${Utils.escapeHtml(image)}"
                        alt="${name}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='assets/images/placeholder.jpg';"
                    >
                    <p>${name}</p>
                    <small>${type}${status ? ` • ${status}` : ''}</small>
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.archive-card').forEach(cardEl => {
            cardEl.addEventListener('click', async () => {
                const cardId = cardEl.dataset.cardId;
                if (!cardId) return;

                await window.API?.openCardDetailById?.(cardId);
            });
        });
    },

    init() {
        const searchInput = Utils.byId('archive-search');
        const modal = Utils.byId('archive-modal');

        if (searchInput && !searchInput.dataset.bound) {
            searchInput.addEventListener('input', event => {
                this.handleSearch(event.target.value);
            });
            searchInput.dataset.bound = 'true';
        }

        if (modal && !modal.dataset.bound) {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.close();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Archive?.init) {
        window.Archive.init();
    }
});

```

---

## 📄 Datei: js/combat.js
```js
window.Combat = {
    currentPhase: 0,
    phaseLabels: [
        '1. Heldenphase',
        '2. Schergenphase',
        '3. Anführerphase',
        '4. Zeitphase'
    ],
    currentAdventure: null,
    currentCards: [],

    getHeroCount() {
        const el = Utils.byId('heroCount');
        const value = Number(el?.value ?? 2);
        return Number.isFinite(value) && value > 0 ? value : 2;
    },

    getDifficulty() {
        return String(Utils.byId('difficulty')?.value ?? 'normal');
    },

    getDefaultHeroLp() {
        return 40;
    },

    getDefaultHeroFate() {
        return 0;
    },

    getHeroDashboard() {
        return Utils.byId('heroDashboard');
    },

    getRemainingTimeInput() {
        return Utils.byId('remainingTime');
    },

    getEpResultEl() {
        return Utils.byId('ep-result');
    },

    getTargetResultEl() {
        return Utils.byId('targetResult');
    },

    getPhaseSteps() {
        return Utils.qsa('#phaseTracker .step');
    },

    initializeForAdventure(adventure, cards = []) {
        this.currentAdventure = adventure ?? null;
        this.currentCards = Array.isArray(cards) ? cards : [];
        this.currentPhase = 0;

        this.updateDashboard();
        this.updatePhaseTracker();

        const remainingTime = this.getRemainingTimeInput();
        const startValue = this.getTimelineStartValue();

        if (remainingTime) {
            const currentValue = Number(remainingTime.value);
            remainingTime.value = Number.isFinite(currentValue) && currentValue > 0
                ? currentValue
                : startValue;
        }

        this.updateEpResult();
        this.resetTargetResult();
    },

    getTimelineStartValue() {
        const timelineCard = (this.currentCards || []).find(card => String(card?.type ?? '') === 'timeline');
        const cardStartValue = Number(timelineCard?.stats?.start_value);

        if (Number.isFinite(cardStartValue) && cardStartValue >= 0) {
            return cardStartValue;
        }

        const adventureStartValue = Number(this.currentAdventure?.setup?.start_value);
        if (Number.isFinite(adventureStartValue) && adventureStartValue >= 0) {
            return adventureStartValue;
        }

        return 6;
    },

    buildHeroCard(heroIndex, heroState = {}) {
        const lp = Number.isFinite(Number(heroState.lp))
            ? Number(heroState.lp)
            : this.getDefaultHeroLp();

        const fate = Number.isFinite(Number(heroState.fate))
            ? Number(heroState.fate)
            : this.getDefaultHeroFate();

        return `
            <div class="hero-card" data-hero-index="${heroIndex}">
                <h4>Held ${heroIndex}</h4>

                <div class="stat">
                    <span aria-hidden="true">💗</span>
                    <span data-stat="lp">${Utils.escapeHtml(lp)}</span>
                    <button type="button" data-action="lp-minus" aria-label="Lebenspunkte verringern">-</button>
                    <button type="button" data-action="lp-plus" aria-label="Lebenspunkte erhöhen">+</button>
                </div>

                <div class="stat" style="margin-top: 8px;">
                    <span aria-hidden="true">🍀</span>
                    <span data-stat="fate">${Utils.escapeHtml(fate)}</span>
                    <button type="button" data-action="fate-minus" aria-label="Schicksalspunkte verringern">-</button>
                    <button type="button" data-action="fate-plus" aria-label="Schicksalspunkte erhöhen">+</button>
                </div>
            </div>
        `;
    },

    updateDashboard(savedHeroStats = null) {
        const container = this.getHeroDashboard();
        if (!container) return;

        const heroCount = this.getHeroCount();
        const stats = savedHeroStats && typeof savedHeroStats === 'object'
            ? savedHeroStats
            : this.readCurrentHeroStats();

        container.innerHTML = Array.from({ length: heroCount }, (_, i) => {
            const heroIndex = i + 1;
            return this.buildHeroCard(heroIndex, stats[heroIndex] || {});
        }).join('');

        this.bindDashboardButtons();
    },

    readCurrentHeroStats() {
        const container = this.getHeroDashboard();
        const result = {};

        if (!container) return result;

        container.querySelectorAll('.hero-card').forEach(card => {
            const heroIndex = Number(card.dataset.heroIndex);
            const lp = Number(card.querySelector('[data-stat="lp"]')?.textContent ?? this.getDefaultHeroLp());
            const fate = Number(card.querySelector('[data-stat="fate"]')?.textContent ?? this.getDefaultHeroFate());

            result[heroIndex] = {
                lp: Number.isFinite(lp) ? lp : this.getDefaultHeroLp(),
                fate: Number.isFinite(fate) ? fate : this.getDefaultHeroFate()
            };
        });

        return result;
    },

    bindDashboardButtons() {
        const container = this.getHeroDashboard();
        if (!container || container.dataset.boundCombatDashboard === 'true') return;

        container.addEventListener('click', event => {
            const button = event.target.closest('button[data-action]');
            if (!button) return;

            const heroCard = button.closest('.hero-card');
            if (!heroCard) return;

            const action = button.dataset.action;
            const lpEl = heroCard.querySelector('[data-stat="lp"]');
            const fateEl = heroCard.querySelector('[data-stat="fate"]');

            if (action === 'lp-minus' && lpEl) {
                lpEl.textContent = String(Math.max(0, Number(lpEl.textContent) - 1));
            }

            if (action === 'lp-plus' && lpEl) {
                lpEl.textContent = String(Number(lpEl.textContent) + 1);
            }

            if (action === 'fate-minus' && fateEl) {
                fateEl.textContent = String(Math.max(0, Number(fateEl.textContent) - 1));
            }

            if (action === 'fate-plus' && fateEl) {
                fateEl.textContent = String(Number(fateEl.textContent) + 1);
            }

            if (window.StorageManager?.persist) {
                window.StorageManager.persist();
            }
        });

        container.dataset.boundCombatDashboard = 'true';
    },

    updatePhaseTracker() {
        const steps = this.getPhaseSteps();
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentPhase);
        });
    },

    prevPhase() {
        this.currentPhase = (this.currentPhase - 1 + this.phaseLabels.length) % this.phaseLabels.length;
        this.updatePhaseTracker();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    nextPhase() {
        const wasTimePhase = this.currentPhase === this.phaseLabels.length - 1;

        this.currentPhase = (this.currentPhase + 1) % this.phaseLabels.length;
        this.updatePhaseTracker();

        if (wasTimePhase) {
            this.advanceTimeMarker();
        }

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    advanceTimeMarker() {
        const input = this.getRemainingTimeInput();
        if (!input) return;

        const current = Number(input.value);
        const next = Number.isFinite(current) ? Math.max(0, current - 1) : 0;

        input.value = next;
        this.updateEpResult();
    },

    rollTarget() {
        const el = this.getTargetResultEl();
        if (!el) return;

        const heroCount = this.getHeroCount();
        const result = Math.max(1, Math.ceil(Math.random() * heroCount));

        el.textContent = `Held ${result}`;

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    resetTargetResult() {
        const el = this.getTargetResultEl();
        if (el) {
            el.textContent = '--';
        }
    },

    updateEpResult() {
        const el = this.getEpResultEl();
        if (!el) return;

        const difficulty = this.getDifficulty();
        const remainingTime = Number(this.getRemainingTimeInput()?.value ?? 0);

        let ep = 2;

        if (difficulty === 'easy') ep += 1;
        if (difficulty === 'hard') ep -= 1;

        if (remainingTime >= 5) ep += 1;
        if (remainingTime <= 1) ep -= 1;

        ep = Math.max(0, ep);

        el.textContent = `${ep} EP`;

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    applyIntermission() {
        const dashboard = this.getHeroDashboard();
        if (!dashboard) return;

        dashboard.querySelectorAll('.hero-card').forEach(card => {
            const lpEl = card.querySelector('[data-stat="lp"]');
            const fateEl = card.querySelector('[data-stat="fate"]');

            if (lpEl) {
                const currentLp = Number(lpEl.textContent);
                lpEl.textContent = String(Math.max(0, currentLp + 3));
            }

            if (fateEl) {
                const currentFate = Number(fateEl.textContent);
                fateEl.textContent = String(Math.max(0, currentFate + 1));
            }
        });

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    bindGlobalCombatInputs() {
        const remainingTime = this.getRemainingTimeInput();
        const difficulty = Utils.byId('difficulty');

        if (remainingTime && !remainingTime.dataset.boundCombat) {
            remainingTime.addEventListener('input', () => {
                this.updateEpResult();
            });
            remainingTime.dataset.boundCombat = 'true';
        }

        if (difficulty && !difficulty.dataset.boundCombat) {
            difficulty.addEventListener('change', () => {
                this.updateEpResult();
            });
            difficulty.dataset.boundCombat = 'true';
        }
    },

    init() {
        this.bindGlobalCombatInputs();
        this.updatePhaseTracker();
        this.updateDashboard();
        this.updateEpResult();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Combat?.init) {
        window.Combat.init();
    }
});

```

---

## 📄 Datei: js/config.js
```js
window.CONFIG = {
    defaultSet: 'base_game',

    paths: {
        dataRoot: 'data',
        adventuresRoot: 'data/adventures',
        cardsRoot: 'data/cards',
        manualRoot: 'data/manual'
    },

    sets: {
        base_game: {
            id: 'base_game',
            name: 'Aventuria Grundbox',
            adventurePath: 'data/adventures/base_game',
            cardRoot: 'data/cards/base_game',
            catalogRoot: 'data/cards/base_game/catalog',
            manualRoot: 'data/manual/base_game',
            masterIndex: 'data/cards/base_game/master_base_game.json'
        }
    },

    getSet(setKey = 'base_game') {
        const normalizedKey = String(setKey || this.defaultSet).trim() || this.defaultSet;
        return this.sets[normalizedKey] || this.sets[this.defaultSet];
    },

    getAdventurePath(adventureId, setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.adventurePath}/${id}.json`;
    },

    getLegacyAdventureCardsPath(adventureId, setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.cardRoot}/${id}/${id}.json`;
    },

    getMasterIndexPath(setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        return setConfig.masterIndex;
    },

    getCatalogRoot(setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        return setConfig.catalogRoot;
    },

    getManualPagePath(pageNumber, setKey = 'base_game') {
        const setConfig = this.getSet(setKey);
        const page = String(pageNumber).padStart(2, '0');
        return `${setConfig.manualRoot}/page_${page}.json`;
    }
};

```

---

## 📄 Datei: js/narrative.js
```js
window.Narrative = {
    normalizeChecks(checks) {
        return Utils.normalizeArray(checks);
    },

    renderStory(data) {
        const container = Utils.byId('story-area');

        if (!container || !data || !data.narrative) {
            if (container) {
                container.innerHTML = '';
            }
            return;
        }

        const intro = Utils.escapeHtml(data.narrative.intro ?? '');
        const checks = this.normalizeChecks(data.narrative.checks);

        container.innerHTML = `
            <div class="card-list">
                <h3>📖 Die Geschichte</h3>
                <p class="story-text">${intro}</p>

                <div class="probes-area">
                    <h4>Interaktive Proben:</h4>

                    ${checks.length
                        ? checks.map((check, index) => `
                            <div class="probe-item" data-check-index="${index}">
                                <p>
                                    <strong>${Utils.escapeHtml(check?.skill ?? 'Probe')}:</strong>
                                    ${Utils.escapeHtml(check?.text ?? '')}
                                </p>

                                <div class="probe-buttons">
                                    <button type="button" class="btn-sm success" data-check-result="success">
                                        Erfolg
                                    </button>
                                    <button type="button" class="btn-sm fail" data-check-result="fail">
                                        Misserfolg
                                    </button>
                                </div>

                                <div class="check-result" aria-live="polite"></div>
                            </div>
                        `).join('')
                        : '<p>Keine Proben vorhanden.</p>'
                    }
                </div>
            </div>
        `;

        this.bindCheckButtons(checks);
    },

    showCheckResult(button, type, resultText) {
        const probeItem = button.closest('.probe-item');
        if (!probeItem) return;

        const resultBox = probeItem.querySelector('.check-result');
        if (!resultBox) return;

        resultBox.classList.remove('success', 'fail', 'show');

        resultBox.innerHTML = `
            <strong>${type === 'success' ? 'Erfolg:' : 'Misserfolg:'}</strong>
            ${Utils.escapeHtml(resultText)}
        `;

        resultBox.classList.add(type === 'success' ? 'success' : 'fail');
        resultBox.classList.add('show');
    },

    bindCheckButtons(checks) {
        document.querySelectorAll('.probe-item').forEach(item => {
            const index = parseInt(item.dataset.checkIndex, 10);
            const check = checks[index];

            if (!check || !check.results) return;

            item.querySelectorAll('[data-check-result]').forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.dataset.checkResult;
                    const resultText = check.results?.[type] ?? 'Kein Ergebnis vorhanden.';

                    this.showCheckResult(button, type, resultText);

                    if (window.StorageManager?.persist) {
                        window.StorageManager.persist();
                    }
                });
            });
        });
    }
};

```

---

## 📄 Datei: js/rulebook.js
```js
window.Rulebook = {
    rulesData: [],
    currentPage: 1,

    validManualPages: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ],

    indexData: [
        { p: 1, title: 'Titelblatt' },
        { p: 2, title: 'Was ist Aventurien?' },
        { p: 4, title: 'Südosten & ferne Regionen' },
        { p: 5, title: 'Religionen, Kulturen & Gefahren' },
        { p: 6, title: 'Vorbereitung' },
        { p: 7, title: 'Spielmaterial' },
        { p: 9, title: 'Das Abenteuer' },
        { p: 10, title: 'Der Kampf (Setup)' },
        { p: 13, title: 'Kampfablauf' },
        { p: 15, title: 'Sieg & Atempause' },
        { p: 17, title: 'Silvanas Befreiung' },
        { p: 19, title: 'Leute, die nicht spielen' },
        { p: 20, title: 'Wildenstein Akt I' },
        { p: 21, title: 'Wildenstein Akt II' },
        { p: 23, title: 'Wildenstein Akt III' },
        { p: 24, title: 'Übersichten' }
    ],

    stripCitationMarkers(text) {
        return String(text ?? '').replace(/\s*\[cite:\s*[\d\- ,]+\]/gi, '').trim();
    },

    getModal() {
        return Utils.byId('rulebook-modal');
    },

    getReaderTab() {
        return Utils.byId('reader-tab');
    },

    getCodexTab() {
        return Utils.byId('codex-tab');
    },

    getManualContent() {
        return Utils.byId('manual-content');
    },

    getPageIndicator() {
        return Utils.byId('manual-page-indicator');
    },

    getManualPageList() {
        return Utils.byId('manual-page-list');
    },

    getCodexResults() {
        return Utils.byId('codex-results');
    },

    getCodexSearch() {
        return Utils.byId('codex-search');
    },

    open() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';
        this.showTab('reader');

        if (!this.getManualPageList()?.children.length) {
            this.init();
        }

        if (!this.currentPage || !this.validManualPages.includes(this.currentPage)) {
            this.currentPage = this.validManualPages[0];
        }

        this.loadPage(this.currentPage);
    },

    close() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'none';
    },

    showTab(tab) {
        const readerTab = this.getReaderTab();
        const codexTab = this.getCodexTab();

        if (readerTab) {
            readerTab.classList.toggle('hidden', tab !== 'reader');
        }

        if (codexTab) {
            codexTab.classList.toggle('hidden', tab !== 'codex');
        }

        const buttons = Utils.qsa('#rulebook-modal .tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        if (tab === 'reader' && buttons[0]) {
            buttons[0].classList.add('active');
        }

        if (tab === 'codex' && buttons[1]) {
            buttons[1].classList.add('active');
        }
    },

    getNextManualPage(current) {
        return this.validManualPages.find(page => page > current) ?? current;
    },

    getPrevManualPage(current) {
        const prev = [...this.validManualPages].reverse().find(page => page < current);
        return prev ?? current;
    },

    async loadPage(pageNumber) {
        const nr = Number(pageNumber);
        const container = this.getManualContent();
        const indicator = this.getPageIndicator();

        if (!container) return;

        if (!this.validManualPages.includes(nr)) {
            container.innerHTML = '<div class="reader-text">Diese Seite ist aktuell nicht verfügbar.</div>';
            if (indicator) {
                indicator.textContent = `Seite ? / ${this.validManualPages.length}`;
            }
            return;
        }

        container.innerHTML = '<div class="reader-text">Lade Schriftrolle...</div>';

        try {
            const res = await fetch(`data/manual/base_game/page_${String(nr).padStart(2, '0')}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            const title = Utils.escapeHtml(this.stripCitationMarkers(data?.title ?? `Seite ${nr}`));
            const content = Utils.escapeHtml(this.stripCitationMarkers(data?.content ?? '')).replace(/\n/g, '<br>');
            const image = String(data?.image ?? '').trim();

            container.innerHTML = `
                <div class="reader-text">
                    <h3>${title}</h3>
                    ${image ? `
                        <div class="img-wrapper">
                            <img
                                src="${Utils.escapeHtml(image)}"
                                alt="${title}"
                                class="manual-page-img"
                                loading="lazy"
                            >
                        </div>
                    ` : ''}
                    <div class="reader-text">${content}</div>
                </div>
            `;

            if (indicator) {
                indicator.textContent = `Seite ${nr} / ${this.validManualPages.length}`;
            }

            const titleEl = Utils.byId('manual-title');
            if (titleEl) {
                titleEl.textContent = this.stripCitationMarkers(data?.title ?? `Seite ${nr}`);
            }

            this.currentPage = nr;
        } catch (error) {
            console.error('Fehler beim Laden der Regelbuch-Seite:', error);
            container.innerHTML = '<div class="reader-text">Fehler beim Laden der Seite.</div>';
        }
    },

    nextPage() {
        this.loadPage(this.getNextManualPage(this.currentPage));
    },

    prevPage() {
        this.loadPage(this.getPrevManualPage(this.currentPage));
    },

    jumpToPage(pageNumber) {
        if (!this.validManualPages.includes(Number(pageNumber))) {
            console.warn(`Regelbuch-Seite ${pageNumber} ist aktuell nicht verfügbar.`);
            return;
        }

        this.showTab('reader');
        this.loadPage(Number(pageNumber));
    },

    filterRules(term = '') {
        const results = this.getCodexResults();
        if (!results) return;

        const normalized = String(term ?? '').trim().toLowerCase();

        if (!normalized) {
            results.innerHTML = '';
            return;
        }

        const filtered = this.rulesData.filter(rule => {
            const title = String(rule?.title ?? '').toLowerCase();
            const text = String(rule?.text ?? '').toLowerCase();
            return title.includes(normalized) || text.includes(normalized);
        });

        results.innerHTML = filtered.length
            ? filtered.map(rule => `
                <div class="rule-entry">
                    <h4>${Utils.escapeHtml(rule.title)}</h4>
                    <p>${Utils.escapeHtml(rule.text)}</p>
                </div>
            `).join('')
            : '<p>Kein Treffer im Kodex.</p>';
    },

    async buildRulesData() {
        const pages = [];

        for (const nr of this.validManualPages) {
            try {
                const res = await fetch(`data/manual/base_game/page_${String(nr).padStart(2, '0')}.json`);
                if (!res.ok) continue;

                const data = await res.json();
                pages.push({
                    page: nr,
                    title: this.stripCitationMarkers(data?.title ?? `Seite ${nr}`),
                    text: this.stripCitationMarkers(data?.content ?? '')
                });
            } catch (error) {
                console.warn(`Kodex-Seite ${nr} konnte nicht geladen werden.`, error);
            }
        }

        this.rulesData = pages;
    },

    async init() {
        const list = this.getManualPageList();
        if (list) {
            list.innerHTML = '';

            const fragment = document.createDocumentFragment();

            this.indexData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `S. ${item.p} – ${item.title}`;
                li.addEventListener('click', () => this.jumpToPage(item.p));
                fragment.appendChild(li);
            });

            list.appendChild(fragment);
        }

        await this.buildRulesData();

        const search = this.getCodexSearch();
        if (search && !search.dataset.bound) {
            search.addEventListener('input', event => {
                this.filterRules(event.target.value);
            });
            search.dataset.bound = 'true';
        }

        const modal = this.getModal();
        if (modal && !modal.dataset.bound) {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.close();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Rulebook?.init) {
        window.Rulebook.init();
    }
});

```

---

## 📄 Datei: js/state.js
```js
window.State = {
    data: null,

    getDefaultState() {
        return {
            version: 3,
            selectedAdventure: '',
            heroCount: 2,
            difficulty: 'normal',
            combatPhase: 0,
            heroStats: {
                1: { lp: 40, fate: 0 },
                2: { lp: 40, fate: 0 }
            },
            checklist: {},
            sections: {
                combatToolsOpen: true,
                intermissionOpen: true
            },
            combatState: {
                remainingTime: 0,
                epResult: '2 EP',
                targetResult: '--'
            }
        };
    },

    clone(value) {
        return JSON.parse(JSON.stringify(value));
    },

    normalizeHeroStats(heroStats, heroCount = 2) {
        const result = {};
        const safeCount = Math.min(Math.max(Number(heroCount) || 2, 1), 4);

        for (let i = 1; i <= 4; i += 1) {
            const current = heroStats?.[i] ?? heroStats?.[String(i)] ?? {};
            result[i] = {
                lp: Number.isFinite(Number(current.lp)) ? Number(current.lp) : 40,
                fate: Number.isFinite(Number(current.fate)) ? Number(current.fate) : 0
            };
        }

        for (let i = safeCount + 1; i <= 4; i += 1) {
            if (!result[i]) {
                result[i] = { lp: 40, fate: 0 };
            }
        }

        return result;
    },

    mergeState(state) {
        const defaults = this.getDefaultState();
        const incoming = Utils.isObject(state) ? state : {};

        const merged = {
            ...defaults,
            ...incoming,
            sections: {
                ...defaults.sections,
                ...(Utils.isObject(incoming.sections) ? incoming.sections : {})
            },
            combatState: {
                ...defaults.combatState,
                ...(Utils.isObject(incoming.combatState) ? incoming.combatState : {})
            }
        };

        merged.heroCount = Math.min(Math.max(Number(merged.heroCount) || 2, 1), 4);
        merged.heroStats = this.normalizeHeroStats(incoming.heroStats, merged.heroCount);
        merged.checklist = Utils.isObject(incoming.checklist) ? incoming.checklist : {};

        return merged;
    },

    init(initialState = null) {
        this.data = this.mergeState(initialState);
    },

    reset() {
        this.data = this.getDefaultState();
    },

    getState() {
        if (!this.data) {
            this.reset();
        }
        return this.data;
    },

    replaceState(nextState) {
        this.data = this.mergeState(nextState);
    },

    setSelectedAdventure(adventureId) {
        this.getState().selectedAdventure = Utils.normalizeString(adventureId);
    },

    setHeroCount(heroCount) {
        const state = this.getState();
        state.heroCount = Math.min(Math.max(Number(heroCount) || 2, 1), 4);
        state.heroStats = this.normalizeHeroStats(state.heroStats, state.heroCount);
    },

    setDifficulty(difficulty) {
        this.getState().difficulty = Utils.normalizeString(difficulty || 'normal') || 'normal';
    },

    setCombatPhase(phase) {
        this.getState().combatPhase = Number.isFinite(Number(phase)) ? Number(phase) : 0;
    },

    setSectionOpen(sectionKey, isOpen) {
        this.getState().sections[sectionKey] = Boolean(isOpen);
    },

    setCombatField(field, value) {
        this.getState().combatState[field] = value;
    },

    setHeroStat(heroIndex, statKey, value) {
        const state = this.getState();
        const index = Number(heroIndex);

        if (!state.heroStats[index]) {
            state.heroStats[index] = { lp: 40, fate: 0 };
        }

        state.heroStats[index][statKey] = Number.isFinite(Number(value))
            ? Number(value)
            : 0;
    },

    setChecklistItem(cardId, checked) {
        const key = Utils.normalizeString(cardId);
        if (!key) return;
        this.getState().checklist[key] = Boolean(checked);
    },

    replaceChecklist(checklist) {
        this.getState().checklist = Utils.isObject(checklist) ? checklist : {};
    }
};

window.State.init();

```

---

## 📄 Datei: js/storage.js
```js
window.StorageManager = {
    storageKey: 'aventuria_helper_state_v3',

    getDefaultState() {
        return window.State.getDefaultState();
    },

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) {
                return this.getDefaultState();
            }

            const parsed = JSON.parse(raw);
            return window.State.mergeState(parsed);
        } catch (error) {
            console.error('Fehler beim Laden des Spielstands:', error);
            return this.getDefaultState();
        }
    },

    saveState(state) {
        try {
            const normalized = window.State.mergeState(state);
            localStorage.setItem(this.storageKey, JSON.stringify(normalized));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern des Spielstands:', error);
            return false;
        }
    },

    clearState() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error('Fehler beim Löschen des Spielstands:', error);
        }
    },

    applyHeroStats(heroStats) {
        if (!window.Combat || typeof window.Combat.updateDashboard !== 'function') {
            return;
        }

        window.Combat.updateDashboard(heroStats || window.State.getState().heroStats);
    },

    applyChecklistState(checklist) {
        const state = Utils.isObject(checklist) ? checklist : {};
        const items = document.querySelectorAll('.checklist-item');

        items.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox) return;

            const cardId = item.dataset.cardId || `item_${index}`;
            checkbox.checked = Boolean(state[cardId]);
        });
    },

    applyUIState(sections) {
        const safeSections = {
            ...window.State.getDefaultState().sections,
            ...(Utils.isObject(sections) ? sections : {})
        };

        const combatTools = Utils.byId('combat-tools-section');
        const intermission = Utils.byId('intermission-section');

        if (combatTools) {
            combatTools.classList.toggle('show', Boolean(safeSections.combatToolsOpen));
        }

        if (intermission) {
            intermission.classList.toggle('show', Boolean(safeSections.intermissionOpen));
        }
    },

    applyCombatState(combatState) {
        const state = {
            ...window.State.getDefaultState().combatState,
            ...(Utils.isObject(combatState) ? combatState : {})
        };

        const remainingTime = Utils.byId('remainingTime');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');

        if (remainingTime) {
            remainingTime.value = Number.isFinite(Number(state.remainingTime))
                ? Number(state.remainingTime)
                : 0;
        }

        if (epResult) {
            epResult.textContent = String(state.epResult ?? '2 EP');
        }

        if (targetResult) {
            targetResult.textContent = String(state.targetResult ?? '--');
        }
    },

    persist() {
        this.saveState(window.State.getState());
    },

    bindAutoSave() {
        document.addEventListener('change', event => {
            const target = event.target;
            if (!target) return;

            if (target.matches('.checklist-item input[type="checkbox"]')) {
                const item = target.closest('.checklist-item');
                const cardId = item?.dataset?.cardId || '';
                window.State.setChecklistItem(cardId, Boolean(target.checked));
                this.persist();
                return;
            }

            if (target.matches('#remainingTime')) {
                window.State.setCombatField('remainingTime', Number(target.value) || 0);
                this.persist();
            }
        });

        window.addEventListener('beforeunload', () => {
            this.persist();
        });
    }
};

```

---

## 📄 Datei: js/ui-renderer.js
```js
window.Renderer = {
    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    normalizeCard(card) {
        const fallbackImage =
            card?.images?.front ||
            card?.image ||
            '';

        return {
            id: Utils.normalizeString(card?.id),
            name: Utils.normalizeString(card?.name || 'Unbenannte Karte'),
            type: Utils.normalizeString(card?.type),
            status: Utils.normalizeString(card?.status),
            image: Utils.normalizeString(fallbackImage),
            note: Utils.normalizeString(card?.note ?? card?.notes ?? ''),
            rules: card?.rules ?? {},
            stats: card?.stats ?? {},
            tags: this.normalizeArray(card?.tags),
            keywords: this.normalizeArray(card?.keywords),
            source: card?.source ?? {}
        };
    },

    getCardLabel(card) {
        const normalized = this.normalizeCard(card);
        return normalized.name || normalized.id || 'Unbenannte Karte';
    },

    getCardImage(card) {
        const normalized = this.normalizeCard(card);
        return normalized.image || '';
    },

    getCardTypeLabel(card) {
        const type = Utils.normalizeString(card?.type);

        const map = {
            timeline: 'Zeitskala',
            leader: 'Anführer',
            minion: 'Scherge',
            hero_action: 'Heldenaktion',
            special: 'Spezialkarte',
            reward: 'Belohnung',
            training: 'Training',
            adventure_card: 'Abenteuerkarte',
            environment: 'Kampfumgebung'
        };

        return map[type] || (type || 'Karte');
    },

    findCardById(cards, id) {
        const targetId = Utils.normalizeString(id);
        return this.normalizeArray(cards).find(card => Utils.normalizeString(card?.id) === targetId) || null;
    },

    resolveCardEntry(entry, allCards) {
        if (!entry) return null;

        if (typeof entry === 'string') {
            const found = this.findCardById(allCards, entry);
            if (found) return found;

            return {
                id: entry,
                name: entry,
                type: '',
                status: 'missing',
                image: '',
                note: 'Karte konnte im geladenen Kartenpool nicht gefunden werden.'
            };
        }

        const entryId = Utils.normalizeString(entry?.id);
        if (entryId) {
            const found = this.findCardById(allCards, entryId);
            if (found) {
                return {
                    ...found,
                    label: entry?.label ?? found?.label ?? null
                };
            }
        }

        return entry;
    },

    normalizeSetupEntries(entries, allCards) {
        return this.normalizeArray(entries)
            .map(entry => this.resolveCardEntry(entry, allCards))
            .filter(Boolean);
    },

    buildChecklistItem(card) {
        const normalized = this.normalizeCard(card);
        const label = card?.label ? Utils.normalizeString(card.label) : this.getCardLabel(normalized);
        const safeLabel = Utils.escapeHtml(label);
        const imageSrc = this.getCardImage(normalized);
        const cardId = Utils.escapeHtml(normalized.id || label);
        const hasPreview = Boolean(imageSrc);
        const isMissing = normalized.status === 'missing';

        const previewAttr = hasPreview
            ? ` data-image="${Utils.escapeHtml(imageSrc)}" data-card-id="${cardId}" class="has-preview"`
            : '';

        const infoButton = `
            <button
                class="info-btn"
                type="button"
                title="Kartendetails anzeigen"
                data-action="open-card-detail"
                data-card-id="${cardId}"
                ${normalized.id ? '' : 'disabled'}
            >i</button>
        `;

        return `
            <li class="checklist-item" data-card-id="${cardId}">
                <input type="checkbox">
                <span${previewAttr}>${safeLabel}${isMissing ? ' ⚠️' : ''}</span>
                ${infoButton}
            </li>
        `;
    },

    bindCardPreviews(scope = document) {
        const previewTargets = scope.querySelectorAll('.has-preview[data-image]');

        previewTargets.forEach(el => {
            if (el.dataset.previewBound === 'true') return;
            el.dataset.previewBound = 'true';

            el.addEventListener('mouseenter', event => {
                const imageSrc = el.dataset.image;
                if (window.UI?.showPreview) {
                    window.UI.showPreview(event, imageSrc);
                }
            });

            el.addEventListener('mousemove', event => {
                if (window.UI?.movePreview) {
                    window.UI.movePreview(event);
                }
            });

            el.addEventListener('mouseleave', () => {
                if (window.UI?.closePreview) {
                    window.UI.closePreview();
                }
            });

            el.addEventListener('click', () => {
                const imageSrc = el.dataset.image;
                if (imageSrc && window.UI?.openPreview) {
                    window.UI.openPreview(imageSrc);
                }
            });
        });
    },

    renderListInto(containerSelector, cards) {
        const list = Utils.qs(containerSelector);
        if (!list) return;

        list.innerHTML = this.normalizeArray(cards)
            .map(card => this.buildChecklistItem(card))
            .join('');

        this.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = Utils.byId('special');
        if (!specialSection) return;

        const ul = specialSection.querySelector('ul');
        if (!ul) return;

        ul.innerHTML = this.normalizeArray(cards)
            .map(card => this.buildChecklistItem(card))
            .join('');

        specialSection.classList.toggle('hidden', cards.length === 0);
        this.bindCardPreviews(ul);
    },

    renderDanger(adventure) {
        const dangerValue = Utils.byId('danger-value');
        if (!dangerValue) return;

        const danger = Number(adventure?.danger_calc ?? 0);
        dangerValue.innerHTML = danger > 0
            ? `<strong>Gefahrenstufe:</strong> ${Utils.escapeHtml(danger)}`
            : '';
    },

    renderTitle(adventure) {
        const title = Utils.byId('title');
        if (!title) return;

        title.innerText = Utils.normalizeString(adventure?.name);
    },

    renderSetup(adventure, allCards) {
        const setupDisplay = Utils.byId('setup-display');
        if (!setupDisplay) return;

        const setup = adventure?.setup ?? {};

        const blueCards = this.normalizeSetupEntries(setup.blue_cards, allCards);
        const minionCards = this.normalizeSetupEntries(setup.minion_cards, allCards);
        const specialCards = this.normalizeSetupEntries(setup.special_cards, allCards);

        this.renderTitle(adventure);
        this.renderDanger(adventure);
        this.renderListInto('#blue-cards ul', blueCards);
        this.renderListInto('#minions ul', minionCards);
        this.renderSpecialSection(specialCards);

        setupDisplay.classList.remove('hidden');
    },

    normalizeCardDetail(card) {
        const normalized = this.normalizeCard(card);

        return {
            ...normalized,
            card_category: Utils.normalizeString(card?.card_category),
            subtypes: this.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: Utils.normalizeString(card?.rules?.passive),
                success: Utils.normalizeString(card?.rules?.success),
                fail: Utils.normalizeString(card?.rules?.fail),
                draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
                flavor: Utils.normalizeString(card?.rules?.flavor),
                timed_effects: this.normalizeArray(card?.rules?.timed_effects),
                milestones: this.normalizeArray(card?.rules?.milestones),
                action_table: this.normalizeArray(card?.rules?.action_table)
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
            <h4>Werte</h4>
            <table style="width:100%; border-collapse: collapse; margin-top: 8px;">
                <tbody>
                    ${rows.map(([label, value]) => `
                        <tr>
                            <td style="border:1px solid #8b4513; padding:8px; width:140px;"><strong>${Utils.escapeHtml(label)}</strong></td>
                            <td style="border:1px solid #8b4513; padding:8px;">${Utils.escapeHtml(value)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderActionTable(actionTable) {
        if (!actionTable.length) return '';

        return `
            <h4>Aktionstabelle</h4>
            <table style="width:100%; border-collapse: collapse; margin-top: 8px;">
                <tbody>
                    ${actionTable.map(row => `
                        <tr>
                            <td style="border:1px solid #8b4513; padding:8px; width:110px; vertical-align: top;">
                                <strong>${Utils.escapeHtml(row?.roll ?? row?.roll_min ?? '')}</strong>
                            </td>
                            <td style="border:1px solid #8b4513; padding:8px;">
                                <strong>${Utils.escapeHtml(row?.title ?? '')}</strong><br>
                                ${Utils.escapeHtml(row?.description ?? row?.text ?? '')}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderTextList(title, values) {
        const filtered = this.normalizeArray(values).filter(Boolean);
        if (!filtered.length) return '';

        return `
            <h4>${Utils.escapeHtml(title)}</h4>
            <ul>
                ${filtered.map(value => `<li>${Utils.escapeHtml(typeof value === 'string' ? value : JSON.stringify(value))}</li>`).join('')}
            </ul>
        `;
    },

    renderCardDetail(card) {
        const safeCard = this.normalizeCardDetail(card);

        let html = `<div class="reader-text">`;

        html += `<h2 style="margin-top:0;">${Utils.escapeHtml(safeCard.name)}</h2>`;

        if (safeCard.image) {
            html += `
                <div class="img-wrapper">
                    <img
                        src="${Utils.escapeHtml(safeCard.image)}"
                        alt="${Utils.escapeHtml(safeCard.name)}"
                        class="manual-page-img"
                        loading="lazy"
                    >
                </div>
            `;
        }

        html += `<p><strong>ID:</strong> ${Utils.escapeHtml(safeCard.id || '—')}</p>`;
        html += `<p><strong>Typ:</strong> ${Utils.escapeHtml(this.getCardTypeLabel(safeCard))}</p>`;

        if (safeCard.card_category) {
            html += `<p><strong>Kategorie:</strong> ${Utils.escapeHtml(safeCard.card_category)}</p>`;
        }

        if (safeCard.status) {
            html += `<p><strong>Status:</strong> ${Utils.escapeHtml(safeCard.status)}</p>`;
        }

        if (safeCard.subtypes.length) {
            html += `<p><strong>Untertypen:</strong> ${safeCard.subtypes.map(v => Utils.escapeHtml(v)).join(', ')}</p>`;
        }

        html += this.renderStatsTable(safeCard.stats);

        if (safeCard.rules?.passive) {
            html += `<p><strong>Passiv:</strong> ${Utils.escapeHtml(safeCard.rules.passive)}</p>`;
        }

        if (safeCard.rules?.success) {
            html += `<p><strong>Erfolg:</strong> ${Utils.escapeHtml(safeCard.rules.success)}</p>`;
        }

        if (safeCard.rules?.fail) {
            html += `<p><strong>Misserfolg:</strong> ${Utils.escapeHtml(safeCard.rules.fail)}</p>`;
        }

        html += this.renderTextList('Zeit-/Sondereffekte', safeCard.rules?.timed_effects);

        if (safeCard.rules?.milestones?.length) {
            html += `
                <h4>Meilensteine</h4>
                <ul>
                    ${safeCard.rules.milestones.map(item => `
                        <li>
                            <strong>${Utils.escapeHtml(item?.value ?? '')}</strong>
                            ${item?.text ? `: ${Utils.escapeHtml(item.text)}` : ''}
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        html += this.renderActionTable(safeCard.rules?.action_table || []);

        if (safeCard.rules?.draw_effect) {
            html += `<p><strong>Zugeffekt:</strong> ${Utils.escapeHtml(safeCard.rules.draw_effect)}</p>`;
        }

        if (safeCard.rules?.flavor) {
            html += `<p><strong>Beschreibung:</strong> <em>${Utils.escapeHtml(safeCard.rules.flavor)}</em></p>`;
        }

        if (safeCard.tags.length) {
            html += `<p><strong>Tags:</strong> ${safeCard.tags.map(tag => `#${Utils.escapeHtml(tag)}`).join(' ')}</p>`;
        }

        if (safeCard.keywords.length) {
            html += `<p><strong>Keywords:</strong> ${safeCard.keywords.map(v => Utils.escapeHtml(v)).join(', ')}</p>`;
        }

        if (safeCard.source?.book || safeCard.source?.page || safeCard.source?.note) {
            html += `<h4>Quelle</h4><p>`;
            if (safeCard.source?.book) {
                html += `<strong>Buch:</strong> ${Utils.escapeHtml(safeCard.source.book)}<br>`;
            }
            if (safeCard.source?.page !== null && safeCard.source?.page !== undefined && safeCard.source?.page !== '') {
                html += `<strong>Seite:</strong> ${Utils.escapeHtml(safeCard.source.page)}<br>`;
            }
            if (safeCard.source?.note) {
                html += `<strong>Hinweis:</strong> ${Utils.escapeHtml(safeCard.source.note)}`;
            }
            html += `</p>`;
        }

        if (safeCard.note) {
            html += `<p><strong>Notiz:</strong> ${Utils.escapeHtml(safeCard.note)}</p>`;
        }

        html += `</div>`;
        return html;
    },

    ensureCardDetailModal() {
        let modal = Utils.byId('card-detail-modal');

        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = 'card-detail-modal';
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" data-action="close-card-detail">&times;</span>
                <div class="tab-content" id="card-detail-content"></div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.closeCardDetail();
            }
        });

        return modal;
    },

    openCardDetail(card) {
        const modal = this.ensureCardDetailModal();
        const content = Utils.byId('card-detail-content');

        if (!modal || !content) return;

        content.innerHTML = this.renderCardDetail(card);
        modal.style.display = 'flex';
    },

    closeCardDetail() {
        const modal = Utils.byId('card-detail-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
};

```

---

## 📄 Datei: js/ui.js
```js
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
    }
};

```

---

## 📄 Datei: js/validator.js
```js
window.Validator = {
    allowedAdventureStatuses: [
        'canonical',
        'deprecated_alias',
        'migrated',
        'raw',
        'basic',
        'playable',
        'verified'
    ],

    allowedCardStatuses: [
        'raw',
        'basic',
        'playable',
        'verified',
        'migrated',
        'canonical',
        'deprecated_alias',
        'complete'
    ],

    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    },

    createResult() {
        return {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };
    },

    addError(result, message) {
        result.ok = false;
        result.errors.push(message);
    },

    addWarning(result, message) {
        result.warnings.push(message);
    },

    addInfo(result, message) {
        result.info.push(message);
    },

    validateAdventure(adventure) {
        const result = this.createResult();

        if (!this.isObject(adventure)) {
            this.addError(result, 'Abenteuerdaten fehlen oder sind kein Objekt.');
            return result;
        }

        const id = this.normalizeString(adventure.id);
        const name = this.normalizeString(adventure.name);
        const status = this.normalizeString(adventure.status);
        const narrative = adventure.narrative ?? {};
        const setup = adventure.setup ?? {};

        if (!id) {
            this.addError(result, 'Abenteuer ohne ID gefunden.');
        }

        if (!name) {
            this.addError(result, `Abenteuer "${id || 'unbekannt'}" hat keinen Namen.`);
        }

        if (status && !this.allowedAdventureStatuses.includes(status)) {
            this.addWarning(
                result,
                `Abenteuer "${id || name || 'unbekannt'}" nutzt unbekannten Status "${status}".`
            );
        }

        if (status === 'deprecated_alias') {
            if (!this.normalizeString(adventure.redirect_to)) {
                this.addError(
                    result,
                    `Alias-Abenteuer "${id || name || 'unbekannt'}" hat kein redirect_to.`
                );
            }

            return result;
        }

        if (!this.isObject(narrative)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat kein gültiges narrative-Objekt.`);
        } else {
            if (!this.normalizeString(narrative.intro)) {
                this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keine Einleitung.`);
            }

            const checks = this.normalizeArray(narrative.checks);
            checks.forEach((check, index) => {
                if (!this.isObject(check)) {
                    this.addWarning(result, `Abenteuer "${id}" enthält eine ungültige Probe an Position ${index}.`);
                    return;
                }

                if (!this.normalizeString(check.id)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne ID an Position ${index}.`);
                }

                if (!this.normalizeString(check.skill)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne Skill an Position ${index}.`);
                }

                if (!this.normalizeString(check.text)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne Text an Position ${index}.`);
                }

                if (!this.isObject(check.results)) {
                    this.addWarning(result, `Abenteuer "${id}" hat eine Probe ohne results-Objekt an Position ${index}.`);
                }
            });
        }

        if (!this.isObject(setup)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat kein gültiges setup-Objekt.`);
        } else {
            const blueCards = this.normalizeArray(setup.blue_cards);
            const minionCards = this.normalizeArray(setup.minion_cards);
            const specialCards = this.normalizeArray(setup.special_cards);

            if (!blueCards.length) {
                this.addWarning(result, `Abenteuer "${id}" hat keine blue_cards.`);
            }

            if (!this.normalizeString(setup.victory)) {
                this.addWarning(result, `Abenteuer "${id}" hat keine Siegbedingung.`);
            }

            if (!this.normalizeString(setup.defeat)) {
                this.addWarning(result, `Abenteuer "${id}" hat keine Niederlagebedingung.`);
            }

            const cardRefs = setup.card_refs;
            if (cardRefs && !this.isObject(cardRefs)) {
                this.addWarning(result, `Abenteuer "${id}" hat card_refs, aber nicht als Objekt.`);
            }

            this.validateSetupCardEntries(result, id, 'blue_cards', blueCards);
            this.validateSetupCardEntries(result, id, 'minion_cards', minionCards);
            this.validateSetupCardEntries(result, id, 'special_cards', specialCards);
        }

        const danger = Number(adventure.danger_calc);
        if (!Number.isFinite(danger)) {
            this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen danger_calc.`);
        }

        return result;
    },

    validateSetupCardEntries(result, adventureId, sectionName, entries) {
        entries.forEach((entry, index) => {
            if (typeof entry === 'string') {
                if (!this.normalizeString(entry)) {
                    this.addWarning(result, `Abenteuer "${adventureId}" enthält leeren String in ${sectionName}[${index}].`);
                }
                return;
            }

            if (!this.isObject(entry)) {
                this.addWarning(result, `Abenteuer "${adventureId}" enthält ungültigen Eintrag in ${sectionName}[${index}].`);
                return;
            }

            if (!this.normalizeString(entry.id) && !this.normalizeString(entry.label)) {
                this.addWarning(
                    result,
                    `Abenteuer "${adventureId}" hat in ${sectionName}[${index}] weder id noch label.`
                );
            }
        });
    },

    validateCard(card) {
        const result = this.createResult();

        if (!this.isObject(card)) {
            this.addError(result, 'Kartendaten fehlen oder sind kein Objekt.');
            return result;
        }

        const id = this.normalizeString(card.id);
        const name = this.normalizeString(card.name);
        const status = this.normalizeString(card.status);
        const type = this.normalizeString(card.type);

        if (!id) {
            this.addError(result, 'Karte ohne ID gefunden.');
        }

        if (!name) {
            this.addError(result, `Karte "${id || 'unbekannt'}" hat keinen Namen.`);
        }

        if (!type) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat keinen Typ.`);
        }

        if (status && !this.allowedCardStatuses.includes(status)) {
            this.addWarning(
                result,
                `Karte "${id || name || 'unbekannt'}" nutzt unbekannten Status "${status}".`
            );
        }

        if (!this.isObject(card.stats)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat kein stats-Objekt.`);
        }

        if (!this.isObject(card.rules)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat kein rules-Objekt.`);
        }

        const images = card.images;
        if (images && !this.isObject(images)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat ungültige images.`);
        }

        const adventureRefs = this.normalizeArray(card.adventure_refs);
        if (card.adventure_refs !== undefined && !Array.isArray(card.adventure_refs)) {
            this.addWarning(result, `Karte "${id || name || 'unbekannt'}" hat adventure_refs nicht als Array.`);
        } else {
            adventureRefs.forEach((ref, index) => {
                if (typeof ref === 'string') {
                    if (!this.normalizeString(ref)) {
                        this.addWarning(result, `Karte "${id}" hat leeren adventure_ref an Position ${index}.`);
                    }
                    return;
                }

                if (!this.isObject(ref) || !this.normalizeString(ref.id)) {
                    this.addWarning(result, `Karte "${id}" hat ungültigen adventure_ref an Position ${index}.`);
                }
            });
        }

        return result;
    },

    validateMasterIndex(masterIndex) {
        const result = this.createResult();

        if (!this.isObject(masterIndex)) {
            this.addError(result, 'Master-Index fehlt oder ist kein Objekt.');
            return result;
        }

        const cards = this.normalizeArray(masterIndex.cards);
        const ids = new Set();

        cards.forEach((entry, index) => {
            if (!this.isObject(entry)) {
                this.addWarning(result, `Master-Index enthält ungültigen Karteneintrag an Position ${index}.`);
                return;
            }

            const id = this.normalizeString(entry.id);
            if (!id) {
                this.addWarning(result, `Master-Index enthält Karteneintrag ohne ID an Position ${index}.`);
                return;
            }

            if (ids.has(id)) {
                this.addWarning(result, `Master-Index enthält doppelte Karten-ID "${id}".`);
            }

            ids.add(id);

            if (!this.normalizeString(entry.name)) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat keinen Namen.`);
            }

            if (!this.normalizeString(entry.type)) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat keinen Typ.`);
            }

            if (entry.detail_path !== undefined && !this.normalizeString(entry.detail_path)) {
                this.addWarning(result, `Master-Index-Eintrag "${id}" hat leeren detail_path.`);
            }
        });

        return result;
    },

    summarize(result) {
        return {
            ok: result.ok,
            errorCount: result.errors.length,
            warningCount: result.warnings.length,
            infoCount: result.info.length,
            errors: [...result.errors],
            warnings: [...result.warnings],
            info: [...result.info]
        };
    },

    logResult(label, result) {
        const summary = this.summarize(result);

        if (summary.ok) {
            console.log(`✅ ${label}`, summary);
        } else {
            console.warn(`⚠️ ${label}`, summary);
        }

        return summary;
    }
};

```

---

