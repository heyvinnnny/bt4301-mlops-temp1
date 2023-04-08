<template>
    <div>
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
                    <p class="question-wrapper">Replace with: </p> 
                    <div class="home-wrapper">
                      <p><b>Probability of Default (Risk Management) - ElasticNet</b></p>
                      <p>All features that are used in both the current model and the replacement model match in name and data type</p>
                    </div>
                    <p class="question-wrapper">Replacement Reason: </p>
                    <div class="home-wrapper">
                      <p>Select a reason for replacement:</p>
                      <select v-model="selectedReason">
                        <option v-for="reason in reasons" :key="reason.id" :value="reason.value">{{ reason.text }}</option>
                      </select>
                      <br>
                      <br>
                    </div>
                    <p class="question-wrapper">Manually Apply changes?</p>
                      <div class="home-wrapper">
                      <input type="radio" id="one" value="One" v-model="picked">
                      <label for="one">Notify me when the change is approved so I can manually apply it</label>
                      <br>
                      <input type="radio" id="two" value="Two" v-model="picked">
                      <label for="two">Apply the change upon approval</label>
                      <br>
                    </div>

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
    "DeploymentName",
    "Description",
    "Endpoint",
    "Importance",
  ];
  const tableColumnsChangeRequest = [

  ];
  const tableData = [
    {
      deploymentname: "Loan Default Predictor (Risk Management)",
      description: "Loan default model for the bank",
      endpoint: "https://datarobot-mlops.dynamic.orm.datarobot.com",
      importance: "Moderate",
    },
  ];
  const tableDataChangeRequest = [
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
      return {
        selectedReason: 'Accuracy',
        reasons: [
          { id: 1, text: 'Accuracy', value: 'Accuracy' },
          { id: 2, text: 'Data Drift', value: 'Data Drift' },
          { id: 3, text: 'Errors', value: 'Errors' },
          { id: 4, text: 'Refreshed Schedules', value: 'Refreshed Schedules' },
          { id: 5, text: 'Scoring Speed', value: 'Scoring Speed' },
          { id: 6, text: 'Other', value: 'Other' },
        ],
        table1: {
          title: "Deployment Summary",
          columns: [...tableColumns],
          data: [...tableData],
        },
        tableChangeRequest: {
          title: "Submit Change Request",
        //   columns: [...tableColumnsChangeRequest],
        //   data: [...tableDataChangeRequest],
        },   
      };
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
    },
  };
  </script>
<style scoped>
.home-wrapper {
  padding: 20px; /* Adjust the padding value as needed */
}
.question-wrapper {
  background-color:powderblue;
  text-indent: 0.5cm;
}
</style> 
  