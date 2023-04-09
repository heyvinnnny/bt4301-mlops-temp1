<template>
  <div>
    <h1>Upload Deployment</h1>
    <form>
      <div class="form-group">
        <label for="deployment-id">Deployment ID:</label>
        <input
          type="text"
          class="form-control"
          id="deployment-id"
          v-model="deploymentId"
          pattern="[0-9]+"
          required
        />
      </div>
      <div class="form-group">
        <label for="deployment-name">Deployment Name:</label>
        <input
          type="text"
          class="form-control"
          id="deployment-name"
          v-model="deploymentName"
          required
        />
      </div>
      <div class="form-group">
        <label for="importance">Importance:</label>
        <select
          class="form-control"
          id="importance"
          v-model="importance"
          required
        >
          <option value="">Choose an option</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date-now">Date Now:</label>
        <input
          type="date"
          class="form-control"
          id="date-now"
          v-model="dateNow"
          required
          readonly
        />
      </div>
      <div class="form-group">
        <label for="model-version">Email:</label>
        <input
          type="text"
          class="form-control"
          id="email-version"
          v-model="user.email"
          disabled
          required
        />
      </div>
      <div class="form-group">
        <label for="model-version">Deployment Description:</label>
        <input
          type="text"
          class="form-control"
          id="deployment-description"
          v-model="deployDescription"
          required
        />
      </div>
      <div class="form-group">
        <label for="deploymentType">Deployment Type:</label>
        <br />
        <input
          type="radio"
          id="canary"
          value="Canary"
          v-model="selectedDeployment"
          @change="handleDeploymentSelection"
        />
        <label for="canary">Canary</label>
        &nbsp;&nbsp;&nbsp;
        <input
          type="radio"
          id="blueGreen"
          value="Blue-Green"
          v-model="selectedDeployment"
          @change="handleDeploymentSelection"
        />
        <label for="blueGreen">Blue-Green</label>
        <div class="form" v-if="showInputs">
          <h4>Selected Deployment: {{ selectedDeployment }} Deployment.</h4>
          <h5>Please Input IaC Features below:</h5>
          <div v-if="selectedDeployment === 'Blue-Green'">
            <!-- Add input fields for Blue/Green deployment IaC features -->
            <div class="form-group">
              <label for="active-environment">Active Environment:</label>
              <br />
              <input type="radio" id="blue" name="active-environment" />
              <label for="blue">Blue</label>
              &nbsp;&nbsp;&nbsp;
              <input type="radio" id="green" name="active-environment" />
              <label for="green">Green</label>
            </div>
            <div class="form-group">
              <label for="switching-method">Switching Method:</label>
              <select
                class="form-control"
                id="switching-method"
                v-model="switching"
                required
              >
                <option value="">Choose an option</option>
                <option value="Service Health">DNS Switch</option>
                <option value="Data Drift">Load Balancer</option>
                <option value="Accuracy Rate">Accuracy Rate</option>
                <option value="Critical">Service Mesh</option>
              </select>
            </div>
          </div>
          <div class="col-md-5" v-else-if="selectedDeployment === 'Canary'">
            <!-- Add input fields for Canary deployment IaC features -->
            <div class="form-group">
              <label for="traffic-percentage">Traffic Percentage (%):</label>
              <input
                type="text"
                class="form-control"
                id="traffic-percentage"
                v-model="deployDescription"
                required
              />
            </div>
            <div class="form-group">
              <label for="deployment-duration"
                >Deployment Duration (days):</label
              >
              <input
                type="text"
                class="form-control"
                id="deployment-duration"
                v-model="deployDescription"
                required
              />
            </div>
            <div class="form-group">
              <label for="rollback-criteria">Rollback Criteria:</label>
              <select
                class="form-control"
                id="rollback-criteria"
                v-model="rollback"
                required
              >
                <option value="">Choose an option</option>
                <option value="Service Health">Service Health</option>
                <option value="Data Drift">Data Drift</option>
                <option value="Accuracy Rate">Accuracy Rate</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div class="form-group">
              <label for="rollback-threshold">Rollback Threshold:</label>
              <input
                type="text"
                class="form-control"
                id="rollback-threshold"
                v-model="deployDescription"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="form-group">
        <label for="env-version">Environment Version:</label>
        <input type="text" class="form-control" id="manager-email" v-model="envVersion" required>
      </div>
      <div class="form-group">
        <label for="replacement-reason">Replacement Reason:</label>
        <textarea class="form-control" id="replacement-reason" v-model="replacementReason" required></textarea>
      </div> -->
      <button type="submit" class="btn btn-primary" @click.prevent="submitForm">
        Submit
      </button>
      <div v-show="isSuccess" class="success-message">
        Deployment created successfully!
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.$toast.success("Deployment Upload");
  },
  data() {
    return {
      deploymentId: "",
      deploymentName: "",
      importance: "",
      dateNow: new Date().toISOString().slice(0, 10),
      deployDescription: "",
      //envVersion: '',
      //replacementReason: '',

      isSuccess: false,
      selectedDeployment: "",
      selectedRollback: "",
      showInputs: false,
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
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/deployments", {
          deploymentId: this.deploymentId,
          deploymentName: this.deploymentName,
          importance: this.importance,
          dateNow: this.dateNow,
          deployDescription: this.deployDescription,
          email: this.user.email,
        });

        console.log(response.data);

        // Display a success notification
        this.isSuccess = true;

        // Reset the form fields
        this.deploymentId = "";
        this.deploymentName = "";
        this.importance = "";
        this.dateNow = new Date().toISOString().slice(0, 10);
        this.deployDescription = "";
        this.email = "";
      } catch (error) {
        console.error(error);
      }
    },
    handleDeploymentSelection() {
      this.showInputs = true;
    },
  },
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
</style>
