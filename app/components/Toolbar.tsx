import { Undo2, Redo2 } from "lucide-react";

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function Toolbar({
  onUndo,
  onRedo,
  onClear,
  onSave,
  canUndo,
  canRedo,
}: ToolbarProps) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
        title="Rückgängig"
      >
        <Undo2 className="w-6 h-6" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
        title="Wiederholen"
      >
        <Redo2 className="w-6 h-6" />
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
      >
        Löschen
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
      >
        Fertig
      </button>
    </div>
  );
}
