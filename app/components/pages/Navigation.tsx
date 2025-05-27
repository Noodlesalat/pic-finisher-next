import Link from "next/link";
import { ImageIcon } from "lucide-react";

export function Navigation() {
  return (
    <div className="flex items-center mb-8">
      <div className="flex-1" />
      <h1 className="text-4xl font-bold flex-1 text-center">imAIgine</h1>
      <div className="flex gap-4 flex-1 justify-end">
        <Link
          href="/explorer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
        >
          <ImageIcon className="w-5 h-5" />
          Galerie
        </Link>
      </div>
    </div>
  );
}
