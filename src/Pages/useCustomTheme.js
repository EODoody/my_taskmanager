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
    },
  });

  return { theme, paletteMode, togglePaletteMode };
};

export default useCustomTheme;