import Image from "next/image";
import { motion } from "framer-motion";

interface ResultSectionProps {
  drawing: string;
  generatedImage: string;
}

export function ResultSection({ drawing, generatedImage }: ResultSectionProps) {
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
            <Image
              src={drawing}
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
            <Image
              src={generatedImage}
              alt="KI-generiertes Bild"
              width={512}
              height={512}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
