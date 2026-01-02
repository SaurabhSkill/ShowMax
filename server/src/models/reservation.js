const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  // Optional when using ticket-count-only flow
  seats: {
    type: [Schema.Types.Mixed],
    required: false,
    default: [],
  },
  ticketsCount: {
    type: Number,
    required: true,
    min: 1,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  // Which tier selected for pricing
  priceTier: {
    type: String,
    enum: ['normal', 'executive', 'premium', 'classic'],
    default: 'normal',
  },
  // Seat type selected by user
  seatType: {
    type: String,
    enum: ['normal', 'executive', 'premium', 'classic'],
    default: 'normal',
  },
  total: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
  // Payment fields
  paymentId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values but ensures uniqueness when present
  },
  orderId: {
    type: String,
    unique: true,
    sparse: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  refundId: {
    type: String,
  },
  refundedAt: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
