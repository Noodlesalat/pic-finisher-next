"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category, Style, Background, AVAILABLE_STYLES } from "./types/prompts";
import { WordTransition } from "./components/WordTransition";
import { CategorySelection } from "./components/pages/CategorySelection";
import { DrawingSection } from "./components/pages/DrawingSection";
import { ResultSection } from "./components/pages/ResultSection";
import { Navigation } from "./components/pages/Navigation";
import { useDrawingStore } from "./store/drawingStore";
import { useGeneratedImageStore } from "./store/generatedImageStore";
import { RotateCcw, ArrowLeft } from "lucide-react";

type Step = "category" | "drawing" | "result";

interface Word {
  display: string;
  prompt: string;
}

interface NavigationState {
  step: Step;
  isSlotMachineActive: boolean;
  isTransitionActive: boolean;
  selectedWord: Word | null;
  selectedCategory: Category | null;
  selectedStyle: Style;
  selectedBackground: Background;
  drawing: string;
  generatedImage: string;
  isGenerating: boolean;
  error: string;
}

const DEFAULT_BACKGROUND: Background = {
  type: "white",
  name: "Weiß",
  value: "#FFFFFF",
};

export default function Home() {
  const [navigation, setNavigation] = useState<NavigationState>({
    step: "category",
    isSlotMachineActive: false,
    isTransitionActive: false,
    selectedWord: null,
    selectedCategory: null,
    selectedStyle: "Realistisch",
    selectedBackground: DEFAULT_BACKGROUND,
    drawing: "",
    generatedImage: "",
    isGenerating: false,
    error: "",
  });

  const handleSlotMachineComplete = (word: Word, category: Category) => {
    console.log("SlotMachine complete:", word, category);
    setNavigation((prev) => ({
      ...prev,
      selectedWord: word,
      selectedCategory: category,
      isSlotMachineActive: false,
      isTransitionActive: true,
    }));
  };

  const handleTransitionComplete = () => {
    console.log("Transition complete");
    setNavigation((prev) => ({
      ...prev,
      step: "drawing",
      isTransitionActive: false,
    }));
  };

  const handleDrawingComplete = async (
    base64Image: string,
    styleOverride?: Style
  ) => {
    if (!navigation.selectedCategory || !navigation.selectedWord) return;

    setNavigation((prev) => ({
      ...prev,
      drawing: base64Image,
      isGenerating: true,
      error: "",
    }));

    try {
      console.log("Sending drawing to API...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image,
          word: navigation.selectedWord.prompt,
          category: navigation.selectedCategory,
          style: styleOverride || navigation.selectedStyle,
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler bei der Bildgenerierung");
      }

      const data = await response.json();
      console.log(
        "Received response from API, image length:",
        data.imageUrl?.length
      );

      if (!data.imageUrl) {
        throw new Error("Keine Bilddaten in der Antwort");
      }

      setNavigation((prev) => ({
        ...prev,
        generatedImage: data.imageUrl,
        step: "result",
        isGenerating: false,
      }));
    } catch (err) {
      console.error("Generation error:", err);
      setNavigation((prev) => ({
        ...prev,
        error:
          "Es gab einen Fehler bei der Bildgenerierung. Bitte versuche es erneut.",
        isGenerating: false,
      }));
    }
  };

  const handleRedrawImage = async () => {
    setNavigation((prev) => ({
      ...prev,
      isGenerating: true,
      error: "",
    }));

    await handleDrawingComplete(navigation.drawing, navigation.selectedStyle);
  };

  const handleReset = () => {
    const { clearDrawing } = useDrawingStore.getState();
    const { clearGeneratedImage } = useGeneratedImageStore.getState();

    clearDrawing();
    clearGeneratedImage();

    setNavigation({
      step: "category",
      isSlotMachineActive: false,
      isTransitionActive: false,
      selectedWord: null,
      selectedCategory: null,
      selectedStyle: "Realistisch",
      selectedBackground: DEFAULT_BACKGROUND,
      drawing: "",
      generatedImage: "",
      isGenerating: false,
      error: "",
    });
  };

  const handleBack = () => {
    const { clearDrawing } = useDrawingStore.getState();
    const { clearGeneratedImage } = useGeneratedImageStore.getState();

    if (navigation.step === "drawing") {
      clearDrawing();
    }
    if (navigation.step === "result") {
      clearGeneratedImage();
    }

    setNavigation((prev) => ({
      ...prev,
      step: prev.step === "result" ? "drawing" : "category",
      isSlotMachineActive: false,
    }));
  };

  return (
    <main className="min-h-screen">
      <WordTransition
        isVisible={navigation.isTransitionActive}
        word={navigation.selectedWord || { display: "", prompt: "" }}
        onTransitionComplete={handleTransitionComplete}
      />

      <div className="max-w-6xl mx-auto p-8">
        <Navigation />

        <AnimatePresence mode="wait">
          <motion.div
            key={navigation.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {navigation.step === "category" && (
              <CategorySelection
                selectedCategory={navigation.selectedCategory}
                isSlotMachineActive={navigation.isSlotMachineActive}
                onCategorySelect={(category) =>
                  setNavigation((prev) => ({
                    ...prev,
                    isSlotMachineActive: true,
                    selectedCategory: category,
                  }))
                }
                onSlotMachineComplete={handleSlotMachineComplete}
              />
            )}

            {navigation.step === "drawing" && navigation.selectedWord && (
              <DrawingSection
                selectedWord={navigation.selectedWord}
                selectedStyle={navigation.selectedStyle}
                selectedBackground={navigation.selectedBackground}
                onStyleChange={(style) =>
                  setNavigation((prev) => ({
                    ...prev,
                    selectedStyle: style,
                  }))
                }
                onBackgroundChange={(background) =>
                  setNavigation((prev) => ({
                    ...prev,
                    selectedBackground: background,
                  }))
                }
                onDrawingComplete={handleDrawingComplete}
                isGenerating={navigation.isGenerating}
              />
            )}

            {navigation.step === "result" && (
              <ResultSection
                drawing={navigation.drawing}
                generatedImage={navigation.generatedImage}
                currentStyle={navigation.selectedStyle}
                availableStyles={AVAILABLE_STYLES}
                isGenerating={navigation.isGenerating}
                selectedWord={navigation.selectedWord!}
                onStyleChange={(style: Style) => {
                  setNavigation((prev) => ({
                    ...prev,
                    selectedStyle: style,
                    isGenerating: true,
                  }));
                  handleDrawingComplete(navigation.drawing, style);
                }}
                onRedraw={handleRedrawImage}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {navigation.error && (
          <section className="text-center text-red-500">
            {navigation.error}
          </section>
        )}

        {/* Footer: Zurück und Neu starten Button immer unten mittig */}
        <div className="fixed bottom-6 left-0 w-full flex justify-center pointer-events-none z-50">
          <div className="flex gap-4 pointer-events-auto">
            {navigation.step !== "category" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-lg"
                style={{ fontSize: 18 }}
              >
                <ArrowLeft className="w-6 h-6" />
                Zurück
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-lg"
              style={{ fontSize: 18 }}
            >
              <RotateCcw className="w-6 h-6" />
              Neu starten
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
