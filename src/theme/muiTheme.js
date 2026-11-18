import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#5b9fd4' : '#1e6a9a',
        light: '#8ec5ea',
        dark: '#3a7aad',
      },
      secondary: {
        main: mode === 'dark' ? '#c4a574' : '#8b6914',
      },
      background: {
        default: mode === 'dark' ? '#0f1216' : '#eef1f5',
        paper: mode === 'dark' ? '#171b21' : '#ffffff',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      text: {
        primary: mode === 'dark' ? '#e8edf2' : '#1a1f26',
        secondary: mode === 'dark' ? '#9aa7b5' : '#5a6674',
      },
    },
    typography: {
      fontFamily: '"DM Sans", "Segoe UI", sans-serif',
      h6: { fontWeight: 600, letterSpacing: '-0.02em' },
      subtitle2: { fontWeight: 600, letterSpacing: '0.02em' },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            borderRight: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            backgroundColor: mode === 'dark' ? '#2a313a' : '#1a1f26',
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: { color: mode === 'dark' ? '#5b9fd4' : '#1e6a9a' },
        },
      },
    },
  });
