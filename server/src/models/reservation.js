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
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
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
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
