export default theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '240px', // Increased width for better proportions
    background: theme.palette.background.cardGradient,
    borderRadius: '20px',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.border}`,
    boxShadow: theme.palette.shadows.card,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    
    // Add subtle glow effect
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.05), rgba(139, 92, 246, 0.05))',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      borderRadius: '20px',
      pointerEvents: 'none'
    },
    
    '&:hover': {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: theme.palette.shadows.cardHover,
      border: `1px solid rgba(218, 165, 32, 0.3)`,
      
      '&::before': {
        opacity: 1
      }
    }
  },
  
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '320px', // Increased height for cinematic aspect ratio
    overflow: 'hidden',
    borderRadius: '20px 20px 0 0'
  },
  
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '$card:hover &': {
      transform: 'scale(1.05)'
    }
  },
  
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    
    '$card:hover &': {
      opacity: 1
    }
  },
  
  ratingBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    color: theme.palette.primary.main,
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    border: `1px solid ${theme.palette.primary.light}`,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    
    '& .star-icon': {
      fontSize: '0.9rem',
      color: theme.palette.primary.main
    }
  },
  
  genreBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    color: theme.palette.text.secondary,
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: 500,
    border: `1px solid ${theme.palette.divider}`,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '60px',
    height: '60px',
    background: `rgba(${theme.palette.primary.main.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.9)`,
    backdropFilter: 'blur(10px)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.8)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: `2px solid ${theme.palette.divider}`,
    
    '$card:hover &': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)'
    },
    
    '&:hover': {
      background: `rgba(${theme.palette.primary.light.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.95)`,
      boxShadow: theme.palette.shadows.buttonHover
    }
  },
  
  content: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1,
    background: theme.palette.background.paper,
    position: 'relative'
  },
  
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: '0.5rem',
    letterSpacing: '-0.01em',
    fontFamily: 'Inter, Montserrat, sans-serif'
  },
  
  subtitle: {
    fontSize: '0.85rem',
    color: theme.palette.text.secondary,
    fontWeight: 400,
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: '1rem'
  },
  
  metadata: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '0.8rem',
    color: theme.palette.text.secondary
  },
  
  duration: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    
    '& .clock-icon': {
      fontSize: '0.9rem',
      color: theme.palette.text.disabled
    }
  },
  
  releaseYear: {
    fontWeight: 500,
    color: theme.palette.primary.main
  },
  
  actionSection: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: 'auto'
  },
  
  bookButton: {
    flex: 1,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.primary.contrastText,
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'none',
    letterSpacing: '0.01em',
    boxShadow: theme.palette.shadows.button,
    
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.shadows.buttonHover
    },
    
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: theme.palette.shadows.button
    }
  },
  
  favoriteButton: {
    width: '44px',
    height: '44px',
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      background: theme.palette.primary.light + '20',
      border: `1px solid ${theme.palette.primary.light}`,
      color: theme.palette.primary.main,
      transform: 'translateY(-2px)'
    },
    
    '&.favorited': {
      background: theme.palette.primary.light + '30',
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main
    }
  },
  
  // Loading state
  loading: {
    '& $image': {
      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
      backgroundSize: '200px 100%',
      animation: '$shimmer 1.5s infinite'
    },
    
    '& $title, & $subtitle': {
      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
      backgroundSize: '200px 100%',
      animation: '$shimmer 1.5s infinite',
      color: 'transparent',
      borderRadius: '4px'
    }
  },
  
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '-200px 0'
    },
    '100%': {
      backgroundPosition: 'calc(200px + 100%) 0'
    }
  },
  
  // Responsive design
  '@media (max-width: 768px)': {
    card: {
      width: '200px'
    },
    
    imageContainer: {
      height: '280px'
    },
    
    content: {
      padding: '1.25rem'
    },
    
    title: {
      fontSize: '1rem'
    },
    
    playButton: {
      width: '50px',
      height: '50px',
      fontSize: '1.2rem'
    }
  },
  
  '@media (max-width: 480px)': {
    card: {
      width: '180px'
    },
    
    imageContainer: {
      height: '240px'
    },
    
    content: {
      padding: '1rem'
    },
    
    title: {
      fontSize: '0.95rem'
    }
  }
});
