<template>
    <div>
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

<!--      <h1>Deployments</h1>
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
      </table> -->
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import { PaperTable } from "@/components";
  
  export default {
    components: {
      PaperTable,
    },
    data() {
      return {
        deployments: [],
        tableChangeRequest: {
          title: "Pending Change Request",
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
  