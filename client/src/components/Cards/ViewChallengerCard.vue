<template>
    <div>
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
      <!--
      <h1>Deployments</h1>
      <table class="deployment-table">
        <thead>
          <tr>
            <th>Deployment ID</th>
            <th>Deployment Name</th>
            <th>Importance</th>
            <th>Date Now</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deployment in deployments" :key="deployment._id">
            <td>
              <router-link :to="{ name: 'ViewDeployDetail', params: { id: deployment.deploymentId } }">
                {{ deployment.deploymentId }}
              </router-link>
            </td>
            <td>{{ deployment.deploymentName }}</td>
            <td>{{ deployment.importance }}</td>
            <td>{{ deployment.dateNow }}</td>
          </tr>
        </tbody>
      </table>
    -->
    </div>
  </template>
  
  
<script>
import axios from 'axios';
import { PaperTable } from "@/components";

const tableColumnsDeployment = [
  "DisplayName",
  "Model",
  "TrainingData",
  "Action"
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
  
  export default {
    components: {
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
    data() {
      return {
        deployments: [],
        tableDeployment: {
          title: "Challenger",
          columns: [...tableColumnsDeployment],
          data: [...tableDataDeployment],
        },
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/viewdeploy');
        this.deployments = response.data;
      } catch (error) {
        console.error(`Error retrieving deployment information: ${error.message}`);
      }
    },
  };
  </script>

<style scoped>
.deployment-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.deployment-table th,
.deployment-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.deployment-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.deployment-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.deployment-table tbody tr:hover {
  background-color: #ddd;
}

.deployment-table tbody tr td a {
  color: #007bff;
  text-decoration: none;
}

.deployment-table tbody tr td a:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
  