"use client";

import { useState } from "react";
import type { ExplorerImageGroup } from "@/app/types/explorer";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ImageGroupListProps {
  groups: ExplorerImageGroup[];
  onSelectGroup: (groupId: string) => void;
}

interface GroupedImages {
  [dayKey: string]: {
    dayLabel: string;
    hours: {
      [hourKey: string]: {
        hourLabel: string;
        images: ExplorerImageGroup[];
      };
    };
  };
}

function groupImagesByDateTime(groups: ExplorerImageGroup[]): GroupedImages {
  const grouped: GroupedImages = {};

  groups.forEach((group) => {
    // Parse das Deutsche Datumsformat: "DD.MM.YYYY HH:mm:ss"
    const [datePart, timePart] = group.dateTime.split(" ");
    const [day, month, year] = datePart.split(".").map(Number);
    const [hour] = timePart.split(":").map(Number);

    const date = new Date(year, month - 1, day);

    // Erstelle Schlüssel für Gruppierung
    const dayKey = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const hourKey = String(hour).padStart(2, "0");

    // Erstelle benutzerfreundliche Labels
    const dayLabel = new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    const hourLabel = `${hourKey} Uhr`;

    // Initialisiere die Strukturen wenn nötig
    if (!grouped[dayKey]) {
      grouped[dayKey] = {
        dayLabel,
        hours: {},
      };
    }

    if (!grouped[dayKey].hours[hourKey]) {
      grouped[dayKey].hours[hourKey] = {
        hourLabel,
        images: [],
      };
    }

    grouped[dayKey].hours[hourKey].images.push(group);
  });

  return grouped;
}

export function ImageGroupList({ groups, onSelectGroup }: ImageGroupListProps) {
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(new Set());
  const [collapsedHours, setCollapsedHours] = useState<Set<string>>(new Set());

  const toggleDay = (dayKey: string) => {
    const newCollapsedDays = new Set(collapsedDays);
    if (newCollapsedDays.has(dayKey)) {
      newCollapsedDays.delete(dayKey);
    } else {
      newCollapsedDays.add(dayKey);
    }
    setCollapsedDays(newCollapsedDays);
  };

  const toggleHour = (hourKey: string) => {
    const newCollapsedHours = new Set(collapsedHours);
    if (newCollapsedHours.has(hourKey)) {
      newCollapsedHours.delete(hourKey);
    } else {
      newCollapsedHours.add(hourKey);
    }
    setCollapsedHours(newCollapsedHours);
  };

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

  const groupedImages = groupImagesByDateTime(groups);

  // Sortiere die Tage (neueste zuerst)
  const sortedDays = Object.keys(groupedImages).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="space-y-8">
      {sortedDays.map((dayKey) => {
        const dayData = groupedImages[dayKey];
        const isDayCollapsed = collapsedDays.has(dayKey);
        // Sortiere die Stunden (neueste zuerst)
        const sortedHours = Object.keys(dayData.hours).sort((a, b) =>
          b.localeCompare(a)
        );

        return (
          <div key={dayKey} className="space-y-6">
            {/* Tages-Separator mit Collapse-Button */}
            <div
              onClick={() => toggleDay(dayKey)}
              className="border-b border-gray-200 dark:border-gray-700 pb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                {isDayCollapsed ? (
                  <ChevronRight className="w-5 h-5 mr-2 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                )}
                {dayData.dayLabel}
                <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (
                  {Object.values(dayData.hours).reduce(
                    (total, hour) => total + hour.images.length,
                    0
                  )}{" "}
                  Bilder)
                </span>
              </h2>
            </div>

            {/* Stunden-Gruppen (nur anzeigen wenn Tag nicht kollapsiert ist) */}
            {!isDayCollapsed && (
              <div className="space-y-6 ml-4">
                {sortedHours.map((hourKey) => {
                  const hourData = dayData.hours[hourKey];
                  const hourUniqueKey = `${dayKey}-${hourKey}`;
                  const isHourCollapsed = collapsedHours.has(hourUniqueKey);

                  return (
                    <div key={hourUniqueKey} className="space-y-3">
                      {/* Stunden-Separator mit Collapse-Button */}
                      <div
                        onClick={() => toggleHour(hourUniqueKey)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                          {isHourCollapsed ? (
                            <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                          )}
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-3">
                            {hourData.hourLabel}
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            ({hourData.images.length} Bilder)
                          </span>
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>
                        </h3>
                      </div>

                      {/* Bilder-Grid für diese Stunde (nur anzeigen wenn Stunde nicht kollapsiert ist) */}
                      {!isHourCollapsed && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ml-4">
                          {hourData.images.map((group) => (
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
                                <h4
                                  className="text-sm font-semibold truncate"
                                  title={group.prompt}
                                >
                                  {group.prompt}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {group.dateTime.split(" ")[1]}{" "}
                                  {/* Nur die Zeit anzeigen */}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
