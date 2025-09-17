import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovie } from '../../../store/actions/movies';
import { getCinemas } from '../../../store/actions/cinemas';
import { getShowtimesByMovie } from '../../../store/actions/showtimes';
import { Typography, Button, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Loading from '../../../components/Loading';
import styles from './styles';

function SelectCinemaPage(props) {
  const {
    classes,
    match,
    movie,
    cinemas,
    showtimes,
    selectedCity,
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
      <div className={classes.container}>
        <Typography className={classes.pageTitle}>
          SELECT THEATER & SHOWTIME
        </Typography>

        <div>
          {filteredCinemas.length > 0 ? (
            filteredCinemas.map(cinema => {
              const cinemaShowtimes = showtimes.filter(
                showtime => showtime.cinemaId === cinema._id
              );

              if (cinemaShowtimes.length === 0) {
                return null;
              }

              return (
                <div key={cinema._id} className={classes.theaterCard}>
                  <div className={classes.theaterHeader}>
                    <div
                      className={classes.moviePoster}
                      style={{
                        backgroundImage: `url(${movie.image})`
                      }}
                    />
                    <div className={classes.theaterInfo}>
                      <Typography className={classes.theaterName}>
                        {cinema.name}
                      </Typography>
                      <Typography className={classes.theaterLocation}>
                        {cinema.location || `${cinema.city}, ${cinema.state}`}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className={classes.showtimeGrid}>
                    {cinemaShowtimes.map(showtime => (
                      <Button
                        key={showtime._id}
                        component={RouterLink}
                        to={`/movie/booking/${showtime._id}`}
                        className={classes.showtimeButton}
                      >
                        {showtime.startAt}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <Typography className={classes.noCinemas}>
              No cinemas available for this movie in the selected city.
            </Typography>
          )}
        </div>
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
