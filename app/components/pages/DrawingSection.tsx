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
    <section className="flex-1 flex flex-col min-h-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex-1 flex flex-col min-h-0">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Zeichne: {selectedWord.display}
        </h2>

        <div className="flex-1 flex justify-center items-center min-h-0">
          <div className="w-full max-w-5xl h-full flex flex-col justify-center">
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
      </div>
    </section>
  );
}
