const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Movie = require('../models/movie');
const userModeling = require('../utils/userModeling');

const router = new express.Router();

// Create a movie
router.post('/movies', auth.enhance, async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Upload single legacy image (kept for backward compatibility)
router.post(
  '/movies/photo/:id',
  auth.enhance,
  upload('movies').single('file'),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    const movieId = req.params.id;
    try {
      if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
      }
      const movie = await Movie.findById(movieId);
      if (!movie) return res.sendStatus(404);

      movie.image = `${url}/uploads/movies/${file.filename}`;
      await movie.save();
      res.send({ movie, file });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Upload banner and poster images in one call
router.post(
  '/movies/photos/:id',
  auth.enhance,
  upload('movies').fields([
    { name: 'banner', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
  ]),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const movieId = req.params.id;
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) return res.sendStatus(404);
      const bannerFile = req.files?.banner?.[0];
      const posterFile = req.files?.poster?.[0];
      if (!bannerFile && !posterFile) {
        const error = new Error('Please upload at least one file');
        error.httpStatusCode = 400;
        return next(error);
      }
      if (bannerFile) movie.bannerImage = `${url}/uploads/movies/banners/${bannerFile.filename}`;
      if (posterFile) movie.posterImage = `${url}/uploads/movies/posters/${posterFile.filename}`;
      await movie.save();
      res.send({ movie, files: req.files });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Add a review for a movie
router.post('/movies/:id/reviews', auth.simple, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).send({ message: 'Movie already reviewed' });
      }

      const review = {
        username: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.ratings.push(Number(rating));

      await movie.save();
      res.status(201).send({ message: 'Review added' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server Error' });
  }
});


// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get movie by id
router.get('/movies/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const movie = await Movie.findById(_id);
    if (!movie) return res.sendStatus(404);
    return res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update movie by id
router.put('/movies/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'title',
    'image',
    'language',
    'genre',
    'director',
    'cast',
    'description',
    'duration',
    'releaseDate',
    'endDate',
    'additionalInfo'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const movie = await Movie.findById(_id);
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete movie route removed as per requirement

// Movies user modeling (suggested movies)
router.get('/movies/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const cinemasUserModeled = await userModeling.moviesUserModeling(username);
    res.send(cinemasUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
