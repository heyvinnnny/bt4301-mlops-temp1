<template>
    <div>
      <!--Stats cards-->
      <div class="row">
        <div
          class="col-md-3 col-xl-6"
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
          subTitle: "Here is a subtitle for this table",
          columns: [...tableColumns],
          data: [...tableData],
        },
      };
    },
  };
  </script>
  
  <style></style>
  