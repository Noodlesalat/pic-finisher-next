"use client";
import { useState } from "react";
import Image from "next/image";
import { DrawingCanvas } from "./components/DrawingCanvas";
import { WordTransition } from "./components/WordTransition";
import { SlotMachine } from "./components/SlotMachine";
import { Category, Style } from "./types/prompts";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { prompts } from "./data/prompts";

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
      setNavigation((prev) => ({
        ...prev,
        generatedImage: data.imageUrl,
        step: "result",
        isGenerating: false,
      }));
    } catch (err) {
      setNavigation((prev) => ({
        ...prev,
        error:
          "Es gab einen Fehler bei der Bildgenerierung. Bitte versuche es erneut.",
        isGenerating: false,
      }));
      console.error("Generation error:", err);
    }
  };

  const handleReset = () => {
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
    setNavigation((prev) => ({
      ...prev,
      step: prev.step === "result" ? "drawing" : "category",
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Pic Finisher</h1>
          <div className="flex gap-4">
            {navigation.step !== "category" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              <RotateCcw className="w-5 h-5" />
              Neu starten
            </button>
          </div>
        </div>

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
              <section className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
                <h2 className="text-4xl font-semibold mb-12 text-center">
                  Wähle eine Kategorie
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(prompts).map(([category]) => (
                    <div
                      key={category}
                      onClick={() => {
                        setNavigation((prev) => ({
                          ...prev,
                          isSlotMachineActive: true,
                          selectedCategory: category as Category,
                        }));
                      }}
                      className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors h-32 w-64 flex flex-col justify-center items-center"
                    >
                      {navigation.selectedCategory === category ? (
                        <div className="w-full text-center">
                          <SlotMachine
                            category={category as Category}
                            onComplete={handleSlotMachineComplete}
                            isActive={navigation.isSlotMachineActive}
                          />
                        </div>
                      ) : (
                        <h3 className="text-2xl font-semibold text-center">
                          {category}
                        </h3>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {navigation.step === "drawing" && navigation.selectedWord && (
              <section className="min-h-[calc(100vh-12rem)] flex flex-col items-center">
                <h2 className="text-4xl font-semibold mb-12 text-center">
                  Zeichne: {navigation.selectedWord}
                </h2>
                <div className="w-full max-w-2xl">
                  <DrawingCanvas onDrawingComplete={handleDrawingComplete} />
                </div>
              </section>
            )}

            {navigation.step === "result" && (
              <section>
                <h2 className="text-4xl font-semibold mb-12 text-center">
                  Ergebnis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-medium mb-4 text-center">
                      Deine Zeichnung
                    </h3>
                    <div className="flex justify-center">
                      <Image
                        src={navigation.drawing}
                        alt="Gezeichnetes Bild"
                        width={512}
                        height={512}
                        className="max-w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-medium mb-4 text-center">
                      KI-generiertes Bild
                    </h3>
                    <div className="flex justify-center">
                      <Image
                        src={navigation.generatedImage}
                        alt="KI-generiertes Bild"
                        width={512}
                        height={512}
                        className="max-w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>
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
