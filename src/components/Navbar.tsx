import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Snackbar, Button, Box } from '@mui/material';
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
    <Box
      sx={{
        overflow: 'hidden',
        boxShadow: 1,
      }}
    >
      <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'linear-gradient(to bottom right, #BBDEFB, #E1BEE7, #F8BBD0)' }}>
        <Toolbar>
        <div style ={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#1F2937' }}>ShareBoard</Typography>
          <Typography variant="h6" component="div" sx={{ color: 'text.primary', ml: 5, fontSize: '1rem' }}>
            Room:
          </Typography>

          <Box
            sx={{
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              padding: '4px 12px',
              display: 'inline-block',
              ml: 1
            }}
          >
            <Typography variant="h6" component="div" sx={{ color: 'text.primary', fontSize: '1rem' }}>
              {roomId}
            </Typography>
          </Box>
          <IconButton onClick={handleCopy} color="default">
            <ContentCopyIcon fontSize="small"/>
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
    </Box>
  );
};

export default Navbar;
