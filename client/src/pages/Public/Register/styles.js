export default theme => ({
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
      url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')
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
    },
    
    '&::after': {
      content: '"Join the Cinema Experience"',
      position: 'absolute',
      bottom: '2rem',
      left: '2rem',
      right: '2rem',
      zIndex: 2,
      color: theme.palette.text.primary,
      fontSize: '1.5rem',
      fontWeight: 700,
      textAlign: 'center',
      background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }
  },

  // Right side - Register form
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
  
  form: {
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto'
  },
  
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: '0.5rem',
    textAlign: 'center',
    letterSpacing: '-0.01em'
  },
  
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '2.5rem',
    fontWeight: 400
  },
  
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.default,
      borderRadius: '12px',
      border: `1px solid ${theme.palette.divider}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      
      '& fieldset': {
        border: 'none'
      },
      
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.primary.light}`,
        transform: 'translateY(-1px)',
        boxShadow: theme.palette.shadows.button
      },
      
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 0 0 3px ${theme.palette.primary.light}20, ${theme.palette.shadows.button}`,
        transform: 'translateY(-1px)'
      },
      
      '&.Mui-error': {
        border: `1px solid ${theme.palette.danger.main}`,
        backgroundColor: `${theme.palette.danger.light}10`
      }
    },
    
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      fontSize: '0.9rem',
      fontWeight: 500,
      
      '&.Mui-focused': {
        color: theme.palette.primary.main
      },
      
      '&.Mui-error': {
        color: theme.palette.danger.main
      }
    },
    
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
      fontSize: '1rem',
      padding: '1rem',
      
      '&::placeholder': {
        color: theme.palette.text.disabled,
        opacity: 1
      }
    },
    
    '& .MuiFormHelperText-root': {
      color: theme.palette.danger.main,
      fontSize: '0.8rem',
      marginTop: '0.5rem',
      marginLeft: '0.5rem'
    }
  },
  
  upload: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.default,
      border: `2px dashed ${theme.palette.primary.light}`,
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        border: `2px dashed ${theme.palette.primary.main}`,
        transform: 'translateY(-2px)'
      }
    },
    
    '& .MuiTypography-root': {
      color: theme.palette.text.secondary
    }
  },
  
  policy: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: theme.palette.background.default,
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`
  },
  
  policyCheckbox: {
    color: theme.palette.text.secondary,
    padding: '0',
    
    '&.Mui-checked': {
      color: theme.palette.primary.main
    }
  },
  
  policyText: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    lineHeight: 1.5,
    flex: 1
  },
  
  policyUrl: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.3s ease',
    
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  
  registerButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '12px',
    textTransform: 'none',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.primary.contrastText,
    border: 'none',
    boxShadow: theme.palette.shadows.button,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '2rem',
    
    '&:hover:not(:disabled)': {
      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.shadows.buttonHover
    },
    
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: theme.palette.shadows.button
    },
    
    '&:disabled': {
      background: theme.palette.background.default,
      color: theme.palette.text.disabled,
      transform: 'none',
      boxShadow: 'none',
      cursor: 'not-allowed'
    }
  },
  
  login: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '0.95rem',
    fontWeight: 400
  },
  
  loginUrl: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 600,
    marginLeft: '0.5rem',
    transition: 'color 0.3s ease',
    
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  
  // Error states
  fieldError: {
    color: theme.palette.danger.main,
    fontSize: '0.8rem',
    marginTop: '0.5rem',
    marginLeft: '0.5rem'
  },
  
  submitError: {
    color: theme.palette.danger.main,
    textAlign: 'center',
    fontSize: '0.9rem',
    padding: '1rem',
    backgroundColor: `${theme.palette.danger.light}20`,
    border: `1px solid ${theme.palette.danger.light}`,
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  
  // Mobile welcome section
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
