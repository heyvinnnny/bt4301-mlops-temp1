const tf = require('@tensorflow/tfjs-node');

const fs = require('fs')
console.log(tf.version)
// load  model from local folder 
const loadModel = async function () {
  const model = await tf.loadLayersModel('file://mlModel/model.json');
  const input = tf.randomNormal([9, 10])

  // const input = tf.tensor2d([[2.8043411 , 0.4795355 , -0.354585 , 0.4796881 , 0.6243277 , 0.4197068 , 0.5071785 , -0.6001244, -0.1712712, -2.8120039],   
  //   [1.1864566 , 0.4399862 , 0.2089108 , -1.3201804, -1.2404014, 0.2607397 , 1.2854881 , -0.0295904, -0.6873189, -0.8367506],   
  //   [0.5163979 , -1.4748669, -0.2550353, -2.1678927, 0.4171566 , -0.0927214, 0.0948683 , 0.4038623 , 0.1082863 , 0.4589601 ],   
  //   [0.3107428 , -0.418159 , -1.0316939, 0.5956589 , -1.1923324, -1.0468343, 1.5832183 , -0.3713693, 0.8348935 , 0.4411233 ],   
  //   [-0.2344915, -1.6837519, 0.1667305 , 0.7373848 , -0.1732707, -0.291153 , 1.4936113 , 0.6388656 , -1.0540085, 1.9048359 ],   
  //   [-0.4025679, -1.3501619, -1.0024146, -0.2777675, -0.0874383, -0.65033  , -0.7497619, 0.1936509 , -0.6362461, 0.7678736 ],   
  //   [1.4068695 , 1.0524361 , 0.9694384 , -0.4373937, 0.9218444 , -0.243026 , -0.5321883, 0.5509279 , -0.0667297, -0.6830205],   
  //   [2.6599269 , 1.0752684 , 1.9791648 , -0.3748977, -0.1573784, 0.1107586 , 1.1832899 , -0.5028442, 1.0501808 , -0.3234019],   
  //   [-0.8105566, -1.316527 , -0.5257353, 0.4263467 , 0.4538917 , -0.0327153, -1.0560007, -0.1893466, 0.1216328 , -0.5011404]])
  // input.print()
  const prediction = await model.predict(input);
  prediction.print()
  const argmaxIndices = prediction.argMax(1)
  const pred = tf.oneHot(argmaxIndices, 3)
  pred.print()
  // console.log(tf.max(prediction).print())
  const truth = tf.tensor2d([[0,0,1],[1,1,0], [1,0,0],[1,0,0], [1,0,1],[1,0,0], [0,1,0],[1,0,0], [0,1,0]] )
  // const accuracy = tf.metrics.categoricalAccuracy(truth,prediction)
  // accuracy.print()
  // const precision = tf.metrics.precision(truth,pred)
  // precision.print()
  // const recall = tf.metrics.recall(truth, pred);
  // recall.print();
  // const mse = tf.metrics.meanAbsoluteError(truth, prediction);
  // mse.print();
  const auc = tf.metrics.aucAsync(truth, prediction);
  auc.print()

  // return pred;
}

// async function calculateAuc(labels, predictions) {
//   const auc = await tfestimator.metrics.auc(labels, predictions).data();
//   return auc;
// }

loadModel()
// .then(pred => {
//   console.log(pred)
// });