import { Undo2, Redo2, Zap, Trash2 } from "lucide-react";
import { Style, AVAILABLE_STYLES } from "../types/prompts";

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

export function Toolbar({
  onUndo,
  onRedo,
  onClear,
  onSave,
  canUndo,
  canRedo,
  selectedStyle,
  onStyleChange,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          title="Rückgängig"
        >
          <Undo2 className="w-6 h-6" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          title="Wiederholen"
        >
          <Redo2 className="w-6 h-6" />
        </button>
        <button
          onClick={onClear}
          className="group flex items-center justify-center gap-2 px-7 py-3 min-w-[145px] bg-gradient-to-r from-red-800 via-red-500 to-red-100 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1 hover:scale-102 bg-[length:200%_200%] hover:bg-right"
        >
          <Trash2 className="w-5 h-5" />
          <span className="font-medium text-[17px]">Löschen</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="style-select"
          className="text-lg font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap"
        >
          Stil:
        </label>
        <select
          id="style-select"
          value={selectedStyle}
          onChange={(e) => onStyleChange(e.target.value as Style)}
          className="w-48 h-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white text-lg"
        >
          {AVAILABLE_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        <button
          onClick={onSave}
          className="group flex items-center justify-center gap-2 px-7 py-3 min-w-[145px] bg-gradient-to-r from-green-800 via-green-500 to-green-100 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1 hover:scale-102 bg-[length:200%_200%] hover:bg-right"
        >
          <Zap className="w-5 h-5" />
          <span className="font-medium text-[17px]">Fertig</span>
        </button>
      </div>
    </div>
  );
}
