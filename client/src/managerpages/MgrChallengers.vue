<template>
  <div>
    <div class="log-entry">
      <h3>Select Deployment:</h3>
      <select v-model="selectedDeployment" @change="onChange($event)">
        <option v-for="deployment in deployments" :key="deployment._id" :value="deployment">{{ deployment.deploymentId }}</option>
      </select>
    </div>

    <div class="log-entry">
      <h3>Deployment Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Deployment ID</th>
            <th>Deployment Name</th>
            <th>Deployment Description</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
            <td> {{ selectedDeployment.deploymentId }} </td>
            <td> {{ selectedDeployment.deploymentName }} </td>            
            <td> {{ selectedDeployment.deployDescription  }}</td>
            <td> {{ selectedDeployment.importance }} </td>
        </tbody>
      </table>
    </div>
    <br>

    <div class="log-entry">
      <h3>Champion Model</h3>
      <card :title="Govern">
        <div class="log-entry">
          <div class="main-info">
            <p>Model Name : {{ champion_model.modelName}} {{ champion_model.modelVersion}}</p>
            <p>Approved By: {{ selectedDeployment.email}} </p>
            <p>Uploaded By: {{ champion_model.email}}</p>
          </div>
        </div>
    </card>
    </div>

    <div class="log-entry">
      <h3>Challengers Models</h3>
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Model Version</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in models.filter(m => m._id !== champion_model._id)" :key="model._id">
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
    <div class="log-entry">
      <h3>Governance</h3>
      <card :title="Govern">
        <div class="log-entry">
          <div class="main-info">
            <p>Deployment Created</p>
            <p> {{ selectedDeployment.dateNow}} </p>
            <p> {{ selectedDeployment.email}} </p>
          </div>

          <div class="main-info">
            <p>Model Last Updated</p>
            <p> {{ selectedDeployment.dateNow}} </p>
            <p> {{ champion_model.email}} </p>
          </div>

          <button @click="toggleDetails">
            {{ showMore ? "Show more details" : "Show less details" }}
          </button>

          <div v-if="!showMore" class="extended-info">
            <div class="updated-request">
              <h4>Updated requested</h4>
              <p>Requested by {{ champion_model.email}} on  {{ selectedDeployment.dateNow}} </p>
              <p>Comments if any:</p>
            </div>

            <div class="approval-request">
              <h4>Approval Given</h4>
              <p>Approved by  {{ selectedDeployment.email}}  on  {{ selectedDeployment.dateNow}}</p>
              <p>Comments if any:</p>
            </div>

            <div class="reviewers">
              <h4>Reviewers</h4>
              <p>John Doe</p>
            </div>
          </div>
        </div>
    </card>
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
      champion_model : {},
      showMore: true,
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
        const response = await axios.get(`http://localhost:3000/deployments/`, config);
        this.deployments = response.data;
      } catch (error) {
        console.error(`Error retrieving deployment information: ${error.message}`);
      }
    },
    methods: {
      toggleDetails() {
          this.showMore = !this.showMore;
        },
      async onChange(event) {
        try {
          console.log(event.target.value);
          const response = await axios.get(`http://localhost:3000/models_deploymentid/${this.selectedDeployment.deploymentId}`);
          this.models = response.data
          console.log(response)
          for (let i = 0; i< this.models.length; i++) {
              console.log(this.models[i])
              if (this.models[i].deployed == true) {
                this.champion_model = this.models[i]
              }
            }
        } catch (error) {
          console.log(error)
        }
      },      
    }
};
</script>

<style scoped>
.log-entry {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

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
.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.extended-info {
  margin-top: 15px;
}

</style>