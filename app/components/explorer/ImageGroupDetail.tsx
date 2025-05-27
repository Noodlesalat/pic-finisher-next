"use client";

import type { ExplorerImageGroup } from "@/app/types/explorer";
import { ArrowLeft } from "lucide-react";

interface ImageGroupDetailProps {
  group: ExplorerImageGroup;
  onBack: () => void;
}

export function ImageGroupDetail({ group, onBack }: ImageGroupDetailProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Zurück zur Übersicht
      </button>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-2">{group.prompt}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {group.dateTime}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {group.originalUrl ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  Original
                </span>
                Deine Zeichnung
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={group.originalUrl}
                  alt={`Original - ${group.prompt}`}
                  className="w-full h-auto rounded-lg object-contain max-h-[400px] mx-auto"
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg flex items-center justify-center min-h-[300px]">
              <p className="text-gray-500 text-center">
                Kein Originalbild vorhanden
              </p>
            </div>
          )}

          {group.aiUrl ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  KI-Bild
                </span>
                Generiertes Ergebnis
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={group.aiUrl}
                  alt={`KI - ${group.prompt}`}
                  className="w-full h-auto rounded-lg object-contain max-h-[400px] mx-auto"
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg flex items-center justify-center min-h-[300px]">
              <p className="text-gray-500 text-center">
                Kein KI-Bild vorhanden
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
