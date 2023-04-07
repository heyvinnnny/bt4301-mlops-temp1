const tf = require("@tensorflow/tfjs-node")

// Creating 2-D tensor of true values
const trueValues = tf.tensor2d([
	[0, 0, 1],
    [1, 0, 0],
    [0, 1, 0]
]);
  
// Creating 2-D tensor of predicted values
const predValues = tf.tensor2d([
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 1]
]);

// Getting the result from the recall function
const recallResult = tf.metrics.recall(predValues, trueValues );
recallResult.print();
const precisionResult = tf.metrics.precision(predValues,trueValues);
precisionResult.print();