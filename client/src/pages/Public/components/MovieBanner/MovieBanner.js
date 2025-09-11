import React from 'react';
import classnames from 'classnames';
import {
  Box,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import styles from './styles';
import RatingManager from '../RatingManager/RatingManager';

const useStyles = makeStyles(styles);

const formatDuration = minutes => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

function MovieBanner(props) {
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  if (!movie) return null;

  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          {fullDescription && (
            <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
              {movie.genre.split(',').map((genre, index) => (
                <Typography
                  key={`${genre}-${index}`}
                  className={classes.tag}
                  variant="body1"
                  color="inherit">
                  {genre}
                </Typography>
              ))}
            </Box>
          )}
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit">
            {movie.title}
          </Typography>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit">
            {textTruncate(movie.description, 450)}
          </Typography>
          <Typography className={classes.director} variant="h4" color="inherit">
            By: {movie.director}
          </Typography>
          <Typography
            className={classes.duration}
            variant="body1"
            color="inherit">
            {formatDuration(movie.duration)}
          </Typography>
          <Typography className={classes.genre} variant="body1" color="inherit">
            {movie.genre}
          </Typography>
          
          {fullDescription && <RatingManager movie={movie} />}

        </header>
      </div>
      <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(${movie.image})`
        }}
      />
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link to={`/movie/${movie._id}/cinemas`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.button}>
              Buy Tickets
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Learn More
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MovieBanner;
