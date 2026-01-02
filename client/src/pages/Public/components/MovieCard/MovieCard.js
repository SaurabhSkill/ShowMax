import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { 
  PlayArrow as PlayIcon,
  Star as StarIcon,
  AccessTime as ClockIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon
} from '@material-ui/icons';
import styles from './styles';
import { Link } from 'react-router-dom';

const MovieCard = props => {
  const { classes, movie, loading = false } = props;
  const [isFavorited, setIsFavorited] = useState(false);

  // Get movie poster with fallback
  const getPosterUrl = () => {
    const poster = movie?.posterImage || movie?.image || movie?.poster || movie?.cover;
    if (!poster) return '/placeholder-movie.jpg';
    
    // If already absolute URL, return as-is
    if (/^https?:\/\//i.test(poster)) return poster;
    
    // Otherwise, prefix current origin
    return `${window.location.origin}${poster.startsWith('/') ? '' : '/'}${poster}`;
  };

  // Format duration
  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Get release year
  const getReleaseYear = () => {
    if (!movie?.releaseDate) return '';
    return new Date(movie.releaseDate).getFullYear();
  };

  // Get movie rating
  const getRating = () => {
    return movie?.rating || movie?.imdbRating || '8.5';
  };

  // Get primary genre
  const getPrimaryGenre = () => {
    if (movie?.genre && Array.isArray(movie.genre)) {
      return movie.genre[0];
    }
    return movie?.genre || 'Drama';
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  if (loading) {
    return (
      <div className={`${classes.card} ${classes.loading}`}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <div className={classes.content}>
          <div className={classes.title}>Loading...</div>
          <div className={classes.subtitle}>Please wait...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.card}>
      <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={classes.imageContainer}>
          <img
            src={getPosterUrl()}
            alt={movie?.title || 'Movie poster'}
            className={classes.image}
            onLoad={() => {/* Image loaded */}}
            onError={(e) => {
              e.target.src = '/placeholder-movie.jpg';
            }}
          />
          
          {/* Image overlay */}
          <div className={classes.imageOverlay} />
          
          {/* Rating badge */}
          {getRating() && (
            <div className={classes.ratingBadge}>
              <StarIcon className="star-icon" />
              {getRating()}
            </div>
          )}
          
          {/* Genre badge */}
          {getPrimaryGenre() && (
            <div className={classes.genreBadge}>
              {getPrimaryGenre()}
            </div>
          )}
          
          {/* Play button overlay */}
          <div className={classes.playButton}>
            <PlayIcon />
          </div>
        </div>
      </Link>

      <div className={classes.content}>
        <Typography className={classes.title}>
          {movie?.title || 'Untitled Movie'}
        </Typography>
        
        {movie?.tagline && (
          <Typography className={classes.subtitle}>
            {movie.tagline}
          </Typography>
        )}
        
        {/* Metadata */}
        <div className={classes.metadata}>
          {movie?.duration && (
            <div className={classes.duration}>
              <ClockIcon className="clock-icon" />
              {formatDuration(movie.duration)}
            </div>
          )}
          
          {getReleaseYear() && (
            <div className={classes.releaseYear}>
              {getReleaseYear()}
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className={classes.actionSection}>
          <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none', flex: 1 }}>
            <button className={classes.bookButton}>
              Book Tickets
            </button>
          </Link>
          
          <button 
            className={`${classes.favoriteButton} ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorited ? <FavoriteFilledIcon /> : <FavoriteIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(MovieCard);
