import { NextResponse } from "next/server";
import fluxWorkflow from "../../../data/workflows/flux-workflow.json";
import prompts from "../../../data/prompts.json";
import { Category, Style } from "../../types/prompts";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

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

    ws.on("message", (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());

        if (
          message.type === "executing" &&
          message.data.prompt_id === promptId
        ) {
          if (message.data.node === null) {
            ws.close();
            resolve(currentOutput);
          }
        }
      } catch {
        // Wenn die Nachricht kein JSON ist, handelt es sich um Bilddaten
        if (data.length > 8) {
          currentOutput = data.slice(8); // Entferne die ersten 8 Bytes (Header)
        }
      }
    });

    ws.on("error", (error: Error) => {
      reject(error);
    });

    // Timeout nach 30 Sekunden
    setTimeout(() => {
      ws.close();
      reject(new Error("Timeout beim Warten auf Bilddaten"));
    }, 30000);
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
    const promptTemplate = prompts[category][style];
    const prompt = promptTemplate.replace("{word}", word);

    // Aktualisiere den Text-Prompt
    workflow["19"].inputs.text = prompt;

    // Formatiere und setze das Base64-Bild
    const formattedImage = formatBase64Image(base64Image);
    workflow["29"].inputs.image = formattedImage;

    // Aktualisiere den Noise-Seed für Variation
    workflow["23"].inputs.noise_seed = Math.floor(Math.random() * 1000000);

    // Queue den Prompt und hole die Prompt-ID
    const { prompt_id } = await queuePrompt(workflow, clientId);

    // Verbinde mit dem WebSocket
    const ws = new WebSocket(
      `ws://${process.env.COMFYUI_HOST}:${process.env.COMFYUI_PORT}/ws?clientId=${clientId}`
    );

    // Warte auf die Bilddaten
    const imageData = await getImages(ws, prompt_id);

    if (!imageData) {
      throw new Error("Keine Bilddaten erhalten");
    }

    // Konvertiere die Bilddaten zu Base64
    const base64ImageData = imageData.toString("base64");
    const imageUrl = `data:image/png;base64,${base64ImageData}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
