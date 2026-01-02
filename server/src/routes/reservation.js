const express = require('express');
const auth = require('../middlewares/auth');
const Reservation = require('../models/reservation');
const userModeling = require('../utils/userModeling');
const generateQR = require('../utils/generateQRCode');
const { manualCleanup } = require('../utils/reservationCleanup');

const router = new express.Router();

// Create a reservation (ticket count only supported)
router.post('/reservations', auth.simple, async (req, res) => {
  try {
    const { date, startAt, ticketsCount, ticketPrice, total, movieId, cinemaId, username, phone, priceTier, seatType } = req.body;
    if (!ticketsCount || ticketsCount < 1) return res.status(400).send({ message: 'ticketsCount is required' });

    // Decrement seatsAvailable atomically to avoid oversell
    const Cinema = require('../models/cinema');
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) return res.status(404).send({ message: 'Cinema not found' });
    if (cinema.seatsAvailable < ticketsCount) return res.status(400).send({ message: 'Not enough seats available' });

    cinema.seatsAvailable -= ticketsCount;
    await cinema.save();

    const reservation = new Reservation({
      date,
      startAt,
      ticketsCount,
      ticketPrice,
      priceTier,
      seatType: seatType || 'normal',
      total,
      movieId,
      cinemaId,
      username,
      phone,
      seats: [],
      userId: req.user._id,
    });

    await reservation.save();
    const QRCode = await generateQR(`${req.protocol}://${req.get('host')}/#/checkin/${reservation._id}`);
    res.status(201).send({ reservation, QRCode });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all reservations
router.get('/reservations', auth.simple, async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get reservation by id
router.get('/reservations/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Get reservation checkin by id
router.get('/reservations/checkin/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    reservation.checkin = true;
    await reservation.save();
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update reservation by id
router.patch('/reservations/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'date',
    'startAt',
    'seats',
    'ticketPrice',
    'total',
    'username',
    'phone',
    'checkin',
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const reservation = await Reservation.findById(_id);
    updates.forEach((update) => (reservation[update] = req.body[update]));
    await reservation.save();
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete reservation by id
router.delete('/reservations/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findByIdAndDelete(_id);
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// User modeling get suggested seats
router.get('/reservations/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const suggestedSeats = await userModeling.reservationSeatsUserModeling(username);
    res.send(suggestedSeats);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Manual cleanup endpoint (admin only)
router.post('/reservations/cleanup', auth.enhance, async (req, res) => {
  try {
    const result = await manualCleanup();
    res.status(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Manual cleanup failed:', error);
    res.status(500).send({
      success: false,
      message: 'Cleanup failed',
      error: error.message
    });
  }
});

module.exports = router;
