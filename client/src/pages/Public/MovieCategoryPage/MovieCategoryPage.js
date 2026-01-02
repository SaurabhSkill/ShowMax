import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Container, Typography, Box } from '@material-ui/core';
import MovieCard from '../components/MovieCard/MovieCard';
import { getMovies } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    paddingTop: '2rem'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '3rem',
    color: theme.palette.text.primary,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
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
      backgroundColor: theme.palette.divider,
      borderRadius: '3px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '3px'
    }
  },
  movieCard: {
    minWidth: '200px',
    flexShrink: 0
  },
  noMovies: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',
    marginTop: '3rem'
  }
}));

function MovieCategoryPage(props) {
  const { movies, getMovies } = props;
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
            
            {movies.length > 0 ? (
              <Box className={classes.movieGrid}>
                {movies.map(movie => (
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
