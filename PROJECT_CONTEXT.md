# Brian Training & Ernährung – Projektkontext

Diese Datei ist die gemeinsame Arbeitsgrundlage für weitere Chats/Änderungen an der App.

## App

- Repository: `GromeierBau/-brian-training-app`
- Live-Seite: `https://gromeierbau.github.io/-brian-training-app/`
- Hauptdatei: `index.html`
- Zusatzlogik / McDonald's / Tagesziele / Schnellbuttons: `mcdonalds-official.js`
- Daten werden clientseitig in `localStorage` gespeichert, unter anderem unter `bFoods`.
- Die App ist für iPhone/Safari bzw. als Web-App gedacht.

## Wichtige Regel für Änderungen

Die vollständige bestehende App niemals durch eine vereinfachte `index.html` ersetzen. Änderungen möglichst gezielt an einzelnen Funktionen oder Zusatzskripten vornehmen. Vor einem größeren Eingriff immer den aktuellen Stand von `main` lesen. Keine Weiterleitung auf nicht vorhandene Dateien einbauen.

## Navigation / Bereiche

Die App hat unten sechs Bereiche:

1. Übersicht
2. Ernährung
3. Training
4. Statistik
5. 46er
6. Coach

Vorhandene Funktionen sollen bei Änderungen erhalten bleiben:

- Tagesübersicht für kcal, Eiweiß, Kohlenhydrate, Fett und Ballaststoffe
- Lebensmittel-Suche
- Barcode-Scanner
- manuelle Lebensmitteleingabe
- heutige Lebensmittel und häufig gegessene Lebensmittel
- 4er-Trainingssplit mit Satz-/Gewichts-/Wiederholungsdaten
- Körpergewicht und Statistik
- Trainingsfortschritt
- 46er-Nährstoffcheck
- Coach / "Was kann ich jetzt noch essen?"

## Tagesziele

Aktuell in `mcdonalds-official.js` hinterlegt:

- Kalorien: ca. 2472.6 kcal
- Eiweiß: 211.2 g
- Kohlenhydrate: 241.1 g
- Fett: ca. 66.5 g
- Ballaststoffe: 30 g

Weitere dort hinterlegte Rechengrößen:

- Grundumsatz: ca. 2060.5 kcal
- Erhaltung: ca. 3090.8 kcal
- Gewicht: 88.8 kg
- Größe: 1.88 m
- Alter: 40
- Aktivitätsfaktor: 1.5
- Defizitfaktor: 0.8
- Ziel-/Referenzgewicht: 88 kg

## Feste Schnellbuttons

Unter "Schnell eintragen" sollen diese vier Buttons stehen:

- Lebensmittel suchen
- Barcode scannen
- Grüner Helfer +7 g
- LaVita +10 ml

### Grüner Helfer

Feste Portion: 7 g

Aktuell hinterlegte Werte pro 7 g:

- 19.084 kcal
- Eiweiß 1.021 g
- Kohlenhydrate 1.914 g
- Fett 0.148 g
- Ballaststoffe 3.246 g
- Salz 0.0026 g

Der "Grüne Helfer" ist eine selbst gemischte Pulvermischung. Bei späteren Änderungen an Mikronährstoffen nicht raten: vorhandene Rezept-/Produktdaten prüfen.

### LaVita

Feste Portion: 10 ml

Aktuell hinterlegte Makrowerte pro 10 ml:

- 24 kcal
- Eiweiß 0.26 g
- Kohlenhydrate 4.9 g
- Fett 0.32 g
- Ballaststoffe 2.6 g
- Salz ca. 0.1 g

Auf dem Etikett wurden zusätzlich zahlreiche Vitamine und Mineralstoffe dokumentiert. Wenn der 46er-Check diese berücksichtigen soll, die Werte aus den vorhandenen Produktfotos/Projektverlauf sauber übernehmen statt pauschal zu schätzen.

## Ballaststoffe

Ballaststoffe sollen in der Übersicht wie die anderen Tageswerte sichtbar sein, mit Ziel 30 g und Fortschritt.

Sie müssen auch in "Was kann ich noch essen?" berücksichtigt werden.

## "Was kann ich jetzt noch essen?" – gewünschte Logik

Die Empfehlung soll nicht nur Kalorien und Eiweiß sortieren. Sie soll zuerst die aktuell offenen Werte berechnen:

- kcal
- Eiweiß
- Kohlenhydrate
- Fett
- Ballaststoffe

Dann sollen Vorschläge nach dem tatsächlichen Restbedarf bewertet werden.

Wichtige Regeln:

- Harte Grenzen zuerst prüfen. Ein Vorschlag, der deutlich mehr kcal hat als noch frei sind, darf nicht als "Beste Wahl" erscheinen.
- Wenn Fett bereits ausgeschöpft ist, nur praktisch fettfreie bzw. sehr fettarme Optionen zulassen.
- Wenn Eiweiß bereits erfüllt ist, Eiweiß nicht weiter künstlich priorisieren.
- Wenn Ballaststoffe erfüllt sind, sie nicht mehr als Hauptgrund für eine Empfehlung werten.
- Wenn vor allem KH offen sind, aber nur wenige kcal übrig sind, klar sagen, dass die KH nicht vollständig aufgefüllt werden können, und eine kleine fettarme KH-Quelle empfehlen.
- Falls keine gespeicherte Standard-Mahlzeit sinnvoll in die Restwerte passt, das ausdrücklich anzeigen statt eine unpassende Mahlzeit vorzuschlagen.
- McDonald's-Vorschläge ebenfalls gegen offene kcal/Fett/Makros filtern.

### Tageszeit

Tageszeit darf nur als sekundärer Faktor verwendet werden. Die offenen Tageswerte haben Vorrang.

Gewünschte Tendenz:

- morgens: Kohlenhydrate + Eiweiß bevorzugen, Fett moderat, Ballaststoffe sinnvoll mitnehmen
- mittags: ausgewogen nach Restbedarf
- abends: besonders streng nach offenen Tageswerten

Wenn die Makros morgens schon anders verteilt sind, soll die App nicht starr weitere Kohlenhydrate empfehlen.

## Aktuell hinterlegte Zuhause-Mahlzeiten

In `index.html` existieren aktuell u. a. diese Standardvorschläge:

- 250 g Skyr + 1 Banane
- 200 g Hähnchen + 300 g Kartoffeln + Gemüse
- 3 Eier + 2 Steiner Brötchen

Diese Werte dienen als aktuelle Vorschlagsbasis. Sie sind nicht zwangsläufig die optimale oder vollständige Lebensmitteldatenbank.

Auffälligkeit: Die Ballaststoffmenge bei "3 Eier + 2 Steiner Brötchen" wirkt sehr hoch und sollte bei Gelegenheit gegen die tatsächlich hinterlegten Produktwerte geprüft werden.

## McDonald's Deutschland

In `mcdonalds-official.js` sind aktuell unter anderem verifizierte Produkte/Portionen hinterlegt, z. B.:

- 20 Garlic Pepper Chicken McNuggets
- 20 Chicken McNuggets
- Double Cheeseburger
- Big Tasty Bacon
- Big Chicken Salad
- Snack Salad
- Süßsauer Sauce
- Balsamico Dressing
- Spicy Bali Style Sauce

Bei McDonald's möglichst offizielle Deutschland-Nährwerte verwenden. Keine Werte erfinden, wenn die offizielle Zahl nicht ausgelesen wurde.

## Barcode-Scanner

Der Scanner nutzt `html5-qrcode`. Frühere Probleme betrafen eine unscharfe/falsche iPhone-Kamera. Änderungen an Kamera/Scanner nur gezielt vornehmen und die funktionierende Haupt-App nicht ersetzen.

## Priorität bei zukünftigen Änderungen

1. Aktuellen `main`-Stand lesen.
2. Bestehende Funktionen erhalten.
3. Kleine, gezielte Änderung durchführen.
4. Keine Platzhalterseiten oder vereinfachte Ersatz-App deployen.
5. Bei Nährwerten vorhandene Etiketten/offizielle Quellen verwenden.
6. Nach Änderungen prüfen, dass Übersicht, Ernährung, Training, Statistik, 46er und Coach weiterhin vorhanden sind.
