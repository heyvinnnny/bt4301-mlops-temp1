const tf = require('@tensorflow/tfjs-node');
const fs = require('fs')



const modelUrl = 'file:///tmp/my-model-1';

let model;

// load COCO-SSD graph model from TensorFlow Hub
const loadModel = async function () {
  console.log(`loading model from ${modelUrl}`);
  const model = await tf.loadLayersModel('file://mlModel/model.json');

  const prediction = model.predict(tf.randomNormal([3, 784]));
  console.log(prediction);
  return model;
}
loadModel();