export type Style =
  | "Sci-Fi"
  | "Fantasy"
  | "Zeichnung"
  | "Comic"
  | "Realistisch"
  | "Öl-Gemälde"
  | "Aquarell"
  | "Pixel Art";
export type Category =
  | "Tiere"
  | "Fantastische Wesen"
  | "Natur"
  | "Fahrzeuge"
  | "Essen";

export type BackgroundType = "white" | "black" | "custom";

export interface Background {
  type: BackgroundType;
  name: string;
  value: string;
}

export type StylePrompts = Record<Style, string>;
export type CategoryPrompts = Record<Category, StylePrompts>;
