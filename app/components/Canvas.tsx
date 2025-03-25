import { useEffect, useRef, useCallback, useState, forwardRef } from "react";

interface CanvasProps {
  width: number;
  height: number;
  color: string;
  brushSize: number;
  isEraser: boolean;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ width, height, color, brushSize, isEraser }, ref) => {
    const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
      null
    );
    const [cursorPosition, setCursorPosition] = useState<{
      x: number;
      y: number;
    } | null>(null);

    const updateCursor = useCallback(
      (point: { x: number; y: number } | null) => {
        const cursorCanvas = cursorCanvasRef.current;
        if (!cursorCanvas) return;

        const ctx = cursorCanvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

        if (!point) return;

        ctx.beginPath();
        ctx.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2);
        ctx.strokeStyle = isEraser ? "rgba(0,0,0,0.5)" : color;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (isEraser) {
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fill();
        }
      },
      [brushSize, color, isEraser]
    );

    useEffect(() => {
      if (!ref || typeof ref === "function") return;

      const canvas = ref.current;
      const cursorCanvas = cursorCanvasRef.current;
      if (!canvas || !cursorCanvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;
      cursorCanvas.width = width;
      cursorCanvas.height = height;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [width, height, ref]);

    useEffect(() => {
      if (!ref || typeof ref === "function") return;

      const canvas = ref.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.strokeStyle = isEraser ? "#ffffff" : color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }, [color, brushSize, isEraser, ref]);

    useEffect(() => {
      if (cursorPosition) {
        updateCursor(cursorPosition);
      }
    }, [cursorPosition, updateCursor]);

    const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ref || typeof ref === "function") return null;

      const canvas = ref.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ref || typeof ref === "function") return;

      const point = getCanvasPoint(e);
      if (!point) return;

      setIsDrawing(true);
      setLastPoint(point);

      const canvas = ref.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !lastPoint) return;

      if (!ref || typeof ref === "function") return;

      const point = getCanvasPoint(e);
      if (!point) return;

      const canvas = ref.current;
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

    return (
      <div className="relative w-[512px] h-[512px] border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={ref}
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
    );
  }
);

Canvas.displayName = "Canvas";
