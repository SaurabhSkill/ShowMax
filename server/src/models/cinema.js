const mongoose = require('mongoose');
const { Schema } = mongoose;

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
    min: 0,
  },
  priceTiers: {
    normal: { 
      type: Number, 
      default: 0,
      min: 0 
    },
    executive: { 
      type: Number, 
      default: 0,
      min: 0 
    },
    premium: { 
      type: Number, 
      default: 0,
      min: 0 
    },
    classic: { 
      type: Number, 
      default: 0,
      min: 0 
    },
  },
  image: {
    type: String,
    default: 'https://source.unsplash.com/featured/?cinema'
  },
}, {
  timestamps: true
});

// Add indexes for better performance
cinemaSchema.index({ city: 1 });
cinemaSchema.index({ name: 1 });

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
