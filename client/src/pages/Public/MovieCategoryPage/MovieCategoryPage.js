import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Container, Typography, Box } from '@material-ui/core';
import MovieCard from '../components/MovieCard/MovieCard';
import { getMovies } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingTop: '2rem'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '3rem',
    color: '#FFFFFF',
    background: 'linear-gradient(45deg, #007BFF, #4FC3F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
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
  },
  noMovies: {
    textAlign: 'center',
    color: '#B0B0B0',
    fontSize: '1.2rem',
    marginTop: '3rem'
  }
}));

function MovieCategoryPage(props) {
  const { movies, getMovies, location } = props;
  const category = props.match.params.category;
  const classes = useStyles(props);

  useEffect(() => {
    if (!movies.length) {
      getMovies();
    }
  }, [movies, getMovies]);

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'nowShowing':
        return 'EXPLORE ALL MOVIES';
      case 'comingSoon':
        return 'COMING SOON';
      default:
        return cat.toUpperCase();
    }
  };

  const params = new URLSearchParams(location.search);
  const q = (params.get('q') || '').toLowerCase();
  const filtered = q ? movies.filter(m => (m.title || '').toLowerCase().includes(q)) : movies;

  return (
    <Box className={classes.root}>
      <Container maxWidth="xl">
        {!['nowShowing', 'comingSoon'].includes(category) ? (
          <Typography className={classes.title}>
            Category Does Not Exist
          </Typography>
        ) : (
          <>
            <Typography className={classes.title}>
              {getCategoryTitle(category)}
            </Typography>
            
            {filtered.length > 0 ? (
              <Box className={classes.movieGrid}>
                {filtered.map(movie => (
                  <Box key={movie._id} className={classes.movieCard}>
                    <MovieCard movie={movie} />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography className={classes.noMovies}>
                No movies available in this category
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

const mapStateToProps = ({ movieState }, ownProps) => ({
  movies: movieState[ownProps.match.params.category] || []
});

const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(MovieCategoryPage);
