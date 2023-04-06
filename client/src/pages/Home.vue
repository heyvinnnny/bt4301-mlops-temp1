<template>
  <div class="home-wrapper">
    <!--Stats cards-->
    <div class="row">
      <div class="col">
        <div v-for="stats in statsCards" :key="stats.title">
          <stats-card>
            <div
              class="icon-big text-center"
              :class="`icon-${stats.type}`"
              slot="header"
            >
              <i :class="stats.icon"></i>
            </div>
            <div class="numbers" slot="content">
              <p>{{ stats.title }}</p>
              {{ stats.value }}
            </div>
          </stats-card>
        </div>
      </div>

      <br />
      <!-- <div class="row"> -->
      <!--Charts-->
      <div v-for="chart in chartCards" :key="chart.title" class="col">
        <chart-card
          :title="chart.title"
          :chart-data="chart.chartData"
          :chart-type="chart.chartType"
          :chart-options="chart.chartOptions"
          class="h-70"
        >
          <div slot="legend">
            <i class="fa fa-circle text-success"></i> Passing
            <i class="fa fa-circle text-danger"></i> Risk
            <i class="fa fa-circle text-warning"></i> Failing
          </div>
        </chart-card>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table
              :data="deployments"
              :columns="formattedColumns"
              @row-click="handleTableRowClick"
            >
            </paper-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import { PaperTable } from "@/components";

import Chartist from "chartist";
import axios from "axios";

const mongoose = require("mongoose");

const tableColumns = [
  "deployment_id",
  "deployment_name",
  "importance",
  "service",
  "drift",
  "accuracy",
  "deployment_status",
];

export default {
  components: {
    StatsCard,
    ChartCard,
    PaperTable,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Active Deployments",
          value: "72",
        },
        {
          type: "success",
          icon: "ti-calendar",
          title: "Predictions",
          value: "1,345",
        },
      ],
      chartCards: [
        {
          title: "Service Health Summary",
          chartType: "Pie",
          chartData: {
            labels: ["62%", "32%", "6%"],
            series: [62, 32, 6],
          },
        },
        {
          title: "Data Drift Summary",
          chartType: "Pie",
          chartData: {
            labels: ["62%", "32%", "6%"],
            series: [62, 32, 6],
          },
        },
        {
          title: "Accuracy Summary",
          chartType: "Pie",
          chartData: {
            labels: ["62%", "32%", "6%"],
            series: [62, 32, 6],
          },
        },
      ],
      table1: {
        title: "Deployments",
        subTitle: "Click on the Deployment for more details.",
        columns: [...tableColumns],
      },
      deployments: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/deployments");
      this.deployments = response.data;
    } catch (error) {
      console.error(error);
      alert("Error fetching data from the API: " + error.message);
    }
  },
  methods: {
    handleTableRowClick(item) {
      console.log("Clicked row:", item);
      this.$router.push({ path: "/dashboard" });
    },
  },
  computed: {
    formattedColumns() {
      const columnHeaders = {
        deployment_id: "ID",
        deployment_name: "Name",
        importance: "Importance",
        service: "Service",
        drift: "Drift",
        accuracy: "Accuracy",
        deployment_status: "Deployment Status",
      };
      return Object.keys(columnHeaders).map((key) => ({
        key,
        header: columnHeaders[key],
      }));
    },
  },
};
</script>

<style scoped>
.home-wrapper {
  padding: 20px; /* Adjust the padding value as needed */
}
</style>
