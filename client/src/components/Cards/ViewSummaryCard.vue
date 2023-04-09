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
<!--
    <h1>Deployments</h1>
    <table class="deployment-table">
        <thead>
          <tr>
            <th>Deployment Name</th>
            <th>Deployment Description**</th>
            <th>Environment Version</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deployment in deployments" :key="deployment._id">
            <td>{{ deployment.deploymentName }}</td>
            <td>{{ deployment.envVersion }}</td>
            <td>{{ deployment.envVersion }}</td>
            <td>{{ deployment.importance}}</td>
          </tr>
        </tbody>
      </table>
-->
    </div>
  </template>
  
  
<script>
import axios from 'axios';
import { PaperTable } from "@/components";
  
const tableColumns = [
  "DeploymentName",
  "Description",
  "Endpoint",
  "Importance",
];
const tableData = [
  {
    deploymentname: "this.deployments[0].deploymentId",
    description: "Loan default model for the bank",
    endpoint: "https://datarobot-mlops.dynamic.orm.datarobot.com",
    importance: "Moderate",
  },
];

export default {
    components: {
        PaperTable,
    },
    data() {
        return {
        deployments: [],
        table1: {
            title: "Deployment Summary",
            columns: [...tableColumns],
            data: [...tableData],
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
  