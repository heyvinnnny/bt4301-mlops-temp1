<template>
  <div class="container">
    <h1>Service Health</h1>
    <h3>Track this deployment's latency, throughput, and error rate.</h3>

    <div class="controls">
      <h6 style="margin-top:7px">Model: </h6>
      <select v-model="selectedModel">
        <option v-for="model in models" :key="model.id" :value="model.value">{{ model.text }}</option>
      </select>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="box in boxes" :key="box.id">
        <div class="box">
          <h5>{{ box.title }}</h5>
          <p>{{ box.value }}</p>
        </div>
      </div>
    </div>

    <br>
    <br>
    <timeline></timeline>



  </div>
</template>

<script>
import axios from 'axios';
import { ChartCard } from "@/components/index";
import TimeSeriesChart from "../components/TimeSeriesChart.vue";
import Timeline from "../components/Timeline.vue";
import Chartist from "chartist";

export default {
  mounted() {
    this.$toast.success("Performance Monitor");
  },
  components: {
    ChartCard,
    TimeSeriesChart,
    Timeline
    
  },
  created() {
    
    this.fetchPerformanceData();
    const token = localStorage.getItem('token');  

    // Include the token in the Authorization header
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  },
  data() {
    return {
      selectedModel: 'Model 1',
      models: [
        { id: 1, text: 'Model 1', value: 'Model 1' },
        { id: 2, text: 'Model 2', value: 'Model 2' },
        { id: 3, text: 'Model 3', value: 'Model 3' },
      ],
      boxes: [],
      
    };

  },
  methods: {
  async fetchPerformanceData() {
    try {
      const response = await axios.get('http://localhost:3000/api/performances', {
        params: {
          model: this.selectedModel,
        },
      });
      const data = response.data;

      // Initialize an empty object to store aggregated values
      const aggregatedData = {
        totalPredictions: 0,
        totalRequests: 0,
        requestOverMs: 0,
        responseTime: 0,
        executionTime: 0,
        //medianPeakLoad: 0,
        dataErrorRate: 0,
        systemErrorRate: 0,
        consumers: 0,
        cacheHitRate: 0,
      };

      // Iterate over the returned data and aggregate the values
      data.forEach(metric => {
        aggregatedData.totalPredictions += metric.totalPredictions;
        aggregatedData.totalRequests += metric.totalRequests;
        aggregatedData.requestOverMs += metric.requestOverMs;
        aggregatedData.responseTime += metric.responseTime;
        aggregatedData.executionTime += metric.executionTime;
        //aggregatedData.medianPeakLoad += metric.medianPeakLoad;
        aggregatedData.dataErrorRate += metric.dataErrorRate;
        aggregatedData.systemErrorRate += metric.systemErrorRate;
        aggregatedData.consumers += metric.consumers;
        aggregatedData.cacheHitRate += metric.cacheHitRate;
      });

      const dataLength = data.length;
      aggregatedData.requestOverMs /= dataLength;
      aggregatedData.responseTime /= dataLength;
      aggregatedData.executionTime /= dataLength;
      //aggregatedData.medianPeakLoad /= dataLength;
      aggregatedData.dataErrorRate = (aggregatedData.dataErrorRate / dataLength);
      aggregatedData.systemErrorRate = (aggregatedData.systemErrorRate / dataLength);
      aggregatedData.consumers /= dataLength;
      aggregatedData.cacheHitRate = (aggregatedData.cacheHitRate / dataLength);

      // Update the boxes array with the aggregated values
      this.boxes = [
        { id: 1, title: 'Total Predictions', value: aggregatedData.totalPredictions },
        { id: 2, title: 'Total Requests', value: aggregatedData.totalRequests },
        { id: 3, title: 'Request Over Ms', value: aggregatedData.requestOverMs },
        { id: 4, title: 'Response Time', value: aggregatedData.responseTime },
        { id: 5, title: 'Execution Time', value: aggregatedData.executionTime },
        //{ id: 6, title: 'Median Peak Load', value: aggregatedData.medianPeakLoad },
        { id: 7, title: 'Data Error Rate', value: aggregatedData.dataErrorRate.toFixed(2) + '%' },
        { id: 8, title: 'System Error Rate', value: aggregatedData.systemErrorRate.toFixed(2) + '%' },
        { id: 9, title: 'Consumers', value: aggregatedData.consumers.toFixed(2)  },
        { id: 10, title: 'Cache Hit Rate', value: aggregatedData.cacheHitRate.toFixed(2) + '%' },
      ];

    } catch (err) {
      console.error(err);
    }
  },
},

  
  watch: {
    selectedModel() {
      this.fetchPerformanceData();
    },
  },
};
</script>

<style scoped>
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

.controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.controls h6 {
  margin-top: 7px;
  margin-right: 10px;
}

.controls select {
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: #333333;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.3s ease;
}

.controls select:hover {
  border-color: #999999;
}

.controls select:focus {
  border-color: #007bff;
}
</style>