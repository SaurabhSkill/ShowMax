const express = require('express');
const auth = require('../middlewares/auth');
const Reservation = require('../models/reservation');
const generateQR = require('../utils/generateQRCode');

const router = new express.Router();

// Mock payment simulation - no external dependencies needed!
const simulatePaymentDelay = () => new Promise(resolve => setTimeout(resolve, 2000));

// Create mock payment order
router.post('/create-order', auth.simple, async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).send({ error: 'Invalid amount' });
    }

    // Simulate order creation
    const orderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.send({
      orderId,
      amount: Math.round(amount * 100), // Convert to paise for consistency
      currency,
      message: 'Mock order created successfully'
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).send({ error: 'Failed to create order' });
  }
});

// Simulate payment and create reservation
router.post('/simulate-payment', auth.simple, async (req, res) => {
  try {
    const { orderId, reservationData } = req.body;
    
    // Simulate payment processing delay
    await simulatePaymentDelay();
    
    // Always succeed for mock payments to avoid random failures during testing
    const isSuccess = true;

    // Generate mock payment ID
    const paymentId = `mock_payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Coerce and validate reservation payload
    const payload = { ...reservationData };
    if (payload.date && typeof payload.date === 'string') {
      payload.date = new Date(payload.date);
    }
    if (!payload.seats) payload.seats = [];
    if (!payload.seatType && payload.priceTier) payload.seatType = payload.priceTier;
    // Backfill user fields from authenticated user if missing
    if (!payload.username && req.user?.username) payload.username = req.user.username;
    if (!payload.phone && req.user?.phone) payload.phone = req.user.phone;
    // Ensure numeric fields are numbers
    if (payload.ticketsCount != null) payload.ticketsCount = Number(payload.ticketsCount);
    if (payload.ticketPrice != null) payload.ticketPrice = Number(payload.ticketPrice);
    if (payload.total != null) payload.total = Number(payload.total);
    
    // Basic required field validation
    const required = ['date', 'startAt', 'ticketsCount', 'ticketPrice', 'total', 'movieId', 'cinemaId', 'username', 'phone'];
    const missing = required.filter(k => payload[k] === undefined || payload[k] === null || payload[k] === '');
    if (missing.length) {
      return res.status(400).send({ error: `Missing fields: ${missing.join(', ')}` });
    }

    const reservation = new Reservation({
      ...payload,
      paymentId,
      orderId,
      paymentStatus: 'completed',
      userId: req.user._id
    });

    // Generate QR code
    const QRCode = await generateQR(`https://elcinema.herokuapp.com/#/checkin/${reservation._id}`);
    
    await reservation.save();
    
    res.status(201).send({ 
      reservation, 
      QRCode,
      paymentStatus: 'completed',
      paymentId,
      message: 'Payment successful! Reservation confirmed.'
    });
  } catch (error) {
    console.error('Payment simulation error:', error);
    // Surface validation problems for easier debugging
    const message = error?._message || error?.message || 'Failed to process payment';
    const status = /validation/i.test(message) ? 400 : 500;
    res.status(status).send({ error: message, details: error?.errors });
  }
});

// Get mock payment details
router.get('/payment-details/:paymentId', auth.simple, async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    // Return mock payment details
    res.send({
      id: paymentId,
      amount: 10000, // Mock amount in paise
      currency: 'INR',
      status: 'captured',
      method: 'mock_payment',
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Payment details error:', error);
    res.status(500).send({ error: 'Failed to fetch payment details' });
  }
});

// Mock refund
router.post('/refund', auth.simple, async (req, res) => {
  try {
    const { paymentId, amount } = req.body;
    
    // Simulate refund processing
    await simulatePaymentDelay();
    
    const refundId = `mock_refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Update reservation status
    await Reservation.findOneAndUpdate(
      { paymentId },
      { 
        paymentStatus: 'refunded',
        refundId,
        refundedAt: new Date()
      }
    );

    res.send({ 
      refund: { id: refundId, amount: amount || 10000 },
      status: 'refunded',
      message: 'Refund processed successfully'
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).send({ error: 'Failed to process refund' });
  }
});

module.exports = router;
