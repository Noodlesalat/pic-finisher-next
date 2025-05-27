import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const OUTPUT_DIR = path.join(process.cwd(), "public", "out");
const PUBLIC_URL_PREFIX = "/out/";

interface ParsedFilename {
  dateTime: string;
  prompt: string;
  type: "original" | "ai";
  filename: string;
}

interface ExplorerImageGroup {
  id: string;
  dateTime: string;
  prompt: string;
  originalUrl?: string;
  aiUrl?: string;
}

function parseFilename(filename: string): ParsedFilename | null {
  const regex =
    /^(\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}) - (.*) - (original|ai)\.jpg$/;
  const match = filename.match(regex);
  if (!match) return null;
  return {
    dateTime: match[1],
    prompt: match[2].replace(/_/g, " "), // Unterstriche wieder in Leerzeichen
    type: match[3] as "original" | "ai",
    filename: filename,
  };
}

export async function GET() {
  try {
    // Sicherstellen, dass das Verzeichnis existiert
    try {
      await fs.access(OUTPUT_DIR);
    } catch {
      await fs.mkdir(OUTPUT_DIR, { recursive: true });
      return NextResponse.json([]); // Leeres Array, wenn Verzeichnis noch nicht existiert
    }

    const files = await fs.readdir(OUTPUT_DIR);
    const parsedFiles: ParsedFilename[] = [];

    for (const file of files) {
      if (file.endsWith(".jpg")) {
        const parsed = parseFilename(file);
        if (parsed) {
          parsedFiles.push(parsed);
        }
      }
    }

    const groups: Record<string, Partial<ExplorerImageGroup>> = {};

    for (const pf of parsedFiles) {
      const groupId = `${pf.dateTime} - ${pf.prompt.replace(/\s/g, "_")}`;
      if (!groups[groupId]) {
        groups[groupId] = {
          id: groupId,
          dateTime: pf.dateTime,
          prompt: pf.prompt,
        };
      }
      if (pf.type === "original") {
        groups[groupId].originalUrl = `${PUBLIC_URL_PREFIX}${pf.filename}`;
      } else if (pf.type === "ai") {
        groups[groupId].aiUrl = `${PUBLIC_URL_PREFIX}${pf.filename}`;
      }
    }

    // Sortieren nach Datum absteigend (neueste zuerst)
    const result: ExplorerImageGroup[] = Object.values(groups)
      .filter((g) => g.id && g.dateTime && g.prompt)
      .map((g) => g as ExplorerImageGroup)
      .sort((a, b) => {
        // Einfacher lexikographischer Vergleich
        return b.dateTime.localeCompare(a.dateTime);
      });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Fehler beim Laden der Explorer-Bilder:", error);
    return NextResponse.json(
      { error: "Bilder konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
