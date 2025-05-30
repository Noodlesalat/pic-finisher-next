import { Paintbrush } from "lucide-react";

interface ColorPickerProps {
  color: string;
  customColor: string | null;
  onColorChange: (color: string) => void;
  isEraser: boolean;
  onEraserToggle: () => void;
}

const QUICK_COLORS = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"];

export function ColorPicker({
  color,
  customColor,
  onColorChange,
  isEraser,
  onEraserToggle,
}: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEraserToggle()}
        className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 ${
          !isEraser
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        title="Stift"
      >
        <Paintbrush className="w-6 h-6" />
      </button>
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="relative w-8 h-8 group">
          <div
            className={`w-8 h-8 rounded-md border-4 overflow-hidden transition-transform hover:scale-110 ${
              color !== customColor && !QUICK_COLORS.some((qc) => qc === color)
                ? "border-blue-600 scale-110"
                : "border-gray-500 dark:border-gray-400"
            }`}
            style={{
              background:
                "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Farbe wählen"
          />
        </div>
        {QUICK_COLORS.map((quickColor) => (
          <button
            key={quickColor}
            onClick={() => onColorChange(quickColor)}
            className={`w-8 h-8 rounded-md border-4 transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              color === quickColor
                ? "border-blue-600 scale-110 shadow-lg"
                : "border-gray-500 dark:border-gray-400 hover:border-blue-400"
            }`}
            style={{
              backgroundColor: quickColor,
              boxShadow:
                quickColor === "#FFFFFF"
                  ? "inset 0 0 0 1px rgba(0,0,0,0.1)"
                  : color === quickColor
                  ? "0 2px 4px rgba(0,0,0,0.1)"
                  : "none",
            }}
            title={quickColor}
          />
        ))}
        {customColor && (
          <button
            onClick={() => onColorChange(customColor)}
            className={`w-8 h-8 rounded-md border-4 transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              color === customColor
                ? "border-blue-600 scale-110 shadow-lg"
                : "border-gray-500 dark:border-gray-400 hover:border-blue-400"
            }`}
            style={{
              backgroundColor: customColor,
              boxShadow:
                color === customColor ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            }}
            title="Benutzerdefinierte Farbe"
          />
        )}
      </div>
    </div>
  );
}
