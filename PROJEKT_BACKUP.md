# 🛡️ Aventuria Projekt-Backup - 4/15/2026, 3:06:35 PM

## 📄 Datei: css/base.css
```css
:root {
    /* Farben */
    --color-text: #2e241f;
    --color-primary: #5c1e1e;
    --color-primary-hover: #7a2828;
    --color-secondary: #8b4513;
    --color-secondary-soft: #a0522d;

    --color-bg-body: #dcd0ba;
    --color-bg-panel: #f4e7d3;
    --color-bg-panel-alt: #e6dec9;
    --color-bg-soft: rgba(255, 255, 255, 0.2);
    --color-bg-soft-strong: rgba(255, 255, 255, 0.35);
    --color-bg-soft-muted: rgba(255, 255, 255, 0.1);
    --color-bg-white-soft: rgba(255, 255, 255, 0.4);
    --color-bg-white-strong: rgba(255, 255, 255, 0.5);
    --color-bg-white-stronger: rgba(255, 255, 255, 0.6);

    --color-border-soft: rgba(139, 69, 19, 0.1);
    --color-border-soft-strong: rgba(139, 69, 19, 0.18);
    --color-border-soft-card: rgba(139, 69, 19, 0.2);

    --color-primary-fade: rgba(92, 30, 30, 0.05);
    --color-primary-shadow: rgba(92, 30, 30, 0.3);
    --color-black-soft: rgba(0, 0, 0, 0.2);
    --color-black-medium: rgba(0, 0, 0, 0.5);
    --color-black-strong: rgba(0, 0, 0, 0.6);
    --color-black-heavy: rgba(0, 0, 0, 0.9);

    --color-success: #276749;
    --color-danger: #9b2c2c;
    --color-info: #2c5282;
    --color-muted: #7a7a7a;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-ivory: #fffdf8;

    /* Abstände */
    --space-2xs: 4px;
    --space-xs: 6px;
    --space-sm: 8px;
    --space-md: 10px;
    --space-lg: 12px;
    --space-xl: 15px;
    --space-2xl: 20px;
    --space-3xl: 25px;
    --space-4xl: 30px;
    --space-5xl: 50px;
    --space-6xl: 60px;

    /* Radius */
    --radius-sm: 4px;
    --radius-md: 5px;
    --radius-lg: 8px;
    --radius-xl: 10px;
    --radius-2xl: 12px;
    --radius-pill: 20px;
    --radius-round: 50%;

    /* Rahmen */
    --border-thin: 1px;
    --border-md: 2px;
    --border-lg: 3px;
    --border-xl: 5px;
    --border-accent: 6px;

    /* Schatten */
    --shadow-sm: 1px 1px 3px var(--color-black-soft);
    --shadow-md: 3px 3px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 3px 3px 10px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 0 25px var(--color-black-soft);
    --shadow-2xl: 0 0 50px var(--color-black-medium);
    --shadow-card: 0 10px 30px var(--color-black-soft);
    --shadow-preview: 0 15px 50px var(--color-black-strong);
    --shadow-panel: 5px 5px 15px rgba(0, 0, 0, 0.1);

    /* Übergänge */
    --transition-fast: all 0.2s ease;
    --transition-medium: all 0.3s ease-out;
    --transition-slow: all 0.4s ease;

    /* Layout */
    --container-max-width: 1100px;
    --modal-max-width: 1200px;
    --modal-max-width-archive: 1400px;
    --sidebar-width: 280px;
    --sidebar-min-width: 240px;
    --tooltip-width: 450px;
}

body {
    background: var(--color-bg-body) radial-gradient(circle, var(--color-bg-panel-alt) 0%, var(--color-bg-body) 100%);
    font-family: 'Georgia', 'Times New Roman', serif;
    color: var(--color-text);
    margin: 0;
    padding: var(--space-2xl);
    min-height: 100vh;
}

.app-container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    background: var(--color-bg-soft);
    padding: var(--space-4xl);
    border: var(--border-lg) solid var(--color-primary);
    box-shadow: var(--shadow-xl);
    border-radius: var(--radius-sm);
}

header {
    text-align: center;
    border-bottom: var(--border-md) solid var(--color-secondary);
    margin-bottom: var(--space-4xl);
    padding-bottom: var(--space-xl);
}

h1 {
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0;
}

.hidden {
    display: none;
}

```

---

## 📄 Datei: css/components.css
```css
/* --- ALLGEMEINES LAYOUT & TOP-BAR --- */
.top-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-4xl);
    margin-bottom: var(--space-2xl);
    flex-wrap: wrap;
}

.button-group {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
}

.config-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

/* --- FORMULAR ELEMENTE --- */
input[type="number"],
select {
    padding: var(--space-sm);
    background: var(--color-bg-panel);
    border: var(--border-thin) solid var(--color-secondary);
    font-family: inherit;
    border-radius: var(--radius-sm);
    color: var(--color-text);
}

/* --- BUTTON STYLES --- */
.btn,
.btn-outline {
    padding: var(--space-md) var(--space-2xl);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    transition: var(--transition-fast);
}

.btn {
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
}

.btn:hover {
    background: var(--color-primary-hover);
}

.btn-outline {
    background: none;
    border: var(--border-md) solid var(--color-secondary);
    color: var(--color-secondary);
}

.btn-outline:hover {
    background: var(--color-secondary);
    color: var(--color-white);
}

/* Kleine Buttons für Proben/Checks */
.btn-sm {
    padding: var(--space-xs) var(--space-lg);
    font-size: 0.85em;
    border-radius: var(--radius-sm);
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin-right: var(--space-md);
}

.btn-sm.success {
    background: var(--color-success);
    color: var(--color-white);
}

.btn-sm.fail {
    background: var(--color-danger);
    color: var(--color-white);
}

/* --- DER INFO-BUTTON (i) --- */
.info-btn {
    background: var(--color-secondary);
    color: var(--color-white);
    border: none;
    border-radius: var(--radius-round);
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    margin-left: var(--space-sm);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
}

.info-btn:hover:not(:disabled) {
    background: var(--color-primary);
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
    gap: var(--space-3xl);
    margin-top: var(--space-2xl);
}

.card-list {
    background: rgba(244, 231, 211, 0.9);
    padding: var(--space-2xl);
    border: var(--border-thin) solid var(--color-secondary-soft);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

.card-list h3 {
    margin-top: 0;
    font-variant: small-caps;
    border-bottom: var(--border-thin) solid var(--color-secondary-soft);
    padding-bottom: var(--space-sm);
}

#blue-cards h3 {
    color: var(--color-info);
    border-bottom-color: var(--color-info);
}

#special h3 {
    color: var(--color-success);
    border-bottom-color: var(--color-success);
}

.card-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.card-list li {
    margin-bottom: var(--space-lg);
}

/* --- CHECKLISTE --- */
.checklist-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-lg);
    padding: var(--space-sm) 0;
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
    accent-color: var(--color-primary);
    flex-shrink: 0;
}

.checklist-item span {
    display: block;
    min-width: 0;
    word-break: break-word;
    flex: 1;
}

.checklist-item input:checked + span {
    text-decoration: line-through var(--color-primary) 2px;
    color: var(--color-muted);
    opacity: 0.6;
}

.has-preview {
    color: var(--color-primary);
    cursor: help;
    font-weight: 500;
}

/* --- PROBEN FEEDBACK (INLINE) --- */
.check-result {
    margin-top: var(--space-md);
    padding: var(--space-lg);
    border-radius: var(--radius-sm);
    display: none;
    font-size: 0.9em;
    border-left: var(--border-xl) solid var(--color-secondary);
    background: var(--color-bg-white-stronger);
    line-height: 1.4;
    color: var(--color-text);
}

.check-result.show {
    display: block;
    animation: slideIn 0.3s ease-out;
}

.check-result.success {
    border-color: var(--color-success);
}

.check-result.fail {
    border-color: var(--color-danger);
}

/* --- TOOLTIP / GROSSE VORSCHAU --- */
.card-tooltip {
    position: fixed;
    display: none;
    z-index: 9999;
    width: var(--tooltip-width);
    max-width: min(var(--tooltip-width), 90vw);
    border: var(--border-xl) solid var(--color-primary);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-preview);
    background: var(--color-black);
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
    border-radius: calc(var(--radius-lg) - 1px);
}

/* --- ARCHIV GRID --- */
.archive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-2xl);
    padding: var(--space-2xl);
    align-items: start;
}

.archive-card {
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    background: var(--color-bg-soft-strong);
    border: var(--border-thin) solid var(--color-border-soft-card);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
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
    border: var(--border-md) solid var(--color-secondary);
    border-radius: var(--radius-md);
    background: var(--color-white);
}

.archive-card p {
    font-size: 0.85em;
    margin-top: var(--space-sm);
    margin-bottom: 0;
    font-weight: bold;
    color: var(--color-primary);
    word-break: break-word;
}

/* --- DANGER / HINWEISE --- */
#danger-value {
    font-size: 1.15em;
    color: var(--color-primary);
    margin-bottom: var(--space-xl);
    padding: var(--space-md);
    background: var(--color-primary-fade);
    border-radius: var(--radius-sm);
}

hr {
    border: 0;
    border-top: var(--border-thin) solid var(--color-secondary-soft);
    margin: var(--space-2xl) 0;
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
        padding: var(--space-lg);
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
        gap: var(--space-md);
        padding: var(--space-md) 0;
    }

    .archive-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-lg);
        padding: var(--space-sm);
    }

    .archive-card {
        padding: var(--space-sm);
    }

    .card-tooltip {
        max-width: calc(100vw - 24px);
        border-width: var(--border-lg);
        border-radius: var(--radius-xl);
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
    margin-top: var(--space-2xl);
    padding: var(--space-2xl);
    border: var(--border-thin) dashed var(--color-secondary);
    background: var(--color-bg-soft-muted);
    border-radius: var(--radius-lg);
    animation: fadeIn 0.3s ease-in-out;
}

.hidden-section.show {
    display: block;
}

.toggle-section {
    display: flex;
    justify-content: center;
    gap: var(--space-lg);
    margin-top: var(--space-4xl);
    flex-wrap: wrap;
}

/* --- PHASEN-TRACKER --- */
.phase-steps {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: var(--space-2xl) 0;
    gap: var(--space-md);
}

.step {
    padding: var(--space-md) var(--space-xl);
    background: var(--color-bg-white-strong);
    border: var(--border-thin) solid var(--color-secondary);
    border-radius: var(--radius-pill);
    font-size: 0.85em;
    font-weight: bold;
    opacity: 0.3;
    transition: var(--transition-slow);
}

.step.active {
    opacity: 1;
    background: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
    transform: scale(1.1);
    box-shadow: 0 4px 10px var(--color-primary-shadow);
}

/* --- HELDEN-DASHBOARD --- */
.hero-dashboard {
    display: flex;
    justify-content: center;
    gap: var(--space-2xl);
    margin-top: var(--space-4xl);
    flex-wrap: wrap;
}

.hero-card {
    background: var(--color-bg-panel);
    border: var(--border-thin) solid var(--color-secondary);
    border-top: var(--border-accent) solid var(--color-primary);
    padding: var(--space-xl);
    min-width: 160px;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-md);
    text-align: center;
}

.hero-card h4 {
    margin: 0 0 var(--space-md) 0;
    color: var(--color-primary);
    font-variant: small-caps;
}

.stat {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    font-size: 1.2em;
    font-weight: bold;
}

.stat button {
    background: var(--color-secondary);
    color: var(--color-white);
    border: none;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-weight: bold;
}

/* --- STORY / PROBEN --- */
.story-text {
    line-height: 1.6;
    margin-bottom: var(--space-2xl);
}

.probes-area {
    margin-top: var(--space-2xl);
}

.probe-item {
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    background: var(--color-bg-soft-strong);
    border-left: var(--space-2xs) solid var(--color-secondary);
    border-radius: var(--radius-sm);
}

.probe-item p {
    margin: 0 0 var(--space-md) 0;
}

.probe-buttons {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
}

/* --- ATEMPAUSE BEREICH --- */
.intermission-area {
    margin-top: var(--space-6xl);
    display: flex;
    justify-content: center;
}

.intermission-card {
    background: linear-gradient(145deg, var(--color-bg-panel), var(--color-bg-panel-alt));
    border: var(--border-md) solid var(--color-secondary);
    padding: var(--space-3xl);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-panel);
    text-align: center;
    max-width: 450px;
}

.intermission-card h3 {
    margin-top: 0;
    color: var(--color-primary);
    font-size: 1.5em;
}

.result-badge {
    margin-top: var(--space-2xl);
    font-size: 2em;
    color: var(--color-primary);
    font-weight: bold;
    background: var(--color-bg-white-strong);
    display: inline-block;
    padding: 5px var(--space-2xl);
    border-radius: var(--radius-lg);
    border: var(--border-thin) solid var(--color-secondary);
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
    background: var(--color-black-heavy);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: var(--space-lg);
    box-sizing: border-box;
}

.modal-content {
    background: var(--color-bg-panel);
    width: 95vw;
    max-width: var(--modal-max-width);
    height: 90vh;
    border: var(--border-lg) solid var(--color-primary);
    border-radius: var(--radius-lg);
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-2xl);
    overflow: hidden;
}

/* Spezielle Breite für das Archiv */
.archive-modal-size {
    max-width: var(--modal-max-width-archive);
}

.close-modal {
    position: absolute;
    top: var(--space-md);
    right: var(--space-2xl);
    font-size: 2.5em;
    line-height: 1;
    cursor: pointer;
    color: var(--color-primary);
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
    width: var(--sidebar-width);
    min-width: var(--sidebar-min-width);
    background: var(--color-bg-panel-alt);
    border-right: var(--border-md) solid var(--color-secondary);
    padding: var(--space-2xl);
    overflow-y: auto;
    box-sizing: border-box;
}

.modal-sidebar h4 {
    margin-top: 0;
    color: var(--color-primary);
    border-bottom: var(--border-md) solid var(--color-secondary);
    padding-bottom: 5px;
    font-variant: small-caps;
}

.modal-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.modal-sidebar li {
    padding: var(--space-md) var(--space-sm);
    border-bottom: var(--border-thin) solid var(--color-border-soft);
    font-size: 0.9em;
    cursor: pointer;
    transition: background 0.2s ease;
    word-break: break-word;
}

.modal-sidebar li:hover {
    background: var(--color-bg-body);
    font-weight: bold;
}

.modal-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--color-bg-panel);
    min-width: 0;
    min-height: 0;
}

.modal-nav {
    display: flex;
    align-items: center;
    padding: var(--space-md) var(--space-2xl);
    background: var(--color-bg-body);
    border-bottom: var(--border-md) solid var(--color-secondary);
    gap: var(--space-xl);
    flex-wrap: wrap;
}

.modal-nav h2 {
    margin: 0;
    color: var(--color-primary);
    font-size: 1.3rem;
}

.tab-btn {
    background: var(--color-bg-panel);
    border: var(--border-thin) solid var(--color-secondary);
    padding: var(--space-sm) var(--space-2xl);
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    border-radius: var(--radius-sm);
}

.tab-btn.active {
    background: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
}

.tab-content {
    flex: 1;
    padding: var(--space-3xl);
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
    padding-right: var(--space-xl);
}

.reader-text {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: var(--color-text);
    max-width: 850px;
    margin: 0 auto;
    word-break: break-word;
}

.img-wrapper {
    width: 100%;
    max-width: 800px;
    margin: 0 auto var(--space-3xl) auto;
    box-shadow: var(--shadow-card);
}

.manual-page-img {
    display: block;
    width: 100%;
    height: auto;
    border: var(--border-thin) solid var(--color-secondary);
}

.reader-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-xl) 0;
    margin-top: var(--space-md);
    border-top: var(--border-md) solid var(--color-secondary);
    flex-wrap: wrap;
}

.reader-footer button {
    background: var(--color-secondary);
    color: var(--color-white);
    border: none;
    padding: var(--space-sm) var(--space-xl);
    border-radius: var(--radius-sm);
    cursor: pointer;
}

/* --- KODEX SUCHE --- */
.search-bar {
    width: 100%;
    padding: var(--space-lg);
    margin-bottom: var(--space-2xl);
    border: var(--border-md) solid var(--color-secondary);
    box-sizing: border-box;
    background: var(--color-ivory);
    color: var(--color-text);
    font-family: inherit;
}

.rule-entry {
    background: var(--color-bg-white-soft);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border-left: var(--border-xl) solid var(--color-primary);
    border-radius: var(--radius-sm);
}

.rule-entry h4 {
    margin-top: 0;
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
}

/* --- ARCHIV SPEZIFISCH --- */
.archive-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: var(--space-2xl);
}

.placeholder-text {
    text-align: center;
    color: var(--color-secondary);
    font-style: italic;
    margin-top: var(--space-5xl);
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
        padding: var(--space-sm);
    }

    .modal-content {
        width: 100%;
        height: 95vh;
        border-width: var(--border-md);
        border-radius: var(--radius-lg);
    }

    .modal-layout {
        flex-direction: column;
    }

    .modal-sidebar {
        width: 100%;
        min-width: 0;
        max-height: 170px;
        border-right: none;
        border-bottom: var(--border-md) solid var(--color-secondary);
        padding: 12px 14px;
    }

    .modal-sidebar ul {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .modal-sidebar li {
        border-bottom: none;
        background: var(--color-bg-soft-strong);
        border: var(--border-thin) solid var(--color-border-soft-strong);
        border-radius: 6px;
        padding: var(--space-sm) var(--space-md);
        font-size: 0.85em;
    }

    .modal-main {
        min-height: 0;
    }

    .modal-nav {
        padding: var(--space-md) 14px;
        gap: var(--space-md);
    }

    .tab-content {
        padding: 14px;
    }

    .close-modal {
        top: var(--space-sm);
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
        padding: var(--space-lg);
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
        padding: var(--space-md);
        font-size: 0.95rem;
    }

    .modal-sidebar {
        max-height: 145px;
    }
}

@media (max-width: 420px) {
    .modal-backdrop {
        padding: var(--space-2xs);
    }

    .modal-content {
        border-radius: var(--radius-sm);
        height: 97vh;
    }

    .modal-sidebar {
        padding: var(--space-md);
        max-height: 135px;
    }

    .modal-sidebar h4 {
        font-size: 1rem;
    }

    .modal-sidebar li {
        font-size: 0.8em;
        padding: 7px var(--space-sm);
    }

    .close-modal {
        font-size: 2em;
        right: var(--space-md);
    }

    .tab-content {
        padding: var(--space-md);
    }

    .reader-text {
        font-size: 0.96rem;
        line-height: 1.55;
    }
}

```

---

## 📄 Datei: data/adventures/base_game/index.json
```json
{
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox",
    "shortName": "Grundbox"
  },
  "adventures": [
    {
      "id": "leute_die_nicht_spielen",
      "name": "Leute, die nicht spielen",
      "status": "canonical",
      "order": 10
    },
    {
      "id": "silvanas_befreiung",
      "name": "Silvanas Befreiung",
      "status": "canonical",
      "order": 20
    },
    {
      "id": "wildenstein_akt_1",
      "name": "Das Erbe von Wildenstein - Akt I",
      "status": "canonical",
      "order": 30
    },
    {
      "id": "wildenstein_akt_2",
      "name": "Das Erbe von Wildenstein - Akt II",
      "status": "canonical",
      "order": 40
    },
    {
      "id": "wildenstein_akt_3",
      "name": "Das Erbe von Wildenstein - Akt III",
      "status": "canonical",
      "order": 50
    }
  ]
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
    "victory": "Aktion „Das Spiel beenden“ erfolgreich durchgeführt.",
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
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },
  "redirect_to": "data/adventures/base_game/leute_die_nicht_spielen.json",
  "danger_calc": 0,
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
  },
  "source": {
    "note": "Altname für Kompatibilität mit älteren Spielständen und Referenzen."
  },
  "notes": "Diese Datei ist nur noch ein Kompatibilitätseintrag. Pflege und Änderungen ausschließlich in der kanonischen Datei leute_die_nicht_spielen.json."
}

```

---

## 📄 Datei: data/adventures/base_game/silvanas_befreiung.json
```json
{
  "id": "silvanas_befreiung",
  "name": "Silvanas Befreiung",
  "status": "playable",
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },
  "danger_calc": 5,
  "narrative": {
    "intro": "Euer Freund Alrik hat euch herbeigerufen. Hinter der Tür blickt ihr in das Gesicht eines Kobolds...",
    "checks": [
      {
        "id": "chase_goblins",
        "skill": "Körperbeherrschung",
        "text": "Die Goblins ergreifen die Flucht. Setzt ihnen nach.",
        "results": {
          "success": "Ein Goblin weniger im Kampf.",
          "fail": "Füge „Feiger Goblin“ zum Schergendeck hinzu."
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
    "victory": "Alle Gegner besiegt oder vertrieben.",
    "defeat": "Verderbensmarken = Anzahl Helden."
  },
  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung"
  },
  "notes": "Auf neues Abenteuerformat vereinheitlicht. Textstellen wurden bereinigt und von Extraktionsmarkierungen befreit."
}

```

---

## 📄 Datei: data/adventures/base_game/wildenstein_akt_1.json
```json
{
  "id": "wildenstein_akt_1",
  "name": "Das Erbe von Wildenstein - Akt I",
  "status": "playable",
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },
  "danger_calc": 5,
  "narrative": {
    "intro": "In Perainefurten erreicht euch ein Brief eurer Mutter: Ihr sollt das Erbe des verstorbenen Barons Wildenstein antreten. Doch der Weg dorthin ist gefährlich und führt durch die Schattenlande...",
    "checks": [
      {
        "id": "scout",
        "skill": "Sinnesschärfe",
        "text": "Ihr erreicht eine Furt. Ist dort ein Hinterhalt?",
        "results": {
          "success": "Du reagierst blitzschnell. Starte mit +1 Handkarte.",
          "fail": "Du wirst überrascht. Starte mit -1 Handkarte."
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
    "victory": "Alle Gegner besiegt und der Erbe lebt noch.",
    "defeat": "Der Erbe wird ausgeschaltet."
  },
  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung"
  },
  "notes": "Auf neues Abenteuerformat vereinheitlicht. Textstellen wurden bereinigt und von Extraktionsmarkierungen befreit."
}

```

---

## 📄 Datei: data/adventures/base_game/wildenstein_akt_2.json
```json
{
  "id": "wildenstein_akt_2",
  "name": "Das Erbe von Wildenstein - Akt II",
  "status": "playable",
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },
  "danger_calc": 6,
  "narrative": {
    "intro": "Dorf Wildenstein, im Spätherbst: Bei Sonnenaufgang werdet ihr durch den Ruf von Raben geweckt. Sie fliegen zur Burg, deren Silhouette bedrohlich auf einem fernen Fels thront. Ein Gefühl der Beklommenheit überkommt euch.",
    "checks": [
      {
        "id": "beklommenheit",
        "skill": "Willenskraft",
        "text": "Könnt ihr der Beklommenheit widerstehen?",
        "results": {
          "success": "Du schöpfst Mut (+1 Schicksalspunkt).",
          "fail": "Du bist nervös und zweifelnd (lege 1 Schicksalspunkt ab)."
        }
      },
      {
        "id": "reparaturen",
        "skill": "Handwerk",
        "text": "Helft den Dorfbewohnern bei Reparaturen.",
        "results": {
          "success": "Du erhältst ein Zwölfgötter-Amulett.",
          "fail": "Du stümperst herum und verlierst 1W6 LP."
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
    "victory": "Alle Gegner besiegt oder Baron vertrieben.",
    "defeat": "Der Erbe wird ausgeschaltet."
  },
  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung"
  },
  "notes": "Auf neues Abenteuerformat vereinheitlicht. Textstellen wurden bereinigt und von Extraktionsmarkierungen befreit."
}

```

---

## 📄 Datei: data/adventures/base_game/wildenstein_akt_3.json
```json
{
  "id": "wildenstein_akt_3",
  "name": "Das Erbe von Wildenstein - Akt III",
  "status": "playable",
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox"
  },
  "danger_calc": 7,
  "narrative": {
    "intro": "Ihr habt den Geheimgang gefunden. Die Spuren des Barons führen in einen schaurigen Forst. Es ist genau die Art Wald in den Schattenlanden, vor der man euch immer gewarnt hat.",
    "checks": [
      {
        "id": "abseilen",
        "skill": "Körperbeherrschung",
        "text": "Seilt euch am Wehrgang in den Forst ab.",
        "results": {
          "success": "Du seilst dich erfolgreich ab.",
          "fail": "Du stürzt oder rutschst ab und verlierst Lebenspunkte."
        }
      },
      {
        "id": "spuren_folgen",
        "skill": "Wildnisleben",
        "text": "Folgt den Spuren des Barons im Dickicht.",
        "results": {
          "success": "Du findest eine Abkürzung (+1 Schicksalspunkt).",
          "fail": "Du verlierst die Spur (eine Zeitmarke wird entfernt)."
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
    "victory": "Grautax, der falsche Baron, wurde besiegt.",
    "defeat": "Anzahl Verderbensmarken = Anzahl Helden."
  },
  "source": {
    "book": "Aventuria Das Abenteuerkartenspiel Anleitung"
  },
  "notes": "Auf neues Abenteuerformat vereinheitlicht. Textstellen wurden bereinigt und von Extraktionsmarkierungen befreit."
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

  "status": "playable_placeholder",

  "adventure_refs": [
    {
      "id": "leute_die_nicht_spielen",
      "name": "Leute, die nicht spielen"
    }
  ],

  "images": {
    "front": "assets/images/cards/shared/card_placeholder.jpg",
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

  "notes": "Temporärer spielbarer Platzhalter. Karte bleibt im aktiven Abenteuerpfad sichtbar, bis echter Kartentext und echtes Bild vorliegen."
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
      "status": "playable_placeholder",
      "adventure_refs": [
        "leute_die_nicht_spielen"
      ],
      "image": "assets/images/cards/shared/card_placeholder.jpg",
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
      "status": "playable_placeholder",
      "adventure_refs": [
        "leute_die_nicht_spielen"
      ],
      "image": "assets/images/cards/shared/card_placeholder.jpg",
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

## 📄 Datei: data/manual/base_game/index.json
```json
{
  "set": {
    "id": "base_game",
    "name": "Aventuria Grundbox",
    "shortName": "Grundbox"
  },
  "pages": [
    {
      "page": 1,
      "title": "Titelblatt",
      "path": "data/manual/base_game/page_01.json"
    },
    {
      "page": 2,
      "title": "Das Schwarze Auge und Aventurien",
      "path": "data/manual/base_game/page_02.json"
    },
    {
      "page": 3,
      "title": "Der Süden und Osten Aventuriens",
      "path": "data/manual/base_game/page_03.json"
    },
    {
      "page": 4,
      "title": "Südosten & ferne Regionen",
      "path": "data/manual/base_game/page_04.json"
    },
    {
      "page": 5,
      "title": "Religionen, Kulturen & Gefahren",
      "path": "data/manual/base_game/page_05.json"
    },
    {
      "page": 6,
      "title": "Abenteuer-Regeln & Spielziel",
      "path": "data/manual/base_game/page_06.json"
    },
    {
      "page": 7,
      "title": "Spielmaterial: Die verschiedenen Karten",
      "path": "data/manual/base_game/page_07.json"
    },
    {
      "page": 8,
      "title": "Spezialkarten & Spielmarken",
      "path": "data/manual/base_game/page_08.json"
    },
    {
      "page": 9,
      "title": "Das Abenteuer & Talentproben",
      "path": "data/manual/base_game/page_09.json"
    },
    {
      "page": 10,
      "title": "Der Kampf (Vorbereitung)",
      "path": "data/manual/base_game/page_10.json"
    },
    {
      "page": 11,
      "title": "Handlung, Spezial- & Schergenkarten",
      "path": "data/manual/base_game/page_11.json"
    },
    {
      "page": 12,
      "title": "Schergen & Gefahrenwert (GP)",
      "path": "data/manual/base_game/page_12.json"
    },
    {
      "page": 13,
      "title": "Kampfablauf & Helden-Spielzüge",
      "path": "data/manual/base_game/page_13.json"
    },
    {
      "page": 14,
      "title": "Gegner-Spielzüge & Zeit-Effekte",
      "path": "data/manual/base_game/page_14.json"
    },
    {
      "page": 15,
      "title": "Kampfende & Atempause",
      "path": "data/manual/base_game/page_15.json"
    },
    {
      "page": 16,
      "title": "Zusatzregeln & Kampagne",
      "path": "data/manual/base_game/page_16.json"
    },
    {
      "page": 17,
      "title": "Abenteuer: Silvanas Befreiung (Teil 1)",
      "path": "data/manual/base_game/page_17.json"
    },
    {
      "page": 18,
      "title": "Abenteuer: Silvanas Befreiung (Teil 2)",
      "path": "data/manual/base_game/page_18.json"
    },
    {
      "page": 19,
      "title": "Abenteuer: Leute, die nicht spielen",
      "path": "data/manual/base_game/page_19.json"
    },
    {
      "page": 20,
      "title": "Wildenstein Akt I: Eine Botschaft",
      "path": "data/manual/base_game/page_20.json"
    },
    {
      "page": 21,
      "title": "Wildenstein Akt II: Auf der Burg",
      "path": "data/manual/base_game/page_21.json"
    },
    {
      "page": 22,
      "title": "Wildenstein Akt II (Kampf) & Akt III",
      "path": "data/manual/base_game/page_22.json"
    },
    {
      "page": 23,
      "title": "Wildenstein Akt III: Das Ritual",
      "path": "data/manual/base_game/page_23.json"
    },
    {
      "page": 24,
      "title": "Heldendokument & Symbole",
      "path": "data/manual/base_game/page_24.json"
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

        <section id="diagnostics-section" class="card-list hidden">
            <div id="diagnostics-summary"></div>
            <div id="diagnostics-details" class="hidden" style="margin-top:12px;"></div>
        </section>

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

                <div id="archive-set-buttons" class="button-group" style="margin-bottom: 20px;"></div>

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
                    <h4 id="manual-set-label">Regelbuch</h4>
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

    <script type="module" src="js/main.js"></script>
</body>
</html>

```

---

## 📄 Datei: js/api-cache.js
```js
window.ApiCache = {
    adventures: {},
    adventureLists: {},
    masterIndexes: {},
    catalogCards: {},
    cardPayloads: {}
};

```

---

## 📄 Datei: js/api-card-lookup.js
```js
window.ApiCardLookup = {
    resolveAdventureSetKey(adventureId, fallbackSetKey = '') {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedFallback = Utils.normalizeString(
            fallbackSetKey || window.CONFIG?.defaultSet || 'base_game'
        );

        if (!normalizedAdventureId) {
            return normalizedFallback;
        }

        const adventure = window.ApiCache.adventures[normalizedAdventureId];
        const setId = Utils.normalizeString(adventure?.set?.id);

        return setId || normalizedFallback;
    },

    getAdventureSetKey(adventureId, fallbackSetKey = '') {
        return this.resolveAdventureSetKey(adventureId, fallbackSetKey);
    },

    getActiveSetKey() {
        const selectedAdventure = window.State?.getState?.()?.selectedAdventure || '';
        if (selectedAdventure) {
            return this.resolveAdventureSetKey(
                selectedAdventure,
                window.CONFIG?.defaultSet || 'base_game'
            );
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    buildCardPayload(adventureId, cards = [], adventureName = '') {
        return {
            adventure_id: Utils.normalizeString(adventureId),
            adventure_name: Utils.normalizeString(adventureName),
            cards: Utils.normalizeArray(cards)
        };
    },

    getCardPayloadCacheKey(adventureId, setKey) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || window.CONFIG?.defaultSet || 'base_game'
        );

        return `${normalizedSetKey}::${normalizedAdventureId}`;
    },

    getLegacyCardsPath(adventureId, setKey) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || window.CONFIG?.defaultSet || 'base_game'
        );

        const config = window.CONFIG || null;

        if (config?.getLegacyAdventureCardsPath) {
            return config.getLegacyAdventureCardsPath(
                normalizedAdventureId,
                normalizedSetKey
            );
        }

        return `data/cards/${normalizedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;
    },

    async getCatalogCard(detailPath) {
        const normalizedPath = Utils.normalizeString(detailPath);
        if (!normalizedPath) return null;

        if (window.ApiCache.catalogCards[normalizedPath]) {
            return window.ApiCache.catalogCards[normalizedPath];
        }

        const rawData = await window.ApiFetch.fetchJson(normalizedPath);
        const normalized = window.ApiNormalizers.normalizeCatalogCard(rawData);

        window.ApiCache.catalogCards[normalizedPath] = normalized;
        return normalized;
    },

    getMigratedMasterCards(masterIndex, adventureId) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);

        return Utils.normalizeArray(masterIndex?.cards).filter(card =>
            Array.isArray(card?.adventure_refs) &&
            card.adventure_refs.includes(normalizedAdventureId) &&
            typeof card?.detail_path === 'string' &&
            card.detail_path.trim().length > 0
        );
    },

    async loadMigratedMasterCards(masterCards) {
        const loadedCards = [];

        for (const entry of Utils.normalizeArray(masterCards)) {
            try {
                const detail = await this.getCatalogCard(entry?.detail_path);
                if (detail) {
                    loadedCards.push(detail);
                }
            } catch (err) {
                console.warn(
                    `⚠️ Katalogkarte konnte nicht geladen werden: ${entry?.id || entry?.detail_path || 'unbekannt'}`,
                    err
                );
            }
        }

        return loadedCards;
    },

    async loadLegacyCards(adventureId, setKey) {
        const legacyPath = this.getLegacyCardsPath(adventureId, setKey);
        const rawData = await window.ApiFetch.fetchJson(legacyPath);

        return window.ApiNormalizers.normalizeCardPayload(rawData, Utils.normalizeString(adventureId));
    },

    cacheCardPayload(cacheKey, payload) {
        window.ApiCache.cardPayloads[cacheKey] = payload;
        return payload;
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return window.ApiNormalizers.normalizeCardPayload({ cards: [] }, '');
        }

        const resolvedSetKey = this.resolveAdventureSetKey(
            normalizedAdventureId,
            setKey || window.CONFIG?.defaultSet || 'base_game'
        );

        const cacheKey = this.getCardPayloadCacheKey(
            normalizedAdventureId,
            resolvedSetKey
        );

        if (window.ApiCache.cardPayloads[cacheKey]) {
            return window.ApiCache.cardPayloads[cacheKey];
        }

        const masterIndex = await window.ApiFetch.getMasterIndex(resolvedSetKey);
        const migratedMasterCards = this.getMigratedMasterCards(
            masterIndex,
            normalizedAdventureId
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = await this.loadMigratedMasterCards(migratedMasterCards);
            const payload = this.buildCardPayload(normalizedAdventureId, loadedCards, '');

            return this.cacheCardPayload(cacheKey, payload);
        }

        try {
            const legacyPayload = await this.loadLegacyCards(
                normalizedAdventureId,
                resolvedSetKey
            );

            return this.cacheCardPayload(cacheKey, legacyPayload);
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, err);

            const fallbackPayload = window.ApiNormalizers.normalizeCardPayload(
                { cards: [] },
                normalizedAdventureId
            );

            return this.cacheCardPayload(cacheKey, fallbackPayload);
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    getCachedCatalogCardById(id) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        return Object.values(window.ApiCache.catalogCards)
            .find(card => card?.id === targetId) || null;
    },

    getEnabledSetIds(setKey = null) {
        const normalizedSetKey = Utils.normalizeString(setKey);
        const config = window.CONFIG || null;

        if (normalizedSetKey) {
            return [normalizedSetKey];
        }

        return config?.getEnabledSets?.().map(setConfig => setConfig.id)
            || [config?.defaultSet || 'base_game'];
    },

    async findCardInMasterIndexes(targetId, setKey = null) {
        const setsToSearch = this.getEnabledSetIds(setKey);

        for (const currentSetKey of setsToSearch) {
            const master = await window.ApiFetch.getMasterIndex(currentSetKey);
            const entry = Utils.normalizeArray(master?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (!entry?.detail_path) {
                continue;
            }

            try {
                return await this.getCatalogCard(entry.detail_path);
            } catch (err) {
                console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
            }
        }

        return null;
    },

    findCardInLoadedPayloads(targetId) {
        for (const payload of Object.values(window.ApiCache.cardPayloads)) {
            const found = Utils.normalizeArray(payload?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (found) {
                return found;
            }
        }

        return null;
    },

    async findCardById(id, setKey = null) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        const cachedCatalogCard = this.getCachedCatalogCardById(targetId);
        if (cachedCatalogCard) {
            return cachedCatalogCard;
        }

        const masterCard = await this.findCardInMasterIndexes(targetId, setKey);
        if (masterCard) {
            return masterCard;
        }

        return this.findCardInLoadedPayloads(targetId);
    },

    async openCardDetailById(id) {
        const card = await this.findCardById(id);
        if (!card) return;

        if (window.RenderCardDetail?.openCardDetail) {
            window.RenderCardDetail.openCardDetail(card);
            return;
        }

        if (window.Renderer?.openCardDetail) {
            window.Renderer.openCardDetail(card);
        }
    }
};

```

---

## 📄 Datei: js/api-fetch.js
```js
window.ApiFetch = {
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

    async getAdventureIndex(setKey = null) {
        const config = window.CONFIG || null;
        const resolvedSetKey = Utils.normalizeString(setKey || config?.defaultSet || 'base_game');

        if (window.ApiCache.adventureLists[resolvedSetKey]) {
            return window.ApiCache.adventureLists[resolvedSetKey];
        }

        const path = config?.getAdventureIndexPath
            ? config.getAdventureIndexPath(resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/index.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            const fallback = [];
            window.ApiCache.adventureLists[resolvedSetKey] = fallback;
            return fallback;
        }

        const entries = Utils.normalizeArray(rawData?.adventures)
            .map(entry => window.ApiNormalizers.normalizeAdventureIndexEntry(entry, resolvedSetKey))
            .filter(Boolean);

        window.ApiCache.adventureLists[resolvedSetKey] = entries;
        return entries;
    },

    async getAvailableAdventures() {
        const config = window.CONFIG || null;
        const enabledSets = config?.getEnabledSets?.() || [{ id: config?.defaultSet || 'base_game' }];

        const allEntries = [];

        for (const setConfig of enabledSets) {
            const entries = await this.getAdventureIndex(setConfig.id);
            allEntries.push(...entries);
        }

        return allEntries
            .filter(entry => !entry.hidden)
            .filter(entry => entry.status !== 'deprecated_alias')
            .sort((a, b) => {
                if (a.order !== b.order) {
                    return a.order - b.order;
                }
                if (a.set.id !== b.set.id) {
                    return a.set.name.localeCompare(b.set.name, 'de');
                }
                return a.name.localeCompare(b.name, 'de');
            });
    },

    async getAdventure(id, setKey = null, visitedIds = new Set()) {
        const adventureId = Utils.normalizeString(id);
        if (!adventureId) return null;

        if (visitedIds.has(adventureId)) {
            throw new Error(`Alias-Schleife erkannt bei Abenteuer "${adventureId}".`);
        }

        if (window.ApiCache.adventures[adventureId]) {
            return window.ApiCache.adventures[adventureId];
        }

        const config = window.CONFIG || null;
        const resolvedSetKey = Utils.normalizeString(setKey || config?.defaultSet || 'base_game');
        const path = config?.getAdventurePath
            ? config.getAdventurePath(adventureId, resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/${adventureId}.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            console.error('Abenteuer-Datei fehlt:', path);
            return null;
        }

        const status = Utils.normalizeString(rawData?.status);

        if (status === 'deprecated_alias') {
            const redirectAdventureId = window.ApiNormalizers.extractAdventureIdFromRedirect(rawData?.redirect_to);

            if (!redirectAdventureId) {
                throw new Error(`Alias-Abenteuer "${adventureId}" hat kein gültiges redirect_to.`);
            }

            visitedIds.add(adventureId);

            const redirectedAdventure = await this.getAdventure(
                redirectAdventureId,
                resolvedSetKey,
                visitedIds
            );

            if (redirectedAdventure) {
                window.ApiCache.adventures[adventureId] = redirectedAdventure;
            }

            return redirectedAdventure;
        }

        const normalized = window.ApiNormalizers.normalizeAdventure(rawData, adventureId, resolvedSetKey);
        window.ApiCache.adventures[adventureId] = normalized;
        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const config = window.CONFIG || null;
        const resolvedSetKey = Utils.normalizeString(setKey || config?.defaultSet || 'base_game');

        if (window.ApiCache.masterIndexes[resolvedSetKey]) {
            return window.ApiCache.masterIndexes[resolvedSetKey];
        }

        const path = config?.getMasterIndexPath
            ? config.getMasterIndexPath(resolvedSetKey)
            : `data/cards/${resolvedSetKey}/master_${resolvedSetKey}.json`;

        try {
            const rawData = await this.fetchJson(path);
            const normalized = {
                set: rawData?.set || {
                    id: resolvedSetKey,
                    name: config?.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: Utils.normalizeArray(rawData?.cards)
            };

            window.ApiCache.masterIndexes[resolvedSetKey] = normalized;
            return normalized;
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);

            const fallback = {
                set: {
                    id: resolvedSetKey,
                    name: config?.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: 1,
                cards: []
            };

            window.ApiCache.masterIndexes[resolvedSetKey] = fallback;
            return fallback;
        }
    }
};

```

---

## 📄 Datei: js/api-normalizers.js
```js
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

```

---

## 📄 Datei: js/api.js
```js
window.API = {
    get cache() {
        return window.ApiCache;
    },

    normalizeString(value) {
        return Utils.normalizeString(value);
    },

    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    getConfig() {
        return window.CONFIG || null;
    },

    extractAdventureIdFromRedirect(value) {
        return window.ApiNormalizers.extractAdventureIdFromRedirect(value);
    },

    normalizeAdventure(data, fallbackId, setKey) {
        return window.ApiNormalizers.normalizeAdventure(data, fallbackId, setKey);
    },

    normalizeAdventureIndexEntry(entry, fallbackSetKey) {
        return window.ApiNormalizers.normalizeAdventureIndexEntry(entry, fallbackSetKey);
    },

    normalizeCatalogCard(card) {
        return window.ApiNormalizers.normalizeCatalogCard(card);
    },

    normalizeCardPayload(rawData, adventureId) {
        return window.ApiNormalizers.normalizeCardPayload(rawData, adventureId);
    },

    async fetchJson(path) {
        return await window.ApiFetch.fetchJson(path);
    },

    async loadJSON(path) {
        return await window.ApiFetch.loadJSON(path);
    },

    async getAdventureIndex(setKey) {
        return await window.ApiFetch.getAdventureIndex(setKey);
    },

    async getAvailableAdventures() {
        return await window.ApiFetch.getAvailableAdventures();
    },

    async getAdventure(id, setKey, visited) {
        return await window.ApiFetch.getAdventure(id, setKey, visited);
    },

    async getMasterIndex(setKey) {
        return await window.ApiFetch.getMasterIndex(setKey);
    },

    resolveAdventureSetKey(id, fallback) {
        return window.ApiCardLookup.resolveAdventureSetKey(id, fallback);
    },

    getAdventureSetKey(id, fallback) {
        return window.ApiCardLookup.getAdventureSetKey(id, fallback);
    },

    getActiveSetKey() {
        return window.ApiCardLookup.getActiveSetKey();
    },

    buildCardPayload(adventureId, cards, adventureName) {
        return window.ApiCardLookup.buildCardPayload(adventureId, cards, adventureName);
    },

    async getCatalogCard(path) {
        return await window.ApiCardLookup.getCatalogCard(path);
    },

    async getCards(adventureId, setKey) {
        return await window.ApiCardLookup.getCards(adventureId, setKey);
    },

    async preloadCardsForAdventure(adventureId, setKey) {
        return await window.ApiCardLookup.preloadCardsForAdventure(adventureId, setKey);
    },

    async findCardById(id, setKey) {
        return await window.ApiCardLookup.findCardById(id, setKey);
    },

    async openCardDetailById(id) {
        return await window.ApiCardLookup.openCardDetailById(id);
    }
};

```

---

## 📄 Datei: js/app/adventure-flow.js
```js
import Utils from '../core/utils.js';
import State from '../core/state.js';
import Constants from '../core/constants.js';
import Events from '../core/events.js';
import ApiFetch from '../core/api-fetch.js';
import ApiCardLookup from '../core/api-card-lookup.js';
import AppStateSync from './state-sync.js';

export const AppAdventureFlow = {
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

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;
        const requestedAdventureId = State.getState().selectedAdventure || '';

        if (!requestedAdventureId) {
            AppStateSync.resetUIToDefaults();
            window.Diagnostics?.clear?.();
            window.UI?.setStatus?.(Constants.ui?.defaultStatusText ?? 'Bereit.');
            return;
        }

        window.UI?.setStatus?.('⏳ Abenteuer wird geladen...');

        try {
            const advData = await ApiFetch.getAdventure(requestedAdventureId);

            if (!advData) {
                throw new Error('Abenteuer-Datei fehlt.');
            }

            if (advData.id && advData.id !== requestedAdventureId) {
                State.setSelectedAdventure(advData.id);
                const picker = Utils.byId('adventurePicker');
                if (picker) picker.value = advData.id;
            }

            const cardData = await ApiCardLookup.getCards(advData.id, advData?.set?.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];
            const masterIndex = await ApiFetch.getMasterIndex(advData?.set?.id);

            window.RenderSetup?.renderSetup?.(advData, allCards);
            this.renderStory(advData);
            AppStateSync.setVictoryDefeat(advData);

            if (window.Combat?.initializeForAdventure) {
                window.Combat.initializeForAdventure(advData, allCards);
            } else {
                window.Combat?.updateDashboard?.(State.getState().heroStats);
                window.Combat?.updatePhaseTracker?.();
            }

            AppStateSync.applySavedSubsystems(State.getState());

            window.Diagnostics?.requestAdventureDiagnostics?.(advData, allCards, masterIndex, {
                setKey: advData?.set?.id || 'base_game'
            });

            Events.emit(Constants.events?.setChanged || 'set:changed', {
                source: 'adventure',
                setKey: advData?.set?.id || 'base_game',
                adventureId: advData?.id || ''
            });

            if (!skipPersist && !window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }

            window.UI?.setStatus?.(`✅ Abenteuer geladen: ${advData.name}`);
        } catch (error) {
            console.error(error);
            window.Diagnostics?.clear?.();
            window.Diagnostics?.addMessage?.(
                'error',
                'Ladefehler',
                error?.message || 'Unbekannter Fehler beim Laden des Abenteuers.'
            );
            window.UI?.setStatus?.(`❌ Fehler: ${error.message}`);
        }
    }
};

export default AppAdventureFlow;

```

---

## 📄 Datei: js/app/controls.js
```js
import Utils from '../core/utils.js';
import State from '../core/state.js';
import ApiFetch from '../core/api-fetch.js';
import AppAdventureFlow from './adventure-flow.js';
import AppPersistence from './persistence.js';

export const AppControls = {
    getElements() {
        return {
            picker: Utils.byId('adventurePicker'),
            heroCount: Utils.byId('heroCount'),
            difficulty: Utils.byId('difficulty'),
            saveBtn: Utils.byId('saveStateBtn'),
            clearBtn: Utils.byId('clearStateBtn')
        };
    },

    async populateAdventurePicker() {
        const { picker } = this.getElements();
        if (!picker) return;

        const previouslySelected = State.getState()?.selectedAdventure || '';

        picker.innerHTML = '';
        picker.appendChild(new Option('Bitte wählen ...', ''));

        try {
            const adventures = await ApiFetch.getAvailableAdventures();
            const enabledSets = window.CONFIG?.getEnabledSets?.() || [];
            const showSetPrefix = enabledSets.length > 1;

            Utils.normalizeArray(adventures).forEach(adventure => {
                const label = showSetPrefix
                    ? `${adventure?.set?.shortName || adventure?.set?.name || 'Set'} · ${adventure.name}`
                    : adventure.name;

                picker.appendChild(new Option(label, adventure.id));
            });

            const optionExists = Array.from(picker.options).some(
                option => option.value === previouslySelected
            );

            if (previouslySelected && !optionExists) {
                picker.appendChild(
                    new Option(`${previouslySelected} (alt/extern)`, previouslySelected)
                );
            }

            picker.value = previouslySelected || '';
        } catch (error) {
            console.error('Fehler beim Aufbau der Abenteuerliste:', error);
            window.UI?.setStatus?.('⚠️ Abenteuerliste konnte nicht geladen werden.');
        }
    },

    bindAdventurePicker() {
        const { picker } = this.getElements();
        if (!picker || picker.dataset.boundChange === 'true') return;

        picker.addEventListener('change', () => {
            State.setSelectedAdventure(picker.value);
            AppAdventureFlow.handleUpdate();
        });

        picker.dataset.boundChange = 'true';
    },

    bindHeroCount() {
        const { heroCount } = this.getElements();
        if (!heroCount || heroCount.dataset.boundChange === 'true') return;

        heroCount.addEventListener('change', () => {
            State.setHeroCount(heroCount.value);
            window.Combat?.updateDashboard?.();

            if (!window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }
        });

        heroCount.dataset.boundChange = 'true';
    },

    bindDifficulty() {
        const { difficulty } = this.getElements();
        if (!difficulty || difficulty.dataset.boundChange === 'true') return;

        difficulty.addEventListener('change', () => {
            State.setDifficulty(difficulty.value);
            window.Combat?.updateEpResult?.();

            if (!window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }
        });

        difficulty.dataset.boundChange = 'true';
    },

    bindSaveButton() {
        const { saveBtn } = this.getElements();
        if (!saveBtn || saveBtn.dataset.boundClick === 'true') return;

        saveBtn.addEventListener('click', () => {
            AppPersistence.saveCurrentState();
        });

        saveBtn.dataset.boundClick = 'true';
    },

    bindClearButton() {
        const { clearBtn } = this.getElements();
        if (!clearBtn || clearBtn.dataset.boundClick === 'true') return;

        clearBtn.addEventListener('click', async () => {
            await AppPersistence.clearSavedState();
        });

        clearBtn.dataset.boundClick = 'true';
    },

    bindEvents() {
        this.bindAdventurePicker();
        this.bindHeroCount();
        this.bindDifficulty();
        this.bindSaveButton();
        this.bindClearButton();
    }
};

export default AppControls;

```

---

## 📄 Datei: js/app/persistence.js
```js
import State from '../core/state.js';
import AppStateSync from './state-sync.js';
import AppAdventureFlow from './adventure-flow.js';

export const AppPersistence = {
    autoSaveBound: false,

    bindAutoSave() {
        if (this.autoSaveBound) {
            return;
        }

        window.StorageManager?.bindAutoSave?.();
        this.autoSaveBound = true;
    },

    saveCurrentState() {
        if (!window.StorageManager) {
            window.UI?.setStatus?.('⚠️ Speichern nicht verfügbar.');
            return;
        }

        window.StorageManager.persist();
        window.UI?.setStatus?.('💾 Spielstand gespeichert.');
    },

    async clearSavedState() {
        if (window.StorageManager) {
            window.StorageManager.clearState();
        }

        State.reset();
        AppStateSync.resetUIToDefaults();
        window.Diagnostics?.clear?.();
        window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
    },

    async restoreSavedState() {
        const state = State.getState();
        if (!state) return;

        window.App.isApplyingSavedState = true;

        try {
            AppStateSync.applyStateToControls();

            if (state.selectedAdventure) {
                await AppAdventureFlow.handleUpdate({ skipPersist: true });
            } else {
                AppStateSync.resetUIToDefaults();
                window.Diagnostics?.clear?.();
            }

            AppStateSync.applySavedSubsystems(state);
        } finally {
            window.App.isApplyingSavedState = false;
        }
    }
};

export default AppPersistence;

```

---

## 📄 Datei: js/app/state-sync.js
```js
import Utils from '../core/utils.js';
import State from '../core/state.js';

export const AppStateSync = {
    applyStateToControls() {
        const state = State.getState();

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');
        const remainingTime = Utils.byId('remainingTime');

        if (picker) {
            picker.value = state.selectedAdventure || '';
        }

        if (heroCount) {
            heroCount.value = String(state.heroCount ?? 2);
        }

        if (difficulty) {
            difficulty.value = state.difficulty || 'normal';
        }

        if (remainingTime) {
            remainingTime.value = String(state.remainingTime ?? 0);
        }
    },

    resetUIToDefaults() {
        const title = Utils.byId('title');
        const storyArea = Utils.byId('story-area');
        const setupDisplay = Utils.byId('setup-display');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.qs('#special ul');
        const dangerValue = Utils.byId('danger-value');
        const heroDashboard = Utils.byId('heroDashboard');
        const phaseTracker = Utils.byId('phaseTracker');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');
        const remainingTime = Utils.byId('remainingTime');

        if (title) title.textContent = 'Abenteuer';
        if (storyArea) storyArea.innerHTML = '';
        if (setupDisplay) setupDisplay.classList.add('hidden');
        if (blueCards) blueCards.innerHTML = '';
        if (minions) minions.innerHTML = '';
        if (special) special.innerHTML = '';
        if (dangerValue) dangerValue.textContent = '';
        if (heroDashboard) heroDashboard.innerHTML = '';
        if (epResult) epResult.textContent = '2 EP';
        if (targetResult) targetResult.textContent = '--';
        if (remainingTime) remainingTime.value = '0';

        if (phaseTracker) {
            Utils.qsa('.step', phaseTracker).forEach((step, index) => {
                step.classList.toggle('active', index === 0);
            });
        }

        this.setVictoryDefeat(null);
        this.applySavedSubsystems(State.getState());
    },

    setVictoryDefeat(adventure) {
        const victoryText = Utils.byId('victory-text');
        const defeatText = Utils.byId('defeat-text');

        if (victoryText) {
            victoryText.innerHTML = `<strong>Sieg:</strong> ${adventure?.setup?.victory || '—'}`;
        }

        if (defeatText) {
            defeatText.innerHTML = `<strong>Niederlage:</strong> ${adventure?.setup?.defeat || '—'}`;
        }
    },

    applySavedSubsystems(state) {
        const safeState = state || State.getState();

        const combatSection = Utils.byId('combat-tools-section');
        const intermissionSection = Utils.byId('intermission-section');
        const remainingTime = Utils.byId('remainingTime');
        const epResult = Utils.byId('ep-result');
        const targetResult = Utils.byId('targetResult');

        if (combatSection) {
            combatSection.classList.toggle('show', Boolean(safeState.combatToolsOpen));
        }

        if (intermissionSection) {
            intermissionSection.classList.toggle('show', Boolean(safeState.intermissionOpen));
        }

        if (remainingTime) {
            remainingTime.value = String(safeState.remainingTime ?? 0);
        }

        if (epResult) {
            epResult.textContent = safeState.epResult || '2 EP';
        }

        if (targetResult) {
            targetResult.textContent = safeState.targetResult || '--';
        }

        if (window.Combat?.updateDashboard) {
            window.Combat.updateDashboard(safeState.heroStats);
        }

        if (window.Combat?.updatePhaseTracker) {
            window.Combat.updatePhaseTracker(safeState.currentPhase ?? 0);
        }
    }
};

export default AppStateSync;

```

---

## 📄 Datei: js/app-adventure-flow.js
```js
window.AppAdventureFlow = {
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

    async handleUpdate(options = {}) {
        const { skipPersist = false } = options;
        const requestedAdventureId = window.State.getState().selectedAdventure || '';

        if (!requestedAdventureId) {
            window.AppStateSync?.resetUIToDefaults();
            window.Diagnostics?.clear?.();
            window.UI?.setStatus?.(window.Constants?.ui?.defaultStatusText ?? 'Bereit.');
            return;
        }

        window.UI?.setStatus?.('⏳ Abenteuer wird geladen...');

        try {
            const advData = await window.ApiFetch?.getAdventure?.(requestedAdventureId);

            if (!advData) {
                throw new Error('Abenteuer-Datei fehlt.');
            }

            if (advData.id && advData.id !== requestedAdventureId) {
                window.State.setSelectedAdventure(advData.id);
                const picker = Utils.byId('adventurePicker');
                if (picker) picker.value = advData.id;
            }

            const cardData = await window.ApiCardLookup?.getCards?.(advData.id, advData?.set?.id);
            const allCards = Array.isArray(cardData?.cards) ? cardData.cards : [];
            const masterIndex = await window.ApiFetch?.getMasterIndex?.(advData?.set?.id);

            window.RenderSetup?.renderSetup?.(advData, allCards);
            this.renderStory(advData);
            window.AppStateSync?.setVictoryDefeat(advData);

            if (window.Combat?.initializeForAdventure) {
                window.Combat.initializeForAdventure(advData, allCards);
            } else {
                window.Combat?.updateDashboard?.(window.State.getState().heroStats);
                window.Combat?.updatePhaseTracker?.();
            }

            window.AppStateSync?.applySavedSubsystems(window.State.getState());

            window.Diagnostics?.requestAdventureDiagnostics?.(advData, allCards, masterIndex, {
                setKey: advData?.set?.id || 'base_game'
            });

            window.Events?.emit?.(
                window.Constants?.events?.setChanged || 'set:changed',
                {
                    source: 'adventure',
                    setKey: advData?.set?.id || 'base_game',
                    adventureId: advData?.id || ''
                }
            );

            if (!skipPersist && !window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }

            window.UI?.setStatus?.(`✅ Abenteuer geladen: ${advData.name}`);
        } catch (error) {
            console.error(error);
            window.Diagnostics?.clear?.();
            window.Diagnostics?.addMessage?.(
                'error',
                'Ladefehler',
                error?.message || 'Unbekannter Fehler beim Laden des Abenteuers.'
            );
            window.UI?.setStatus?.(`❌ Fehler: ${error.message}`);
        }
    }
};

```

---

## 📄 Datei: js/app-bootstrap.js
```js
window.AppBootstrap = {
    async populateAdventurePicker() {
        await window.AppControls?.populateAdventurePicker?.();
    },

    bindEvents() {
        window.AppControls?.bindEvents?.();
        window.AppPersistence?.bindAutoSave?.();
    },

    async restoreSavedState() {
        await window.AppPersistence?.restoreSavedState?.();
    },

    async initializeUi() {
        await this.populateAdventurePicker();
        this.bindEvents();
        await this.restoreSavedState();
    }
};

```

---

## 📄 Datei: js/app-controls.js
```js
window.AppControls = {
    getElements() {
        return {
            picker: Utils.byId('adventurePicker'),
            heroCount: Utils.byId('heroCount'),
            difficulty: Utils.byId('difficulty'),
            saveBtn: Utils.byId('saveStateBtn'),
            clearBtn: Utils.byId('clearStateBtn')
        };
    },

    async populateAdventurePicker() {
        const { picker } = this.getElements();
        if (!picker) return;

        const previouslySelected = window.State?.getState?.()?.selectedAdventure || '';

        picker.innerHTML = '';
        picker.appendChild(new Option('Bitte wählen ...', ''));

        try {
            const adventures = await window.ApiFetch?.getAvailableAdventures?.();
            const enabledSets = window.CONFIG?.getEnabledSets?.() || [];
            const showSetPrefix = enabledSets.length > 1;

            Utils.normalizeArray(adventures).forEach(adventure => {
                const label = showSetPrefix
                    ? `${adventure?.set?.shortName || adventure?.set?.name || 'Set'} · ${adventure.name}`
                    : adventure.name;

                picker.appendChild(new Option(label, adventure.id));
            });

            const optionExists = Array.from(picker.options).some(
                option => option.value === previouslySelected
            );

            if (previouslySelected && !optionExists) {
                picker.appendChild(
                    new Option(`${previouslySelected} (alt/extern)`, previouslySelected)
                );
            }

            picker.value = previouslySelected || '';
        } catch (error) {
            console.error('Fehler beim Aufbau der Abenteuerliste:', error);
            window.UI?.setStatus?.('⚠️ Abenteuerliste konnte nicht geladen werden.');
        }
    },

    bindAdventurePicker() {
        const { picker } = this.getElements();
        if (!picker || picker.dataset.boundChange === 'true') return;

        picker.addEventListener('change', () => {
            window.State?.setSelectedAdventure?.(picker.value);
            window.AppAdventureFlow?.handleUpdate?.();
        });

        picker.dataset.boundChange = 'true';
    },

    bindHeroCount() {
        const { heroCount } = this.getElements();
        if (!heroCount || heroCount.dataset.boundChange === 'true') return;

        heroCount.addEventListener('change', () => {
            window.State?.setHeroCount?.(heroCount.value);
            window.Combat?.updateDashboard?.();

            if (!window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }
        });

        heroCount.dataset.boundChange = 'true';
    },

    bindDifficulty() {
        const { difficulty } = this.getElements();
        if (!difficulty || difficulty.dataset.boundChange === 'true') return;

        difficulty.addEventListener('change', () => {
            window.State?.setDifficulty?.(difficulty.value);
            window.Combat?.updateEpResult?.();

            if (!window.App?.isApplyingSavedState && window.StorageManager) {
                window.StorageManager.persist();
            }
        });

        difficulty.dataset.boundChange = 'true';
    },

    bindSaveButton() {
        const { saveBtn } = this.getElements();
        if (!saveBtn || saveBtn.dataset.boundClick === 'true') return;

        saveBtn.addEventListener('click', () => {
            window.AppPersistence?.saveCurrentState?.();
        });

        saveBtn.dataset.boundClick = 'true';
    },

    bindClearButton() {
        const { clearBtn } = this.getElements();
        if (!clearBtn || clearBtn.dataset.boundClick === 'true') return;

        clearBtn.addEventListener('click', async () => {
            await window.AppPersistence?.clearSavedState?.();
        });

        clearBtn.dataset.boundClick = 'true';
    },

    bindEvents() {
        this.bindAdventurePicker();
        this.bindHeroCount();
        this.bindDifficulty();
        this.bindSaveButton();
        this.bindClearButton();
    }
};

```

---

## 📄 Datei: js/app-persistence.js
```js
window.AppPersistence = {
    autoSaveBound: false,

    bindAutoSave() {
        if (this.autoSaveBound) {
            return;
        }

        window.StorageManager?.bindAutoSave?.();
        this.autoSaveBound = true;
    },

    saveCurrentState() {
        if (!window.StorageManager) {
            window.UI?.setStatus?.('⚠️ Speichern nicht verfügbar.');
            return;
        }

        window.StorageManager.persist();
        window.UI?.setStatus?.('💾 Spielstand gespeichert.');
    },

    async clearSavedState() {
        if (window.StorageManager) {
            window.StorageManager.clearState();
        }

        window.State.reset();
        window.AppStateSync?.resetUIToDefaults();
        window.Diagnostics?.clear?.();
        window.UI?.setStatus?.('🗑️ Spielstand gelöscht.');
    },

    async restoreSavedState() {
        const state = window.State?.getState?.();
        if (!state) return;

        window.App.isApplyingSavedState = true;

        try {
            window.AppStateSync?.applyStateToControls?.();

            if (state.selectedAdventure) {
                await window.AppAdventureFlow?.handleUpdate?.({ skipPersist: true });
            } else {
                window.AppStateSync?.resetUIToDefaults?.();
                window.Diagnostics?.clear?.();
            }

            window.AppStateSync?.applySavedSubsystems?.(state);
        } finally {
            window.App.isApplyingSavedState = false;
        }
    }
};

```

---

## 📄 Datei: js/app-state-sync.js
```js
window.AppStateSync = {
    applyStateToControls() {
        const state = window.State.getState();

        const picker = Utils.byId('adventurePicker');
        const heroCount = Utils.byId('heroCount');
        const difficulty = Utils.byId('difficulty');

        if (picker) {
            picker.value = state.selectedAdventure || '';
        }

        if (heroCount) {
            heroCount.value = String(state.heroCount ?? 2);
        }

        if (difficulty) {
            difficulty.value = state.difficulty || 'normal';
        }
    },

    clearVictoryDefeat() {
        const victoryEl = Utils.byId('victory-text');
        const defeatEl = Utils.byId('defeat-text');

        if (victoryEl) victoryEl.innerHTML = '<strong>Sieg:</strong> —';
        if (defeatEl) defeatEl.innerHTML = '<strong>Niederlage:</strong> —';
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

    resetUIToDefaults() {
        this.applyStateToControls();

        const setupDisplay = Utils.byId('setup-display');
        const storyArea = Utils.byId('story-area');
        const title = Utils.byId('title');
        const blueCards = Utils.qs('#blue-cards ul');
        const minions = Utils.qs('#minions ul');
        const special = Utils.byId('special');
        const dangerValue = Utils.byId('danger-value');

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

        this.clearVictoryDefeat();

        if (window.Combat) {
            window.Combat.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;
            window.Combat.updatePhaseTracker?.();
            window.Combat.updateDashboard?.(window.State.getState().heroStats);
            window.Combat.renderCombatState?.();
            window.Combat.updateEpResult?.();
        }

        if (window.StorageManager?.applyUIState) {
            window.StorageManager.applyUIState(window.State.getState().sections);
        }
    },

    applySavedSubsystems(state) {
        if (window.StorageManager?.applyHeroStats) {
            window.StorageManager.applyHeroStats(state.heroStats);
        }
        if (window.StorageManager?.applyChecklistState) {
            window.StorageManager.applyChecklistState(state.checklist);
        }
        if (window.StorageManager?.applyUIState) {
            window.StorageManager.applyUIState(state.sections);
        }
        if (window.StorageManager?.applyCombatState) {
            window.StorageManager.applyCombatState(state.combatState);
        }

        if (window.Combat) {
            window.Combat.currentPhase = Number(state.combatPhase ?? 0) || 0;
            window.Combat.updatePhaseTracker?.();
            window.Combat.updateDashboard?.(state.heroStats);
        }
    }
};

```

---

## 📄 Datei: js/app.js
```js
window.App = {
    isApplyingSavedState: false,
    isInitialized: false,

    async init() {
        if (this.isInitialized) {
            return;
        }

        this.isInitialized = true;

        try {
            const savedState = window.StorageManager?.loadState?.()
                || window.State.getDefaultState();

            window.State.replaceState(savedState);

            await window.AppBootstrap?.initializeUi?.();

            console.log('App initialisiert (Modulare Architektur).');
        } catch (error) {
            this.isInitialized = false;
            console.error('Fehler bei App.init():', error);
            window.UI?.setStatus?.('⚠️ App konnte nicht initialisiert werden.');
            throw error;
        }
    }
};

if (!window.__AVENTURIA_SKIP_AUTO_INIT__) {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.App?.init) {
            window.App.init();
        }
    });
}

```

---

## 📄 Datei: js/archive-filter.js
```js
window.ArchiveFilter = {
    filterCards(allCards, searchTerm) {
        const term = String(searchTerm ?? '').trim().toLowerCase();

        if (!term) {
            return [...allCards];
        }

        return allCards.filter(card => {
            const name = String(card?.name ?? '').toLowerCase();
            const type = String(card?.type ?? '').toLowerCase();
            const category = String(card?.card_category ?? '').toLowerCase();
            const status = String(card?.status ?? '').toLowerCase();
            const searchText = String(card?.search_text ?? '').toLowerCase();
            const tags = Utils.normalizeArray(card?.tags).join(' ').toLowerCase();
            const customTags = Utils.normalizeArray(card?.custom_tags).join(' ').toLowerCase();
            const keywords = Utils.normalizeArray(card?.keywords).join(' ').toLowerCase();
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
    }
};

```

---

## 📄 Datei: js/archive-loader.js
```js
window.ArchiveLoader = {
    normalizeSetKey(setKey = '') {
        return Utils.normalizeString(
            setKey || window.CONFIG?.defaultSet || 'base_game'
        );
    },

    getSuggestedSetKey(currentSet = '') {
        const activeSet = window.ApiCardLookup?.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return this.normalizeSetKey(currentSet);
    },

    async getMasterEntries(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const masterIndex = await window.ApiFetch?.getMasterIndex?.(resolvedSetKey);

        return Utils.normalizeArray(masterIndex?.cards);
    },

    async loadEntryDetail(entry, setKey = '') {
        if (entry?.detail_path) {
            const detail = await window.ApiCardLookup?.getCatalogCard?.(entry.detail_path);
            if (detail) {
                return detail;
            }
        }

        if (entry?.id) {
            return await window.ApiCardLookup?.findCardById?.(entry.id, setKey);
        }

        return null;
    },

    sortCards(cards = []) {
        return [...Utils.normalizeArray(cards)].sort((a, b) => {
            const categoryA = Utils.normalizeString(a?.card_category || a?.type);
            const categoryB = Utils.normalizeString(b?.card_category || b?.type);

            if (categoryA !== categoryB) {
                return categoryA.localeCompare(categoryB, 'de');
            }

            const nameA = Utils.normalizeString(a?.name || a?.id);
            const nameB = Utils.normalizeString(b?.name || b?.id);

            return nameA.localeCompare(nameB, 'de');
        });
    },

    async fetchCardsForSet(setKey = '') {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const entries = await this.getMasterEntries(resolvedSetKey);
        const loadedCards = [];

        for (const entry of entries) {
            try {
                const card = await this.loadEntryDetail(entry, resolvedSetKey);
                if (card) {
                    loadedCards.push(card);
                }
            } catch (error) {
                console.warn(
                    'Archivkarte konnte nicht geladen werden:',
                    entry?.id || entry?.detail_path || 'unbekannt',
                    error
                );
            }
        }

        return this.sortCards(loadedCards);
    }
};

```

---

## 📄 Datei: js/archive-renderer.js
```js
window.ArchiveRenderer = {
    getGrid() {
        return Utils.byId('archive-grid');
    },

    getSetButtonsContainer() {
        return Utils.byId('archive-set-buttons');
    },

    getSearchInput() {
        return Utils.byId('archive-search');
    },

    showLoading() {
        const grid = this.getGrid();
        if (!grid) return;

        grid.innerHTML = '<p class="placeholder-text">Archiv wird geladen ...</p>';
    },

    showError(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        const safeMessage = Utils.escapeHtml(
            message || 'Fehler beim Laden des Archivs.'
        );

        grid.innerHTML = `<p class="placeholder-text">${safeMessage}</p>`;
    },

    showEmpty(message = '') {
        const grid = this.getGrid();
        if (!grid) return;

        const safeMessage = Utils.escapeHtml(
            message || 'Keine Karten gefunden.'
        );

        grid.innerHTML = `<p class="placeholder-text">${safeMessage}</p>`;
    },

    resetSearch() {
        const searchInput = this.getSearchInput();
        if (searchInput) {
            searchInput.value = '';
        }
    },

    renderSetButtons(activeSetKey = '') {
        const container = this.getSetButtonsContainer();
        if (!container || !window.CONFIG?.getEnabledSets) return;

        const enabledSets = window.CONFIG.getEnabledSets();
        container.innerHTML = '';

        enabledSets.forEach(setConfig => {
            const isActive = activeSetKey === setConfig.id;

            container.insertAdjacentHTML(
                'beforeend',
                `
                <button
                    type="button"
                    class="${isActive ? 'btn' : 'btn-outline'}"
                    data-action="archive-load-set"
                    data-set="${Utils.escapeHtml(setConfig.id)}"
                >
                    ${Utils.escapeHtml(setConfig.shortName || setConfig.name || setConfig.id)}
                </button>
                `
            );
        });
    },

    resolveCardImage(card) {
        return Utils.resolveImagePath(
            card?.images?.front,
            card?.image,
            window.Assets?.getSharedCardPlaceholderPath?.(),
            window.Assets?.getImageFallbackPath?.()
        );
    },

    renderGrid(cards = []) {
        const grid = this.getGrid();
        if (!grid) return;

        const safeCards = Utils.normalizeArray(cards);

        if (!safeCards.length) {
            this.showEmpty();
            return;
        }

        grid.innerHTML = safeCards.map(card => {
            const image = this.resolveCardImage(card);
            const name = Utils.escapeHtml(card?.name || 'Unbekannte Karte');
            const id = Utils.escapeHtml(card?.id || '');

            return `
                <button
                    type="button"
                    class="archive-card"
                    data-action="open-card-detail"
                    data-card-id="${id}"
                    title="${name}"
                >
                    <img src="${Utils.escapeHtml(image)}" alt="${name}" loading="lazy">
                    <p>${name}</p>
                </button>
            `;
        }).join('');

        grid.querySelectorAll('.archive-card img').forEach(img => {
            Utils.attachImageFallback(img);
        });
    }
};

```

---

## 📄 Datei: js/archive.js
```js
window.Archive = {
    currentSet: window.CONFIG?.defaultSet || 'base_game',
    allCards: [],
    filteredCards: [],
    isLoading: false,

    getModal() {
        return Utils.byId('archive-modal');
    },

    getSearchInput() {
        return Utils.byId('archive-search');
    },

    getResolvedCurrentSet() {
        return Utils.normalizeString(
            this.currentSet || window.CONFIG?.defaultSet || 'base_game'
        );
    },

    async open() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'flex';

        const nextSet = window.ArchiveLoader?.getSuggestedSetKey?.(this.currentSet)
            || this.getResolvedCurrentSet();

        if (nextSet !== this.currentSet || !this.allCards.length) {
            await this.loadSet(nextSet);
            return;
        }

        this.render();
    },

    close() {
        const modal = this.getModal();
        if (!modal) return;

        modal.style.display = 'none';
    },

    async loadSet(setKey = '') {
        const resolvedSetKey = Utils.normalizeString(
            setKey || window.CONFIG?.defaultSet || 'base_game'
        );

        if (!resolvedSetKey) {
            return;
        }

        this.currentSet = resolvedSetKey;
        this.isLoading = true;

        window.ArchiveRenderer?.renderSetButtons?.(this.currentSet);
        window.ArchiveRenderer?.showLoading?.();

        try {
            const loadedCards = await window.ArchiveLoader?.fetchCardsForSet?.(this.currentSet);

            this.allCards = Utils.normalizeArray(loadedCards);
            this.filteredCards = [...this.allCards];
            this.isLoading = false;

            window.ArchiveRenderer?.resetSearch?.();
            this.render();

            window.Events?.emit?.(
                window.Constants?.events?.archiveSetChanged || 'archive:setChanged',
                {
                    source: 'archive',
                    setKey: this.currentSet,
                    cardCount: this.allCards.length
                }
            );

            window.Events?.emit?.(
                window.Constants?.events?.setChanged || 'set:changed',
                {
                    source: 'archive',
                    setKey: this.currentSet,
                    cardCount: this.allCards.length
                }
            );
        } catch (error) {
            this.isLoading = false;
            console.error('Fehler beim Laden des Archivs:', error);
            window.ArchiveRenderer?.showError?.(error?.message || 'Fehler beim Laden des Archivs.');
        }
    },

    handleSearch(searchTerm = '') {
        this.filteredCards = window.ArchiveFilter?.filterCards?.(this.allCards, searchTerm) || [];
        this.render();
    },

    render() {
        window.ArchiveRenderer?.renderSetButtons?.(this.currentSet);
        window.ArchiveRenderer?.renderGrid?.(this.filteredCards);
    },

    bindSearch() {
        const searchInput = this.getSearchInput();
        if (!searchInput || searchInput.dataset.bound === 'true') {
            return;
        }

        searchInput.addEventListener('input', event => {
            this.handleSearch(event.target.value);
        });

        searchInput.dataset.bound = 'true';
    },

    bindModalClose() {
        const modal = this.getModal();
        if (!modal || modal.dataset.bound === 'true') {
            return;
        }

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.close();
            }
        });

        modal.dataset.bound = 'true';
    },

    init() {
        this.bindSearch();
        this.bindModalClose();
        window.ArchiveRenderer?.renderSetButtons?.(this.currentSet);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Archive?.init) {
        window.Archive.init();
    }
});

```

---

## 📄 Datei: js/assets.js
```js
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
        return window.State.getState().heroCount;
    },

    getDifficulty() {
        return window.State.getState().difficulty;
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

    getCurrentHeroStats() {
        return window.State.getState().heroStats || {};
    },

    getCurrentCombatState() {
        return window.State.getState().combatState || {};
    },

    initializeForAdventure(adventure, cards = []) {
        this.currentAdventure = adventure ?? null;
        this.currentCards = Array.isArray(cards) ? cards : [];
        this.currentPhase = 0;
        window.State.setCombatPhase(0);

        const currentCombatState = this.getCurrentCombatState();
        const startValue = this.getTimelineStartValue();
        const remainingTime = Number(currentCombatState.remainingTime);

        if (!Number.isFinite(remainingTime) || remainingTime <= 0) {
            window.State.setCombatField('remainingTime', startValue);
        }

        window.State.setCombatField('targetResult', '--');

        this.updateDashboard();
        this.updatePhaseTracker();
        this.renderCombatState();
        this.updateEpResult();
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
            : this.getCurrentHeroStats();

        container.innerHTML = Array.from({ length: heroCount }, (_, i) => {
            const heroIndex = i + 1;
            return this.buildHeroCard(heroIndex, stats[heroIndex] || {});
        }).join('');

        this.bindDashboardButtons();
    },

    bindDashboardButtons() {
        const container = this.getHeroDashboard();
        if (!container || container.dataset.boundCombatDashboard === 'true') return;

        container.addEventListener('click', event => {
            const button = event.target.closest('button[data-action]');
            if (!button) return;

            const heroCard = button.closest('.hero-card');
            if (!heroCard) return;

            const heroIndex = Number(heroCard.dataset.heroIndex);
            const action = button.dataset.action;
            const heroStats = this.getCurrentHeroStats();
            const current = heroStats[heroIndex] || { lp: 40, fate: 0 };

            if (action === 'lp-minus') {
                window.State.setHeroStat(heroIndex, 'lp', Math.max(0, Number(current.lp) - 1));
            }

            if (action === 'lp-plus') {
                window.State.setHeroStat(heroIndex, 'lp', Number(current.lp) + 1);
            }

            if (action === 'fate-minus') {
                window.State.setHeroStat(heroIndex, 'fate', Math.max(0, Number(current.fate) - 1));
            }

            if (action === 'fate-plus') {
                window.State.setHeroStat(heroIndex, 'fate', Number(current.fate) + 1);
            }

            this.updateDashboard();

            if (window.StorageManager?.persist) {
                window.StorageManager.persist();
            }
        });

        container.dataset.boundCombatDashboard = 'true';
    },

    updatePhaseTracker() {
        this.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;

        const steps = this.getPhaseSteps();
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentPhase);
        });
    },

    prevPhase() {
        this.currentPhase = (this.currentPhase - 1 + this.phaseLabels.length) % this.phaseLabels.length;
        window.State.setCombatPhase(this.currentPhase);
        this.updatePhaseTracker();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    nextPhase() {
        const wasTimePhase = this.currentPhase === this.phaseLabels.length - 1;

        this.currentPhase = (this.currentPhase + 1) % this.phaseLabels.length;
        window.State.setCombatPhase(this.currentPhase);
        this.updatePhaseTracker();

        if (wasTimePhase) {
            this.advanceTimeMarker();
        }

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    advanceTimeMarker() {
        const combatState = this.getCurrentCombatState();
        const current = Number(combatState.remainingTime);
        const next = Number.isFinite(current) ? Math.max(0, current - 1) : 0;

        window.State.setCombatField('remainingTime', next);
        this.renderCombatState();
        this.updateEpResult();
    },

    rollTarget() {
        const heroCount = this.getHeroCount();
        const result = Math.max(1, Math.ceil(Math.random() * heroCount));

        window.State.setCombatField('targetResult', `Held ${result}`);
        this.renderCombatState();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    resetTargetResult() {
        window.State.setCombatField('targetResult', '--');
        this.renderCombatState();
    },

    updateEpResult() {
        const difficulty = this.getDifficulty();
        const remainingTime = Number(this.getCurrentCombatState().remainingTime ?? 0);

        let ep = 2;

        if (difficulty === 'easy') ep += 1;
        if (difficulty === 'hard') ep -= 1;

        if (remainingTime >= 5) ep += 1;
        if (remainingTime <= 1) ep -= 1;

        ep = Math.max(0, ep);

        window.State.setCombatField('epResult', `${ep} EP`);
        this.renderCombatState();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    renderCombatState() {
        const state = this.getCurrentCombatState();

        const remainingTime = this.getRemainingTimeInput();
        const epResult = this.getEpResultEl();
        const targetResult = this.getTargetResultEl();

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

    applyIntermission() {
        const heroCount = this.getHeroCount();
        const stats = this.getCurrentHeroStats();

        for (let i = 1; i <= heroCount; i += 1) {
            const current = stats[i] || { lp: 40, fate: 0 };
            window.State.setHeroStat(i, 'lp', Math.max(0, Number(current.lp) + 3));
            window.State.setHeroStat(i, 'fate', Math.max(0, Number(current.fate) + 1));
        }

        this.updateDashboard();

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    bindGlobalCombatInputs() {
        const remainingTime = this.getRemainingTimeInput();

        if (remainingTime && !remainingTime.dataset.boundCombat) {
            remainingTime.addEventListener('input', () => {
                window.State.setCombatField('remainingTime', Number(remainingTime.value) || 0);
                this.updateEpResult();
            });
            remainingTime.dataset.boundCombat = 'true';
        }
    },

    init() {
        this.currentPhase = Number(window.State.getState().combatPhase ?? 0) || 0;
        this.bindGlobalCombatInputs();
        this.updatePhaseTracker();
        this.updateDashboard();
        this.renderCombatState();
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
            shortName: 'Grundbox',
            enabled: true,
            adventurePath: 'data/adventures/base_game',
            adventureIndex: 'data/adventures/base_game/index.json',
            cardRoot: 'data/cards/base_game',
            catalogRoot: 'data/cards/base_game/catalog',
            manualRoot: 'data/manual/base_game',
            masterIndex: 'data/cards/base_game/master_base_game.json',

            theme: {
                cssVars: {
                    '--color-primary': '#5c1e1e',
                    '--color-primary-hover': '#7a2828',
                    '--color-secondary': '#8b4513',
                    '--color-secondary-soft': '#a0522d',
                    '--color-bg-body': '#dcd0ba',
                    '--color-bg-panel': '#f4e7d3',
                    '--color-bg-panel-alt': '#e6dec9',
                    '--color-text': '#2e241f',
                    '--color-info': '#2c5282',
                    '--color-success': '#276749',
                    '--color-danger': '#9b2c2c'
                },
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Klassisch Aventurisch'
                }
            }
        }

        /*
        Beispiel für weitere Boxen:
        ,
        wildenstein_box: {
            id: 'wildenstein_box',
            name: 'Aventuria Wildenstein',
            shortName: 'Wildenstein',
            enabled: true,
            adventurePath: 'data/adventures/wildenstein_box',
            adventureIndex: 'data/adventures/wildenstein_box/index.json',
            cardRoot: 'data/cards/wildenstein_box',
            catalogRoot: 'data/cards/wildenstein_box/catalog',
            manualRoot: 'data/manual/wildenstein_box',
            masterIndex: 'data/cards/wildenstein_box/master_wildenstein_box.json',
            theme: {
                cssVars: {
                    '--color-primary': '#3f2a4d',
                    '--color-primary-hover': '#523664',
                    '--color-secondary': '#6d5a87',
                    '--color-bg-body': '#d7d0e2',
                    '--color-bg-panel': '#eee8f6',
                    '--color-bg-panel-alt': '#e2dced',
                    '--color-text': '#241d2d'
                },
                meta: {
                    bodyClass: 'theme-wildenstein',
                    themeName: 'Düster & Mystisch'
                }
            }
        }
        */
    },

    normalizeSetKey(setKey = '') {
        const normalized = String(setKey || '').trim();
        return normalized || this.defaultSet;
    },

    getSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return this.sets[normalizedKey] || this.sets[this.defaultSet];
    },

    getEnabledSets() {
        return Object.values(this.sets)
            .filter(setConfig => setConfig?.enabled !== false)
            .map(setConfig => ({
                id: String(setConfig.id ?? '').trim(),
                name: String(setConfig.name ?? setConfig.id ?? '').trim(),
                shortName: String(setConfig.shortName ?? setConfig.name ?? setConfig.id ?? '').trim()
            }))
            .filter(setConfig => setConfig.id);
    },

    hasSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return Boolean(this.sets[normalizedKey]);
    },

    getAdventurePath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.adventurePath}/${id}.json`;
    },

    getAdventureIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.adventureIndex;
    },

    getLegacyAdventureCardsPath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.cardRoot}/${id}/${id}.json`;
    },

    getMasterIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.masterIndex;
    },

    getCatalogRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.catalogRoot;
    },

    getManualRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.manualRoot;
    },

    getManualIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return `${setConfig.manualRoot}/index.json`;
    },

    getManualPagePath(pageNumber, setKey = '') {
        const setConfig = this.getSet(setKey);
        const page = String(pageNumber).padStart(2, '0');
        return `${setConfig.manualRoot}/page_${page}.json`;
    },

    getSetDisplayName(setKey = '') {
        return this.getSet(setKey)?.name || this.getSet(this.defaultSet)?.name || 'Aventuria';
    },

    getSetShortName(setKey = '') {
        return this.getSet(setKey)?.shortName || this.getSet(setKey)?.name || 'Set';
    },

    getSetTheme(setKey = '') {
        return this.getSet(setKey)?.theme || { cssVars: {}, meta: {} };
    }
};

```

---

## 📄 Datei: js/constants.js
```js
window.Constants = {
    statuses: {
        adventures: [
            'canonical',
            'deprecated_alias',
            'migrated',
            'raw',
            'basic',
            'playable',
            'verified'
        ],

        cards: [
            'raw',
            'basic',
            'playable',
            'playable_placeholder',
            'verified',
            'migrated',
            'canonical',
            'deprecated_alias',
            'complete'
        ]
    },

    placeholders: {
        cardRefPatterns: [
            /^minions?_eurer_wahl$/i,
            /^schergen?_eurer_wahl$/i,
            /^special_/i,
            /^story_/i
        ]
    },

    ui: {
        defaultStatusText: 'Bereit.',
        sectionStateMap: {
            'combat-tools-section': 'combatToolsOpen',
            'intermission-section': 'intermissionOpen'
        }
    },

    events: {
        validationStarted: 'validation:started',
        validationFinished: 'validation:finished',
        diagnosticsRequested: 'diagnostics:requested',
        archiveSetChanged: 'archive:setChanged',
        rulebookIndexLoaded: 'rulebook:indexLoaded',
        setChanged: 'set:changed'
    },

    isAllowedAdventureStatus(status = '') {
        return this.statuses.adventures.includes(String(status ?? '').trim());
    },

    isAllowedCardStatus(status = '') {
        return this.statuses.cards.includes(String(status ?? '').trim());
    }
};

```

---

## 📄 Datei: js/core/api-cache.js
```js
export const ApiCache = {
    adventures: {},
    adventureLists: {},
    cardPayloads: {},
    catalogCards: {},
    masterIndexes: {},

    clear() {
        this.adventures = {};
        this.adventureLists = {};
        this.cardPayloads = {};
        this.catalogCards = {};
        this.masterIndexes = {};
    },

    clearSet(setKey) {
        const key = String(setKey ?? '').trim();

        delete this.adventureLists[key];
        delete this.masterIndexes[key];

        Object.keys(this.cardPayloads).forEach(cacheKey => {
            if (cacheKey.startsWith(key + '::')) {
                delete this.cardPayloads[cacheKey];
            }
        });
    }
};

export default ApiCache;

```

---

## 📄 Datei: js/core/api-card-lookup.js
```js
import CONFIG from './config.js';
import Utils from './utils.js';
import ApiFetch from './api-fetch.js';
import ApiNormalizers from './api-normalizers.js';

export const ApiCardLookup = {
    resolveAdventureSetKey(adventureId, fallbackSetKey = '') {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedFallback = Utils.normalizeString(
            fallbackSetKey || CONFIG.defaultSet || 'base_game'
        );

        if (!normalizedAdventureId) {
            return normalizedFallback;
        }

        const adventure = window.ApiCache?.adventures?.[normalizedAdventureId];
        const setId = Utils.normalizeString(adventure?.set?.id);

        return setId || normalizedFallback;
    },

    getAdventureSetKey(adventureId, fallbackSetKey = '') {
        return this.resolveAdventureSetKey(adventureId, fallbackSetKey);
    },

    getActiveSetKey() {
        const selectedAdventure = window.State?.getState?.()?.selectedAdventure || '';
        if (selectedAdventure) {
            return this.resolveAdventureSetKey(
                selectedAdventure,
                CONFIG.defaultSet || 'base_game'
            );
        }

        return CONFIG.defaultSet || 'base_game';
    },

    buildCardPayload(adventureId, cards = [], adventureName = '') {
        return {
            adventure_id: Utils.normalizeString(adventureId),
            adventure_name: Utils.normalizeString(adventureName),
            cards: Utils.normalizeArray(cards)
        };
    },

    getCardPayloadCacheKey(adventureId, setKey) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );

        return `${normalizedSetKey}::${normalizedAdventureId}`;
    },

    getLegacyCardsPath(adventureId, setKey) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        const normalizedSetKey = Utils.normalizeString(
            setKey || CONFIG.defaultSet || 'base_game'
        );

        if (CONFIG?.getLegacyAdventureCardsPath) {
            return CONFIG.getLegacyAdventureCardsPath(
                normalizedAdventureId,
                normalizedSetKey
            );
        }

        return `data/cards/${normalizedSetKey}/${normalizedAdventureId}/${normalizedAdventureId}.json`;
    },

    async getCatalogCard(detailPath) {
        const normalizedPath = Utils.normalizeString(detailPath);
        if (!normalizedPath) return null;

        if (window.ApiCache?.catalogCards?.[normalizedPath]) {
            return window.ApiCache.catalogCards[normalizedPath];
        }

        const rawData = await ApiFetch.fetchJson(normalizedPath);
        const normalized = ApiNormalizers.normalizeCatalogCard(rawData);

        if (window.ApiCache?.catalogCards) {
            window.ApiCache.catalogCards[normalizedPath] = normalized;
        }

        return normalized;
    },

    getMigratedMasterCards(masterIndex, adventureId) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);

        return Utils.normalizeArray(masterIndex?.cards).filter(card =>
            Array.isArray(card?.adventure_refs) &&
            card.adventure_refs.includes(normalizedAdventureId) &&
            typeof card?.detail_path === 'string' &&
            card.detail_path.trim().length > 0
        );
    },

    async loadMigratedMasterCards(masterCards) {
        const loadedCards = [];

        for (const entry of Utils.normalizeArray(masterCards)) {
            try {
                const detail = await this.getCatalogCard(entry?.detail_path);
                if (detail) {
                    loadedCards.push(detail);
                }
            } catch (err) {
                console.warn(
                    `⚠️ Katalogkarte konnte nicht geladen werden: ${entry?.id || entry?.detail_path || 'unbekannt'}`,
                    err
                );
            }
        }

        return loadedCards;
    },

    async loadLegacyCards(adventureId, setKey) {
        const legacyPath = this.getLegacyCardsPath(adventureId, setKey);
        const rawData = await ApiFetch.fetchJson(legacyPath);

        return ApiNormalizers.normalizeCardPayload(rawData, Utils.normalizeString(adventureId));
    },

    cacheCardPayload(cacheKey, payload) {
        if (window.ApiCache?.cardPayloads) {
            window.ApiCache.cardPayloads[cacheKey] = payload;
        }
        return payload;
    },

    async getCards(adventureId, setKey = null) {
        const normalizedAdventureId = Utils.normalizeString(adventureId);
        if (!normalizedAdventureId) {
            return ApiNormalizers.normalizeCardPayload({ cards: [] }, '');
        }

        const resolvedSetKey = this.resolveAdventureSetKey(
            normalizedAdventureId,
            setKey || CONFIG.defaultSet || 'base_game'
        );

        const cacheKey = this.getCardPayloadCacheKey(
            normalizedAdventureId,
            resolvedSetKey
        );

        if (window.ApiCache?.cardPayloads?.[cacheKey]) {
            return window.ApiCache.cardPayloads[cacheKey];
        }

        const masterIndex = await ApiFetch.getMasterIndex(resolvedSetKey);
        const migratedMasterCards = this.getMigratedMasterCards(
            masterIndex,
            normalizedAdventureId
        );

        if (migratedMasterCards.length > 0) {
            const loadedCards = await this.loadMigratedMasterCards(migratedMasterCards);
            const payload = this.buildCardPayload(normalizedAdventureId, loadedCards, '');

            return this.cacheCardPayload(cacheKey, payload);
        }

        try {
            const legacyPayload = await this.loadLegacyCards(
                normalizedAdventureId,
                resolvedSetKey
            );

            return this.cacheCardPayload(cacheKey, legacyPayload);
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${normalizedAdventureId}"`, err);

            const fallbackPayload = ApiNormalizers.normalizeCardPayload(
                { cards: [] },
                normalizedAdventureId
            );

            return this.cacheCardPayload(cacheKey, fallbackPayload);
        }
    },

    async preloadCardsForAdventure(adventureId, setKey = null) {
        return await this.getCards(adventureId, setKey);
    },

    getCachedCatalogCardById(id) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        return Object.values(window.ApiCache?.catalogCards || {})
            .find(card => card?.id === targetId) || null;
    },

    getEnabledSetIds(setKey = null) {
        const normalizedSetKey = Utils.normalizeString(setKey);

        if (normalizedSetKey) {
            return [normalizedSetKey];
        }

        return CONFIG.getEnabledSets?.().map(setConfig => setConfig.id)
            || [CONFIG.defaultSet || 'base_game'];
    },

    async findCardInMasterIndexes(targetId, setKey = null) {
        const setsToSearch = this.getEnabledSetIds(setKey);

        for (const currentSetKey of setsToSearch) {
            const master = await ApiFetch.getMasterIndex(currentSetKey);
            const entry = Utils.normalizeArray(master?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (!entry?.detail_path) {
                continue;
            }

            try {
                return await this.getCatalogCard(entry.detail_path);
            } catch (err) {
                console.warn(`⚠️ Detailkarte konnte nicht geladen werden: ${targetId}`, err);
            }
        }

        return null;
    },

    findCardInLoadedPayloads(targetId) {
        for (const payload of Object.values(window.ApiCache?.cardPayloads || {})) {
            const found = Utils.normalizeArray(payload?.cards)
                .find(card => Utils.normalizeString(card?.id) === targetId);

            if (found) {
                return found;
            }
        }

        return null;
    },

    async findCardById(id, setKey = null) {
        const targetId = Utils.normalizeString(id);
        if (!targetId) return null;

        const cachedCatalogCard = this.getCachedCatalogCardById(targetId);
        if (cachedCatalogCard) {
            return cachedCatalogCard;
        }

        const masterCard = await this.findCardInMasterIndexes(targetId, setKey);
        if (masterCard) {
            return masterCard;
        }

        return this.findCardInLoadedPayloads(targetId);
    },

    async openCardDetailById(id) {
        const card = await this.findCardById(id);
        if (!card) return;

        if (window.RenderCardDetail?.openCardDetail) {
            window.RenderCardDetail.openCardDetail(card);
            return;
        }

        if (window.Renderer?.openCardDetail) {
            window.Renderer.openCardDetail(card);
        }
    }
};

export default ApiCardLookup;

```

---

## 📄 Datei: js/core/api-fetch.js
```js
import CONFIG from './config.js';
import Utils from './utils.js';
import ApiNormalizers from './api-normalizers.js';

export const ApiFetch = {
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

    async getAdventureIndex(setKey = null) {
        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);

        if (window.ApiCache?.adventureLists?.[resolvedSetKey]) {
            return window.ApiCache.adventureLists[resolvedSetKey];
        }

        const path = CONFIG.getAdventureIndexPath
            ? CONFIG.getAdventureIndexPath(resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/index.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            const fallback = [];
            if (window.ApiCache?.adventureLists) {
                window.ApiCache.adventureLists[resolvedSetKey] = fallback;
            }
            return fallback;
        }

        const entries = Utils.normalizeArray(rawData?.adventures)
            .map(entry => ApiNormalizers.normalizeAdventureIndexEntry(entry, resolvedSetKey))
            .filter(Boolean);

        if (window.ApiCache?.adventureLists) {
            window.ApiCache.adventureLists[resolvedSetKey] = entries;
        }

        return entries;
    },

    async getAvailableAdventures() {
        const enabledSets = CONFIG.getEnabledSets?.()
            || [{ id: CONFIG.defaultSet }];

        const allEntries = [];

        for (const setConfig of enabledSets) {
            const entries = await this.getAdventureIndex(setConfig.id);
            allEntries.push(...entries);
        }

        return allEntries
            .filter(entry => !entry.hidden)
            .filter(entry => entry.status !== 'deprecated_alias')
            .sort((a, b) => {
                if (a.order !== b.order) {
                    return a.order - b.order;
                }
                if (a.set.id !== b.set.id) {
                    return a.set.name.localeCompare(b.set.name, 'de');
                }
                return a.name.localeCompare(b.name, 'de');
            });
    },

    async getAdventure(id, setKey = null, visitedIds = new Set()) {
        const adventureId = Utils.normalizeString(id);
        if (!adventureId) return null;

        if (visitedIds.has(adventureId)) {
            throw new Error(`Zirkuläre Alias-Weiterleitung bei Abenteuer "${adventureId}".`);
        }

        if (window.ApiCache?.adventures?.[adventureId]) {
            return window.ApiCache.adventures[adventureId];
        }

        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);
        const path = CONFIG.getAdventurePath
            ? CONFIG.getAdventurePath(adventureId, resolvedSetKey)
            : `data/adventures/${resolvedSetKey}/${adventureId}.json`;

        const rawData = await this.loadJSON(path);

        if (!rawData) {
            console.error('Abenteuer-Datei fehlt:', path);
            return null;
        }

        const status = Utils.normalizeString(rawData?.status);

        if (status === 'deprecated_alias') {
            const redirectAdventureId = ApiNormalizers.extractAdventureIdFromRedirect(rawData?.redirect_to);

            if (!redirectAdventureId) {
                throw new Error(`Alias-Abenteuer "${adventureId}" hat kein gültiges redirect_to.`);
            }

            visitedIds.add(adventureId);

            const redirectedAdventure = await this.getAdventure(
                redirectAdventureId,
                resolvedSetKey,
                visitedIds
            );

            if (redirectedAdventure && window.ApiCache?.adventures) {
                window.ApiCache.adventures[adventureId] = redirectedAdventure;
            }

            return redirectedAdventure;
        }

        const normalized = ApiNormalizers.normalizeAdventure(rawData, adventureId, resolvedSetKey);

        if (window.ApiCache?.adventures) {
            window.ApiCache.adventures[adventureId] = normalized;
        }

        return normalized;
    },

    async getMasterIndex(setKey = null) {
        const resolvedSetKey = Utils.normalizeString(setKey || CONFIG.defaultSet);

        if (window.ApiCache?.masterIndexes?.[resolvedSetKey]) {
            return window.ApiCache.masterIndexes[resolvedSetKey];
        }

        const path = CONFIG.getMasterIndexPath
            ? CONFIG.getMasterIndexPath(resolvedSetKey)
            : `data/cards/${resolvedSetKey}/master_${resolvedSetKey}.json`;

        try {
            const rawData = await this.fetchJson(path);
            const normalized = {
                set: rawData?.set || {
                    id: resolvedSetKey,
                    name: CONFIG.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: Number(rawData?.catalog_version ?? 1),
                cards: Utils.normalizeArray(rawData?.cards)
            };

            if (window.ApiCache?.masterIndexes) {
                window.ApiCache.masterIndexes[resolvedSetKey] = normalized;
            }

            return normalized;
        } catch (err) {
            console.error('Fehler beim Laden des Master-Index:', err);

            const fallback = {
                set: {
                    id: resolvedSetKey,
                    name: CONFIG.getSetDisplayName?.(resolvedSetKey) || resolvedSetKey
                },
                catalog_version: 1,
                cards: []
            };

            if (window.ApiCache?.masterIndexes) {
                window.ApiCache.masterIndexes[resolvedSetKey] = fallback;
            }

            return fallback;
        }
    }
};

export default ApiFetch;

```

---

## 📄 Datei: js/core/api-normalizers.js
```js
import CONFIG from './config.js';
import Utils from './utils.js';

export const ApiNormalizers = {
    extractAdventureIdFromRedirect(redirectValue = '') {
        const normalized = Utils.normalizeString(redirectValue);
        if (!normalized) return '';

        const withoutQuery = normalized.split('?')[0].split('#')[0];
        const lastSegment = withoutQuery.split('/').pop() || '';
        return Utils.normalizeString(lastSegment.replace(/\.json$/i, ''));
    },

    normalizeAdventureIndexEntry(entry, fallbackSetKey = '') {
        if (!entry || typeof entry !== 'object') {
            return null;
        }

        const resolvedSetKey = CONFIG.normalizeSetKey(
            entry?.set?.id || fallbackSetKey || CONFIG.defaultSet
        );
        const setConfig = CONFIG.getSet(resolvedSetKey);

        const id = Utils.normalizeString(entry.id);
        if (!id) {
            return null;
        }

        return {
            id,
            name: Utils.normalizeString(entry.name) || id,
            status: Utils.normalizeString(entry.status) || 'raw',
            hidden: Boolean(entry.hidden),
            order: Number(entry.order ?? 9999),
            set: {
                id: setConfig.id,
                name: setConfig.name,
                shortName: setConfig.shortName || setConfig.name
            }
        };
    },

    normalizeAdventure(data, fallbackId = '', setKey = '') {
        const raw = data && typeof data === 'object' ? data : {};
        const resolvedSetKey = CONFIG.normalizeSetKey(
            raw?.set?.id || setKey || CONFIG.defaultSet
        );
        const setConfig = CONFIG.getSet(resolvedSetKey);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id || fallbackId),
            name: Utils.normalizeString(raw.name || fallbackId),
            status: Utils.normalizeString(raw.status || 'raw'),
            danger_calc: Number(raw?.danger_calc ?? 0),
            narrative: Utils.normalizeObject(raw.narrative),
            setup: Utils.normalizeObject(raw.setup),
            source: Utils.normalizeObject(raw.source),
            notes: Utils.normalizeString(raw.notes),
            set: {
                ...(Utils.normalizeObject(raw.set)),
                id: setConfig.id,
                name: Utils.normalizeString(raw?.set?.name) || setConfig.name,
                shortName: Utils.normalizeString(raw?.set?.shortName) || setConfig.shortName || setConfig.name
            }
        };
    },

    normalizeCatalogCard(card) {
        const raw = card && typeof card === 'object' ? card : {};
        const setId = Utils.normalizeString(raw?.set?.id || raw?.set || CONFIG.defaultSet);
        const setConfig = CONFIG.getSet(setId);

        return {
            ...raw,
            id: Utils.normalizeString(raw.id),
            name: Utils.normalizeString(raw.name || raw.id),
            type: Utils.normalizeString(raw.type || 'unknown'),
            status: Utils.normalizeString(raw.status || 'raw'),
            card_category: Utils.normalizeString(raw.card_category || 'unknown'),

            set: {
                ...(Utils.normalizeObject(raw.set)),
                id: setConfig.id,
                name: Utils.normalizeString(raw?.set?.name) || setConfig.name,
                shortName: Utils.normalizeString(raw?.set?.shortName) || setConfig.shortName || setConfig.name
            },

            subtypes: Utils.normalizeArray(raw.subtypes),
            adventure_refs: Utils.normalizeArray(raw.adventure_refs),
            tags: Utils.normalizeArray(raw.tags),
            custom_tags: Utils.normalizeArray(raw.custom_tags),
            keywords: Utils.normalizeArray(raw.keywords),

            images: {
                front: Utils.normalizeString(raw?.images?.front || raw?.image),
                back: raw?.images?.back ?? null,
                alt: Utils.normalizeArray(raw?.images?.alt)
            },

            stats: Utils.normalizeObject(raw.stats),
            rules: Utils.normalizeObject(raw.rules),
            source: Utils.normalizeObject(raw.source),
            notes: Utils.normalizeString(raw.notes),
            search_text: Utils.normalizeString(raw.search_text)
        };
    },

    normalizeLegacyCard(card, fallbackAdventureId = '') {
        const raw = card && typeof card === 'object' ? card : {};

        return {
            ...raw,
            id: Utils.normalizeString(raw.id),
            name: Utils.normalizeString(raw.name || raw.id),
            type: Utils.normalizeString(raw.type || 'unknown'),
            status: Utils.normalizeString(raw.status || 'raw'),
            adventure_id: Utils.normalizeString(raw.adventure_id || fallbackAdventureId),
            set: Utils.normalizeString(raw.set || CONFIG.defaultSet),
            tags: Utils.normalizeArray(raw.tags),
            keywords: Utils.normalizeArray(raw.keywords),
            pool_refs: Utils.normalizeArray(raw.pool_refs),
            stats: Utils.normalizeObject(raw.stats),
            rules: Utils.normalizeObject(raw.rules),
            source: Utils.normalizeObject(raw.source),
            note: Utils.normalizeString(raw.note),
            image: Utils.normalizeString(raw.image),
            thumb: raw.thumb ?? null
        };
    },

    normalizeCardPayload(rawData, adventureId = '') {
        const raw = rawData && typeof rawData === 'object' ? rawData : {};

        return {
            adventure_id: Utils.normalizeString(raw.adventure_id || adventureId),
            adventure_name: Utils.normalizeString(raw.adventure_name),
            cards: Utils.normalizeArray(raw.cards).map(card =>
                this.normalizeLegacyCard(card, adventureId)
            )
        };
    }
};

export default ApiNormalizers;

```

---

## 📄 Datei: js/core/assets.js
```js
export const Assets = {
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

export default Assets;

```

---

## 📄 Datei: js/core/config.js
```js
export const CONFIG = {
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
            shortName: 'Grundbox',
            enabled: true,
            adventurePath: 'data/adventures/base_game',
            adventureIndex: 'data/adventures/base_game/index.json',
            cardRoot: 'data/cards/base_game',
            catalogRoot: 'data/cards/base_game/catalog',
            manualRoot: 'data/manual/base_game',
            masterIndex: 'data/cards/base_game/master_base_game.json',

            theme: {
                cssVars: {
                    '--color-primary': '#5c1e1e',
                    '--color-primary-hover': '#7a2828',
                    '--color-secondary': '#8b4513',
                    '--color-secondary-soft': '#a0522d',
                    '--color-bg-body': '#dcd0ba',
                    '--color-bg-panel': '#f4e7d3',
                    '--color-bg-panel-alt': '#e6dec9',
                    '--color-text': '#2e241f',
                    '--color-info': '#2c5282',
                    '--color-success': '#276749',
                    '--color-danger': '#9b2c2c'
                },
                meta: {
                    bodyClass: 'theme-base-game',
                    themeName: 'Klassisch Aventurisch'
                }
            }
        }
    },

    normalizeSetKey(setKey = '') {
        const normalized = String(setKey || '').trim();
        return normalized || this.defaultSet;
    },

    getSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return this.sets[normalizedKey] || this.sets[this.defaultSet];
    },

    getEnabledSets() {
        return Object.values(this.sets)
            .filter(setConfig => setConfig?.enabled !== false)
            .map(setConfig => ({
                id: String(setConfig.id ?? '').trim(),
                name: String(setConfig.name ?? setConfig.id ?? '').trim(),
                shortName: String(setConfig.shortName ?? setConfig.name ?? setConfig.id ?? '').trim()
            }))
            .filter(setConfig => setConfig.id);
    },

    hasSet(setKey = '') {
        const normalizedKey = this.normalizeSetKey(setKey);
        return Boolean(this.sets[normalizedKey]);
    },

    getAdventurePath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.adventurePath}/${id}.json`;
    },

    getAdventureIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.adventureIndex;
    },

    getLegacyAdventureCardsPath(adventureId, setKey = '') {
        const setConfig = this.getSet(setKey);
        const id = String(adventureId ?? '').trim();
        return `${setConfig.cardRoot}/${id}/${id}.json`;
    },

    getMasterIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.masterIndex;
    },

    getCatalogRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.catalogRoot;
    },

    getManualRoot(setKey = '') {
        const setConfig = this.getSet(setKey);
        return setConfig.manualRoot;
    },

    getManualIndexPath(setKey = '') {
        const setConfig = this.getSet(setKey);
        return `${setConfig.manualRoot}/index.json`;
    },

    getManualPagePath(pageNumber, setKey = '') {
        const setConfig = this.getSet(setKey);
        const page = String(pageNumber).padStart(2, '0');
        return `${setConfig.manualRoot}/page_${page}.json`;
    },

    getSetDisplayName(setKey = '') {
        return this.getSet(setKey)?.name || this.getSet(this.defaultSet)?.name || 'Aventuria';
    },

    getSetShortName(setKey = '') {
        return this.getSet(setKey)?.shortName || this.getSet(setKey)?.name || 'Set';
    },

    getSetTheme(setKey = '') {
        return this.getSet(setKey)?.theme || { cssVars: {}, meta: {} };
    }
};

export default CONFIG;

```

---

## 📄 Datei: js/core/constants.js
```js
export const Constants = {
    statuses: {
        adventures: [
            'canonical',
            'deprecated_alias',
            'migrated',
            'raw',
            'basic',
            'playable',
            'verified'
        ],

        cards: [
            'raw',
            'basic',
            'playable',
            'playable_placeholder',
            'verified',
            'migrated',
            'canonical',
            'deprecated_alias',
            'complete'
        ]
    },

    placeholders: {
        cardRefPatterns: [
            /^minions?_eurer_wahl$/i,
            /^schergen?_eurer_wahl$/i,
            /^special_/i,
            /^story_/i
        ]
    },

    ui: {
        defaultStatusText: 'Bereit.',
        sectionStateMap: {
            'combat-tools-section': 'combatToolsOpen',
            'intermission-section': 'intermissionOpen'
        }
    },

    events: {
        validationStarted: 'validation:started',
        validationFinished: 'validation:finished',
        diagnosticsRequested: 'diagnostics:requested',
        archiveSetChanged: 'archive:setChanged',
        rulebookIndexLoaded: 'rulebook:indexLoaded',
        setChanged: 'set:changed'
    },

    isAllowedAdventureStatus(status = '') {
        return this.statuses.adventures.includes(String(status ?? '').trim());
    },

    isAllowedCardStatus(status = '') {
        return this.statuses.cards.includes(String(status ?? '').trim());
    }
};

export default Constants;

```

---

## 📄 Datei: js/core/events.js
```js
export const Events = {
    handlers: new Map(),

    on(eventName, handler) {
        const name = String(eventName ?? '').trim();
        if (!name || typeof handler !== 'function') {
            return () => {};
        }

        if (!this.handlers.has(name)) {
            this.handlers.set(name, new Set());
        }

        const set = this.handlers.get(name);
        set.add(handler);

        return () => this.off(name, handler);
    },

    off(eventName, handler) {
        const name = String(eventName ?? '').trim();
        const set = this.handlers.get(name);

        if (!set) return;

        set.delete(handler);

        if (set.size === 0) {
            this.handlers.delete(name);
        }
    },

    once(eventName, handler) {
        if (typeof handler !== 'function') {
            return () => {};
        }

        const unsubscribe = this.on(eventName, payload => {
            unsubscribe();
            handler(payload);
        });

        return unsubscribe;
    },

    emit(eventName, payload = {}) {
        const name = String(eventName ?? '').trim();
        const set = this.handlers.get(name);

        if (!set || set.size === 0) {
            return;
        }

        [...set].forEach(handler => {
            try {
                handler(payload);
            } catch (error) {
                console.error(`Fehler im Event-Handler für "${name}":`, error);
            }
        });
    }
};

export default Events;

```

---

## 📄 Datei: js/core/state.js
```js
const DEFAULT_STATE = {
    selectedAdventure: '',
    heroCount: 2,
    difficulty: 'normal',

    remainingTime: 0,
    currentPhase: 0,
    epResult: '2 EP',
    targetResult: '--',

    heroStats: [],

    combatToolsOpen: true,
    intermissionOpen: true
};

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

export const State = {
    state: clone(DEFAULT_STATE),

    getDefaultState() {
        return clone(DEFAULT_STATE);
    },

    getState() {
        return this.state;
    },

    replaceState(nextState = {}) {
        const defaults = this.getDefaultState();
        const safeNextState = nextState && typeof nextState === 'object' ? nextState : {};

        this.state = {
            ...defaults,
            ...safeNextState,
            heroStats: Array.isArray(safeNextState.heroStats)
                ? safeNextState.heroStats
                : defaults.heroStats
        };

        return this.state;
    },

    reset() {
        this.state = this.getDefaultState();
        return this.state;
    },

    setSelectedAdventure(value = '') {
        this.state.selectedAdventure = String(value ?? '').trim();
    },

    setHeroCount(value = 2) {
        const numeric = Number(value);
        this.state.heroCount = Number.isFinite(numeric) ? numeric : 2;
    },

    setDifficulty(value = 'normal') {
        this.state.difficulty = String(value ?? 'normal').trim() || 'normal';
    },

    setRemainingTime(value = 0) {
        const numeric = Number(value);
        this.state.remainingTime = Number.isFinite(numeric) ? numeric : 0;
    },

    setCurrentPhase(value = 0) {
        const numeric = Number(value);
        this.state.currentPhase = Number.isFinite(numeric) ? numeric : 0;
    },

    setEpResult(value = '2 EP') {
        this.state.epResult = String(value ?? '2 EP');
    },

    setTargetResult(value = '--') {
        this.state.targetResult = String(value ?? '--');
    },

    setHeroStats(value = []) {
        this.state.heroStats = Array.isArray(value) ? value : [];
    },

    setSectionOpen(key, isOpen) {
        if (!key) return;
        this.state[key] = Boolean(isOpen);
    },

    patch(partialState = {}) {
        if (!partialState || typeof partialState !== 'object') {
            return this.state;
        }

        this.state = {
            ...this.state,
            ...partialState,
            heroStats: Array.isArray(partialState.heroStats)
                ? partialState.heroStats
                : this.state.heroStats
        };

        return this.state;
    }
};

export default State;

```

---

## 📄 Datei: js/core/theme.js
```js
import CONFIG from './config.js';
import Constants from './constants.js';
import Events from './events.js';

export const Theme = {
    currentSet: '',
    appliedVarKeys: new Set(),
    isBound: false,

    normalizeSetKey(setKey = '') {
        return CONFIG.normalizeSetKey(setKey);
    },

    getRoot() {
        return document.documentElement;
    },

    getBody() {
        return document.body;
    },

    getThemeConfig(setKey = '') {
        return CONFIG.getSetTheme(setKey) || { cssVars: {}, meta: {} };
    },

    clearAppliedCssVars() {
        const root = this.getRoot();
        if (!root) return;

        this.appliedVarKeys.forEach(key => {
            root.style.removeProperty(key);
        });

        this.appliedVarKeys.clear();
    },

    applyCssVars(cssVars = {}) {
        const root = this.getRoot();
        if (!root) return;

        Object.entries(cssVars).forEach(([key, value]) => {
            if (!key || value === null || value === undefined || value === '') {
                return;
            }

            root.style.setProperty(key, String(value));
            this.appliedVarKeys.add(key);
        });
    },

    applyBodyClass(bodyClass = '') {
        const body = this.getBody();
        if (!body) return;

        Array.from(body.classList)
            .filter(className => className.startsWith('theme-'))
            .forEach(className => body.classList.remove(className));

        if (bodyClass) {
            body.classList.add(bodyClass);
        }
    },

    applySetTheme(setKey = '', options = {}) {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const theme = this.getThemeConfig(resolvedSetKey);
        const cssVars = theme?.cssVars || {};
        const meta = theme?.meta || {};

        this.clearAppliedCssVars();
        this.applyCssVars(cssVars);
        this.applyBodyClass(meta.bodyClass || '');

        const root = this.getRoot();
        if (root) {
            root.dataset.activeSet = resolvedSetKey;
            root.dataset.activeTheme = String(meta.themeName || resolvedSetKey);
        }

        this.currentSet = resolvedSetKey;

        if (!options.silent) {
            console.log(`Theme aktiv: ${resolvedSetKey}`);
        }
    },

    resolveInitialSet() {
        const activeAdventureSet = window.ApiCardLookup?.getActiveSetKey?.();
        if (activeAdventureSet && CONFIG.hasSet(activeAdventureSet)) {
            return activeAdventureSet;
        }

        const archiveSet = window.Archive?.currentSet;
        if (archiveSet && CONFIG.hasSet(archiveSet)) {
            return archiveSet;
        }

        return CONFIG.defaultSet;
    },

    bindEvents() {
        if (this.isBound) {
            return;
        }

        const archiveEvent = Constants.events.archiveSetChanged;
        const rulebookEvent = Constants.events.rulebookIndexLoaded;
        const setChangedEvent = Constants.events.setChanged;

        Events.on(archiveEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        Events.on(rulebookEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        Events.on(setChangedEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        this.isBound = true;
    },

    init() {
        this.bindEvents();
        this.applySetTheme(this.resolveInitialSet(), { silent: true });
    }
};

export default Theme;

```

---

## 📄 Datei: js/core/utils.js
```js
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

```

---

## 📄 Datei: js/core/validator.js
```js
import Constants from './constants.js';

export const Validator = {
    get allowedAdventureStatuses() {
        return Constants.statuses.adventures ?? [
            'canonical',
            'deprecated_alias',
            'migrated',
            'raw',
            'basic',
            'playable',
            'verified'
        ];
    },

    get allowedCardStatuses() {
        return Constants.statuses.cards ?? [
            'raw',
            'basic',
            'playable',
            'playable_placeholder',
            'verified',
            'migrated',
            'canonical',
            'deprecated_alias',
            'complete'
        ];
    },

    get placeholderPatterns() {
        return Constants.placeholders.cardRefPatterns ?? [
            /^minions?_eurer_wahl$/i,
            /^schergen?_eurer_wahl$/i,
            /^special_/i,
            /^story_/i
        ];
    },

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

    isPlaceholderCardRef(refId = '') {
        const normalized = this.normalizeString(refId);
        if (!normalized) return false;

        return this.placeholderPatterns.some(pattern => pattern.test(normalized));
    },

    getSetupEntryId(entry) {
        if (typeof entry === 'string') {
            return this.normalizeString(entry);
        }

        if (this.isObject(entry)) {
            return this.normalizeString(entry.id);
        }

        return '';
    },

    getSetupEntryLabel(entry) {
        if (typeof entry === 'string') {
            return this.normalizeString(entry);
        }

        if (this.isObject(entry)) {
            return this.normalizeString(entry.label || entry.id);
        }

        return '';
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

        if (!id) {
            this.addError(result, 'Abenteuer hat keine gültige ID.');
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

        if (!this.isObject(adventure.setup)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen setup-Block.`);
        }

        if (!this.isObject(adventure.narrative)) {
            this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen narrative-Block.`);
        }

        return result;
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
            this.addError(result, 'Karte hat keine gültige ID.');
        }

        if (!name) {
            this.addWarning(result, `Karte "${id || 'unbekannt'}" hat keinen Namen.`);
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

        return result;
    }
};

export default Validator;

```

---

## 📄 Datei: js/diagnostics-renderer.js
```js
window.DiagnosticsRenderer = {
    getSectionEl() {
        return Utils.byId('diagnostics-section');
    },

    getSummaryEl() {
        return Utils.byId('diagnostics-summary');
    },

    getDetailsEl() {
        return Utils.byId('diagnostics-details');
    },

    getStatusText(summary) {
        const { errorCount, warningCount } = summary;

        if (errorCount > 0) {
            return '❌ Fehler gefunden';
        }

        if (warningCount > 0) {
            return '⚠ Warnungen vorhanden';
        }

        return '✅ Keine Probleme';
    },

    getStatusClassName(summary) {
        const { errorCount, warningCount } = summary;

        if (errorCount > 0) return 'error';
        if (warningCount > 0) return 'warning';
        return 'success';
    },

    renderSummary(state) {
        const summaryEl = this.getSummaryEl();
        if (!summaryEl) return;

        if (!state.visible) {
            summaryEl.innerHTML = '';
            return;
        }

        const { errorCount, warningCount, infoCount } = state.summary;
        const statusText = this.getStatusText(state.summary);
        const toggleLabel = state.detailsOpen ? 'Diagnose schließen' : 'Diagnose öffnen';

        summaryEl.innerHTML = `
            <div class="card-list diagnostics-summary-bar diagnostics-${Utils.escapeHtml(this.getStatusClassName(state.summary))}" style="padding:12px; margin:0;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
                    <div>
                        <div style="font-weight:bold; margin-bottom:6px;">${Utils.escapeHtml(statusText)}</div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap;">
                            <span><strong>Fehler:</strong> ${Utils.escapeHtml(errorCount)}</span>
                            <span><strong>Warnungen:</strong> ${Utils.escapeHtml(warningCount)}</span>
                            <span><strong>Infos:</strong> ${Utils.escapeHtml(infoCount)}</span>
                        </div>
                    </div>

                    <div class="button-group">
                        <button class="btn-outline" type="button" data-action="toggle-diagnostics-details">
                            ${Utils.escapeHtml(toggleLabel)}
                        </button>
                        <button class="btn-outline" type="button" data-action="clear-diagnostics">
                            Diagnose leeren
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderDetails(state) {
        const detailsEl = this.getDetailsEl();
        if (!detailsEl) return;

        detailsEl.classList.toggle('hidden', !state.detailsOpen);

        if (!state.visible || !state.detailsOpen) {
            detailsEl.innerHTML = '';
            return;
        }

        detailsEl.innerHTML = state.sections.map(section => {
            const badge = section.errors.length > 0
                ? '❌'
                : section.warnings.length > 0
                    ? '⚠️'
                    : '✅';

            const metaHtml = Object.keys(section.meta).length
                ? `
                    <div style="margin-top:8px; font-size:0.95em; opacity:0.9;">
                        ${Object.entries(section.meta).map(([key, value]) => `
                            <div><strong>${Utils.escapeHtml(key)}:</strong> ${Utils.escapeHtml(value)}</div>
                        `).join('')}
                    </div>
                `
                : '';

            const listBlock = (title, items) => {
                if (!items.length) return '';
                return `
                    <div style="margin-top:10px;">
                        <strong>${Utils.escapeHtml(title)}</strong>
                        <ul style="margin:8px 0 0 18px;">
                            ${items.map(item => `<li>${Utils.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            };

            return `
                <div class="card-list" style="margin-top:12px;">
                    <h3 style="margin-top:0;">${badge} ${Utils.escapeHtml(section.title)}</h3>
                    ${metaHtml}
                    ${listBlock('Fehler', section.errors)}
                    ${listBlock('Warnungen', section.warnings)}
                    ${listBlock('Infos', section.info)}
                </div>
            `;
        }).join('');
    },

    render(state) {
        const sectionEl = this.getSectionEl();
        if (!sectionEl) return;

        sectionEl.classList.toggle('hidden', !state.visible);

        this.renderSummary(state);
        this.renderDetails(state);
    }
};

```

---

## 📄 Datei: js/diagnostics-runner.js
```js
window.DiagnosticsRunner = {
    normalizeArray(value) {
        return Array.isArray(value) ? value : [];
    },

    normalizeObject(value) {
        return value && typeof value === 'object' && !Array.isArray(value)
            ? value
            : {};
    },

    normalizeString(value) {
        return String(value ?? '').trim();
    },

    createEmptyReport() {
        return {
            visible: false,
            detailsOpen: false,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };
    },

    addSection(report, title, result, options = {}) {
        const safeReport = this.normalizeObject(report);
        const safeResult = this.normalizeObject(result);
        const safeMeta = this.normalizeObject(options.meta);

        if (!Array.isArray(safeReport.sections)) {
            safeReport.sections = [];
        }

        safeReport.sections.push({
            title: this.normalizeString(title) || 'Diagnose',
            ok: Boolean(safeResult.ok),
            errors: this.normalizeArray(safeResult.errors),
            warnings: this.normalizeArray(safeResult.warnings),
            info: this.normalizeArray(safeResult.info),
            meta: safeMeta
        });

        this.recalculateSummary(safeReport);
        return safeReport;
    },

    recalculateSummary(report) {
        const safeReport = this.normalizeObject(report);
        const sections = this.normalizeArray(safeReport.sections);

        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        sections.forEach(section => {
            errorCount += this.normalizeArray(section.errors).length;
            warningCount += this.normalizeArray(section.warnings).length;
            infoCount += this.normalizeArray(section.info).length;
        });

        safeReport.summary = {
            errorCount,
            warningCount,
            infoCount
        };

        safeReport.visible = errorCount > 0 || warningCount > 0 || infoCount > 0;
        return safeReport;
    },

    createSingleMessageReport(type, title, message) {
        const report = this.createEmptyReport();

        this.addSection(report, title, {
            ok: type !== 'error',
            errors: type === 'error' ? [message] : [],
            warnings: type === 'warning' ? [message] : [],
            info: type === 'info' ? [message] : []
        });

        return report;
    },

    collectAssetWarnings(cards) {
        const warnings = [];
        const seenIds = new Set();

        this.normalizeArray(cards).forEach(card => {
            const id = this.normalizeString(card?.id || card?.name || '');

            if (id && seenIds.has(id)) {
                warnings.push(`Doppelte Karte im geladenen Satz: ${id}`);
            }

            if (id) {
                seenIds.add(id);
            }

            const image = this.normalizeString(card?.images?.front || card?.image || '');
            if (!image) {
                warnings.push(`Karte ohne Bildpfad: ${id || 'unbekannt'}`);
            }
        });

        return warnings;
    },

    classifySetupReferences(adventure, cards) {
        const setup = this.normalizeObject(adventure?.setup);
        const resolvedIds = new Set(
            this.normalizeArray(cards)
                .map(card => this.normalizeString(card?.id))
                .filter(Boolean)
        );

        const groups = [
            ...this.normalizeArray(setup.blue_cards),
            ...this.normalizeArray(setup.minion_cards),
            ...this.normalizeArray(setup.special_cards)
        ];

        const result = {
            resolved: [],
            placeholders: [],
            missing: []
        };

        groups.forEach(entry => {
            const refId = window.Validator?.getSetupEntryId?.(entry) || this.normalizeString(entry?.id || entry);
            const refLabel = window.Validator?.getSetupEntryLabel?.(entry) || refId;

            if (!refId) {
                return;
            }

            if (window.Validator?.isPlaceholderCardRef?.(refId)) {
                result.placeholders.push(refLabel);
                return;
            }

            if (resolvedIds.has(refId)) {
                result.resolved.push(refLabel);
                return;
            }

            result.missing.push(refLabel);
        });

        return result;
    },

    buildAdventureSection(adventure) {
        return window.Validator?.validateAdventure?.(adventure) || {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };
    },

    buildCardsSection(cards) {
        const cardsArray = this.normalizeArray(cards);
        const sectionResult = {
            ok: true,
            errors: [],
            warnings: [],
            info: []
        };

        if (cardsArray.length === 0) {
            sectionResult.warnings.push('Es wurden keine Karten für das Abenteuer geladen.');
            return {
                result: sectionResult,
                meta: {
                    Karten: 0
                }
            };
        }

        cardsArray.forEach(card => {
            const result = window.Validator?.validateCard?.(card);
            if (!result) return;

            if (this.normalizeArray(result.errors).length > 0) {
                sectionResult.ok = false;
                sectionResult.errors.push(
                    ...result.errors.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }

            if (this.normalizeArray(result.warnings).length > 0) {
                sectionResult.warnings.push(
                    ...result.warnings.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }

            if (this.normalizeArray(result.info).length > 0) {
                sectionResult.info.push(
                    ...result.info.map(message => `[${card?.id || card?.name || 'unbekannt'}] ${message}`)
                );
            }
        });

        const assetWarnings = this.collectAssetWarnings(cardsArray);
        if (assetWarnings.length > 0) {
            sectionResult.warnings.push(...assetWarnings);
        }

        if (sectionResult.errors.length === 0 && sectionResult.warnings.length === 0) {
            sectionResult.info.push('Alle geladenen Karten bestehen die Grundprüfung.');
        }

        return {
            result: sectionResult,
            meta: {
                Karten: cardsArray.length,
                'Asset-Warnungen': assetWarnings.length
            }
        };
    },

    buildMasterIndexSection(masterIndex, cards) {
        const masterCards = this.normalizeArray(masterIndex?.cards);
        const loadedCardIds = new Set(
            this.normalizeArray(cards)
                .map(card => this.normalizeString(card?.id))
                .filter(Boolean)
        );

        const missingInMaster = [];
        loadedCardIds.forEach(id => {
            const exists = masterCards.some(entry => this.normalizeString(entry?.id) === id);
            if (!exists) {
                missingInMaster.push(id);
            }
        });

        const result = {
            ok: missingInMaster.length === 0,
            errors: [],
            warnings: missingInMaster.map(id => `Geladene Karte fehlt im Master-Index: ${id}`),
            info: []
        };

        if (masterCards.length === 0) {
            result.warnings.push('Master-Index ist leer oder fehlt.');
        }

        if (missingInMaster.length === 0 && masterCards.length > 0) {
            result.info.push('Alle geladenen Karten sind im Master-Index verankert.');
        }

        return {
            result,
            meta: {
                'Master-Karten': masterCards.length,
                'Geladene Karten': loadedCardIds.size,
                'Fehlend im Master': missingInMaster.length
            }
        };
    },

    buildSetupSection(adventure, cards) {
        const setupRefs = this.classifySetupReferences(adventure, cards);

        return {
            result: {
                ok: setupRefs.missing.length === 0,
                errors: [],
                warnings: setupRefs.missing.map(entry => `Nicht im geladenen Kartenpool gefunden: ${entry}`),
                info: [
                    ...(setupRefs.placeholders.length
                        ? setupRefs.placeholders.map(entry => `Platzhalter/variable Referenz erkannt: ${entry}`)
                        : ['Keine Platzhalter-Referenzen erkannt.']),
                    ...(setupRefs.missing.length === 0
                        ? ['Keine echten fehlenden Setup-Karten erkannt.']
                        : [])
                ]
            },
            meta: {
                'Gelöste Referenzen': setupRefs.resolved.length,
                Platzhalter: setupRefs.placeholders.length,
                'Fehlende Referenzen': setupRefs.missing.length
            }
        };
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        const report = this.createEmptyReport();
        const safeContext = this.normalizeObject(context);

        window.Events?.emit?.(window.Constants?.events?.validationStarted || 'validation:started', {
            adventure,
            cards,
            masterIndex,
            context: safeContext
        });

        const adventureSection = this.buildAdventureSection(adventure);
        this.addSection(report, 'Abenteuerdatei', adventureSection, {
            meta: {
                ID: this.normalizeString(adventure?.id) || '—',
                Set: this.normalizeString(adventure?.set?.id || safeContext?.setKey) || '—'
            }
        });

        const cardsSection = this.buildCardsSection(cards);
        this.addSection(report, 'Kartenpool', cardsSection.result, {
            meta: cardsSection.meta
        });

        const masterSection = this.buildMasterIndexSection(masterIndex, cards);
        this.addSection(report, 'Master-Index', masterSection.result, {
            meta: masterSection.meta
        });

        const setupSection = this.buildSetupSection(adventure, cards);
        this.addSection(report, 'Setup-Referenzen', setupSection.result, {
            meta: setupSection.meta
        });

        report.detailsOpen = false;
        this.recalculateSummary(report);

        const payload = {
            report,
            adventure,
            cards,
            masterIndex,
            context: safeContext
        };

        window.Events?.emit?.(window.Constants?.events?.validationFinished || 'validation:finished', payload);
        return report;
    }
};

```

---

## 📄 Datei: js/diagnostics.js
```js
window.Diagnostics = {
    state: {
        visible: false,
        detailsOpen: false,
        summary: {
            errorCount: 0,
            warningCount: 0,
            infoCount: 0
        },
        sections: []
    },

    isBound: false,

    createEmptyState() {
        return {
            visible: false,
            detailsOpen: false,
            summary: {
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            },
            sections: []
        };
    },

    render() {
        window.DiagnosticsRenderer?.render?.(this.state);
    },

    setState(nextState) {
        const safeState = nextState && typeof nextState === 'object'
            ? nextState
            : this.createEmptyState();

        this.state = {
            ...this.createEmptyState(),
            ...safeState,
            summary: {
                ...this.createEmptyState().summary,
                ...(safeState.summary && typeof safeState.summary === 'object' ? safeState.summary : {})
            },
            sections: Array.isArray(safeState.sections) ? safeState.sections : []
        };

        this.render();
    },

    clear() {
        this.setState(this.createEmptyState());
    },

    recalculateSummary() {
        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        this.state.sections.forEach(section => {
            errorCount += Array.isArray(section.errors) ? section.errors.length : 0;
            warningCount += Array.isArray(section.warnings) ? section.warnings.length : 0;
            infoCount += Array.isArray(section.info) ? section.info.length : 0;
        });

        this.state.summary = {
            errorCount,
            warningCount,
            infoCount
        };

        this.state.visible = errorCount > 0 || warningCount > 0 || infoCount > 0;
    },

    addSection(title, result, options = {}) {
        const safeResult = result && typeof result === 'object'
            ? result
            : { ok: true, errors: [], warnings: [], info: [] };

        this.state.sections.push({
            title: String(title ?? 'Diagnose'),
            ok: Boolean(safeResult.ok),
            errors: Array.isArray(safeResult.errors) ? safeResult.errors : [],
            warnings: Array.isArray(safeResult.warnings) ? safeResult.warnings : [],
            info: Array.isArray(safeResult.info) ? safeResult.info : [],
            meta: options.meta && typeof options.meta === 'object' ? options.meta : {}
        });

        this.recalculateSummary();
        this.render();
    },

    addMessage(type, title, message) {
        this.addSection(title, {
            ok: type !== 'error',
            errors: type === 'error' ? [message] : [],
            warnings: type === 'warning' ? [message] : [],
            info: type === 'info' ? [message] : []
        });
    },

    applyValidationReport(payload = {}) {
        const report = payload?.report && typeof payload.report === 'object'
            ? payload.report
            : this.createEmptyState();

        this.setState({
            ...this.createEmptyState(),
            ...report,
            detailsOpen: false
        });
    },

    requestAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        window.Events?.emit?.(
            window.Constants?.events?.diagnosticsRequested || 'diagnostics:requested',
            { adventure, cards, masterIndex, context }
        );
    },

    runAdventureDiagnostics(adventure, cards, masterIndex, context = {}) {
        this.requestAdventureDiagnostics(adventure, cards, masterIndex, context);
    },

    toggleDetails() {
        this.state.detailsOpen = !this.state.detailsOpen;
        this.render();
    },

    bindEvents() {
        if (this.isBound) {
            return;
        }

        window.Events?.on?.(
            window.Constants?.events?.diagnosticsRequested || 'diagnostics:requested',
            payload => {
                window.DiagnosticsRunner?.runAdventureDiagnostics?.(
                    payload?.adventure,
                    payload?.cards,
                    payload?.masterIndex,
                    payload?.context || {}
                );
            }
        );

        window.Events?.on?.(
            window.Constants?.events?.validationFinished || 'validation:finished',
            payload => {
                this.applyValidationReport(payload);
            }
        );

        this.isBound = true;
    },

    init() {
        this.bindEvents();
        this.render();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.Diagnostics?.init) {
        window.Diagnostics.init();
    }
});

```

---

## 📄 Datei: js/events.js
```js
window.Events = {
    handlers: new Map(),

    on(eventName, handler) {
        const name = String(eventName ?? '').trim();
        if (!name || typeof handler !== 'function') {
            return () => {};
        }

        if (!this.handlers.has(name)) {
            this.handlers.set(name, new Set());
        }

        const set = this.handlers.get(name);
        set.add(handler);

        return () => this.off(name, handler);
    },

    off(eventName, handler) {
        const name = String(eventName ?? '').trim();
        const set = this.handlers.get(name);

        if (!set) return;

        set.delete(handler);

        if (set.size === 0) {
            this.handlers.delete(name);
        }
    },

    once(eventName, handler) {
        if (typeof handler !== 'function') {
            return () => {};
        }

        const unsubscribe = this.on(eventName, payload => {
            unsubscribe();
            handler(payload);
        });

        return unsubscribe;
    },

    emit(eventName, payload = {}) {
        const name = String(eventName ?? '').trim();
        const set = this.handlers.get(name);

        if (!set || set.size === 0) {
            return;
        }

        [...set].forEach(handler => {
            try {
                handler(payload);
            } catch (error) {
                console.error(`Fehler im Event-Handler für "${name}":`, error);
            }
        });
    }
};

```

---

## 📄 Datei: js/main.js
```js
import CONFIG from './core/config.js';
import Constants from './core/constants.js';
import Events from './core/events.js';
import Assets from './core/assets.js';
import Utils from './core/utils.js';
import State from './core/state.js';
import Theme from './core/theme.js';
import Validator from './core/validator.js';
import ApiNormalizers from './core/api-normalizers.js';
import ApiFetch from './core/api-fetch.js';
import ApiCardLookup from './core/api-card-lookup.js';

window.__AVENTURIA_SKIP_AUTO_INIT__ = true;

/**
 * Übergangs-Bridge:
 * Die bestehenden klassischen Dateien arbeiten noch mit window.*.
 * Deshalb hängen wir die echten ES-Module vorübergehend dort an.
 */
window.CONFIG = CONFIG;
window.Constants = Constants;
window.Events = Events;
window.Assets = Assets;
window.Utils = Utils;
window.State = State;
window.Theme = Theme;
window.Validator = Validator;
window.ApiNormalizers = ApiNormalizers;
window.ApiFetch = ApiFetch;
window.ApiCardLookup = ApiCardLookup;

const SCRIPT_LOAD_ORDER = [
    'js/api-cache.js',

    'js/ui-preview.js',
    'js/ui-modals.js',
    'js/ui-status.js',
    'js/ui-actions.js',
    'js/ui.js',

    'js/render-common.js',
    'js/render-setup.js',
    'js/render-card-detail.js',

    'js/narrative.js',
    'js/combat.js',
    'js/storage.js',

    'js/archive-loader.js',
    'js/archive-filter.js',
    'js/archive-renderer.js',
    'js/archive.js',

    'js/rulebook-index-loader.js',
    'js/rulebook-reader.js',
    'js/rulebook-codex.js',
    'js/rulebook-ui.js',
    'js/rulebook.js',

    'js/diagnostics-renderer.js',
    'js/diagnostics-runner.js',
    'js/diagnostics.js',

    'js/app-state-sync.js',
    'js/app-adventure-flow.js',
    'js/app-controls.js',
    'js/app-persistence.js',
    'js/app-bootstrap.js',
    'js/app.js'
];

const loadedScripts = new Set();

function setStatus(message) {
    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = String(message ?? '');
    }
}

function loadClassicScript(src) {
    return new Promise((resolve, reject) => {
        if (loadedScripts.has(src)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;

        script.onload = () => {
            loadedScripts.add(src);
            resolve();
        };

        script.onerror = () => {
            reject(new Error(`Script konnte nicht geladen werden: ${src}`));
        };

        document.head.appendChild(script);
    });
}

async function ensureDomReady() {
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
    }
}

async function boot() {
    try {
        setStatus('Starte Aventuria ...');

        for (const src of SCRIPT_LOAD_ORDER) {
            setStatus(`Lade ${src} ...`);
            await loadClassicScript(src);
        }

        await ensureDomReady();

        Theme.init();

        if (!window.App?.init) {
            throw new Error('window.App.init wurde nicht gefunden.');
        }

        setStatus('Initialisiere Anwendung ...');
        await window.App.init();

        setStatus('Bereit.');
        console.log('Aventuria über js/main.js gestartet.');
    } catch (error) {
        console.error('Bootstrap-Fehler in js/main.js:', error);
        setStatus('⚠️ Start fehlgeschlagen. Details siehe Konsole.');
    }
}

void boot();

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

## 📄 Datei: js/render-card-detail.js
```js
window.RenderCardDetail = {
    normalizeCardDetail(card) {
        const normalized = window.RenderCommon.normalizeCard(card);

        return {
            ...normalized,
            card_category: Utils.normalizeString(card?.card_category),
            subtypes: window.RenderCommon.normalizeArray(card?.subtypes),
            source: card?.source ?? {},
            rules: {
                passive: Utils.normalizeString(card?.rules?.passive),
                success: Utils.normalizeString(card?.rules?.success),
                fail: Utils.normalizeString(card?.rules?.fail),
                draw_effect: Utils.normalizeString(card?.rules?.draw_effect),
                flavor: Utils.normalizeString(card?.rules?.flavor),
                timed_effects: window.RenderCommon.normalizeArray(card?.rules?.timed_effects),
                milestones: window.RenderCommon.normalizeArray(card?.rules?.milestones),
                action_table: window.RenderCommon.normalizeArray(card?.rules?.action_table)
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
        const filtered = window.RenderCommon.normalizeArray(values).filter(Boolean);
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

        if (safeCard.hasRealImage) {
            html += `
                <div class="img-wrapper">
                    <img
                        id="card-detail-image"
                        alt="${Utils.escapeHtml(safeCard.name)}"
                        class="manual-page-img"
                        loading="lazy"
                    >
                </div>
            `;
        }

        html += `<p><strong>ID:</strong> ${Utils.escapeHtml(safeCard.id || '—')}</p>`;
        html += `<p><strong>Typ:</strong> ${Utils.escapeHtml(window.RenderCommon.getCardTypeLabel(safeCard))}</p>`;

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

        const detailImage = Utils.byId('card-detail-image');
        if (detailImage) {
            Utils.setSafeImageSource(detailImage, window.RenderCommon.getCardImage(card));
        }

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

## 📄 Datei: js/render-common.js
```js
window.RenderCommon = {
    normalizeArray(value) {
        return Utils.normalizeArray(value);
    },

    normalizeCard(card) {
        const fallbackImage = Utils.resolveImagePath(
            card?.images?.front,
            card?.image
        );

        return {
            id: Utils.normalizeString(card?.id),
            name: Utils.normalizeString(card?.name || 'Unbenannte Karte'),
            type: Utils.normalizeString(card?.type),
            status: Utils.normalizeString(card?.status),
            image: fallbackImage,
            hasRealImage: Utils.hasRealImage(card?.images?.front, card?.image),
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
        return normalized.image || Utils.getImageFallbackPath();
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

    createPlaceholderEntry(entry) {
        const entryId = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.id);

        const entryLabel = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.label || entry?.id || 'Variable Karte');

        return {
            id: entryId,
            name: entryLabel || entryId || 'Variable Karte',
            type: '',
            status: 'placeholder',
            image: Utils.getImageFallbackPath(),
            note: 'Diese Referenz ist ein Platzhalter oder eine variable Setup-Vorgabe und keine feste Karten-Detaildatei.'
        };
    },

    createMissingEntry(entry) {
        const entryId = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.id);

        const entryLabel = typeof entry === 'string'
            ? Utils.normalizeString(entry)
            : Utils.normalizeString(entry?.label || entry?.id || 'Fehlende Karte');

        return {
            id: entryId,
            name: entryLabel || entryId || 'Fehlende Karte',
            type: '',
            status: 'missing',
            image: Utils.getImageFallbackPath(),
            note: 'Karte konnte im geladenen Kartenpool nicht gefunden werden.'
        };
    },

    resolveCardEntry(entry, allCards) {
        if (!entry) return null;

        if (typeof entry === 'string') {
            const found = this.findCardById(allCards, entry);
            if (found) return found;

            if (window.Validator?.isPlaceholderCardRef?.(entry)) {
                return this.createPlaceholderEntry(entry);
            }

            return this.createMissingEntry(entry);
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

            if (window.Validator?.isPlaceholderCardRef?.(entryId)) {
                return this.createPlaceholderEntry(entry);
            }
        }

        if (entryId || entry?.label) {
            return this.createMissingEntry(entry);
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
        const hasPreview = normalized.hasRealImage;
        const isMissing = normalized.status === 'missing';
        const isPlaceholder = normalized.status === 'placeholder';

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
                ${normalized.id && !isPlaceholder ? '' : 'disabled'}
            >i</button>
        `;

        const suffix = isMissing
            ? ' ⚠️'
            : isPlaceholder
                ? ' 🛈'
                : '';

        return `
            <li class="checklist-item" data-card-id="${cardId}">
                <input type="checkbox">
                <span${previewAttr}>${safeLabel}${suffix}</span>
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
    }
};

```

---

## 📄 Datei: js/render-setup.js
```js
window.RenderSetup = {
    renderListInto(containerSelector, cards) {
        const list = Utils.qs(containerSelector);
        if (!list) return;

        list.innerHTML = window.RenderCommon.normalizeArray(cards)
            .map(card => window.RenderCommon.buildChecklistItem(card))
            .join('');

        window.RenderCommon.bindCardPreviews(list);
    },

    renderSpecialSection(cards) {
        const specialSection = Utils.byId('special');
        if (!specialSection) return;

        const ul = specialSection.querySelector('ul');
        if (!ul) return;

        ul.innerHTML = window.RenderCommon.normalizeArray(cards)
            .map(card => window.RenderCommon.buildChecklistItem(card))
            .join('');

        specialSection.classList.toggle('hidden', cards.length === 0);
        window.RenderCommon.bindCardPreviews(ul);
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

        const blueCards = window.RenderCommon.normalizeSetupEntries(setup.blue_cards, allCards);
        const minionCards = window.RenderCommon.normalizeSetupEntries(setup.minion_cards, allCards);
        const specialCards = window.RenderCommon.normalizeSetupEntries(setup.special_cards, allCards);

        this.renderTitle(adventure);
        this.renderDanger(adventure);
        this.renderListInto('#blue-cards ul', blueCards);
        this.renderListInto('#minions ul', minionCards);
        this.renderSpecialSection(specialCards);

        setupDisplay.classList.remove('hidden');
    }
};

```

---

## 📄 Datei: js/rulebook-codex.js
```js
window.RulebookCodex = {
    htmlToPlainText(html) {
        const temp = document.createElement('div');
        temp.innerHTML = String(html ?? '');
        return String(temp.textContent ?? temp.innerText ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    getExcerpt(text, maxLength = 220) {
        const normalized = String(text ?? '').trim();
        if (normalized.length <= maxLength) {
            return normalized;
        }

        return `${normalized.slice(0, maxLength).trim()} …`;
    },

    async buildRulesData(setKey = '') {
        const indexData = window.Rulebook?.manualIndex
            || await window.RulebookIndexLoader?.load?.(setKey);
        const pages = window.Utils.normalizeArray(indexData?.pages);
        const rules = [];

        for (const entry of pages) {
            try {
                const response = await fetch(entry.path);
                if (!response.ok) {
                    continue;
                }

                const data = await response.json();
                const title = window.Rulebook?.stripCitationMarkers?.(data?.title ?? entry.title ?? `Seite ${entry.page}`)
                    || `Seite ${entry.page}`;
                const text = this.htmlToPlainText(
                    window.Rulebook?.stripCitationMarkers?.(data?.content ?? '') ?? ''
                );

                rules.push({
                    page: entry.page,
                    title,
                    text
                });
            } catch (error) {
                console.warn(`Kodex-Seite ${entry.page} konnte nicht geladen werden.`, error);
            }
        }

        window.Rulebook.rulesData = rules;
    },

    bindPageJumpActions(scope) {
        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.bound === 'true') {
                return;
            }

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) {
                    window.RulebookReader?.jumpToPage?.(page);
                }
            });

            button.dataset.bound = 'true';
        });
    },

    filterRules(term = '') {
        const results = window.RulebookUI?.getCodexResults?.();
        if (!results) {
            return;
        }

        const normalizedTerm = String(term ?? '').trim().toLowerCase();

        if (!normalizedTerm) {
            results.innerHTML = '';
            return;
        }

        const filtered = window.Utils.normalizeArray(window.Rulebook?.rulesData).filter(rule => {
            const page = String(rule?.page ?? '');
            const title = String(rule?.title ?? '').toLowerCase();
            const text = String(rule?.text ?? '').toLowerCase();

            return title.includes(normalizedTerm)
                || text.includes(normalizedTerm)
                || page.includes(normalizedTerm);
        });

        results.innerHTML = filtered.length
            ? filtered.map(rule => `
                <div class="rule-entry">
                    <h4>${window.Utils.escapeHtml(rule.title)}</h4>
                    <p><strong>Seite:</strong> ${window.Utils.escapeHtml(rule.page)}</p>
                    <p>${window.Utils.escapeHtml(this.getExcerpt(rule.text))}</p>
                    <button type="button" class="btn-outline" data-rulebook-page="${window.Utils.escapeHtml(rule.page)}">
                        Zur Seite
                    </button>
                </div>
            `).join('')
            : '<p>Kein Treffer im Kodex.</p>';

        this.bindPageJumpActions(results);
    }
};

```

---

## 📄 Datei: js/rulebook-index-loader.js
```js
window.RulebookIndexLoader = {
    cacheBySet: {},

    normalizePageEntry(entry, setKey = '') {
        const page = Number(entry?.page ?? entry?.p);
        if (!Number.isFinite(page) || page <= 0) {
            return null;
        }

        const normalizedSetKey = window.CONFIG?.normalizeSetKey?.(setKey) || setKey || 'base_game';
        const fallbackPath = window.CONFIG?.getManualPagePath?.(page, normalizedSetKey)
            || `data/manual/${normalizedSetKey}/page_${String(page).padStart(2, '0')}.json`;

        return {
            page,
            title: String(entry?.title ?? `Seite ${page}`).trim() || `Seite ${page}`,
            path: String(entry?.path ?? fallbackPath).trim() || fallbackPath
        };
    },

    normalizeIndex(rawData, setKey = '') {
        const normalizedSetKey = window.CONFIG?.normalizeSetKey?.(setKey) || setKey || 'base_game';
        const setConfig = window.CONFIG?.getSet?.(normalizedSetKey) || {};

        const pages = window.Utils.normalizeArray(rawData?.pages)
            .map(entry => this.normalizePageEntry(entry, normalizedSetKey))
            .filter(Boolean)
            .sort((a, b) => a.page - b.page);

        return {
            set: {
                id: String(rawData?.set?.id ?? setConfig.id ?? normalizedSetKey).trim() || normalizedSetKey,
                name: String(rawData?.set?.name ?? setConfig.name ?? normalizedSetKey).trim() || normalizedSetKey,
                shortName: String(rawData?.set?.shortName ?? setConfig.shortName ?? setConfig.name ?? normalizedSetKey).trim() || normalizedSetKey
            },
            pages
        };
    },

    async load(setKey = '') {
        const normalizedSetKey = window.CONFIG?.normalizeSetKey?.(setKey) || setKey || 'base_game';

        if (this.cacheBySet[normalizedSetKey]) {
            return this.cacheBySet[normalizedSetKey];
        }

        const path = window.CONFIG?.getManualIndexPath?.(normalizedSetKey)
            || `data/manual/${normalizedSetKey}/index.json`;

        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Manual-Index konnte nicht geladen werden (${response.status}): ${path}`);
        }

        const rawData = await response.json();
        const normalized = this.normalizeIndex(rawData, normalizedSetKey);

        this.cacheBySet[normalizedSetKey] = normalized;
        return normalized;
    },

    getPages(indexData) {
        return window.Utils.normalizeArray(indexData?.pages);
    },

    getPageEntry(indexData, pageNumber) {
        const page = Number(pageNumber);
        return this.getPages(indexData).find(entry => entry.page === page) || null;
    }
};

```

---

## 📄 Datei: js/rulebook-reader.js
```js
window.RulebookReader = {
    getPageEntries() {
        return window.Utils.normalizeArray(window.Rulebook?.manualIndex?.pages);
    },

    getPageEntry(pageNumber) {
        const page = Number(pageNumber);
        return this.getPageEntries().find(entry => entry.page === page) || null;
    },

    getFirstPage() {
        return this.getPageEntries()[0]?.page ?? null;
    },

    getNextPage(currentPage) {
        const current = Number(currentPage);
        const entries = this.getPageEntries();

        return entries.find(entry => entry.page > current)?.page
            ?? entries[entries.length - 1]?.page
            ?? null;
    },

    getPrevPage(currentPage) {
        const current = Number(currentPage);
        const entries = [...this.getPageEntries()].reverse();

        return entries.find(entry => entry.page < current)?.page
            ?? entries[entries.length - 1]?.page
            ?? null;
    },

    buildIndicatorText(pageNumber) {
        const entries = this.getPageEntries();
        const position = entries.findIndex(entry => entry.page === Number(pageNumber));
        const total = entries.length;

        if (total === 0) {
            return 'Seite 0 / 0';
        }

        if (position === -1) {
            return `Seite ${pageNumber}`;
        }

        return `Seite ${pageNumber} · ${position + 1} / ${total}`;
    },

    async loadPage(pageNumber) {
        const container = window.RulebookUI?.getManualContent?.();
        const indicator = window.RulebookUI?.getPageIndicator?.();
        const titleEl = window.RulebookUI?.getManualTitle?.();

        if (!container) {
            return;
        }

        const entry = this.getPageEntry(pageNumber);
        if (!entry) {
            container.innerHTML = '<div class="reader-text">Diese Seite ist aktuell nicht verfügbar.</div>';
            if (indicator) {
                indicator.textContent = 'Seite nicht verfügbar';
            }
            return;
        }

        container.innerHTML = '<div class="reader-text">Seite wird geladen ...</div>';

        try {
            const response = await fetch(entry.path);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} beim Laden von ${entry.path}`);
            }

            const data = await response.json();
            const rawTitle = window.Rulebook?.stripCitationMarkers?.(data?.title ?? `Seite ${entry.page}`)
                || `Seite ${entry.page}`;
            const contentHtml = String(window.Rulebook?.stripCitationMarkers?.(data?.content ?? '') ?? '').trim()
                || '<p>Kein Inhalt vorhanden.</p>';
            const imagePath = String(data?.image ?? '').trim();
            const hasImage = window.Utils?.hasRealImage?.(imagePath);
            const resolvedImage = hasImage
                ? window.Utils.resolveImagePath(imagePath)
                : '';

            container.innerHTML = `
                <div class="reader-container">
                    <div class="reader-page">
                        ${hasImage ? `
                            <div class="img-wrapper">
                                <img
                                    id="rulebook-page-image"
                                    alt="${window.Utils.escapeHtml(rawTitle)}"
                                    class="manual-page-img"
                                    loading="lazy"
                                >
                            </div>
                        ` : ''}
                        <div class="reader-text">${contentHtml}</div>
                    </div>
                </div>
            `;

            if (hasImage) {
                const imageEl = container.querySelector('#rulebook-page-image');
                window.Utils?.setSafeImageSource?.(imageEl, resolvedImage);
            }

            if (indicator) {
                indicator.textContent = this.buildIndicatorText(entry.page);
            }

            if (titleEl) {
                titleEl.textContent = rawTitle;
            }

            window.Rulebook.currentPage = entry.page;
        } catch (error) {
            console.error('Fehler beim Laden der Regelbuch-Seite:', error);
            container.innerHTML = '<div class="reader-text">Fehler beim Laden der Seite.</div>';
        }
    },

    nextPage() {
        const nextPage = this.getNextPage(window.Rulebook?.currentPage);
        if (nextPage !== null) {
            return this.loadPage(nextPage);
        }
    },

    prevPage() {
        const prevPage = this.getPrevPage(window.Rulebook?.currentPage);
        if (prevPage !== null) {
            return this.loadPage(prevPage);
        }
    },

    jumpToPage(pageNumber) {
        const page = Number(pageNumber);
        if (!this.getPageEntry(page)) {
            console.warn(`Regelbuch-Seite ${page} ist aktuell nicht verfügbar.`);
            return;
        }

        window.Rulebook?.showTab?.('reader');
        return this.loadPage(page);
    }
};

```

---

## 📄 Datei: js/rulebook-ui.js
```js
window.RulebookUI = {
    getModal() {
        return window.Utils.byId('rulebook-modal');
    },

    getReaderTab() {
        return window.Utils.byId('reader-tab');
    },

    getCodexTab() {
        return window.Utils.byId('codex-tab');
    },

    getManualContent() {
        return window.Utils.byId('manual-content');
    },

    getPageIndicator() {
        return window.Utils.byId('manual-page-indicator');
    },

    getManualPageList() {
        return window.Utils.byId('manual-page-list');
    },

    getCodexResults() {
        return window.Utils.byId('codex-results');
    },

    getCodexSearch() {
        return window.Utils.byId('codex-search');
    },

    getManualSetLabel() {
        return window.Utils.byId('manual-set-label');
    },

    getManualTitle() {
        return window.Utils.byId('manual-title');
    },

    updateSetLabel(setKey = '') {
        const label = this.getManualSetLabel();
        if (!label) {
            return;
        }

        label.textContent = window.CONFIG?.getSetDisplayName?.(setKey) || 'Regelbuch';
    },

    renderPageList(indexData) {
        const list = this.getManualPageList();
        if (!list) {
            return;
        }

        list.innerHTML = '';

        const pages = window.Utils.normalizeArray(indexData?.pages);
        const fragment = document.createDocumentFragment();

        pages.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `S. ${entry.page} – ${entry.title}`;
            li.addEventListener('click', () => {
                window.RulebookReader?.jumpToPage?.(entry.page);
            });
            fragment.appendChild(li);
        });

        list.appendChild(fragment);
    },

    clearCodexResults() {
        const results = this.getCodexResults();
        if (results) {
            results.innerHTML = '';
        }
    },

    resetCodexSearch() {
        const search = this.getCodexSearch();
        if (search) {
            search.value = '';
        }
    },

    showModal() {
        const modal = this.getModal();
        if (modal) {
            modal.style.display = 'flex';
        }
    },

    closeModal() {
        const modal = this.getModal();
        if (modal) {
            modal.style.display = 'none';
        }
    },

    async showTab(tabName) {
        const readerTab = this.getReaderTab();
        const codexTab = this.getCodexTab();

        if (readerTab) {
            readerTab.classList.toggle('hidden', tabName !== 'reader');
        }

        if (codexTab) {
            codexTab.classList.toggle('hidden', tabName !== 'codex');
        }

        const buttons = window.Utils.qsa('#rulebook-modal .tab-btn');
        buttons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });

        if (tabName === 'codex') {
            await window.Rulebook?.ensureRulesData?.();
        }
    },

    bind() {
        const search = this.getCodexSearch();
        if (search && search.dataset.bound !== 'true') {
            search.addEventListener('input', event => {
                window.RulebookCodex?.filterRules?.(event.target.value);
            });
            search.dataset.bound = 'true';
        }

        const modal = this.getModal();
        if (modal && modal.dataset.bound !== 'true') {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.closeModal();
                }
            });
            modal.dataset.bound = 'true';
        }
    }
};

```

---

## 📄 Datei: js/rulebook.js
```js
window.Rulebook = {
    rulesData: [],
    rulesDataBuilt: false,
    isBuildingRulesData: false,
    currentPage: null,
    currentSet: '',
    manualIndex: null,

    stripCitationMarkers(text) {
        return String(text ?? '').replace(/\s*\[cite:\s*[\d\- ,]+\]/gi, '').trim();
    },

    resolveSetKey(preferredSetKey = '') {
        const normalizedPreferred = window.Utils.normalizeString(preferredSetKey);
        if (normalizedPreferred && window.CONFIG?.hasSet?.(normalizedPreferred)) {
            return normalizedPreferred;
        }

        const activeSet = window.ApiCardLookup?.getActiveSetKey?.();
        if (activeSet && window.CONFIG?.hasSet?.(activeSet)) {
            return activeSet;
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    async ensureSet(setKey = '') {
        const resolvedSetKey = this.resolveSetKey(setKey);

        if (this.currentSet === resolvedSetKey && this.manualIndex) {
            window.RulebookUI?.updateSetLabel?.(this.currentSet);
            return;
        }

        this.currentSet = resolvedSetKey;
        this.rulesData = [];
        this.rulesDataBuilt = false;
        this.isBuildingRulesData = false;
        this.manualIndex = await window.RulebookIndexLoader?.load?.(resolvedSetKey);

        window.RulebookUI?.updateSetLabel?.(this.currentSet);
        window.RulebookUI?.renderPageList?.(this.manualIndex);
        window.RulebookUI?.clearCodexResults?.();
        window.RulebookUI?.resetCodexSearch?.();

        const firstAvailablePage = window.Utils.normalizeArray(this.manualIndex?.pages)[0]?.page ?? null;
        const hasCurrentPage = window.Utils.normalizeArray(this.manualIndex?.pages)
            .some(entry => entry.page === Number(this.currentPage));

        if (!hasCurrentPage) {
            this.currentPage = firstAvailablePage;
        }

        window.Events?.emit?.(
            window.Constants?.events?.rulebookIndexLoaded || 'rulebook:indexLoaded',
            {
                source: 'rulebook',
                setKey: this.currentSet,
                pageCount: window.Utils.normalizeArray(this.manualIndex?.pages).length
            }
        );

        window.Events?.emit?.(
            window.Constants?.events?.setChanged || 'set:changed',
            {
                source: 'rulebook',
                setKey: this.currentSet
            }
        );
    },

    async ensureRulesData() {
        if (this.rulesDataBuilt || this.isBuildingRulesData) {
            return;
        }

        this.isBuildingRulesData = true;

        try {
            await window.RulebookCodex?.buildRulesData?.(this.currentSet);
            this.rulesDataBuilt = true;
        } finally {
            this.isBuildingRulesData = false;
        }
    },

    async open() {
        const modal = window.RulebookUI?.getModal?.();
        if (!modal) {
            return;
        }

        window.RulebookUI?.showModal?.();

        await this.ensureSet();
        await this.showTab('reader');

        const pageToLoad = this.currentPage ?? window.RulebookReader?.getFirstPage?.();
        if (pageToLoad !== null && pageToLoad !== undefined) {
            await window.RulebookReader?.loadPage?.(pageToLoad);
            return;
        }

        const container = window.RulebookUI?.getManualContent?.();
        if (container) {
            container.innerHTML = '<div class="reader-text">Kein Regelbuch-Index gefunden.</div>';
        }
    },

    close() {
        window.RulebookUI?.closeModal?.();
    },

    async showTab(tabName) {
        await window.RulebookUI?.showTab?.(tabName);
    },

    async loadPage(pageNumber) {
        await window.RulebookReader?.loadPage?.(pageNumber);
    },

    nextPage() {
        window.RulebookReader?.nextPage?.();
    },

    prevPage() {
        window.RulebookReader?.prevPage?.();
    },

    jumpToPage(pageNumber) {
        window.RulebookReader?.jumpToPage?.(pageNumber);
    },

    filterRules(term = '') {
        window.RulebookCodex?.filterRules?.(term);
    },

    async init() {
        window.RulebookUI?.bind?.();
        await this.ensureSet();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.Rulebook?.init?.();
    }, { once: true });
} else {
    window.Rulebook?.init?.();
}

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

## 📄 Datei: js/theme.js
```js
window.Theme = {
    currentSet: '',
    appliedVarKeys: new Set(),
    isBound: false,

    normalizeSetKey(setKey = '') {
        return window.CONFIG?.normalizeSetKey?.(setKey) || String(setKey || '').trim() || 'base_game';
    },

    getRoot() {
        return document.documentElement;
    },

    getBody() {
        return document.body;
    },

    getThemeConfig(setKey = '') {
        return window.CONFIG?.getSetTheme?.(setKey) || { cssVars: {}, meta: {} };
    },

    clearAppliedCssVars() {
        const root = this.getRoot();
        if (!root) return;

        this.appliedVarKeys.forEach(key => {
            root.style.removeProperty(key);
        });

        this.appliedVarKeys.clear();
    },

    applyCssVars(cssVars = {}) {
        const root = this.getRoot();
        if (!root) return;

        Object.entries(cssVars).forEach(([key, value]) => {
            if (!key || value === null || value === undefined || value === '') {
                return;
            }

            root.style.setProperty(key, String(value));
            this.appliedVarKeys.add(key);
        });
    },

    applyBodyClass(bodyClass = '') {
        const body = this.getBody();
        if (!body) return;

        Array.from(body.classList)
            .filter(className => className.startsWith('theme-'))
            .forEach(className => body.classList.remove(className));

        if (bodyClass) {
            body.classList.add(bodyClass);
        }
    },

    applySetTheme(setKey = '', options = {}) {
        const resolvedSetKey = this.normalizeSetKey(setKey);
        const theme = this.getThemeConfig(resolvedSetKey);
        const cssVars = theme?.cssVars || {};
        const meta = theme?.meta || {};

        this.clearAppliedCssVars();
        this.applyCssVars(cssVars);
        this.applyBodyClass(meta.bodyClass || '');

        const root = this.getRoot();
        if (root) {
            root.dataset.activeSet = resolvedSetKey;
            root.dataset.activeTheme = String(meta.themeName || resolvedSetKey);
        }

        this.currentSet = resolvedSetKey;

        if (!options.silent) {
            console.log(`Theme aktiv: ${resolvedSetKey}`);
        }
    },

    resolveInitialSet() {
        const activeAdventureSet = window.ApiCardLookup?.getActiveSetKey?.();
        if (activeAdventureSet && window.CONFIG?.hasSet?.(activeAdventureSet)) {
            return activeAdventureSet;
        }

        const archiveSet = window.Archive?.currentSet;
        if (archiveSet && window.CONFIG?.hasSet?.(archiveSet)) {
            return archiveSet;
        }

        return window.CONFIG?.defaultSet || 'base_game';
    },

    bindEvents() {
        if (this.isBound) {
            return;
        }

        const archiveEvent = window.Constants?.events?.archiveSetChanged || 'archive:setChanged';
        const rulebookEvent = window.Constants?.events?.rulebookIndexLoaded || 'rulebook:indexLoaded';
        const setChangedEvent = window.Constants?.events?.setChanged || 'set:changed';

        window.Events?.on?.(archiveEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        window.Events?.on?.(rulebookEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        window.Events?.on?.(setChangedEvent, payload => {
            const setKey = payload?.setKey;
            if (setKey) {
                this.applySetTheme(setKey);
            }
        });

        this.isBound = true;
    },

    init() {
        this.bindEvents();
        this.applySetTheme(this.resolveInitialSet(), { silent: true });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.Theme?.init?.();
});

```

---

## 📄 Datei: js/ui-actions.js
```js
window.UIActions = {
    getSectionStateKey(sectionId) {
        const map = window.Constants?.ui?.sectionStateMap ?? {};
        return map[sectionId] || null;
    },

    toggleSection(sectionId) {
        const section = Utils.byId(sectionId);
        if (!section) return;

        const isOpen = !section.classList.contains('show');
        section.classList.toggle('show', isOpen);

        const sectionKey = this.getSectionStateKey(sectionId);
        if (sectionKey) {
            window.State.setSectionOpen(sectionKey, isOpen);
        }

        if (window.StorageManager?.persist) {
            window.StorageManager.persist();
        }
    },

    handleActionTrigger(trigger) {
        const action = String(trigger?.dataset?.action ?? '').trim();
        if (!action) return;

        switch (action) {
            case 'open-archive':
                window.Archive?.open?.();
                break;

            case 'close-archive':
                window.Archive?.close?.();
                break;

            case 'open-rulebook':
                window.Rulebook?.open?.();
                break;

            case 'close-rulebook':
                window.Rulebook?.close?.();
                break;

            case 'toggle-section':
                this.toggleSection(trigger.dataset.target);
                break;

            case 'combat-prev-phase':
                window.Combat?.prevPhase?.();
                break;

            case 'combat-next-phase':
                window.Combat?.nextPhase?.();
                break;

            case 'combat-roll-target':
                window.Combat?.rollTarget?.();
                break;

            case 'combat-update-ep':
                window.Combat?.updateEpResult?.();
                break;

            case 'combat-apply-intermission':
                window.Combat?.applyIntermission?.();
                break;

            case 'rulebook-tab':
                window.Rulebook?.showTab?.(trigger.dataset.tab);
                break;

            case 'rulebook-prev-page':
                window.Rulebook?.prevPage?.();
                break;

            case 'rulebook-next-page':
                window.Rulebook?.nextPage?.();
                break;

            case 'archive-load-set':
                window.Archive?.loadSet?.(trigger.dataset.set);
                break;

            case 'open-card-detail':
                if (trigger.dataset.cardId) {
                    window.ApiCardLookup?.openCardDetailById?.(trigger.dataset.cardId);
                }
                break;

            case 'close-card-detail':
                window.RenderCardDetail?.closeCardDetail?.();
                break;

            case 'toggle-diagnostics-details':
                window.Diagnostics?.toggleDetails?.();
                break;

            case 'clear-diagnostics':
                window.Diagnostics?.clear?.();
                break;

            default:
                break;
        }
    },

    bindGlobalUiEvents() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                window.UIModals?.closeAll?.();
            }
        });

        document.addEventListener('click', event => {
            const trigger = event.target.closest('[data-action]');
            if (!trigger) return;

            this.handleActionTrigger(trigger);
        });
    },

    init() {
        this.bindGlobalUiEvents();
    }
};

```

---

## 📄 Datei: js/ui-modals.js
```js
window.UIModals = {
    closeAll() {
        Utils.qsa('.modal-backdrop').forEach(modal => {
            modal.style.display = 'none';
        });

        if (window.UIPreview) {
            window.UIPreview.close();
        }

        if (window.RenderCardDetail?.closeCardDetail) {
            window.RenderCardDetail.closeCardDetail();
        }
    }
};

```

---

## 📄 Datei: js/ui-preview.js
```js
window.UIPreview = {
    offsetX: 18,
    offsetY: 18,

    getElements() {
        return {
            tooltip: Utils.byId('card-tooltip'),
            image: Utils.byId('tooltip-image')
        };
    },

    show(event, imageSrc) {
        const { tooltip, image } = this.getElements();
        if (!tooltip || !image) return;

        const resolvedImage = Utils.resolveImagePath(imageSrc);
        Utils.setSafeImageSource(image, resolvedImage);
        image.alt = 'Kartenvorschau';
        tooltip.style.display = 'block';

        this.move(event);
    },

    move(event) {
        const { tooltip } = this.getElements();
        if (!tooltip || tooltip.style.display !== 'block' || !event) return;

        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        const rect = tooltip.getBoundingClientRect();
        let left = event.clientX + this.offsetX;
        let top = event.clientY + this.offsetY;

        if (left + rect.width > viewportWidth - 12) {
            left = Math.max(12, event.clientX - rect.width - this.offsetX);
        }

        if (top + rect.height > viewportHeight - 12) {
            top = Math.max(12, event.clientY - rect.height - this.offsetY);
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    },

    close() {
        const { tooltip, image } = this.getElements();
        if (!tooltip || !image) return;

        tooltip.style.display = 'none';
        tooltip.style.left = '-9999px';
        tooltip.style.top = '-9999px';
        image.removeAttribute('src');
        image.dataset.fallbackApplied = 'false';
    },

    open(imageSrc) {
        const resolvedImage = Utils.resolveImagePath(imageSrc);
        if (!resolvedImage) return;

        if (window.RenderCardDetail?.ensureCardDetailModal) {
            const modal = window.RenderCardDetail.ensureCardDetailModal();
            const content = Utils.byId('card-detail-content');

            if (modal && content) {
                content.innerHTML = `
                    <div class="reader-text">
                        <div class="img-wrapper">
                            <img
                                id="preview-modal-image"
                                alt="Kartenvorschau"
                                class="manual-page-img"
                                loading="lazy"
                            >
                        </div>
                    </div>
                `;

                const previewImage = Utils.byId('preview-modal-image');
                Utils.setSafeImageSource(previewImage, resolvedImage);

                modal.style.display = 'flex';
                return;
            }
        }

        window.open(resolvedImage, '_blank', 'noopener,noreferrer');
    }
};

```

---

## 📄 Datei: js/ui-renderer.js
```js
window.Renderer = {
    // --- FASSADE: Alle Aufrufe werden an die zuständigen Module weitergereicht ---

    renderSetup(adventure, allCards) {
        window.RenderSetup?.renderSetup(adventure, allCards);
    },

    openCardDetail(card) {
        window.RenderCardDetail?.openCardDetail(card);
    },

    closeCardDetail() {
        window.RenderCardDetail?.closeCardDetail();
    },

    ensureCardDetailModal() {
        return window.RenderCardDetail?.ensureCardDetailModal();
    }
};

```

---

## 📄 Datei: js/ui-status.js
```js
window.UIStatus = {
    getElement() {
        return Utils.byId('loading-status');
    },

    set(message) {
        const status = this.getElement();
        if (status) {
            status.innerText = String(message ?? window.Constants?.ui?.defaultStatusText ?? 'Bereit.');
        }
    },

    reset() {
        this.set(window.Constants?.ui?.defaultStatusText ?? 'Bereit.');
    }
};

```

---

## 📄 Datei: js/ui.js
```js
window.UI = {
    showPreview(event, imageSrc) {
        window.UIPreview?.show(event, imageSrc);
    },

    movePreview(event) {
        window.UIPreview?.move(event);
    },

    closePreview() {
        window.UIPreview?.close();
    },

    openPreview(imageSrc) {
        window.UIPreview?.open(imageSrc);
    },

    closeAllModals() {
        window.UIModals?.closeAll();
    },

    setStatus(message) {
        window.UIStatus?.set?.(message);
    },

    resetStatus() {
        window.UIStatus?.reset?.();
    },

    getSectionStateKey(sectionId) {
        return window.UIActions?.getSectionStateKey?.(sectionId) || null;
    },

    toggleSection(sectionId) {
        window.UIActions?.toggleSection?.(sectionId);
    },

    handleActionTrigger(trigger) {
        window.UIActions?.handleActionTrigger?.(trigger);
    },

    bindGlobalUiEvents() {
        window.UIActions?.bindGlobalUiEvents?.();
    },

    init() {
        window.UIActions?.init?.();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.UI?.init) {
        window.UI.init();
    }
});

```

---

## 📄 Datei: js/utils.js
```js
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

```

---

## 📄 Datei: js/validator.js
```js
window.Validator = {
    get allowedAdventureStatuses() {
        return window.Constants?.statuses?.adventures ?? [
            'canonical',
            'deprecated_alias',
            'migrated',
            'raw',
            'basic',
            'playable',
            'verified'
        ];
    },

    get allowedCardStatuses() {
        return window.Constants?.statuses?.cards ?? [
            'raw',
            'basic',
            'playable',
            'playable_placeholder',
            'verified',
            'migrated',
            'canonical',
            'deprecated_alias',
            'complete'
        ];
    },

    get placeholderPatterns() {
        return window.Constants?.placeholders?.cardRefPatterns ?? [
            /^minions?_eurer_wahl$/i,
            /^schergen?_eurer_wahl$/i,
            /^special_/i,
            /^story_/i
        ];
    },

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

    isPlaceholderCardRef(refId = '') {
        const normalized = this.normalizeString(refId);
        if (!normalized) return false;

        return this.placeholderPatterns.some(pattern => pattern.test(normalized));
    },

    getSetupEntryId(entry) {
        if (typeof entry === 'string') {
            return this.normalizeString(entry);
        }

        if (this.isObject(entry)) {
            return this.normalizeString(entry.id);
        }

        return '';
    },

    getSetupEntryLabel(entry) {
        if (typeof entry === 'string') {
            return this.normalizeString(entry);
        }

        if (this.isObject(entry)) {
            return this.normalizeString(entry.label || entry.id);
        }

        return '';
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

        if (!id) {
            this.addError(result, 'Abenteuer hat keine gültige ID.');
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

        if (!this.isObject(adventure.setup)) {
            this.addError(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen setup-Block.`);
        }

        if (!this.isObject(adventure.narrative)) {
            this.addWarning(result, `Abenteuer "${id || name || 'unbekannt'}" hat keinen gültigen narrative-Block.`);
        }

        return result;
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
            this.addError(result, 'Karte hat keine gültige ID.');
        }

        if (!name) {
            this.addWarning(result, `Karte "${id || 'unbekannt'}" hat keinen Namen.`);
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

        return result;
    }
};

```

---

