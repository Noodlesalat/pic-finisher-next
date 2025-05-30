"use client";

import { useState } from "react";
import Image from "next/image";

interface ExplorerFile {
  name: string;
  publicPath: string;
  modifiedTimestamp: number;
}

interface ImagePreviewCardProps {
  file: ExplorerFile;
}

export function ImagePreviewCard({ file }: ImagePreviewCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extrahiere einen besseren Titel aus dem Dateinamen
  const getImageTitle = (filename: string) => {
    // Entferne die Dateierweiterung
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

    // Ersetze Unterstriche und Bindestriche durch Leerzeichen
    const cleanName = nameWithoutExt.replace(/[_-]/g, " ");

    // Großschreibung am Anfang jedes Wortes
    return cleanName.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
      <a
        href={file.publicPath}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
          {!imageError ? (
            <>
              <Image
                src={file.publicPath}
                alt={getImageTitle(file.name)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.666vw, 12.5vw"
                style={{ objectFit: "cover" }}
                className={`transition-all duration-200 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                priority={false}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-3xl mb-2">🖼️</div>
              <span className="text-xs text-center px-2">
                Bild nicht verfügbar
              </span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3
            className="text-sm font-medium text-gray-900 dark:text-white truncate"
            title={getImageTitle(file.name)}
          >
            {getImageTitle(file.name)}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {new Date(file.modifiedTimestamp).toLocaleDateString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Hover-Overlay ohne bg-black */}
        {!imageError && (
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 dark:group-hover:bg-gray-800/20 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                Öffnen ↗
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
}
