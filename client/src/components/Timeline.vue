<template>
  <chart-card
    :title="'Timeline Chart'"
    :subTitle="'Events over Time'"
    :chart-type="'Line'"
    :chart-data="chartData"
    :chart-options="chartOptions"
  >
    <template v-slot:legend>
      <ul>
        <li v-for="legendItem in legendItems" :key="legendItem.label">
          <span :style="{ backgroundColor: legendItem.color }"></span>
          {{ legendItem.label }}
        </li>
      </ul>
    </template>
  </chart-card>
</template>

<script>
import ChartCard from "./Cards/ChartCard.vue";
import Chartist from "chartist";
import moment from 'moment';

export default {
  components: {
    ChartCard,
  },
  data() {
    return {
      chartData: {
        labels: ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01"],
        series: [
          [
            { meta: "Event A", value: 10 },
            { meta: "Event A", value: 20 },
            { meta: "Event B", value: 5 },
            { meta: "Event C", value: 15 },
          ],
        ],
      },
      chartOptions: {
        axisX: {
          type: Chartist.FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc: function (value) {
            return moment(value).format("MMM D, YYYY");
          },
        },
        showPoint: true,
        lineSmooth: false,
      },
      legendItems: [
        { label: "Event A", color: "#5C6BC0" },
        { label: "Event B", color: "#66BB6A" },
        { label: "Event C", color: "#FFA726" },
      ],
    };
  },
};
</script>

<style>
.chart-legend {
  display: flex;
  justify-content: center;
}

.chart-legend ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.chart-legend li {
  align-items: center;
  display: flex;
  margin-right: 20px;
}

.chart-legend li span {
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}
</style>
