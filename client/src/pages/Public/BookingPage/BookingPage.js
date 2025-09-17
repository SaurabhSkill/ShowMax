import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import {
  getMovie,
  getCinemas,
  getShowtimes,
  getReservations,
  getSuggestedReservationSeats,
  setSelectedDate,
  setSelectedCinema,
  setSelectedTime,
  onSelectMovie
} from '../../../store/actions';
import { getShowtimeById } from '../../../store/actions/showtimes';
import styles from './styles';
import SimpleBookingPage from './SimpleBookingPage';

class BookingPage extends Component {
  didSetSuggestion = false;
  state = {
    priceTier: 'normal',
    preservedTicketCount: 1
  };

  async componentDidMount() {
    const {
      user,
      match,
      getMovie,
      getCinemas,
      getShowtimes,
      getReservations,
      getSuggestedReservationSeats,
      getShowtimeById,
      setSelectedDate,
      setSelectedCinema,
      setSelectedTime,
      onSelectMovie
    } = this.props;
    
    // Get the showtime first, then extract movie and cinema info
    const showtime = await getShowtimeById(match.params.id);
    if (showtime) {
      // If showtime has populated movie and cinema data, use them directly
      if (showtime.movieId && typeof showtime.movieId === 'object') {
        onSelectMovie(showtime.movieId);
      } else {
        // Fallback: get the movie using the movieId from the showtime
        getMovie(showtime.movieId);
      }
      
      // Set the selected cinema and time from the showtime (ensure ID string)
      const cinemaId = (showtime.cinemaId && typeof showtime.cinemaId === 'object')
        ? showtime.cinemaId._id
        : showtime.cinemaId;
      setSelectedCinema(cinemaId);
      setSelectedTime(showtime.startAt);
      if (showtime.startDate) {
        setSelectedDate(new Date(showtime.startDate));
      }
    }
    
    getCinemas();
    getShowtimes();
    getReservations();
    if (user) getSuggestedReservationSeats(user?.username);
  }

  componentDidUpdate(prevProps) {
    // This method is kept for potential future use but currently not needed
    // since SimpleBookingPage handles its own state management
  }

  // All methods removed since we're using SimpleBookingPage
  // The original methods are preserved in SimpleBookingPage component

  render() {
    const { selectedShowtime } = this.props;

    // Show loading if showtime is not loaded yet
    if (!selectedShowtime) {
      return <div>Loading...</div>;
    }

    // Use simple version for the booking page
    return <SimpleBookingPage {...this.props} />;
  }
}

BookingPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ showtimeState }) => ({
  selectedShowtime: showtimeState.selectedShowtime
});

const mapDispatchToProps = {
  getMovie,
  getCinemas,
  getShowtimes,
  getReservations,
  getSuggestedReservationSeats,
  setSelectedDate,
  setSelectedCinema,
  setSelectedTime,
  getShowtimeById,
  onSelectMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BookingPage));
