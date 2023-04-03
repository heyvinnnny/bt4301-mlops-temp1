const tf = require('@tensorflow/tfjs-node');
const fs = require('fs')

// load  model from local folder 
const loadModel = async function () {
  const model = await tf.loadLayersModel('file://mlModel/model.json');

  const prediction = model.predict(tf.randomNormal([3, 784]));
  console.log(prediction);
  return model;
}
loadModel();