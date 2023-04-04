<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-6"
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
      <div class="col-md-6 col-xl-12">
        <card :title="table1.title">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns" display:flex>
            </paper-table>
          </div>
        </card>
      </div>
    </div>
    <br />
    
    <div class="row">
      <div class="col-md-6 col-xl-6">
        <card :title="table2.title">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table2.data" :columns="table2.columns" display:flex>
            </paper-table>
          </div>
        </card>
      </div>
      <div class="col-md-6 col-xl-6">
        <card :title="table3.title">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table3.data" :columns="table3.columns" display:flex>
            </paper-table>
          </div>
        </card>
      </div>
    </div>
    <br/>

    <!--Charts-->
    <div class="row">
      <div class="col-md-6 col-xl-12">
        <chart-card
          title="Loan Default Predictor (Risk Management)"
          sub-title="DataRobot Prediction Server | Probability of Default"
          :chart-data="usersChart.data"
          :chart-options="usersChart.options"
        >
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
  "Name",
  "Description",
  "Endpoint",
  "Importance",
];
const tableColumns2 = [
  "Model",
  "Environment",
  "TargetType",
];
const tableColumns3 = [
  "ReplacementDate",
  "Review",
];
const tableData = [
  {
    name: "Loan Default Predictor (Risk Management)",
    description: "Loan default model for the bank",
    endpoint: "https://datarobot-mlops.dynamic.orm.datarobot.com",
    importance: "Moderate",
  },
];
const tableData2 = [
  {
    model: "Probability of Default (Risk management) - Random Forest 2020",
    environment: "Python 3 Scikit-Learn Drop-In (v4)",
    targettype: "Binary",
  },
];
const tableData3 = [
  {
    replacementdate: "19 August 2020",
    review: "Waiting to be reviewed",
  },
];

export default {
  mounted() {
    this.$toast.success("Overview");
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
      table1: {
        title: "Summary",
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        title: "Content",
        columns: [...tableColumns2],
        data: [...tableData2],
      },
      table3: {
        title: "Governance",
        columns: [...tableColumns3],
        data: [...tableData3],
      },
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Avg Predictions / Day",
          value: "1800",
        },
        {
          type: "warning",
          icon: "ti-pulse",
          title: "Last Prediction",
          value: "5 hours ago",
        },
      ],
      usersChart: {
        data: {
          labels: [
            "12:00AM",
            "3:00AM",
            "6:00AM",
            "9:00AM",
            "12:00PM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
          ],
          series: [
            [1, 0, 1, 1, 1, 0, 0, 1],
            // [67, 152, 193, 240, 387, 435, 535, 642, 744],
            // [23, 113, 67, 108, 190, 239, 307, 410, 410],
          ],
        },
        options: {
          low: 0,
          high: 1,
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
    };
  },
};
</script>
<style></style>