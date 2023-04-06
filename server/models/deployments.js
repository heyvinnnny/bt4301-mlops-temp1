const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema({
  deployment_id: { type: String, required: true },
  deployment_name: { type: String, required: true },
  importance: { type: String, required: true },
  service: { type: String, required: true },
  drift: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  num_predictions: { type: Number, required: true },
  created_at: { type: Date, required: true },
  date_now: { type: Date, default: Date.now },
  last_prediction: { type: Date, required: true },
  manager_email: { type: String, required: true },
  manager_name: { type: String, required: true },
  user_email: { type: String, required: true },
  user_name: { type: String, required: true },
  model_version: { type: String, required: true },
  environment_version: { type: String, required: true },
  deployment_status: { type: String, required: true },
  testing_status: { type: String, required: true },
  deployed: { type: Boolean, required: true },
  approval_status: { type: String, required: true },
  replacement_reason: { type: String },
  manually_apply_changes: { type: Boolean },
});

const Deployment = mongoose.model("Deployment", deploymentSchema);

module.exports = Deployment;
