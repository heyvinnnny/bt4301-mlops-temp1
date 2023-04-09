<template>
    <div class="container">
      <h1>Change Request Approval</h1>
      <div v-for="model in pendingModels" :key="model._id" class="deployment-box">
        <div class="deployment-info">
          <h3>{{ deployments[model.deploymentId]?.deploymentName }}</h3>
          <p><strong>Deployment ID:</strong> {{ model.deploymentId }}</p>
          <p><strong>Deployment Description:</strong> {{ deployments[model.deploymentId]?.deployDescription }}</p>
          <button @click="toggleDetails(model._id)">Show more details</button>
        </div>
        <div v-if="openedModelId === model._id" class="model-info">
          <p><strong>Model Name:</strong> {{ model.modelName }}</p>
          <p><strong>Model Version:</strong> {{ model.modelVersion }}</p>
          <p><strong>Replacement Reason:</strong> {{ model.replacement_reason }}</p>
          <p><strong>Requested by:</strong> {{ model.email }}</p>
          <textarea v-model="model.managerComment" placeholder="Enter comment"></textarea>
          <button @click="approve(model)">Approve</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        pendingModels: [],
        deployments: {},
        openedModelId: null,
      };
    },
    async created() {
    try {
      const [pendingModelsResponse, deploymentsResponse] = await Promise.all([
        fetch('http://localhost:3000/pending'),
        fetch('http://localhost:3000/deployments'),
      ]);

      if (!pendingModelsResponse.ok) {
        throw new Error(`Error fetching pending models: ${pendingModelsResponse.statusText}`);
      }

      if (!deploymentsResponse.ok) {
        throw new Error(`Error fetching deployments: ${deploymentsResponse.statusText}`);
      }

      this.pendingModels = await pendingModelsResponse.json();

      const deploymentsArray = await deploymentsResponse.json();
      this.deployments = deploymentsArray.reduce((acc, deployment) => {
        acc[deployment._id] = deployment;
        return acc;
      }, {});
      
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
          const response = await fetch(`http://localhost:3000/${model._id}/approve`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ managerComment: model.managerComment }),
          });


          const updatedModel = await response.json();
          model.approval_status = updatedModel.approval_status;
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

  