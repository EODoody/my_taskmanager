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
        main: '#3f51b5', 
      },
      secondary: {
        main: '#82488c', // Orange
      },
      background: {
        default: paletteMode === 'light' ? '#F1F6F9' : '#212A3E',
      },
    },
    
  });

  return { theme, paletteMode, togglePaletteMode };
};

export default useCustomTheme;
