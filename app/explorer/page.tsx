"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ImageGroupList } from "@/app/components/explorer/ImageGroupList";
import { ImageGroupDetail } from "@/app/components/explorer/ImageGroupDetail";
import type { ExplorerImageGroup } from "@/app/types/explorer";
import { ArrowLeft } from "lucide-react";

export default function ExplorerPage() {
  const [imageGroups, setImageGroups] = useState<ExplorerImageGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/explorer/images");
        if (!response.ok) {
          const errData = await response
            .json()
            .catch(() => ({ error: "Fehler beim Laden der Bilder" }));
          throw new Error(errData.error || `HTTP Fehler: ${response.status}`);
        }
        const data: ExplorerImageGroup[] = await response.json();
        setImageGroups(data);
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : "Unbekannter Fehler";
        setError(errorMessage);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  const handleBackToList = () => {
    setSelectedGroupId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Lade Bildergalerie...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg mb-4">Fehler: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  const selectedGroup = imageGroups.find((g) => g.id === selectedGroupId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedGroup ? `${selectedGroup.prompt}` : "Bildergalerie"}
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zur Erstellung
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {selectedGroup ? (
          <ImageGroupDetail group={selectedGroup} onBack={handleBackToList} />
        ) : (
          <ImageGroupList
            groups={imageGroups}
            onSelectGroup={handleSelectGroup}
          />
        )}
      </main>
    </div>
  );
}
