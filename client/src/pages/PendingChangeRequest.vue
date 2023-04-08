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
        <div class="col-md-6 col-xl-12">
          <card :title="tableChangeRequest.title">
            <div slot="raw-content" class="table-responsive">
                <paper-table :data="tableChangeRequest.data" :columns="tableChangeRequest.columns" display:flex>
                </paper-table>
                <div style = "position:relative; left:40px; top:2px;">
                    <p> This deployment has pending changes. <br>
                        There are pending changes that need review. <br>
                        See details about the change in the Governance section below.</p>
                </div>
                <!-- <button @click="redirectPendingCR" class="btn btn-primary">Add Review</button>
                <button @click="redirectChallenger" class="btn btn-primary">Dismiss action</button> <br> -->
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
    </div>
</template>

  <script>
  import { StatsCard, ChartCard } from "@/components/index";
  import { PaperTable } from "@/components";
  import { Button } from "@/components";
  import Chartist from "chartist";
  const tableColumns = [
    "Name",
    "Description",
    "Endpoint",
    "Importance",
  ];
  const tableColumnsChangeRequest = [

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
  const tableDataChangeRequest = [
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
      this.$toast.success("Pending Change Request");
    },
    components: {
      StatsCard,
      ChartCard,
      PaperTable,
      Button,
    },
    methods: {
      redirectPendingCR() {
        this.$router.push({
          path: '/pendingCR',
        }) 
      },
      redirectChallenger() {
        this.$router.push({
          path: '/challengers',
        }) 
      },
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
        tableChangeRequest: {
          title: "Pending Change Request",
        //   columns: [...tableColumnsChangeRequest],
        //   data: [...tableDataChangeRequest],
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
      };
    },
  };
  </script>
<style scoped></style>
  