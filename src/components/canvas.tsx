import { useRef, useEffect, useState } from "react";

type Point = { x: number; y: number };
interface CanvasProps {
  strokeColor: string;
  strokeWidth: number;
  clearSignal: number; // increment to clear
}

export default function Canvas({ strokeColor, strokeWidth, clearSignal }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    // set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.lineCap = "round";
  }, []);

  // Clear board when clearSignal changes
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [clearSignal]);

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !lastPos) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    const newPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.stroke();
    ctx.closePath();

    setLastPos(newPos);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  return (
    <canvas
      ref={canvasRef}
      className="border rounded-md w-full h-[500px] touch-none"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
    />
  );
}
