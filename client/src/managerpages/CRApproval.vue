<template>
    <div class="container">
      <h1>Change Request Approval</h1>
      <div v-for="model in pendingModels" :key="model._id" class="deployment-box">
        <div class="deployment-info">
          <h3>{{ deployments[model.deploymentId]?.deploymentName }}</h3>
          <p><strong>Deployment ID:</strong> {{ model.deploymentId }}</p>
          <!-- <p><strong>Deployment Description:</strong> {{ deployments[model.deploymentId]?.deployDescription }}</p> -->
          <button @click="toggleDetails(model._id)">Show more details</button>
        </div>
        <div v-if="openedModelId === model._id" class="model-info">
          <p><strong>Model Name:</strong> {{ model.modelName }}</p>
          <p><strong>Model Version:</strong> {{ model.modelVersion }}</p>
          <p><strong>Replacement Reason:</strong> {{ model.replacement_reason }}</p>
          <p><strong>Requested by:</strong> {{ model.email }}</p>
          <p><strong>Manager:</strong> {{ user.email }}</p>
          <textarea v-model="model.managerComment" placeholder="Enter comment"></textarea>
            <button
    @click="approve(model)"
    :disabled="model.approval_status === 'Approved'"
    >{{ model.approval_status === 'Approved' ? 'Approved' : 'Approve' }}</button>

        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      pendingModels: [],
      deployments: {},
      openedModelId: null,
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
      const token = localStorage.getItem("token");
      const config = {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      };
      const res = await axios.get("http://localhost:3000/users/me", config);
      this.user = res.data;
      console.log(this.user)
      const pendingModelsResponse = await axios.get('http://localhost:3000/pending');
      
      const deploymentsResponse = await axios.get('http://localhost:3000/deployments');

      this.pendingModels = pendingModelsResponse.data;
      const deploymentsArray = deploymentsResponse.data;
      this.deployments = deploymentsArray.reduce((acc, deployment) => {
        acc[deployment._id] = deployment;
        return acc;
      }, {});

       // Log deployments to the console
       console.log(this.deployments);
       
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
      toggleDetails(modelId) {
      this.openedModelId = this.openedModelId === modelId ? null : modelId;
      },
    async approve(model) {
      try {
        const response = await axios.post(`http://localhost:3000/${model._id}/approve`, {
          managerComment: model.managerComment,
          approverEmail: this.user.email,
        });

        const updatedModel = response.data;
        model.approval_status = updatedModel.approval_status;

        // Remove the approved model from the pendingModels array
        this.pendingModels = this.pendingModels.filter(m => m._id !== model._id);
      } catch (error) {
        console.error('Error approving model', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}

.deployment-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.deployment-info {
  margin-bottom: 10px;
}

.model-info {
  margin-bottom: 10px;
}

textarea {
  display: block;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}
</style>

  