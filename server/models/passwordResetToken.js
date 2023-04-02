// models/passwordResetToken.js

const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // expires after 1 hour
  },
});

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);

module.exports = PasswordResetToken;
