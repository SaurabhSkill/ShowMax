import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Typography, Container } from '@material-ui/core';
import { 
  PlayArrow as PlayIcon,
  Info as InfoIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getMovies } from '../../../store/actions/movies';
import MovieCard from '../components/MovieCard/MovieCard';
import theme from '../../../theme';

const styles = (theme) => ({
  root: {
    background: theme.palette.background.gradient,
    minHeight: '100vh',
    position: 'relative'
  },
  
  // Hero Section Styles
  heroSection: {
    position: 'relative',
    height: '70vh',
    minHeight: '600px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4rem',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    
    '@media (max-width: 768px)': {
      height: '60vh',
      minHeight: '500px'
    }
  },
  
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center 20%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.default
  },
  
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)
    `,
    zIndex: 2
  },
  
  heroContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    
    '@media (max-width: 768px)': {
      padding: '0 1rem',
      textAlign: 'center'
    }
  },
  
  heroText: {
    maxWidth: '600px',
    color: '#FFFFFF',
    
    '@media (max-width: 768px)': {
      maxWidth: '100%'
    }
  },
  
  heroCategory: {
    display: 'inline-block',
    background: 'rgba(218, 165, 32, 0.9)',
    border: '1px solid rgba(218, 165, 32, 0.8)',
    color: '#000000',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
  },
  
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #DAA520 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    
    '@media (max-width: 768px)': {
      fontSize: '2.5rem'
    },
    
    '@media (max-width: 480px)': {
      fontSize: '2rem'
    }
  },
  
  heroDescription: {
    fontSize: '1.25rem',
    color: '#E5E7EB',
    lineHeight: 1.6,
    marginBottom: '2rem',
    fontWeight: 400,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    
    '@media (max-width: 768px)': {
      fontSize: '1.1rem'
    }
  },
  
  heroMetadata: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2.5rem',
    fontSize: '0.95rem',
    color: '#D1D5DB',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      gap: '1.5rem'
    },
    
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0.5rem'
    }
  },
  
  heroActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    
    '@media (max-width: 768px)': {
      justifyContent: 'center'
    },
    
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      width: '100%'
    }
  },
  
  primaryButton: {
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: theme.palette.primary.contrastText,
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: '12px',
    textTransform: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 16px rgba(218, 165, 32, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700, #DAA520)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(218, 165, 32, 0.4)'
    },
    
    '@media (max-width: 480px)': {
      width: '100%',
      justifyContent: 'center'
    }
  },
  
  secondaryButton: {
    background: 'rgba(0, 0, 0, 0.1)',
    color: '#1F2937',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '12px',
    textTransform: 'none',
    border: '1px solid rgba(218, 165, 32, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(218, 165, 32, 0.4)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
    },
    
    '@media (max-width: 480px)': {
      width: '100%',
      justifyContent: 'center'
    }
  },
  
  // Section Styles
  section: {
    marginBottom: '4rem',
    
    '@media (max-width: 768px)': {
      marginBottom: '3rem'
    }
  },
  
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    padding: '0 2rem',
    
    '@media (max-width: 768px)': {
      padding: '0 1rem'
    }
  },
  
  sectionTitle: {
    fontSize: '2.25rem',
    fontWeight: 700,
    color: '#1F2937',
    letterSpacing: '-0.01em',
    position: 'relative',
    
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      width: '60px',
      height: '3px',
      background: 'linear-gradient(90deg, #DAA520, #FFD700)',
      borderRadius: '2px'
    },
    
    '@media (max-width: 768px)': {
      fontSize: '1.75rem'
    }
  },
  
  viewAllButton: {
    color: '#DAA520',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    border: '1px solid rgba(218, 165, 32, 0.2)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      background: '#DAA520',
      color: theme.palette.primary.contrastText,
      transform: 'translateY(-1px)'
    }
  },
  
  movieGrid: {
    display: 'flex',
    gap: '1.5rem',
    overflowX: 'auto',
    padding: '0 2rem 1rem',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
    
    '&::-webkit-scrollbar': {
      height: '6px'
    },
    
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '3px'
    },
    
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(90deg, #DAA520, #FFD700)',
      borderRadius: '3px'
    },
    
    '@media (max-width: 768px)': {
      padding: '0 1rem 1rem',
      gap: '1rem'
    }
  },
  
  movieCardWrapper: {
    flexShrink: 0,
    animation: '$fadeInUp 0.6s ease-out'
  },
  
  // Animations
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
});

class HomePage extends Component {
  state = { 
    featuredMovies: [],
    currentSlide: 0,
    isLoading: true
  };

  componentDidMount() {
    console.log('HomePage mounted, movies:', this.props.movies.length);
    if (!this.props.movies.length) {
      this.props.getMovies();
    } else {
      this.setState({ isLoading: false });
    }
    
    // Start auto-refresh timer for banner
    this.startBannerTimer();
  }

  componentDidUpdate(prevProps) {
    console.log('HomePage updated, movies:', this.props.movies.length, 'prev:', prevProps.movies.length);
    if (prevProps.movies !== this.props.movies && this.props.movies.length > 0) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    // Clear timer when component unmounts
    if (this.bannerTimer) {
      clearInterval(this.bannerTimer);
    }
  }

  startBannerTimer = () => {
    this.bannerTimer = setInterval(() => {
      const { movies } = this.props;
      if (movies.length > 0) {
        this.setState(prevState => ({
          currentSlide: (prevState.currentSlide + 1) % Math.min(movies.length, 5)
        }));
      }
    }, 10000); // Change every 10 seconds
  }

  getBannerImage = (movie) => {
    // Prioritize bannerImage, fallback to posterImage or image
    const banner = movie?.bannerImage || movie?.posterImage || movie?.image;
    if (!banner) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    
    // If already absolute URL, return as-is
    if (/^https?:\/\//i.test(banner)) return banner;
    
    // Otherwise, prefix current origin
    return `${window.location.origin}${banner.startsWith('/') ? '' : '/'}${banner}`;
  }

  render() {
    const { classes, movies } = this.props;
    const { isLoading, currentSlide } = this.state;
    
    console.log('HomePage render - movies:', movies.length, 'isLoading:', isLoading);
    
    const nowShowing = movies.filter(m => 
      new Date(m.releaseDate) <= new Date() && 
      new Date(m.endDate || Date.now()) >= new Date()
    );
    
    const comingSoon = movies.filter(m => 
      new Date(m.releaseDate) > new Date()
    );

    const trending = movies.slice(0, 10);
    
    // Get featured movies for banner (first 5 movies)
    const featuredMovies = movies.slice(0, 5);
    const currentMovie = featuredMovies[currentSlide] || featuredMovies[0];

    return (
      <Box className={classes.root}>
        {/* Hero Section - Movie Banner Carousel */}
        <div className={classes.heroSection}>
          {/* Background with current movie banner */}
          <div 
            className={classes.heroBackground}
            style={{
              backgroundImage: currentMovie 
                ? `linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.3) 100%), url('${this.getBannerImage(currentMovie)}')`
                : `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#1a1a1a',
              transition: 'background-image 1s ease-in-out',
              filter: 'contrast(1.2) saturate(1.3) brightness(0.9)'
            }}
          />
          
          {/* Overlay */}
          <div className={classes.heroOverlay} />
          
          {/* Movie Info and Book Now Button */}
          {currentMovie && (
            <div className={classes.heroContent} style={{ zIndex: 999, position: 'relative' }}>
              <div className={classes.heroText} style={{ color: '#FFFFFF', zIndex: 999 }}>
                <div className={classes.heroCategory} style={{ backgroundColor: '#DAA520', color: '#000000' }}>
                  {currentMovie.genre || 'Featured Movie'}
                </div>
                
                <Typography 
                  className={classes.heroTitle} 
                  variant="h1"
                  style={{ 
                    color: '#FFFFFF', 
                    fontSize: '3.5rem', 
                    fontWeight: 'bold',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.6)',
                    zIndex: 999,
                    marginBottom: '1rem'
                  }}
                >
                  {currentMovie.title}
                </Typography>
                
                {currentMovie.tagline && (
                  <Typography 
                    className={classes.heroDescription}
                    style={{ 
                      color: '#E5E7EB', 
                      fontSize: '1.2rem',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {currentMovie.tagline}
                  </Typography>
                )}
                
                <div className={classes.heroMetadata} style={{ color: '#D1D5DB', marginBottom: '2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  {currentMovie.duration && <span>{Math.floor(currentMovie.duration / 60)}h {currentMovie.duration % 60}m</span>}
                  {currentMovie.releaseDate && <span>{new Date(currentMovie.releaseDate).getFullYear()}</span>}
                  {currentMovie.rating && <span>★ {currentMovie.rating}</span>}
                </div>
                
                <div className={classes.heroActions}>
                  <Link 
                    to={`/movie/${currentMovie._id}`}
                    className={classes.primaryButton}
                    style={{ 
                      backgroundColor: '#DAA520', 
                      color: theme.palette.primary.contrastText, 
                      padding: '1rem 2.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    <PlayIcon />
                    Book Now
                  </Link>
                  
                  <Link 
                    to="/movie/category/nowShowing" 
                    className={classes.secondaryButton}
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.1)', 
                      color: '#1F2937', 
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginLeft: '1rem',
                      border: '1px solid rgba(218, 165, 32, 0.2)'
                    }}
                  >
                    <InfoIcon />
                    Explore Movies
                  </Link>
                </div>
                
                {/* Banner indicators */}
                {featuredMovies.length > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    marginTop: '2rem',
                    justifyContent: 'center'
                  }}>
                    {featuredMovies.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: index === currentSlide ? '#DAA520' : 'rgba(0,0,0,0.3)',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease'
                        }}
                        onClick={() => this.setState({ currentSlide: index })}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Loading state */}
          {!currentMovie && (
            <div className={classes.heroContent} style={{ zIndex: 999, position: 'relative' }}>
              <div className={classes.heroText} style={{ color: '#1F2937', zIndex: 999, textAlign: 'center' }}>
                <Typography 
                  className={classes.heroTitle} 
                  variant="h1"
                  style={{ 
                    color: '#1F2937', 
                    fontSize: '3rem', 
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    zIndex: 999
                  }}
                >
                  {isLoading ? 'Loading Amazing Movies...' : 'Welcome to ShowMax'}
                </Typography>
                
                <Typography 
                  className={classes.heroDescription}
                  style={{ 
                    color: '#4B5563', 
                    fontSize: '1.2rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                    marginBottom: '2rem'
                  }}
                >
                  {isLoading 
                    ? 'Please wait while we prepare your cinematic experience'
                    : 'Your ultimate destination for movie bookings and cinematic experiences.'
                  }
                </Typography>
                
                <div className={classes.heroActions}>
                  <Link 
                    to="/movie/category/nowShowing" 
                    className={classes.primaryButton}
                    style={{ 
                      backgroundColor: '#DAA520', 
                      color: theme.palette.primary.contrastText, 
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <PlayIcon />
                    {isLoading ? 'Loading...' : 'Explore Movies'}
                  </Link>
                  
                  <Link 
                    to="/cinemas" 
                    className={classes.secondaryButton}
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.1)', 
                      color: '#1F2937', 
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginLeft: '1rem',
                      border: '1px solid rgba(218, 165, 32, 0.2)'
                    }}
                  >
                    <InfoIcon />
                    Find Cinemas
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <Container maxWidth="xl">
          {/* Now Playing Section */}
          {nowShowing.length > 0 && (
            <div className={classes.section}>
              <div className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle}>
                  Now Playing
                </Typography>
                <Link to="/movies/now-playing" className={classes.viewAllButton}>
                  View All
                </Link>
              </div>
              
              <div className={classes.movieGrid}>
                {nowShowing.slice(0, 10).map((movie) => (
                  <div key={movie._id} className={classes.movieCardWrapper}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon Section */}
          {comingSoon.length > 0 && (
            <div className={classes.section}>
              <div className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle}>
                  Coming Soon
                </Typography>
                <Link to="/movies/coming-soon" className={classes.viewAllButton}>
                  View All
                </Link>
              </div>
              
              <div className={classes.movieGrid}>
                {comingSoon.slice(0, 10).map((movie) => (
                  <div key={movie._id} className={classes.movieCardWrapper}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Section */}
          {trending.length > 0 && (
            <div className={classes.section}>
              <div className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle}>
                  Trending Now
                </Typography>
                <Link to="/movies/trending" className={classes.viewAllButton}>
                  View All
                </Link>
              </div>
              
              <div className={classes.movieGrid}>
                {trending.map((movie) => (
                  <div key={movie._id} className={classes.movieCardWrapper}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Box>
    );
  }
}

const mapStateToProps = state => ({ 
  movies: state.movieState.movies || [] 
});

const mapDispatchToProps = { 
  getMovies 
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));