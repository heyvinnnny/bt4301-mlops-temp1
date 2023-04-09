<template>
  <div>
    <h1>Deployment Details</h1>
    <table class="deployment-details-table">
      <thead>
        <tr>
          <th>Deployment ID</th>
          <th>Deployment Name</th>
          <th>Importance</th>
          <th>Date Created</th>
          <th>Deployment Description</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ deployment.deploymentId }}</td>
          <td>{{ deployment.deploymentName }}</td>
          <td>{{ deployment.importance }}</td>
          <td>{{ deployment.dateNow.slice(0, 10) }}</td>
          <td>{{ deployment.deployDescription }}</td>
          <td>{{ deployment.email }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Model Upload</h2>
  <form>
    <div>
      <label for="model_name">Model Name:</label>
      <input type="text" id="model_name" name="model_name" v-model="model_name" required>
    </div>
    <div>
      <label for="model_version">Model Version:</label>
      <input type="number" id="model_version" name="model_version" v-model="model_version" required>
    </div>
    <div>
        <label for="email-version">Email:</label>
        <input type="text" class="form-control" id="email-version" v-model="user.email" disabled required>
      </div>
    <div>
      <label for="jsonFile">JSON File:</label>
      <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleJsonUpload">
    </div>
    <div>
      <label for="binaryFile">Binary File:</label>
      <input type="file" id="binaryFile" name="binaryFile" accept=".bin" required @change="handleBinUpload">
    </div>
    <button v-on:click="onUploadFile()" type="submit" class="upload-button">Upload Files</button>
    <br>
    <div v-show="isSuccess1" class="success-message">Model files uploaded and created successfully!</div>
  </form>


    <h2>Upload Test Data</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="jsonFile">JSON File:</label>
        <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleDataJsonUpload">
      </div>
      <button v-on:click="onUploadData()" type="submit" class="upload-button">Upload Files</button>
      <br>
      <div v-show="isSuccess2" class="success-message">Test data uploaded successfully. Please refresh the page.</div>
    </form>

    <h2>Data Drift</h2>
    <router-link :to="{ name: 'ViewDrift', params: { id: id } }">Data Drift</router-link>

    
  
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
      email: '',
      bin:'',
      isSuccess1: false,
      isSuccess2: false,
    };
  },
  computed: {
    user: {
      get() {
        return JSON.parse(localStorage.getItem("user"));
      },
      set(user) {
        localStorage.setItem("user", JSON.stringify(user));
      },
    },
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/viewdeploy/${this.id}`);
      this.deployment = response.data;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3000/users/me", config);
      this.user = res.data;
      console.log(this.user)

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
          formData.append("email", this.user.email);
          formData.append("jsonFile", this.json);  // appending file
          formData.append("binaryFile", this.bin);  // appending file

          
     // sending file to the backend
      axios
        .post("http://localhost:3000/upload", formData)
        .then(res => {
          // console.log("done uploading!")
          this.isSuccess1 = true;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onUploadFile() {
            const formData = new FormData();
            formData.append("deployment_id", this.deployment.deploymentId);
            formData.append("model_name", this.model_name);
            formData.append("model_version", this.model_version);
            formData.append("email", this.user.email);
            formData.append("jsonFile", this.json);  // appending file
            formData.append("binaryFile", this.bin);  // appending file
  
       // sending file to the backend
        axios
          .post("http://localhost:3000/upload", formData)
          .then(res => {
            // console.log("done uploading!")
            //alert("Done uploading! please refresh!")
            console.log(res);
          })
          .catch(err => {
            
            if (err.response && err.response.status === 404 && err.response.data.message == "Data not found") {
              alert("Upload test data first!")
            } else if (err.response && err.response.status === 500 && err.response.data.msg =="Model not correct shape!") {
              alert(err.response.data.msg)
            } else {
              alert("Something went wrong! Try again!")
              console.log(err);
            }
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
            //console.log("done uploading!")
            //alert("Done uploading! please refresh!")
            this.isSuccess2 = true;
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

.success-message {
  background-color: green;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: slide-down 0.3s ease-out;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

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

/* Align email field with other fields */
#email-version {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

/* Table layout for upload forms */
form {
    display: table;
    border-collapse: separate;
    border-spacing: 0.5rem;
  }

form div {
  margin-bottom: 10px;
}

form label {
  margin-right: 10px;
}

form input[type="text"], form input[type="number"], form input[type="file"] {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
}

form input[type="file"] {
  border: none;
  padding: 0;
  margin: 0;
}

form button[type="submit"] {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
  width: 200px;
  max-width: 100%;
}

/* Styling for the upload test data form */
.upload-data-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.upload-data-form div {
  margin-bottom: 10px;
}

.upload-data-form label {
  margin-right: 10px;
}

.upload-data-form input[type="file"] {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
}

.upload-data-form button[type="submit"] {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
  width: 200px;
  max-width: 100%;
}

/* Styling for the router link */
a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

label {
    display: table-cell;
    vertical-align: top;
    font-weight: bold;
    padding-right: 1rem;
  }

  input[type="text"],
  input[type="number"],
  input[type="file"] {
    display: table-cell;
    vertical-align: top;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

  button[type="submit"] {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #0069d9;
  }

  
</style>
