<template>
  <div class="container">
    <h1>Service Health</h1>
    <h3>Track this deployment's latency, throughput, and error rate.</h3>

    <div class="controls">
      <h6 style="margin-top:7px">Model: </h6>
      <select v-model="selectedModel">
        <option v-for="model in models" :key="model.id" :value="model.value">{{ model.text }}</option>
      </select>

      <h6 style="margin-top:7px">Resolution: </h6>
      <select v-model="selectedResolution">
        <option v-for="resolution in resolutions" :key="resolution.id" :value="resolution.value">{{ resolution.text }}</option>
      </select>


      <button icon="ti-bell" @click="refreshData">
        Refresh
      </button>

      <button icon="ti-bell" @click="resetData">
        Reset
      </button>
    </div>

    <timeline v-model="timelineValue" />

    <div class="row">
    <div class="col-md-2-4" v-for="box in boxes" :key="box.id">
      <div class="box" style="height:150px">
        <template v-if="box.id === 4 || box.id === 5">
          <select v-model="box.statistic">
            <option value="Median">Median</option>
            <option value="Mode">Mode</option>
            <option value="Mean">Mean</option>
          </select>
          <span style="font-weight:bold; text-align:center;">{{ box.statistic }}{{ box.title }}</span>
        </template>
        <template v-else>
          <h5 style="font-weight:bold; text-align:center;">{{ box.title }}</h5>
        </template>
        <p style="font-size:x-large">{{ box.value }}</p>
      </div>
    </div>
  </div>

    <!-- <time-series-chart :chart-data="timeSeriesChartData" :options="chartOptions" /> -->

    <div class="row">
        <div class="col-12">
        <chart-card
          title="Loan Default Predictor (Risk Management)"
          sub-title="DataRobot Prediction Server | Probability of Default"
          :chart-data="usersChart.data"
          :chart-options="usersChart.options"
        >
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>
      </div>
  </div>
</template>

<script>
import { ChartCard } from "@/components/index";
import { TimeSeriesChart }  from "@/components/index";
import { Timeline }  from "@/components/index";

import Chartist from "chartist";

export default {
  mounted() {
    this.$toast.success("Performance Monitor");
  },
  components: {
    Timeline,
    TimeSeriesChart,
    ChartCard,
  },
  data() {
    return {
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM",
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410],
          ],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      selectedModel: "",
      models: [
        { text: "Model 1", value: "model1", id: 1 },
        { text: "Model 2", value: "model2", id: 2 },
      ],
      selectedResolution: "",
      resolutions: [
        { text: "Monthly", value: "monthly", id: 1 },
        { text: "Quarterly", value: "quarterly", id: 2 },
        { text: "Yearly", value: "yearly", id: 3 },
      ],
      boxes: [
      { id: 1, title: "Total Predictions", value: 12345 },
      { id: 2, title: "Total Requests", value: 4567 },
      { id: 3, title: "Request over ms", value: 123 },
      { id: 4, title: " Response Time (ms)", statistic: "Median", value: 250 },
      { id: 5, title: " Execution Time (ms)", statistic: "Median", value: 200 },
      { id: 6, title: "Median Peak Load (calls/minute)", value: 3500 },
      { id: 7, title: "Data Error Rate", value: 1.5 },
      { id: 8, title: "System Error Rate", value: 0.8 },
      { id: 9, title: "Consumers", value: 120 },
      { id: 10, title: "Cache Hit Rate", value: 75.3 },
      ],
      timelineValue: [],
      timeSeriesChartData: {
        labels: [
          "2019-08-05",
          "2019-08-12",
          "2019-08-19",
          "2019-08-26",
          "2019-09-02",
        ],
        datasets: [
          {
            label: "Total Predictions",
            data: [1200, 1850, 2500, 3200, 4100],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
            lineTension: 0,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    refreshData() {
      console.log("Refreshing data...");
    },
    resetData() {
      console.log("Resetting data...");
    },
  },
};
</script>

<style scoped>
/* Add styles for your components here */
.container {
  font-family: "Arial", sans-serif;
}

.controls {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.controls > * {
  margin-right: 0.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}

.col-md-2 {
  flex: 0 0 auto;
  width: calc(100% / 5);
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
}

.col-md-2-4 {
  flex: 0 0 20%;
  max-width: 20%;
}

.box {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  height: 100%;
}

.box h5,
.box select {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
  height: 2rem;
  display: flex;
  align-items: center;
}

.box p {
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  justify-content: center;
}
</style>