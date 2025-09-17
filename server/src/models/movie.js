const mongoose = require('mongoose');

const { Schema } = mongoose;

// --- A new, separate schema for individual reviews ---
const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  comment: {
    type: String,
    trim: true
  }
}, { timestamps: true });


const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  bannerImage: {
    type: String,
  },
  posterImage: {
    type: String,
  },
  language: {
    type: [String],
    required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  cast: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  additionalInfo: {
    type: String,
    trim: true,
    default: ''
  },
  // --- NEW FIELDS FOR RATINGS AND REVIEWS ---
  ratings: {
    type: [Number],
    default: []
  },
  reviews: [reviewSchema] // Embed the review schema here
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
