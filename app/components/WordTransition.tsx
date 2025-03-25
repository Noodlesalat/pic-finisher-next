"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface WordTransitionProps {
  isVisible: boolean;
  word: string;
  onTransitionComplete: () => void;
}

export function WordTransition({
  isVisible,
  word,
  onTransitionComplete,
}: WordTransitionProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible && word) {
      console.log("WordTransition visible with word:", word); // Debug-Log
      // Warte auf die Einblend-Animation
      timer = setTimeout(() => {
        // Warte auf die Ausblend-Animation
        const exitTimer = setTimeout(() => {
          console.log("WordTransition complete"); // Debug-Log
          onTransitionComplete();
        }, 500);
        return () => clearTimeout(exitTimer);
      }, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, word, onTransitionComplete]);

  return (
    <AnimatePresence>
      {isVisible && word && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-8xl font-bold text-white"
            >
              {word}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
