"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "../types/prompts";
import { prompts } from "../data/prompts";
import { SlotMachine } from "../components/SlotMachine";
import { WordTransition } from "../components/WordTransition";
import { useNavigationStore } from "../store/navigationStore";

interface Word {
  display: string;
  prompt: string;
}

export default function CategoryPage() {
  const router = useRouter();
  const { setSelectedWord, setSelectedCategory } = useNavigationStore();

  const [selectedCategory, setLocalSelectedCategory] =
    useState<Category | null>(null);
  const [isSlotMachineActive, setIsSlotMachineActive] = useState(false);
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [selectedWord, setLocalSelectedWord] = useState<Word | null>(null);

  const handleCategorySelect = (category: Category) => {
    setLocalSelectedCategory(category);
    setIsSlotMachineActive(true);
  };

  const handleSlotMachineComplete = (word: Word, category: Category) => {
    console.log("SlotMachine complete:", word, category);

    // Speichere die Auswahl lokal für die Animation
    setLocalSelectedWord(word);
    setLocalSelectedCategory(category);

    // Beende SlotMachine und starte Transition
    setIsSlotMachineActive(false);
    setIsTransitionActive(true);
  };

  const handleTransitionComplete = () => {
    console.log("Transition complete");

    // Speichere die Auswahl im Store
    if (selectedWord && selectedCategory) {
      setSelectedWord(selectedWord);
      setSelectedCategory(selectedCategory);

      // Navigiere zur Drawing-Seite
      router.push("/drawing");
    }
  };

  return (
    <>
      <WordTransition
        isVisible={isTransitionActive}
        word={selectedWord || { display: "", prompt: "" }}
        onTransitionComplete={handleTransitionComplete}
      />

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex items-center mb-8">
          <div className="flex-1" />
          <h1 className="text-4xl font-bold flex-1 text-center">imAIgine</h1>
          <div className="flex gap-4 flex-1 justify-end"></div>
        </div>

        <section className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-12 text-center">
            Wähle eine Kategorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(prompts).map(([category]) => (
              <div
                key={category}
                onClick={() => handleCategorySelect(category as Category)}
                className={`bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors h-32 w-64 flex flex-col justify-center items-center ${
                  selectedCategory === category ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {selectedCategory === category && isSlotMachineActive ? (
                  <div className="w-full text-center">
                    <SlotMachine
                      category={category as Category}
                      onComplete={handleSlotMachineComplete}
                      isActive={isSlotMachineActive}
                    />
                  </div>
                ) : (
                  <h3 className="text-2xl font-semibold text-center">
                    {category}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
