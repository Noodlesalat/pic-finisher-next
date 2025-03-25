"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Category } from "../types/prompts";
import { prompts } from "../data/prompts";

interface Word {
  display: string;
  prompt: string;
}

interface SlotMachineProps {
  category: Category;
  onComplete: (word: Word, category: Category) => void;
  isActive: boolean;
}

export function SlotMachine({
  category,
  onComplete,
  isActive,
}: SlotMachineProps) {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalWord, setFinalWord] = useState<Word | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const spinSpeedRef = useRef(30);
  const finalWordRef = useRef<Word | null>(null);

  // Cleanup-Funktion für Timeouts
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Slot-Machine-Logik
  const spin = useCallback(() => {
    const categoryData = prompts[category];
    const words = categoryData.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);

    if (spinSpeedRef.current < 200) {
      timeoutRef.current = setTimeout(() => {
        spinSpeedRef.current += 12;
        spin();
      }, spinSpeedRef.current);
    } else {
      finalWordRef.current = randomWord;
      setFinalWord(randomWord);
      setIsSpinning(false);
      setIsComplete(true);

      timeoutRef.current = setTimeout(() => {
        if (finalWordRef.current) {
          onComplete(finalWordRef.current, category);
        }
      }, 500);
    }
  }, [category, onComplete]);

  // Starte die Animation
  useEffect(() => {
    if (!isActive) {
      return;
    }

    setIsSpinning(true);
    setIsComplete(false);
    spinSpeedRef.current = 50;
    spin();

    return cleanup;
  }, [isActive, category, spin, cleanup]);

  // Wenn die Animation abgeschlossen ist, zeige nur das finale Wort
  if (isComplete && finalWord) {
    return (
      <div className="h-12 flex items-center justify-center">
        <span className="text-2xl font-semibold">{finalWord.display}</span>
      </div>
    );
  }

  return (
    <div className="h-12 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          opacity: isSpinning ? [0.3, 1] : 1,
          y: isSpinning ? [-8, 0] : 0,
        }}
        transition={{
          duration: 0.2,
          repeat: isSpinning ? Infinity : 0,
          repeatType: "reverse",
        }}
        className="text-2xl font-semibold"
      >
        {currentWord?.display || ""}
      </motion.div>
    </div>
  );
}
