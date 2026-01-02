export default (theme) => ({
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
    background: 'rgba(11, 11, 15, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(218, 165, 32, 0.15)',
    padding: '0 2rem',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25), 0 8px 40px rgba(0, 0, 0, 0.15)',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.5), transparent)',
    }
  },
  
  navbarScrolled: {
    background: 'rgba(11, 11, 15, 0.98)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35), 0 16px 60px rgba(0, 0, 0, 0.25)',
    borderBottom: '1px solid rgba(218, 165, 32, 0.25)',
  },
  
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  
  logo: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    fontSize: '2rem',
    letterSpacing: '-0.02em',
    margin: 0,
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: 'Inter, Montserrat, sans-serif',
    textShadow: '0 2px 4px rgba(218, 165, 32, 0.3)'
  },
  
  logoIcon: {
    width: '32px',
    height: '32px',
    marginRight: '0.5rem',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    boxShadow: '0 2px 8px rgba(218, 165, 32, 0.3)'
  },
  
  navCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    flex: 1,
    justifyContent: 'center',
    maxWidth: '600px',
    margin: '0 2rem'
  },
  
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  
  navLink: {
    color: '#B8BCC8',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    padding: '0.75rem 0',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.01em',
    
    '&:hover': {
      color: theme.palette.text.primary,
      transform: 'translateY(-1px)'
    },
    
    '&.active': {
      color: '#DAA520',
      fontWeight: 600,
      
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '24px',
        height: '2px',
        background: 'linear-gradient(90deg, #DAA520, #FFD700)',
        borderRadius: '1px',
        boxShadow: '0 0 8px rgba(218, 165, 32, 0.5)'
      }
    }
  },
  
  searchSection: {
    position: 'relative',
    minWidth: '280px'
  },
  
  searchInput: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '0.75rem 1rem 0.75rem 3rem',
    color: theme.palette.text.primary,
    fontSize: '0.9rem',
    fontWeight: 400,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    
    '&::placeholder': {
      color: '#8892B0',
      fontWeight: 400
    },
    
    '&:focus': {
      outline: 'none',
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 0 3px ${theme.palette.primary.light}20, 0 4px 12px rgba(0, 0, 0, 0.15)`,
      transform: 'translateY(-1px)'
    }
  },
  
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#8892B0',
    fontSize: '1.1rem',
    pointerEvents: 'none',
    transition: 'color 0.3s ease'
  },
  
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  
  citySelect: {
    minWidth: '140px',
    
    '& .MuiSelect-select': {
      color: theme.palette.text.primary,
      padding: '0.75rem 1rem',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '10px',
      backgroundColor: theme.palette.background.paper,
      backdropFilter: 'blur(10px)',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.3s ease'
    },
    
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    
    '&:hover .MuiSelect-select': {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.primary.light}`
    },
    
    '&.Mui-focused .MuiSelect-select': {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 0 3px ${theme.palette.primary.light}20`
    }
  },
  
  citySelectIcon: {
    color: '#B8BCC8',
    transition: 'color 0.3s ease'
  },
  
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  
  loginButton: {
    color: '#B8BCC8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '0.75rem 1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.default,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.primary.light}`,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    }
  },
  
  signupButton: {
    color: '#0B0B0F',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    borderRadius: '10px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(218, 165, 32, 0.3)',
    
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700, #DAA520)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)'
    }
  },
  
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: '2px solid rgba(218, 165, 32, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      border: '2px solid rgba(218, 165, 32, 0.6)',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)'
    }
  },
  
  // Mobile styles
  mobileMenuButton: {
    display: 'none',
    color: theme.palette.text.primary,
    padding: '0.5rem',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.primary.light}`
    },
    
    '@media (max-width: 968px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  
  mobileMenu: {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    background: 'rgba(11, 11, 15, 0.98)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(218, 165, 32, 0.15)',
    transform: 'translateY(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1200,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    visibility: 'hidden', // Hide by default
    opacity: 0,
    
    '&.open': {
      transform: 'translateY(0)',
      visibility: 'visible',
      opacity: 1
    }
  },
  
  mobileMenuContent: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  
  mobileNavLink: {
    color: '#B8BCC8',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 500,
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'color 0.3s ease',
    
    '&:hover, &.active': {
      color: '#DAA520'
    }
  },
  
  mobileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  
  // Responsive breakpoints
  '@media (max-width: 968px)': {
    navbar: {
      padding: '0 1rem'
    },
    
    navCenter: {
      display: 'none'
    },
    
    navActions: {
      display: 'none'
    },
    
    searchSection: {
      display: 'none'
    }
  },
  
  '@media (max-width: 480px)': {
    navbar: {
      padding: '0 1rem',
      height: '70px'
    },
    
    logo: {
      fontSize: '1.6rem'
    },
    
    logoIcon: {
      width: '28px',
      height: '28px'
    }
  }
});
