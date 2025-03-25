import { DrawingCanvas } from "@/app/components/DrawingCanvas";

interface DrawingSectionProps {
  selectedWord: string;
  onDrawingComplete: (base64Image: string) => void;
}

export function DrawingSection({
  selectedWord,
  onDrawingComplete,
}: DrawingSectionProps) {
  return (
    <section className="min-h-[calc(100vh-12rem)] flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-12 text-center">
        Zeichne: {selectedWord}
      </h2>
      <div className="w-full max-w-2xl">
        <DrawingCanvas onDrawingComplete={onDrawingComplete} />
      </div>
    </section>
  );
}
