const mongoose = require('mongoose');
const Performance = require('../models/performanceModel');
const connectionString = 'mongodb://localhost:27017/mlops';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = [
  // Add your sample data for all three models and different time intervals here
];

Performance.insertMany(seedData)
  .then(() => {
    console.log('Seed data added');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  });