import { SORTED_STANDARD_COLORS, Color } from "../data/colors";

interface ColorPaletteSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  isEraser: boolean;
  onEraserToggle: () => void;
}

export function ColorPaletteSelector({
  selectedColor,
  onColorChange,
}: ColorPaletteSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className="text-md font-semibold text-gray-900 dark:text-white whitespace-nowrap">
        Farbe:
      </span>
      <div className="grid grid-cols-6 gap-2">
        {SORTED_STANDARD_COLORS.map((color: Color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 transform hover:scale-110 active:scale-95 flex-shrink-0 ${
              selectedColor === color.value
                ? "border-blue-500 scale-110 shadow-lg ring-2 ring-blue-300"
                : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
            }`}
            style={{
              backgroundColor: color.value,
              boxShadow:
                color.value === "#FFFFFF"
                  ? "inset 0 0 0 1px rgba(0,0,0,0.1)"
                  : selectedColor === color.value
                  ? "0 3px 6px rgba(0,0,0,0.3)"
                  : "0 1px 2px rgba(0,0,0,0.1)",
            }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}
