import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Button } from '@material-ui/core';
import styles from './styles';
import { Link } from 'react-router-dom';

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <div className={classes.card}>
      <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none' }}>
        <header
          className={classes.header}
          style={{
            backgroundImage: `url(${movie.posterImage || movie.image})`
          }}
        />
      </Link>
      <div className={classes.body}>
        <Typography className={classes.title}>
          {movie.title}
        </Typography>
        <Button 
          component={Link} 
          to={`/movie/${movie._id}`} 
          className={classes.bookButton}
        >
          BOOK
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(MovieCard);
