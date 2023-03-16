const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passwordResetToken = require('../models/passwordResetToken');
const User = require('../models/user');

// Route for resetting password
router.post('/resetpassword', (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  // Check if password and confirm password match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      title: 'Passwords do not match',
      error: 'Please make sure your passwords match'
    });
  }

  // Find the reset token in the database
  passwordResetToken.findOne({ token: token })
    .then(resetToken => {
      // Check if reset token exists and is not expired
      if (!resetToken || resetToken.isExpired()) {
        return res.status(400).json({
          title: 'Invalid token',
          error: 'Your reset password token is invalid or has expired. Please try again.'
        });
      }

      // Find the user associated with the reset token
      User.findOne({ _id: resetToken._userId })
        .then(user => {
          if (!user) {
            return res.status(404).json({
              title: 'User not found',
              error: 'We were unable to find a user for this token.'
            });
          }

          // Hash the new password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  title: 'Error hashing password',
                  error: err
                });
              }

              // Update the user's password in the database
              user.password = hash;
              user.save()
                .then(() => {
                  // Delete the reset token from the database
                  passwordResetToken.findOneAndDelete({ token: token })
                    .then(() => {
                      return res.status(200).json({
                        title: 'Password reset success',
                        message: 'Your password has been successfully reset'
                      });
                    });
                });
            });
          });
        });
    });
});

module.exports = router;