// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  otp: String,
  otpExpiry: Date
});

module.exports = mongoose.model('User', userSchema, 'testusre');
