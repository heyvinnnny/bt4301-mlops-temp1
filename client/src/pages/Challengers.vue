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
        <card :title="tableDeployment.title">
          <div slot="raw-content" class="table-responsive">

            <a href="#" class="btn-link bold" @click="redirectAddChallenger">+ Add Challenger Model</a>
            <paper-table :data="tableDeployment.data" :columns="tableDeployment.columns" display:flex>
            </paper-table>
            <div>
              <button @click="redirectUpdateChallenger" class="btn btn-primary">Update Challenger Model</button>
            </div>
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
  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import { PaperTable } from "@/components";
import Chartist from "chartist";
const tableColumns = [
  "DeploymentName",
  "Description",
  "Endpoint",
  "Importance",
];
const tableColumnsDeployment = [
  "DisplayName",
  "Model",
  "TrainingData",
  "Action"
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
    deploymentname: "Loan Default Predictor (Risk Management)",
    description: "Loan default model for the bank",
    endpoint: "https://datarobot-mlops.dynamic.orm.datarobot.com",
    importance: "Moderate",
  },
];
const tableDataDeployment = [
  {
    displayname: "Loan Default Model (CHAMPION)",
    model: "Probability of Default (Risk Management) - Random Forest 2020",
    trainingdata: "5K_Lending_Club_Loans_",
    action: "",
  },
  {
    displayname: "Loan Default Model (Prod)",
    model: "Probability of Default (Risk Management) - ElasticNet",
    trainingdata: "5K_Lending_Club_Loans_",
    action: "replace",
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
    this.$toast.success("Challengers");
  },
  components: {
    StatsCard,
    ChartCard,
    PaperTable,
  },
  methods: {
    redirectAddChallenger() {
      this.$router.push({
        path: '/version-control',
      }) 
    },
    redirectUpdateChallenger() {
      this.$router.push({
        path: '/updateCurrentModel',
      }) 
    },
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      table1: {
        title: "Deployment Summary",
        columns: [...tableColumns],
        data: [...tableData],
      },
      tableDeployment: {
        title: "Challenger",
        columns: [...tableColumnsDeployment],
        data: [...tableDataDeployment],
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
    };
  },
};
</script>
<style></style>
