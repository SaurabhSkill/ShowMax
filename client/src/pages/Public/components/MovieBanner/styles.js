export default theme => ({
  movieHero: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    color: '#FFFFFF',
    background: theme.palette.background.gradient,
    display: 'flex',
    alignItems: 'center',
    padding: '2rem 0',
    overflow: 'hidden'
  },
  
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(0.7) contrast(1.3) saturate(1.2)',
    
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.5) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)
      `
    }
  },
  
  infoSection: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    gap: '4rem',
    
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '2rem',
      padding: '0 1rem'
    }
  },
  
  moviePoster: {
    width: '350px',
    height: '525px',
    borderRadius: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(218, 165, 32, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    flexShrink: 0,
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, transparent 50%)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: `
        0 35px 70px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(218, 165, 32, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2)
      `,
      
      '&::before': {
        opacity: 1
      }
    },
    
    [theme.breakpoints.down('md')]: {
      width: '280px',
      height: '420px'
    },
    
    [theme.breakpoints.down('sm')]: {
      width: '240px',
      height: '360px'
    }
  },
  
  movieHeader: {
    flex: 1,
    maxWidth: '700px'
  },
  
  tag: {
    padding: '0.6rem 1.2rem',
    marginRight: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid rgba(218, 165, 32, 0.3)',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: 600,
    display: 'inline-block',
    background: 'rgba(218, 165, 32, 0.15)',
    color: theme.palette.primary.dark,
    backdropFilter: 'blur(10px)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      background: 'rgba(218, 165, 32, 0.25)',
      border: '1px solid rgba(218, 165, 32, 0.5)',
      transform: 'translateY(-1px)'
    }
  },
  
  movieTitle: {
    fontSize: '4rem',
    lineHeight: 1.1,
    fontWeight: 800,
    marginBottom: '1.5rem',
    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem'
    },
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem'
    }
  },
  
  movieMeta: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
    
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    },
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '0.5rem'
    }
  },
  
  descriptionText: {
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',
    lineHeight: 1.7,
    marginBottom: '2rem',
    fontWeight: 400,
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem'
    }
  },
  
  director: {
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    marginBottom: '2rem',
    fontWeight: 500,
    
    '& strong': {
      color: theme.palette.primary.main,
      fontWeight: 600
    }
  },
  
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2.5rem',
    gap: '1rem',
    
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  
  ratingText: {
    color: theme.palette.text.primary,
    fontSize: '1.2rem',
    fontWeight: 600
  },
  
  movieActions: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    },
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%'
    }
  },
  
  button: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.primary.contrastText,
    padding: '1.2rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: '12px',
    textTransform: 'none',
    minWidth: '200px',
    boxShadow: theme.palette.shadows.button,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
      transform: 'translateY(-3px)',
      boxShadow: theme.palette.shadows.buttonHover
    },
    
    '&:active': {
      transform: 'translateY(-1px)',
      boxShadow: theme.palette.shadows.button
    },
    
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '1rem 2rem',
      fontSize: '1rem'
    }
  },
  
  learnMore: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.divider}`,
    backdropFilter: 'blur(10px)',
    
    '&:hover': {
      background: theme.palette.primary.light + '20',
      border: `2px solid ${theme.palette.primary.light}`,
      color: theme.palette.text.primary,
      boxShadow: theme.palette.shadows.card
    }
  },
  
  buttonIcon: {
    marginLeft: '0.75rem',
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease'
  },
  
  // Enhanced responsive design
  [theme.breakpoints.down('lg')]: {
    infoSection: {
      gap: '3rem'
    },
    moviePoster: {
      width: '320px',
      height: '480px'
    }
  },
  
  [theme.breakpoints.down('md')]: {
    movieHero: {
      minHeight: 'auto',
      padding: '6rem 0 4rem'
    },
    movieTitle: {
      marginBottom: '1rem'
    },
    movieMeta: {
      marginBottom: '1.5rem'
    },
    descriptionText: {
      marginBottom: '1.5rem'
    },
    director: {
      marginBottom: '1.5rem'
    }
  },
  
  [theme.breakpoints.down('sm')]: {
    movieHero: {
      padding: '4rem 0 3rem'
    },
    infoSection: {
      gap: '1.5rem'
    },
    tag: {
      padding: '0.5rem 1rem',
      fontSize: '0.8rem',
      marginRight: '0.5rem',
      marginBottom: '0.75rem'
    },
    movieActions: {
      gap: '1rem'
    }
  }
});
