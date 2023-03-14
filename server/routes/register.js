const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

router.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, access } = req.body;

    // Check if user with same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, access });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;