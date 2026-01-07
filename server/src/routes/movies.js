const express = require('express');
const auth = require('../middlewares/auth');
const { upload, uploadToCloudinary, deleteFromCloudinary, extractPublicId } = require('../utils/cloudinary');
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
  upload.single('file'),
  async (req, res, next) => {
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

      // Delete old image from Cloudinary if it exists
      if (movie.image) {
        const oldPublicId = extractPublicId(movie.image);
        if (oldPublicId) {
          try {
            await deleteFromCloudinary(oldPublicId);
          } catch (deleteError) {
            console.warn('Failed to delete old image:', deleteError);
          }
        }
      }

      // Upload new image to Cloudinary
      const uploadResult = await uploadToCloudinary(file.buffer, {
        folder: 'cinema-plus/movies',
        public_id: `movie_${movieId}_${Date.now()}`,
        transformation: [
          { width: 500, height: 750, crop: 'fill', quality: 'auto' }
        ]
      });

      movie.image = uploadResult.secure_url;
      await movie.save();
      
      res.send({ 
        movie, 
        file: {
          filename: uploadResult.public_id,
          url: uploadResult.secure_url
        }
      });
    } catch (e) {
      console.error('Movie image upload error:', e);
      res.status(400).send({ error: e.message });
    }
  }
);

// Upload banner and poster images in one call
router.post(
  '/movies/photos/:id',
  auth.enhance,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
  ]),
  async (req, res, next) => {
    const movieId = req.params.id;
    
    try {
      console.log('🎬 Movie image upload request for ID:', movieId);
      console.log('📁 Request files object:', req.files);
      console.log('📊 Files summary:');
      console.log('  - Banner files:', req.files?.banner?.length || 0);
      console.log('  - Poster files:', req.files?.poster?.length || 0);
      
      const movie = await Movie.findById(movieId);
      if (!movie) {
        console.log('❌ Movie not found:', movieId);
        return res.status(404).json({ error: 'Movie not found' });
      }
      
      const bannerFile = req.files?.banner?.[0];
      const posterFile = req.files?.poster?.[0];
      
      console.log('📋 Processing files:');
      if (bannerFile) {
        console.log(`  ✅ Banner: ${bannerFile.originalname} (${bannerFile.size} bytes, ${bannerFile.mimetype})`);
      } else {
        console.log('  ❌ No banner file');
      }
      
      if (posterFile) {
        console.log(`  ✅ Poster: ${posterFile.originalname} (${posterFile.size} bytes, ${posterFile.mimetype})`);
      } else {
        console.log('  ❌ No poster file');
      }
      
      if (!bannerFile && !posterFile) {
        const error = new Error('Please upload at least one file (banner or poster)');
        error.httpStatusCode = 400;
        return next(error);
      }

      const uploadResults = {};

      // Upload banner image
      if (bannerFile) {
        console.log('🔄 Processing banner upload...');
        
        // Delete old banner from Cloudinary if it exists
        if (movie.bannerImage) {
          const oldPublicId = extractPublicId(movie.bannerImage);
          if (oldPublicId) {
            try {
              console.log('🗑️ Deleting old banner:', oldPublicId);
              await deleteFromCloudinary(oldPublicId);
            } catch (deleteError) {
              console.warn('⚠️ Failed to delete old banner:', deleteError.message);
            }
          }
        }

        try {
          const bannerResult = await uploadToCloudinary(bannerFile.buffer, {
            folder: 'cinema-plus/movies/banners',
            public_id: `banner_${movieId}_${Date.now()}`,
            transformation: [
              { width: 1920, height: 1080, crop: 'fill', quality: 'auto:good' },
              { fetch_format: 'auto' }
            ]
          });

          movie.bannerImage = bannerResult.secure_url;
          uploadResults.banner = {
            url: bannerResult.secure_url,
            public_id: bannerResult.public_id,
            format: bannerResult.format,
            bytes: bannerResult.bytes
          };
          console.log('✅ Banner uploaded successfully:', bannerResult.secure_url);
        } catch (uploadError) {
          console.error('❌ Banner upload failed:', uploadError);
          throw new Error(`Banner upload failed: ${uploadError.message}`);
        }
      }

      // Upload poster image
      if (posterFile) {
        console.log('🔄 Processing poster upload...');
        
        // Delete old poster from Cloudinary if it exists
        if (movie.posterImage) {
          const oldPublicId = extractPublicId(movie.posterImage);
          if (oldPublicId) {
            try {
              console.log('🗑️ Deleting old poster:', oldPublicId);
              await deleteFromCloudinary(oldPublicId);
            } catch (deleteError) {
              console.warn('⚠️ Failed to delete old poster:', deleteError.message);
            }
          }
        }

        try {
          const posterResult = await uploadToCloudinary(posterFile.buffer, {
            folder: 'cinema-plus/movies/posters',
            public_id: `poster_${movieId}_${Date.now()}`,
            transformation: [
              { width: 500, height: 750, crop: 'fill', quality: 'auto:good' },
              { fetch_format: 'auto' }
            ]
          });

          movie.posterImage = posterResult.secure_url;
          uploadResults.poster = {
            url: posterResult.secure_url,
            public_id: posterResult.public_id,
            format: posterResult.format,
            bytes: posterResult.bytes
          };
          console.log('✅ Poster uploaded successfully:', posterResult.secure_url);
        } catch (uploadError) {
          console.error('❌ Poster upload failed:', uploadError);
          throw new Error(`Poster upload failed: ${uploadError.message}`);
        }
      }

      // Save movie with updated image URLs
      await movie.save();
      console.log('💾 Movie saved with updated image URLs');
      
      res.status(200).json({ 
        success: true,
        movie: {
          _id: movie._id,
          title: movie.title,
          bannerImage: movie.bannerImage,
          posterImage: movie.posterImage
        },
        files: uploadResults,
        message: `Successfully uploaded ${Object.keys(uploadResults).length} image(s) to Cloudinary`
      });
      
    } catch (error) {
      console.error('❌ Movie images upload error:', error);
      
      // Send detailed error response
      res.status(500).json({ 
        error: error.message || 'Image upload failed',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
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
    const movie = await Movie.findByIdAndUpdate(
      _id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    
    console.log('Movie updated successfully:', movie);
    res.send(movie);
  } catch (e) {
    console.error('Movie update error:', e);
    return res.status(400).send(e);
  }
});

// Delete movie by id
router.delete('/movies/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;

  try {
    const movie = await Movie.findById(_id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }

    // Delete images from Cloudinary before deleting the movie
    const deletePromises = [];
    
    if (movie.image) {
      const imagePublicId = extractPublicId(movie.image);
      if (imagePublicId) {
        deletePromises.push(deleteFromCloudinary(imagePublicId));
      }
    }
    
    if (movie.bannerImage) {
      const bannerPublicId = extractPublicId(movie.bannerImage);
      if (bannerPublicId) {
        deletePromises.push(deleteFromCloudinary(bannerPublicId));
      }
    }
    
    if (movie.posterImage) {
      const posterPublicId = extractPublicId(movie.posterImage);
      if (posterPublicId) {
        deletePromises.push(deleteFromCloudinary(posterPublicId));
      }
    }

    // Wait for all image deletions to complete (but don't fail if some fail)
    if (deletePromises.length > 0) {
      try {
        await Promise.allSettled(deletePromises);
        console.log('Cloudinary images cleanup completed for movie:', _id);
      } catch (error) {
        console.warn('Some Cloudinary images could not be deleted:', error);
      }
    }

    // Delete the movie from database
    await Movie.findByIdAndDelete(_id);
    
    res.send({ 
      message: 'Movie deleted successfully',
      deletedMovie: movie 
    });
  } catch (e) {
    console.error('Movie deletion error:', e);
    return res.status(400).send({ error: e.message });
  }
});

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
