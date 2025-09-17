import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Typography, Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getMovies } from '../../../store/actions/movies';
import MovieCard from '../components/MovieCard/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh'
  },
  heroSection: {
    position: 'relative',
    height: 500,
    width: 953,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 4rem',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  heroBgWrap: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
    backgroundColor: '#000'
  },
  heroBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))',
    zIndex: 1
  },
  heroContent: {
    textAlign: 'left',
    color: '#FFFFFF',
    zIndex: 2,
    maxWidth: '800px',
    position: 'absolute',
    left: '2rem',
    bottom: '2rem',
    paddingRight: '2rem'
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(45deg, #007BFF, #4FC3F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#B0B0B0',
    fontWeight: 300
  },
  dateBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    backgroundColor: 'rgba(0, 123, 255, 0.9)',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    marginBottom: '16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)'
  },
  searchBar: {
    maxWidth: '700px',
    margin: '0 auto',
    '& .MuiOutlinedInput-input': { color: '#fff' },
    '& .MuiInputLabel-outlined': { color: '#B0B0B0' },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' }
  },
  heroButton: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '6px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#0056B3',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)'
    },
    transition: 'all 0.3s ease'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '2rem',
    textAlign: 'left'
  },
  movieSection: {
    marginBottom: '4rem'
  },
  movieGrid: {
    display: 'flex',
    gap: '1.5rem',
    overflowX: 'auto',
    paddingBottom: '1rem',
    '&::-webkit-scrollbar': {
      height: '6px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '3px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#007BFF',
      borderRadius: '3px'
    }
  },
  movieCard: {
    minWidth: '200px',
    flexShrink: 0
  }
});

class HomePage extends Component {
  state = { featuredMovies: [] };

  componentDidMount() {
    if (!this.props.movies.length) this.props.getMovies();
    this.randomizeFeatured();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      this.randomizeFeatured();
    }
  }

  randomizeFeatured = () => {
    const { movies } = this.props;
    if (!movies || movies.length === 0) return;
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    this.setState({ featuredMovies: shuffled.slice(0, 4) });
  };

  getBannerUrl = (movie) => {
    if (!movie) return '';
    const src = movie.bannerImage || movie.backdrop || movie.backdropPath || movie.banner || movie.coverImage || movie.cover || movie.background || movie.posterImage || movie.image;
    if (!src) return '';
    // If already absolute URL, return as-is
    if (/^https?:\/\//i.test(src)) return src;
    // Otherwise, prefix current origin
    return `${window.location.origin}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  render() {
    const { classes, movies } = this.props;
    const { featuredMovies } = this.state;
    const nowShowing = movies.filter(m => new Date(m.releaseDate) <= new Date() && new Date(m.endDate) >= new Date());
    const comingSoon = movies.filter(m => new Date(m.releaseDate) > new Date());

    return (
      <Box className={classes.root}>
        {/* Hero Slider */}
        {featuredMovies.length > 0 && (
          <Slider
            dots
            infinite
            autoplay
            autoplaySpeed={4000}
            speed={600}
            slidesToShow={1}
            slidesToScroll={1}
            arrows
          >
            {featuredMovies.map(movie => (
              <Box
                key={movie._id}
                className={classes.heroSection}
              >
                <Box className={classes.heroBgWrap}>
                  <img className={classes.heroBg} alt={movie.title} src={this.getBannerUrl(movie)} />
                  <Box className={classes.heroOverlay} />
                </Box>
                <Box className={classes.heroContent}>
                  {movie.releaseDate && (
                    <div className={classes.dateBadge}>{new Date(movie.releaseDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  )}
                  <Typography className={classes.heroTitle} variant="h1">
                    {movie.title}
                  </Typography>
                  <Typography className={classes.heroSubtitle} variant="h5">
                    {movie.tagline || ''}
                  </Typography>
                  <Button 
                    component={Link} 
                    to={`/movie/${movie._id}`} 
                    className={classes.heroButton}
                    size="large"
                  >
                    Book Tickets
                  </Button>
                </Box>
              </Box>
            ))}
          </Slider>
        )}

        <Container maxWidth="xl">
          {/* Now Playing Section */}
          <Box className={classes.movieSection}>
            <Typography className={classes.sectionTitle}>NOW PLAYING</Typography>
            <Box className={classes.movieGrid}>
              {nowShowing.slice(0, 10).map(movie => (
                <Box key={movie._id} className={classes.movieCard}>
                  <MovieCard movie={movie} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Upcoming Movies Section */}
          <Box className={classes.movieSection}>
            <Typography className={classes.sectionTitle}>UPCOMING MOVIES</Typography>
            <Box className={classes.movieGrid}>
              {comingSoon.slice(0, 10).map(movie => (
                <Box key={movie._id} className={classes.movieCard}>
                  <MovieCard movie={movie} />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

const mapStateToProps = state => ({ movies: state.movieState.movies || [] });
const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
