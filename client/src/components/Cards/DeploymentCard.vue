<template>
  <div id="app">
    <div class="login-page">
      <transition name="fade">
        <div class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card login">
              <h3 style="text-align: center"><b>Login to DataPower</b></h3>
              <form @submit.prevent="login" class="card login">
                <div class="form-group">
                  <div class="col-md-5">
                    <label for="applicationName">Application Name:</label>
                    <input
                      type="text"
                      id="applicationName"
                      v-model="applicationName"
                    />
                  </div>
                  <div class="col-md-5">
                    <label for="environment">Environment:</label>
                    <input type="text" id="environment" v-model="environment" />
                  </div>
                  <div class="col-md-5">
                    <label for="versionNumber">Version Number:</label>
                    <input
                      type="text"
                      id="versionNumber"
                      v-model="versionNumber"
                    />
                  </div>
                  <div class="col-md-5">
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

                  <div class="col-md-5" v-if="showInputs">
                    <h2>
                      {{ selectedDeployment }} Deployment - Input IaC Features
                    </h2>
                    <div v-if="selectedDeployment === 'blueGreen'">
                      <!-- Add input fields for Blue/Green deployment IaC features -->
                      <div>
                        <label for="iac-feature">Replica Count:</label>
                        <input type="text" id="iac-feature" />
                      </div>
                      <div>
                        <h3>Load Balancer Configuration</h3>
                        <div>
                          <label for="iac-feature">Load Balancer Name:</label>
                          <input type="text" id="iac-feature" />
                        </div>
                        <div>
                          <label for="iac-feature">Load Balancer Port:</label>
                          <input type="text" id="iac-feature" />
                        </div>
                        <div>
                          <label for="iac-feature"
                            >Load Balancer Protocol:</label
                          >
                          <input type="text" id="iac-feature" />
                        </div>
                      </div>
                      <div>
                        <h3>Rollback Configuration</h3>
                        <div class="col-md-5">
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

                          <div class="col-md-5" v-if="showInputs">
                            <div v-if="selectedRollback === 'Yes'">
                              <div>
                                <label for="iac-feature"
                                  >Rollback Version:</label
                                >
                                <input type="text" id="iac-feature" />
                              </div>
                              <div>
                                <label for="iac-feature">AWS Region:</label>
                                <input type="text" id="iac-feature" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3>DNS Configuration</h3>
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
                    <div
                      class="col-md-5"
                      v-else-if="selectedDeployment === 'canary'"
                    >
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
                        <h3>Load Balancer Configuration</h3>
                        <div>
                          <label for="iac-feature">Load Balancer Name:</label>
                          <input type="text" id="iac-feature" />
                        </div>
                        <div>
                          <label for="iac-feature">Load Balancer Port:</label>
                          <input type="text" id="iac-feature" />
                        </div>
                        <div>
                          <label for="iac-feature"
                            >Load Balancer Protocol:</label
                          >
                          <input type="text" id="iac-feature" />
                        </div>
                      </div>
                    </div>
                    <button type="Deploy" class="btn btn-primary">
                      Deploy
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deployment",
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

<style scoped>
p {
  line-height: 1rem;
}
.card {
  padding: 20px;
}
.form-group input {
  margin-bottom: 20px;
}
.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
.login-page .wallpaper-login {
  background: url(https://cdn-gcp.new.marutitech.com/robot_humanoid_using_tablet_computer_big_data_analytic_1_94eab7101e.jpg)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
}
.login-page .fade-enter-active,
.login-page .fade-leave-active {
  transition: opacity 0.5s;
}
.login-page .fade-enter,
.login-page .fade-leave-to {
  opacity: 0;
}

.login-page h1 {
  margin-bottom: 1.5rem;
}
.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}
@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
