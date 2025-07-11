"use client";

import Navbar from '../../../components/Navbar';
import Canvas from '../../../components/Canvas';
import Toolbar from '../../../components/Toolbar';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box } from '@mui/material';

export default function RoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;

  // Drawing state
  const [penColor, setPenColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraseMode, setEraseMode] = useState(false);
  const [clearSignal, setClearSignal] = useState(0);

  // Text mode state
  const [textMode, setTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);

  const handleLeave = () => {
    router.push('/');
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: bgColor, position: 'relative' }}>
      {/* Navbar shows roomId and leave button */}
      <Navbar roomId={roomId} onLeave={handleLeave} />

      {/* Canvas area adapts to full available space */}
      <Box sx={{ pt: 8, pb: 8, height: 'calc(100% - 112px)' }}>
        <Canvas
          roomId={roomId}
          penColor={penColor}
          bgColor={bgColor}
          strokeWidth={strokeWidth}
          eraseMode={eraseMode}
          clearSignal={clearSignal}
          textMode={textMode}
          textInput={textInput}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
      </Box>

      {/* Floating toolbar */}
      <Toolbar
        penColor={penColor}
        bgColor={bgColor}
        strokeWidth={strokeWidth}
        eraseMode={eraseMode}
        textMode={textMode}
        fontFamily={fontFamily}
        fontSize={fontSize}
        textInput={textInput}
        onPenColorChange={setPenColor}
        onBgColorChange={setBgColor}
        onStrokeWidthChange={setStrokeWidth}
        onEraseToggle={() => setEraseMode(!eraseMode)}
        onClear={() => setClearSignal(sig => sig + 1)}
        onTextModeToggle={() => setTextMode(!textMode)}
        onFontFamilyChange={setFontFamily}
        onFontSizeChange={setFontSize}
        onTextInputChange={setTextInput}
      />
    </Box>
  );
}
