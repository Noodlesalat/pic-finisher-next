import { DrawingCanvas } from "@/app/components/DrawingCanvas";
import { Style, Background } from "@/app/types/prompts";

interface Word {
  display: string;
  prompt: string;
}

interface DrawingSectionProps {
  selectedWord: Word;
  selectedStyle: Style;
  selectedBackground: Background;
  onStyleChange: (style: Style) => void;
  onBackgroundChange: (background: Background) => void;
  onDrawingComplete: (base64Image: string) => void;
  isGenerating: boolean;
}

export function DrawingSection({
  selectedWord,
  selectedStyle,
  selectedBackground,
  onStyleChange,
  onBackgroundChange,
  onDrawingComplete,
  isGenerating,
}: DrawingSectionProps) {
  return (
    <section className="h-[calc(100vh-12rem)]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Zeichne: {selectedWord.display}
        </h2>

        <div className="w-full max-w-2xl mx-auto">
          <DrawingCanvas
            onDrawingComplete={onDrawingComplete}
            selectedStyle={selectedStyle}
            selectedBackground={selectedBackground}
            onStyleChange={onStyleChange}
            onBackgroundChange={onBackgroundChange}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </section>
  );
}
