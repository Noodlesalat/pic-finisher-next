import Image from "next/image";
import hsLogo from "@/public/hs-fulda_logo_rechteckig_weiß_keinhintergrund_keineschutzzone_72ppi.png";
import maglabLogo from "@/public/maglab_on-black.png";

interface NavigationProps {
  showLogos?: boolean;
}

export function Navigation({ showLogos = false }: NavigationProps) {
  return (
    <div className="flex items-center justify-between mb-4 h-16">
      {/* Linkes Logo - nur im Drawing-Schritt */}
      <div className="flex-1 flex justify-start">
        {showLogos && (
          <Image
            src={hsLogo}
            alt="HS Fulda Logo"
            className="h-12 w-auto object-contain"
            height={48}
            priority
          />
        )}
      </div>

      {/* Titel in der Mitte */}
      <h1 className="text-3xl font-bold text-center flex-1">imAIgine</h1>

      {/* Rechtes Logo - nur im Drawing-Schritt */}
      <div className="flex-1 flex justify-end">
        {showLogos && (
          <Image
            src={maglabLogo}
            alt="Maglab Logo"
            className="h-12 w-auto object-contain"
            height={48}
            priority
          />
        )}
      </div>
    </div>
  );
}
