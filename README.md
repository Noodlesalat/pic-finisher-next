This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Konzept und Vorgehen der React / Next.js Anwendung

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

## 🖌️ Auswahl verschiedener KI-Zeichenstile

Die Anwendung bietet zusätzlich die Möglichkeit, verschiedene **KI-Zeichenstile** auszuwählen, in denen das gemalte Bild durch ComfyUI generiert wird. Beispiele hierfür sind:

- Sci-Fi
- Fantasy
- Zeichnung (Sketch)
- Comic
- Realistisch

Je nach gewähltem Stil werden automatisch:

- Der Text-Prompt angepasst, um den Zeichenstil deutlich hervorzuheben.
- Der ComfyUI-Workflow dynamisch aktualisiert, inklusive der Nutzung spezieller Lora-Modelle oder zusätzlicher Prompt-Erweiterungen (definiert in der bereitgestellten JSON-Datei).
- Denoise-Stärke und andere Parameter angepasst, um den gewünschten Effekt optimal umzusetzen.

Dadurch entstehen individuell gestaltete Bilder, die die Kreativität und Fantasie der jungen Nutzer zusätzlich fördern.

## 🎨 Gestaltung und UX

- Professionelles, modernes und dennoch kinderfreundliches Design
- Integration des Logos der Hochschule Fulda
- Nutzung von ansprechenden UI-Animationen, Loaders und Skeletons zur verbesserten User Experience
- Intuitive und klare Benutzeroberfläche für junge Nutzergruppen

## 🔧 Technische Umsetzung

- React & Next.js als Haupttechnologien
- Tailwind CSS zur schnellen und effizienten Gestaltung des UI
- Nutzung eines bestehenden ComfyUI-Workflows (bereitgestellt als JSON-Datei)
- Kommunikation zwischen Frontend und ComfyUI via REST-API
- Dockerisiertes Deployment zur einfachen Wartung und Skalierbarkeit der Anwendung

## 🛡️ Datenschutz und Sicherheit

- Temporäre Speicherung der generierten Bilder
- Einhaltung von DSGVO-Richtlinien, keine dauerhafte Speicherung personenbezogener Daten oder Bilder

Das Projekt ist modular aufgebaut und so gestaltet, dass es leicht wartbar, skalierbar und erweiterbar ist.
