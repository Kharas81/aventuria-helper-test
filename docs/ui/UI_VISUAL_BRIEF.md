# UI Visual Brief – Aventuria Helper

## Zielbild

Die Anwendung soll wie ein hochwertiges Aventuria-/Fantasy-Nachschlage- und Spielwerkzeug wirken:

- Pergament statt nüchterner App-Flächen
- Bordeaux / Dunkelrot / Bronze / Gold als Akzentwelt
- ruhige, lesbare Hierarchie
- große Titel und wertige Sektionen
- moderne Struktur, aber ohne sterile Software-Optik
- keine billige Fantasy-Überladung

## Stilprinzipien

1. Erst Struktur, dann Deko  
   Ornamentik darf nie Lesbarkeit, Klickbarkeit oder Wartbarkeit zerstören.

2. Wertige Flächen statt harter Blöcke  
   Panels sollen wie ruhige Pergamentkarten wirken, nicht wie graue Formularboxen.

3. Typografie trägt die Stimmung  
   Große Serifentitel, ruhige Leseschrift, klare UI-Beschriftung.

4. Eine gemeinsame Designfamilie  
   Hauptansicht, Abenteuerseite, Archiv, Regelbuch und Card Detail sollen sichtbar zusammengehören.

5. Reusable vor Einzelfall  
   Neue visuelle Muster sollen zuerst als Primitive oder wiederverwendbare Klasse gedacht werden.

## Bereichsziele

### Hauptansicht / Session
- Fokus auf Kampf-Tools als Hauptblock
- Atempause als eigener, ruhiger zweiter Block
- klare visuelle Trennung
- kein “alles gleich wichtig”

### Abenteuerseite
- großer Abenteuer-Titel
- Gefahrenstufe als Banner / Ribbon / Badge
- drei Setup-Panels:
  - Blaue Karten
  - Schergen
  - Spezial
- Story-Bereich als hochwertiger Leseblock
- Interaktive Proben als hervorgehobene Aktionskarte

### Archiv Home
- Dashboard-Einstieg
- kein unfertiger Leerzustand
- Schnellzugriff, Kategorien, Sets
- schönes erstes Gefühl statt “nur Filter und Suchfeld”

### Archiv Browser
- Split View
- linke Navigation / Filter
- mittlere Liste
- rechte Vorschau / Detail
- rechte Seite nie leer und tot wirken lassen

### Regelbuch
- gleiche Designfamilie
- keine komplette Architektur-OP
- Fokus auf Theme-Angleichung

### Card Detail
- soll sich wie Teil des neuen Archivs anfühlen
- saubere Panels, Meta-Bereiche, Regeln und Werte

## Asset-Prinzip

Assets sind unterstützend, nicht tragend.

Erlaubt und gewünscht:
- kleine SVG-Icons
- Badges
- Divider
- Panel-Ornamente
- Ribbon-Elemente

Nicht gewünscht:
- riesige dekorative Bildsysteme als Pflichtbasis
- Layouts, die nur mit Kunstgrafiken funktionieren

## Technische Regel

Keine Farbe, kein Radius, kein Schatten und keine Font-Entscheidung direkt in Feature-CSS hardcoden, wenn es als Token/Primitive existieren sollte.
