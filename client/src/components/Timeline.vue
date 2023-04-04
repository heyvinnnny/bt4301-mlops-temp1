<template>
  <div>
    <label for="modelSelect">Select Model:</label>
    <select id="modelSelect" v-model="selectedModel" @change="getPerformances">
      <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
    </select>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      models: [],
      selectedModel: null,
      performances: [],
      myChart: null
    }
  },
  mounted() {
    this.getModels();
  },
  methods: {
    getModels() {
      axios.get('http://localhost:3000/api/perftime')
        .then(response => {
          this.models = response.data;
          if (this.models.length > 0) {
            this.selectedModel = this.models[0];
            this.getPerformances();
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    getPerformances() {
      axios.get(`http://localhost:3000/api/perftime/${this.selectedModel}`)
        .then(response => {
          this.performances = response.data;
          this.updateChart();
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateChart() {
      if (this.myChart) {
        this.myChart.destroy();
      }

      var data = {
        labels: this.performances.map(p => p.timestamp),
        datasets: [
          {
            label: "Total Predictions",
            data: this.performances.map(p => p.totalPredictions),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
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
    }
  }
}
</script>

<style></style>
