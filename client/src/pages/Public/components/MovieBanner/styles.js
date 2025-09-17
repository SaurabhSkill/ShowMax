export default theme => ({
  movieHero: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    alignItems: 'center',
    padding: '2rem 0'
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
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
    }
  },
  infoSection: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  moviePoster: {
    width: '300px',
    height: '450px',
    borderRadius: '12px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginRight: '3rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    flexShrink: 0
  },
  movieHeader: {
    flex: 1,
    maxWidth: '600px'
  },
  tag: {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    fontSize: '0.9rem',
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  movieTitle: {
    fontSize: '3rem',
    lineHeight: 1.1,
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#FFFFFF'
  },
  movieMeta: {
    fontSize: '1.1rem',
    color: '#B0B0B0',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  descriptionText: {
    color: '#E0E0E0',
    fontSize: '1.1rem',
    lineHeight: 1.6,
    marginBottom: '2rem',
    maxWidth: '500px'
  },
  director: {
    color: '#B0B0B0',
    fontSize: '1rem',
    marginBottom: '1.5rem'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '0.5rem'
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: '1.1rem',
    fontWeight: 600
  },
  movieActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '8px',
    textTransform: 'none',
    minWidth: '180px',
    '&:hover': {
      backgroundColor: '#0056B3',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)'
    },
    transition: 'all 0.3s ease'
  },
  learnMore: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '2px solid #FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#000000'
    }
  },
  buttonIcon: {
    marginLeft: '0.5rem'
  },
  [theme.breakpoints.down('md')]: {
    movieHero: {
      minHeight: 'auto',
      padding: '4rem 0'
    },
    infoSection: {
      flexDirection: 'column',
      textAlign: 'center',
      padding: '0 1rem'
    },
    moviePoster: {
      width: '250px',
      height: '375px',
      marginRight: 0,
      marginBottom: '2rem'
    },
    movieTitle: {
      fontSize: '2.5rem'
    }
  },
  [theme.breakpoints.down('sm')]: {
    moviePoster: {
      width: '200px',
      height: '300px'
    },
    movieTitle: {
      fontSize: '2rem'
    },
    descriptionText: {
      fontSize: '1rem'
    },
    button: {
      padding: '0.8rem 1.5rem',
      fontSize: '1rem',
      minWidth: '150px'
    }
  }
});
