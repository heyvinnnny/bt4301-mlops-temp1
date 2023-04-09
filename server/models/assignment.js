const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  deployment: { type: mongoose.Schema.Types.ObjectId, ref: 'Deployment' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;