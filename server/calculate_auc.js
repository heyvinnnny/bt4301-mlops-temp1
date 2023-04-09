const tf = require('@tensorflow/tfjs-node');

function calculateAUC(labels, predictions) {
  const numPositive = tf.scalar(tf.sum(labels));
  const numNegative = tf.sub(labels.length, numPositive);

  const sortedIndices = predictions.argSort();
  const sortedLabels = labels.gather(sortedIndices);

  const cumSum = tf.cumsum(sortedLabels);
  const totalPositives = tf.sum(sortedLabels);

  const rank = tf.range(1, sortedLabels.shape[0] + 1);
  const positiveRanks = tf.mul(sortedLabels, rank);
  const positiveRankSum = tf.sum(positiveRanks);

  const auc = tf.sub(positiveRankSum, tf.mul(totalPositives, tf.add(totalPositives, 1).div(2))).div(tf.mul(numPositive, numNegative));

  return auc;
}

const trueLabels = tf.tensor1d([0, 0, 1, 1]);
const predictedProbabilities = tf.tensor1d([0.1, 0.4, 0.35, 0.8]);

const auc = calculateAUC(trueLabels, predictedProbabilities);
auc.print();  // AUC: 0.75