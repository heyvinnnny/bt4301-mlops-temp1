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

      <h2>Model Upload</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="model_name">Model Name:</label>
        <input type="text" id="model_name" name="model_name" v-model="model_name" required>
      </div>
      <div>
        <label for="model_version">Model Version:</label>
        <input type="number" id="model_version" name="model_version" v-model="model_version" required>
      </div>
      <div>
        <label for="jsonFile">JSON File:</label>
        <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleJsonUpload">
      </div>
      <div>
        <label for="binaryFile">Binary File:</label>
        <input type="file" id="binaryFile" name="binaryFile" accept=".bin" required @change="handleBinUpload">
      </div>
      <button v-on:click="onUploadFile()" type="submit">Upload Files</button>
    </form>

    <h2>Upload Test Data</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="jsonFile">JSON File:</label>
        <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleDataJsonUpload">
      </div>
      <button v-on:click="onUploadData()" type="submit">Upload Files</button>
    </form>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'],
    data() {
      return {
        deployment: {},
        model_name: '',
        model_version: null,
        test_data:'',
        json :'',
        bin:''
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
    methods: {
    handleJsonUpload(event) {
      this.json = event.target.files[0]
    },
    handleBinUpload(event) {
      this.bin = event.target.files[0]
    },
    handleDataJsonUpload(event) {
      this.test_data = event.target.files[0]
    },
    onUploadFile() {
            const formData = new FormData();
            formData.append("deployment_id", this.deployment.deploymentId);
            formData.append("model_name", this.model_name);
            formData.append("model_version", this.model_version);
            formData.append("jsonFile", this.json);  // appending file
            formData.append("binaryFile", this.bin);  // appending file
  
       // sending file to the backend
        axios
          .post("http://localhost:3000/upload", formData)
          .then(res => {
            // console.log("done uploading!")
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      },
      onUploadData() {
            const formData = new FormData();
            formData.append("deployment_id", this.deployment.deploymentId);
            formData.append("test_data", this.test_data);  // appending file
  
       // sending file to the backend
        axios
          .post("http://localhost:3000/data", formData)
          .then(res => {
            console.log("done uploading!")
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
  }
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