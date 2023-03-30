const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
});

const Version = mongoose.model('Version', versionSchema);

module.exports = { Version };