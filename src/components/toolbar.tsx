import React from "react";
import { Paper, IconButton, Box } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorLensIcon from "@mui/icons-material/ColorLens";

interface ToolbarProps {
  tool: "draw" | "erase";
  color: string;
  onToolChange: (t: "draw" | "erase") => void;
  onClear: () => void;
  onColorPick: (c: string) => void;
}

export default function BottomToolbar({
  tool,
  color,
  onToolChange,
  onClear,
  onColorPick,
}: ToolbarProps) {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        bgcolor: "background.paper",
      }}
    >
      <Box>
        <IconButton
          color={tool === "draw" ? "primary" : "default"}
          onClick={() => onToolChange("draw")}
        >
          <BrushIcon />
        </IconButton>
        <IconButton
          color={tool === "erase" ? "primary" : "default"}
          onClick={() => onToolChange("erase")}
        >
          <FormatColorResetIcon />
        </IconButton>
      </Box>

      <Box sx={{ mx: 2, height: 24, width: 1, bgcolor: "divider" }} />

      <IconButton onClick={onClear} color="error">
        <DeleteIcon />
      </IconButton>

      <IconButton component="label" sx={{ ml: 1 }}>
        <ColorLensIcon />
        <input
          type="color"
          value={color}
          onChange={(e) => onColorPick(e.target.value)}
          hidden
        />
      </IconButton>
    </Paper>
  );
}
