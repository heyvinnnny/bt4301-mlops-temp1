src/components/DeploymentSelection.vue

<template>
  <div>
    <h3 style="text-align: center">Deployment</h3>

    <form>
      <div class="container">
        <label for="applicationName">Application Name:</label>
        <input type="text" id="applicationName" v-model="applicationName" />
      </div>
      <div class="container">
        <label for="environment">Environment:</label>
        <input type="text" id="environment" v-model="environment" />
      </div>
      <div class="container">
        <label for="versionNumber">Version Number:</label>
        <input type="text" id="versionNumber" v-model="versionNumber" />
      </div>
      <div class="container">
        <label for="deploymentType">Deployment Type:</label>
        <input
          type="radio"
          id="canary"
          value="canary"
          v-model="selectedDeployment"
          @change="handleDeploymentSelection"
        />
        <label for="canary">Canary</label>
        <input
          type="radio"
          id="blueGreen"
          value="blueGreen"
          v-model="selectedDeployment"
          @change="handleDeploymentSelection"
        />
        <label for="blueGreen">Blue-Green</label>
      </div>

      <div class="container" v-if="showInputs">
        <h3 style="text-align: left">
          {{ selectedDeployment }} Deployment - Input IaC Features
        </h3>
        <div v-if="selectedDeployment === 'blueGreen'">
          <!-- Add input fields for Blue/Green deployment IaC features -->
          <div>
            <label for="iac-feature">Replica Count:</label>
            <input type="text" id="iac-feature" />
          </div>
          <div>
            <h3 style="text-align: left">Load Balancer Configuration</h3>
            <div>
              <label for="iac-feature">Load Balancer Name:</label>
              <input type="text" id="iac-feature" />
            </div>
            <div>
              <label for="iac-feature">Load Balancer Port:</label>
              <input type="text" id="iac-feature" />
            </div>
            <div>
              <label for="iac-feature">Load Balancer Protocol:</label>
              <input type="text" id="iac-feature" />
            </div>
          </div>
          <div>
            <h3 style="text-align: left">Rollback Configuration</h3>
            <label for="rollbackOption">Rollback Option:</label>
            <input
              type="radio"
              id="Yes"
              value="Yes"
              v-model="selectedRollback"
              @change="handleRollbackSelection"
            />
            <label for="Yes">Yes</label>
            <input
              type="radio"
              id="No"
              value="No"
              v-model="selectedRollback"
              @change="handleRollbackSelection"
            />
            <label for="No">No</label>

            <div class="container" v-if="showInputs">
              <div v-if="selectedRollback === 'Yes'">
                <div>
                  <label for="iac-feature">Rollback Version:</label>
                  <input type="text" id="iac-feature" />
                </div>
                <div>
                  <label for="iac-feature">AWS Region:</label>
                  <input type="text" id="iac-feature" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 style="text-align: left">DNS Configuration</h3>
            <div>
              <label for="iac-feature">Domain Name:</label>
              <input type="text" id="iac-feature" />
            </div>
            <div>
              <label for="iac-feature">Blue Percentage:</label>
              <input type="text" id="iac-feature" />
            </div>
            <div>
              <label for="iac-feature">Green Percentage:</label>
              <input type="text" id="iac-feature" />
            </div>
          </div>
        </div>
        <div class="container" v-else-if="selectedDeployment === 'canary'">
          <!-- Add input fields for Canary deployment IaC features -->
          <div>
            <label for="iac-feature">Replica Count:</label>
            <input type="text" id="iac-feature" />
          </div>
          <div>
            <label for="iac-feature">Canary Weight (%):</label>
            <input type="text" id="iac-feature" />
          </div>
          <div>
            <h3 style="text-align: left">Load Balancer Configuration</h3>
            <div>
              <label for="iac-feature">Load Balancer Name:</label>
              <input type="text" id="iac-feature" />
            </div>
            <div>
              <label for="iac-feature">Load Balancer Port:</label>
              <input type="text" id="iac-feature" />
            </div>
            <div>
              <label for="iac-feature">Load Balancer Protocol:</label>
              <input type="text" id="iac-feature" />
            </div>
          </div>
        </div>
        <button type="Deploy" class="btn btn-primary">Deploy</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicationName: "",
      environment: "",
      versionNumber: "",
      selectedDeployment: "",
      selectedRollback: "",
      showInputs: false,
    };
  },
  methods: {
    handleDeploymentSelection() {
      this.showInputs = true;
    },
  },
};
</script>
