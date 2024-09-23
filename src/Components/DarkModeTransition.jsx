import React, { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import SunIcon from '@mui/icons-material/WbSunny';
import MoonIcon from '@mui/icons-material/NightsStay';

const DarkModeTransition = ({ darkMode, onAnimationEnd }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => {
      setShowAnimation(false);
      if (onAnimationEnd) onAnimationEnd();
    }, 1000); // Match this with the duration of the Fade effect

    return () => clearTimeout(timer);
  }, [darkMode, onAnimationEnd]);

  return (
    <Fade in={showAnimation} timeout={1000}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: darkMode ? 'black' : 'white',
          color: darkMode ? 'white' : 'black',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        {darkMode ? (
          <MoonIcon sx={{ fontSize: 100 }} />
        ) : (
          <SunIcon sx={{ fontSize: 100 }} />
        )}
      </Box>
    </Fade>
  );
};

export default DarkModeTransition;
