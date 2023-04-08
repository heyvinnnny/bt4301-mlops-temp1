const tf = require('@tensorflow/tfjs-node');

const generateModel = async function () {
    const model = tf.sequential({
        layers: [
            tf.layers.dense({inputShape: [10], units: 5, activation: 'relu'}),
            tf.layers.dense({units: 3, activation: 'softmax'}),
        ]});
    model.compile({
        optimizer: 'sgd',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });
    return model;
};

function onBatchEnd(batch, logs) {
    console.log('Accuracy', logs.acc);
}

function sortByX(data) {
    return data.sort((a, b) => a.x - b.x);
}

async function calculateAUC(trueLabels, predProbs) {
    // Get predicted probabilities for positive class
    const positiveProbs = predProbs.map((_, i) => predProbs[i][1]);
    const data = trueLabels.map((label, i) => ({x: positiveProbs[i], y: label}));
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

const run = async function () {
    generateModel().then(model => {
        const data = tf.randomNormal([100, 10]);
        const labels = tf.oneHot(tf.argMax(tf.randomUniform([100, 3]), 1), 3).toFloat();
        model.fit(data, labels, {
            epochs: 5,
            batchSize: 32,
            callbacks: {onBatchEnd}
        }).then(info => {
            console.log('Final accuracy', info.history.acc);
        }).then(async () => {
            const testData = tf.randomNormal([100, 10]);
            const testLabels = tf.argMax(tf.randomUniform([100, 3]), 1);
            const predictions = model.predict(testData);
            const predictedLabels = tf.argMax(predictions, 1);

            // Calculate AUC score
            const trueLabels = await testLabels.array();
            const predProbs = await predictions.array();
            const auc = await calculateAUC(trueLabels, predProbs);
            console.log('AUC Score:', auc);
        });
    });
};

run();
