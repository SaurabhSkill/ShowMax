const express = require('express');
const auth = require('../middlewares/auth');
const Showtime = require('../models/showtime');

const router = new express.Router();

// Create a showtime
router.post('/showtimes', auth.enhance, async (req, res) => {
  const showtime = new Showtime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get showtimes for a specific movie
router.get('/showtimes/movie/:movieId', async (req, res) => {
  try {
    const showtimes = await Showtime.find({ movieId: req.params.movieId });
    if (!showtimes) {
      return res.status(404).send();
    }
    res.send(showtimes);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get all showtimes for a specific cinema (admin)
router.get('/showtimes/cinema/:cinemaId', async (req, res) => {
  try {
    const showtimes = await Showtime.find({ cinemaId: req.params.cinemaId })
      .populate('movieId'); // We only need the movie details here
    if (!showtimes) {
      return res.status(404).send();
    }
    res.send(showtimes);
  } catch (e) {
    res.status(500).send(e);
  }
});


// Get all showtimes with movie/cinema details
router.get('/showtimes', async (req, res) => {
  try {
    const showtimes = await Showtime.find({})
      .populate('movieId')
      .populate('cinemaId');
    res.send(showtimes);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get showtime by id (with populated data)
router.get('/showtimes/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findById(_id)
      .populate('movieId')
      .populate('cinemaId');
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update showtime by id
router.patch('/showtimes/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['startAt', 'startDate', 'endDate', 'movieId', 'cinemaId'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const showtime = await Showtime.findById(_id);
    updates.forEach((update) => (showtime[update] = req.body[update]));
    await showtime.save();
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete showtime by id
router.delete('/showtimes/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findByIdAndDelete(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
