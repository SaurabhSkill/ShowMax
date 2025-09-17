import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Container, TextField, Typography, Box, FormControl, Select, MenuItem, Chip } from '@material-ui/core';
import BookingCheckout from './components/BookingCheckout/BookingCheckout';
import {
  addReservation,
  toggleLoginPopup,
  showInvitationForm,
  setQRCode,
  getReservations
} from '../../../store/actions';

class SimpleBookingPage extends Component {
  state = {
    localTicketCount: 1,
    selectedSeatType: 'normal'
  };

  handleTicketCountChange = (count) => {
    const safe = Math.max(1, Math.min(10, Number(count) || 1));
    // console.log('SimpleBookingPage: Setting ticket count to', safe);
    this.setState({ localTicketCount: safe });
    
    // Don't update Redux selectedSeats - keep it for actual seat selection
    // The ticket count will be used directly in the checkout process
  };

  handleSeatTypeChange = (seatType) => {
    this.setState({ selectedSeatType: seatType });
  };

  getSeatPrice = () => {
    const { cinema } = this.props;
    const { selectedSeatType } = this.state;
    
    if (!cinema || !cinema.priceTiers) {
      return 0;
    }
    
    return cinema.priceTiers[selectedSeatType] || 0;
  };

  getTotalPrice = () => {
    const { localTicketCount } = this.state;
    return this.getSeatPrice() * localTicketCount;
  };

  async checkout(paymentResult = null) {
    const {
      getReservations,
      isAuth,
      toggleLoginPopup,
      showInvitationForm,
      setQRCode
    } = this.props;

    if (this.state.localTicketCount <= 0) return;
    if (!isAuth) return toggleLoginPopup();

    // If payment was successful, use the payment result
    if (paymentResult) {
      setQRCode(paymentResult.QRCode);
      getReservations();
      showInvitationForm();
      // Navigate to success page if reservation id is available
      try {
        const reservationId = paymentResult?.reservation?._id || paymentResult?.reservation?.id;
        if (reservationId && this.props.history && typeof this.props.history.push === 'function') {
          this.props.history.push(`/booking/success/${reservationId}`);
        }
      } catch (_) {}
      return;
    }
    // If payment did not succeed (or user cancelled), do not attempt to create reservation here
    return;
  }

  render() {
    const { selectedCinema, selectedTime, cinema, user, movie, selectedDate, showInvitation } = this.props;
    const { localTicketCount, selectedSeatType } = this.state;

    return (
      <Container maxWidth="lg" style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#121214' }}>
        <Grid container spacing={4}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
              Movie Booking
            </Typography>
          </Grid>
          
          {/* Main Content Row */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Left Column - Ticket Selection */}
              <Grid item xs={12} md={6}>
                <Box 
                  p={3} 
                  bgcolor="rgba(255, 255, 255, 0.1)" 
                  borderRadius={2}
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  <Typography variant="h6" gutterBottom style={{ color: 'white', marginBottom: '20px' }}>
                    Select Tickets
                  </Typography>
                  
                  <TextField
                    fullWidth
                    type="number"
                    label="Number of Tickets"
                    value={localTicketCount}
                    onChange={(e) => this.handleTicketCountChange(e.target.value)}
                    inputProps={{ min: 1, max: 10 }}
                    variant="outlined"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}
                  />

                  {/* Seat Type Selection */}
                  <FormControl 
                    fullWidth 
                    variant="outlined"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}
                  >
                    <Select
                      value={selectedSeatType}
                      onChange={(e) => this.handleSeatTypeChange(e.target.value)}
                      label="Seat Type"
                      style={{ color: '#333' }}
                    >
                      {cinema?.priceTiers && Object.keys(cinema.priceTiers).map(seatType => (
                        <MenuItem key={seatType} value={seatType}>
                          <Box display="flex" justifyContent="space-between" width="100%">
                            <span style={{ textTransform: 'capitalize' }}>{seatType}</span>
                            <Chip 
                              label={`₹${cinema.priceTiers[seatType] || 0}`} 
                              size="small" 
                              color="primary"
                              style={{ marginLeft: '10px' }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Box mt={2}>
                    <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {localTicketCount} ticket(s) × {selectedSeatType} seat
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column - Booking Summary */}
              {selectedCinema && selectedTime && (
                <Grid item xs={12} md={6}>
                  <Box 
                    p={3} 
                    bgcolor="rgba(255, 255, 255, 0.1)" 
                    borderRadius={2}
                    style={{ backdropFilter: 'blur(10px)' }}
                  >
                    <Typography variant="h6" gutterBottom style={{ color: 'white', marginBottom: '20px' }}>
                      Booking Summary
                    </Typography>
                    
                    <Box mb={2} p={2} bgcolor="rgba(255, 255, 255, 0.05)" borderRadius={1}>
                      <Typography variant="body1" style={{ color: 'white', fontSize: '16px' }}>
                        <strong>Tickets:</strong> {localTicketCount}
                      </Typography>
                    </Box>
                    
                    <Box mb={2} p={2} bgcolor="rgba(255, 255, 255, 0.05)" borderRadius={1}>
                      <Typography variant="body1" style={{ color: 'white', fontSize: '16px' }}>
                        <strong>Seat Type:</strong> {selectedSeatType.charAt(0).toUpperCase() + selectedSeatType.slice(1)}
                      </Typography>
                    </Box>
                    
                    <Box mb={2} p={2} bgcolor="rgba(255, 255, 255, 0.05)" borderRadius={1}>
                      <Typography variant="body1" style={{ color: 'white', fontSize: '16px' }}>
                        <strong>Price per ticket:</strong> ₹{this.getSeatPrice()}
                      </Typography>
                    </Box>
                    
                    <Box mb={2} p={2} bgcolor="rgba(120, 205, 4, 0.2)" borderRadius={1} border="1px solid rgba(120, 205, 4, 0.3)">
                      <Typography variant="h6" style={{ color: '#78cd04', fontSize: '18px', fontWeight: 'bold' }}>
                        <strong>Total Price:</strong> ₹{this.getTotalPrice()}
                      </Typography>
                    </Box>
                    
                    <Box mb={2} p={2} bgcolor="rgba(255, 255, 255, 0.05)" borderRadius={1}>
                      <Typography variant="body1" style={{ color: 'white', fontSize: '16px' }}>
                        <strong>Cinema:</strong> {cinema?.name || 'Loading...'}
                      </Typography>
                    </Box>
                    
                    <Box mb={2} p={2} bgcolor="rgba(255, 255, 255, 0.05)" borderRadius={1}>
                      <Typography variant="body1" style={{ color: 'white', fontSize: '16px' }}>
                        <strong>Time:</strong> {selectedTime}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Checkout Section - Full Width */}
          {selectedCinema && selectedTime && !showInvitation && (
            <Grid item xs={12}>
              <Box mt={3}>
                <BookingCheckout
                  user={user}
                  ticketPrice={this.getSeatPrice()}
                  seatsAvailable={cinema?.seatsAvailable || 0}
                  selectedSeats={localTicketCount}
                  onBookSeats={(result) => this.checkout(result)}
                  onRequireLogin={() => this.props.toggleLoginPopup()}
                  reservationData={user ? {
                    movieId: movie._id,
                    movieTitle: movie.title,
                    cinemaId: selectedCinema,
                    username: user.username,
                    phone: user.phone,
                    email: user.email,
                    seats: [],
                    ticketsCount: localTicketCount,
                    seatType: selectedSeatType,
                    date: selectedDate,
                    startAt: selectedTime,
                    ticketPrice: this.getSeatPrice(),
                    total: this.getTotalPrice()
                  } : null}
                />
              </Box>
            </Grid>
          )}

          {/* Invitation/Success Section */}
          {showInvitation && (
            <Grid item xs={12}>
              <Box mt={3}>
                <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                  Booking confirmed! Check your email for details.
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Loading State */}
          {(!selectedCinema || !selectedTime) && (
            <Grid item xs={12}>
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="200px"
              >
                <Typography variant="h6" style={{ color: 'white' }}>
                  Loading booking information...
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedCinemaId = state.checkoutState.selectedCinema;
  const cinema = (state.cinemaState.cinemas || []).find(c => c._id === selectedCinemaId) || null;
  return {
    selectedCinema: selectedCinemaId,
    selectedTime: state.checkoutState.selectedTime,
    selectedDate: state.checkoutState.selectedDate,
    cinema,
    movie: state.movieState.selectedMovie,
    user: state.authState.user,
    isAuth: state.authState.isAuthenticated,
    showInvitation: state.checkoutState.showInvitation
  };
};

const mapDispatchToProps = {
  addReservation,
  toggleLoginPopup,
  showInvitationForm,
  setQRCode,
  getReservations
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles({})(SimpleBookingPage));
