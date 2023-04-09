const tf = require('@tensorflow/tfjs-node');
const fs = require('fs')

async function calculateMetrics (model, jsonData) {
  // const model = await tf.loadLayersModel('file://mlModel/model.json');
  // const jsonData = JSON.parse(fs.readFileSync('./mlModel/test.json'));
  const input = tf.tensor2d(jsonData.map(({input}) => input));
  const truth = tf.tensor(jsonData.map(({output}) => output));
  // input.print()
  // truth.print()
  const pred = model.predict(input)
  // pred.print()
  const true_label = await truth.array()
  const predProbs = await pred.array()
  const auc = await calculateAUC(true_label,predProbs)
  const gini = await calculateGini(true_label,predProbs)
  const logloss = await calculateLogLoss(true_label,predProbs)
  const ks = await calculateKS(true_label,predProbs)
  const psi = await calculatePSI(true_label,predProbs)
  // console.log(auc)
  // console.log(gini)
  // console.log(ks)
  // console.log(logloss)
  // console.log(psi)
  return [auc, gini,logloss, ks, psi]
}


async function calculateLogLoss(trueLabels, predProbs) {
    let logLoss = 0;
    for (let i = 0; i < trueLabels.length; i++) {
        const label = trueLabels[i];
        const prob = predProbs[i][label];
        logLoss += -Math.log(prob);
    }
    logLoss /= trueLabels.length;
    return logLoss;
}

function sortByX(data) {
    return data.sort((a, b) => a.x - b.x);
}

// Define a function to calculate AUC
async function calculateAUC(trueLabels, predProbs) {
    // Get predicted probabilities for positive class
    const positiveProbs = predProbs.map((_, i) => predProbs[i][1]);
    // console.log(positiveProbs)
    // console.log(trueLabels)
    const data = trueLabels.map((label, i) => ({x: positiveProbs[i], y: label}));
    // console.log(data)
    const sortedData = sortByX(data);

    // Compute area under the ROC curve using Simpson's rule
    let auc = 0;
    for (let i = 1; i < sortedData.length; i++) {
        const dx = sortedData[i].x - sortedData[i - 1].x;
        const y1 = sortedData[i - 1].y;
        const y2 = sortedData[i].y;
        auc += dx * (y1 + y2) / 2;
    }
    return auc;
}

// Define a function to calculate Gini norm
async function calculateGini(trueLabels, predProbs) {
  const auc = await calculateAUC(trueLabels, predProbs);
  const gini = 2 * Math.abs(auc - 0.5);
  return gini;
}

// Define a function to calculate KS 
async function calculateKS(trueLabels, predProbs) {
  // Get predicted probabilities for positive class
  const positiveProbs = predProbs.map((_, i) => predProbs[i][1]);
  const data = trueLabels.map((label, i) => ({ x: positiveProbs[i], y: label }));
  const sortedData = sortByX(data);

  // Compute KS score
  let ks = 0;
  let cumPos = 0;
  let cumNeg = 0;
  const totalPos = sortedData.filter(d => d.y === 1).length;
  const totalNeg = sortedData.filter(d => d.y === 0).length;
  
  for (let i = 0; i < sortedData.length; i++) {
    const y = sortedData[i].y;
    if (y === 1) {
      cumPos += 1;
    } else {
      cumNeg += 1;
    }
    const diff = Math.abs(cumPos / totalPos - cumNeg / totalNeg);
    if (diff > ks) {
      ks = diff;
    }
  }
  return ks;
}

// Define a function to calculate PSI
async function calculatePSI(expected, actual, numBins = 10) {
  const binSize = 1 / numBins;
  let psi = 0;

  for (let i = 0; i < numBins; i++) {
    const lowerBound = i * binSize;
    const upperBound = (i + 1) * binSize;

    const expectedCount = expected.filter(p => p >= lowerBound && p < upperBound).length;
    const actualCount = actual.filter(p => p >= lowerBound && p < upperBound).length;

    const expectedRatio = expectedCount / expected.length;
    const actualRatio = actualCount / actual.length;

    if (expectedRatio > 0 && actualRatio > 0) {
      const psiSegment = (expectedRatio - actualRatio) * Math.log(expectedRatio / actualRatio);
      psi += psiSegment;
    }
  }

  return psi;
}

module.exports = calculateMetrics;