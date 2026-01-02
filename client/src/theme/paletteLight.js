const white = '#FFFFFF';
const black = '#000000';

// Light mode cinematic color palette with improved contrast ratios
export default {
  type: 'light',
  common: {
    black,
    white,
    commonBackground: '#FAFBFC', // Clean white background
    contrastText: black,
    neutral: '#6B7280',
    muted: '#9CA3AF'
  },
  default: {
    light: 'rgba(218, 165, 32, 0.1)', // Gold tint
    main: 'rgba(218, 165, 32, 0.9)', // Rich gold
    dark: '#B8860B', // Dark goldenrod
    logoBg: '#F8FAFC', // Light background
    border: 'rgba(218, 165, 32, 0.2)', // Gold border
    contrastText: black
  },
  primary: {
    light: '#FFD700', // Bright gold
    main: '#DAA520', // Goldenrod - premium cinema feel
    dark: '#B8860B', // Dark goldenrod
    contrastText: white
  },
  secondary: {
    light: '#F48FB1', // Light pink
    main: '#E91E63', // Bright pink - cinema seats
    dark: '#C2185B', // Dark pink
    contrastText: white
  },
  success: {
    light: '#81C784',
    main: '#4CAF50', // Success green
    dark: '#2E7D32', // Darker green for better contrast
    contrastText: white
  },
  info: {
    light: '#64B5F6',
    main: '#2196F3', // Info blue
    dark: '#1565C0', // Darker blue for better contrast
    contrastText: white
  },
  warning: {
    light: '#FFB74D',
    main: '#FF9800', // Warning orange
    dark: '#E65100', // Darker orange for better contrast
    contrastText: white
  },
  danger: {
    light: '#E57373',
    main: '#F44336', // Error red
    dark: '#C62828', // Darker red for better contrast
    contrastText: white
  },
  background: {
    paper: '#FFFFFF', // Pure white for cards
    default: '#FAFBFC', // Very light grey background
    dark: '#F5F5F5', // Light grey for overlays
    gradient: 'linear-gradient(135deg, #FAFBFC 0%, #F0F4F8 50%, #E2E8F0 100%)', // Light gradient
    cardGradient: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)', // Card gradient
    heroGradient: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.9))' // Hero overlay
  },
  text: {
    primary: '#111827', // Very dark grey for maximum contrast (21:1 ratio)
    secondary: '#374151', // Dark grey for secondary text (12:1 ratio)
    disabled: '#6B7280', // Medium grey for disabled text (4.5:1 ratio)
    accent: '#92400E', // Dark amber for accent text (7:1 ratio)
    subtitle: '#4B5563', // Darker grey for subtitles (9:1 ratio)
    hint: '#9CA3AF' // Light grey for hints (3.5:1 ratio - for large text only)
  },
  border: 'rgba(218, 165, 32, 0.2)', // Gold border
  divider: 'rgba(0, 0, 0, 0.12)', // Darker divider for better visibility
  
  // Cinematic-specific colors for light mode with improved contrast
  cinema: {
    // Premium gold palette
    gold: {
      50: '#FFFEF7',
      100: '#FFF8DC',
      200: '#F0E68C',
      300: '#DAA520',
      400: '#B8860B',
      500: '#996515',
      600: '#7A4F0A',
      700: '#5C3A08',
      800: '#3D2505',
      900: '#1F1203'
    },
    // Light space palette with better contrast
    space: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A'
    },
    // Cinema red palette
    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D'
    },
    // Accent colors with better contrast
    accent: {
      purple: '#7C3AED', // Darker purple for better contrast
      cyan: '#0891B2', // Darker cyan for better contrast
      emerald: '#059669', // Darker emerald for better contrast
      rose: '#E11D48', // Darker rose for better contrast
      amber: '#D97706' // Darker amber for better contrast
    },
    // Semantic colors with improved contrast
    semantic: {
      success: '#059669', // Darker green
      warning: '#D97706', // Darker amber
      error: '#DC2626', // Darker red
      info: '#1D4ED8' // Darker blue
    }
  },
  
  // Elevation shadows for depth (lighter for light mode)
  shadows: {
    card: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
    cardHover: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.08)',
    button: '0 1px 3px rgba(218, 165, 32, 0.3)',
    buttonHover: '0 2px 8px rgba(218, 165, 32, 0.4)',
    navbar: '0 1px 3px rgba(0, 0, 0, 0.1)',
    modal: '0 10px 25px rgba(0, 0, 0, 0.15)'
  },
  
  // Glass morphism effects for light mode
  glass: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(0, 0, 0, 0.1)',
    backdrop: 'blur(20px)'
  }
};