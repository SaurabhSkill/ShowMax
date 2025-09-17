const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
const auth = require('../middlewares/auth');
const multer = require('../utils/multer');

// GET /cinemas - Get all cinemas
router.get('/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find({}).sort({ createdAt: -1 });
    res.json(cinemas);
  } catch (error) {
    console.error('Error fetching cinemas:', error);
    res.status(500).json({ error: 'Failed to fetch cinemas' });
  }
});

// GET /cinemas/:id - Get cinema by ID
router.get('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }
    res.json(cinema);
  } catch (error) {
    console.error('Error fetching cinema:', error);
    res.status(500).json({ error: 'Failed to fetch cinema' });
  }
});

// POST /cinemas - Create new cinema
router.post('/cinemas', auth.enhance, async (req, res) => {
  try {
    console.log('=== CINEMA CREATE REQUEST ===');
    console.log('Request body:', req.body);
    
    // Validate required fields
    const { name, city, seatsAvailable, priceTiers } = req.body;
    
    if (!name || !city || seatsAvailable === undefined || seatsAvailable === null) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, city, and seatsAvailable are required' 
      });
    }

    // Ensure seatsAvailable is a number
    const seats = Number(seatsAvailable);
    if (isNaN(seats) || seats < 0) {
      return res.status(400).json({ 
        error: 'seatsAvailable must be a valid positive number' 
      });
    }

    // Validate and set default price tiers
    const defaultPriceTiers = {
      normal: 0,
      executive: 0,
      premium: 0,
      classic: 0
    };

    const cinemaPriceTiers = priceTiers ? {
      normal: Number(priceTiers.normal) || 0,
      executive: Number(priceTiers.executive) || 0,
      premium: Number(priceTiers.premium) || 0,
      classic: Number(priceTiers.classic) || 0
    } : defaultPriceTiers;

    const cinemaData = {
      name: name.trim(),
      city: city.trim().toLowerCase(),
      seatsAvailable: seats,
      priceTiers: cinemaPriceTiers
    };

    console.log('Processed cinema data:', cinemaData);

    const cinema = new Cinema(cinemaData);
    await cinema.save();
    
    console.log('Cinema created successfully:', cinema);
    res.status(201).json(cinema);
  } catch (error) {
    console.error('Cinema creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

// PATCH /cinemas/:id - Update cinema
router.patch('/cinemas/:id', auth.enhance, async (req, res) => {
  try {
    console.log('=== CINEMA UPDATE REQUEST ===');
    console.log('Cinema ID:', req.params.id);
    console.log('Request body:', req.body);

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'city', 'seatsAvailable', 'priceTiers'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }

    // Validate seatsAvailable if provided
    if (req.body.seatsAvailable !== undefined) {
      const seats = Number(req.body.seatsAvailable);
      if (isNaN(seats) || seats < 0) {
        return res.status(400).json({ 
          error: 'seatsAvailable must be a valid positive number' 
        });
      }
      req.body.seatsAvailable = seats;
    }

    // Validate price tiers if provided
    if (req.body.priceTiers) {
      const priceTiers = req.body.priceTiers;
      req.body.priceTiers = {
        normal: Number(priceTiers.normal) || 0,
        executive: Number(priceTiers.executive) || 0,
        premium: Number(priceTiers.premium) || 0,
        classic: Number(priceTiers.classic) || 0
      };
    }

    const cinema = await Cinema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }

    console.log('Cinema updated successfully:', cinema);
    res.json(cinema);
  } catch (error) {
    console.error('Cinema update error:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /cinemas/:id - Delete cinema
router.delete('/cinemas/:id', auth.enhance, async (req, res) => {
  try {
    console.log('=== CINEMA DELETE REQUEST ===');
    console.log('Cinema ID:', req.params.id);

    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    
    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }

    console.log('Cinema deleted successfully:', cinema);
    res.json(cinema);
  } catch (error) {
    console.error('Cinema deletion error:', error);
    res.status(500).json({ error: 'Failed to delete cinema' });
  }
});

module.exports = router;
