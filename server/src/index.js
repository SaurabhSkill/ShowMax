const express = require('express');
const path = require('path');
const cors = require('cors');

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// Connect to the database
require('./db/mongoose');

// Import routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const cinemaRouter = require('./routes/cinema');
const showtimeRouter = require('./routes/showtime');
const reservationRouter = require('./routes/reservation');
const invitationsRouter = require('./routes/invitations');
const paymentRouter = require('./routes/payment');

// Import reservation cleanup utility
const { scheduleReservationCleanup } = require('./utils/reservationCleanup');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;

// CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
}));

// Relax COOP to allow communication with popups (e.g., window.postMessage)
app.use((req, res, next) => {
  // Use 'same-origin-allow-popups' so popups opened from this page can still communicate
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  // Ensure we don't isolate browsing context group via COEP; allow embedding
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  // Allow cross-origin resources if needed (images/fonts)
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  // Disable Origin-Agent-Cluster which can interfere with COOP isolation
  res.setHeader('Origin-Agent-Cluster', '?0');
  next();
});

// Body parser
app.use(express.json());

// Static assets
app.use(express.static(path.join(__dirname, '../../client/build')));
// Serve hashed static assets without SPA fallback interfering
app.use('/static', express.static(path.join(__dirname, '../../client/build/static')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use(userRouter);
app.use(movieRouter);
app.use(cinemaRouter);
app.use(showtimeRouter);
app.use(reservationRouter);
app.use(invitationsRouter);
app.use(paymentRouter);

// Client SPA fallback
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`app is running in PORT: ${port}`);
  
  // Start the reservation cleanup scheduler
  scheduleReservationCleanup();
});
