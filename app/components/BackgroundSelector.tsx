interface Background {
  type: "white" | "black" | "custom";
  name: string;
  value: string;
}

interface BackgroundSelectorProps {
  backgrounds: Background[];
  selectedBackground: Background;
  onBackgroundChange: (background: Background) => void;
}

export function BackgroundSelector({
  backgrounds,
  selectedBackground,
  onBackgroundChange,
}: BackgroundSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
      <span className="text-lg text-gray-900 dark:text-white">
        Hintergrund:
      </span>
      <select
        value={selectedBackground.value}
        onChange={(e) => {
          const bg = backgrounds.find((b) => b.value === e.target.value);
          if (bg) onBackgroundChange(bg);
        }}
        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md px-2 py-1 text-lg"
      >
        {backgrounds.map((bg) => (
          <option key={bg.value} value={bg.value}>
            {bg.name}
          </option>
        ))}
      </select>
    </div>
  );
}
