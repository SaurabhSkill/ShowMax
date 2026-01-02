import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Container, TextField, Typography, Box, FormControl, Select, MenuItem, Chip } from '@material-ui/core';
import theme from '../../../theme';
import BookingCheckout from './components/BookingCheckout/BookingCheckout';
import {
  addReservation,
  toggleLoginPopup,
  showInvitationForm,
  setQRCode,
  getReservations
} from '../../../store/actions';

// Reusable styled box component
const StyledBox = ({ children, ...props }) => (
  <Box 
    p={3} 
    bgcolor={theme.palette.background.paper} 
    borderRadius={2}
    style={{ backdropFilter: 'blur(10px)', border: `1px solid ${theme.palette.divider}` }}
    {...props}
  >
    {children}
  </Box>
);

// Summary item component
const SummaryItem = ({ label, value, highlight = false }) => (
  <Box 
    mb={2} 
    p={2} 
    bgcolor={highlight ? "rgba(218, 165, 32, 0.1)" : theme.palette.background.default} 
    borderRadius={1}
    border={highlight ? `1px solid ${theme.palette.primary.main}` : 'none'}
  >
    <Typography 
      variant={highlight ? "h6" : "body1"} 
      style={{ 
        color: highlight ? theme.palette.primary.main : theme.palette.text.primary, 
        fontSize: highlight ? '18px' : '16px',
        fontWeight: highlight ? 'bold' : 'normal'
      }}
    >
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

class SimpleBookingPage extends Component {
  state = {
    localTicketCount: 1,
    selectedSeatType: 'normal'
  };

  handleTicketCountChange = (count) => {
    const safe = Math.max(1, Math.min(10, Number(count) || 1));
    this.setState({ localTicketCount: safe });
  };

  handleSeatTypeChange = (seatType) => {
    this.setState({ selectedSeatType: seatType });
  };

  getSeatPrice = () => {
    const { cinema } = this.props;
    const { selectedSeatType } = this.state;
    return cinema?.priceTiers?.[selectedSeatType] || 0;
  };

  getTotalPrice = () => {
    const { localTicketCount } = this.state;
    return this.getSeatPrice() * localTicketCount;
  };

  async checkout(paymentResult = null) {
    const { getReservations, isAuth, toggleLoginPopup, showInvitationForm, setQRCode, history } = this.props;

    if (this.state.localTicketCount <= 0) return;
    if (!isAuth) return toggleLoginPopup();

    if (paymentResult) {
      setQRCode(paymentResult.QRCode);
      getReservations();
      showInvitationForm();
      
      const reservationId = paymentResult?.reservation?._id || paymentResult?.reservation?.id;
      if (reservationId && history?.push) {
        history.push(`/booking/success/${reservationId}`);
      }
    }
  }

  renderTicketSelection() {
    const { cinema } = this.props;
    const { localTicketCount, selectedSeatType } = this.state;

    return (
      <StyledBox>
        <Typography variant="h6" gutterBottom style={{ color: theme.palette.text.primary, marginBottom: '20px' }}>
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
            backgroundColor: theme.palette.background.paper,
            borderRadius: '8px',
            marginBottom: '20px'
          }}
        />

        <FormControl 
          fullWidth 
          variant="outlined"
          style={{ 
            backgroundColor: theme.palette.background.paper,
            borderRadius: '8px',
            marginBottom: '20px'
          }}
        >
          <Select
            value={selectedSeatType}
            onChange={(e) => this.handleSeatTypeChange(e.target.value)}
            label="Seat Type"
            style={{ color: theme.palette.text.primary }}
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
          <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
            {localTicketCount} ticket(s) × {selectedSeatType} seat
          </Typography>
        </Box>
      </StyledBox>
    );
  }

  renderBookingSummary() {
    const { cinema, selectedTime } = this.props;
    const { localTicketCount, selectedSeatType } = this.state;

    return (
      <StyledBox>
        <Typography variant="h6" gutterBottom style={{ color: theme.palette.text.primary, marginBottom: '20px' }}>
          Booking Summary
        </Typography>
        
        <SummaryItem label="Tickets" value={localTicketCount} />
        <SummaryItem label="Seat Type" value={selectedSeatType.charAt(0).toUpperCase() + selectedSeatType.slice(1)} />
        <SummaryItem label="Price per ticket" value={`₹${this.getSeatPrice()}`} />
        <SummaryItem label="Total Price" value={`₹${this.getTotalPrice()}`} highlight />
        <SummaryItem label="Cinema" value={cinema?.name || 'Loading...'} />
        <SummaryItem label="Time" value={selectedTime} />
      </StyledBox>
    );
  }

  render() {
    const { selectedCinema, selectedTime, cinema, user, movie, selectedDate, showInvitation } = this.props;
    const { localTicketCount, selectedSeatType } = this.state;

    return (
      <Container maxWidth="lg" style={{ padding: '20px', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ color: theme.palette.text.primary, textAlign: 'center', marginBottom: '30px' }}>
              Movie Booking
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {this.renderTicketSelection()}
              </Grid>

              {selectedCinema && selectedTime && (
                <Grid item xs={12} md={6}>
                  {this.renderBookingSummary()}
                </Grid>
              )}
            </Grid>
          </Grid>

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

          {showInvitation && (
            <Grid item xs={12}>
              <Box mt={3}>
                <Typography variant="h6" style={{ color: theme.palette.text.primary, textAlign: 'center' }}>
                  Booking confirmed! Check your email for details.
                </Typography>
              </Box>
            </Grid>
          )}

          {(!selectedCinema || !selectedTime) && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography variant="h6" style={{ color: theme.palette.text.primary }}>
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
