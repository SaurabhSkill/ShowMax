const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const sendEmail = require('../utils/mail');

const router = new express.Router();

// --- ADMIN: Get all users ---
// Used by admin panel Users section
router.get('/users', auth.simple, async (req, res) => {
  try {
    // Only allow admin or superadmin roles
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
      return res.status(403).send({ message: 'Forbidden' });
    }
    // Return a safe projection for admin list view
    const users = await User.find({}, {
      name: 1,
      username: 1,
      email: 1,
      phone: 1,
      role: 1,
      imageurl: 1,
      isVerified: 1,
      createdAt: 1,
      updatedAt: 1
    }).sort({ createdAt: -1 });
    res.send(users);
  } catch (e) {
    res.status(500).send({ message: 'Failed to load users' });
  }
});

// Register with email OTP verification
router.post('/users/register', async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;
    
    // 1. Check if a VERIFIED user already exists
    const existingVerifiedUser = await User.findOne({ email, isVerified: true });
    if (existingVerifiedUser) {
      return res.status(400).send({ message: 'A verified user with this email already exists.' });
    }

    // 2. Check if an UNVERIFIED user exists
    let user = await User.findOne({ email, isVerified: false });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    if (user) {
      // 3. If unverified user exists, update them with new data and new OTP
      user.name = name;
      user.username = username;
      user.phone = phone;
      user.password = password; // The 'pre-save' hook will hash this
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      // 4. If no user exists, create a new unverified user
      user = new User({ name, username, email, phone, password, otp, otpExpires });
    }

    await user.save();

    // 5. Send OTP to user's email
    const message = `<p>Hi ${name},</p><p>Your verification code for ShowMax is: <h1>${otp}</h1></p><p>This code will expire in 10 minutes.</p>`;
    await sendEmail({
      email: user.email,
      subject: 'Your Email Verification Code',
      message
    });

    res.status(201).send({ message: 'Registration successful. Please check your email for the verification code.', email: user.email });
  } catch (e) {
    console.error(e);
    // Provide a more specific error message if it's a duplicate key error
    if (e.code === 11000) {
        return res.status(400).send({ message: 'Username or phone number is already in use.' });
    }
    res.status(400).send({ message: 'An error occurred during registration.' });
  }
});

// Verify OTP and login
router.post('/users/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send({ message: 'Invalid OTP or OTP has expired.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Forgot password: send OTP
router.post('/users/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email, isVerified: true }); // Only allow for verified users

        if (!user) {
            return res.send({ message: 'If a user with that email exists, a password reset OTP has been sent.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        const message = `<p>Hi ${user.name},</p><p>Your password reset code is: <h1>${otp}</h1></p><p>This code will expire in 10 minutes.</p>`;
        await sendEmail({
            email: user.email,
            subject: 'Your Password Reset Code',
            message
        });

        res.send({ message: 'If a user with that email exists, a password reset OTP has been sent.' });

    } catch (e) {
        res.status(500).send(e);
    }
});

// Reset password using OTP
router.post('/users/reset-password', async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send({ message: 'Invalid OTP or OTP has expired.' });
        }

        user.password = password;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate token for auto-login after password reset
        const token = await user.generateAuthToken();
        res.send({ user, token, message: 'Password has been reset successfully.' });

    } catch (e) {
        res.status(400).send(e);
    }
});


// Username/email and password login
router.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({
      error: { message: e.message || 'You have entered an invalid username/email or password' },
    });
  }
});

// Logout current session
router.post('/users/logout', auth.simple, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Get current user profile
router.get('/users/me', auth.simple, async (req, res) => {
  res.send(req.user);
});

// Update current user profile
router.patch('/users/me', auth.simple, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'phone'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// --- DELETE USER ---
router.delete('/users/me', auth.simple, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
