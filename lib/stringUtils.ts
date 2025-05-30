export function sanitizePromptForFilename(prompt: string): string {
  return prompt
    .replace(/\s+/g, "_") // Leerzeichen durch Unterstriche ersetzen
    .replace(/[\\/:*?"<>|]/g, "") // Ungültige Zeichen entfernen
    .substring(0, 100); // Begrenzen der Länge
}
