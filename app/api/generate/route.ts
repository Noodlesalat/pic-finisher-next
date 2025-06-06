import { NextResponse } from "next/server";
import fluxWorkflow from "../../data/flux-workflow.json";
import { prompts } from "../../data/prompts";
import { Category, Style } from "../../types/prompts";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { getFormattedDateTime } from "../../../lib/dateUtils";
import { sanitizePromptForFilename } from "../../../lib/stringUtils";

interface GenerateRequest {
  base64Image: string;
  word: string;
  category: Category;
  style: Style;
}

interface ComfyUIWorkflowInputs {
  text?: string;
  image?: string;
  noise_seed?: number;
  [key: string]: unknown;
}

interface ComfyUIWorkflow {
  [key: string]: {
    inputs: ComfyUIWorkflowInputs;
  };
}

// Hilfsfunktion zum Korrigieren des Base64-Paddings
function fixBase64Padding(base64String: string): string {
  const padding = base64String.length % 4;
  if (padding) {
    return base64String + "=".repeat(4 - padding);
  }
  return base64String;
}

// Hilfsfunktion zum Speichern beider Bilder mit demselben Zeitstempel
async function saveBothImages(
  originalBase64: string,
  aiBase64: string,
  prompt: string
) {
  try {
    const OUTPUT_DIR = path.join(process.cwd(), "public", "out");

    // Stelle sicher, dass das Verzeichnis existiert
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Generiere Zeitstempel und Dateinamen
    const dateTime = getFormattedDateTime();
    const sanitizedPrompt = sanitizePromptForFilename(prompt);

    const originalFilename = `${dateTime} - ${sanitizedPrompt} - original.jpg`;
    const aiFilename = `${dateTime} - ${sanitizedPrompt} - ai.jpg`;

    const originalFilePath = path.join(OUTPUT_DIR, originalFilename);
    const aiFilePath = path.join(OUTPUT_DIR, aiFilename);

    // Speichere Originalbild
    const originalBase64Data = originalBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    const originalImageBuffer = Buffer.from(originalBase64Data, "base64");
    await fs.writeFile(originalFilePath, originalImageBuffer);

    // Speichere KI-Bild
    const aiImageBuffer = Buffer.from(aiBase64, "base64");
    await fs.writeFile(aiFilePath, aiImageBuffer);

    console.log(`Bilder gespeichert: ${originalFilename} und ${aiFilename}`);
  } catch (error) {
    console.error("Fehler beim Speichern der Bilder:", error);
    // Fehler nicht weiterwerfen, da das Speichern optional ist
  }
}

// Hilfsfunktion zum Validieren und Formatieren des Base64-Bildes
function formatBase64Image(base64String: string): string {
  // Entferne mögliche Data-URL-Präfixe
  const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, "");

  // Stelle sicher, dass der String nur gültige Base64-Zeichen enthält
  const validBase64 = cleanBase64.replace(/[^A-Za-z0-9+/]/g, "");

  // Korrigiere das Padding
  return fixBase64Padding(validBase64);
}

async function queuePrompt(workflow: ComfyUIWorkflow, clientId: string) {
  const comfyuiUrl = `http://${process.env.COMFYUI_HOST}:${process.env.COMFYUI_PORT}/prompt`;
  const response = await fetch(comfyuiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: workflow,
      client_id: clientId,
    }),
  });

  if (!response.ok) {
    throw new Error(`ComfyUI API error: ${response.statusText}`);
  }

  return response.json();
}

async function getImages(
  ws: WebSocket,
  promptId: string
): Promise<Buffer | null> {
  return new Promise((resolve, reject) => {
    let currentOutput: Buffer | null = null;
    let isExecutionComplete = false;

    ws.on("message", (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());

        if (
          message.type === "executing" &&
          message.data.prompt_id === promptId
        ) {
          if (message.data.node === null && currentOutput) {
            isExecutionComplete = true;
            ws.close();
            resolve(currentOutput);
          }
        }
      } catch {
        // Wenn die Nachricht kein JSON ist, handelt es sich um Bilddaten
        if (data.length > 8) {
          currentOutput = data.slice(8); // Entferne die ersten 8 Bytes (Header)
          if (isExecutionComplete) {
            ws.close();
            resolve(currentOutput);
          }
        }
      }
    });

    ws.on("error", (error: Error) => {
      console.error("WebSocket error:", error);
      reject(error);
    });

    // Timeout nach 60 Sekunden
    setTimeout(() => {
      ws.close();
      reject(new Error("Timeout beim Warten auf Bilddaten"));
    }, 60000);
  });
}

export async function POST(request: Request) {
  try {
    const { base64Image, word, category, style } =
      (await request.json()) as GenerateRequest;
    const clientId = uuidv4();

    // Kopiere den Workflow und aktualisiere die notwendigen Werte
    const workflow = JSON.parse(
      JSON.stringify(fluxWorkflow)
    ) as ComfyUIWorkflow;

    // Hole den vordefinierten Prompt für die Kategorie und den Stil
    const promptTemplate = prompts[category].styles[style];
    const prompt = promptTemplate.replace("{word}", word);

    // Aktualisiere den Text-Prompt
    workflow["19"].inputs.text = prompt;

    // Formatiere und setze das Base64-Bild
    const formattedImage = formatBase64Image(base64Image);
    workflow["29"].inputs.image = formattedImage;

    // Aktualisiere den Noise-Seed für Variation
    workflow["23"].inputs.noise_seed = Math.floor(Math.random() * 1000000);

    const { prompt_id } = await queuePrompt(workflow, clientId);

    // Verbinde mit dem WebSocket
    const ws = new WebSocket(
      `ws://${process.env.COMFYUI_HOST}:${process.env.COMFYUI_PORT}/ws?clientId=${clientId}`
    );

    // Warte auf die Verbindung
    await new Promise<void>((resolve) => {
      ws.on("open", () => resolve());
    });

    const imageData = await getImages(ws, prompt_id);

    if (!imageData) {
      throw new Error("Keine Bilddaten erhalten");
    }

    // Konvertiere die Bilddaten zu Base64
    const base64ImageData = imageData.toString("base64");

    // Validiere das Base64-Format
    if (!base64ImageData || base64ImageData.length === 0) {
      throw new Error("Ungültige Base64-Bilddaten");
    }

    // Speichere beide Bilder mit demselben Zeitstempel
    await saveBothImages(base64Image, base64ImageData, word);

    return NextResponse.json({ imageUrl: base64ImageData });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
