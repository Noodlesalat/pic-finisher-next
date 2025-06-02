interface BrushSizeSelectorProps {
  currentSize: number;
  onSizeChange: (newSize: number) => void;
  minSize?: number;
  maxSize?: number;
  step?: number;
}

export function BrushSizeSelector({
  currentSize,
  onSizeChange,
  minSize = 1,
  maxSize = 50,
  step = 1,
}: BrushSizeSelectorProps) {
  return (
    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <label
        htmlFor="brush-size-slider"
        className="block text-md font-semibold mb-3 text-gray-900 dark:text-white text-center"
      >
        Pinselgröße: {currentSize}px
      </label>
      <input
        id="brush-size-slider"
        type="range"
        min={minSize}
        max={maxSize}
        step={step}
        value={currentSize}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 slider"
      />
    </div>
  );
}
