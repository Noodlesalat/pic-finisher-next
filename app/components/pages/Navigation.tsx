import { ArrowLeft, RotateCcw } from "lucide-react";

interface NavigationProps {
  currentStep: string;
  onBack: () => void;
  onReset: () => void;
}

export function Navigation({ currentStep, onBack, onReset }: NavigationProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">Pic Finisher</h1>
      <div className="flex gap-4">
        {currentStep !== "category" && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
        )}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
        >
          <RotateCcw className="w-5 h-5" />
          Neu starten
        </button>
      </div>
    </div>
  );
}
