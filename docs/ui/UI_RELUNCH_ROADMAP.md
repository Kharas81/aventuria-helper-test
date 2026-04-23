# UI Relaunch Roadmap – Aventuria Helper

## Grundsatz

Der Relaunch wird nicht als Einmal-Umbau in eine große Datei umgesetzt, sondern als schrittweise Migration auf ein neues UI-System.

---

## Phase 0 – Analyse + Dateiplan
Ziel:
- bestehende Struktur prüfen
- guten Bestand respektieren
- gefährliche Sammeldateien vermeiden
- finalen Dateiplan festlegen

Status:
- abgeschlossen

---

## Phase 1 – UI-Basis / Design-System
Ziel:
- zentrale Tokens
- Typografie-System
- Buttons
- Formfelder
- Panels
- Badges
- Divider
- App-Shell

Ergebnis:
- neue UI-Basis aktiv
- bestehende Features laufen weiter
- spätere Phasen bauen auf dieser Basis auf

---

## Phase 2 – Hauptansicht / Session
Ziel:
- Fokus auf Kampf-Tools
- Atempause als eigener Block
- klare Hauptseite
- `app.js` / Orchestratoren dünn halten

Geplante Teilrenderer:
- `session-header-renderer.js`
- `session-combat-renderer.js`
- `session-status-strip-renderer.js`
- `session-hero-cards-renderer.js`
- `session-rest-panel-renderer.js`

---

## Phase 3 – Abenteuerseite
Ziel:
- großer Abenteuerkopf
- Gefahrenstufe-Banner
- drei Setup-Panels
- Story-Panel
- Probe-Karte

Geplante Teilrenderer:
- `setup-header-renderer.js`
- `setup-group-renderer.js`
- `setup-story-renderer.js`
- `setup-probe-renderer.js`
- `setup-theme-map.js`

---

## Phase 4 – Archiv Startseite
Ziel:
- schöner Dashboard-Einstieg
- kein unfertiger Leerzustand
- klare Home-Ansicht

---

## Phase 5 – Archiv Browser
Ziel:
- Split View
- Sidebar
- Liste
- Vorschau / Detail
- Browser-Ansicht sauber getrennt von Home

---

## Phase 6 – Regelbuch angleichen
Ziel:
- gleiche Designfamilie
- nur gezielte Theme-Anpassung
- keine unnötige Architektur-OP

---

## Phase 7 – Card Detail angleichen
Ziel:
- wertigere Panel-Struktur
- bessere Lesbarkeit
- optische Nähe zum neuen Archiv

---

## Phase 8 – SVG-Icons / kleine Assets
Ziel:
- unterstützende visuelle Elemente
- pragmatische, wartbare Assets
- keine asset-abhängige Grundstruktur

---

## Qualitätsregel für jede Phase

Jede Phase muss:
- lauffähig bleiben
- bestehende Kernfunktion nicht kaputtmachen
- keine neue Monsterdatei erzeugen
- auf der neuen Basis aufbauen
