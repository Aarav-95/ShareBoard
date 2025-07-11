import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Snackbar, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface NavbarProps {
  roomId: string;
  onLeave: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ roomId, onLeave }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'linear-gradient(to bottom right, #BBDEFB, #E1BEE7, #F8BBD0)' }}>
        <Toolbar>
        <div style ={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'text.primary' }}>
            Room: {roomId}
          </Typography>

          <IconButton onClick={handleCopy} color="default" sx ={{ ml: 2}}>
            <ContentCopyIcon />
          </IconButton>
        </div>
          <Button
            startIcon={<ExitToAppIcon />}
            onClick={onLeave}
            color="error"
            sx={{ ml: 1, textTransform: 'none' }}
            size="large"
          >
            Leave
          </Button>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        message="Link copied!"
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default Navbar;
