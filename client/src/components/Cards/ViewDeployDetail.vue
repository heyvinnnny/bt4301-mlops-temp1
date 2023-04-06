<template>
    <div>
      <h1>Deployment Details</h1>
      <table class="deployment-details-table">
        <thead>
          <tr>
            <th>Deployment ID</th>
            <th>Deployment Name</th>
            <th>Importance</th>
            <th>Date Now</th>
            <th>Model Version</th>
            <th>Environment Version</th>
            <th>Replacement Reason</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ deployment.deploymentId }}</td>
            <td>{{ deployment.deploymentName }}</td>
            <td>{{ deployment.importance }}</td>
            <td>{{ deployment.dateNow }}</td>
            <td>{{ deployment.modelVersion }}</td>
            <td>{{ deployment.envVersion }}</td>
            <td>{{ deployment.replacementReason }}</td>
            <td>{{ deployment.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'],
    data() {
      return {
        deployment: {},
      };
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:3000/viewdeploy/${this.id}`);
        this.deployment = response.data;
      } catch (error) {
        console.error(`Error retrieving deployment details: ${error.message}`);
      }
    },
  };
  </script>
  
  
<style scoped>
.deployment-details-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-top: 20px;
}

.deployment-details-table th,
.deployment-details-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.deployment-details-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.deployment-details-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.deployment-details-table tbody tr:hover {
  background-color: #ddd;
}
</style>