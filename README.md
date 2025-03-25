# Pic Finisher Next

Eine interaktive Webanwendung für Kinder und Jugendliche, die Kreativität und KI-Verständnis spielerisch fördert.

## 📌 Projektziel

Entwicklung einer interaktiven Webanwendung mit React und Next.js, die Kindern und Jugendlichen (8-15 Jahre) ermöglicht, spielerisch kreative Bilder zu zeichnen und anschließend durch eine KI (ComfyUI) automatisch verbessern oder verändern zu lassen.

Die Anwendung dient dazu, Kreativität, digitale Kompetenzen und das Verständnis von künstlicher Intelligenz altersgerecht und spielerisch zu fördern.

## 🎯 Zielgruppe & Plattform

- **Zielgruppe:** Kinder und Jugendliche (8 bis 15 Jahre)
- **Plattform:** Primär für Desktop optimiert, zusätzlich funktionsfähig auf Tablets (besonders iPads)

## ✨ Hauptfunktionalitäten

- Auswahl einer Kategorie (z.B. Tiere, Früchte)
- Zufällige Zuweisung eines Wortes mit ansprechender Slot-Machine-Animation
- Zeichen-Canvas zum kreativen Zeichnen mit verschiedenen Tools (Farben, Radierer, Undo/Redo)
- Übermittlung des gezeichneten Bildes (als Base64) an eine KI-API (ComfyUI)
- Automatische Generierung eines neuen, verbesserten Bildes durch KI
- Side-by-Side Darstellung zur direkten Gegenüberstellung beider Bilder (Original & KI-generiert)
- Möglichkeit, einen QR-Code zu generieren, über den beide Bilder betrachtet und heruntergeladen werden können

## 🎨 Kategorien und Stile

Die Anwendung bietet verschiedene **Kategorien** und **KI-Zeichenstile**:

### Kategorien

- Tiere
- Früchte
- Fahrzeuge
- Gebäude
- Pflanzen

### KI-Zeichenstile

- Sci-Fi
- Fantasy
- Zeichnung (Sketch)
- Comic
- Realistisch

Je nach gewählter Kategorie und Stil werden automatisch:

- Der Text-Prompt angepasst
- Der ComfyUI-Workflow dynamisch aktualisiert
- Denoise-Stärke und andere Parameter optimiert

## 🎨 Gestaltung und UX

- Professionelles, modernes und dennoch kinderfreundliches Design
- Integration des Logos der Hochschule Fulda
- Nutzung von ansprechenden UI-Animationen, Loaders und Skeletons
- Intuitive und klare Benutzeroberfläche für junge Nutzergruppen

## 🔧 Technische Umsetzung

- React & Next.js als Haupttechnologien
- Tailwind CSS zur schnellen und effizienten Gestaltung des UI
- Nutzung eines bestehenden ComfyUI-Workflows (bereitgestellt als JSON-Datei)
- Kommunikation zwischen Frontend und ComfyUI via REST-API und WebSocket
- Dockerisiertes Deployment zur einfachen Wartung und Skalierbarkeit

## 🛡️ Datenschutz und Sicherheit

- Temporäre Speicherung der generierten Bilder
- Einhaltung von DSGVO-Richtlinien
- Keine dauerhafte Speicherung personenbezogener Daten oder Bilder

## 📁 Projektstruktur

```
app/
  ├── components/          # React-Komponenten
  ├── data/               # Daten und Konfigurationen
  │   ├── prompts/        # Prompt-Templates für verschiedene Kategorien
  │   └── workflows/      # ComfyUI Workflow-Konfigurationen
  ├── types/              # TypeScript Typdefinitionen
  ├── api/                # API-Routen
  └── page.tsx            # Hauptseite
```

## 🚀 Getting Started

1. Repository klonen
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```
4. Öffne [http://localhost:3000](http://localhost:3000) im Browser

## 🔧 Technische Voraussetzungen

- Node.js 18.x oder höher
- ComfyUI-Instanz (lokal oder remote)
- Docker (optional, für Container-Deployment)

## 📝 Lizenz

Alle Rechte vorbehalten. Dieses Projekt ist Teil eines Forschungsprojekts der Hochschule Fulda.
