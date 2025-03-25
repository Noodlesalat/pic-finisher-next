import { create } from "zustand";

interface DrawingState {
  drawing: string | null;
  setDrawing: (drawing: string) => void;
  clearDrawing: () => void;
}

export const useDrawingStore = create<DrawingState>()((set) => ({
  drawing: null,
  setDrawing: (drawing: string) => set({ drawing }),
  clearDrawing: () => set({ drawing: null }),
}));
