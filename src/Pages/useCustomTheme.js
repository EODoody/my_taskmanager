import { useState } from 'react';
import { createTheme } from '@mui/material/styles';

const useCustomTheme = () => {
  
  const [paletteMode, setPaletteMode] = useState(localStorage.getItem('paletteMode') || 'light');

  const togglePaletteMode = () => {
    const newPaletteMode = paletteMode === 'light' ? 'dark' : 'light';
    setPaletteMode(newPaletteMode);
    localStorage.setItem('paletteMode', newPaletteMode);
  };

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      primary: {
        main: '#2196f3', // Blue
      },
      secondary: {
        main: '#ff9800', // Orange
      },
      background: {
        default: paletteMode === 'light' ? '#F1F6F9' : '#212A3E',
      },
    },
    
  });

  return { theme, paletteMode, togglePaletteMode };
};

export default useCustomTheme;
