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

// Body parser
app.use(express.json());

// Static assets
app.use(express.static(path.join(__dirname, '../../client/build')));
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
app.listen(port, () => console.log(`app is running in PORT: ${port}`));
