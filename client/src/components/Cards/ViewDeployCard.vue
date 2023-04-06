<template>
    <div>
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
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        deployments: [],
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
  