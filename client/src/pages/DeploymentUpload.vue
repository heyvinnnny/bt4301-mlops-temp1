<template>
  <div>
    <h1>Upload Deployment</h1>
    <form>
      <div class="form-group">
        <label for="deployment-id">Deployment ID:</label>
        <input type="text" class="form-control" id="deployment-id" v-model="deploymentId" required>
      </div>
      <div class="form-group">
        <label for="deployment-name">Deployment Name:</label>
        <input type="text" class="form-control" id="deployment-name" v-model="deploymentName" required>
      </div>
      <div class="form-group">
        <label for="importance">Importance:</label>
        <select class="form-control" id="importance" v-model="importance" required>
          <option value="">Choose an option</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date-now">Date Now:</label>
        <input type="date" class="form-control" id="date-now" v-model="dateNow" required readonly>
      </div>
      <div class="form-group">
        <label for="model-version">Email:</label>
        <input type="text" class="form-control" id="email-version" v-model="user.email" disabled required>
      </div>
      <div class="form-group">
        <label for="model-version">Model Version:</label>
        <input type="text" class="form-control" id="model-version" v-model="modelVersion" required>
      </div>
      <div class="form-group">
        <label for="env-version">Environment Version:</label>
        <input type="text" class="form-control" id="manager-email" v-model="envVersion" required>
      </div>
      <div class="form-group">
        <label for="replacement-reason">Replacement Reason:</label>
        <textarea class="form-control" id="replacement-reason" v-model="replacementReason" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submitForm">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      deploymentId: '',
      deploymentName: '',
      importance: '',
      dateNow: new Date().toISOString().slice(0, 10),
      modelVersion: '',
      envVersion: '',
      replacementReason: '',
      email: ""
    }
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
      const response = await axios.post('http://localhost:3000/deployments', {
          deploymentId: this.deploymentId,
          deploymentName: this.deploymentName,
          importance: this.importance,
          dateNow: this.dateNow,
          modelVersion: this.modelVersion,
          envVersion: this.envVersion,
          replacementReason: this.replacementReason,
          email: this.user.email,
      });

      console.log(response.data);

      this.deploymentId = ''
      this.deploymentName = ''
      this.importance = ''
      this.dateNow = new Date().toISOString().slice(0, 10)
      this.modelVersion = ''
      this.envVersion = ''
      this.replacementReason = ''
      this.email = '' 
    },
  }
}
</script>
