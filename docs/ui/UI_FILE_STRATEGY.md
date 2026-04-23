# UI File Strategy – Aventuria Helper

## Ziel

Die UI soll langfristig wachsen können, ohne wieder in wenige große Dateien zurückzufallen.

## Ebenen

### 1. Tokens
Pfad:
- `css/ui/tokens.css`

Enthält ausschließlich:
- Farben
- Fonts
- Abstände
- Radius
- Schatten
- Border
- Transition
- Größen-Konstanten

Hier werden auch Legacy-Aliasse gepflegt, damit alte CSS-Dateien weiter funktionieren.

---

### 2. Primitive UI-Bausteine
Pfad:
- `css/ui/typography.css`
- `css/ui/buttons.css`
- `css/ui/forms.css`
- `css/ui/panels.css`
- `css/ui/badges.css`
- `css/ui/dividers.css`

Diese Dateien enthalten wiederverwendbare Muster.

Beispiele:
- Buttons
- Inputs
- Suchfelder
- Panel-Flächen
- Badges
- Divider
- Titel-/Text-Hierarchie

Diese Dateien dürfen keine feature-spezifische Logik enthalten.

---

### 3. Layout-Shell
Pfad:
- `css/layout/app-shell.css`

Verantwortung:
- App-Rahmen
- Header-Grundstruktur
- Hauptabstände
- globale Shell-Flächen
- grundlegender Seitenfluss

Keine Feature-Sonderstile.

---

### 4. Feature-CSS
Pfad:
- `css/features/...`

Beispiele:
- `main-session.css`
- `adventure-setup.css`
- `archive-home.css`
- `archive-browser.css`
- `rulebook-theme.css`
- `card-detail-theme.css`

Regel:
Feature-CSS darf nur die Besonderheiten dieses Features stylen.
Keine neuen Grundfarben, keine neuen Button-Systeme, keine neuen Schattenwelten.

---

## JS-Struktur

### Renderer klein halten
Renderer sollen möglichst nur eine Verantwortung haben:
- Header rendern
- Status rendern
- Gruppe rendern
- Preview rendern
- Probe rendern

### Orchestratoren dünn halten
Dateien wie:
- `setup-renderer.js`
- `archive/renderer.js`
- `archive.js`

sollen delegieren, nicht große HTML-Sammelstellen werden.

---

## Migrationsregel

Während des Relaunchs dürfen Legacy-Dateien temporär weiter existieren.

Aber:
- neue Regeln kommen nur noch in die neue Struktur
- Legacy-Dateien werden nicht weiter “mal eben” erweitert
- sobald ein Bereich migriert ist, wird er nicht zurück in die alte Struktur geschrieben

---

## CSS-Regeln

1. Keine Monsterdateien
2. Keine künstliche Zerstückelung
3. Tokens zuerst
4. Primitive vor Feature-Sonderlösung
5. Möglichst Root-Klassen pro Feature
6. Keine wilden !important-Ketten
7. Keine Farbwerte direkt im Feature, wenn ein Token existiert

---

## Lade-Reihenfolge

1. `css/ui/tokens.css`
2. `css/base.css`
3. `css/ui/typography.css`
4. `css/layout/app-shell.css`
5. `css/app-layout.css` (bis spätere Migration)
6. `css/ui/buttons.css`
7. `css/ui/forms.css`
8. `css/ui/panels.css`
9. `css/ui/badges.css`
10. `css/ui/dividers.css`
11. bestehende Feature-CSS
12. später neue `css/features/...`

So bleibt die Basis zentral und Features können darauf aufbauen.
