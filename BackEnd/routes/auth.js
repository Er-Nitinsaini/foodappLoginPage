const express = require('express');
const router = express.Router();

const userSchema = require('../models/User'); // Import the User model

router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  try {
    // Use findOne to search for a single user
    const user = await userSchema.findOne({ email: new RegExp('^' + email + '$', 'i') });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1. SEND OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await userSchema.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    // Send OTP here (Mocked, just log it for now)
    console.log(`📲 OTP for ${phone}: ${otp}`);

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// 2. VERIFY OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await userSchema.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.otp || !user.otpExpiry || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: 'Login successful via OTP', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


module.exports = router;
