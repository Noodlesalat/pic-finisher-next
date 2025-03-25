# 📄 **Projektbeschreibung**

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

---

# ✅ **Schritt-für-Schritt Vorgehen**

# Schritt-für-Schritt Umsetzung der React / Next.js App

## 🔧 Schritt 1: Projekt-Setup

- Installiere Node.js: [https://nodejs.org](https://nodejs.org)
- Next.js-Projekt erstellen:

  ```bash
  npx create-next-app@latest my-next-app
  cd my-next-app
  npm run dev
  ```

- Installiere Tailwind CSS: [Anleitung](https://tailwindcss.com/docs/guides/nextjs)

## 📁 Schritt 2: Kategorien & Wörter definieren

- Erstelle `data/categories.json`:
  ```json
  {
    "Tiere": ["Löwe", "Katze", "Hund"],
    "Früchte": ["Apfel", "Banane", "Orange"]
  }
  ```
- Importiere in Komponenten:
  ```jsx
  import categories from "../data/categories.json";
  ```

## 🎰 Schritt 3: Slot-Machine-Animation

- Vorlage verwenden: [CodePen Beispiel](https://codepen.io/mahdiy/pen/KKogoP)
- React-Komponente (`SlotMachine.jsx`) erstellen.

## 🎨 Schritt 4: Canvas zum Zeichnen

- Installiere Canvas:
  ```bash
  npm install react-canvas-draw
  ```
- Canvas-Komponente verwenden:

  ```jsx
  import CanvasDraw from "react-canvas-draw";

  export default function DrawingCanvas() {
    return <CanvasDraw brushRadius={3} canvasWidth={500} canvasHeight={500} />;
  }
  ```

## 📤 Schritt 5: Canvas-Bild in Base64

- Canvas-Bild exportieren:

  ```jsx
  const canvasRef = useRef(null);

  function getCanvasImage() {
    const dataUrl = canvasRef.current.getDataURL("png");
    return dataUrl.replace(/^data:image\/\w+;base64,/, "");
  }
  ```

## 🔌 Schritt 6: API-Anbindung an ComfyUI

- `.env.local` definieren:
  ```env
  COMFYUI_HOST=127.0.0.1
  COMFYUI_PORT=8188
  ```
- API-Route erstellen (`pages/api/generate.js`):

  ```js
  export default async function handler(req, res) {
    const { base64Image } = req.body;
    const workflow = {
      /* Workflow inkl. base64Image */
    };
    const response = await fetch(
      `http://${process.env.COMFYUI_HOST}:${process.env.COMFYUI_PORT}/prompt`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: workflow,
          client_id: "my-next-app-client",
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  }
  ```

## ⏳ Schritt 7: Ladeanimation integrieren

- Loader-Komponente mit Tailwind:
  ```jsx
  export default function Loader() {
    return (
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    );
  }
  ```

## 🖥️ Schritt 8: Ergebnisse darstellen

- Side-by-Side-Komponente:
  ```jsx
  export default function SideBySide({ original, generated }) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <img src={original} alt="Originalzeichnung" />
        <img src={generated} alt="KI-generiertes Bild" />
      </div>
    );
  }
  ```

## 📱 Schritt 9: QR-Code generieren

- QR-Code-Bibliothek installieren:
  ```bash
  npm install qrcode.react
  ```
- QR-Code-Komponente:

  ```jsx
  import { QRCode } from "qrcode.react";

  export default function ResultQR({ url }) {
    return <QRCode value={url} />;
  }
  ```

## 🐳 Schritt 10: Docker Deployment

- `Dockerfile` erstellen:
  ```dockerfile
  FROM node:lts-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build
  CMD ["npm", "start"]
  ```
- `docker-compose.yml` definieren:
  ```yaml
  version: "3.8"
  services:
    nextjs-app:
      build: .
      ports:
        - "3000:3000"
      environment:
        - COMFYUI_HOST=your-comfyui-ip
        - COMFYUI_PORT=8188
  ```
- App starten:
  ```bash
  docker-compose up --build
  ```

## 🔒 Schritt 11: Datenschutz beachten

- Temporäre Speicherung der Bilder sicherstellen
- Regelmäßige automatische Löschung einrichten
