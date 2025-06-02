"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Navigation } from "../../components/pages/Navigation";
import { ResultSection } from "../../components/pages/ResultSection";
import { useNavigationStore } from "../../store/navigationStore";
import { useDrawingStore } from "../../store/drawingStore";
import { useGeneratedImageStore } from "../../store/generatedImageStore";
import { Style, AVAILABLE_STYLES } from "../../types/prompts";

export default function ResultPage() {
  const router = useRouter();

  const {
    selectedWord,
    selectedCategory,
    selectedStyle,
    isGenerating,
    error,
    setSelectedStyle,
    setIsGenerating,
    setError,
    reset,
  } = useNavigationStore();

  const { drawing } = useDrawingStore();
  const { generatedImage, setGeneratedImage } = useGeneratedImageStore();

  // Redirect wenn keine Daten vorhanden sind
  useEffect(() => {
    if (!selectedWord || !selectedCategory || !drawing || !generatedImage) {
      router.push("/");
    }
  }, [selectedWord, selectedCategory, drawing, generatedImage, router]);

  const handleStyleChange = async (style: Style) => {
    if (!selectedCategory || !selectedWord || !drawing) return;

    setSelectedStyle(style);
    setIsGenerating(true);
    setError("");

    try {
      console.log("Sending drawing to API for style change...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image: drawing,
          word: selectedWord.prompt,
          category: selectedCategory,
          style: style,
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

      setGeneratedImage(data.imageUrl);
      setIsGenerating(false);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        "Es gab einen Fehler bei der Bildgenerierung. Bitte versuche es erneut."
      );
      setIsGenerating(false);
    }
  };

  const handleRedraw = async () => {
    if (!selectedCategory || !selectedWord || !drawing) return;

    setIsGenerating(true);
    setError("");

    try {
      console.log("Redrawing image...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image: drawing,
          word: selectedWord.prompt,
          category: selectedCategory,
          style: selectedStyle,
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

      setGeneratedImage(data.imageUrl);
      setIsGenerating(false);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        "Es gab einen Fehler bei der Bildgenerierung. Bitte versuche es erneut."
      );
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    const { clearDrawing } = useDrawingStore.getState();
    const { clearGeneratedImage } = useGeneratedImageStore.getState();
    clearDrawing();
    clearGeneratedImage();
    reset();
    router.push("/");
  };

  // Zeige Loading oder redirect wenn keine Daten
  if (!selectedWord || !selectedCategory || !drawing || !generatedImage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Lade...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col px-4 py-2">
        <Navigation showLogos={true} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <ResultSection
            drawing={drawing}
            generatedImage={generatedImage}
            currentStyle={selectedStyle}
            availableStyles={AVAILABLE_STYLES}
            isGenerating={isGenerating}
            selectedWord={selectedWord}
            onStyleChange={handleStyleChange}
            onRedraw={handleRedraw}
          />
        </motion.div>

        {error && (
          <section className="text-center text-red-500 py-2">{error}</section>
        )}

        {/* Footer: Neu starten Button */}
        <div className="fixed bottom-4 left-4 right-4 flex justify-end pointer-events-none z-50">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 pointer-events-auto"
            style={{ fontSize: 18, minWidth: "160px" }}
          >
            <RotateCcw className="w-5 h-5" />
            Neu starten
          </button>
        </div>
      </div>
    </main>
  );
}
