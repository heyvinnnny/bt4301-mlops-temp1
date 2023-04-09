<template>
  <div>
    <div>
      {{ selectedDeployment.deploymentName }}
      <h3>Select Deployment:</h3>
      <select v-model="selectedDeployment" @change="onChange($event)">
        <option v-for="deployment in deployments" :key="deployment._id" :value="deployment">{{ deployment.deploymentId }}</option>
      </select>

    </div>

    <div>
      <h3>Models</h3>
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Model Version</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in models" :key="model._id">
            <td>{{ model.modelName }}</td>
            <td>{{ model.modelVersion }}</td>
            <td>
              <router-link :to="{ name: 'ViewSubmitCRCard', params: { id: model._id } }">
                <button>Replace</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    this.$toast.success("Challengers");
  },
  data() {
    return {
      selectedDeployment: {},
      deployments: [],
      models: [],
    };
  },
  async created() {
      try {
        //const response = await axios.get('http://localhost:3000/viewdeploy');
        // Get the user object from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        // Get the logged-in user's ID from the user object
        const userId = user.id;

        // Get the token from localStorage
            const token = localStorage.getItem("token");

        // Set up the headers for the request, including the Authorization header
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:3000/deployments/assigned/${userId}`, config);
        this.deployments = response.data;
      } catch (error) {
        console.error(`Error retrieving deployment information: ${error.message}`);
      }
    },
    methods: {
      async onChange(event) {
        try {
          console.log(event.target.value);
          const response = await axios.get(`http://localhost:3000/models_deploymentid/${this.selectedDeployment.deploymentId}`);
          this.models = response.data
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>