// backend/models/userModel.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  isdoctor: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  notification: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
