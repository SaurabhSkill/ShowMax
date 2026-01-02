import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Box, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import LoginForm from './components/LoginForm';

const styles = theme => ({
  root: {
    background: theme.palette.background.gradient,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },
  
  // Background effects
  backgroundEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(218, 165, 32, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)
    `,
    zIndex: 0
  },
  
  grid: {
    minHeight: '100vh',
    position: 'relative',
    zIndex: 1
  },
  
  // Left side - Cinematic background
  bgWrapper: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  
  bg: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `
      linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.95) 100%),
      url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.9) 100%)',
      zIndex: 1
    }
  },
  
  bgContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '400px'
  },
  
  bgTitle: {
    fontSize: '3rem',
    fontWeight: 800,
    color: theme.palette.text.primary,
    marginBottom: '1rem',
    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em'
  },
  
  bgSubtitle: {
    fontSize: '1.25rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
    fontWeight: 400
  },
  
  // Right side - Login form
  content: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${theme.palette.divider}`,
    
    [theme.breakpoints.down('md')]: {
      background: theme.palette.background.default,
      backdropFilter: 'blur(30px)'
    }
  },
  
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '2rem',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  
  backButton: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '0.75rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.dark,
      transform: 'translateY(-1px)',
      boxShadow: theme.palette.shadows.button
    }
  },
  
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    
    [theme.breakpoints.down('md')]: {
      padding: '1rem'
    }
  },
  
  // Mobile-only welcome section
  mobileWelcome: {
    display: 'none',
    textAlign: 'center',
    marginBottom: '3rem',
    
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  
  mobileTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: theme.palette.text.primary,
    marginBottom: '1rem',
    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  },
  
  mobileSubtitle: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
    fontWeight: 400
  }
});

class Login extends Component {
  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <div className={classes.backgroundEffect} />
        
        <Grid className={classes.grid} container>
          {/* Left side - Cinematic background */}
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg}>
              <div className={classes.bgContent}>
                <Typography className={classes.bgTitle}>
                  Welcome Back
                </Typography>
                <Typography className={classes.bgSubtitle}>
                  Sign in to continue your cinematic journey and discover amazing movies.
                </Typography>
              </div>
            </div>
          </Grid>
          
          {/* Right side - Login form */}
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.contentHeader}>
              <IconButton
                className={classes.backButton}
                onClick={this.handleBack}
                aria-label="Go back"
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
            
            <div className={classes.contentBody}>
              <Box width="100%" maxWidth="400px">
                {/* Mobile welcome section */}
                <div className={classes.mobileWelcome}>
                  <Typography className={classes.mobileTitle}>
                    Welcome Back
                  </Typography>
                  <Typography className={classes.mobileSubtitle}>
                    Sign in to continue your cinematic journey
                  </Typography>
                </div>
                
                <LoginForm redirect />
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
