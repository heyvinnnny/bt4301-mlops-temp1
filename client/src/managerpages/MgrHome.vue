<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-4"
        v-for="stats in statsCards"
        :key="stats.title"
      >
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

    <div class="row">
      <!--Charts-->
      <div class="col-md-4 mb-4" v-for="chart in chartCards" :key="chart.title">
        <chart-card
          :title="chart.title"
          :chart-data="chart.chartData"
          :chart-type="chart.chartType"
          class="h-100"
        >
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Passing
            <i class="fa fa-circle text-danger"></i> Risk
            <i class="fa fa-circle text-warning"></i> Failing
          </div>
        </chart-card>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <mgr-view-deploy-card></mgr-view-deploy-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import { PaperTable } from "@/components";
import ViewDeployCard from "../components/Cards/ViewDeployCard.vue";
import MgrViewDeployCard from "../components/Cards/MgrViewDeployCard.vue";
import axios from "axios";

const tableColumns = [
  "Id",
  "Name",
  "Importance",
  "Predictions",
  "Last Prediction",
];
const tableData = [
  {
    id: 1,
    name: "Employee Churn",
    importance: "High",
    predictions: "208k",
    lastPrediction: "a few seconds ago",
  },
  {
    id: 2,
    name: "Sales Cycle Length",
    importance: "Critical",
    predictions: "102k",
    lastPrediction: "a few seconds ago",
  },
  {
    id: 3,
    name: "User Success",
    importance: "Moderate",
    predictions: "8k",
    lastPrediction: "a few seconds ago",
  },
];

export default {
  mounted() {
    this.$toast.success("Welcome to DataPower");
  },
  components: {
    StatsCard,
    ChartCard,
    // eslint-disable-next-line vue/no-unused-components
    PaperTable,
    // eslint-disable-next-line vue/no-unused-components
    ViewDeployCard,
    MgrViewDeployCard,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      chartCards: [
        {
          title: "Service Health Summary",
          chartType: "Pie",
          chartData: {
            labels: [],
            series: [],
          },
        },
        {
          title: "Data Drift Summary",
          chartType: "Pie",
          chartData: {
            labels: [],
            series: [],
          },
        },
        {
          title: "Accuracy Summary",
          chartType: "Pie",
          chartData: {
            labels: [],
            series: [],
          },
        },
      ],
      table1: {
        title: "Deployments",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData],
      },
      deployments: [],
    };
  },
  async created() {
    try {
      // Get the user object from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      // Get the logged-in user's ID from the user object
      const userId = user.id;

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Set up the headers for the request, including the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:3000/deployments/assigned/${userId}`,
        config
      );
      this.deployments = response.data;
      const activeDeploymentsCount = this.deployments.length;
      this.statsCards[0].value = activeDeploymentsCount;

      if (activeDeploymentsCount > 0) {
        this.chartCards[0].chartData.labels = ["100%"];
        this.chartCards[0].chartData.series = [1];
        this.chartCards[1].chartData.labels = ["100%"];
        this.chartCards[1].chartData.series = [1];
        this.chartCards[2].chartData.labels = ["100%"];
        this.chartCards[2].chartData.series = [1];
        this.statsCards[1].value = "3029";
      }
    } catch (error) {
      console.error(
        `Error retrieving deployment information: ${error.message}`
      );
    }
  },
  computed: {
    statsCards() {
      return [
        {
          type: "warning",
          icon: "ti-server",
          title: "Active Deployments",
          value: this.deployments.length,
        },
        {
          type: "success",
          icon: "ti-calendar",
          title: "Predictions",
          value: "0",
        },
      ];
    },
  },
};
</script>

<style></style>
