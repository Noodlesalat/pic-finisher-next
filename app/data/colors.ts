export interface Color {
  name: string;
  value: string;
}

// Hilfsfunktion: HEX zu HSL Konvertierung
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Entferne # falls vorhanden
  const cleanHex = hex.replace("#", "");

  // Konvertiere zu RGB
  const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
  const b = parseInt(cleanHex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number;
  let s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Graustufen
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Funktion zum Sortieren der Farben nach Farbton
function sortColorsByHue(colors: Color[]): Color[] {
  return [...colors].sort((a, b) => {
    // Schwarz und Weiß sollen am Anfang bleiben
    if (a.value === "#000000") return -1;
    if (b.value === "#000000") return 1;
    if (a.value === "#FFFFFF") return -1;
    if (b.value === "#FFFFFF") return 1;

    const hslA = hexToHsl(a.value);
    const hslB = hexToHsl(b.value);

    // Sortiere nach Hue-Wert
    return hslA.h - hslB.h;
  });
}

export const STANDARD_COLORS: Color[] = [
  // Basics - Schwarz und Weiß als feste Werte
  { name: "Schwarz", value: "#000000" },
  { name: "Weiß", value: "#FFFFFF" },

  // Primärfarben
  { name: "Rot", value: "#FF0000" },
  { name: "Grün", value: "#00FF00" },
  { name: "Blau", value: "#0000FF" },

  // Sekundärfarben
  { name: "Gelb", value: "#FFFF00" },
  { name: "Magenta", value: "#FF00FF" },
  { name: "Cyan", value: "#00FFFF" },

  // Häufig verwendete Farben
  { name: "Orange", value: "#FFA500" },
  { name: "Lila", value: "#800080" },
  { name: "Pink", value: "#FFC0CB" },
  { name: "Braun", value: "#A52A2A" },

  // Grautöne
  { name: "Hellgrau", value: "#D3D3D3" },
  { name: "Grau", value: "#808080" },
  { name: "Dunkelgrau", value: "#404040" },

  // Naturtöne
  { name: "Waldgrün", value: "#228B22" },
  { name: "Himmelblau", value: "#87CEEB" },
  { name: "Sonnengelb", value: "#FFD700" },

  // Pastellfarben
  { name: "Hellrosa", value: "#FFB6C1" },
  { name: "Hellblau", value: "#ADD8E6" },
  { name: "Hellgrün", value: "#90EE90" },
  { name: "Lavendel", value: "#E6E6FA" },

  // Dunkle Farben
  { name: "Dunkelrot", value: "#8B0000" },
  { name: "Dunkelblau", value: "#000080" },
  { name: "Dunkelgrün", value: "#006400" },
];

// Exportiere die nach Farbton sortierte Liste
export const SORTED_STANDARD_COLORS = sortColorsByHue(STANDARD_COLORS);
