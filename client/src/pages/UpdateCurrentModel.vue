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
                <div>
                    <p style="background-color:powderblue;">Replace with: </p> 

                    <p><b>Probability of Default (Risk Management) - ElasticNet</b></p>
                    <p>All features that are used in both the current model and the replacement model match in name and data type</p>
                    <div>
                    </div>
                    <br>
                    <p style="background-color:powderblue;">Replacement Reason: </p>
                    <select v-model="selected">
                      <option disabled value="">Please select one</option>
                      <option>Accuracy</option>
                      <option>Data Drift</option>
                      <option>Errors</option>
                      <option>Refreshed Schedules</option>
                      <option>Scoring Speed</option>
                      <option>Other</option>
                    </select>
                    <br>
                    <br>
                    <p style="background-color:powderblue;">Manually Apply changes?</p>
                    <input type="radio" id="one" value="One" v-model="picked">
                    <label for="one">Notify me when the change is approved so I can manually apply it</label>
                    <br>
                    <input type="radio" id="two" value="Two" v-model="picked">
                    <label for="two">Apply the change upon approval</label>
                    <br>

                </div>
                <button @click="redirectPendingCR" class="btn btn-primary">Accept and Replace</button>
                <button @click="redirectChallenger" class="btn btn-primary">Cancel</button> <br> 
            </div>
          </card>
        </div>
      </div>
      <br />
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
    "Custom Model",
    "Custom Environment",
    "Build Environment",
    "Target Type",
  ];
  const tableColumns3 = [
    "Model Replaced",
    "Waiting for Review",
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
      custommodel: "Probability of Default (Risk management) - Random Forest 2020",
      customenvironment: "Python 3 Scikit-Learn Drop-In (v4)",
      buildenvironment: "Python",
      targettype: "binary",
    },
  ];
  const tableData3 = [
    {
      modelreplaced: "August 19 2020",
      waitingforreview: "yes",
    },
  ];
  
  export default {
    mounted() {
      this.$toast.success("Update Challengers model");
    },
    components: {
      StatsCard,
      ChartCard,
      PaperTable,
      Button,
    },
    data() {
    selected: ''
    },
    methods: {
      redirectPendingCR() {
        this.$router.push({
          path: '/pendingChangeRequest',
        }) 
      },
      redirectChallenger() {
        this.$router.push({
          path: '/challengers',
        }) 
      },
      async fetchPerformanceData() {
        try {
          const response = await axios.get('http://localhost:3000/api/Deployment', {
            params: {
              deployment_id: this.selectedDeployment,
            },
          });
          const data = response.data;

          // Initialize an empty object to store aggregated values
          const aggregatedData = {
            deployment_name: "",
            importance: "",
            service: 0,
            drift: 0,
            accuracy: 0,
            num_predictions: 0,
            created_at: "",
            date_now: "",
            last_prediction: "",
            manager_email: "",
            manager_name: "",
            user_email: "",
            user_name: "",
            model_version: "",
            environment_version: "",
            deployment_status: "",
            testing_status: "",
            deployed: false,
            approval_status: "",
            replacement_reason: "",
            manually_apply_changes: true
          };

          // Iterate over the returned data and aggregate the values
          data.forEach(metric => {
            aggregatedData.totalPredictions += metric.totalPredictions;
            aggregatedData.totalRequests += metric.totalRequests;
            aggregatedData.requestOverMs += metric.requestOverMs;
            aggregatedData.responseTime += metric.responseTime;
            aggregatedData.executionTime += metric.executionTime;
            aggregatedData.medianPeakLoad += metric.medianPeakLoad;
            aggregatedData.dataErrorRate += metric.dataErrorRate;
            aggregatedData.systemErrorRate += metric.systemErrorRate;
            aggregatedData.consumers += metric.consumers;
            aggregatedData.cacheHitRate += metric.cacheHitRate;
          });

          // Update the boxes array with the aggregated values
          this.boxes = [
            { id: 1, title: 'Total Predictions', value: aggregatedData.totalPredictions },
            { id: 2, title: 'Total Requests', value: aggregatedData.totalRequests },
            { id: 3, title: 'Request Over Ms', value: aggregatedData.requestOverMs },
            { id: 4, title: 'Response Time', value: aggregatedData.responseTime },
            { id: 5, title: 'Execution Time', value: aggregatedData.executionTime },
            { id: 6, title: 'Median Peak Load', value: aggregatedData.medianPeakLoad },
            { id: 7, title: 'Data Error Rate', value: aggregatedData.dataErrorRate.toFixed(2) },
            { id: 8, title: 'System Error Rate', value: aggregatedData.systemErrorRate.toFixed(2) },
            { id: 9, title: 'Consumers', value: aggregatedData.consumers },
            { id: 10, title: 'Cache Hit Rate', value: aggregatedData.cacheHitRate.toFixed(2) },
          ];

        } catch (err) {
          console.error(err);
        }
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
          title: "Submit Change Request",
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
          columns: [...tableColumns2],
          data: [...tableData2],
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
  