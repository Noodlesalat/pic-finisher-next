import Image from "next/image";
import { Background } from "../types/prompts";

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
    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-md font-semibold mb-3 text-gray-900 dark:text-white text-center">
        Hintergrund
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {backgrounds.map((background) => (
          <button
            key={background.value}
            onClick={() => onBackgroundChange(background)}
            className={`flex flex-col items-center justify-center p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              selectedBackground.value === background.value
                ? "border-blue-500 ring-2 ring-blue-300 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
            }`}
          >
            {background.type === "custom" ? (
              <div className="relative w-16 h-12 rounded-md overflow-hidden mb-2 flex-shrink-0">
                <Image
                  src={background.value}
                  alt={background.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div
                className="w-16 h-12 rounded-md mb-2 flex-shrink-0 border border-gray-200 dark:border-gray-500"
                style={{ backgroundColor: background.value }}
              />
            )}
            <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium leading-tight">
              {background.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
