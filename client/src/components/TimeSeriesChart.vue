<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import axios from 'axios';

export default {
  extends: Line,
  props: ['selectedModel'],
  data() {
    return {
      chartData: {
        datasets: [
          {
            label: 'Total Predictions',
            borderColor: '#5C6BC0',
            pointBackgroundColor: '#fff',
            borderWidth: 2,
            pointBorderColor: '#5C6BC0',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#5C6BC0',
            pointHoverBorderColor: '#5C6BC0',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              time: {
                displayFormats: {
                  minute: 'h:mm a'
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                callback: function(value, index, values) {
                  return value.toLocaleString();
                }
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    async fetchPerformanceData() {
      try {
        const response = await axios.get('http://localhost:3000/api/performances/time', {
          params: {
            model: this.selectedModel
          }
        });
        const data = response.data;
        this.chartData.datasets[0].data = data;
        this.renderChart(this.chartData, this.chartOptions);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchPerformanceData();
  }
};
</script>
