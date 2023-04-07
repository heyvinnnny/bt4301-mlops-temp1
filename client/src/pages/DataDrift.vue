<template>
  <card title="Drift Monitoring">
    <div>
      <select id="metricSelect">
        <option value="0">AUC</option>
        <option value="1">Gini Norm</option>
        <option value="2">LogLoss</option>
        <option value="3">Kolmogorov-Smirnov</option>
        <option value="4">Population Stability Index</option>
      </select>
      <canvas id="myChart"></canvas>
    </div>
  </card>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    this.$toast.success("Data Drift");

    var data = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "AUC",
          data: [0.8, 0.85, 0.9, 0.95],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: "Gini Norm",
          data: [0.7, 0.75, 0.8, 0.85],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: "LogLoss",
          data: [0.6, 0.65, 0.7, 0.75],
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        },
        {
          label: "Kolmogorov-Smirnov",
          data: [0.5, 0.55, 0.6, 0.65],
          fill: false,
          borderColor: 'rgb(255, 205, 86)',
          tension: 0.1
        },
        {
          label: "Population Stability Index",
          data: [0.4, 0.45, 0.5, 0.55],
          fill: false,
          borderColor: 'rgb(153, 102, 255)',
          tension: 0.1
        }
      ]
    };

    var ctx = document.getElementById('myChart').getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    document.getElementById('metricSelect').addEventListener('change', (event) => {
      var selectedMetric = event.target.value;
      for (var i = 0; i < data.datasets.length; i++) {
        if (i == selectedMetric) {
          this.myChart.getDatasetMeta(i).hidden = false;
        } else {
          this.myChart.getDatasetMeta(i).hidden = true;
        }
      }
      this.myChart.update();
    });
    
    // Hide all datasets except the first one by default
    for (var i = 1; i < data.datasets.length; i++) {
      this.myChart.getDatasetMeta(i).hidden = true;
    }
    this.myChart.update();
    
  }
}
</script>

<style></style>
