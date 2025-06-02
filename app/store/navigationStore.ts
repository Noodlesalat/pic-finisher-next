import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, Style, Background } from "../types/prompts";

interface Word {
  display: string;
  prompt: string;
}

interface NavigationStore {
  // Slot Machine und Word Daten
  selectedWord: Word | null;
  selectedCategory: Category | null;

  // Drawing Daten
  selectedStyle: Style;
  selectedBackground: Background;

  // Generation Status
  isGenerating: boolean;
  error: string;

  // Aktionen
  setSelectedWord: (word: Word) => void;
  setSelectedCategory: (category: Category) => void;
  setSelectedStyle: (style: Style) => void;
  setSelectedBackground: (background: Background) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setError: (error: string) => void;
  reset: () => void;
}

const DEFAULT_BACKGROUND: Background = {
  type: "white",
  name: "Weiß",
  value: "#FFFFFF",
};

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      // Initialer Zustand
      selectedWord: null,
      selectedCategory: null,
      selectedStyle: "Realistisch",
      selectedBackground: DEFAULT_BACKGROUND,
      isGenerating: false,
      error: "",

      // Aktionen
      setSelectedWord: (word) => set({ selectedWord: word }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedStyle: (style) => set({ selectedStyle: style }),
      setSelectedBackground: (background) =>
        set({ selectedBackground: background }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setError: (error) => set({ error }),
      reset: () =>
        set({
          selectedWord: null,
          selectedCategory: null,
          selectedStyle: "Realistisch",
          selectedBackground: DEFAULT_BACKGROUND,
          isGenerating: false,
          error: "",
        }),
    }),
    {
      name: "navigation-store",
      // Nur wichtige Daten persistieren, nicht den loading state
      partialize: (state) => ({
        selectedWord: state.selectedWord,
        selectedCategory: state.selectedCategory,
        selectedStyle: state.selectedStyle,
        selectedBackground: state.selectedBackground,
      }),
    }
  )
);
