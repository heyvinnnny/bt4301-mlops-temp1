const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true,
    enum: ['User', 'Manager']
  }
});

module.exports = mongoose.model('User', userSchema);