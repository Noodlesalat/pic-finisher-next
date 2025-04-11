import { ArrowLeft, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hsLogo from "@/public/hs-fulda_logo_rechteckig_weiß_keinhintergrund_keineschutzzone_72ppi.png";
import maglabLogo from "@/public/maglab_on-black.png";

interface NavigationProps {
  currentStep: string;
  onBack: () => void;
  onReset: () => void;
}

export function Navigation({ currentStep, onBack, onReset }: NavigationProps) {
  return (
    <div className="flex items-center mb-8">
      <div className="flex-1 flex items-center">
        <Link
          href="https://www.hs-fulda.de/angewandte-informatik"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src={hsLogo}
            alt="HS Fulda Logo"
            className="h-12 w-auto object-contain"
            height={48}
            priority
          />
        </Link>
        <Link
          href="https://beta.maglab.space/de/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity ml-4"
        >
          <Image
            src={maglabLogo}
            alt="Maglab Logo"
            className="h-12 w-auto object-contain"
            height={48}
            priority
          />
        </Link>
      </div>
      <h1 className="text-4xl font-bold flex-1 text-center">Pic Finisher</h1>
      <div className="flex gap-4 flex-1 justify-end">
        {currentStep !== "category" && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
        )}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
        >
          <RotateCcw className="w-5 h-5" />
          Neu starten
        </button>
      </div>
    </div>
  );
}
