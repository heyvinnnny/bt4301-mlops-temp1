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

    
    <view-summary-card></view-summary-card>
    <div class="row">
      <view-content-card-vue></view-content-card-vue>
      <activity-log-card></activity-log-card>
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
import ViewSummaryCard from "../components/Cards/ViewSummaryCard.vue";
import ViewContentCardVue from '../components/Cards/ViewContentCard.vue';
import ActivityLogCard from "../components/Cards/ActivityLogCard.vue";

export default {
  mounted() {
    this.$toast.success("Overview");
  },
  components: {
    StatsCard,
    ChartCard,
    PaperTable,
    ViewSummaryCard,
    ViewContentCardVue,
    ActivityLogCard,
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