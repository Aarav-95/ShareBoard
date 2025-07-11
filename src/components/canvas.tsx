"use client";
import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface CanvasProps {
  roomId: string;
  penColor: string;
  bgColor: string;
  strokeWidth: number;
  eraseMode: boolean;
  clearSignal: number;
  textMode: boolean;
  textInput: string;
  fontFamily: string;
  fontSize: number;
}

const Canvas: React.FC<CanvasProps> = ({
  roomId,
  penColor,
  bgColor,
  strokeWidth,
  eraseMode,
  clearSignal,
  textMode,
  textInput,
  fontFamily,
  fontSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);

  // Initialize canvas and fill background
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
  }, [bgColor]);

  // Clear on signal
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [clearSignal, bgColor]);

  // Socket connection & events
  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    socketRef.current.emit('joinRoom', roomId);

    socketRef.current.on('history', (strokes: any[]) => {
      const ctx = canvasRef.current!.getContext('2d')!;
      strokes.forEach((st) => replayStroke(ctx, st));
    });

    socketRef.current.on('draw', (st: any) => {
      const ctx = canvasRef.current!.getContext('2d')!;
      replayStroke(ctx, st);
    });

    socketRef.current.on('clear', () => {
      const ctx = canvasRef.current!.getContext('2d')!;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    });

    socketRef.current.on('text', (data: any) => {
      const ctx = canvasRef.current!.getContext('2d')!;
      drawText(ctx, data);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, bgColor]);

  // Replay functions
  const replayStroke = (ctx: CanvasRenderingContext2D, stroke: any) => {
    const { path, color, width, erase } = stroke;
    ctx.strokeStyle = erase ? bgColor : color;
    ctx.lineWidth = width;
    ctx.beginPath();
    for (let i = 1; i < path.length; i++) {
      const p0 = path[i - 1];
      const p1 = path[i];
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
    }
    ctx.stroke();
    ctx.closePath();
  };

  const drawText = (ctx: CanvasRenderingContext2D, data: any) => {
    ctx.fillStyle = data.color;
    ctx.font = `${data.fontSize}px ${data.fontFamily}`;
    ctx.fillText(data.text, data.x, data.y);
  };

  // Utility to get mouse position
  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // Mouse events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e);
    if (textMode) {
      const ctx = canvasRef.current!.getContext('2d')!;
      drawText(ctx, { x: pos.x, y: pos.y, text: textInput, fontFamily, fontSize, color: penColor });
      socketRef.current?.emit('text', { roomId, x: pos.x, y: pos.y, text: textInput, fontFamily, fontSize, color: penColor });
    } else {
      setIsDrawing(true);
      setLastPos(pos);
      setPath([pos]);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return;
    const newPos = getPos(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.strokeStyle = eraseMode ? bgColor : penColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.stroke();
    ctx.closePath();
    setLastPos(newPos);
    setPath((prev) => [...prev, newPos]);
  };

  const finishDrawing = () => {
    if (isDrawing && path.length > 1) {
      socketRef.current?.emit('draw', { roomId, stroke: { path, color: penColor, width: strokeWidth, erase: eraseMode } });
    }
    setIsDrawing(false);
    setLastPos(null);
    setPath([]);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    />
  );
};

export default Canvas;
