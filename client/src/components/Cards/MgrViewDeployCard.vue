<template>
  <div>
    <h1>Manager Deployments</h1>
    <table class="deployment-table">
      <thead>
        <tr>
          <th>Deployment ID</th>
          <th>Deployment Name</th>
          <th>Importance</th>
          <th>Service Health</th>
          <th>Data Drift</th>
          <th>Accuracy</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deployment in deployments" :key="deployment._id">
          <td>
            <router-link
              :to="{
                name: 'MgrViewDeployDetail',
                params: { id: deployment.deploymentId },
              }"
            >
              {{ deployment.deploymentId }}
            </router-link>
          </td>
          <td>{{ deployment.deploymentName }}</td>
          <td>{{ deployment.importance }}</td>
          <td>
            <span class="dot" style="background-color: #2596be"></span>
          </td>
          <td>
            <span class="dot" style="background-color: #2596be"></span>
          </td>
          <td>
            <span class="dot" style="background-color: #2596be"></span>
          </td>
          <td>{{ deployment.dateNow.slice(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      deployments: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/viewdeploy");
      this.deployments = response.data;
    } catch (error) {
      console.error(
        `Error retrieving deployment information: ${error.message}`
      );
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

.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
