import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  paymentForm: {
    padding: theme.spacing(3),
    maxWidth: 500,
    margin: '0 auto'
  },
  payButton: {
    width: '100%',
    marginTop: theme.spacing(2),
    height: 50,
    fontSize: '1.1rem'
  },
  error: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ffcdd2',
  },
  success: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #c8e6c9',
  },
  amountDisplay: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  summaryCard: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5'
  },
  mockInfo: {
    backgroundColor: '#e3f2fd',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  processingText: {
    marginTop: theme.spacing(1),
    fontStyle: 'italic'
  }
}));

const PaymentForm = ({ 
  amount, 
  onPaymentSuccess, 
  onPaymentError, 
  reservationData,
  disabled = false,
  onRequireLogin
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const simulatePayment = async () => {
    setLoading(true);
    setError(null);
    setProcessing(true);

    try {
      // Basic client-side validations to avoid 400s
      if (!amount || Number(amount) <= 0) {
        throw new Error('Amount must be greater than 0. Please check seat type pricing.');
      }
      const required = ['movieId', 'cinemaId', 'ticketsCount', 'ticketPrice', 'total', 'date', 'startAt'];
      const missing = required.filter(k => !reservationData || reservationData[k] === undefined || reservationData[k] === null || reservationData[k] === '');
      if (missing.length) {
        throw new Error(`Missing booking details: ${missing.join(', ')}`);
      }

      // Ensure we have an auth token; if not, ask user to login
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('Please login to continue');
      }

      // Create order
      const safeReservation = reservationData || {};
      const orderResponse = await fetch('/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          metadata: {
            movieId: safeReservation.movieId,
            cinemaId: safeReservation.cinemaId,
            ticketsCount: safeReservation.ticketsCount,
            seats: JSON.stringify(safeReservation.seats || [])
          }
        })
      });

      const orderText = await orderResponse.text();
      const orderData = orderText ? JSON.parse(orderText) : {};
      if (orderResponse.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      if (!orderResponse.ok || !orderData?.orderId) {
        throw new Error((orderData && orderData.error) || 'Failed to create order');
      }

      // Simulate payment processing
      const paymentResponse = await fetch('/simulate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          reservationData: safeReservation
        })
      });

      const resultText = await paymentResponse.text();
      const result = resultText ? JSON.parse(resultText) : {};
      
      if (paymentResponse.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      if (paymentResponse.ok) {
        onPaymentSuccess(result);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong while processing payment');
      if (String(err?.message || '').toLowerCase().includes('login')) {
        if (typeof onRequireLogin === 'function') onRequireLogin();
      }
      onPaymentError(err);
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  return (
    <Box className={classes.paymentForm}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Complete Payment
      </Typography>
      
      <Card className={classes.summaryCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Booking Summary
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Movie: {(reservationData && reservationData.movieTitle) || 'Movie Ticket'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Seats: {(reservationData && reservationData.ticketsCount) || (reservationData && reservationData.seats && reservationData.seats.length) || 0} tickets
          </Typography>
          <Divider style={{ margin: '8px 0' }} />
          <Typography className={classes.amountDisplay}>
            ₹{amount.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {error && (
        <Box className={classes.error}>
          {error}
        </Box>
      )}

      {processing && (
        <Box className={classes.success}>
          <CircularProgress size={20} style={{ marginRight: 8 }} />
          Processing payment... Please wait
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={simulatePayment}
        className={classes.payButton}
      >
        {loading ? (
          <>
            <CircularProgress size={24} style={{ marginRight: 8 }} />
            Processing...
          </>
        ) : (
          `Pay ₹${amount.toFixed(2)}`
        )}
      </Button>

      <Box className={classes.mockInfo}>
        <Typography variant="body2" color="primary">
          <strong>Mock Payment System</strong>
        </Typography>
        <Typography variant="caption" display="block">
          This is a demo payment system. No real money will be charged.
        </Typography>
        <Typography variant="caption" display="block">
          Success rate: 90% | Processing time: 2 seconds
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentForm;
