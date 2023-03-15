// routes/auth.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const PasswordResetToken = require('../models/passwordResetToken');

router.post('/forgotpassword', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if the email address provided in the request body exists in your MongoDB database.
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a unique token for the password reset request.
      const token = crypto.randomBytes(20).toString('hex');
  
      // Insert a new document in the password-reset-tokens collection with the email address and token.
      const resetToken = new PasswordResetToken({
        email,
        token
      });
      await resetToken.save();
  
      // Send an email to the user with a link to a password reset page.
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  
      const resetUrl = `${req.protocol}://${req.hostname}/reset-password?token=${token}`;
  
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Reset Your Password',
        text: `Hi ${user.name},\n\nYou are receiving this email because you (or someone else) has requested to reset the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });