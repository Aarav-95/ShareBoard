"use client";

import React from 'react';
import { Box, Container, Typography, Fade } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import GroupsIcon from '@mui/icons-material/Groups';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';

// Feature definitions
const features = [
  {
    title: 'Real-Time Collaboration',
    description: 'Sketch together with friends or teammates in real time—every stroke broadcasts instantly via WebSockets.',
    icon: <GroupsIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Draw & Erase',
    description: 'Choose your brush color, erase mistakes effortlessly, and undo with precision.',
    icon: <BrushIcon fontSize="large" color="secondary" />,
  },
  {
    title: 'Clear Board',
    description: 'Start fresh anytime with a single tap to clear the entire canvas for everyone.',
    icon: <DeleteIcon fontSize="large" color="error" />,
  },
  {
    title: 'Shareable Link',
    description: 'Invite others instantly with a short URL—no signup required.',
    icon: <LinkIcon fontSize="large" color="action" />,
  },
];

// Individual feature item with frosted-glass styling
function FeatureItem({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <Box
      ref={ref}
      component="div"
      sx={{
        position: 'relative',
        mb: { xs: 6, md: 10 },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { md: index % 2 === 0 ? 'flex-start' : 'flex-end' },
        px: { xs: 2, md: 4 },
        py: { md: 4 },
      }}
    >
      {/* Timeline dot */}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          border: theme => `4px solid`,
          zIndex: 1,
        }}
      />

      {/* Frosted card content */}
      <Fade in={inView} timeout={600}>
        <Box
          sx={{
            maxWidth: '45%',
            p: 4,
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            boxShadow: 3,
            textAlign: { md: index % 2 === 0 ? 'left' : 'right', xs: 'center' },
          }}
        >
          <Box mb={1} display="inline-block">
            {feature.icon}
          </Box>
          <Typography variant="h6" color="black" gutterBottom>
            {feature.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {feature.description}
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}

export default function Features() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 6, md: 12 },
        // extend hero gradient behind features
        background: 'linear-gradient(to top right, #BBDEFB, #E1BEE7, #F8BBD0)',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Vertical timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            transform: 'translateX(-50%)',
            width: 2,
            bgcolor: 'grey.300',
            zIndex: 0,
          }}
        />

        {/* Render each feature */}
        {features.map((f, idx) => (
          <FeatureItem key={idx} feature={f} index={idx} />
        ))}
      </Container>
    </Box>
  );
}
