import { motion } from "framer-motion";
import { useGeneratedImageStore } from "../../store/generatedImageStore";
import React from "react";

interface ResultSectionProps {
  drawing: string;
  generatedImage: string;
}

export function ResultSection({ drawing, generatedImage }: ResultSectionProps) {
  const { generatedImage: storedImage, setGeneratedImage } =
    useGeneratedImageStore();
  const drawingSrc = `data:image/png;base64,${drawing}`;
  const generatedSrc = `data:image/png;base64,${storedImage || generatedImage}`;

  // Speichere das generierte Bild im Store
  React.useEffect(() => {
    if (generatedImage) {
      console.log("Storing generated image, length:", generatedImage.length);
      setGeneratedImage(generatedImage);
    }
  }, [generatedImage, setGeneratedImage]);

  // Debug-Ausgaben
  React.useEffect(() => {
    console.log("Drawing length:", drawing?.length);
    console.log("Generated image length:", generatedImage?.length);
    console.log("Stored image length:", storedImage?.length);
  }, [drawing, generatedImage, storedImage]);

  return (
    <section>
      <h2 className="text-4xl font-semibold mb-12 text-center">Ergebnis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-medium mb-4 text-center">
            Deine Zeichnung
          </h3>
          <div className="flex justify-center">
            <img
              src={drawingSrc}
              alt="Gezeichnetes Bild"
              width={512}
              height={512}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-medium mb-4 text-center">
            KI-generiertes Bild
          </h3>
          <div className="flex justify-center">
            <img
              src={generatedSrc}
              alt="KI-generiertes Bild"
              width={512}
              height={512}
              className="max-w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.error("Error loading generated image:", e);
                const imgElement = e.target as HTMLImageElement;
                console.log("Failed src:", imgElement.src);
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
