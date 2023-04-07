const tf = require('@tensorflow/tfjs-node');
// const testData = require('./mlModel/test.json')

const fs = require('fs')
// console.log(tf.version)
// load  model from local folder 
const loadModel = async function () {
  const model = await tf.loadLayersModel('file://mlModel/model.json');
  const jsonData = JSON.parse(fs.readFileSync('./mlModel/test.json'));
  const input = tf.tensor2d(jsonData.map(({input}) => input));
  const truth = tf.tensor2d(jsonData.map(({output}) => output));
  input.print()
  truth.print()
  const prediction = await model.predict(input);
  prediction.print()

}

// async function calculateAuc(labels, predictions) {
//   const auc = await tfestimator.metrics.auc(labels, predictions).data();
//   return auc;
// }

loadModel()
// .then(pred => {
//   console.log(pred)
// });