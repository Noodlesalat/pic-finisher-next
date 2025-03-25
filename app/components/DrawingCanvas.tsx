"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Undo2, Redo2, Eraser, Paintbrush } from "lucide-react";

interface DrawingCanvasProps {
  onDrawingComplete: (base64Image: string) => void;
}

const QUICK_COLORS = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"];

type BackgroundType = "white" | "black" | "custom";

interface Background {
  type: BackgroundType;
  name: string;
  value: string;
}

const DEFAULT_BACKGROUNDS: Background[] = [
  { type: "white", name: "Weiß", value: "#FFFFFF" },
  { type: "black", name: "Schwarz", value: "#000000" },
];

export function DrawingCanvas({ onDrawingComplete }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const [brushSize, setBrushSize] = useState(20);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [backgrounds, setBackgrounds] =
    useState<Background[]>(DEFAULT_BACKGROUNDS);
  const [selectedBackground, setSelectedBackground] = useState<Background>(
    DEFAULT_BACKGROUNDS[0]
  );

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setIsEraser(false);
    if (!QUICK_COLORS.includes(newColor)) {
      setCustomColor(newColor);
    }
  };

  const updateCursor = useCallback(
    (point: { x: number; y: number } | null) => {
      const cursorCanvas = cursorCanvasRef.current;
      if (!cursorCanvas) return;

      const ctx = cursorCanvas.getContext("2d");
      if (!ctx) return;

      // Lösche den vorherigen Cursor
      ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

      if (!point) return;

      // Zeichne den neuen Cursor
      ctx.beginPath();
      ctx.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = isEraser ? "rgba(0,0,0,0.5)" : color;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Fülle den Cursor bei aktivem Radierer mit Weiß
      if (isEraser) {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      }
    },
    [brushSize, color, isEraser]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;
    if (!canvas || !cursorCanvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setze die Canvas-Größe
    canvas.width = 512;
    canvas.height = 512;
    cursorCanvas.width = 512;
    cursorCanvas.height = 512;

    // Initialisiere die Canvas mit weißem Hintergrund
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Speichere den initialen Zustand
    const initialImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    setHistory([initialImageData]);
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setze die Zeicheneinstellungen
    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [color, brushSize, isEraser]);

  useEffect(() => {
    if (cursorPosition) {
      updateCursor(cursorPosition);
    }
  }, [cursorPosition, updateCursor]);

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e);
    if (!point) return;

    setIsDrawing(true);
    setLastPoint(point);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const point = getCanvasPoint(e);
    if (!point) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    setLastPoint(point);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setLastPoint(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Speichere den neuen Zustand in der Historie
    const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, newImageData]);
    setCurrentStep(currentStep + 1);
  };

  const undo = () => {
    if (currentStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const newStep = currentStep - 1;
      ctx.putImageData(history[newStep], 0, 0);
      setCurrentStep(newStep);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const newStep = currentStep + 1;
      ctx.putImageData(history[newStep], 0, 0);
      setCurrentStep(newStep);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setze den aktuellen Hintergrund
    if (selectedBackground.type === "custom") {
      const img = new window.Image();
      img.src = selectedBackground.value;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const newImageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        setHistory([...history, newImageData]);
        setCurrentStep(currentStep + 1);
      };
    } else {
      ctx.fillStyle = selectedBackground.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([...history, newImageData]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e);
    if (!point) return;

    setCursorPosition(point);
    if (isDrawing) {
      draw(e);
    }
  };

  const handleMouseLeave = () => {
    setCursorPosition(null);
    if (isDrawing) {
      stopDrawing();
    }
  };

  // Lade die benutzerdefinierten Hintergründe
  useEffect(() => {
    const loadCustomBackgrounds = async () => {
      try {
        const response = await fetch("/api/backgrounds");
        const customBackgrounds = await response.json();
        setBackgrounds([
          ...DEFAULT_BACKGROUNDS,
          ...customBackgrounds.map((bg: string) => ({
            type: "custom" as BackgroundType,
            name: bg.split("/").pop()?.split(".")[0] || bg,
            value: bg,
          })),
        ]);
      } catch (error) {
        console.error("Fehler beim Laden der Hintergründe:", error);
      }
    };

    loadCustomBackgrounds();
  }, []);

  const handleBackgroundChange = async (background: Background) => {
    setSelectedBackground(background);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Speichere den aktuellen Zustand in der Historie
    const currentImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, currentImageData]);
    setCurrentStep(currentStep + 1);

    // Setze den neuen Hintergrund
    if (background.type === "custom") {
      const img = new window.Image();
      img.src = background.value;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = background.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Konvertiere den Canvas zu einem PNG-Bild mit voller Qualität
    const pngData = canvas.toDataURL("image/png", 1.0).split(",")[1];
    onDrawingComplete(pngData);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-900 dark:text-white">
              Hintergrund:
            </span>
            <select
              value={selectedBackground.value}
              onChange={(e) => {
                const bg = backgrounds.find((b) => b.value === e.target.value);
                if (bg) handleBackgroundChange(bg);
              }}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md px-2 py-1"
            >
              {backgrounds.map((bg) => (
                <option key={bg.value} value={bg.value}>
                  {bg.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsEraser(false)}
            className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              !isEraser
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Stift"
          >
            <Paintbrush className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsEraser(true)}
            className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              isEraser
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Radierer"
          >
            <Eraser className="w-6 h-6" />
          </button>
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="relative w-8 h-8 group">
              <div
                className={`w-8 h-8 rounded-md border-2 overflow-hidden transition-transform hover:scale-110 ${
                  color !== customColor &&
                  !QUICK_COLORS.some((qc) => qc === color)
                    ? "border-blue-500 scale-110"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                style={{
                  background:
                    "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                }}
              />
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Farbe wählen"
              />
            </div>
            {QUICK_COLORS.map((quickColor) => (
              <button
                key={quickColor}
                onClick={() => handleColorChange(quickColor)}
                className={`w-8 h-8 rounded-md border-2 transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                  color === quickColor
                    ? "border-blue-500 scale-110 shadow-lg"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
                }`}
                style={{
                  backgroundColor: quickColor,
                  boxShadow:
                    quickColor === "#FFFFFF"
                      ? "inset 0 0 0 1px rgba(0,0,0,0.1)"
                      : color === quickColor
                      ? "0 2px 4px rgba(0,0,0,0.1)"
                      : "none",
                }}
                title={quickColor}
              />
            ))}
            {customColor && (
              <button
                onClick={() => handleColorChange(customColor)}
                className={`w-8 h-8 rounded-md border-2 transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                  color === customColor
                    ? "border-blue-500 scale-110 shadow-lg"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
                }`}
                style={{
                  backgroundColor: customColor,
                  boxShadow:
                    color === customColor
                      ? "0 2px 4px rgba(0,0,0,0.1)"
                      : "none",
                }}
                title="Benutzerdefinierte Farbe"
              />
            )}
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-900 dark:text-white">
              Größe:
            </span>
            <input
              type="range"
              min="10"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-900 dark:text-white ml-1">
              {brushSize}
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-[512px] h-[512px] border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrawing}
          onMouseOut={handleMouseLeave}
          className="absolute top-0 left-0"
        />
        <canvas
          ref={cursorCanvasRef}
          className="absolute top-0 left-0 pointer-events-none"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={undo}
          disabled={currentStep <= 0}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          title="Rückgängig"
        >
          <Undo2 className="w-6 h-6" />
        </button>
        <button
          onClick={redo}
          disabled={currentStep >= history.length - 1}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          title="Wiederholen"
        >
          <Redo2 className="w-6 h-6" />
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Löschen
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
        >
          Fertig
        </button>
      </div>
    </div>
  );
}
