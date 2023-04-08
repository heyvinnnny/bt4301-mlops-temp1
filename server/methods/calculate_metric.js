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
