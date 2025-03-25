import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const backgroundsDir = path.join(process.cwd(), "public", "backgrounds");
    const files = fs.readdirSync(backgroundsDir);

    const backgrounds = files
      .filter(
        (file) =>
          file.endsWith(".png") ||
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg")
      )
      .map((file) => `/backgrounds/${file}`);

    return NextResponse.json(backgrounds);
  } catch (error) {
    console.error("Fehler beim Lesen der Hintergrundbilder:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Hintergrundbilder" },
      { status: 500 }
    );
  }
}
