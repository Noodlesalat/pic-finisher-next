import { create } from "zustand";

interface GeneratedImageState {
  generatedImage: string | null;
  setGeneratedImage: (image: string) => void;
  clearGeneratedImage: () => void;
}

export const useGeneratedImageStore = create<GeneratedImageState>()((set) => ({
  generatedImage: null,
  setGeneratedImage: (image: string) => set({ generatedImage: image }),
  clearGeneratedImage: () => set({ generatedImage: null }),
}));
