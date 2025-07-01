"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';
import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material';

const HomePage: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');
  const router = useRouter();

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 10);
    router.push(`/r/${id}`);
  };

  const joinRoom = () => {
    const trimmed = roomId.trim();
    if (trimmed) router.push(`/r/${trimmed}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #BBDEFB, #E1BEE7, #F8BBD0)',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          <Typography
            variant="h1"
            align="center"
            fontWeight={600}
            sx={{
              fontSize: { xs: '2.5rem', md: '5rem' },
              color: '#1a1a1a',
            }}
          >
            ShareBoard
          </Typography>

          <TypeAnimation
            sequence={[
              'Draw together in real-time—no signup required.',
              2000,
            ]}
            speed={50}
            wrapper="span"
            repeat={Infinity}
            style={{
              fontSize: '1.25rem',
              textAlign: 'center',
              color: 'rgba(0,0,0,0.7)',
              minHeight: '1.5em',
            }}
          />

          <Button
            color='secondary'
            variant="contained"
            fullWidth
            size="large"
            onClick={createRoom}
            sx={{
              borderRadius: '32px',
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: 3,
            }}
          >
            Create a Room
          </Button>

          <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '32px',
                  backgroundColor: '#fff',
                },
              }}
            />
            <Button
              variant="outlined"
              size="large"
              onClick={joinRoom}
              sx={{
                borderRadius: '32px',
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                borderColor: '#6c63ff',
                color: '#6c63ff',
              }}
            >
              Join
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
