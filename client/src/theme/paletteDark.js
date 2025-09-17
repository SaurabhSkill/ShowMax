import { red, lightBlue, yellow, green } from '@material-ui/core/colors';
const white = '#FFFFFF';
const black = '#000000';

export default {
  type: 'dark',
  common: {
    black,
    white,
    commonBackground: '#0A0A0A',
    contrastText: white,
    neutral: '#E4E7EB',
    muted: '#9EA0A4'
  },
  default: {
    light: 'rgba(0, 123, 255, 0.1)',
    main: 'rgba(0, 123, 255, 0.9)',
    dark: '#001122',
    logoBg: '#1A1A1A',
    border: 'rgba(255, 255, 255, 0.1)',
    contrastText: white
  },
  primary: {
    light: '#4FC3F7',
    main: '#007BFF',
    dark: '#0056B3',
    contrastText: white
  },
  secondary: {
    light: '#FF6B9D',
    main: '#E91E63',
    dark: '#AD1457',
    contrastText: white
  },
  success: {
    light: green[300],
    main: green[500],
    dark: green[700],
    contrastText: white
  },
  info: {
    light: lightBlue[300],
    main: lightBlue[500],
    dark: lightBlue[700],
    contrastText: white
  },
  warning: {
    light: yellow[300],
    main: yellow[500],
    dark: yellow[700],
    contrastText: white
  },
  danger: {
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: white
  },
  background: {
    paper: '#1A1A1A',
    default: '#0A0A0A',
    dark: '#0A0A0A'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    disabled: '#666666'
  },
  border: 'rgba(255, 255, 255, 0.1)',
  divider: 'rgba(255, 255, 255, 0.1)',
  // ShowMax specific colors
  showmax: {
    primary: '#007BFF',
    secondary: '#6C757D',
    accent: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
    dark: '#0A0A0A',
    light: '#F8F9FA'
  }
};
