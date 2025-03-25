import { Category, Style } from "../types/prompts";

export const prompts: Record<
  Category,
  {
    words: Array<{
      display: string;
      prompt: string;
    }>;
    styles: Record<Style, string>;
  }
> = {
  Tiere: {
    words: [
      { display: "Löwe", prompt: "lion" },
      { display: "Elefant", prompt: "elephant" },
      { display: "Giraffe", prompt: "giraffe" },
      { display: "Pinguin", prompt: "penguin" },
      { display: "Delfin", prompt: "dolphin" },
      { display: "Eule", prompt: "owl" },
      { display: "Schlange", prompt: "snake" },
      { display: "Schmetterling", prompt: "butterfly" },
      { display: "Hund", prompt: "dog" },
      { display: "Katze", prompt: "cat" },
      { display: "Tiger", prompt: "tiger" },
      { display: "Panda", prompt: "panda" },
      { display: "Adler", prompt: "eagle" },
      { display: "Fuchs", prompt: "fox" },
      { display: "Wolf", prompt: "wolf" },
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi robotic version of a {word}, sleek metallic design, glowing elements, futuristic background, high-tech details, cyberpunk style, masterpiece, high quality, detailed, 8k",
      Fantasy:
        "a magical fantasy version of a {word}, ethereal glow, mystical atmosphere, enchanted forest background, magical particles, fantasy art style, masterpiece, high quality, detailed, 8k",
      Zeichnung:
        "a detailed pencil sketch of a {word}, artistic shading, cross-hatching, professional sketch style, high contrast, masterpiece, high quality, detailed, 8k",
      Comic:
        "a vibrant comic book style {word}, bold outlines, bright colors, dynamic pose, comic art style, pop art influence, masterpiece, high quality, detailed, 8k",
      Realistisch:
        "a hyperrealistic photograph of a {word}, professional wildlife photography, natural lighting, detailed fur/feathers, perfect composition, masterpiece, high quality, detailed, 8k",
      "Öl-Gemälde":
        "an oil painting of a {word}, rich textures, vibrant colors, artistic brushstrokes, masterpiece, high quality, detailed, 8k",
      Aquarell:
        "a watercolor painting of a {word}, soft colors, flowing textures, artistic style, masterpiece, high quality, detailed, 8k",
      "Pixel Art":
        "a pixel art version of a {word}, retro gaming style, 8-bit graphics, nostalgic feel, masterpiece, high quality, detailed, 8k",
    },
  },
  "Fantastische Wesen": {
    words: [
      { display: "Drache", prompt: "dragon" },
      { display: "Einhorn", prompt: "unicorn" },
      { display: "Phoenix", prompt: "phoenix" },
      { display: "Pegasus", prompt: "pegasus" },
      { display: "Meerjungfrau", prompt: "mermaid" },
      { display: "Zentaur", prompt: "centaur" },
      { display: "Golem", prompt: "golem" },
      { display: "Gargoyle", prompt: "gargoyle" },
      { display: "Kraken", prompt: "kraken" },
      { display: "Hydra", prompt: "hydra" },
      { display: "Griffin", prompt: "griffin" },
      { display: "Chimäre", prompt: "chimera" },
      { display: "Basilisk", prompt: "basilisk" },
      { display: "Wyvern", prompt: "wyvern" },
      { display: "Minotaurus", prompt: "minotaur" },
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi interpretation of a {word}, advanced technology integration, holographic elements, futuristic armor, sci-fi environment, masterpiece, high quality, detailed, 8k",
      Fantasy:
        "a majestic fantasy {word}, magical aura, enchanted surroundings, mystical lighting, fantasy art style, detailed magical elements, masterpiece, high quality, detailed, 8k",
      Zeichnung:
        "an artistic sketch of a {word}, detailed linework, dynamic pose, fantasy sketch style, professional illustration, masterpiece, high quality, detailed, 8k",
      Comic:
        "a comic book style {word}, bold colors, dynamic action pose, comic art style, energetic composition, masterpiece, high quality, detailed, 8k",
      Realistisch:
        "a realistic interpretation of a {word}, detailed textures, natural lighting, professional fantasy art, masterpiece, high quality, detailed, 8k",
      "Öl-Gemälde":
        "an oil painting of a {word}, rich textures, vibrant colors, artistic brushstrokes, masterpiece, high quality, detailed, 8k",
      Aquarell:
        "a watercolor painting of a {word}, soft colors, flowing textures, artistic style, masterpiece, high quality, detailed, 8k",
      "Pixel Art":
        "a pixel art version of a {word}, retro gaming style, 8-bit graphics, nostalgic feel, masterpiece, high quality, detailed, 8k",
    },
  },
  Natur: {
    words: [
      { display: "Berg", prompt: "mountain" },
      { display: "Wald", prompt: "forest" },
      { display: "Meer", prompt: "ocean" },
      { display: "Wüste", prompt: "desert" },
      { display: "Regenwald", prompt: "rainforest" },
      { display: "Wasserfall", prompt: "waterfall" },
      { display: "Vulkan", prompt: "volcano" },
      { display: "Aurora Borealis", prompt: "aurora borealis" },
      { display: "Korallenriff", prompt: "coral reef" },
      { display: "Gletscher", prompt: "glacier" },
      { display: "Canyon", prompt: "canyon" },
      { display: "Savanne", prompt: "savanna" },
      { display: "Tundra", prompt: "tundra" },
      { display: "Mangroven", prompt: "mangrove forest" },
      { display: "Steppe", prompt: "steppe" },
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi version of {word}, technological elements, futuristic environment, glowing effects, sci-fi atmosphere, masterpiece, high quality, detailed, 8k",
      Fantasy:
        "a magical fantasy {word}, enchanted atmosphere, mystical elements, magical lighting, fantasy art style, masterpiece, high quality, detailed, 8k",
      Zeichnung:
        "a detailed nature sketch of {word}, artistic shading, natural textures, professional sketch style, masterpiece, high quality, detailed, 8k",
      Comic:
        "a vibrant comic style {word}, bold colors, dynamic composition, comic art style, energetic presentation, masterpiece, high quality, detailed, 8k",
      Realistisch:
        "a hyperrealistic {word}, professional nature photography, perfect lighting, detailed textures, masterpiece, high quality, detailed, 8k",
      "Öl-Gemälde":
        "an oil painting of a {word}, rich textures, vibrant colors, artistic brushstrokes, masterpiece, high quality, detailed, 8k",
      Aquarell:
        "a watercolor painting of a {word}, soft colors, flowing textures, artistic style, masterpiece, high quality, detailed, 8k",
      "Pixel Art":
        "a pixel art version of a {word}, retro gaming style, 8-bit graphics, nostalgic feel, masterpiece, high quality, detailed, 8k",
    },
  },
  Fahrzeuge: {
    words: [
      { display: "Rakete", prompt: "rocket" },
      { display: "U-Boot", prompt: "submarine" },
      { display: "Hubschrauber", prompt: "helicopter" },
      { display: "Zug", prompt: "train" },
      { display: "Rennwagen", prompt: "race car" },
      { display: "Segelschiff", prompt: "sailing ship" },
      { display: "Flugzeug", prompt: "airplane" },
      { display: "Motorrad", prompt: "motorcycle" },
      { display: "Fahrrad", prompt: "bicycle" },
      { display: "Raumschiff", prompt: "spaceship" },
      { display: "Dampfschiff", prompt: "steamship" },
      { display: "Heißluftballon", prompt: "hot air balloon" },
      { display: "Gleitschirm", prompt: "paraglider" },
      { display: "Skateboard", prompt: "skateboard" },
      { display: "Segelboot", prompt: "sailboat" },
    ],
    styles: {
      "Sci-Fi":
        "a futuristic sci-fi {word}, advanced technology, sleek design, glowing elements, sci-fi environment, masterpiece, high quality, detailed, 8k",
      Fantasy:
        "a magical fantasy {word}, enchanted propulsion, mystical elements, fantasy atmosphere, magical details, masterpiece, high quality, detailed, 8k",
      Zeichnung:
        "a detailed technical sketch of a {word}, precise linework, technical details, professional sketch style, masterpiece, high quality, detailed, 8k",
      Comic:
        "a dynamic comic style {word}, bold colors, action pose, comic art style, energetic composition, masterpiece, high quality, detailed, 8k",
      Realistisch:
        "a hyperrealistic {word}, professional automotive photography, perfect lighting, detailed textures, masterpiece, high quality, detailed, 8k",
      "Öl-Gemälde":
        "an oil painting of a {word}, rich textures, vibrant colors, artistic brushstrokes, masterpiece, high quality, detailed, 8k",
      Aquarell:
        "a watercolor painting of a {word}, soft colors, flowing textures, artistic style, masterpiece, high quality, detailed, 8k",
      "Pixel Art":
        "a pixel art version of a {word}, retro gaming style, 8-bit graphics, nostalgic feel, masterpiece, high quality, detailed, 8k",
    },
  },
  Essen: {
    words: [
      { display: "Pizza", prompt: "pizza" },
      { display: "Sushi", prompt: "sushi" },
      { display: "Eis", prompt: "ice cream" },
      { display: "Kuchen", prompt: "cake" },
      { display: "Burger", prompt: "burger" },
      { display: "Taco", prompt: "taco" },
      { display: "Pasta", prompt: "pasta" },
      { display: "Salat", prompt: "salad" },
      { display: "Sandwich", prompt: "sandwich" },
      { display: "Donut", prompt: "donut" },
      { display: "Croissant", prompt: "croissant" },
      { display: "Sushi-Rolle", prompt: "sushi roll" },
      { display: "Schokolade", prompt: "chocolate" },
      { display: "Obstkorb", prompt: "fruit basket" },
      { display: "Käseplatte", prompt: "cheese platter" },
    ],
    styles: {
      "Sci-Fi":
        "a sci-fi interpretation of {word}, molecular gastronomy style, futuristic presentation, glowing elements, sci-fi plating, masterpiece, high quality, detailed, 8k",
      Fantasy:
        "a magical fantasy {word}, enchanted ingredients, mystical presentation, magical effects, fantasy food art, masterpiece, high quality, detailed, 8k",
      Zeichnung:
        "a detailed food sketch of {word}, artistic shading, texture details, professional sketch style, masterpiece, high quality, detailed, 8k",
      Comic:
        "a vibrant comic style {word}, bold colors, appetizing presentation, comic art style, masterpiece, high quality, detailed, 8k",
      Realistisch:
        "a hyperrealistic {word}, professional food photography, perfect lighting, detailed textures, masterpiece, high quality, detailed, 8k",
      "Öl-Gemälde":
        "an oil painting of a {word}, rich textures, vibrant colors, artistic brushstrokes, masterpiece, high quality, detailed, 8k",
      Aquarell:
        "a watercolor painting of a {word}, soft colors, flowing textures, artistic style, masterpiece, high quality, detailed, 8k",
      "Pixel Art":
        "a pixel art version of a {word}, retro gaming style, 8-bit graphics, nostalgic feel, masterpiece, high quality, detailed, 8k",
    },
  },
};
