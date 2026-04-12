# 🛡️ Aventuria Projekt-Backup - 4/12/2026, 5:04:09 PM

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
}

.config-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* --- FORMULAR ELEMENTE --- */
input[type="number"], select {
    padding: 8px;
    background: #f4e7d3;
    border: 1px solid #8b4513;
    font-family: inherit;
    border-radius: 4px;
    color: #2e241f;
}

/* --- BUTTON STYLES --- */
.btn, .btn-outline {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    transition: all 0.2s;
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
    margin-bottom: 10px;
}

/* --- CHECKLISTE --- */
.checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 6px 0;
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
    pointer-events: none;
    width: 450px;
    max-width: min(450px, 90vw);
    border: 5px solid #5c1e1e;
    border-radius: 12px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.6);
    background: #000;
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
}

.archive-card {
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;
}

.archive-card:hover { 
    transform: translateY(-5px); 
}

.archive-card img {
    width: 100%;
    border: 2px solid #8b4513;
    border-radius: 5px;
    background: #fff;
}

.archive-card p {
    font-size: 0.85em;
    margin-top: 8px;
    font-weight: bold;
    color: #5c1e1e;
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
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none; 
    justify-content: center; 
    align-items: center;
    z-index: 2000;
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
}

/* Spezielle Breite für das Archiv, falls gewünscht */
.archive-modal-size {
    max-width: 1400px;
}

.close-modal {
    position: absolute; 
    top: 10px; 
    right: 20px;
    font-size: 2.5em; 
    cursor: pointer; 
    color: #5c1e1e; 
    z-index: 100;
}

/* --- LAYOUT AUFTEILUNG (Sidebar & Main) --- */
.modal-layout {
    display: flex;
    height: 100%;
    overflow: hidden;
}

.modal-sidebar {
    width: 280px;
    background: #e6dec9;
    border-right: 2px solid #8b4513;
    padding: 20px;
    overflow-y: auto;
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
    transition: background 0.2s;
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
}

.modal-nav {
    display: flex; 
    padding: 10px 20px; 
    background: #dcd0ba;
    border-bottom: 2px solid #8b4513; 
    gap: 15px;
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
}

/* --- READER & BILDANZEIGE (Für das Regelbuch) --- */
.reader-container { 
    display: flex; 
    flex-direction: column; 
    height: 100%; 
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
    padding: 15px 0; 
    margin-top: 10px; 
    border-top: 2px solid #8b4513; 
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
}

.rule-entry { 
    background: rgba(255, 255, 255, 0.4); 
    padding: 15px; 
    margin-bottom: 15px;
    border-left: 5px solid #5c1e1e; 
    border-radius: 4px;
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

.hidden { display: none; }

```

---

## 📄 Datei: data/adventures/base_game/leute_die_nicht_spielen.json
```json
{
  "id": "leute_die_nicht_spielen",
  "name": "Leute, die nicht spielen",
  "danger_calc": 4,
  "narrative": {
    "intro": "Chorhop, 1024 BF: Die Stadt ist bei Nacht ein gefährliches Pflaster. Ihr eskortiert das 'Glücks-Idol' zum Spielhaus 'Karfunkel-Stein'. Als ihr es betretet, beginnt die Statue plötzlich Goldstücke zu weinen... [cite: 790-798]",
    "checks": [
      {
        "id": "will_check",
        "skill": "Willenskraft",
        "text": "Könnt ihr dem Bann des Glücks-Idols widerstehen? [cite: 809]",
        "results": {
          "success": "Du kannst dich dem Einfluss vollständig widersetzen. [cite: 811]",
          "fail": "Du verlierst 1W6 Lebenspunkte, bevor du den Bann brichst. [cite: 814]"
        }
      }
    ]
  },
  "setup": {
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
    "victory": "Aktion 'Das Spiel beenden' erfolgreich durchgeführt. [cite: 825]",
    "defeat": "Letzte Zeitmarke entfernt, während Kampf noch läuft. [cite: 824]"
  }
}

```

---

## 📄 Datei: data/adventures/base_game/leute_nicht_spielen.json
```json
{
  "id": "leute_nicht_spielen",
  "name": "Leute, die nicht spielen",
  "danger_calc": 4,
  "narrative": {
    "intro": "Chorhop, 1024 BF: Die Stadt ist bei Nacht ein gefährliches Pflaster. Ihr eskortiert das 'Glücks-Idol' zum Spielhaus 'Karfunkel-Stein'. Als ihr es betretet, beginnt die Statue plötzlich Goldstücke zu weinen... [cite: 790-798]",
    "checks": [
      {
        "id": "will_check",
        "skill": "Willenskraft",
        "text": "Könnt ihr dem Bann des Glücks-Idols widerstehen? [cite: 809]",
        "results": {
          "success": "Du kannst dich dem Einfluss vollständig widersetzen. [cite: 811]",
          "fail": "Du verlierst 1W6 Lebenspunkte, bevor du den Bann brichst. [cite: 814]"
        }
      }
    ]
  },
  "setup": {
    "blue_cards": ["Zeitskala", "Kampfumgebung: Risiko und Gewinn", "Glücks-Idol", "Heldenaktion: Das Spiel spielen [cite: 817-820]"],
    "minion_keywords": ["Schergen eurer Wahl"],
    "special_decks": ["Ereignisse", "Anführer-Aktionen"],
    "victory": "Aktion 'Das Spiel beenden' erfolgreich durchgeführt. [cite: 825]",
    "defeat": "Letzte Zeitmarke entfernt, während Kampf noch läuft. [cite: 824]"
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

## 📄 Datei: data/cards/base_game/leute_die_nicht_spielen/leute_die_nicht_spielen.json
```json
{
  "adventure_id": "leute_die_nicht_spielen",
  "adventure_name": "Leute, die nicht spielen",
  "cards": [
    {
      "id": "lg_leute_idol",
      "name": "Glücks-Idol",
      "type": "leader",
      "sub_name": "Spezial-Gegner",
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/gluecks_idol.jpg",
      "keywords": ["Göttlich", "Dämon", "Übernatürlich"],
      "passive_rules": "Das Idol kann nicht zum Ziel von Angriffen werden. Das Wurfergebnis für seine Aktionen wird pro 🌀 auf dieser Karte um 1 gesenkt. Die 🌀 werden abgelegt, sobald der Aktionswurf „Spannung“ ergibt.",
      "action_table": [
        { "roll": "1-5", "title": "Spannung", "description": "Es wird ein zusätzlicher Scherge gezogen und rechts an die Schergenreihe angelegt." },
        { "roll": "6-8", "title": "Glückssache", "description": "Ein zufälliger Held muss die „Heldenaktion: Den Einsatz erhöhen“ ausführen." },
        { "roll": "9", "title": "Glücksspiel", "description": "Alle Helden führen einen Wurf für die „Kampfumgebung: Risiko und Gewinn“ aus." },
        { "roll": "10-12", "title": "Entspannung", "description": "Jedem Schergen werden 5 🩸 geheilt." },
        { "roll": "13-20", "title": "Unterhaltung", "description": "Das Idol tanzt." }
      ]
    },
    {
      "id": "zs_leute",
      "name": "Zeitskala",
      "type": "timeline",
      "sub_name": "Leute, die nicht spielen",
      "difficulty": "normal",
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/zs_leute.jpg",
      "start_value": 6,
      "milestones": {
        "5": "Zieht eine Ereigniskarte.",
        "4": "Zieht eine Anführer-Aktionskarte.",
        "3": "Befinden sich 1 oder weniger Schergen im Spiel, zieht einen weiteren Schergen vom Schergenstapel und fügt ihn rechts an die Gegnerreihe an.",
        "2": "Zieht sowohl eine Ereigniskarte als auch eine Anführer-Aktionskarte.",
        "1": "Zieht einen weiteren Schergen vom Schergenstapel und fügt ihn rechts an die Gegnerreihe an.",
        "0": "Wenn der Kampf zu diesem Zeitpunkt noch läuft, erleiden die Helden automatisch eine Niederlage."
      }
    },
    {
      "id": "kg_risiko_gewinn",
      "name": "Kampfumgebung: Risiko und Gewinn",
      "type": "environment",
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "ha_das_spiel_spielen",
      "name": "Heldenaktion: Das Spiel spielen",
      "type": "hero_action",
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    }
  ]
}

```

---

## 📄 Datei: data/cards/base_game/master_base_game.json
```json
{
  "set_name": "Aventuria Grundbox",
  "cards": [
    {
      "id": "lg_leute_idol",
      "name": "Glücks-Idol",
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/gluecks_idol.jpg"
    },
    {
      "id": "zs_leute",
      "name": "Zeitskala",
      "image": "assets/images/cards/base_game/leute_die_nicht_spielen/zs_leute.jpg"
    },
    {
      "id": "kg_risiko_gewinn",
      "name": "Kampfumgebung: Risiko und Gewinn",
      "image": ""
    },
    {
      "id": "ha_das_spiel_spielen",
      "name": "Heldenaktion: Das Spiel spielen",
      "image": ""
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
      "image": "",
      "note": "Bild/Kartendaten noch ergänzen"
    },
    {
      "id": "ha_namen_erraten",
      "name": "Heldenaktion: Namen erraten",
      "type": "hero_action",
      "image": "",
      "note": "Bild/Kartendaten noch ergänzen"
    },
    {
      "id": "leader_kobold",
      "name": "???, der Kobold",
      "type": "leader",
      "image": "",
      "note": "Bild/Kartendaten noch ergänzen"
    },
    {
      "id": "minion_pirat",
      "name": "Pirat",
      "type": "minion",
      "image": "",
      "note": "Sammel-/Platzhalter-Eintrag"
    },
    {
      "id": "minion_ork",
      "name": "Ork",
      "type": "minion",
      "image": "",
      "note": "Sammel-/Platzhalter-Eintrag"
    },
    {
      "id": "minion_feiger_goblin",
      "name": "Feiger Goblin",
      "type": "minion",
      "image": "",
      "note": "Optionaler Zusatz-Scherge"
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
      "image": "",
      "note": "Bild/Kartendaten noch ergänzen"
    },
    {
      "id": "leader_greifbart_gichthain",
      "name": "Anführer: Greifbart Gichthain",
      "type": "leader",
      "image": "",
      "note": "Bild/Kartendaten noch ergänzen"
    },
    {
      "id": "story_erbe",
      "name": "Karte: Erbe",
      "type": "story_card",
      "image": "",
      "note": "Bild/Kartendaten noch ergänzen"
    },
    {
      "id": "minion_raeuber",
      "name": "Räuber",
      "type": "minion",
      "image": "",
      "note": "Sammel-/Platzhalter-Eintrag"
    },
    {
      "id": "special_ereignisse_allgemein",
      "name": "Ereignisse: Allgemein",
      "type": "special_deck",
      "image": "",
      "note": "Deck-Referenz"
    },
    {
      "id": "special_ereignisse_gewaesser",
      "name": "Ereignisse: Gewässer",
      "type": "special_deck",
      "image": "",
      "note": "Deck-Referenz"
    },
    {
      "id": "special_ereignisse_wald",
      "name": "Ereignisse: Wald",
      "type": "special_deck",
      "image": "",
      "note": "Deck-Referenz"
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
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "leader_baron_von_wildenstein",
      "name": "Anführer: Baron von Wildenstein",
      "type": "leader",
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "ha_hypnose_brechen",
      "name": "Handlung: Hypnose brechen",
      "type": "hero_action",
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "minion_waechter",
      "name": "Wächter",
      "type": "minion",
      "image": "",
      "note": "Schergenkarte noch nicht ergänzt"
    },
    {
      "id": "minion_diener",
      "name": "Diener",
      "type": "minion",
      "image": "",
      "note": "Schergenkarte noch nicht ergänzt"
    },
    {
      "id": "special_anfuehrer_aktionen_uebernatuerlich",
      "name": "Anführer-Aktionen: Übernatürlich",
      "type": "special",
      "image": "",
      "note": "Spezialkarten-Daten noch nicht ergänzt"
    },
    {
      "id": "special_nekromantie",
      "name": "Nekromantie",
      "type": "special",
      "image": "",
      "note": "Spezialkarten-Daten noch nicht ergänzt"
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
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "leader_grautax",
      "name": "Anführer: Grautax",
      "type": "leader",
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "daemon_irrhalk",
      "name": "Dämon: Irrhalk",
      "type": "special",
      "image": "",
      "note": "Kartendaten/Bild noch nicht ergänzt"
    },
    {
      "id": "minion_skelett",
      "name": "Skelett",
      "type": "minion",
      "image": "",
      "note": "Schergenkarte noch nicht ergänzt"
    },
    {
      "id": "special_anfuehrer_aktionen_nekromantie",
      "name": "Anführer-Aktionen: Nekromantie",
      "type": "special",
      "image": "",
      "note": "Spezialkarten-Daten noch nicht ergänzt"
    },
    {
      "id": "special_ereignisse_untotenbeschwoerung",
      "name": "Ereignisse: Untotenbeschwörung",
      "type": "special",
      "image": "",
      "note": "Spezialkarten-Daten noch nicht ergänzt"
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
    <title>Aventuria Guide & Reader</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/features.css">
    <link rel="stylesheet" href="css/modal.css">
    <style>
        .selection-container {
            background: rgba(92, 30, 30, 0.08);
            border: 2px solid #8b4513;
            border-radius: 8px;
            padding: 20px;
            margin: 20px auto;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        #adventurePicker {
            width: 90%;
            padding: 12px;
            font-size: 1.15em;
            font-family: 'Georgia', serif;
            font-weight: bold;
            background-color: #f4e7d3;
            border: 2px solid #5c1e1e;
            color: #2e241f;
            cursor: pointer;
            border-radius: 4px;
        }
        #loading-status {
            font-weight: bold;
            margin-top: 10px;
            min-height: 1.2em;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <header>
            <h1>AVENTURIA SETUP-GUIDE</h1>
            <div class="top-bar">
                <div class="config-item"><label>Helden:</label><input type="number" id="heroCount" value="2" min="1" max="4"></div>
                <div class="config-item">
                    <label>Schwierigkeit:</label>
                    <select id="difficulty">
                        <option value="einfach">Einfach</option>
                        <option value="normal" selected>Normal</option>
                        <option value="schwer">Schwer</option>
                        <option value="legendär">Legendär</option>
                    </select>
                </div>
                <div class="button-group">
                    <button class="btn-outline" onclick="window.openRulebook()">📜 Regelbuch & Kodex</button>
                    <button class="btn-outline" onclick="window.Archive.open()">🃏 Karten-Archiv</button>
                </div>
            </div>

            <div class="selection-container">
                <select id="adventurePicker">
                    <option value="">-- Abenteuer auswählen --</option>
                    <optgroup label="Grundbox">
                        <option value="base_game/silvanas_befreiung">Silvanas Befreiung</option>
                        <option value="base_game/leute_die_nicht_spielen">Leute, die nicht spielen</option>
                        <option value="base_game/wildenstein_akt_1">Das Erbe von Wildenstein - Akt I</option>
                        <option value="base_game/wildenstein_akt_2">Das Erbe von Wildenstein - Akt II</option>
                        <option value="base_game/wildenstein_akt_3">Das Erbe von Wildenstein - Akt III</option>
                    </optgroup>
                </select>
                <div id="loading-status"></div>
            </div>
        </header>

        <main>
            <section id="story-area"></section>

            <div id="setup-display" class="hidden">
                <h2 id="title"></h2>
                <div class="grid-container">
                    <div class="card-list" id="blue-cards"><h3>Abenteuerkarten (Blau)</h3><ul></ul></div>
                    <div class="card-list" id="minions"><h3>Schergendeck (Monster)</h3><p id="danger-value"></p><ul></ul></div>
                    <div class="card-list" id="special"><h3>Spezialkarten</h3><ul></ul></div>
                </div>

                <div class="toggle-section">
                    <button class="btn-outline" onclick="window.UI.toggleSection('combat-tools')">Kampf-Hilfen ein/ausblenden</button>
                    <button class="btn-outline" onclick="window.UI.toggleSection('intermission-display')">⚖️ Atempause</button>
                </div>

                <div id="combat-tools" class="hidden-section">
                    <div class="grid-container">
                        <div class="card-list">
                            <h3>Phasen-Tracker</h3>
                            <div class="phase-steps">
                                <div id="phase1" class="step">1. Vorbereitung</div>
                                <div id="phase2" class="step">2. Helden</div>
                                <div id="phase3" class="step">3. Gegner</div>
                                <div id="phase4" class="step">4. Zeit</div>
                                <div id="phase5" class="step">5. Ende</div>
                            </div>
                            <button onclick="window.Combat.nextPhase()" class="btn">Nächste Phase ➔</button>
                        </div>
                        <div class="card-list">
                            <h3>Zufalls-Ziel</h3>
                            <button onclick="window.Combat.randomTarget()" class="btn">Ziel ermitteln 🎯</button>
                            <p id="targetResult">--</p>
                        </div>
                    </div>
                    <div class="hero-dashboard" id="heroDashboard"></div>
                </div>

                <div id="intermission-display" class="hidden-section">
                    <div class="intermission-area">
                        <div class="intermission-card">
                            <h3>⚖️ Atempause</h3>
                            <div class="config-item" style="justify-content: center; margin-bottom: 15px;">
                                <label>Zeitmarken:</label>
                                <input type="number" id="remainingTime" value="0" min="0" onchange="window.Combat.calculateIntermission()">
                            </div>
                            <div class="result-badge" id="ep-result">2 EP</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <div id="archive-modal" class="modal-backdrop">
        <div class="modal-content archive-modal-size">
            <span class="close-modal" onclick="window.Archive.close()">&times;</span>
            <div class="modal-layout">
                <nav class="modal-sidebar">
                    <h4>Sammlung</h4>
                    <ul id="archive-sets">
                        <li onclick="window.Archive.loadSet('base_game')">📦 Grundbox</li>
                    </ul>
                </nav>
                <div class="modal-main">
                    <header class="modal-nav">
                        <h2>Karten-Archiv</h2>
                        <input type="text" class="search-bar" placeholder="Karte suchen..." onkeyup="window.Archive.filter(this.value)">
                    </header>
                    <div class="archive-grid" id="archive-grid"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="rule-modal" class="modal-backdrop">
        <div class="modal-content">
            <span class="close-modal" onclick="window.closeRulebook()">&times;</span>
            <div class="modal-layout">
                <nav class="modal-sidebar">
                    <h4>Kodex & Regeln</h4>
                    <ul id="manual-index"></ul>
                </nav>
                <div class="modal-main">
                    <header class="modal-nav">
                        <button id="btn-search" class="tab-btn active" onclick="window.switchTab('search')">🔍 Kodex</button>
                        <button id="btn-reader" class="tab-btn" onclick="window.switchTab('reader')">📖 Regelbuch</button>
                    </header>
                    <div id="tab-search" class="tab-content">
                        <input type="text" class="search-bar" placeholder="Regel suchen..." onkeyup="window.filterRules(this.value)">
                        <div id="rules-results"></div>
                    </div>
                    <div id="tab-reader" class="tab-content hidden">
                        <div id="page-content" class="reader-container"></div>
                        <footer class="reader-footer">
                            <button onclick="window.prevPage()">⬅ Zurück</button>
                            <span>Seite <span id="currentPageNum">1</span> / 24</span>
                            <button onclick="window.nextPage()">Weiter ➡</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="card-tooltip" class="card-tooltip"></div>

    <div style="position: fixed; bottom: 10px; right: 10px; z-index: 9999;">
        <button onclick="window.SystemCheck.run(true)" class="btn-sm" style="background: #2e241f; color: white;">⚙️ Check</button>
    </div>

    <script src="js/config.js"></script>
    <script src="js/api.js"></script>
    <script src="js/ui-helper.js"></script>
    <script src="js/combat.js"></script>
    <script src="js/archive.js"></script>
    <script src="js/rulebook.js"></script>
    <script src="js/ui-renderer.js"></script>
    <script src="js/narrative.js"></script>
    <script src="js/validator.js"></script>
    <script src="js/app.js"></script>
</body>
</html>

```

---

## 📄 Datei: js/api.js
```js
/**
 * js/api.js - Lädt Abenteuer- und Kartendaten
 */
window.API = {
    async getAdventure(path) {
        try {
            const res = await fetch(`data/adventures/${path}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            if (!data.id) {
                data.id = path.split('/').pop();
            }

            return data;
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

            return await res.json();
        } catch (err) {
            console.warn(`⚠️ Karten nicht gefunden für "${id}"`, err);
            return { cards: [] };
        }
    }
};

```

---

## 📄 Datei: js/app.js
```js
/**
 * js/app.js - Hauptsteuerung der App
 */
window.App = {
    async init() {
        const picker = document.getElementById('adventurePicker');
        const count = document.getElementById('heroCount');

        if (picker) picker.addEventListener('change', () => this.handleUpdate());
        if (count) count.addEventListener('change', () => this.handleUpdate());

        if (window.Combat) window.Combat.updateDashboard();
        console.log("App initialisiert.");
    },

    async handleUpdate() {
        const picker = document.getElementById('adventurePicker');
        const status = document.getElementById('loading-status');
        if (!picker || !picker.value) return;

        status.innerText = "⌛ Lade Daten...";

        try {
            if (!window.API) {
                throw new Error("API-Modul ist noch nicht bereit. Bitte Seite neu laden.");
            }

            const advData = await window.API.getAdventure(picker.value);

            if (!advData) {
                status.innerText = "❌ Fehler: Abenteuer-Datei fehlt.";
                return;
            }

            const cardData = await window.API.getCards(advData.id);

            if (window.Renderer) window.Renderer.renderSetup(advData, cardData.cards);
            if (window.Narrative) window.Narrative.renderStory(advData);

            document.getElementById('setup-display').classList.remove('hidden');

            if (window.Combat) {
                window.Combat.resetPhase();
                window.Combat.updateDashboard();
            }

            status.innerText = "✅ Abenteuer geladen.";
        } catch (err) {
            console.error("Ladevorgang abgebrochen:", err);
            status.innerText = `💥 Fehler: ${err.message}`;
            alert("Das Abenteuer konnte nicht geladen werden.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => window.App.init());

```

---

## 📄 Datei: js/archive.js
```js
window.Archive = {
    currentCards: [],

    open() {
        const modal = document.getElementById('archive-modal');
        if (modal) modal.style.display = 'flex';
    },

    close() {
        const modal = document.getElementById('archive-modal');
        if (modal) modal.style.display = 'none';
        window.UI?.hidePreview();
    },

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    async loadSet(setKey) {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        grid.innerHTML = 'Lade Karten...';

        try {
            const res = await fetch(`data/cards/base_game/master_${setKey}.json`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            this.currentCards = Array.isArray(data.cards) ? data.cards : [];
            this.renderCards(this.currentCards);
        } catch (error) {
            console.error('Fehler beim Laden des Archivs:', error);
            grid.innerHTML = '<p class="placeholder-text">Fehler beim Laden des Karten-Archivs.</p>';
        }
    },

    filter(term) {
        const normalized = String(term ?? '').trim().toLowerCase();

        if (!normalized) {
            this.renderCards(this.currentCards);
            return;
        }

        const filtered = this.currentCards.filter(card => {
            const name = String(card.name ?? '').toLowerCase();
            const id = String(card.id ?? '').toLowerCase();
            return name.includes(normalized) || id.includes(normalized);
        });

        this.renderCards(filtered);
    },

    renderCards(cards) {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        grid.innerHTML = '';

        if (!cards.length) {
            grid.innerHTML = '<p class="placeholder-text">Keine Karten gefunden.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        cards.forEach(card => {
            const wrapper = document.createElement('div');
            wrapper.className = 'archive-card';

            const image = document.createElement('img');
            image.src = card.image;
            image.alt = card.name || 'Karte';
            image.loading = 'lazy';

            const caption = document.createElement('p');
            caption.textContent = card.name || 'Unbenannte Karte';

            wrapper.appendChild(image);
            wrapper.appendChild(caption);

            if (card.image) {
                wrapper.addEventListener('mouseover', (event) => {
                    window.UI?.showPreview(event, card.image);
                });

                wrapper.addEventListener('mousemove', (event) => {
                    window.UI?.movePreview(event);
                });

                wrapper.addEventListener('mouseout', () => {
                    window.UI?.hidePreview();
                });

                wrapper.addEventListener('click', (event) => {
                    window.UI?.showPreview(event, card.image);
                });
            }

            fragment.appendChild(wrapper);
        });

        grid.appendChild(fragment);
    }
};

```

---

## 📄 Datei: js/combat.js
```js
window.Combat = {
    currentPhase: 0,

    resetPhase() {
        this.currentPhase = 0;
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
    },

    nextPhase() {
        const steps = document.querySelectorAll('.step');
        steps.forEach(s => s.classList.remove('active'));

        this.currentPhase = (this.currentPhase % 5) + 1;

        const el = document.getElementById(`phase${this.currentPhase}`);
        if (el) el.classList.add('active');
    },

    randomTarget() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const res = document.getElementById('targetResult');

        if (res) {
            if (count < 1) {
                res.innerText = "🎯 Kein gültiges Ziel vorhanden";
                return;
            }

            res.innerText = `🎯 Ziel: Held ${Math.floor(Math.random() * count) + 1}`;
        }
    },

    updateDashboard() {
        const count = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const container = document.getElementById('heroDashboard');
        if (!container) return;

        container.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            container.innerHTML += `
                <div class="hero-card">
                    <h4>Held ${i}</h4>
                    <div class="stat">
                        ❤️ <span id="lp${i}">40</span>
                        <button type="button" onclick="window.Combat.changeStat('lp${i}', -1)">-</button>
                        <button type="button" onclick="window.Combat.changeStat('lp${i}', 1)">+</button>
                    </div>
                </div>
            `;
        }
    },

    changeStat(id, delta) {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = Math.max(0, (parseInt(el.innerText, 10) || 0) + delta);
        }
    },

    calculateIntermission() {
        const time = parseInt(document.getElementById('remainingTime')?.value, 10) || 0;
        const ep = time + 2;
        const res = document.getElementById('ep-result');

        if (res) res.innerText = `${ep} EP`;
    }
};

```

---

## 📄 Datei: js/config.js
```js
window.CONFIG = {
    paths: {
        adventures: 'data/adventures/',
        cardsBase: 'data/cards/base_game/'
    }
};

```

---

## 📄 Datei: js/loader.js
```js
/**
 * js/loader.js
 * Lädt Abenteuer-Daten basierend auf dem Pfad
 */
async function fetchAdventureData(path) {
    try {
        const response = await fetch(`data/adventures/${path}.json`);
        if (!response.ok) {
            throw new Error(`Abenteuer unter ${path} nicht gefunden.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ladefehler:", error);
        alert("Fehler beim Laden des Abenteuers. Prüfe die Konsole.");
        return null;
    }
}
```

---

## 📄 Datei: js/narrative.js
```js
window.Narrative = {
    escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    renderStory(data) {
        const container = document.getElementById('story-area');

        if (!container || !data || !data.narrative) {
            if (container) container.innerHTML = "";
            return;
        }

        const checks = Array.isArray(data.narrative.checks) ? data.narrative.checks : [];

        container.innerHTML = `
            <div class="card-list">
                <h3>📖 Die Geschichte</h3>
                <p class="story-text">${this.escapeHtml(data.narrative.intro ?? "")}</p>
                <div class="probes-area">
                    <h4>Interaktive Proben:</h4>
                    ${checks.map((check, index) => `
                        <div class="probe-item" data-check-index="${index}">
                            <p>
                                <strong>${this.escapeHtml(check.skill ?? "Probe")}:</strong>
                                ${this.escapeHtml(check.text ?? "")}
                            </p>
                            <div class="probe-buttons">
                                <button type="button" class="btn-sm success" data-check-result="success">Erfolg</button>
                                <button type="button" class="btn-sm fail" data-check-result="fail">Misserfolg</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.bindCheckButtons(checks);
    },

    bindCheckButtons(checks) {
        document.querySelectorAll('.probe-item').forEach(item => {
            const index = parseInt(item.dataset.checkIndex, 10);
            const check = checks[index];
            if (!check || !check.results) return;

            item.querySelectorAll('[data-check-result]').forEach(button => {
                button.addEventListener('click', () => {
                    const type = button.dataset.checkResult;
                    const resultText = check.results?.[type] ?? "Kein Ergebnis vorhanden.";

                    if (window.UI?.handleCheck) {
                        window.UI.handleCheck(button, type, this.escapeHtml(resultText));
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
/**
 * js/rulebook.js - Steuerung für das Regelbuch und den Index
 */
window.rulesData = [];
window.currentPage = 1;

// Seiten 4 und 5 sind jetzt wieder regulär vorhanden
window.validManualPages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

const indexData = [
    { p: 1, title: "Titelblatt" },
    { p: 2, title: "Was ist Aventurien?" },
    { p: 4, title: "Südosten & ferne Regionen" },
    { p: 5, title: "Religionen, Kulturen & Gefahren" },
    { p: 6, title: "Vorbereitung" },
    { p: 7, title: "Spielmaterial" },
    { p: 9, title: "Das Abenteuer" },
    { p: 10, title: "Der Kampf (Setup)" },
    { p: 13, title: "Kampfablauf" },
    { p: 15, title: "Sieg & Atempause" },
    { p: 17, title: "Silvanas Befreiung" },
    { p: 19, title: "Leute, die nicht spielen" },
    { p: 20, title: "Wildenstein Akt I" },
    { p: 21, title: "Wildenstein Akt II" },
    { p: 23, title: "Wildenstein Akt III" },
    { p: 24, title: "Übersichten" }
];

window.openRulebook = () => {
    const modal = document.getElementById('rule-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    window.switchTab('search');
};

window.closeRulebook = () => {
    const modal = document.getElementById('rule-modal');
    if (!modal) return;
    modal.style.display = 'none';
};

window.jumpToPage = (nr) => {
    if (!window.validManualPages.includes(nr)) {
        console.warn(`Regelbuch-Seite ${nr} ist aktuell nicht verfügbar.`);
        return;
    }

    window.switchTab('reader');
    window.loadPage(nr);
};

window.switchTab = (tab) => {
    document.getElementById('tab-search')?.classList.toggle('hidden', tab !== 'search');
    document.getElementById('tab-reader')?.classList.toggle('hidden', tab !== 'reader');
    document.getElementById('btn-search')?.classList.toggle('active', tab === 'search');
    document.getElementById('btn-reader')?.classList.toggle('active', tab === 'reader');

    if (tab === 'reader') {
        window.loadPage(window.currentPage);
    }
};

window.getNextManualPage = (current) => {
    return window.validManualPages.find(page => page > current) ?? current;
};

window.getPrevManualPage = (current) => {
    const prev = [...window.validManualPages].reverse().find(page => page < current);
    return prev ?? current;
};

window.loadPage = async (nr) => {
    const container = document.getElementById('page-content');
    if (!container) return;

    if (!window.validManualPages.includes(nr)) {
        container.innerHTML = 'Diese Seite ist aktuell nicht verfügbar.';
        return;
    }

    container.innerHTML = 'Lade Schriftrolle...';

    try {
        const res = await fetch(`data/manual/base_game/page_${nr.toString().padStart(2, '0')}.json`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        container.innerHTML = `
            <h4>${data.title}</h4>
            ${data.image ? `<img src="${data.image}" style="width:100%; border:1px solid #8b4513;">` : ''}
            <div class="reader-text" style="margin-top:15px;">${data.content}</div>
        `;

        document.getElementById('currentPageNum').innerText = nr;
        window.currentPage = nr;
    } catch (error) {
        console.error('Fehler beim Laden der Regelbuch-Seite:', error);
        container.innerHTML = 'Fehler beim Laden der Seite.';
    }
};

window.nextPage = () => {
    window.loadPage(window.getNextManualPage(window.currentPage));
};

window.prevPage = () => {
    window.loadPage(window.getPrevManualPage(window.currentPage));
};

window.filterRules = (term) => {
    const results = document.getElementById('rules-results');
    if (!results) return;

    if (!term) {
        results.innerHTML = '';
        return;
    }

    const normalized = term.toLowerCase();

    const filtered = window.rulesData.filter(rule =>
        rule.title.toLowerCase().includes(normalized) ||
        rule.text.toLowerCase().includes(normalized)
    );

    results.innerHTML = filtered.map(rule => `
        <div class="rule-entry">
            <h4>${rule.title}</h4>
            <p>${rule.text}</p>
        </div>
    `).join('') || 'Kein Treffer im Kodex.';
};

function initRulebook() {
    const list = document.getElementById('manual-index');
    if (!list) return;

    list.innerHTML = '';

    const fragment = document.createDocumentFragment();

    indexData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `S. ${item.p}: ${item.title}`;
        li.addEventListener('click', () => window.jumpToPage(item.p));
        fragment.appendChild(li);
    });

    list.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', async () => {
    initRulebook();

    try {
        const res = await fetch('data/manual.json');
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        window.rulesData = [
            ...data.phases.map(phase => ({ title: phase.name, text: phase.desc })),
            ...Object.entries(data.rules).map(([key, value]) => ({ title: key, text: value }))
        ];
    } catch (error) {
        console.warn('Kodex-Daten fehlen.', error);
    }
});

```

---

## 📄 Datei: js/ui-helper.js
```js
window.UI = {
    toggleSection(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.toggle('show');
    },

    showPreview(event, imageSrc) {
        const tooltip = document.getElementById('card-tooltip');
        if (!tooltip || !imageSrc) return;

        tooltip.innerHTML = `<img src="${imageSrc}" alt="Kartenvorschau">`;
        tooltip.style.display = 'block';
        this.movePreview(event);
    },

    movePreview(event) {
        const tooltip = document.getElementById('card-tooltip');
        if (!tooltip || tooltip.style.display !== 'block') return;

        const offsetX = 20;
        const offsetY = 20;
        const margin = 16;

        const tooltipWidth = tooltip.offsetWidth || 450;
        const tooltipHeight = tooltip.offsetHeight || 300;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = event.clientX + offsetX;
        let top = event.clientY + offsetY;

        if (left + tooltipWidth + margin > viewportWidth) {
            left = event.clientX - tooltipWidth - offsetX;
        }

        if (left < margin) {
            left = margin;
        }

        if (top + tooltipHeight + margin > viewportHeight) {
            top = viewportHeight - tooltipHeight - margin;
        }

        if (top < margin) {
            top = margin;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    },

    hidePreview() {
        const tooltip = document.getElementById('card-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    },

    handleCheck(btn, type, text) {
        const probeItem = btn.closest('.probe-item');
        if (!probeItem) return;

        let result = probeItem.querySelector('.check-result');

        if (!result) {
            result = document.createElement('div');
            result.className = 'check-result';
            probeItem.appendChild(result);
        }

        result.className = `check-result show ${type}`;
        result.innerHTML = `<strong>${type === 'success' ? '✅' : '❌'}</strong> ${text}`;
    }
};

```

---

## 📄 Datei: js/ui-renderer.js
```js
/**
 * js/ui-renderer.js - Rendert Abenteuerdaten über Karten-IDs
 */
window.Renderer = {
    escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    getCardById(cards, id) {
        return (cards || []).find(card => card.id === id) || null;
    },

    buildList(items, cards) {
        if (!Array.isArray(items)) return "";

        return items.map(item => {
            const entry = typeof item === "string" ? { id: item } : item;
            const card = this.getCardById(cards, entry.id);

            const label = this.escapeHtml(
                entry.label || card?.name || `⚠️ ${entry.id}`
            );

            if (card?.image) {
                const safeImage = this.escapeHtml(card.image);

                return `
                    <li>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span class="has-preview">${label}</span>
                            <button
                                type="button"
                                class="info-btn"
                                data-card-image="${safeImage}"
                                title="Kartenvorschau öffnen"
                            >i</button>
                        </label>
                    </li>
                `;
            }

            return `
                <li>
                    <label class="checklist-item">
                        <input type="checkbox">
                        <span>${label}</span>
                        <button
                            type="button"
                            class="info-btn"
                            disabled
                            title="Keine Kartendaten vorhanden"
                        >–</button>
                    </label>
                </li>
            `;
        }).join("");
    },

    renderSetup(data, adventureCards) {
        if (!data) return;

        const heroCount = parseInt(document.getElementById('heroCount')?.value, 10) || 0;
        const dangerCalc = Number.isFinite(Number(data.danger_calc)) ? Number(data.danger_calc) : 0;

        document.getElementById('title').innerText = data.name || "Unbekanntes Abenteuer";

        document.querySelector('#blue-cards ul').innerHTML = this.buildList(
            data.setup?.blue_cards,
            adventureCards
        );

        document.querySelector('#minions ul').innerHTML = this.buildList(
            data.setup?.minion_cards,
            adventureCards
        );

        document.getElementById('danger-value').innerHTML = `
            Gefahrenwert: <strong>${heroCount * dangerCalc} GP</strong>
            <button type="button" class="info-btn" id="danger-info-btn">i</button>
        `;

        document.getElementById('special').innerHTML = `
            <h3>Spezialkarten</h3>
            <ul>${this.buildList(data.setup?.special_cards, adventureCards)}</ul>
            <hr>
            <p><strong>⚔ Sieg:</strong> ${this.escapeHtml(data.setup?.victory ?? "—")}</p>
            <p><strong>☠ Niederlage:</strong> ${this.escapeHtml(data.setup?.defeat ?? "—")}</p>
        `;

        this.bindPreviewEvents();
        this.bindDangerInfoButton();
    },

    bindPreviewEvents() {
        document.querySelectorAll('[data-card-image]').forEach(el => {
            const image = el.dataset.cardImage;
            if (!image) return;

            el.addEventListener('mouseover', (event) => window.UI?.showPreview(event, image));
            el.addEventListener('mousemove', (event) => window.UI?.movePreview(event));
            el.addEventListener('mouseout', () => window.UI?.hidePreview());

            if (el.tagName === 'BUTTON') {
                el.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.UI?.showPreview(event, image);
                });
            }
        });
    },

    bindDangerInfoButton() {
        const btn = document.getElementById('danger-info-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (typeof window.jumpToPage === 'function') {
                window.jumpToPage(12);
            } else {
                console.warn('jumpToPage ist noch nicht verfügbar.');
            }
        });
    }
};

```

---

## 📄 Datei: js/validator.js
```js
/**
 * js/validator.js - Prüft Module und Abenteuerpfade
 */
window.SystemCheck = {
    requirements: [
        { name: 'CONFIG', id: 'config.js' },
        { name: 'API', id: 'api.js' },
        { name: 'Renderer', id: 'ui-renderer.js' },
        { name: 'UI', id: 'ui-helper.js' },
        { name: 'Combat', id: 'combat.js' },
        { name: 'Archive', id: 'archive.js' },
        { name: 'Narrative', id: 'narrative.js' },
        { name: 'App', id: 'app.js' }
    ],

    async run(manual = false) {
        let errors = [];
        this.requirements.forEach(req => {
            if (typeof window[req.name] === 'undefined') errors.push(`❌ Modul fehlt: ${req.id}`);
        });

        const picker = document.getElementById('adventurePicker');
        if (picker && manual) {
            const options = Array.from(picker.querySelectorAll('option')).filter(o => o.value);
            for (let opt of options) {
                const res = await fetch(`data/adventures/${opt.value}.json`, { method: 'HEAD' });
                if (!res.ok) errors.push(`⚠️ Datei nicht gefunden: data/adventures/${opt.value}.json`);
            }
        }

        if (errors.length > 0) {
            console.error("System-Check Fehler:", errors);
            if(manual) alert("Fehler gefunden:\n" + errors.join("\n"));
        } else if (manual) {
            alert("✅ Alle Module und Abenteuer-Dateien sind erreichbar!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.SystemCheck.run(), 1000));

```

---

