// @ts-nocheck
import { createMuiTheme } from '@material-ui/core/styles';
import paletteLight from './paletteLight';
import typography from './typography';

// Cinematic theme for ShowMax - Modern movie theater experience (Light Mode)
const theme = createMuiTheme({
  palette: paletteLight,
  typography,
  
  // Enhanced spacing system
  spacing: 8, // 8px base unit
  
  // Z-index layers
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  
  // Layout dimensions
  topBar: {
    height: '64px' // Increased for better presence
  },
  
  // Custom breakpoints for cinematic experience
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  
  // Enhanced shadows for light mode
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
    '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.12)',
    '0 10px 20px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.10)',
    '0 14px 28px rgba(0, 0, 0, 0.18), 0 10px 10px rgba(0, 0, 0, 0.12)',
    '0 19px 38px rgba(0, 0, 0, 0.20), 0 15px 12px rgba(0, 0, 0, 0.15)',
    '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)', // Card shadow
    '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.08)', // Card hover
    '0 1px 3px rgba(218, 165, 32, 0.3)', // Button shadow
    '0 2px 8px rgba(218, 165, 32, 0.4)', // Button hover
    '0 1px 3px rgba(0, 0, 0, 0.1)', // Navbar shadow
    '0 10px 25px rgba(0, 0, 0, 0.15)', // Modal shadow
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)',
    '0 25px 50px rgba(0, 0, 0, 0.15)'
  ],
  
  // Component overrides for cinematic styling
  overrides: {
    // Button overrides
    MuiButton: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
        padding: '12px 24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
        }
      },
      contained: {
        boxShadow: '0 2px 8px rgba(218, 165, 32, 0.25)',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(218, 165, 32, 0.35)',
        }
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #DAA520 0%, #B8860B 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #B8860B 0%, #996515 100%)',
        }
      }
    },
    
    // Card overrides
    MuiCard: {
      root: {
        borderRadius: 16,
        background: paletteLight.background.cardGradient,
        border: `1px solid ${paletteLight.border}`,
        boxShadow: paletteLight.shadows.card,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: paletteLight.shadows.cardHover,
          transform: 'translateY(-4px)',
        }
      }
    },
    
    // Paper overrides
    MuiPaper: {
      root: {
        borderRadius: 12,
        background: paletteLight.background.paper,
        border: `1px solid ${paletteLight.border}`,
      },
      elevation1: {
        boxShadow: paletteLight.shadows.card,
      }
    },
    
    // TextField overrides
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          '& fieldset': {
            borderColor: paletteLight.border,
          },
          '&:hover fieldset': {
            borderColor: paletteLight.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: paletteLight.primary.main,
            borderWidth: 2,
          }
        }
      }
    },
    
    // AppBar overrides
    MuiAppBar: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${paletteLight.border}`,
        boxShadow: paletteLight.shadows.navbar,
        color: paletteLight.text.primary,
      }
    }
  },
  
  // Custom properties for cinematic theme
  props: {
    MuiButton: {
      disableElevation: false,
    },
    MuiCard: {
      elevation: 0,
    }
  }
});

export default theme;
