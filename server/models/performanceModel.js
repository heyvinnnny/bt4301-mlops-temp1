const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  model: String,
  timestamp: Date,
  totalPredictions: Number,
  totalRequests: Number,
  requestOverMs: Number,
  responseTime: Number,
  executionTime: Number,
  medianPeakLoad: Number,
  dataErrorRate: Number,
  systemErrorRate: Number,
  consumers: Number,
  cacheHitRate: Number,
});

module.exports = mongoose.model('Performance', performanceSchema);