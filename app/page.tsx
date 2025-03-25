"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category, Style } from "./types/prompts";
import { WordTransition } from "./components/WordTransition";
import { CategorySelection } from "./components/pages/CategorySelection";
import { DrawingSection } from "./components/pages/DrawingSection";
import { ResultSection } from "./components/pages/ResultSection";
import { Navigation } from "./components/pages/Navigation";
import { useDrawingStore } from "./store/drawingStore";
import { useGeneratedImageStore } from "./store/generatedImageStore";

type Step = "category" | "drawing" | "result";

interface NavigationState {
  step: Step;
  isSlotMachineActive: boolean;
  isTransitionActive: boolean;
  selectedWord: string | null;
  selectedCategory: Category | null;
  drawing: string;
  generatedImage: string;
  isGenerating: boolean;
  error: string;
}

export default function Home() {
  const [navigation, setNavigation] = useState<NavigationState>({
    step: "category",
    isSlotMachineActive: false,
    isTransitionActive: false,
    selectedWord: null,
    selectedCategory: null,
    drawing: "",
    generatedImage: "",
    isGenerating: false,
    error: "",
  });

  const handleSlotMachineComplete = (word: string, category: Category) => {
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

  const handleDrawingComplete = async (base64Image: string) => {
    if (!navigation.selectedCategory) return;

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
          word: navigation.selectedWord,
          category: navigation.selectedCategory,
          style: "Realistisch" as Style,
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
    <main className="min-h-screen p-8">
      <WordTransition
        isVisible={navigation.isTransitionActive}
        word={navigation.selectedWord || ""}
        onTransitionComplete={handleTransitionComplete}
      />

      <div className="max-w-6xl mx-auto">
        <Navigation
          currentStep={navigation.step}
          onBack={handleBack}
          onReset={handleReset}
        />

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
                onDrawingComplete={handleDrawingComplete}
              />
            )}

            {navigation.step === "result" && (
              <ResultSection
                drawing={navigation.drawing}
                generatedImage={navigation.generatedImage}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {navigation.isGenerating && (
          <section className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">KI generiert dein Bild...</p>
          </section>
        )}

        {navigation.error && (
          <section className="text-center text-red-500">
            {navigation.error}
          </section>
        )}
      </div>
    </main>
  );
}
