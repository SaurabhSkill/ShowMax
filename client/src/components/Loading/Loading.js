import React from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: { 
    background: theme.palette.background.gradient,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  
  // Cinematic background effects
  backgroundEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(218, 165, 32, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    zIndex: 0
  },
  
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  },
  
  // Custom spinner with cinematic styling
  spinnerContainer: {
    position: 'relative',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  spinner: {
    width: '80px',
    height: '80px',
    border: '3px solid rgba(218, 165, 32, 0.1)',
    borderTop: '3px solid #DAA520',
    borderRadius: '50%',
    animation: '$spin 1s linear infinite',
    boxShadow: '0 0 20px rgba(218, 165, 32, 0.3)'
  },
  
  innerSpinner: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    border: '2px solid rgba(255, 215, 0, 0.1)',
    borderBottom: '2px solid #FFD700',
    borderRadius: '50%',
    animation: '$spin 0.8s linear infinite reverse'
  },
  
  loadingText: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textAlign: 'center',
    animation: '$pulse 2s ease-in-out infinite'
  },
  
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    fontWeight: 400,
    textAlign: 'center',
    marginTop: '0.5rem'
  },
  
  // Loading dots animation
  dots: {
    display: 'inline-block',
    animation: '$dots 1.5s steps(4, end) infinite'
  },
  
  // Keyframe animations
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.6 }
  },
  
  '@keyframes dots': {
    '0%, 20%': { content: '"."' },
    '40%': { content: '".."' },
    '60%': { content: '"..."' },
    '80%, 100%': { content: '""' }
  }
}));

export default ({ message = 'Loading', subtitle = 'Please wait while we prepare your cinematic experience' }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className={classes.backgroundEffect} />
      
      <div className={classes.content}>
        <div className={classes.spinnerContainer}>
          <div className={classes.spinner} />
          <div className={classes.innerSpinner} />
        </div>
        
        <Box textAlign="center">
          <Typography className={classes.loadingText}>
            {message}
            <span className={classes.dots}></span>
          </Typography>
          
          {subtitle && (
            <Typography className={classes.subtitle}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};
