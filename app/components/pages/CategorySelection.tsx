import { Category } from "@/app/types/prompts";
import { prompts } from "@/app/data/prompts";
import { SlotMachine } from "@/app/components/SlotMachine";

interface CategorySelectionProps {
  selectedCategory: Category | null;
  isSlotMachineActive: boolean;
  onCategorySelect: (category: Category) => void;
  onSlotMachineComplete: (word: string, category: Category) => void;
}

export function CategorySelection({
  selectedCategory,
  isSlotMachineActive,
  onCategorySelect,
  onSlotMachineComplete,
}: CategorySelectionProps) {
  return (
    <section className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold mb-12 text-center">
        Wähle eine Kategorie
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(prompts).map(([category]) => (
          <div
            key={category}
            onClick={() => onCategorySelect(category as Category)}
            className={`bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors h-32 w-64 flex flex-col justify-center items-center ${
              selectedCategory === category ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {selectedCategory === category && isSlotMachineActive ? (
              <div className="w-full text-center">
                <SlotMachine
                  category={category as Category}
                  onComplete={onSlotMachineComplete}
                  isActive={isSlotMachineActive}
                />
              </div>
            ) : (
              <h3 className="text-2xl font-semibold text-center">{category}</h3>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
