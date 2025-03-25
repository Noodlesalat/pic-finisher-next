export type Style =
  | "Sci-Fi"
  | "Fantasy"
  | "Zeichnung"
  | "Comic"
  | "Realistisch";
export type Category =
  | "Tiere"
  | "Fantastische Wesen"
  | "Natur"
  | "Fahrzeuge"
  | "Essen";

export type StylePrompts = Record<Style, string>;
export type CategoryPrompts = Record<Category, StylePrompts>;
