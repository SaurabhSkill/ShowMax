import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovie } from '../../../store/actions/movies';
import { getCinemas } from '../../../store/actions/cinemas';
import { getShowtimesByMovie } from '../../../store/actions/showtimes';
import {
  Typography,
  Paper,
  Button,
  Box,
  withStyles
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Loading from '../../../components/Loading';
import styles from './styles';
import MovieIcon from '@material-ui/icons/Movie';

function SelectCinemaPage(props) {
  const {
    classes,
    match,
    movie,
    cinemas,
    showtimes,
    selectedCity, // Get selectedCity from Redux
    getMovie,
    getCinemas,
    getShowtimesByMovie
  } = props;

  useEffect(() => {
    getMovie(match.params.id);
    getCinemas();
    getShowtimesByMovie(match.params.id);
  }, [getMovie, getCinemas, getShowtimesByMovie, match.params.id]);

  if (!movie || !cinemas || !showtimes) {
    return <Loading />;
  }

  // Filter cinemas by the selected city from Redux
  const filteredCinemas = cinemas.filter(
    cinema => cinema.city === selectedCity
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <MovieIcon className={classes.movieIcon} />
        <Typography variant="h4" className={classes.movieTitle}>
          {movie.title}
        </Typography>
      </div>

      <div className={classes.cinemaList}>
        {filteredCinemas.length > 0 ? (
          filteredCinemas.map(cinema => {
            const cinemaShowtimes = showtimes.filter(
              showtime => showtime.cinemaId === cinema._id
            );

            if (cinemaShowtimes.length === 0) {
              return null;
            }

            return (
              <Paper key={cinema._id} className={classes.cinemaPaper}>
                <Box>
                  <Typography variant="h5" className={classes.cinemaInfo}>
                    {cinema.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cancellation available
                  </Typography>
                </Box>
                <Box className={classes.showtimeContainer}>
                  {cinemaShowtimes.map(showtime => (
                    <Button
                      key={showtime._id}
                      component={RouterLink}
                      to={`/movie/booking/${showtime._id}`}
                      variant="outlined"
                      className={classes.showtimeButton}>
                      {showtime.startAt}
                    </Button>
                  ))}
                </Box>
              </Paper>
            );
          })
        ) : (
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
            No cinemas available for this movie in the selected city.
          </Typography>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  movie: state.movieState.selectedMovie,
  cinemas: state.cinemaState.cinemas,
  showtimes: state.showtimeState.showtimes,
  selectedCity: state.cityState.selectedCity // Map city state to props
});

const mapDispatchToProps = {
  getMovie,
  getCinemas,
  getShowtimesByMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SelectCinemaPage));
