import React from 'react';
import classnames from 'classnames';
import {
  Box,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import { 
  PlayArrow as PlayIcon,
  Info as InfoIcon,
  Star as StarIcon,
  AccessTime as ClockIcon,
  CalendarToday as CalendarIcon
} from '@material-ui/icons';
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

const getReleaseYear = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear();
};

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '/placeholder-movie.jpg';
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${window.location.origin}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

function MovieBanner(props) {
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  
  if (!movie) return null;

  const posterUrl = getImageUrl(movie.posterImage || movie.image);
  const bannerUrl = getImageUrl(movie.bannerImage || movie.backdrop || movie.posterImage || movie.image);
  const genres = movie.genre ? movie.genre.split(',').map(g => g.trim()) : [];
  const primaryGenre = genres[0] || 'Drama';
  const releaseYear = getReleaseYear(movie.releaseDate);
  const duration = formatDuration(movie.duration);

  return (
    <div className={classes.movieHero}>
      <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(${bannerUrl})`
        }}
      />
      
      <div className={classes.infoSection}>
        <div
          className={classes.moviePoster}
          style={{
            backgroundImage: `url(${posterUrl})`
          }}
        />
        
        <header className={classes.movieHeader}>
          {fullDescription && genres.length > 0 && (
            <Box mb={2} display="flex" alignItems="center" flexWrap="wrap">
              {genres.slice(0, 3).map((genre, index) => (
                <Typography
                  key={`${genre}-${index}`}
                  className={classes.tag}
                  variant="body2"
                  color="inherit"
                >
                  {genre}
                </Typography>
              ))}
            </Box>
          )}
          
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit"
          >
            {movie.title}
          </Typography>
          
          <div className={classes.movieMeta}>
            {releaseYear && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon style={{ fontSize: '1rem' }} />
                {releaseYear}
              </span>
            )}
            {duration && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClockIcon style={{ fontSize: '1rem' }} />
                {duration}
              </span>
            )}
            {primaryGenre && (
              <span>{primaryGenre}</span>
            )}
            {movie.language && (
              <span>{movie.language}</span>
            )}
            {movie.rating && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StarIcon style={{ fontSize: '1rem', color: '#DAA520' }} />
                {movie.rating}
              </span>
            )}
          </div>
          
          {movie.tagline && (
            <Typography
              variant="h6"
              style={{ 
                color: '#DAA520', 
                fontStyle: 'italic', 
                marginBottom: '1rem',
                fontSize: '1.1rem',
                fontWeight: 500
              }}
            >
              "{movie.tagline}"
            </Typography>
          )}
          
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit"
          >
            {fullDescription ? movie.description : textTruncate(movie.description, 200)}
          </Typography>
          
          {movie.director && (
            <Typography className={classes.director}>
              <strong>Director:</strong> {movie.director}
            </Typography>
          )}
          
          {movie.cast && (
            <Typography className={classes.director}>
              <strong>Cast:</strong> {Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}
            </Typography>
          )}
          
          {fullDescription && <RatingManager movie={movie} />}
          
          <div className={classes.movieActions}>
            {fullDescription ? (
              <>
                <Link to={`/movie/${movie._id}/cinemas`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" className={classes.button}>
                    <PlayIcon style={{ marginRight: '0.5rem' }} />
                    BOOK TICKETS
                    <ArrowRightAlt className={classes.buttonIcon} />
                  </Button>
                </Link>
                
                <Button 
                  className={classnames(classes.button, classes.learnMore)}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <InfoIcon style={{ marginRight: '0.5rem' }} />
                  MORE INFO
                </Button>
              </>
            ) : (
              <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none' }}>
                <Button className={classnames(classes.button, classes.learnMore)}>
                  <InfoIcon style={{ marginRight: '0.5rem' }} />
                  Learn More
                  <ArrowRightAlt className={classes.buttonIcon} />
                </Button>
              </Link>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default MovieBanner;
