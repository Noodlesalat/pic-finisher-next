"use client";

import type { ExplorerImageGroup } from "@/app/types/explorer";

interface ImageGroupListProps {
  groups: ExplorerImageGroup[];
  onSelectGroup: (groupId: string) => void;
}

export function ImageGroupList({ groups, onSelectGroup }: ImageGroupListProps) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Noch keine Bilder gespeichert.</p>
        <p className="text-gray-400 text-sm mt-2">
          Erstelle dein erstes Bild, um es hier zu sehen!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {groups.map((group) => (
        <div
          key={group.id}
          onClick={() => onSelectGroup(group.id)}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        >
          {/* Preview-Bilder */}
          <div className="mb-3 aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden relative">
            {group.originalUrl && group.aiUrl ? (
              // Beide Bilder vorhanden - geteilte Ansicht
              <div className="flex h-full">
                <div className="flex-1 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={group.originalUrl}
                    alt={`Original - ${group.prompt}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                    Original
                  </div>
                </div>
                <div className="flex-1 relative border-l border-gray-300 dark:border-gray-600">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={group.aiUrl}
                    alt={`KI - ${group.prompt}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                    KI
                  </div>
                </div>
              </div>
            ) : group.originalUrl ? (
              // Nur Original vorhanden
              <div className="relative h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={group.originalUrl}
                  alt={`Original - ${group.prompt}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                  Original
                </div>
              </div>
            ) : group.aiUrl ? (
              // Nur KI-Bild vorhanden
              <div className="relative h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={group.aiUrl}
                  alt={`KI - ${group.prompt}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                  KI
                </div>
              </div>
            ) : (
              // Keine Bilder vorhanden (sollte eigentlich nicht vorkommen)
              <div className="flex items-center justify-center h-full text-gray-400">
                <span className="text-xs">Kein Bild</span>
              </div>
            )}
          </div>

          {/* Titel und Datum */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold truncate" title={group.prompt}>
              {group.prompt}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {group.dateTime}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
