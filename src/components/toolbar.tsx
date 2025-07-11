"use client";

import React, { useState } from 'react';
import { Box, IconButton, Slider, Tooltip, FormControl, InputLabel, Select, MenuItem, TextField, Popover } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TitleIcon from '@mui/icons-material/Title';
import { SketchPicker, ColorResult } from "react-color";

interface ToolbarProps {
  penColor: string;
  bgColor: string;
  strokeWidth: number;
  eraseMode: boolean;
  textMode: boolean;
  fontFamily: string;
  fontSize: number;
  textInput: string;
  onPenColorChange: (c: string) => void;
  onBgColorChange: (c: string) => void;
  onStrokeWidthChange: (w: number) => void;
  onEraseToggle: () => void;
  onClear: () => void;
  onTextModeToggle: () => void;
  onFontFamilyChange: (f: string) => void;
  onFontSizeChange: (s: number) => void;
  onTextInputChange: (t: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  penColor,
  bgColor,
  strokeWidth,
  eraseMode,
  textMode,
  fontFamily,
  fontSize,
  textInput,
  onPenColorChange,
  onBgColorChange,
  onStrokeWidthChange,
  onEraseToggle,
  onClear,
  onTextModeToggle,
  onFontFamilyChange,
  onFontSizeChange,
  onTextInputChange,
}) => {
  const [penAnchor, setPenAnchor] = useState<null | HTMLElement>(null);
  const [bgAnchor, setBgAnchor] = useState<null | HTMLElement>(null);

  const openPenPicker = (e: React.MouseEvent<HTMLElement>) => setPenAnchor(e.currentTarget);
  const closePenPicker = () => setPenAnchor(null);
  const penOpen = Boolean(penAnchor);

  const openBgPicker = (e: React.MouseEvent<HTMLElement>) => setBgAnchor(e.currentTarget);
  const closeBgPicker = () => setBgAnchor(null);
  const bgOpen = Boolean(bgAnchor);

  const handlePenChange = (color: ColorResult) => onPenColorChange(color.hex);
  const handleBgChange  = (color: ColorResult) => onBgColorChange(color.hex);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        bgcolor: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        boxShadow: 3,
        borderRadius: '24px',
        width: { xs: '95%', sm: 'auto' },
        zIndex: 1000,
      }}
    >
      <Tooltip title={textMode ? 'Switch to Draw/Erase' : 'Text Mode'}>
        <IconButton onClick={onTextModeToggle} color={textMode ? 'primary' : 'default'}>
          <TitleIcon />
        </IconButton>
      </Tooltip>

      {textMode ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Enter text"
            value={textInput}
            onChange={(e) => onTextInputChange(e.target.value)}
            sx={{ minWidth: 120 }}
          />
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Font</InputLabel>
            <Select
              value={fontFamily}
              label="Font"
              onChange={(e) => onFontFamilyChange(e.target.value)}
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Helvetica">Helvetica</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ width: 120, display: 'flex', alignItems: 'center' }}>
            <Slider
              value={fontSize}
              onChange={(e, v) => onFontSizeChange(v as number)}
              min={8}
              max={72}
              size="small"
            />
          </Box>
        </Box>
      ) : (
        <>
          <Tooltip title={eraseMode ? 'Draw' : 'Erase'}>
            <IconButton onClick={onEraseToggle} color={eraseMode ? 'default' : 'primary'}>
              {eraseMode ? <BrushIcon /> : <FormatColorResetIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear Board">
            <IconButton onClick={onClear} color="error">
              <ClearAllIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pen Color">
            <IconButton onClick={openPenPicker} size="small" aria-label="Choose pen color">
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: penColor,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Popover for PenColor */}
          <Popover
            open={penOpen}
            anchorEl={penAnchor}
            onClose={closePenPicker}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <SketchPicker
              color={penColor}
              onChange={handlePenChange}
            />
          </Popover>


          <Tooltip title="Background Color">
            <IconButton onClick={openBgPicker} size="small" aria-label="Choose background color">
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: bgColor,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
            </IconButton>
          </Tooltip>

          <Popover
            open={bgOpen}
            anchorEl={bgAnchor}
            onClose={closeBgPicker}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <SketchPicker color={bgColor} onChange={handleBgChange} />
          </Popover>


          <Box sx={{ width: 120 }}>
            <Slider
              value={strokeWidth}
              onChange={(e, v) => onStrokeWidthChange(v as number)}
              min={1}
              max={50}
              size="small"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Toolbar;