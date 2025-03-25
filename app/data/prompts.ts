import { Category, Style } from "../types/prompts";

export const prompts: Record<
  Category,
  {
    words: string[];
    styles: Record<Style, string>;
  }
> = {
  Tiere: {
    words: [
      "Löwe",
      "Elefant",
      "Giraffe",
      "Pinguin",
      "Delfin",
      "Eule",
      "Schlange",
      "Schmetterling",
      "Hund",
      "Katze",
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi robotic version of a {word}, sleek metallic design, glowing elements, futuristic background, high-tech details, cyberpunk style, masterpiece",
      Fantasy:
        "a magical fantasy version of a {word}, ethereal glow, mystical atmosphere, enchanted forest background, magical particles, fantasy art style, masterpiece",
      Zeichnung:
        "a detailed pencil sketch of a {word}, artistic shading, cross-hatching, professional sketch style, high contrast, masterpiece",
      Comic:
        "a vibrant comic book style {word}, bold outlines, bright colors, dynamic pose, comic art style, pop art influence, masterpiece",
      Realistisch:
        "a hyperrealistic photograph of a {word}, professional wildlife photography, natural lighting, detailed fur/feathers, perfect composition, masterpiece",
    },
  },
  "Fantastische Wesen": {
    words: [
      "Drache",
      "Einhorn",
      "Phoenix",
      "Pegasus",
      "Meerjungfrau",
      "Zentaur",
      "Golem",
      "Gargoyle",
      "Kraken",
      "Hydra",
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi interpretation of a {word}, advanced technology integration, holographic elements, futuristic armor, sci-fi environment, masterpiece",
      Fantasy:
        "a majestic fantasy {word}, magical aura, enchanted surroundings, mystical lighting, fantasy art style, detailed magical elements, masterpiece",
      Zeichnung:
        "an artistic sketch of a {word}, detailed linework, dynamic pose, fantasy sketch style, professional illustration, masterpiece",
      Comic:
        "a comic book style {word}, bold colors, dynamic action pose, comic art style, energetic composition, masterpiece",
      Realistisch:
        "a realistic interpretation of a {word}, detailed textures, natural lighting, professional fantasy art, masterpiece",
    },
  },
  Natur: {
    words: [
      "Berg",
      "Wald",
      "Meer",
      "Wüste",
      "Regenwald",
      "Wasserfall",
      "Vulkan",
      "Aurora Borealis",
      "Korallenriff",
      "Gletscher",
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi version of {word}, technological elements, futuristic environment, glowing effects, sci-fi atmosphere, masterpiece",
      Fantasy:
        "a magical fantasy {word}, enchanted atmosphere, mystical elements, magical lighting, fantasy art style, masterpiece",
      Zeichnung:
        "a detailed nature sketch of {word}, artistic shading, natural textures, professional sketch style, masterpiece",
      Comic:
        "a vibrant comic style {word}, bold colors, dynamic composition, comic art style, energetic presentation, masterpiece",
      Realistisch:
        "a hyperrealistic {word}, professional nature photography, perfect lighting, detailed textures, masterpiece",
    },
  },
  Fahrzeuge: {
    words: [
      "Rakete",
      "U-Boot",
      "Hubschrauber",
      "Zug",
      "Rennwagen",
      "Segelschiff",
      "Flugzeug",
      "Motorrad",
      "Fahrrad",
      "Raumschiff",
    ],
    styles: {
      "Sci-Fi":
        "a futuristic sci-fi {word}, advanced technology, sleek design, glowing elements, sci-fi environment, masterpiece",
      Fantasy:
        "a magical fantasy {word}, enchanted propulsion, mystical elements, fantasy atmosphere, magical details, masterpiece",
      Zeichnung:
        "a detailed technical sketch of a {word}, precise linework, technical details, professional sketch style, masterpiece",
      Comic:
        "a dynamic comic style {word}, bold colors, action pose, comic art style, energetic composition, masterpiece",
      Realistisch:
        "a hyperrealistic {word}, professional automotive photography, perfect lighting, detailed textures, masterpiece",
    },
  },
  Essen: {
    words: [
      "Pizza",
      "Sushi",
      "Eis",
      "Kuchen",
      "Burger",
      "Taco",
      "Pasta",
      "Salat",
      "Sandwich",
      "Donut",
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi interpretation of {word}, molecular gastronomy style, futuristic presentation, glowing elements, sci-fi plating, masterpiece",
      Fantasy:
        "a magical fantasy {word}, enchanted ingredients, mystical presentation, magical effects, fantasy food art, masterpiece",
      Zeichnung:
        "a detailed food sketch of {word}, artistic shading, texture details, professional sketch style, masterpiece",
      Comic:
        "a vibrant comic style {word}, bold colors, appetizing presentation, comic art style, masterpiece",
      Realistisch:
        "a hyperrealistic {word}, professional food photography, perfect lighting, detailed textures, masterpiece",
    },
  },
};
