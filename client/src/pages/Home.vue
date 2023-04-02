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
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table
              :data="table1.data"
              :columns="table1.columns"
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
        data: [...tableData],
      },
    };
  },
  methods: {
    handleTableRowClick(item) {
      console.log("Clicked row:", item);
      this.$router.push({ path: "/dashboard" });
    },
  },
};
</script>

<style></style>
