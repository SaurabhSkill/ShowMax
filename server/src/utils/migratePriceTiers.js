const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Load Mongoose models
const Cinema = require('../models/cinema');

const migratePriceTiers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Find all cinemas that don't have priceTiers or have all zeros
    const cinemas = await Cinema.find({
      $or: [
        { priceTiers: { $exists: false } },
        { 'priceTiers.normal': 0, 'priceTiers.executive': 0, 'priceTiers.premium': 0, 'priceTiers.classic': 0 }
      ]
    });

    console.log(`Found ${cinemas.length} cinemas to update`);

    for (const cinema of cinemas) {
      // Set default price tiers based on ticket price
      const basePrice = cinema.ticketPrice || 200;
      const priceTiers = {
        normal: Math.round(basePrice * 0.6),
        executive: Math.round(basePrice * 0.8),
        premium: Math.round(basePrice * 1.0),
        classic: Math.round(basePrice * 1.2)
      };

      await Cinema.findByIdAndUpdate(cinema._id, { priceTiers });
      console.log(`Updated ${cinema.name} with price tiers:`, priceTiers);
    }

    console.log('Migration completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Error during migration:', err);
    process.exit(1);
  }
};

migratePriceTiers();
