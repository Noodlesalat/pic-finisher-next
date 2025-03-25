"use client";
import { useEffect, useState, useRef } from "react";
import { ColorPicker } from "./ColorPicker";
import { BackgroundSelector } from "./BackgroundSelector";
import { Canvas } from "./Canvas";
import { Toolbar } from "./Toolbar";
import { useDrawingStore } from "../store/drawingStore";

interface DrawingCanvasProps {
  onDrawingComplete: (base64Image: string) => void;
}

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

const QUICK_COLORS = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"];

export function DrawingCanvas({ onDrawingComplete }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#FFFFFF");
  const [brushSize, setBrushSize] = useState(20);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [backgrounds, setBackgrounds] =
    useState<Background[]>(DEFAULT_BACKGROUNDS);
  const [selectedBackground, setSelectedBackground] = useState<Background>(
    DEFAULT_BACKGROUNDS[0]
  );

  const { drawing: savedDrawing, setDrawing } = useDrawingStore();

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setIsEraser(false);
    if (!QUICK_COLORS.includes(newColor)) {
      setCustomColor(newColor);
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

    if (background.type === "custom") {
      const img = new window.Image();
      img.src = background.value;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const newImageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        setHistory([newImageData]);
        setCurrentStep(0);
      };
    } else {
      ctx.fillStyle = background.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([newImageData]);
      setCurrentStep(0);
    }
  };

  // Initialisiere den Canvas beim ersten Laden
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
        setHistory([newImageData]);
        setCurrentStep(0);
      };
    } else {
      ctx.fillStyle = selectedBackground.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([newImageData]);
      setCurrentStep(0);
    }
  }, [selectedBackground.type, selectedBackground.value]);

  // Lade die gespeicherte Zeichnung, wenn vorhanden
  useEffect(() => {
    if (savedDrawing && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory([imageData]);
        setCurrentStep(0);
      };
      img.src = `data:image/png;base64,${savedDrawing}`;
    }
  }, [savedDrawing]);

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pngData = canvas.toDataURL("image/png", 1.0).split(",")[1];
    setDrawing(pngData);
    onDrawingComplete(pngData);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <BackgroundSelector
            backgrounds={backgrounds}
            selectedBackground={selectedBackground}
            onBackgroundChange={handleBackgroundChange}
          />
          <ColorPicker
            color={color}
            customColor={customColor}
            onColorChange={handleColorChange}
            isEraser={isEraser}
            onEraserToggle={() => setIsEraser(!isEraser)}
          />
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

      <Canvas
        ref={canvasRef}
        width={512}
        height={512}
        color={color}
        brushSize={brushSize}
        isEraser={isEraser}
      />

      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onSave={handleSave}
        canUndo={currentStep > 0}
        canRedo={currentStep < history.length - 1}
      />
    </div>
  );
}
