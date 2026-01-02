import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Navbar, Footer } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.gradient,
    color: theme.palette.text.primary,
    minHeight: '100vh',
    paddingTop: '80px', // Updated for new navbar height
    position: 'relative',
    
    // Add subtle texture overlay
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 25% 25%, rgba(218, 165, 32, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)
      `,
      pointerEvents: 'none',
      zIndex: 0
    }
  },
  
  content: {
    position: 'relative',
    zIndex: 1
  }
}));

function PublicLayout(props) {
  const classes = useStyles(props);
  const { children, withFooter = true } = props;
  
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.content}>
        {children}
      </div>
      {withFooter && <Footer />}
    </div>
  );
}

export default PublicLayout;
