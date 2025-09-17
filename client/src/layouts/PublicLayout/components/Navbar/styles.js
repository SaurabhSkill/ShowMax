export default (theme) => ({
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '0 2rem',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease'
  },
  navbarColor: {
    backgroundColor: 'rgba(10, 10, 10, 0.98)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.8rem',
    letterSpacing: '0.5px',
    margin: 0,
    background: 'linear-gradient(45deg, #007BFF, #4FC3F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  navLink: {
    color: '#B0B0B0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0.5rem 0',
    position: 'relative',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFFFFF'
    },
    '&.active': {
      color: '#007BFF',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#007BFF'
      }
    }
  },
  navAccount: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  citySelect: {
    color: '#FFFFFF',
    minWidth: '120px',
    '& .MuiSelect-select': {
      color: '#FFFFFF',
      padding: '0.5rem 1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.4)'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#007BFF'
    }
  },
  citySelectIcon: {
    color: '#FFFFFF'
  },
  navMobile: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  navIcon: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      padding: '0.5rem'
    }
  },
  navIconLine: {
    width: '25px',
    height: '3px',
    backgroundColor: '#FFFFFF',
    margin: '3px 0',
    transition: '0.3s',
    borderRadius: '2px'
  },
  navIconLine__left: {
    transform: 'rotate(-45deg) translate(-5px, 6px)'
  },
  navIconLine__right: {
    transform: 'rotate(45deg) translate(-5px, -6px)'
  },
  nav: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      position: 'fixed',
      top: '70px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(10, 10, 10, 0.98)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-100%)',
      transition: 'transform 0.3s ease',
      zIndex: 999
    }
  },
  navActive: {
    '@media (max-width: 768px)': {
      transform: 'translateY(0)'
    }
  },
  navContent: {
    padding: '1rem 2rem'
  },
  currentPageShadow: {
    boxShadow: '0 2px 20px rgba(0, 123, 255, 0.3)'
  },
  innerNav: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  innerNavListItem: {
    margin: '0.5rem 0'
  },
  innerNavLink: {
    color: '#B0B0B0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0.5rem 0',
    display: 'block',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFFFFF'
    }
  },
  '@media (max-width: 768px)': {
    navbar: {
      padding: '0 1rem'
    },
    navLinks: {
      display: 'none'
    },
    navAccount: {
      gap: '0.5rem'
    },
    citySelect: {
      minWidth: '100px'
    }
  }
});
