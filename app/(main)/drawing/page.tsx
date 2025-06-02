"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Navigation } from "../../components/pages/Navigation";
import { DrawingSection } from "../../components/pages/DrawingSection";
import { useNavigationStore } from "../../store/navigationStore";
import { useDrawingStore } from "../../store/drawingStore";
import { useGeneratedImageStore } from "../../store/generatedImageStore";
import { Style } from "../../types/prompts";

export default function DrawingPage() {
  const router = useRouter();
  const {
    selectedWord,
    selectedCategory,
    selectedStyle,
    selectedBackground,
    isGenerating,
    error,
    setSelectedStyle,
    setSelectedBackground,
    setIsGenerating,
    setError,
    reset,
  } = useNavigationStore();

  // Redirect wenn keine Daten vorhanden sind
  useEffect(() => {
    if (!selectedWord || !selectedCategory) {
      router.push("/");
    }
  }, [selectedWord, selectedCategory, router]);

  const handleDrawingComplete = async (
    base64Image: string,
    styleOverride?: Style
  ) => {
    if (!selectedCategory || !selectedWord) return;

    setIsGenerating(true);
    setError("");

    try {
      console.log("Sending drawing to API...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image,
          word: selectedWord.prompt,
          category: selectedCategory,
          style: styleOverride || selectedStyle,
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

      // Speichere das generierte Bild im Store
      const { setGeneratedImage } = useGeneratedImageStore.getState();
      setGeneratedImage(data.imageUrl);

      // Setze Loading-State zurück
      setIsGenerating(false);

      // Navigiere zur Result-Seite ohne URL-Parameter
      router.push("/result");
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        "Es gab einen Fehler bei der Bildgenerierung. Bitte versuche es erneut."
      );
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    const { clearDrawing } = useDrawingStore.getState();
    clearDrawing();
    router.push("/");
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
  if (!selectedWord || !selectedCategory) {
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
          <DrawingSection
            selectedWord={selectedWord}
            selectedStyle={selectedStyle}
            selectedBackground={selectedBackground}
            onStyleChange={setSelectedStyle}
            onBackgroundChange={setSelectedBackground}
            onDrawingComplete={handleDrawingComplete}
            isGenerating={isGenerating}
          />
        </motion.div>

        {error && (
          <section className="text-center text-red-500 py-2">{error}</section>
        )}

        {/* Footer: Zurück und Neu starten Button */}
        <div className="fixed bottom-4 left-4 right-4 flex justify-between pointer-events-none z-50">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 pointer-events-auto"
            style={{ fontSize: 18, minWidth: "140px" }}
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

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
