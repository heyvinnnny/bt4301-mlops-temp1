const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  modelVersion: { type: String, required: true },
  deploymentId: { type: String, required: true },
  // path: { type: Number, required: true },
  auc: { type: Number, required: true },
  gini: { type: Number, required: true },
  logloss: { type: Number, required: true },
  kolmogorov: { type: Number, required: true },
  psi: { type: Number, required: true },
});

const Model = mongoose.model('Model', ModelSchema);

module.exports = Model;