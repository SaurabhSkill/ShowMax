export default {
  useNextVariants: true,
  fontSize: 14, // Increased base font size for better readability
  fontFamily: [
    'Inter', // Modern, clean font for UI
    'Montserrat', // Fallback
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ].join(','),
  
  // Cinematic typography scale
  h1: {
    fontSize: '3.5rem', // 56px - Hero titles
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  h2: {
    fontSize: '2.75rem', // 44px - Section titles
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  h3: {
    fontSize: '2.25rem', // 36px - Subsection titles
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  h4: {
    fontSize: '1.875rem', // 30px - Card titles
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  h5: {
    fontSize: '1.5rem', // 24px - Component titles
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  h6: {
    fontSize: '1.25rem', // 20px - Small titles
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  subtitle1: {
    fontSize: '1.125rem', // 18px - Large subtitles
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  subtitle2: {
    fontSize: '1rem', // 16px - Regular subtitles
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  body1: {
    fontSize: '1rem', // 16px - Regular body text
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  body2: {
    fontSize: '0.875rem', // 14px - Small body text
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  button: {
    fontSize: '0.875rem', // 14px - Button text
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    textTransform: 'none', // Preserve case
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  caption: {
    fontSize: '0.75rem', // 12px - Captions and labels
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  overline: {
    fontSize: '0.75rem', // 12px - Overline text
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontFamily: 'Inter, Montserrat, sans-serif'
  }
};
