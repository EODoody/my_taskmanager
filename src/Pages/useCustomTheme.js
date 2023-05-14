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
        main: paletteMode === 'light' ? '#ffffff' : '#000000',
      },
      secondary: {
        main: paletteMode === 'light' ? '#1596FF': '#2da1ff',
      },
      index: {
        default: paletteMode === 'light' ? `url(${require("../Images/dark.png")})` : `url(${require("../Images/light.png")})`
      },
      background:{
        default: paletteMode === 'light' ? `url(${require("../Images/D.png")})` : `url(${require("../Images/L.png")})`
      },
    },
    
  });

  return { theme, paletteMode, togglePaletteMode };
};

export default useCustomTheme;
