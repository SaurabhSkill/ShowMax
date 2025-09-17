import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { PaymentForm } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: 'uppercase',
    color: 'rgb(93, 93, 97)',
    marginBottom: theme.spacing(1)
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  [theme.breakpoints.down('sm')]: {
    hideOnSmall: {
      display: 'none'
    }
  }
}));

export default function BookingCheckout(props) {
  const classes = useStyles(props);
  const {
    user,
    ticketPrice,
    selectedSeats,
    onBookSeats,
    reservationData,
    onRequireLogin
  } = props;
  
  // Ensure selectedSeats is always a valid number
  const safeSelectedSeats = Math.max(0, Number(selectedSeats) || 0);
  
  const [showPayment, setShowPayment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePaymentSuccess = (result) => {
    setShowPayment(false);
    setPaymentLoading(false);
    onBookSeats(result); // Pass the result to parent component
  };

  const handlePaymentError = (error) => {
    setPaymentLoading(false);
    console.error('Payment error:', error);
  };

  const handleCheckout = () => {
    // If user is not logged in, trigger login flow
    if (!user) {
      if (typeof onRequireLogin === 'function') onRequireLogin();
      return;
    }
    setShowPayment(true);
  };

  return (
    <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
      <Grid container>
        <Grid item xs={8} md={10}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            {user && user.name && (
              <Grid item className={classes.hideOnSmall}>
                <Typography className={classes.bannerTitle}>Name</Typography>
                <Typography className={classes.bannerContent}>
                  {user.name}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.bannerTitle}>Tickets</Typography>
              <Typography className={classes.bannerContent}>
                {safeSelectedSeats} tickets
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>Price</Typography>
              <Typography className={classes.bannerContent}>
                ₹{((ticketPrice || 0) * safeSelectedSeats).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          style={{
            color: 'rgb(120, 205, 4)',
            background: 'black',
            display: 'flex'
          }}>
          <Button
            color="inherit"
            fullWidth
            disabled={safeSelectedSeats <= 0}
            onClick={handleCheckout}>
            {paymentLoading ? 'Processing...' : 'Pay Now'}
          </Button>
        </Grid>
      </Grid>
      
      {/* Payment Dialog */}
      <Dialog 
        open={showPayment} 
        onClose={() => setShowPayment(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogContent>
          <PaymentForm
            amount={(ticketPrice || 0) * safeSelectedSeats}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            reservationData={reservationData}
            onRequireLogin={onRequireLogin}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
