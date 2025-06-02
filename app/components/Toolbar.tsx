import { Zap, Trash2 } from "lucide-react";
import { Style } from "../types/prompts";

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedStyle: Style;
  onStyleChange: (style: Style) => void;
}

export function Toolbar({ onClear, onSave }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
      <div className="flex gap-1">
        <button
          onClick={onClear}
          className="group flex items-center justify-center gap-2 px-4 py-2 min-w-[100px] bg-gradient-to-r from-red-800 via-red-500 to-red-100 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-102 bg-[length:200%_200%] hover:bg-right"
        >
          <Trash2 className="w-4 h-4" />
          <span className="font-medium text-sm">Löschen</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="group flex items-center justify-center gap-2 px-4 py-2 min-w-[100px] bg-gradient-to-r from-green-800 via-green-500 to-green-100 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-102 bg-[length:200%_200%] hover:bg-right"
        >
          <Zap className="w-4 h-4" />
          <span className="font-medium text-sm">Fertig</span>
        </button>
      </div>
    </div>
  );
}
