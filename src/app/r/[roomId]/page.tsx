"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Canvas from "../../../components/canvas";
import BottomToolbar from "../../../components/toolbar";

export default function Room() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;

  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(4);
  const [tool, setTool] = useState<"draw" | "erase">("draw");
  const [clearSignal, setClearSignal] = useState(0);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Room: {roomId}</h2>

      <Canvas
        strokeColor={color}
        strokeWidth={width}
        clearSignal={clearSignal}
      />

      <BottomToolbar
         tool={tool}
         color={color}
         onToolChange={(t) => setTool(t)}
         onClear={() => setClearSignal((s) => s + 1)}
         onColorPick={(c) => setColor(c)}
       />
    </div>
  );
}
